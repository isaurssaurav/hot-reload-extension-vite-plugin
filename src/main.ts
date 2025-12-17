import type { Plugin } from 'vite';
import { resolve } from 'path';
import WebSocket from 'ws';
import fs from 'fs';
import { initAndListenConnection } from './utils/websocket.js';
import { Message, PLUGIN_NAME, chalkLogger, isDev } from './utils/index.js';

export type hotReloadExtensionOptions = {
  backgroundPath: string;
  log?: boolean;
};

const hotReloadExtension = (options: hotReloadExtensionOptions): Plugin => {
  const { log, backgroundPath } = options;
  let ws: WebSocket | null = null;

  if (isDev) {
    initAndListenConnection((websocket) => {
      ws = websocket;
      if (log) {
        chalkLogger.green('Client connected! Ready to reload...');
      }
    });
  }

  return {
    name: PLUGIN_NAME,
    async transform(code: string, id: string) {
      if (!isDev) {
        return;
      }

      if (id.includes(backgroundPath)) {
        const buffer = fs.readFileSync(resolve(__dirname, 'scripts/background-reload.js'));
        return {
          code: code + buffer.toString()
        };
      }
    },
    async closeBundle() {
      if (!isDev) {
        return;
      }

      if (!ws) {
        chalkLogger.red('Load extension to browser...');
        return;
      }
      setTimeout(() => {
        ws?.send(Message.FILE_CHANGE);
        if (log) chalkLogger.green('Extension Reloaded...');
      }, 1000);
    }
  };
};

export default hotReloadExtension;
