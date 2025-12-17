# Hot Reload Chrome Extension - Vite Plugin

![image](https://raw.githubusercontent.com/isaurssaurav/hot-reload-extension-vite/main/hot-reload-extension-vite.png)

> This Vite plugin offers an effortless solution for seamlessly refreshing a Chrome extension built on Manifest V3. With this plugin, you can streamline the development and testing process, ensuring your extension stays up-to-date without manual intervention.

Inspired by [stackoverflow answer](https://stackoverflow.com/a/65485938/7135342) and other similar repos.

https://github.com/isaurssaurav/hot-reload-extension-vite-plugin/assets/13806915/06228a73-4ae4-404f-8bee-717b0cae6eef

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

> Starting from `v1.0.14`, you can enable Side Panel hot reload support by passing the `sidePanel` option to the plugin.

Checkout [example project](https://github.com/isaurssaurav/hot-reload-extension-vite/tree/main/example) for a complete implementation.

```js
import hotReloadExtension from 'hot-reload-extension-vite';

export default {
  plugins: [
    hotReloadExtension({
      log: true,
      backgroundPath: 'path/to/background.ts',
      sidePanel: {
        scriptPath: 'path/to/sidePanel.ts',
        htmlPath: 'path/to/sidePanel.html' // Optional
      }
    })
  ]
};
```

Then run

```bash
$ NODE_ENV=development vite build --watch  // Override NODE_ENV
```

> Extension will only reload when NODE_ENV is 'development'

## Example Project

[Link](https://github.com/isaurssaurav/hot-reload-extension-vite/tree/main/example)

## Options

| Options        | Type                        | Description                             |
| -------------- | --------------------------- | --------------------------------------- |
| backgroundPath | string (required)           | Path to background service worker file. |
| log            | boolean (optional)          | Logs error and info.                    |
| sidePanel      | SidePanelOptions (Optional) | Path to sidePanel script and html file. |

```ts
type SidePanelOptions = {
  path: string;
  htmlPath: string;
};
```

## Env variables

| Variable                         | default | Description     |
| -------------------------------- | ------- | --------------- |
| `HOT_RELOAD_EXTENSION_VITE_PORT` | 8080    | Web socket port |

## License

MIT
