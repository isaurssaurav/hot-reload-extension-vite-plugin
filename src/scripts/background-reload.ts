import { HOT_RELOAD_EXTENSION_VITE_PORT, Message } from '../utils';
/**
 * If development, this code will be appended to background script file.
 */
const socket = new WebSocket(`ws://localhost:${HOT_RELOAD_EXTENSION_VITE_PORT}`);

socket.addEventListener('message', (event) => {
  if (event.data === Message.FILE_CHANGE) {
    chrome.runtime.reload();
    chrome.tabs.reload();
  }
});
