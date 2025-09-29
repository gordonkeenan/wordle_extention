import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig(({ mode }) => {
  const isChrome = mode === 'chrome';
  const isFirefox = mode === 'firefox';
  const isUserscript = mode === 'userscript';

  return {
    build: {
      rollupOptions: {
        input: {
          background: resolve(__dirname, 'src/background.js'),
          content: resolve(__dirname, 'src/content.js'),
          popup: resolve(__dirname, 'src/popup.js'),
        },
        output: {
          entryFileNames: '[name].js',
          chunkFileNames: '[name]-[hash].js',
          assetFileNames: '[name].[ext]',
          dir: 'dist'
        }
      },
      outDir: 'dist',
      emptyOutDir: true,
      target: 'es2020',
      minify: mode === 'production'
    },
    define: {
      __BROWSER__: JSON.stringify(isChrome ? 'chrome' : isFirefox ? 'firefox' : 'userscript')
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    }
  };
});