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

/**
 * Fills {name.path} placeholders in content text from the data a page passes,
 * so a sentence that quotes a date or a count from a data file reads it rather
 * than restating it. A placeholder with nothing behind it is left as written,
 * which makes a mistyped name visible on the page instead of blank.
 */
export const fill = (text: string, vars: Record<string, unknown>) =>
  text.replace(/\{([A-Za-z][\w.]*)\}/g, (whole, path: string) => {
    const value = path
      .split('.')
      .reduce<unknown>((obj, key) => (obj && typeof obj === 'object' ? (obj as Record<string, unknown>)[key] : undefined), vars);
    return value === undefined || value === null ? whole : String(value);
  });
