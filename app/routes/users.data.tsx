import { redirect } from '@remix-run/node';

/* "Using the data" described the products and how to work with them, which is
   what the data format page now sets out in full from the specification. */
export function loader() {
  return redirect('/users/format', 301);
}
