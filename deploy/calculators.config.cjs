/* The four observation calculators, run on this host under pm2 like the site.
 *
 *   pm2 start deploy/calculators.config.cjs
 *   pm2 save                      # keep them across a reboot
 *
 * Each listens on 127.0.0.1 only: nginx is the one thing that reaches them,
 * at https://7ds.snu.ac.kr/<slug>/ — the addresses the Call for Proposals prints.
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
    '--server.baseUrlPath', `/${slug}`,
  ],
  env: { PORT: String(port), PYTHON, PYTHONNOUSERSITE: '1', MPLBACKEND: 'Agg' },
  autorestart: true,
  max_restarts: 10,
  restart_delay: 5000,
});

module.exports = {
  apps: [
    app('visibility', 'run_visibility.sh', 8509),
    app('exptime', 'run_etc.sh', 8510),
    app('overhead', 'run_overhead.sh', 8511),
    app('tile', 'run_tiles.sh', 8512),
  ],
};
