// From each recipe's hero.jpg, make 3 Pinterest pins (1000x1500, text overlay) and an Instagram 1080x1350 crop.
// Output: public/images/<slug>/pin-1.jpg, pin-2.jpg, pin-3.jpg, ig.jpg
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { ROOT, loadRecipes } from './lib.mjs';

const W = 1000, H = 1500;
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
function wrap(text, max) {
  const words = text.split(/\s+/); const lines = []; let cur = '';
  for (const w of words) { if ((cur + ' ' + w).trim().length > max) { lines.push(cur); cur = w; } else cur = (cur + ' ' + w).trim(); }
  if (cur) lines.push(cur); return lines;
}
function overlay(text, style) {
  const lines = wrap(text, 16);
  const size = lines.length > 3 ? 68 : 80, lh = size * 1.08;
  const blockH = lines.length * lh + 150;
  const y0 = style === 'top' ? 70 : style === 'bottom' ? H - blockH - 70 : (H - blockH) / 2;
  const tspans = lines.map((l, i) => `<tspan x="500" y="${y0 + 95 + i * lh}">${esc(l)}</tspan>`).join('');
  return Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <rect x="60" y="${y0}" width="880" height="${blockH}" rx="36" fill="#fbfaf7" fill-opacity="0.94"/>
    <text font-family="Georgia, 'Times New Roman', serif" font-size="${size}" font-weight="700" fill="#16130f" text-anchor="middle">${tspans}</text>
    <text x="500" y="${y0 + blockH - 36}" font-family="Helvetica, Arial, sans-serif" font-size="30" font-weight="700" letter-spacing="4" fill="#e4572e" text-anchor="middle">CHEFYANG.FUN</text>
  </svg>`);
}

let made = 0, missing = [];
for (const r of loadRecipes()) {
  const hero = path.join(ROOT, 'public', r.image.src);
  if (!fs.existsSync(hero)) { missing.push(r.slug); continue; }
  const dir = path.dirname(hero);
  const base = await sharp(hero).resize(W, H, { fit: 'cover', position: 'attention' }).toBuffer();
  const styles = ['top', 'bottom', 'center'];
  for (let i = 0; i < 3; i++) {
    const p = r.pins[i]; if (!p) continue;
    await sharp(base).composite([{ input: overlay(p.overlay, styles[i]) }]).jpeg({ quality: 84, mozjpeg: true }).toFile(path.join(dir, `pin-${i + 1}.jpg`));
  }
  await sharp(hero).resize(1080, 1350, { fit: 'cover', position: 'attention' }).jpeg({ quality: 86, mozjpeg: true }).toFile(path.join(dir, 'ig.jpg'));
  // Re-save the hero compressed for the web.
  const web = await sharp(hero).resize(W, H, { fit: 'cover', position: 'attention' }).jpeg({ quality: 82, mozjpeg: true }).toBuffer();
  fs.writeFileSync(hero, web);
  made++;
}
console.log(`Pins made for ${made} recipes.` + (missing.length ? ` Missing hero.jpg: ${missing.join(', ')}` : ''));
