# ChefYang

An AI-made recipe site for chefyang.fun. Static Astro site, hosted on Cloudflare Pages.

## Everyday commands

| Command | What it does |
| --- | --- |
| `npm install` | Install once |
| `npm run dev` | Local preview at http://localhost:4321 |
| `npm run images:list` | Rewrite `IMAGES.md`: which hero images are still needed, with prompts |
| `npm run pins` | From each `hero.jpg`, make 3 Pinterest pins + an Instagram 4:5 crop |
| `npm run build` | Build the site into `dist/` |

## Adding a recipe

1. Add `src/content/recipes/<slug>.md` (copy an existing one; the frontmatter is checked at build time).
2. Generate the hero image from its `image.prompt` and save it as `public/images/<slug>/hero.jpg` (2:3, at least 1000 x 1500).
3. Run `npm run pins`, then commit and push. Cloudflare Pages rebuilds automatically.

## Settings

`src/site.config.ts` holds the Amazon tracking ID (`amazonTag`, a placeholder until Associates approves you), social links and categories.

## Deploy (Cloudflare Pages, one time)

1. Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git → pick `TomYang1993/chefyang`.
2. Framework preset: Astro. Build command `npm run build`, output directory `dist`.
3. After the first deploy: the project → Custom domains → add `chefyang.fun` (and `www.chefyang.fun`).
4. Cloudflare shows the DNS records to use. Either move the domain's nameservers to Cloudflare in Hostinger (hPanel → Domains → chefyang.fun → DNS / Nameservers), or add the CNAME record it gives you in Hostinger's DNS editor.
