import { WebSocket, WebSocketServer } from 'ws';
import { HOT_RELOAD_EXTENSION_VITE_PORT } from '.';

export function initAndListenConnection(cb: (websocket: WebSocket) => void) {
  const wss = new WebSocketServer({ port: HOT_RELOAD_EXTENSION_VITE_PORT });
  wss.on('connection', function connection(w) {
    w.on('error', console.error);
    cb(w);
  });
}
