import React from 'react';
import { Link } from '@remix-run/react';

/* ---------------------------------------------------------------------------
   The small piece of Markdown that content/ is written in.

   Content files hold plain text with a handful of inline marks, rendered here
   into the same elements the pages used when the text lived in the code:

     **bold**           -> <b>
     *emphasis*         -> <em>
     _title_            -> <i>        only between word boundaries, so file
                                      names such as T08147_m650_7DT02 are left
                                      alone
     `code`             -> <code>
     [text](/path)      -> a site link (client-side navigation)
     [text](/file.docx) -> a download link
     [text](mailto:…)   -> a mail link
     [text](https://…)  -> an external link, opened in a new tab
     \*                 -> a literal character

   Nothing else — no headings, lists or raw HTML. Structure belongs to the
   page layout; the content supplies only the words.
--------------------------------------------------------------------------- */

const DOWNLOAD = /\.(docx?|pdf|xlsx?|csv|zip|fits)$/i;

/**
 * A link whose kind follows from its address, by the rules above. Used by the
 * Markdown and by anything else that takes a link from a content file, so a
 * button to a .docx downloads just as a link to one does.
 */
export function SmartLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  if (/^https?:\/\//.test(href)) {
    return (
      <a className={className} href={href} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  }
  if (href.startsWith('/') && DOWNLOAD.test(href.split(/[?#]/)[0])) {
    return (
      <a className={className} href={href} download>
        {children}
      </a>
    );
  }
  if (href.startsWith('/')) {
    return (
      <Link className={className} to={href}>
        {children}
      </Link>
    );
  }
  return (
    <a className={className} href={href}>
      {children}
    </a>
  );
}

const WORD = /[A-Za-z0-9]/;

/** How `code` is drawn. A page may set it in its own style instead of <code>. */
export type CodeStyle = (text: string, key: number) => React.ReactNode;

const asCode: CodeStyle = (text, key) => <code key={key}>{text}</code>;

/** Inline Markdown to React nodes. */
export function inline(src: string, code: CodeStyle = asCode): React.ReactNode[] {
  const out: React.ReactNode[] = [];
  let text = '';
  let key = 0;
  const flush = () => {
    if (text) out.push(text);
    text = '';
  };

  let i = 0;
  while (i < src.length) {
    const c = src[i];

    if (c === '\\' && i + 1 < src.length) {
      text += src[i + 1];
      i += 2;
      continue;
    }

    if (c === '`') {
      const end = src.indexOf('`', i + 1);
      if (end > i) {
        flush();
        out.push(code(src.slice(i + 1, end), key++));
        i = end + 1;
        continue;
      }
    }

    if (c === '[') {
      const close = src.indexOf('](', i + 1);
      const end = close > i ? src.indexOf(')', close + 2) : -1;
      if (close > i && end > close) {
        flush();
        out.push(
          <SmartLink key={key++} href={src.slice(close + 2, end)}>
            {inline(src.slice(i + 1, close), code)}
          </SmartLink>
        );
        i = end + 1;
        continue;
      }
    }

    if (c === '*' && src[i + 1] === '*') {
      const end = src.indexOf('**', i + 2);
      if (end > i + 2) {
        flush();
        out.push(<b key={key++}>{inline(src.slice(i + 2, end), code)}</b>);
        i = end + 2;
        continue;
      }
    }

    if (c === '*' && src[i + 1] !== '*' && src[i + 1] !== ' ') {
      const end = src.indexOf('*', i + 1);
      if (end > i + 1 && src[end - 1] !== ' ') {
        flush();
        out.push(<em key={key++}>{inline(src.slice(i + 1, end), code)}</em>);
        i = end + 1;
        continue;
      }
    }

    if (c === '_' && !WORD.test(src[i - 1] ?? '') && src[i + 1] && src[i + 1] !== ' ') {
      let end = src.indexOf('_', i + 1);
      while (end > 0 && WORD.test(src[end + 1] ?? '')) end = src.indexOf('_', end + 1);
      if (end > i + 1 && src[end - 1] !== ' ') {
        flush();
        out.push(<i key={key++}>{inline(src.slice(i + 1, end), code)}</i>);
        i = end + 1;
        continue;
      }
    }

    text += c;
    i += 1;
  }
  flush();
  return out;
}

/** Inline Markdown, rendered into whatever element surrounds it. */
export function Md({ children, code }: { children?: string | null; code?: CodeStyle }) {
  if (!children) return null;
  return <>{inline(children, code)}</>;
}

/**
 * Paragraphs: a list of strings, or one string with blank lines between
 * paragraphs. Each becomes a <p> with the given class and style, which is how
 * a page adds or removes a paragraph without touching its layout.
 */
export function Paras({
  children,
  className,
  style,
}: {
  children?: string | string[] | null;
  className?: string;
  style?: React.CSSProperties;
}) {
  if (!children) return null;
  const list = Array.isArray(children)
    ? children
    : children.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
  return (
    <>
      {list.map((p, k) => (
        <p key={k} className={className} style={style}>
          {inline(p)}
        </p>
      ))}
    </>
  );
}
