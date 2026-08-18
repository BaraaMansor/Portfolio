/**
 * Converts the raw screenshots/photos in /public into properly sized WebP.
 * Run with: npm run images:optimize
 */
import sharp from 'sharp';
import { readdir, stat } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(process.cwd(), 'public');

const jobs = [
  // Project screenshots: displayed at ~700px wide max, 2x for retina.
  ...(await readdir(path.join(root, 'projects')))
    .filter(f => /\.(png|jpe?g)$/i.test(f))
    .map(f => ({
      src: path.join(root, 'projects', f),
      out: path.join(root, 'projects', f.replace(/\.(png|jpe?g)$/i, '.webp')),
      width: 1200,
      quality: 78,
    })),
  {
    src: path.join(root, 'prj-placeholder.png'),
    out: path.join(root, 'prj-placeholder.webp'),
    width: 1200,
    quality: 78,
  },
  // Portrait: displayed small (~64px), keep 256 for retina + og fallback.
  {
    src: path.join(root, 'my-image.JPG'),
    out: path.join(root, 'me.webp'),
    width: 320,
    quality: 82,
  },
];

for (const job of jobs) {
  try {
    await stat(job.src);
  } catch {
    console.log(`skip (missing): ${path.basename(job.src)}`);
    continue;
  }
  const info = await sharp(job.src)
    .rotate() // respect EXIF orientation
    .resize({ width: job.width, withoutEnlargement: true })
    .webp({ quality: job.quality })
    .toFile(job.out);
  const before = (await stat(job.src)).size;
  console.log(
    `${path.basename(job.src)} -> ${path.basename(job.out)}  ` +
      `${(before / 1024).toFixed(0)}KB -> ${(info.size / 1024).toFixed(0)}KB`
  );
}
