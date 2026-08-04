import { redirect } from '@remix-run/node';

/* The coverage map moved to Data Access, where it sits beside the coordinate
   query — the two answer the same question in different ways. */
export function loader() {
  return redirect('/users/access', 301);
}
