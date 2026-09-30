// Pull literal constants out of a TSX file by evaluating their source text, so
// nothing is retyped: node scripts/.extract.mjs FILE NAME [NAME...]
// NAME may be `const:X` for `const X = [...]` or `prop:meta` for the first
// `meta={[...]}` prop, or `propN:meta` for the Nth.
import fs from 'node:fs';
import vm from 'node:vm';
const [, , file, ...names] = process.argv;
const src = fs.readFileSync(file, 'utf8');
const grab = (start) => {
  let i = src.indexOf('[', start), depth = 0, q = null;
  for (let j = i; j < src.length; j++) {
    const c = src[j];
    if (q) { if (c === '\\') { j++; continue; } if (c === q) q = null; continue; }
    if (c === "'" || c === '"' || c === '`') { q = c; continue; }
    if (c === '[' || c === '{') depth++;
    if (c === ']' || c === '}') { depth--; if (depth === 0) return src.slice(i, j + 1); }
  }
  throw new Error('unbalanced');
};
const out = {};
for (const n of names) {
  const [kind, key] = n.split(':');
  let at;
  if (kind === 'const') at = src.search(new RegExp(`const ${key}(?:\\s*:[^=]+)?\\s*=\\s*\\[`));
  else { const nth = Number(kind.slice(4) || 1); at = -1; for (let k = 0; k < nth; k++) at = src.indexOf(`${key}={[`, at + 1); }
  if (at < 0) throw new Error('not found ' + n);
  out[n] = vm.runInNewContext('(' + grab(at) + ')');
}
console.log(JSON.stringify(out));
