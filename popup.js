let changeColor = document.getElementById("changeColor");
let randomText = document.getElementById("randomText");

chrome.storage.sync.get("color", ({ color }) => {
  changeColor.style.backgroundColor = color;
});

// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: setPageBackgroundColor,
    });
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: setNumberUp,
      });
  });
  
  // The body of this function will be executed as a content script inside the
  // current page
  function setPageBackgroundColor() {
    chrome.storage.sync.get("color", ({ color }) => {
      document.body.style.backgroundColor = color;
    });
  }

  function setNumberUp()
  {
    let randomNumber = Math.floor(Math.random() * 10);
    chrome.storage.sync.set({ randomNumber });
    randomText.innerHTML = randomNumber;
  }