function getNumber() {
  var minNumber = 0; // The minimum number you want
  var maxNumber = 100; // The maximum number you want
  var randomnumber = Math.floor(Math.random() * (maxNumber + 1) + minNumber); // Generates random number
  document.getElementById("myNumber").innerHTML = randomnumber; // Sets content of <div> to number
  return false; // Returns false just to tidy everything up
}

window.onload = getNumber; // Runs the function on click




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
