import { Message } from '../utils/index.js';

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === Message.FILE_CHANGE_SIDE_PANEL) {
    window.location.reload();
  }
});
