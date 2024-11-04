import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  server: {
    open: true,
    proxy: {
      '/items': {
        target: 'http://localhost:5428',
        changeOrigin: true, // Allows the proxy to modify the request's origin
      },
      '/allItems': {
        target: 'http://localhost:5428',
        changeOrigin: true,
      }
    }
  },
  resolve: {
    alias: {
      'shad': path.resolve(__dirname, './src/components/ui'),
    },
  },
});
