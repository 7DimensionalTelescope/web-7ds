import { redirect } from '@remix-run/node';

/* The combined themes page was split into one page per theme. The overview
   lists all seven and is the natural landing point for an old link. */
export function loader() {
  return redirect('/science/overview', 301);
}
