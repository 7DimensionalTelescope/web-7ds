import { redirect } from '@remix-run/node';

/* The calculators are listed on Useful links now, with the project services.
   Found rather than moved permanently, in case they get a page again.
   /calculator/<slug> still opens each tool directly. */
export function loader() {
  return redirect('/users/links#calculators', 302);
}
