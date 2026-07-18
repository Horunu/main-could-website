// optimise-assets.mjs
// Batch-optimise could_live_website/assets:
//   .jpg/.jpeg/.png -> .webp (quality 82) via sharp
//   .svg            -> svgo (preset-default)
// Outputs to could_live_website/assets/optimised/, preserving subfolder structure.
// Originals are never touched.
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { optimize } from 'svgo';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ASSETS = path.join(__dirname, 'could_live_website', 'assets');
const OUT = path.join(ASSETS, 'optimised');
const QUALITY = 82;

const kb = (n) => (n / 1024).toFixed(1) + ' KB';
const pct = (o, n) => (o === 0 ? '0' : Math.round(((o - n) / o) * 100));

async function walk(dir) {
  const out = [];
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (full === OUT) continue; // never recurse into the output dir
      out.push(...(await walk(full)));
    } else {
      out.push(full);
    }
  }
  return out;
}

const RASTER = new Set(['.jpg', '.jpeg', '.png']);

const files = (await walk(ASSETS)).sort();
let totalOld = 0, totalNew = 0, count = 0;

console.log(`\nOptimising assets/ -> assets/optimised/  (webp q${QUALITY} + svgo)\n`);
console.log(
  'FILE'.padEnd(40) + 'ORIGINAL'.padStart(11) + 'NEW'.padStart(11) + 'SAVED'.padStart(8)
);
console.log('-'.repeat(70));

for (const file of files) {
  const ext = path.extname(file).toLowerCase();
  const rel = path.relative(ASSETS, file);
  const origSize = (await fs.stat(file)).size;
  let outRel, outBuf;

  if (RASTER.has(ext)) {
    outRel = rel.slice(0, -ext.length) + '.webp';
    outBuf = await sharp(file).webp({ quality: QUALITY }).toBuffer();
  } else if (ext === '.svg') {
    outRel = rel;
    const svg = await fs.readFile(file, 'utf8');
    const res = optimize(svg, { path: file, plugins: ['preset-default'] });
    outBuf = Buffer.from(res.data, 'utf8');
  } else {
    continue; // not an image — skip
  }

  const outPath = path.join(OUT, outRel);
  await fs.mkdir(path.dirname(outPath), { recursive: true });
  await fs.writeFile(outPath, outBuf);

  const newSize = outBuf.length;
  totalOld += origSize;
  totalNew += newSize;
  count++;

  console.log(
    rel.padEnd(40) +
      kb(origSize).padStart(11) +
      kb(newSize).padStart(11) +
      (pct(origSize, newSize) + '%').padStart(8) +
      '   -> optimised/' + outRel
  );
}

console.log('-'.repeat(70));
console.log(
  `${count} files   ${kb(totalOld)} -> ${kb(totalNew)}   (saved ${pct(totalOld, totalNew)}% overall)\n`
);
