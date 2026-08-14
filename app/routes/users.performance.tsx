import { redirect } from '@remix-run/node';

/* Everything this page carried — image quality, photometric calibration, the
   depth of a 100-second exposure and the depth each survey reaches — is on the
   For Users overview, which answers the same question in one visit. */
export function loader() {
  return redirect('/users/overview', 301);
}
