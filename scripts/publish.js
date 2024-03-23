import { branchConfigs, packages, rootDir } from './config.js';
import { publish } from '@tanstack/config/publish';

await publish({
  branch: process.env.BRANCH,
  branchConfigs,
  ghToken: process.env.GH_TOKEN,
  packages,
  rootDir,
  tag: process.env.TAG,
})
  .then(() => {
    console.log('Successfully published packages!');
  })
  .catch(console.error);

process.exit(0);
