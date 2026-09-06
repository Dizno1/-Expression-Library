(function () {
  "use strict";

  const DEMO_EXPRESSIONS = [
    { id: "grinning", character: "😀", name: "Grinning face", meaning: "Happiness, friendliness, excitement, or a cheerful greeting.", type: "Unicode emoji" },
    { id: "smiling-eyes", character: "😄", name: "Grinning face with smiling eyes", meaning: "Open happiness, amusement, or cheerful excitement.", type: "Unicode emoji" },
    { id: "tears-joy", character: "😂", name: "Face with tears of joy", meaning: "Strong laughter or finding something extremely funny.", type: "Unicode emoji" },
    { id: "rolling-floor", character: "🤣", name: "Rolling on the floor laughing", meaning: "Intense or uncontrollable laughter.", type: "Unicode emoji" },
    { id: "wink", character: "😉", name: "Winking face", meaning: "Playfulness, friendly teasing, humor, or a statement that is not entirely serious.", type: "Unicode emoji" },
    { id: "sunglasses", character: "😎", name: "Smiling face with sunglasses", meaning: "Confidence, approval, relaxation, or feeling cool.", type: "Unicode emoji" },
    { id: "silly", character: "🤪", name: "Zany face", meaning: "Silliness, wild excitement, or acting goofy.", type: "Unicode emoji" },
    { id: "party", character: "🥳", name: "Partying face", meaning: "Celebration, congratulations, birthdays, or exciting news.", type: "Unicode emoji" },
    { id: "cat-joy", character: "😹", name: "Cat with tears of joy", meaning: "Strong laughter or amusement expressed as a cat face.", type: "Unicode emoji" },
    { id: "t-rex", character: "🦖", name: "T-Rex", meaning: "Dinosaurs, prehistoric life, strength, or something old.", type: "Unicode emoji" }
  ];

  const detailsToggle = document.getElementById("detailsToggle");
  const columnCount = document.getElementById("columnCount");
  const tableBody = document.getElementById("expressionTableBody");
  const status = document.getElementById("demoStatus");

  function readPreference(key, fallback) {
    try {
      const value = localStorage.getItem(key);
      return value === null ? fallback : value;
    } catch (_error) {
      return fallback;
    }
  }

  function savePreference(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (_error) {
      return;
    }
  }

  function announce(message) {
    status.textContent = "";
    window.setTimeout(function () {
      status.textContent = message;
    }, 40);
  }

  async function copyExpression(expression) {
    try {
      await navigator.clipboard.writeText(expression.character);
      announce(expression.name + " copied to the clipboard.");
    } catch (_error) {
      const temporary = document.createElement("textarea");
      temporary.value = expression.character;
      temporary.setAttribute("aria-hidden", "true");
      document.body.appendChild(temporary);
      temporary.select();
      const copied = document.execCommand("copy");
      temporary.remove();
      announce(copied ? expression.name + " copied to the clipboard." : "Copy failed. Please try again.");
    }
  }

  function createExpressionCell(expression, detailed) {
    const cell = document.createElement("td");
    const button = document.createElement("button");
    const detailsId = "details-" + expression.id;

    button.type = "button";
    button.className = "compactExpressionButton";
    button.setAttribute("aria-label", expression.name);
    if (detailed) {
      button.setAttribute("aria-describedby", detailsId);
    }

    const visualCharacter = document.createElement("span");
    visualCharacter.setAttribute("aria-hidden", "true");
    visualCharacter.textContent = expression.character;

    const details = document.createElement("span");
    details.id = detailsId;
    details.hidden = true;
    details.textContent = expression.meaning + " " + expression.type + ".";

    button.appendChild(visualCharacter);
    button.addEventListener("click", function () {
      copyExpression(expression);
    });
    cell.append(button, details);
    return cell;
  }

  function renderTable() {
    const detailed = detailsToggle.checked;
    const columns = Number(columnCount.value);
    tableBody.replaceChildren();

    for (let index = 0; index < DEMO_EXPRESSIONS.length; index += columns) {
      const row = document.createElement("tr");
      DEMO_EXPRESSIONS.slice(index, index + columns).forEach(function (expression) {
        row.appendChild(createExpressionCell(expression, detailed));
      });
      tableBody.appendChild(row);
    }
  }

  detailsToggle.checked = readPreference("expression-demo-details", "false") === "true";
  columnCount.value = readPreference("expression-demo-columns", "5");

  detailsToggle.addEventListener("change", function () {
    savePreference("expression-demo-details", String(detailsToggle.checked));
    renderTable();
    detailsToggle.focus();
    announce(detailsToggle.checked ? "Detailed screen-reader descriptions on." : "Detailed screen-reader descriptions off.");
  });

  columnCount.addEventListener("change", function () {
    savePreference("expression-demo-columns", columnCount.value);
    renderTable();
    columnCount.focus();
    announce(columnCount.value + " expressions per row selected.");
  });

  renderTable();
}());
