import { HOT_RELOAD_EXTENSION_VITE_PORT, Message } from '../utils';
/**
 * If development, this code will be appended to background script file.
 */
const socket = new WebSocket(`ws://localhost:${HOT_RELOAD_EXTENSION_VITE_PORT}`);

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === chrome.runtime.OnInstalledReason.UPDATE) {
    chrome.tabs.reload();
  }
});

socket.addEventListener('message', (event) => {
  if (event.data === Message.FILE_CHANGE) {
    chrome.runtime.reload();
  }
});
