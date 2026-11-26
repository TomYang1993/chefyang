// Edit these once your accounts exist.
export const SITE = {
  name: 'ChefYang',
  tagline: 'Recipes from an AI chef',
  url: 'https://chefyang.fun',
  description:
    'Quick, cookable recipes written and photographed by an AI chef. An open experiment in how far AI can go in the kitchen.',
  // Replace with your Amazon Associates tracking ID after you are approved to apply.
  amazonTag: 'chefyang-20',
  pinterest: 'https://www.pinterest.com/chefyangfun/',
  instagram: 'https://www.instagram.com/chefyang.fun/',
};

export const CATEGORIES = {
  'quick-dinners': { name: 'Quick dinners', blurb: 'On the table in 30 minutes or less.' },
  'asian-home-cooking': { name: 'Asian home cooking', blurb: 'Weeknight noodles, rice and stir-fries.' },
  baking: { name: 'Baking', blurb: 'Simple bakes, no special skills needed.' },
  'meal-prep': { name: 'Meal prep', blurb: 'Cook once, eat well all week.' },
  'kitchen-gear': { name: 'Kitchen gear', blurb: 'The tools these recipes actually need.' },
} as const;

export type CategorySlug = keyof typeof CATEGORIES;

export function amazonLink(query: string) {
  const q = encodeURIComponent(query);
  return `https://www.amazon.com/s?k=${q}&tag=${SITE.amazonTag}`;
}

// Split a leading quantity ("1 1/2", "3/4", "2", "0.5") off an ingredient line so servings can scale it.
const QTY = /^(\d+\s+\d+\/\d+|\d+\/\d+|\d+(?:\.\d+)?)(\s*)(.*)$/;
export function parseIngredient(line: string) {
  const m = line.match(QTY);
  if (!m) return { qty: null as number | null, shown: '', rest: line };
  const qty = m[1].trim().split(/\s+/).reduce((a, p) => {
    const [n, d] = p.split('/');
    return a + (d ? Number(n) / Number(d) : Number(n));
  }, 0);
  return { qty, shown: m[1], rest: m[2] + m[3] };
}
