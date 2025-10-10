import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@preso/core': '/packages/preso-core/src',
      '@preso/react': '/packages/preso-react/src',
      '@preso/modules': '/packages/preso-modules/src',
    },
  },
});
