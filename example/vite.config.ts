import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import hotReloadExtension from 'hot-reload-extension-vite';

export default defineConfig((test) => {
  return {
    plugins: [
      vue(),
      hotReloadExtension({
        log: true,
        backgroundPath: 'src/pages/background/index.ts'
      }),
      viteStaticCopy({
        targets: [
          {
            src: 'manifest.json',
            dest: '.'
          }
        ]
      })
    ],
    build: {
      rollupOptions: {
        input: {
          popup: resolve(__dirname, 'src/pages/popup/index.html'),
          content: resolve(__dirname, 'src/pages/content/index.ts'),
          background: resolve(__dirname, 'src/pages/background/index.ts'),
          'dev-tools': resolve(__dirname, 'src/pages/dev-tools/index.html'),
          panel: resolve(__dirname, 'src/pages/panel/index.html')
        },
        output: {
          dir: 'dist',
          entryFileNames: 'src/pages/[name]/index.js',
          chunkFileNames: 'assets/js/[name].js'
        }
      }
    }
  };
});
