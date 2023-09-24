import { HOT_RELOAD_EXTENSION_VITE_PORT, Message, isDev } from '../utils';
if (isDev) {
  const socket = new WebSocket(
    `ws://localhost:${HOT_RELOAD_EXTENSION_VITE_PORT}`
  );

  socket.addEventListener('message', (event) => {
    if (event.data === Message.FILE_CHANGE) {
      chrome.runtime.sendMessage(Message.RELOAD_EXTENSION);
    }
  });
}
