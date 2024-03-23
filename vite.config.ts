import { defineConfig, mergeConfig } from 'vite';
import { tanstackBuildConfig } from '@tanstack/config/build';
import path from 'path';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
const viteConfig = defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
});

const tanstackConfig = tanstackBuildConfig({
  entry: './src/index.ts',
  outDir: './dist',
  srcDir: './src',
});

export default mergeConfig(viteConfig, tanstackConfig);
