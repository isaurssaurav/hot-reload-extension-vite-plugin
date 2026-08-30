import { defineConfig } from 'tsdown';

export default defineConfig([
  {
    entry: ['src/main.ts'],
    dts: true,
    splitting: false,
    sourcemap: false,
    clean: true,
    shims: true,
    format: ['cjs', 'esm'],
    target: false,
    deps: { neverBundle: ['vite'] }
  },
  // Built as separate single-entry configs so each script is emitted as one
  // self-contained file with no shared chunks: their output is read as raw text
  // and appended into unrelated extension files, which can't `require`/`import` a chunk.
  {
    entry: ['src/scripts/background-reload.ts'],
    outDir: 'dist/scripts',
    dts: false,
    sourcemap: false,
    clean: false,
    format: ['iife'],
    target: false,
    outputOptions: {
      entryFileNames: '[name].js'
    }
  },
  {
    entry: ['src/scripts/sidepanel-reload.ts'],
    outDir: 'dist/scripts',
    dts: false,
    sourcemap: false,
    clean: false,
    format: ['iife'],
    target: false,
    outputOptions: {
      entryFileNames: '[name].js'
    }
  }
]);
