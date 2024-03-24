import { defineConfig, mergeConfig } from 'vite';
import { tanstackBuildConfig } from '@tanstack/config/build';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
const viteConfig = defineConfig({
  plugins: [react()],
});

const tanstackConfig = tanstackBuildConfig({
  entry: './src/index.ts',
  outDir: './dist',
  srcDir: './src',
});

export default mergeConfig(viteConfig, tanstackConfig);
