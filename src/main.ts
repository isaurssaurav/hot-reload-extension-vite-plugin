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
  contentPath: string;
  backgroundPath: string;
  log?: boolean;
};

const hotReloadExtensionVite = (
  options: hotReloadExtensionViteOptions
): Plugin => {
  const { log, contentPath, backgroundPath } = options;

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
      if (isDev && id.includes(contentPath)) {
        const buffer = fs.readFileSync(
          resolve(__dirname, 'scripts/content-reload.js')
        );
        return {
          code: code + buffer.toString()
        };
      }

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
      if (isDev && !ws)
        chalkLogger.red('Open tab with content script to start reloading...');
      if (isDev && ws) {
        if (log) chalkLogger.green('Extension Reloaded...');
        ws.send(Message.FILE_CHANGE);
      }
    }
  };
};

export default hotReloadExtensionVite;
