import chalk from 'chalk';

export enum Message {
  FILE_CHANGE = 'file-change',
  RELOAD_EXTENSION = 'hot-reload-message-reload-extension'
}

export const isDev = process.env.NODE_ENV === 'development';
export const HOT_RELOAD_EXTENSION_VITE_PORT = process.env
  .HOT_RELOAD_EXTENSION_VITE_PORT
  ? parseInt(process.env.HOT_RELOAD_EXTENSION_VITE_PORT)
  : 8080;
export const PLUGIN_NAME = 'hot-reload-extension-vite';

export const chalkLogger = {
  green: (message: string) => {
    console.log(chalk.bgGreen(`[${PLUGIN_NAME}] ${message}`));
  },
  red: (message: string) => {
    console.log(chalk.blue.bgRed(`[${PLUGIN_NAME}] ${message}`));
  }
};
