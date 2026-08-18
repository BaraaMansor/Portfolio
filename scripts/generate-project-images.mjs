/**
 * Regenerates the project images in /public/projects.
 *
 * For every project with a live URL it screenshots the real site, then
 * composes the capture inside a branded browser-window frame on the
 * portfolio's ink/gold backdrop, at exactly 16:10 so the cards never crop.
 *
 * Requires Chrome installed locally plus one extra dev package:
 *   npm i --no-save puppeteer-core
 *   node scripts/generate-project-images.mjs [name]
 *
 * Pass a project name to regenerate only that image.
 */
import puppeteer from 'puppeteer-core';
import sharp from 'sharp';
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUT_DIR = path.resolve(process.cwd(), 'public', 'projects');
const TMP = path.join(os.tmpdir(), 'portfolio-shots');
await mkdir(TMP, { recursive: true });

// Window content area is 1400x816 inside a 1600x1000 (16:10) canvas.
const SITES = [
  { name: 'echelon', url: 'https://echelon-sigma-five.vercel.app/invite/IGM214XE', domain: 'echelon.app' },
  { name: 'lancul', url: 'https://lancul.net/', domain: 'lancul.net' },
  { name: 'ecampus', url: 'https://ecampusjo.com/', domain: 'ecampusjo.com' },
  { name: 'ui-landing', url: 'https://unlimited-innovation.pages.dev/', domain: 'unlimited-innovation.pages.dev' },
  { name: 'tracktide', url: 'https://tracktide.pages.dev/', domain: 'tracktide.pages.dev' },
];

const frameHtml = (domain, contentHtml) => `<!DOCTYPE html>
<html><head><meta charset="utf-8"><style>
  * { margin: 0; box-sizing: border-box; }
  body {
    width: 1600px; height: 1000px; overflow: hidden;
    background:
      radial-gradient(ellipse 60% 45% at 75% -5%, rgba(255,229,161,0.10), transparent 70%),
      radial-gradient(ellipse 50% 40% at 10% 105%, rgba(120,90,220,0.10), transparent 70%),
      linear-gradient(160deg, #0d0f2e 0%, #090a22 55%, #0b0c28 100%);
    display: flex; align-items: center; justify-content: center;
    font-family: 'Segoe UI', system-ui, sans-serif;
  }
  .grid {
    position: absolute; inset: 0;
    background-image: radial-gradient(circle, rgba(255,229,161,0.05) 1px, transparent 1px);
    background-size: 36px 36px;
  }
  .window {
    position: relative;
    width: 1400px; border-radius: 14px; overflow: hidden;
    border: 1px solid rgba(255,255,255,0.16);
    box-shadow: 0 40px 90px rgba(0,0,0,0.55), 0 0 0 1px rgba(0,0,0,0.4);
  }
  .bar {
    height: 44px; background: #191b3f;
    border-bottom: 1px solid rgba(255,255,255,0.08);
    display: flex; align-items: center; padding: 0 18px; gap: 8px;
  }
  .dot { width: 12px; height: 12px; border-radius: 50%; }
  .url {
    margin: 0 auto; transform: translateX(-26px);
    background: rgba(9,10,34,0.7); border: 1px solid rgba(255,255,255,0.08);
    border-radius: 8px; padding: 5px 22px;
    color: #aaa4c3; font-size: 14px; font-family: Consolas, monospace;
  }
  .content { width: 1400px; height: 816px; background: #090a22; }
  .content img { width: 100%; height: 100%; object-fit: cover; object-position: top; display: block; }
</style></head>
<body>
  <div class="grid"></div>
  <div class="window">
    <div class="bar">
      <div class="dot" style="background:#ff5f57"></div>
      <div class="dot" style="background:#febc2e"></div>
      <div class="dot" style="background:#28c840"></div>
      <div class="url">${domain}</div>
    </div>
    <div class="content">${contentHtml}</div>
  </div>
</body></html>`;

// In-window content for projects without a public site.
const tajerContent = `
  <div style="width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px;
              background:radial-gradient(ellipse 70% 60% at 50% 40%, #0e4232, #072a1f 75%);">
    <div style="font-family:Georgia,serif;font-size:110px;font-weight:bold;color:#35d399;letter-spacing:-2px;">tajer<span style="color:#a7f3d0;">.</span></div>
    <div style="font-size:26px;color:#c7e8db;letter-spacing:0.06em;">The B2B e-commerce platform</div>
    <div style="margin-top:14px;font-family:Consolas,monospace;font-size:16px;color:#7dbfa5;letter-spacing:0.2em;">HONO.JS / D1 / CLOUDFLARE EDGE</div>
  </div>`;

const dazenContent = `
  <div style="width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px;
              background:radial-gradient(ellipse 70% 60% at 50% 40%, #131538, #090a22 75%);">
    <div style="font-family:Georgia,serif;font-size:110px;font-style:italic;color:#ffe5a1;letter-spacing:-2px;">Dazen</div>
    <div style="font-size:26px;color:#aaa4c3;letter-spacing:0.06em;">One identity. Every platform.</div>
    <div style="margin-top:14px;font-family:Consolas,monospace;font-size:16px;color:#665f85;letter-spacing:0.28em;">IN DEVELOPMENT</div>
  </div>`;

const only = process.argv[2];
const wanted = name => !only || only === name;

const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new' });

async function captureSite({ name, url }) {
  const page = await browser.newPage();
  try {
    await page.setViewport({ width: 1400, height: 816, deviceScaleFactor: 1 });
    await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 45000 });
    await page.evaluate(() => new Promise(r => setTimeout(r, 3000)));
    const file = path.join(TMP, `${name}-raw.png`);
    await page.screenshot({ path: file });
    console.log(`captured ${name}`);
    return file;
  } catch (err) {
    console.error(`FAILED ${name}: ${err.message}`);
    return null;
  } finally {
    await page.close();
  }
}

async function compose(name, domain, contentHtml) {
  const htmlFile = path.join(TMP, `${name}-frame.html`);
  await writeFile(htmlFile, frameHtml(domain, contentHtml));
  const page = await browser.newPage();
  await page.setViewport({ width: 1600, height: 1000, deviceScaleFactor: 1.5 });
  await page.goto('file:///' + htmlFile.replace(/\\/g, '/'), { waitUntil: 'networkidle0' });
  const png = path.join(TMP, `${name}-framed.png`);
  await page.screenshot({ path: png });
  await page.close();
  const out = path.join(OUT_DIR, `${name}.webp`);
  const info = await sharp(png).resize({ width: 1600 }).webp({ quality: 80 }).toFile(out);
  console.log(`wrote ${name}.webp (${(info.size / 1024).toFixed(0)}KB)`);
}

const toDataUri = async file =>
  `data:image/png;base64,${(await readFile(file)).toString('base64')}`;

for (const site of SITES.filter(s => wanted(s.name))) {
  const raw = await captureSite(site);
  if (!raw) continue;
  await compose(site.name, site.domain, `<img src="${await toDataUri(raw)}">`);
}

if (wanted('tajer')) await compose('tajer', 'localhost:3000', tajerContent);
if (wanted('dazen')) await compose('dazen', 'localhost:3000', dazenContent);

await browser.close();
console.log('done');
