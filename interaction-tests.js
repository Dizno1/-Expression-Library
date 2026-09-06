(function () {
  "use strict";

  const TEST_EXPRESSIONS = [
    { character: "😀", name: "Grinning face", meaning: "Happiness, friendliness, or excitement.", type: "Unicode emoji" },
    { character: "🤔", name: "Thinking face", meaning: "Thinking, questioning, or considering.", type: "Unicode emoji" },
    { character: "😂", name: "Face with tears of joy", meaning: "Strong laughter or finding something extremely funny.", type: "Unicode emoji" },
    { character: "🦖", name: "T-Rex", meaning: "Dinosaurs, prehistoric life, strength, or something old.", type: "Unicode emoji" },
    { character: "⚠️", name: "Warning", meaning: "Caution, danger, or important information requiring attention.", type: "Unicode emoji sequence" }
  ];

  const buttonTableBody = document.getElementById("buttonTableBody");
  const rowTableBody = document.getElementById("rowTableBody");
  const gridBody = document.getElementById("gridBody");
  const status = document.getElementById("testStatus");
  const actionMenu = document.getElementById("actionMenu");
  const menuItems = Array.from(actionMenu.querySelectorAll('[role="menuitem"]'));
  let activeExpression = null;
  let menuInvoker = null;
  const testFavorites = new Set();

  function announce(message) {
    status.textContent = "";
    window.setTimeout(function () {
      status.textContent = message;
    }, 40);
  }

  async function writeToClipboard(text, successMessage) {
    try {
      await navigator.clipboard.writeText(text);
      announce(successMessage);
    } catch (_error) {
      const temporary = document.createElement("textarea");
      temporary.value = text;
      temporary.setAttribute("aria-hidden", "true");
      document.body.appendChild(temporary);
      temporary.select();
      const copied = document.execCommand("copy");
      temporary.remove();
      announce(copied ? successMessage : "Copy failed. Please try again.");
    }
  }

  function copyExpression(expression, testName) {
    writeToClipboard(expression.character, expression.name + " copied in " + testName + ".");
  }

  function expressionCell(expression) {
    const cell = document.createElement("td");
    cell.setAttribute("aria-label", expression.name);
    cell.textContent = expression.character;
    return cell;
  }

  function textCell(text) {
    const cell = document.createElement("td");
    cell.textContent = text;
    return cell;
  }

  function buildButtonTable() {
    TEST_EXPRESSIONS.forEach(function (expression) {
      const row = document.createElement("tr");
      const expressionHeader = document.createElement("th");
      expressionHeader.scope = "row";

      const button = document.createElement("button");
      button.type = "button";
      button.className = "expressionButton";
      button.setAttribute("aria-label", expression.name + ". Copy expression");

      const visualCharacter = document.createElement("span");
      visualCharacter.setAttribute("aria-hidden", "true");
      visualCharacter.textContent = expression.character;
      button.appendChild(visualCharacter);

      button.addEventListener("click", function () {
        copyExpression(expression, "Test 1");
      });
      button.addEventListener("contextmenu", function (event) {
        event.preventDefault();
        openActionMenu(expression, button);
      });

      expressionHeader.appendChild(button);
      row.append(expressionHeader, textCell(expression.meaning), textCell(expression.type));
      buttonTableBody.appendChild(row);
    });
  }

  function buildFocusableRowTable() {
    TEST_EXPRESSIONS.forEach(function (expression) {
      const row = document.createElement("tr");
      row.className = "focusableRow";
      row.tabIndex = 0;
      row.setAttribute("aria-label", expression.name + ". Press Enter to copy. " + expression.meaning);
      row.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
          event.preventDefault();
          copyExpression(expression, "Test 2");
        }
      });
      row.append(expressionCell(expression), textCell(expression.name), textCell(expression.meaning));
      rowTableBody.appendChild(row);
    });
  }

  function buildGrid() {
    TEST_EXPRESSIONS.forEach(function (expression, index) {
      const row = document.createElement("tr");
      row.className = "gridRow";
      row.setAttribute("role", "row");
      row.tabIndex = index === 0 ? 0 : -1;
      row.setAttribute("aria-label", expression.name + ". Press Enter to copy. " + expression.meaning);

      const characterCell = expressionCell(expression);
      const nameCell = textCell(expression.name);
      const meaningCell = textCell(expression.meaning);
      characterCell.setAttribute("role", "gridcell");
      nameCell.setAttribute("role", "gridcell");
      meaningCell.setAttribute("role", "gridcell");
      row.append(characterCell, nameCell, meaningCell);

      row.addEventListener("keydown", function (event) {
        const rows = Array.from(gridBody.querySelectorAll(".gridRow"));
        const currentIndex = rows.indexOf(row);
        let nextIndex = currentIndex;

        if (event.key === "ArrowDown") {
          nextIndex = Math.min(rows.length - 1, currentIndex + 1);
        } else if (event.key === "ArrowUp") {
          nextIndex = Math.max(0, currentIndex - 1);
        } else if (event.key === "Home") {
          nextIndex = 0;
        } else if (event.key === "End") {
          nextIndex = rows.length - 1;
        } else if (event.key === "Enter") {
          event.preventDefault();
          copyExpression(expression, "Test 3");
          return;
        } else {
          return;
        }

        event.preventDefault();
        row.tabIndex = -1;
        rows[nextIndex].tabIndex = 0;
        rows[nextIndex].focus();
      });

      gridBody.appendChild(row);
    });
  }

  function openActionMenu(expression, invoker) {
    activeExpression = expression;
    menuInvoker = invoker;
    const favoriteItem = actionMenu.querySelector('[data-menu-action="favorite"]');
    favoriteItem.textContent = testFavorites.has(expression.name) ? "Remove from test favorites" : "Add to test favorites";
    actionMenu.hidden = false;
    menuItems[0].focus();
  }

  function closeActionMenu() {
    actionMenu.hidden = true;
    if (menuInvoker) {
      menuInvoker.focus();
    }
    activeExpression = null;
  }

  actionMenu.addEventListener("keydown", function (event) {
    const currentIndex = menuItems.indexOf(document.activeElement);
    let nextIndex;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      nextIndex = (currentIndex + 1) % menuItems.length;
      menuItems[nextIndex].focus();
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      nextIndex = (currentIndex - 1 + menuItems.length) % menuItems.length;
      menuItems[nextIndex].focus();
    } else if (event.key === "Home") {
      event.preventDefault();
      menuItems[0].focus();
    } else if (event.key === "End") {
      event.preventDefault();
      menuItems[menuItems.length - 1].focus();
    } else if (event.key === "Escape" || event.key === "Tab") {
      event.preventDefault();
      closeActionMenu();
    }
  });

  actionMenu.addEventListener("click", function (event) {
    const action = event.target.getAttribute("data-menu-action");
    if (!action || !activeExpression) {
      return;
    }

    if (action === "copy") {
      writeToClipboard(activeExpression.character, activeExpression.name + " copied from the action menu.");
    } else if (action === "copy-name") {
      writeToClipboard(activeExpression.character + " " + activeExpression.name, activeExpression.name + " and its name copied.");
    } else if (action === "favorite") {
      if (testFavorites.has(activeExpression.name)) {
        testFavorites.delete(activeExpression.name);
        announce(activeExpression.name + " removed from test favorites.");
      } else {
        testFavorites.add(activeExpression.name);
        announce(activeExpression.name + " added to test favorites.");
      }
    }
    closeActionMenu();
  });

  document.addEventListener("pointerdown", function (event) {
    if (!actionMenu.hidden && !actionMenu.contains(event.target) && event.target !== menuInvoker) {
      closeActionMenu();
    }
  });

  buildButtonTable();
  buildFocusableRowTable();
  buildGrid();
}());
