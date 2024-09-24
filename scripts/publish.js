import { publish } from '@tanstack/config/publish';

import { branchConfigs, packages, rootDirectory } from './config.js';

await publish({
  branch: process.env.BRANCH,
  branchConfigs,
  ghToken: process.env.GH_TOKEN,
  packages,
  rootDir: rootDirectory,
  tag: process.env.TAG,
})
  .then(() => {
    console.log('Successfully published packages!');
  })
  .catch(console.error);

// eslint-disable-next-line unicorn/no-process-exit
process.exit(0);
