// background.js

let color = '#3aa757';
let randomNumber = Math.floor(Math.random() * 10);

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log('Default background color set to %cgreen', `color: ${color}`);
});

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ randomNumber });
    console.log(`rad: ${randomNumber}`);
  });

  