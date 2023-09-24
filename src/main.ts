import type { Plugin } from 'vite';
import { resolve } from 'path';
import fs from 'fs';
import WebSocket, { WebSocketServer } from 'ws';
import {
  HOT_RELOAD_EXTENSION_VITE_PORT,
  Message,
  chalkLogger,
  isDev
} from './utils';

export type hotReloadExtensionViteOptions = {
  backgroundPath: string;
  log?: boolean;
};

const hotReloadExtensionVite = (
  options: hotReloadExtensionViteOptions
): Plugin => {
  const { log, backgroundPath } = options;

  let ws: WebSocket | null = null;

  if (isDev) {
    const wss = new WebSocketServer({ port: HOT_RELOAD_EXTENSION_VITE_PORT });
    wss.on('connection', function connection(w) {
      if (log) chalkLogger.green('Client connected! Ready to reload...');

      w.on('error', console.error);
      ws = w;
    });
  }

  return {
    name: 'hot-reload-extension-vite',
    async transform(code: string, id: string) {
      if (id.includes(backgroundPath)) {
        const buffer = fs.readFileSync(
          resolve(__dirname, 'scripts/background-reload.js')
        );
        return {
          code: code + buffer.toString()
        };
      }
    },
    closeBundle() {
      if (isDev && !ws) chalkLogger.red('Load extension to browser...');
      if (isDev && ws) {
        if (log) chalkLogger.green('Extension Reloaded...');
        ws.send(Message.FILE_CHANGE);
      }
    }
  };
};

export default hotReloadExtensionVite;
