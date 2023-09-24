import { Message } from '../utils';

chrome.runtime.onMessage.addListener((message) => {
  if (message === Message.RELOAD_EXTENSION) {
    chrome.tabs.query({ active: true }).then(() => {
      chrome.runtime.reload();
      chrome.tabs.reload();
    });
  }
});
