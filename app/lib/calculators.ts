import calculators from '../routes/content/calculators.json';

/* ---------------------------------------------------------------------------
   The observation calculators.

   They are Streamlit applications, opened directly rather than described on a
   page of their own first. `/calculator/<slug>` is kept as a stable address
   for each one and redirects to wherever it currently runs, so a link written
   down today survives the move onto this host.
--------------------------------------------------------------------------- */

export type Tool = {
  slug: string;
  n: string;
  name: string;
  /** Where the application is served from now. */
  url: string;
  question: string;
  metaDescription: string;
};

export const tools = calculators.tools as Tool[];

export function getTool(slug: string): Tool {
  const tool = tools.find((t) => t.slug === slug);
  if (!tool) throw new Response(`Unknown calculator: ${slug}`, { status: 404 });
  return tool;
}
