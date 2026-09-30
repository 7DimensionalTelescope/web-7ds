import { redirect } from '@remix-run/node';

/* The Call for Proposals lists https://7ds.snu.ac.kr/overview beside the
   status and telescope pages as the facility overview. There was no such page;
   the survey overview is the one that fits between those two. */
export function loader() {
  return redirect('/survey/overview', 301);
}
