# Hot Reload Chrome Extension - Vite Plugin

Inspired from [stackoverflow answer](https://stackoverflow.com/a/65485938/7135342) and other repo.
This vite plugin provides simple solution to reload the chrome extension which runs on manifest v3.
![ALT TEXT](https://github.com/isaurssaurav/hot-reload-extension-vite/tree/main/demo/index.png)

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

Then run

```bash
$ NODE_ENV=development vite build --watch
```

> Extension will only reload when NODE_ENV is 'development'

## Running example

In progress

## Options

| Options        | Type               | Description                             |
| -------------- | ------------------ | --------------------------------------- |
| log            | boolean (optional) | Logs error and info.                    |
| contentPath    | string (required)  | Path to content script file.            |
| backgroundPath | string(required)   | Path to background service worker file. |

## License

MIT
