(function () {
  "use strict";

  const STORAGE = {
    details: "expression-library-detailed-descriptions",
    columns: "expression-library-columns",
    usage: "expression-library-usage",
    favorites: "expression-library-favorites-v2",
    themeOrder: "expression-library-theme-order",
    openThemes: "expression-library-open-themes"
  };

  const elements = {
    skipLink: document.querySelector(".skipLink"),
    feedbackLink: document.getElementById("feedbackLink"),
    detailsToggle: document.getElementById("detailsToggle"),
    columnCount: document.getElementById("columnCount"),
    search: document.getElementById("expressionSearch"),
    suggestions: document.getElementById("searchSuggestions"),
    showMatches: document.getElementById("showMatchesButton"),
    clearSearch: document.getElementById("clearSearchButton"),
    resultsSection: document.getElementById("searchResultsSection"),
    resultsSummary: document.getElementById("searchResultsSummary"),
    resultsTable: document.getElementById("searchResultsTable"),
    frequentTable: document.getElementById("frequentTable"),
    favoritesTable: document.getElementById("favoritesTable"),
    lastCopiedSection: document.getElementById("lastCopiedSection"),
    lastCopiedText: document.getElementById("lastCopiedText"),
    favoriteLast: document.getElementById("favoriteLastButton"),
    themeSections: document.getElementById("themeSections"),
    resetThemeOrder: document.getElementById("resetThemeOrderButton"),
    feedbackForm: document.getElementById("feedbackForm"),
    feedbackConfirmation: document.getElementById("feedbackConfirmation"),
    status: document.getElementById("status")
  };

  let detailedDescriptions = readStorage(STORAGE.details, "false") === "true";
  let columns = Number(readStorage(STORAGE.columns, "10")) === 5 ? 5 : 10;
  let usage = readJson(STORAGE.usage, {});
  let favorites = new Set(readJson(STORAGE.favorites, []));
  let openThemes = new Set(readJson(STORAGE.openThemes, ["laughing-playful", "dinosaurs"]));
  let suggestionMatches = [];
  let activeSuggestion = -1;
  let currentResults = [];
  let lastCopied = null;
  let suggestionAnnouncementTimer = null;
  const OPEN_DOOR_COPY_SIZE = 16;
  const preparedOpenDoorImages = new Map();

  function readStorage(key, fallback) {
    try {
      const value = localStorage.getItem(key);
      return value === null ? fallback : value;
    } catch (_error) {
      return fallback;
    }
  }

  function writeStorage(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (_error) {
      return;
    }
  }

  function readJson(key, fallback) {
    try {
      const value = localStorage.getItem(key);
      return value === null ? fallback : JSON.parse(value);
    } catch (_error) {
      return fallback;
    }
  }

  function normalize(value) {
    return String(value || "")
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[’']/g, "")
      .replace(/[-_]/g, " ")
      .toLowerCase()
      .trim();
  }

  function titleCase(value) {
    return String(value || "")
      .replace(/[-_]/g, " ")
      .replace(/\b\w/g, function (letter) { return letter.toUpperCase(); });
  }

  function capitalizeFirst(value) {
    const text = String(value || "");
    return text ? text.charAt(0).toUpperCase() + text.slice(1) : text;
  }

  function expressionType(record) {
    if (record.group === "Flags") {
      return "Unicode flag sequence";
    }
    if (record.codePoints.length > 1) {
      return "Unicode emoji sequence";
    }
    return "Unicode emoji";
  }

  function compatibilityFor(type) {
    if (type === "Text emoticon") {
      return "Screen readers may announce the punctuation rather than the intended expression.";
    }
    if (type === "Kaomoji") {
      return "Its meaning is primarily visual. Screen readers may announce separate symbols or omit some characters.";
    }
    if (type === "Text symbol") {
      return "Its announcement may vary with the screen reader and punctuation settings.";
    }
    if (type === "Unicode flag sequence") {
      return "It may be announced as a flag or as its underlying letter characters on an unsupported platform.";
    }
    if (type === "Unicode emoji sequence") {
      return "It may be announced as one expression or as multiple components on an unsupported platform.";
    }
    return "It copies as a text character. Appearance and spoken name may vary by application, platform, and screen reader.";
  }

  const curatedByCharacter = new Map(EXPRESSIONS.map(function (item) { return [item.character, item]; }));
  const extraKeywordsByCharacter = new Map([
    ["🐴", ["pony", "equine", "mare", "stallion", "foal"]],
    ["🐎", ["pony", "equine", "mare", "stallion", "foal"]],
    ["🏇", ["equestrian", "jockey", "racehorse"]],
    ["🎠", ["merry go round", "carnival"]],
    ["🦄", ["horse", "pony", "equine", "fantasy"]],
    ["🦓", ["equine", "horse family"]],
    ["🐶", ["puppy", "canine", "pet"]],
    ["🐕", ["puppy", "canine", "pet"]],
    ["🦮", ["seeing eye dog", "working dog", "blindness", "mobility"]],
    ["🐕‍🦺", ["assistance dog", "working dog", "disability"]],
    ["🐩", ["puppy", "canine", "pet", "dog breed"]],
    ["🐾", ["dog", "puppy", "pet"]],
    ["🦴", ["dog", "puppy", "pet"]]
  ]);
  const catalog = [];
  const characters = new Set();

  UNICODE_EXPRESSIONS.forEach(function (record) {
    if (characters.has(record.character)) {
      return;
    }
    characters.add(record.character);
    const curated = curatedByCharacter.get(record.character);
    const type = expressionType(record);
    const keywordList = Array.from(new Set([
      ...(record.keywords || []),
      ...(curated?.keywords || []),
      ...(extraKeywordsByCharacter.get(record.character) || []),
      record.group,
      record.subgroup
    ].filter(Boolean)));
    const usefulKeywords = keywordList.filter(function (keyword) {
      return normalize(keyword) !== normalize(record.name);
    });

    catalog.push({
      id: record.id,
      character: record.character,
      name: capitalizeFirst(record.name),
      meaning: curated?.meaning || (usefulKeywords.length
        ? "Commonly associated with " + usefulKeywords.slice(0, 6).join(", ") + "."
        : "An expression in the " + titleCase(record.subgroup) + " collection."),
      type,
      compatibility: compatibilityFor(type),
      group: record.group,
      subgroup: record.subgroup,
      keywords: keywordList,
      emojiVersion: record.emojiVersion
    });
  });

  EXPRESSIONS.forEach(function (record) {
    if (characters.has(record.character)) {
      return;
    }
    const type = record.type || record.category;
    catalog.push({
      id: "curated-" + record.id,
      character: record.character,
      name: record.name,
      meaning: record.meaning,
      type,
      compatibility: compatibilityFor(type),
      group: record.category,
      subgroup: record.category,
      keywords: record.keywords || [],
      emojiVersion: ""
    });
  });

  OPEN_DOOR_EXPRESSIONS.forEach(function (record) {
    catalog.push({
      id: "open-door-" + record.id,
      character: "",
      imageSrc: record.imageSrc,
      name: record.name,
      meaning: record.meaning,
      type: "Open Door image expression",
      compatibility: "It copies in image, accessible HTML, and plain-text formats. The receiving application decides which format to use.",
      group: "Open Door Expressions",
      subgroup: record.subgroup,
      keywords: record.keywords || [],
      emojiVersion: ""
    });
  });

  const catalogById = new Map(catalog.map(function (item) { return [item.id, item]; }));

  function searchableText(item) {
    return normalize([
      item.name,
      item.meaning,
      item.type,
      item.group,
      item.subgroup,
      item.keywords.join(" ")
    ].join(" "));
  }

  catalog.forEach(function (item) {
    item.searchText = searchableText(item);
  });

  const themeDefinitions = [
    { id: "laughing-playful", title: "Laughing and Playful", description: "Smiles, laughter, winks, parties, and playful reactions.", match: function (item) { return /laugh|grinn|smil|wink|zany|party|amused/.test(normalize(item.name + " " + item.subgroup)); } },
    { id: "dinosaurs", title: "Dinosaurs", description: "T-Rex and sauropod expressions.", match: function (item) { return /t rex|sauropod|dinosaur/.test(normalize(item.name + " " + item.keywords.join(" "))); } },
    { id: "open-door-expressions", title: "Open Door Expressions", description: "Original accessible image expressions created by Open Door Design.", group: "Open Door Expressions" },
    { id: "horses", title: "Horses and Equines", description: "Horses, horse racing, carousel horses, unicorns, and zebras.", match: function (item) { return /^(horse|horse face|carousel horse|unicorn|zebra)$/.test(normalize(item.name)) || /^horse racing(?::|$)/.test(normalize(item.name)); } },
    { id: "dogs", title: "Dogs", description: "Dogs, puppies, guide dogs, service dogs, poodles, and related expressions.", match: function (item) { return /^(dog|dog face|guide dog|service dog|poodle|wolf|paw prints|bone)$/.test(normalize(item.name)); } },
    { id: "cat-faces", title: "Cat Faces", description: "Emotional expressions represented as cat faces.", match: function (item) { return item.subgroup === "cat-face"; } },
    { id: "ghosts-fantasy", title: "Ghosts and Fantasy", description: "Ghosts, monsters, magical beings, and fantasy characters.", match: function (item) { return /ghost|goblin|ogre|alien|robot|monster|vampire|zombie|fairy|merperson|elf|genie|mage/.test(normalize(item.name)); } },
    { id: "accessibility", title: "Accessibility", description: "Canes, guide and service dogs, wheelchairs, hearing aids, and related expressions.", match: function (item) { return /white cane|guide dog|service dog|wheelchair|hearing aid|deaf person|prosthetic|mechanical arm|mechanical leg/.test(normalize(item.name)); } },
    { id: "smileys-emotion", title: "Smileys and Emotion", description: "The complete Unicode smileys and emotion collection.", group: "Smileys & Emotion" },
    { id: "people-body", title: "People and Body", description: "People, gestures, professions, families, and body-related expressions.", group: "People & Body" },
    { id: "animals-nature", title: "Animals and Nature", description: "Animals, plants, weather, and nature.", group: "Animals & Nature" },
    { id: "food-drink", title: "Food and Drink", description: "Foods, ingredients, meals, and drinks.", group: "Food & Drink" },
    { id: "travel-places", title: "Travel and Places", description: "Transportation, buildings, locations, weather, and time.", group: "Travel & Places" },
    { id: "activities", title: "Activities", description: "Sports, games, arts, events, and awards.", group: "Activities" },
    { id: "objects", title: "Objects", description: "Clothing, sound, music, technology, tools, household items, and more.", group: "Objects" },
    { id: "symbols", title: "Symbols", description: "Hearts, arrows, warnings, marks, shapes, numbers, and other symbols.", group: "Symbols", extraGroup: "Symbols" },
    { id: "flags", title: "Flags", description: "Country, regional, identity, and other flags.", group: "Flags" },
    { id: "emoticons", title: "Classic Text Emoticons", description: "Expressions made from ordinary typed characters.", group: "Emoticons" },
    { id: "kaomoji", title: "Kaomoji", description: "Character-based expressions whose intended meaning is often primarily visual.", group: "Kaomoji" }
  ];

  const themeById = new Map(themeDefinitions.map(function (theme) { return [theme.id, theme]; }));
  const defaultThemeOrder = themeDefinitions.map(function (theme) { return theme.id; });
  let themeOrder = readJson(STORAGE.themeOrder, defaultThemeOrder).filter(function (id) { return themeById.has(id); });
  defaultThemeOrder.forEach(function (id, defaultIndex) {
    if (!themeOrder.includes(id)) {
      let insertionIndex = themeOrder.length;
      for (let previousIndex = defaultIndex - 1; previousIndex >= 0; previousIndex -= 1) {
        const previousPosition = themeOrder.indexOf(defaultThemeOrder[previousIndex]);
        if (previousPosition >= 0) {
          insertionIndex = previousPosition + 1;
          break;
        }
      }
      themeOrder.splice(insertionIndex, 0, id);
    }
  });

  function itemsForTheme(theme) {
    if (theme.match) {
      return catalog.filter(theme.match);
    }
    return catalog.filter(function (item) {
      return item.group === theme.group || item.group === theme.extraGroup;
    });
  }

  function announce(message) {
    elements.status.textContent = "";
    window.setTimeout(function () {
      elements.status.textContent = message;
    }, 40);
  }

  async function copyPlainText(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (_error) {
      const temporary = document.createElement("textarea");
      temporary.value = text;
      temporary.setAttribute("aria-hidden", "true");
      temporary.style.position = "fixed";
      temporary.style.left = "-9999px";
      document.body.appendChild(temporary);
      temporary.select();
      const copied = document.execCommand("copy");
      temporary.remove();
      return copied;
    }
  }

  function feedbackValue(data, name) {
    return String(data.get(name) || "Not answered").trim() || "Not answered";
  }

  function buildFeedbackResponse(data) {
    return [
      "Expression Library feedback",
      "",
      "Overall experience: " + feedbackValue(data, "overallExperience"),
      "Application used for pasting: " + feedbackValue(data, "application"),
      "Screen reader used: " + feedbackValue(data, "screenReader"),
      "Easy to find, copy, and paste: " + feedbackValue(data, "easyToUse"),
      "Open Door image appeared: " + feedbackValue(data, "imageAppeared"),
      "Image appeared at a useful size: " + feedbackValue(data, "usefulSize"),
      "Expression name announced after pasting: " + feedbackValue(data, "nameAnnounced"),
      "Enjoyed using the library: " + feedbackValue(data, "enjoyed"),
      "Requested animals, breeds, or expressions: " + feedbackValue(data, "requests"),
      "Other comments: " + feedbackValue(data, "comments")
    ].join("\n");
  }

  function cancelSuggestionAnnouncement() {
    if (suggestionAnnouncementTimer !== null) {
      window.clearTimeout(suggestionAnnouncementTimer);
      suggestionAnnouncementTimer = null;
    }
  }

  function scheduleSuggestionAnnouncement(message) {
    cancelSuggestionAnnouncement();
    suggestionAnnouncementTimer = window.setTimeout(function () {
      suggestionAnnouncementTimer = null;
      announce(message);
    }, 700);
  }

  function detailsText(item) {
    return item.meaning + " " + item.type + ". " + item.compatibility;
  }

  function safeId(value) {
    return String(value).replace(/[^a-z0-9-]/gi, "-");
  }

  function canvasBlob(canvas) {
    return new Promise(function (resolve, reject) {
      canvas.toBlob(function (blob) {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("The inline image could not be created."));
        }
      }, "image/png");
    });
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  async function prepareOpenDoorClipboard(item) {
    if (preparedOpenDoorImages.has(item.imageSrc)) {
      return preparedOpenDoorImages.get(item.imageSrc);
    }
    const response = await fetch(item.imageSrc);
    if (!response.ok) {
      throw new Error("The image could not be loaded.");
    }
    const sourceBlob = await response.blob();
    const bitmap = await createImageBitmap(sourceBlob);
    const canvas = document.createElement("canvas");
    canvas.width = OPEN_DOOR_COPY_SIZE;
    canvas.height = OPEN_DOOR_COPY_SIZE;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, OPEN_DOOR_COPY_SIZE, OPEN_DOOR_COPY_SIZE);
    context.drawImage(bitmap, 0, 0, OPEN_DOOR_COPY_SIZE, OPEN_DOOR_COPY_SIZE);
    bitmap.close();
    const pngBlob = await canvasBlob(canvas);
    const dataUrl = canvas.toDataURL("image/png");
    const name = escapeHtml(item.name);
    const html = '<img src="' + dataUrl + '" alt="' + name + '" width="' + OPEN_DOOR_COPY_SIZE + '" height="' + OPEN_DOOR_COPY_SIZE + '" style="display:inline-block;width:' + OPEN_DOOR_COPY_SIZE + 'px;height:' + OPEN_DOOR_COPY_SIZE + 'px;vertical-align:middle">';
    const clipboardData = {
      pngBlob,
      htmlBlob: new Blob([html], { type: "text/html" }),
      textBlob: new Blob(["[" + item.name + "]"], { type: "text/plain" })
    };
    preparedOpenDoorImages.set(item.imageSrc, clipboardData);
    return clipboardData;
  }

  function createExpressionCell(item, contextId, accessibleName) {
    const cell = document.createElement("td");
    const button = document.createElement("button");
    const detailsId = "details-" + safeId(contextId) + "-" + safeId(item.id);

    button.type = "button";
    button.className = "expressionButton";
    const buttonName = accessibleName || item.name;
    button.setAttribute("aria-label", item.imageSrc ? buttonName + ". Open Door image expression. Press Enter or Space to copy the image." : buttonName);
    button.title = item.name;
    if (detailedDescriptions) {
      button.setAttribute("aria-describedby", detailsId);
    }

    let character;
    if (item.imageSrc) {
      character = document.createElement("img");
      character.className = "customExpressionImage";
      character.src = item.imageSrc;
      character.alt = "";
      character.setAttribute("aria-hidden", "true");
    } else {
      character = document.createElement("span");
      character.setAttribute("aria-hidden", "true");
      character.textContent = item.character;
    }

    const details = document.createElement("span");
    details.id = detailsId;
    details.hidden = true;
    details.textContent = detailsText(item);

    button.appendChild(character);
    button.addEventListener("click", function () {
      copyExpression(item, contextId);
    });
    cell.append(button, details);
    return cell;
  }

  function renderExpressionTable(container, items, caption, contextId, emptyMessage) {
    container.replaceChildren();
    if (!items.length) {
      const message = document.createElement("p");
      message.className = "emptyMessage";
      message.textContent = emptyMessage;
      container.appendChild(message);
      return;
    }

    const region = document.createElement("div");
    region.className = "expressionTableRegion";
    const table = document.createElement("table");
    table.className = "expressionTable";
    const tableCaption = document.createElement("caption");
    tableCaption.textContent = caption;
    const body = document.createElement("tbody");

    for (let index = 0; index < items.length; index += columns) {
      const row = document.createElement("tr");
      const rowItems = items.slice(index, index + columns);
      rowItems.forEach(function (item, rowIndex) {
        const itemIndex = index + rowIndex;
        const groupLabel = contextId.indexOf("theme-") === 0 ? caption + " theme. " : caption + " table. ";
        const accessibleName = itemIndex === 0 ? groupLabel + item.name : item.name;
        row.appendChild(createExpressionCell(item, contextId, accessibleName));
      });
      for (let blank = rowItems.length; blank < columns; blank += 1) {
        const emptyCell = document.createElement("td");
        emptyCell.className = "emptyCell";
        emptyCell.setAttribute("aria-hidden", "true");
        row.appendChild(emptyCell);
      }
      body.appendChild(row);
    }

    table.append(tableCaption, body);
    region.appendChild(table);
    container.appendChild(region);
  }

  async function copyExpression(item, contextId) {
    let copied = false;
    try {
      if (item.imageSrc) {
        if (!window.ClipboardItem || !navigator.clipboard.write) {
          throw new Error("Image clipboard access is unavailable.");
        }
        const clipboardData = await prepareOpenDoorClipboard(item);
        await navigator.clipboard.write([new ClipboardItem({
          "image/png": clipboardData.pngBlob,
          "text/html": clipboardData.htmlBlob,
          "text/plain": clipboardData.textBlob
        })]);
      } else {
        await navigator.clipboard.writeText(item.character);
      }
      copied = true;
    } catch (_error) {
      if (item.imageSrc) {
        announce(item.name + " could not be copied as an image here. Use its download option instead.");
        return;
      }
      const temporary = document.createElement("textarea");
      temporary.value = item.character;
      temporary.setAttribute("aria-hidden", "true");
      document.body.appendChild(temporary);
      temporary.select();
      copied = document.execCommand("copy");
      temporary.remove();
    }

    if (!copied) {
      announce("Copy failed. Please try again.");
      return;
    }

    const previous = usage[item.id] || { count: 0, last: 0 };
    usage[item.id] = { count: previous.count + 1, last: Date.now() };
    writeStorage(STORAGE.usage, JSON.stringify(usage));
    lastCopied = item;
    renderLastCopied();
    if (contextId !== "frequent") {
      renderFrequentlyUsed();
    }
    announce(item.name + (item.imageSrc ? " copied as a small inline image with accessible HTML and a text fallback." : " copied to the clipboard."));
  }

  function frequentItems() {
    return Object.entries(usage)
      .map(function ([id, data]) { return { item: catalogById.get(id), data }; })
      .filter(function (entry) { return entry.item; })
      .sort(function (a, b) { return b.data.count - a.data.count || b.data.last - a.data.last; })
      .slice(0, 20)
      .map(function (entry) { return entry.item; });
  }

  function renderFrequentlyUsed() {
    renderExpressionTable(elements.frequentTable, frequentItems(), "Frequently Used", "frequent", "No frequently used expressions yet. Copy an expression and it will appear here.");
  }

  function renderFavorites() {
    const items = Array.from(favorites).map(function (id) { return catalogById.get(id); }).filter(Boolean);
    renderExpressionTable(elements.favoritesTable, items, "Favorites", "favorites", "No favorites yet. Copy an expression, then add the last copied expression to Favorites.");
  }

  function renderLastCopied() {
    if (!lastCopied) {
      elements.lastCopiedSection.hidden = true;
      return;
    }
    elements.lastCopiedSection.hidden = false;
    elements.lastCopiedText.textContent = lastCopied.name;
    const isFavorite = favorites.has(lastCopied.id);
    elements.favoriteLast.textContent = (isFavorite ? "Remove " : "Add ") + lastCopied.name + (isFavorite ? " from favorites" : " to favorites");
    elements.favoriteLast.setAttribute("aria-pressed", String(isFavorite));
  }

  function searchCatalog(query) {
    const words = normalize(query).split(/\s+/).filter(Boolean);
    if (!words.length) {
      return [];
    }
    return catalog
      .filter(function (item) { return words.every(function (word) { return item.searchText.includes(word); }); })
      .sort(function (a, b) {
        const queryText = normalize(query);
        const aName = normalize(a.name);
        const bName = normalize(b.name);
        const aScore = aName === queryText ? 0 : aName.startsWith(queryText) ? 1 : aName.includes(queryText) ? 2 : 3;
        const bScore = bName === queryText ? 0 : bName.startsWith(queryText) ? 1 : bName.includes(queryText) ? 2 : 3;
        return aScore - bScore || a.name.localeCompare(b.name);
      });
  }

  function closeSuggestions() {
    cancelSuggestionAnnouncement();
    activeSuggestion = -1;
    elements.suggestions.hidden = true;
    elements.search.setAttribute("aria-expanded", "false");
    elements.search.removeAttribute("aria-activedescendant");
  }

  function optionAnnouncement(item) {
    if (detailedDescriptions) {
      return item.name + ". " + detailsText(item);
    }
    return item.imageSrc ? item.name + ". Open Door image expression." : item.name;
  }

  function updateActiveSuggestion(nextIndex) {
    if (!suggestionMatches.length) {
      return;
    }
    activeSuggestion = Math.max(0, Math.min(nextIndex, suggestionMatches.length - 1));
    Array.from(elements.suggestions.children).forEach(function (option, index) {
      option.setAttribute("aria-selected", String(index === activeSuggestion));
    });
    const activeOption = elements.suggestions.children[activeSuggestion];
    elements.search.setAttribute("aria-activedescendant", activeOption.id);
    activeOption.scrollIntoView({ block: "nearest" });
  }

  function renderSuggestions() {
    cancelSuggestionAnnouncement();
    if (!elements.search.value.trim()) {
      closeSuggestions();
      return;
    }

    const matches = searchCatalog(elements.search.value);
    suggestionMatches = matches.slice(0, 10);
    activeSuggestion = -1;
    elements.suggestions.replaceChildren();

    if (!suggestionMatches.length) {
      closeSuggestions();
      scheduleSuggestionAnnouncement("No expression suggestions available.");
      return;
    }

    suggestionMatches.forEach(function (item, index) {
      const option = document.createElement("li");
      option.id = "suggestion-" + index;
      option.setAttribute("role", "option");
      option.setAttribute("aria-selected", "false");
      option.setAttribute("aria-label", optionAnnouncement(item));

      let character;
      if (item.imageSrc) {
        character = document.createElement("img");
        character.className = "suggestionImage";
        character.src = item.imageSrc;
        character.alt = "";
        character.setAttribute("aria-hidden", "true");
      } else {
        character = document.createElement("span");
        character.className = "suggestionCharacter";
        character.setAttribute("aria-hidden", "true");
        character.textContent = item.character;
      }
      const name = document.createElement("span");
      name.textContent = item.name;
      option.append(character, name);

      option.addEventListener("pointerdown", function (event) {
        event.preventDefault();
        copyExpression(item, "suggestions");
        closeSuggestions();
        elements.search.focus();
      });
      elements.suggestions.appendChild(option);
    });

    elements.suggestions.hidden = false;
    elements.search.setAttribute("aria-expanded", "true");
    scheduleSuggestionAnnouncement(matches.length === 1 ? "1 suggestion available." : matches.length + " suggestions available. Showing the first " + suggestionMatches.length + ".");
  }

  function showAllMatches() {
    const query = elements.search.value.trim();
    closeSuggestions();
    if (!query) {
      elements.search.focus();
      announce("Type a search term first.");
      return;
    }

    currentResults = searchCatalog(query);
    elements.resultsSection.hidden = false;
    const shown = currentResults.slice(0, 500);
    if (!currentResults.length) {
      elements.resultsSummary.textContent = "No expressions matched " + query + ".";
    } else if (currentResults.length > shown.length) {
      elements.resultsSummary.textContent = currentResults.length + " expressions matched " + query + ". Showing the first " + shown.length + ". Refine the search to narrow the results.";
    } else {
      elements.resultsSummary.textContent = currentResults.length + (currentResults.length === 1 ? " expression matched " : " expressions matched ") + query + ".";
    }
    renderExpressionTable(elements.resultsTable, shown, "Search Results for " + query, "search-results", "No matching expressions were found.");
    elements.resultsSummary.focus();
  }

  function clearSearch() {
    elements.search.value = "";
    currentResults = [];
    closeSuggestions();
    elements.resultsSection.hidden = true;
    elements.resultsTable.replaceChildren();
    elements.search.focus();
    announce("Search cleared.");
  }

  function renderThemeTable(theme, container) {
    const items = itemsForTheme(theme);
    if (theme.id === "open-door-expressions") {
      const subgroupOrder = ["Dino Expressions", "Dog Expressions", "Horse and Equine Expressions", "Plant Expressions"];
      subgroupOrder.forEach(function (subgroup) {
        const subgroupItems = items.filter(function (item) { return item.subgroup === subgroup; });
        if (!subgroupItems.length) {
          return;
        }
        const section = document.createElement("section");
        section.className = "openDoorSubgroup";
        const heading = document.createElement("h4");
        heading.textContent = subgroup;
        const tableContainer = document.createElement("div");
        renderExpressionTable(tableContainer, subgroupItems, subgroup, "open-door-subtable-" + safeId(subgroup), "No expressions are available in this collection.");
        section.append(heading, tableContainer);
        container.appendChild(section);
      });
    } else {
      renderExpressionTable(container, items, theme.title, "theme-" + theme.id, "No expressions are available in this theme.");
    }
    const imageItems = items.filter(function (item) { return item.imageSrc; });
    if (imageItems.length) {
      const downloads = document.createElement("details");
      downloads.className = "imageDownloads";
      const summary = document.createElement("summary");
      summary.textContent = "Download Open Door expression images";
      const list = document.createElement("ul");
      imageItems.forEach(function (item) {
        const listItem = document.createElement("li");
        const link = document.createElement("a");
        link.href = item.imageSrc;
        link.download = item.imageSrc.split("/").pop();
        link.textContent = "Download " + item.name + " image";
        listItem.appendChild(link);
        list.appendChild(listItem);
      });
      downloads.append(summary, list);
      container.appendChild(downloads);
    }
  }

  function moveTheme(themeId, direction) {
    const currentIndex = themeOrder.indexOf(themeId);
    let nextIndex = currentIndex;
    if (direction === "top") {
      nextIndex = 0;
    } else if (direction === "up") {
      nextIndex = Math.max(0, currentIndex - 1);
    } else if (direction === "down") {
      nextIndex = Math.min(themeOrder.length - 1, currentIndex + 1);
    }
    if (nextIndex === currentIndex) {
      return;
    }
    themeOrder.splice(currentIndex, 1);
    themeOrder.splice(nextIndex, 0, themeId);
    writeStorage(STORAGE.themeOrder, JSON.stringify(themeOrder));
    renderThemes(themeId);
    announce(themeById.get(themeId).title + " moved to position " + (nextIndex + 1) + ".");
  }

  function renderThemes(focusThemeId) {
    elements.themeSections.replaceChildren();
    themeOrder.forEach(function (themeId, index) {
      const theme = themeById.get(themeId);
      const items = itemsForTheme(theme);
      const section = document.createElement("section");
      const headingId = "theme-heading-" + theme.id;
      const tableId = "theme-table-" + theme.id;
      section.className = "themeSection";

      const header = document.createElement("div");
      header.className = "themeHeader";
      const text = document.createElement("div");
      text.className = "themeHeaderText";
      const heading = document.createElement("h3");
      heading.id = headingId;
      heading.tabIndex = -1;
      heading.textContent = theme.title;
      const description = document.createElement("p");
      description.textContent = theme.description + " " + items.length + (items.length === 1 ? " expression." : " expressions.");
      text.append(heading, description);

      const toggle = document.createElement("button");
      toggle.type = "button";
      toggle.setAttribute("aria-expanded", String(openThemes.has(theme.id)));
      toggle.setAttribute("aria-controls", tableId);
      toggle.textContent = (openThemes.has(theme.id) ? "Hide " : "Show ") + theme.title + " table";
      header.append(text, toggle);

      const options = document.createElement("details");
      options.className = "themeOptions";
      const optionsSummary = document.createElement("summary");
      optionsSummary.textContent = "Table options for " + theme.title;
      const moveActions = document.createElement("div");
      moveActions.className = "themeMoveActions";
      [
        { label: "Move to top", direction: "top", disabled: index === 0 },
        { label: "Move up", direction: "up", disabled: index === 0 },
        { label: "Move down", direction: "down", disabled: index === themeOrder.length - 1 }
      ].forEach(function (action) {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "secondaryButton";
        button.textContent = action.label + ": " + theme.title;
        button.disabled = action.disabled;
        button.addEventListener("click", function () { moveTheme(theme.id, action.direction); });
        moveActions.appendChild(button);
      });
      options.append(optionsSummary, moveActions);

      const tableContainer = document.createElement("div");
      tableContainer.id = tableId;
      tableContainer.hidden = !openThemes.has(theme.id);
      if (openThemes.has(theme.id)) {
        renderThemeTable(theme, tableContainer);
      }

      toggle.addEventListener("click", function () {
        if (openThemes.has(theme.id)) {
          openThemes.delete(theme.id);
          tableContainer.hidden = true;
          tableContainer.replaceChildren();
          toggle.textContent = "Show " + theme.title + " table";
          toggle.setAttribute("aria-expanded", "false");
          announce(theme.title + " table hidden.");
        } else {
          openThemes.add(theme.id);
          tableContainer.hidden = false;
          renderThemeTable(theme, tableContainer);
          toggle.textContent = "Hide " + theme.title + " table";
          toggle.setAttribute("aria-expanded", "true");
          announce(theme.title + " table shown with " + items.length + " expressions.");
        }
        writeStorage(STORAGE.openThemes, JSON.stringify(Array.from(openThemes)));
      });

      section.append(header, options, tableContainer);
      elements.themeSections.appendChild(section);
    });

    if (focusThemeId) {
      document.getElementById("theme-heading-" + focusThemeId)?.focus();
    }
  }

  function rerenderVisibleTables() {
    renderFrequentlyUsed();
    renderFavorites();
    if (!elements.resultsSection.hidden) {
      const query = elements.search.value.trim();
      renderExpressionTable(elements.resultsTable, currentResults.slice(0, 500), "Search Results for " + query, "search-results", "No matching expressions were found.");
    }
    renderThemes();
    if (!elements.suggestions.hidden) {
      renderSuggestions();
    }
  }

  elements.skipLink.addEventListener("click", function (event) {
    event.preventDefault();
    elements.search.focus();
  });

  elements.feedbackLink.addEventListener("click", function (event) {
    event.preventDefault();
    document.getElementById("feedbackHeading").focus();
  });

  elements.search.addEventListener("input", renderSuggestions);
  elements.search.addEventListener("keydown", function (event) {
    if (event.key === "ArrowDown" && !elements.suggestions.hidden) {
      event.preventDefault();
      updateActiveSuggestion(activeSuggestion < 0 ? 0 : activeSuggestion + 1);
    } else if (event.key === "ArrowUp" && !elements.suggestions.hidden) {
      event.preventDefault();
      updateActiveSuggestion(activeSuggestion < 0 ? suggestionMatches.length - 1 : activeSuggestion - 1);
    } else if (event.key === "Enter") {
      event.preventDefault();
      if (!elements.suggestions.hidden && activeSuggestion >= 0) {
        const item = suggestionMatches[activeSuggestion];
        copyExpression(item, "suggestions");
        closeSuggestions();
      } else {
        showAllMatches();
      }
    } else if (event.key === "Escape") {
      event.preventDefault();
      closeSuggestions();
    }
  });
  elements.search.addEventListener("blur", function () {
    window.setTimeout(closeSuggestions, 150);
  });
  elements.search.addEventListener("focus", function () {
    if (elements.search.value.trim()) {
      renderSuggestions();
    }
  });

  elements.showMatches.addEventListener("click", showAllMatches);
  elements.clearSearch.addEventListener("click", clearSearch);

  elements.detailsToggle.addEventListener("change", function () {
    detailedDescriptions = elements.detailsToggle.checked;
    writeStorage(STORAGE.details, String(detailedDescriptions));
    rerenderVisibleTables();
    elements.detailsToggle.focus();
    announce(detailedDescriptions ? "Detailed screen-reader descriptions on." : "Detailed screen-reader descriptions off.");
  });

  elements.columnCount.addEventListener("change", function () {
    columns = Number(elements.columnCount.value) === 5 ? 5 : 10;
    writeStorage(STORAGE.columns, String(columns));
    rerenderVisibleTables();
    elements.columnCount.focus();
    announce(columns + " expressions per row selected.");
  });

  elements.favoriteLast.addEventListener("click", function () {
    if (!lastCopied) {
      return;
    }
    if (favorites.has(lastCopied.id)) {
      favorites.delete(lastCopied.id);
      announce(lastCopied.name + " removed from favorites.");
    } else {
      favorites.add(lastCopied.id);
      announce(lastCopied.name + " added to favorites.");
    }
    writeStorage(STORAGE.favorites, JSON.stringify(Array.from(favorites)));
    renderFavorites();
    renderLastCopied();
    elements.favoriteLast.focus();
  });

  elements.resetThemeOrder.addEventListener("click", function () {
    themeOrder = defaultThemeOrder.slice();
    writeStorage(STORAGE.themeOrder, JSON.stringify(themeOrder));
    renderThemes();
    elements.resetThemeOrder.focus();
    announce("Default theme order restored.");
  });

  elements.feedbackForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    const response = buildFeedbackResponse(new FormData(elements.feedbackForm));
    const copied = await copyPlainText(response);
    const message = copied
      ? "Feedback response copied. Paste it into the Slack thread, an email, or another message."
      : "The feedback response could not be copied. Please try again.";
    elements.feedbackConfirmation.hidden = false;
    elements.feedbackConfirmation.textContent = message;
    announce(message);
  });

  elements.feedbackForm.addEventListener("reset", function () {
    window.setTimeout(function () {
      elements.feedbackConfirmation.hidden = true;
      elements.feedbackConfirmation.textContent = "";
      announce("Feedback form cleared.");
    }, 0);
  });

  elements.detailsToggle.checked = detailedDescriptions;
  elements.columnCount.value = String(columns);
  renderFrequentlyUsed();
  renderFavorites();
  renderThemes();
}());
