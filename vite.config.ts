import { defineConfig, mergeConfig } from 'vite';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { tanstackBuildConfig } from '@tanstack/config/build';
import eslint from 'vite-plugin-eslint';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
const viteConfig = defineConfig({
  plugins: [
    react(),
    {
      // default settings on build (i.e. fail on error)
      ...eslint(),
      apply: 'build',
    },
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
});

const tanstackConfig = tanstackBuildConfig({
  entry: './src/index.ts',
  outDir: './dist',
  srcDir: './src',
});

export default mergeConfig(viteConfig, tanstackConfig);
