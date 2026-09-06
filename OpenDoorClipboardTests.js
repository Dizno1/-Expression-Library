(function () {
  "use strict";

  const IMAGE_URL = "assets/dinosmiling.png";
  const EXPRESSION_NAME = "Dino smiling";
  const COPY_SIZE = 32;
  const status = document.getElementById("clipboardStatus");
  let preparedImage = null;

  document.querySelector(".skipLink").addEventListener("click", function (event) {
    event.preventDefault();
    document.getElementById("test1").focus();
  });

  function announce(message) {
    status.textContent = "";
    window.setTimeout(function () {
      status.textContent = message;
    }, 40);
  }

  function canvasBlob(canvas) {
    return new Promise(function (resolve, reject) {
      canvas.toBlob(function (blob) {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("The resized image could not be created."));
        }
      }, "image/png");
    });
  }

  async function prepareImage() {
    if (preparedImage) {
      return preparedImage;
    }
    const response = await fetch(IMAGE_URL);
    if (!response.ok) {
      throw new Error("The Dino image could not be loaded.");
    }
    const originalBlob = await response.blob();
    const bitmap = await createImageBitmap(originalBlob);
    const canvas = document.createElement("canvas");
    canvas.width = COPY_SIZE;
    canvas.height = COPY_SIZE;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, COPY_SIZE, COPY_SIZE);
    context.drawImage(bitmap, 0, 0, COPY_SIZE, COPY_SIZE);
    bitmap.close();
    const pngBlob = await canvasBlob(canvas);
    const dataUrl = canvas.toDataURL("image/png");
    preparedImage = { pngBlob, dataUrl };
    return preparedImage;
  }

  function requireClipboard() {
    if (!window.ClipboardItem || !navigator.clipboard || !navigator.clipboard.write) {
      throw new Error("This browser does not provide the required clipboard access.");
    }
  }

  function htmlForImage(dataUrl) {
    return '<img src="' + dataUrl + '" alt="Dino smiling" width="32" height="32" style="display:inline-block;width:32px;height:32px;vertical-align:middle">';
  }

  async function runTest(testNumber) {
    requireClipboard();
    const image = await prepareImage();
    const textBlob = new Blob(["[Dino smiling]"], { type: "text/plain" });
    const htmlBlob = new Blob([htmlForImage(image.dataUrl)], { type: "text/html" });
    let clipboardData;
    let successMessage;

    if (testNumber === 1) {
      clipboardData = { "image/png": image.pngBlob };
      successMessage = "Test 1 copied Dino smiling as a 32 by 32 pixel PNG image.";
    } else if (testNumber === 2) {
      clipboardData = { "text/html": htmlBlob, "text/plain": textBlob };
      successMessage = "Test 2 copied Dino smiling as accessible HTML with a plain text fallback.";
    } else {
      clipboardData = { "image/png": image.pngBlob, "text/html": htmlBlob, "text/plain": textBlob };
      successMessage = "Test 3 copied Dino smiling in PNG, HTML, and plain text formats.";
    }

    await navigator.clipboard.write([new ClipboardItem(clipboardData)]);
    announce(successMessage);
  }

  [1, 2, 3].forEach(function (testNumber) {
    document.getElementById("test" + testNumber).addEventListener("click", async function () {
      try {
        await runTest(testNumber);
      } catch (_error) {
        announce("Test " + testNumber + " could not copy the expression in this browser.");
      }
    });
  });
}());
