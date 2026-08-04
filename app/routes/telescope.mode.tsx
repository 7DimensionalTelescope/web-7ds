import { redirect } from '@remix-run/node';

/* Observing modes moved to For Users, where they are read before proposing
   rather than as a property of the hardware. */
export function loader() {
  return redirect('/users/propose', 301);
}
