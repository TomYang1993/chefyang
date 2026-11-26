import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const recipes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/recipes' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    category: z.enum(['quick-dinners', 'asian-home-cooking', 'baking', 'meal-prep', 'kitchen-gear']),
    cuisine: z.string(),
    keywords: z.array(z.string()),
    prepMinutes: z.number(),
    cookMinutes: z.number(),
    servings: z.number(),
    calories: z.number(),
    ingredients: z.array(z.string()),
    steps: z.array(z.string()),
    notes: z.array(z.string()).default([]),
    gear: z.array(z.object({ name: z.string(), why: z.string(), search: z.string() })),
    image: z.object({ src: z.string(), alt: z.string(), prompt: z.string() }),
    pins: z.array(z.object({ title: z.string(), description: z.string(), overlay: z.string() })),
    instagram: z.object({ caption: z.string(), hashtags: z.array(z.string()) }),
  }),
});

export const collections = { recipes };
