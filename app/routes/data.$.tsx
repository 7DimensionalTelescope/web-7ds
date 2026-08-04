import type { LoaderFunctionArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';

/* The Data tab was replaced by For Users, and the sky coverage map moved under
   Survey. These paths were linked from elsewhere and may be bookmarked, so
   they redirect to whichever page now holds that content rather than 404ing. */
const MOVED: Record<string, string> = {
  overview: '/users/status',
  coverage: '/users/access',
  data: '/users/access',
  software: '/users/software',
};

export function loader({ params }: LoaderFunctionArgs) {
  const rest = params['*'] ?? '';
  return redirect(MOVED[rest.split('/')[0]] ?? '/users/status', 301);
}
