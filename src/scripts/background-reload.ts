import { HOT_RELOAD_EXTENSION_VITE_PORT, Message } from '../utils';
/**
 * If development, this code will be appended to background script file.
 */
const socket = new WebSocket(`ws://localhost:${HOT_RELOAD_EXTENSION_VITE_PORT}`);

// No to let extension go to inactive state 
const keepAlive = () => setInterval(chrome.runtime.getPlatformInfo, 20e3);
chrome.runtime.onStartup.addListener(keepAlive);
keepAlive();

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
