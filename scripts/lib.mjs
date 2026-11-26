import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'yaml';

export const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
export function loadRecipes() {
  const dir = path.join(ROOT, 'src/content/recipes');
  return fs.readdirSync(dir).filter((f) => f.endsWith('.md')).sort().map((f) => {
    const text = fs.readFileSync(path.join(dir, f), 'utf8');
    const fm = text.split(/^---$/m)[1];
    return { slug: f.replace(/\.md$/, ''), ...parse(fm) };
  });
}
