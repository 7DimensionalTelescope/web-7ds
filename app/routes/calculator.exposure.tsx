import { redirect } from '@remix-run/node';
import { getTool } from '../lib/calculators';

/* Found, not moved permanently: the calculator will be served from this site
   once nginx proxies it (deploy/calculators.nginx.conf), and a 301 would be
   cached by browsers long after that. */
export function loader() {
  return redirect(getTool('exposure').url, 302);
}
