import { checker } from 'vite-plugin-checker';
import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import path from 'path';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    checker({
      overlay: false,
      terminal: true,
      typescript: true,
    }),
    {
      // do not fail on serve (i.e. local development)
      ...eslint({
        failOnError: false,
        failOnWarning: false,
        fix: true,
        fixTypes: ['layout', 'suggestion'],
      }),
      apply: 'serve',
      enforce: 'post',
    },
  ],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
  server: {
    open: mode === 'development',
  },
}));
