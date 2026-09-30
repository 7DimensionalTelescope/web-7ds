import { redirect } from '@remix-run/node';
import { tools } from '../lib/calculators';

/* Bridge. nginx serves /overhead/ itself once deploy/calculators-locations.inc is
   installed, and never lets this route see the request. Until then the address
   printed in the Call for Proposals would reach the website and 404, so it
   goes to the calculator where it still runs. Delete once nginx is reloaded. */
export function loader() {
  const tool = tools.find((t) => t.slug === 'overhead');
  return redirect(tool ? tool.url : '/users/links#calculators', 302);
}
