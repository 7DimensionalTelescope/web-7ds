import { redirect } from '@remix-run/node';

/* The questions page is gone. Everything it answered now sits on the page that
   owns the subject — status, performance, data format — and the For Users
   landing is the honest place to start looking. */
export function loader() {
  return redirect('/users/status', 301);
}
