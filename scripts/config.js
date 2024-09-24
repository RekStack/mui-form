import path from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * List your npm packages here. The first package will be used as the versioner.
 * @type {import('./types').Package[]}
 */
export const packages = [
  {
    name: '@rekstack/mui-form',
    packageDir: '.',
  },
];

/**
 * Contains config for publishable branches.
 * @type {Record<string, import('./types').BranchConfig>}
 */
export const branchConfigs = {
  alpha: {
    prerelease: true,
  },
  beta: {
    prerelease: true,
  },
  main: {
    prerelease: false,
  },
  next: {
    prerelease: true,
  },
};

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export const rootDirectory = path.resolve(__dirname, '..');
