import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE } from '../site.config';
export async function GET(context) {
  const recipes = await getCollection('recipes');
  return rss({
    title: SITE.name, description: SITE.description, site: context.site,
    items: recipes.map((r) => ({ title: r.data.title, description: r.data.description, pubDate: r.data.date, link: `/${r.id}/` })),
  });
}
