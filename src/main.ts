import type { Plugin } from 'vite';
import { resolve } from 'path';
import WebSocket from 'ws';
import fs from 'fs';
import { initAndListenConnection } from './utils/websocket';
import { Message, PLUGIN_NAME, chalkLogger, isDev } from './utils';

export type hotReloadExtensionOptions = {
  backgroundPath: string;
  log?: boolean;
};

let IS_TRANSFORMED = false;

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
      if (!isDev || IS_TRANSFORMED) {
        return;
      }

      if (id.includes(backgroundPath)) {
        IS_TRANSFORMED = true;

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
      // TODO BUG: when user triggers watch before previous build is completed, the extension crashes
      ws?.send(Message.FILE_CHANGE);
      if (log) chalkLogger.green('Extension Reloaded...');
    }
  };
};

export default hotReloadExtension;
