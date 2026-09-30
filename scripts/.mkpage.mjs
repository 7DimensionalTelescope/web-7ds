import fs from 'node:fs';
import { stringify, parse } from 'yaml';
const [, , specPath, outPath] = process.argv;
const T = JSON.parse(fs.readFileSync('/home/dtak/.claude/jobs/5022b548/tmp/text.json', 'utf8'));
const spec = JSON.parse(fs.readFileSync(specPath, 'utf8'));
const header = spec.$header; delete spec.$header;
const resolve = (v) =>
  Array.isArray(v) ? v.map(resolve)
  : v && typeof v === 'object' ? ('$text' in v ? (() => { if (!(v.$text in T)) throw new Error('no text ' + v.$text); return T[v.$text]; })()
      : Object.fromEntries(Object.entries(v).map(([k, x]) => [k, resolve(x)])))
  : v;
const data = resolve(spec);
let y = stringify(data, { lineWidth: 96, minContentWidth: 40 });
if (JSON.stringify(parse(y, { schema: 'core' })) !== JSON.stringify(data)) throw new Error('round trip');
fs.mkdirSync(outPath.replace(/\/[^/]+$/, ''), { recursive: true });
fs.writeFileSync(outPath, (header ? header.split('\n').map((l) => ('# ' + l).trimEnd()).join('\n') + '\n\n' : '') + y);
console.log('wrote', outPath);
