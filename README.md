# Hot Reload Chrome Extension - Vite Plugin

> This Vite plugin offers an effortless solution for seamlessly refreshing a Chrome extension built on Manifest V3. With this plugin, you can streamline the development and testing process, ensuring your extension stays up-to-date without manual intervention.

Inspired by [stackoverflow answer](https://stackoverflow.com/a/65485938/7135342) and other similar repos.

![image](https://raw.githubusercontent.com/isaurssaurav/hot-reload-extension-vite/main/image.png)

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
      backgroundPath: 'path/to/background' // src/pages/background/index.ts
    })
  ]
};
```

Then run

```bash
$ NODE_ENV=development vite build --watch  // Override NODE_ENV
```

> Extension will only reload when NODE_ENV is 'development'

## Options

| Options        | Type               | Description                             |
| -------------- | ------------------ | --------------------------------------- |
| log            | boolean (optional) | Logs error and info.                    |
| backgroundPath | string (required)  | Path to background service worker file. |

## Env variables

| Variable                       | default | Description     |
| ------------------------------ | ------- | --------------- |
| HOT_RELOAD_EXTENSION_VITE_PORT | 8080    | Web socket port |

## License

MIT
