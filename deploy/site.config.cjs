/* pm2 definition of the site when it is deployed by deploy/autodeploy.sh.

   It runs whatever `current` points at. Paths go through the link rather than
   to a release, so a restart picks up the release the deployer has just
   switched to. remix-serve serves public/ and reads .env relative to its
   working directory, which is why cwd is the release itself.

     pm2 start ~/7ds-live/current/deploy/site.config.cjs && pm2 save

   DEPLOY_APP and DEPLOY_LIVE_PORT exist for testing the deployer beside the
   real site; left unset, this is the site: pm2 app `7ds` on port 3001.
*/
const path = require('path');
const os = require('os');

const root = process.env.DEPLOY_ROOT || path.join(os.homedir(), '7ds-live');
const current = path.join(root, 'current');

module.exports = {
  apps: [
    {
      name: process.env.DEPLOY_APP || '7ds',
      cwd: current,
      script: path.join(current, 'node_modules/@remix-run/serve/dist/cli.js'),
      interpreter: 'node',
      args: 'build/index.js',
      env: { PORT: process.env.DEPLOY_LIVE_PORT || '3001', NODE_ENV: 'production' },
    },
  ],
};
