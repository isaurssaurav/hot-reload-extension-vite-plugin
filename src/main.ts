import type { Plugin } from 'vite';
import { resolve } from 'path';
import WebSocket from 'ws';
import fs from 'fs';
import { initAndListenConnection } from './utils/websocket.js';
import { Message, PLUGIN_NAME, chalkLogger, isDev } from './utils/index.js';

type SidePanelOptions = {
  path: string;
  htmlPath?: string;
};

export type hotReloadExtensionOptions = {
  backgroundPath?: string;
  sidePanel?: SidePanelOptions;
  log?: boolean;
};

const hotReloadExtension = (options: hotReloadExtensionOptions): Plugin => {
  const { log, backgroundPath, sidePanel } = options;
  let ws: WebSocket | null = null;

  if (isDev) {
    initAndListenConnection((websocket) => {
      ws = websocket;
      if (log) {
        chalkLogger.green('Client connected! Ready to reload...');
      }
    });
  }

  let isUpdateFileSidePanel = false;

  return {
    name: PLUGIN_NAME,
    async transform(code: string, id: string) {
      isUpdateFileSidePanel = false;

      if (!isDev) {
        return;
      }

      if (!backgroundPath) {
        chalkLogger.red('Target file missing! Please, specify either `backgroundPath` in the plugin options');
      }

      if (sidePanel && !sidePanel.path) {
        chalkLogger.red('Target file missing! Please, specify `path` in the sidePanel options');
      }

      if (backgroundPath && id.includes(backgroundPath)) {
        const buffer = fs.readFileSync(resolve(__dirname, 'scripts/background-reload.js'));
        return {
          code: code + buffer.toString()
        };
      }

      if (sidePanel?.path && id.includes(sidePanel.path)) {
        const buffer = fs.readFileSync(resolve(__dirname, 'scripts/sidepanel-reload.js'));
        return {
          code: code + buffer.toString()
        };
      }

      if (
        (sidePanel?.path && id.includes(sidePanel.path)) ||
        (sidePanel?.htmlPath && id.includes(sidePanel.htmlPath))
      ) {
        isUpdateFileSidePanel = true;
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
        if (isUpdateFileSidePanel) {
          ws?.send(Message.FILE_CHANGE_SIDE_PANEL);
        } else {
          ws?.send(Message.FILE_CHANGE);
        }
        if (log) chalkLogger.green('Extension Reloaded...');
      }, 1000);
    }
  };
};

export default hotReloadExtension;
