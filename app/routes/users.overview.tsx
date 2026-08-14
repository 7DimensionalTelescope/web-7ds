import { redirect } from '@remix-run/node';

/* The page was briefly called "overview". It is the performance page — what
   the array delivers — and is back at its own URL under that name. */
export function loader() {
  return redirect('/users/performance', 301);
}
