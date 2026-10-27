#!/usr/bin/env node
/**
 * optimize-images.mjs — shrink the photo payload in `public/`.
 *
 * Why: several source photos were phone-camera originals (up to 12 MB) rendered at
 * ~128 px. This resizes them to what the UI actually displays and re-encodes them
 * as WebP, then rewrites every reference in `src/` and `index.html` when a file
 * changes extension.
 *
 * Usage:
 *   node scripts/optimize-images.mjs            # apply
 *   node scripts/optimize-images.mjs --dry-run  # report only, touch nothing
 *
 * Rules:
 *  - never grows a file: a rewrite only happens when the result is smaller
 *  - idempotent: already-optimised files are skipped
 *  - logos keep PNG (transparency); everything else becomes WebP
 *  - originals are in git, so `git checkout -- public/` is the rollback
 *
 * Requires ImageMagick (`convert` / `identify`) on PATH. No npm dependencies.
 */

import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC = path.join(ROOT, 'public');
const DRY = process.argv.includes('--dry-run');

/** Max longest edge per top-level folder, chosen from the rendered size in the UI. */
const MAX_EDGE = {
  team: 512, // MemberCard renders at w-32 (128 CSS px)
  gallery: 1024, // aspect-square grid card
  home: 1600, // full-bleed hero slider (1600 keeps it under 300 KB at q82)
  events: 1280,
  achievements: 1280,
  noixorgo: 1280,
  blogs: 1280,
};
const ROOT_LOGO_MAX = 320; // biggest source logo rendered at 96 CSS px (~3x DPR)
const ROOT_LOGO_MIN = 64 * 1024; // root logos are small art: anything over this is waste
/** Per-folder encoder quality; heroes are full-bleed behind an overlay, so q70 is
 *  visually indistinguishable there and is what keeps them under the 300 KB budget. */
const QUALITY = { home: 70 };
const SKIP = new Set(['vite.svg', 'logo.png', '10_year_logo.png']);
const MIN_SIZE_TO_BOTHER = 300 * 1024; // bytes

const bin = (name) => {
  try {
    execFileSync('command', ['-v', name], { shell: '/bin/bash' });
    return name;
  } catch {
    return null;
  }
};
const CONVERT = bin('convert');
const IDENTIFY = bin('identify');
if (!CONVERT || !IDENTIFY) {
  console.error('ImageMagick not found on PATH (need `convert` and `identify`).');
  process.exit(2);
}

const identify = (file, fmt) => execFileSync(IDENTIFY, ['-format', fmt, file]).toString();
const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : [p];
  });

const kb = (n) => `${(n / 1024).toFixed(1)} KB`;

function maxEdgeFor(file) {
  const rel = path.relative(PUBLIC, file);
  if (!rel.includes(path.sep)) return ROOT_LOGO_MAX; // top-level: the logos
  return MAX_EDGE[rel.split(path.sep)[0]] ?? 1280;
}

function convertTo(src, dest, edge, extra = [], quality = 82) {
  // `>` only shrinks; never upscales an already-small image.
  execFileSync(CONVERT, [
    src,
    '-resize',
    `${edge}x${edge}>`,
    '-strip',
    '-quality',
    String(quality),
    ...(dest.endsWith('.webp') ? ['-define', 'webp:method=6'] : []),
    ...extra,
    dest,
  ]);
}

const files = walk(PUBLIC).filter((f) => /\.(jpe?g|png|webp)$/i.test(f));
const renames = new Map(); // absolute old path -> absolute new path
let saved = 0;
let touched = 0;

for (const file of files) {
  const base = path.basename(file);
  if (SKIP.has(base)) {
    // Logos: keep PNG (alpha), just drop the payload.
    const before = fs.statSync(file).size;
    if (before <= ROOT_LOGO_MIN) continue;
    const tmp = `${file}.tmp.png`;
    try {
      // Logos are flat art: quantising to a 256-colour palette is the big win and
      // is lossless-looking at the 48 px they are actually rendered at.
      convertTo(file, tmp, ROOT_LOGO_MAX, ['-colors', '256'], 82);
      const after = fs.statSync(tmp).size;
      if (after < before) {
        saved += before - after;
        touched++;
        if (DRY) fs.rmSync(tmp);
        else fs.renameSync(tmp, file);
        console.log(`  ~ ${base}: ${kb(before)} -> ${kb(after)} (png)`);
      } else {
        fs.rmSync(tmp);
      }
    } catch (err) {
      if (fs.existsSync(tmp)) fs.rmSync(tmp);
      console.error(`  ! ${base}: ${String(err.message).split('\n')[0]}`);
    }
    continue;
  }

  const before = fs.statSync(file).size;
  const width = Number(identify(file, '%w'));
  const height = Number(identify(file, '%h'));
  const edge = maxEdgeFor(file);
  const quality = QUALITY[path.relative(PUBLIC, file).split(path.sep)[0]] ?? 82;
  const alreadySmall = before <= MIN_SIZE_TO_BOTHER && Math.max(width, height) <= edge;
  if (alreadySmall) continue;

  const isWebp = file.endsWith('.webp');
  const dest = isWebp ? file : file.replace(/\.[^.]+$/, '.webp');
  // ImageMagick picks the encoder from the extension, so the temp file must keep it.
  const destExt = path.extname(dest);
  const tmp = path.join(path.dirname(dest), `.${path.basename(dest, destExt)}.tmp${destExt}`);

  try {
    convertTo(file, tmp, edge, [], quality);
    const after = fs.statSync(tmp).size;
    if (after >= before) {
      fs.rmSync(tmp);
      continue; // no gain, leave the original alone
    }
    if (DRY) {
      fs.rmSync(tmp);
      console.log(`  ~ ${path.relative(ROOT, file)}: ${kb(before)} -> ${kb(after)}${dest !== file ? ` -> ${path.basename(dest)}` : ''}`);
      saved += before - after;
      touched++;
      continue;
    }
    fs.renameSync(tmp, dest);
    if (dest !== file) {
      fs.rmSync(file);
      renames.set(file, dest);
    }
    saved += before - after;
    touched++;
    console.log(
      `  ~ ${path.relative(ROOT, file)}: ${kb(before)} ${width}x${height} -> ${kb(after)} ${identify(dest, '%wx%h')}${dest !== file ? ` (${path.basename(dest)})` : ''}`,
    );
  } catch (err) {
    if (fs.existsSync(tmp)) fs.rmSync(tmp);
    console.error(`  ! ${path.relative(ROOT, file)}: ${String(err.message).split('\n')[0]}`);
  }
}

// --- rewrite references for anything that changed name -----------------------
const REF_FILES = [
  ...walk(path.join(ROOT, 'src')).filter((f) => /\.(jsx?|json|css)$/.test(f)),
  path.join(ROOT, 'index.html'),
];
let refEdits = 0;
for (const [oldAbs, newAbs] of renames) {
  const oldUrl = `/${path.relative(PUBLIC, oldAbs).split(path.sep).join('/')}`;
  const newUrl = `/${path.relative(PUBLIC, newAbs).split(path.sep).join('/')}`;
  for (const refFile of REF_FILES) {
    const text = fs.readFileSync(refFile, 'utf8');
    if (!text.includes(oldUrl)) continue;
    if (DRY) {
      console.log(`  ref ${oldUrl} -> ${newUrl} in ${path.relative(ROOT, refFile)}`);
      continue;
    }
    fs.writeFileSync(refFile, text.split(oldUrl).join(newUrl));
    refEdits++;
    console.log(`  ref ${oldUrl} -> ${newUrl} in ${path.relative(ROOT, refFile)}`);
  }
}

const total = walk(PUBLIC).reduce((n, f) => n + fs.statSync(f).size, 0);
console.log(
  `\n${DRY ? '[dry-run] ' : ''}optimised ${touched} file(s), freed ${kb(saved)}; ` +
    `${renames.size} renamed, ${refEdits} reference(s) updated.`,
);
console.log(`public/ is now ${kb(total)} (${(total / 1024 / 1024).toFixed(1)} MB).`);
