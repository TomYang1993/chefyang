// Writes IMAGES.md: the one image you need to make per recipe, with its prompt.
import fs from 'node:fs';
import path from 'node:path';
import { ROOT, loadRecipes } from './lib.mjs';

const rows = loadRecipes().map((r) => {
  const file = path.join(ROOT, 'public', r.image.src);
  const done = fs.existsSync(file) ? 'done' : 'needed';
  return `## ${r.title}\n\n- **Save as:** \`public${r.image.src}\` (${done})\n- **Size:** 1000 x 1500 px or larger, 2:3 vertical, JPG\n- **Alt text:** ${r.image.alt}\n\n**Prompt:**\n\n> ${r.image.prompt}\n`;
});
const head = `# Images to generate\n\nOne hero image per recipe. Everything else (3 Pinterest pins and an Instagram 4:5 crop) is made from it by \`npm run pins\`.\n\nRules for every image: photorealistic but clearly styled food photography, no text, no hands, no people, no brand logos. Keep the dish in the middle so the 4:5 Instagram crop works.\n\n`;
fs.writeFileSync(path.join(ROOT, 'IMAGES.md'), head + rows.join('\n'));
console.log(`IMAGES.md written for ${rows.length} recipes`);
