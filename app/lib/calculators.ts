import calculators from '../content/data/calculators.json';

/* ---------------------------------------------------------------------------
   The observation calculators.

   They are Streamlit applications served from this site at /<slug> — the
   addresses the Call for Proposals and the Phase 1 Instructions print, so
   they are addresses the site has to keep working.
--------------------------------------------------------------------------- */

export type Tool = {
  slug: string;
  n: string;
  name: string;
  /** Where it is served from this site: /visibility, /exptime, ... */
  path: string;
  /** The lyman address — only for the bridge while nginx does not serve `path`. */
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
