// Shared data for the recipe showcases (3D wheel, magazine scroller).
// Kept in a .ts helper so the Astro frontmatter stays free of path/division parsing.
import fs from 'node:fs';
import path from 'node:path';
import type { CollectionEntry } from 'astro:content';
import { CATEGORIES } from '../site.config';

export type ShowcaseItem = {
  slug: string;
  href: string;
  title: string;
  category: string;
  minutes: number;
  image: string | null; // null when the hero has not been generated yet
  alt: string;
};

export function imageExists(src: string) {
  return fs.existsSync(path.join(process.cwd(), 'public', src));
}

export function toShowcase(recipes: CollectionEntry<'recipes'>[]): ShowcaseItem[] {
  return recipes.map((r) => ({
    slug: r.id,
    href: `/${r.id}/`,
    title: r.data.title,
    category: CATEGORIES[r.data.category].name,
    minutes: r.data.prepMinutes + r.data.cookMinutes,
    image: imageExists(r.data.image.src) ? r.data.image.src : null,
    alt: r.data.image.alt,
  }));
}

// Card background: the real hero when it exists, otherwise a warm gradient that differs per recipe.
const FALLBACKS = [
  ['#f6a35b', '#e4572e', '#7a2414'],
  ['#f3c969', '#d9822b', '#6b3410'],
  ['#9fd3a5', '#3f8f5a', '#183d26'],
  ['#f19a9a', '#c94f5d', '#5b1a2a'],
  ['#c9b28f', '#8a6a45', '#3a2a18'],
];
export function cardBackground(item: ShowcaseItem, index: number) {
  if (item.image) return `url("${item.image}")`;
  const [a, b, c] = FALLBACKS[index % FALLBACKS.length];
  return `radial-gradient(120% 80% at 20% 10%, ${a} 0%, ${b} 45%, ${c} 100%)`;
}
