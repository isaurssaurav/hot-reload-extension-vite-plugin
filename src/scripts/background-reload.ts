import { HOT_RELOAD_EXTENSION_VITE_PORT, Message, isDev } from '../utils';

if (isDev) {
  try {
    const socket = new WebSocket(
      `ws://localhost:${HOT_RELOAD_EXTENSION_VITE_PORT}`
    );

    socket.addEventListener('message', (event) => {
      if (event.data === Message.FILE_CHANGE) {
        chrome.runtime.reload();
        chrome.tabs.reload();
      }
    });
  } catch (e) {
    console.info('Please run `npm run dev` to start socket.', e);
  }
}
