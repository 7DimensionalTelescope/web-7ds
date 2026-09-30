/* The four observation calculators, run on this host under pm2 like the site.
 *
 *   pm2 start deploy/calculators.config.cjs
 *   pm2 save                      # keep them across a reboot
 *
 * Each listens on 127.0.0.1 only: nginx is the one thing that reaches them,
 * under https://7ds.snu.ac.kr/calculator/<slug>/app/ (deploy/SUDO.md, step 3).
 * baseUrlPath has to match that prefix, or the app's own asset and websocket
 * URLs are built at the root and 404 behind the proxy.
 */
const CALC = '/home/dtak/7DT_calculator';
const PYTHON = '/home/dtak/miniconda3/envs/7dtcalc/bin/python';

const app = (slug, script, port) => ({
  name: `calc-${slug}`,
  cwd: CALC,
  script: `${CALC}/${script}`,
  interpreter: 'bash',
  args: [
    '--server.address', '127.0.0.1',
    '--server.baseUrlPath', `/calculator/${slug}/app`,
  ],
  env: { PORT: String(port), PYTHON, PYTHONNOUSERSITE: '1', MPLBACKEND: 'Agg' },
  autorestart: true,
  max_restarts: 10,
  restart_delay: 5000,
});

module.exports = {
  apps: [
    app('visibility', 'run_visibility.sh', 8509),
    app('exposure', 'run_etc.sh', 8510),
    app('overhead', 'run_overhead.sh', 8511),
    app('tiles', 'run_tiles.sh', 8512),
  ],
};
