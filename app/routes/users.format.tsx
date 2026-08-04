import { redirect } from '@remix-run/node';

/* Format was merged into data access: finding data and knowing what arrives
   are the same errand, and they were two pages answering halves of it. */
export function loader() {
  return redirect('/users/access#format', 301);
}
