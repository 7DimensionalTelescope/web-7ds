import { redirect } from '@remix-run/node';

/* Array-wide operation figures moved to the For Users status page; per-survey
   progress lives on the RIS, WTS and IMS pages. */
export function loader() {
  return redirect('/users/status', 301);
}
