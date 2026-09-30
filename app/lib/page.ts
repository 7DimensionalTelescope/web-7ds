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

/** Formats a placeholder may name after a bar: {nightly.n_nights|num}. */
export type Formats = Record<string, (value: never) => string>;

/**
 * Fills {name.path} placeholders in content text from the data a page passes,
 * so a sentence that quotes a date or a count from a data file reads it rather
 * than restating it. {path|format} passes the value through one of the
 * page's formats first. A placeholder with nothing behind it is left as
 * written, which makes a mistyped name visible on the page instead of blank.
 */
export const fill = (text: string, vars: Record<string, unknown>, formats: Formats = {}) =>
  text.replace(/\{([A-Za-z][\w.]*)(?:\|(\w+))?\}/g, (whole, path: string, format?: string) => {
    const value = path
      .split('.')
      .reduce<unknown>((obj, key) => (obj && typeof obj === 'object' ? (obj as Record<string, unknown>)[key] : undefined), vars);
    if (value === undefined || value === null) return whole;
    const f = format ? formats[format] : undefined;
    if (format && !f) return whole;
    return f ? f(value as never) : String(value);
  });

/** fill() over every string in a content object — a list of stats, a table. */
export function fillAll<T>(content: T, vars: Record<string, unknown>, formats: Formats = {}): T {
  if (typeof content === 'string') return fill(content, vars, formats) as T;
  if (Array.isArray(content)) return content.map((item) => fillAll(item, vars, formats)) as T;
  if (content && typeof content === 'object') {
    return Object.fromEntries(
      Object.entries(content).map(([k, item]) => [k, fillAll(item, vars, formats)])
    ) as T;
  }
  return content;
}
