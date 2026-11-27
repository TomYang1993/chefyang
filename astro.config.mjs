import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://chefyang.fun',
  trailingSlash: 'always',
  integrations: [sitemap({ filter: (page) => !page.includes('/showcase/') })],
});
