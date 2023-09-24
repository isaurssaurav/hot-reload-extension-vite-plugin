# Hot Reload Chrome Extension - Vite Plugin

This vite plugin provides simple solution to reload the chrome extension which runs on manifest v3.

## Usage

### Install

```bash
$ npm i hot-reload-extension-vite -D
```

### configuration

```js
import hotReloadExtensionVite from 'hot-reload-extension-vite';

export default {
  plugins: [
    hotReloadExtensionVite({
      log: true,
      contentPath: 'path/to/content-script', // src/pages/content/index.ts
      backgroundPath: 'path/to/background' // src/pages/background/index.ts
    })
  ]
};
```

## Options

| Options        | Type               | Description                             |
| -------------- | ------------------ | --------------------------------------- |
| log            | boolean (optional) | Logs error and info.                     |
| contentPath    | string (required)  | Path to content script file.            |
| backgroundPath | string(required)   | Path to background service worker file. |

## License

MIT
