/* ---------------------------------------------------------------------------
   Helpers for pages whose words live in content/pages/.

   A page file carries `meta` (the browser title and search description) and
   usually `hero`; the route imports the compiled JSON and passes these
   through, so neither is ever written in code.
--------------------------------------------------------------------------- */

export type PageMeta = { title: string; description: string };

/** A page file's `meta`, in the shape a Remix MetaFunction returns. */
export const metaOf = (page: { meta: PageMeta }) => [
  { title: page.meta.title },
  { name: 'description', content: page.meta.description },
];
