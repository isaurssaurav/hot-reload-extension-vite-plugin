# Hot Reload Chrome Extension - Vite Plugin

> This Vite plugin offers an effortless solution for seamlessly refreshing a Chrome extension built on Manifest V3. With this plugin, you can streamline the development and testing process, ensuring your extension stays up-to-date without manual intervention.

Inspired by [stackoverflow answer](https://stackoverflow.com/a/65485938/7135342) and other similar repo.

![demo](https://raw.githubusercontent.com/isaurssaurav/hot-reload-extension-vite/main/demo/index.png)

## Usage

### Install

```bash
$ npm i hot-reload-extension-vite -D
```

### configuration

```js
import hotReloadExtension from 'hot-reload-extension-vite';

export default {
  plugins: [
    hotReloadExtension({
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
