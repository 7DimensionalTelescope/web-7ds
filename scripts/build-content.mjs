#!/usr/bin/env node
/* ---------------------------------------------------------------------------
   Compile the site's content: content/**.yaml -> app/content/**.json.

   Everything a reader sees — every paragraph, heading, table row, caption and
   link — is written in content/, in YAML, so that it can be edited without
   reading any code (see content/README.md). The pages import the JSON this
   writes. It runs first in `npm run build`, `npm run dev` and
   `npm run typecheck`; app/content/ is generated and never edited by hand.

   It refuses to write anything if a file is malformed, so a bad edit fails the
   build — and, with automatic deployment, never reaches the live site. The one
   check beyond YAML syntax: a value written without quotes that YAML would
   read as a number and so silently change — `2.0` becomes 2, `01` becomes 1.
   Those have to be quoted, and the error says where.
--------------------------------------------------------------------------- */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseDocument, visit, isScalar } from 'yaml';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'content');
const OUT = path.join(ROOT, 'app', 'content');

const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : e.name.endsWith('.yaml') ? [p] : [];
  });

const lineOf = (text, offset) => text.slice(0, offset).split('\n').length;

const problems = [];
const outputs = [];

for (const file of walk(SRC)) {
  const rel = path.relative(SRC, file);
  const text = fs.readFileSync(file, 'utf8');
  const doc = parseDocument(text, { schema: 'core', prettyErrors: true, uniqueKeys: true });

  for (const e of doc.errors) problems.push(`${rel}: ${e.message}`);
  if (doc.errors.length) continue;

  visit(doc, {
    Scalar(_, node) {
      if (!isScalar(node) || typeof node.value !== 'number' || !node.range) return;
      if (node.type !== 'PLAIN') return;
      const source = text.slice(node.range[0], node.range[1]).trim();
      // numbers whose written form carries information a number cannot keep
      if (/^[+-]?0\d/.test(source) || /\.\d*0$/.test(source) || /^\+/.test(source)) {
        problems.push(
          `${rel}:${lineOf(text, node.range[0])}: "${source}" would be read as the number ` +
            `${node.value}. Put it in quotes — "${source}" — to keep it as written.`
        );
      }
    },
  });

  outputs.push([path.join(OUT, rel.replace(/\.yaml$/, '.json')), doc.toJS()]);
}

if (problems.length) {
  console.error(`\ncontent: ${problems.length} problem(s) — nothing was written.\n`);
  for (const p of problems) console.error('  ' + p);
  console.error('');
  process.exit(1);
}

// Replace the generated tree wholesale, so a deleted YAML file takes its JSON with it.
fs.rmSync(OUT, { recursive: true, force: true });
for (const [file, data] of outputs) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
}
console.log(`content: ${outputs.length} file(s) compiled`);
