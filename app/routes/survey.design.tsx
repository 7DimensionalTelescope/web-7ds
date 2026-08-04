import { redirect } from '@remix-run/node';

/* Design was merged into the survey overview. */
export function loader() {
  return redirect('/survey/overview', 301);
}
