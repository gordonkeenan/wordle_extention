import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: 'presentation',
  base: './',
  build: {
    outDir: '../dist-presentation',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'presentation/index.html'),
        main: resolve(__dirname, 'presentation/presentation.html'),
        '7min': resolve(__dirname, 'presentation/presentation-7min.html')
      }
    },
    assetsInlineLimit: 0, // Don't inline assets
  },
  publicDir: resolve(__dirname, 'presentation')
});
