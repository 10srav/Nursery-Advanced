import type { LucideIcon } from 'lucide-react';
import {
  Leaf,
  Sprout,
  Sun,
  Droplets,
  ShieldCheck,
  Truck,
  Heart,
  ArrowRight,
} from 'lucide-react';

export type PlantVariant =
  | 'monstera'
  | 'fern'
  | 'succulent'
  | 'snake'
  | 'peace-lily'
  | 'fiddle-leaf'
  | 'orchid'
  | 'cactus';

export const NAV_LINKS = [
  { label: 'Shop', href: '#categories' },
  { label: 'Collections', href: '#featured' },
  { label: 'Care Guide', href: '#features' },
  { label: 'Stories', href: '#testimonials' },
] as const;

export type Category = {
  id: string;
  title: string;
  count: string;
  accent: 'forest' | 'bloom' | 'sage';
  variant: PlantVariant;
  tagline: string;
};

export const CATEGORIES: Category[] = [
  {
    id: 'tropical',
    title: 'Tropical',
    count: '48 species',
    accent: 'forest',
    variant: 'monstera',
    tagline: 'Humid-loving statement pieces.',
  },
  {
    id: 'succulents',
    title: 'Succulents',
    count: '36 species',
    accent: 'sage',
    variant: 'succulent',
    tagline: 'Drought-defiant sculptural forms.',
  },
  {
    id: 'air-purifying',
    title: 'Air Purifying',
    count: '22 species',
    accent: 'forest',
    variant: 'snake',
    tagline: 'NASA-backed indoor air heroes.',
  },
  {
    id: 'flowering',
    title: 'Flowering',
    count: '54 species',
    accent: 'bloom',
    variant: 'orchid',
    tagline: 'Petals that rewrite your mood.',
  },
  {
    id: 'ferns',
    title: 'Ferns',
    count: '19 species',
    accent: 'sage',
    variant: 'fern',
    tagline: 'Ancient forest texture, modern forms.',
  },
  {
    id: 'statement',
    title: 'Statement Trees',
    count: '12 species',
    accent: 'forest',
    variant: 'fiddle-leaf',
    tagline: 'The anchor your room has been missing.',
  },
];

export type Feature = {
  id: string;
  title: string;
  copy: string;
  icon: LucideIcon;
  accent: 'forest' | 'bloom' | 'sage';
};

export const FEATURES: Feature[] = [
  {
    id: 'nursery-raised',
    title: 'Nursery-raised, never mass-farmed',
    copy:
      'Every plant spends 180+ days with our growers before it meets you. Healthier roots, longer life.',
    icon: Sprout,
    accent: 'forest',
  },
  {
    id: 'bloom-guarantee',
    title: '30-day bloom guarantee',
    copy:
      'Something wilted in transit? We send a replacement same-week. No receipts, no friction, no fuss.',
    icon: ShieldCheck,
    accent: 'bloom',
  },
  {
    id: 'care-studio',
    title: 'Care studio in your pocket',
    copy:
      'Water reminders, light diagnostics, symptom ID — your personal horticulturist ships in the box.',
    icon: Droplets,
    accent: 'sage',
  },
];

export type Product = {
  id: string;
  name: string;
  latin: string;
  price: number;
  tag?: string;
  variant: PlantVariant;
  accent: 'forest' | 'bloom' | 'sage';
};

export const PRODUCTS: Product[] = [
  {
    id: 'monstera-deliciosa',
    name: 'Monstera Deliciosa',
    latin: 'Swiss Cheese Plant',
    price: 68,
    tag: 'Best seller',
    variant: 'monstera',
    accent: 'forest',
  },
  {
    id: 'fiddle-leaf-fig',
    name: 'Fiddle Leaf Fig',
    latin: 'Ficus lyrata',
    price: 124,
    tag: 'Statement',
    variant: 'fiddle-leaf',
    accent: 'sage',
  },
  {
    id: 'orchid-phalaenopsis',
    name: 'Blushing Orchid',
    latin: 'Phalaenopsis amabilis',
    price: 52,
    tag: 'Blooming now',
    variant: 'orchid',
    accent: 'bloom',
  },
  {
    id: 'snake-plant',
    name: 'Moonshine Snake',
    latin: 'Dracaena trifasciata',
    price: 38,
    tag: 'Low light',
    variant: 'snake',
    accent: 'forest',
  },
];

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  plant: PlantVariant;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    quote:
      'My Monstera arrived packed like a cake and thriving. Three months in, it has four new leaves. I have never been more emotionally invested in foliage.',
    name: 'Lena Ortega',
    role: 'Architect, Brooklyn',
    plant: 'monstera',
  },
  {
    id: 't2',
    quote:
      'The care app told me my fern was thirsty before the leaves browned. That alone is worth the subscription.',
    name: 'Marcus Hale',
    role: 'Sound designer, LA',
    plant: 'fern',
  },
  {
    id: 't3',
    quote:
      'I ordered one. My studio now has eleven. The team at Verdant ruined me, beautifully.',
    name: 'Ines Park',
    role: 'Fashion editor, Seoul',
    plant: 'orchid',
  },
  {
    id: 't4',
    quote:
      'The fiddle leaf is taller than my six-year-old now. Kid asked to name it. We went with Greg.',
    name: 'Jonah Weiss',
    role: 'Dad of two + Greg',
    plant: 'fiddle-leaf',
  },
  {
    id: 't5',
    quote:
      'Living in a basement apartment, I assumed I was plant-cursed. Verdant sent a snake plant and a grow-light plan. I am no longer cursed.',
    name: 'Priya Shah',
    role: 'Writer, Montreal',
    plant: 'snake',
  },
  {
    id: 't6',
    quote:
      'Orchid arrived in full bloom with four buds still closed. A week later, they opened. It felt like a gift that kept writing itself.',
    name: 'Camille Roux',
    role: 'Pastry chef, Lyon',
    plant: 'orchid',
  },
  {
    id: 't7',
    quote:
      'Their packaging is shameless eco-theatre and I love every recyclable inch of it.',
    name: 'Theo Nakamura',
    role: 'Product designer, Tokyo',
    plant: 'succulent',
  },
];

export const FOOTER_COLS = [
  {
    title: 'Shop',
    links: [
      { label: 'Tropical', href: '#' },
      { label: 'Succulents', href: '#' },
      { label: 'Air-purifying', href: '#' },
      { label: 'Flowering', href: '#' },
      { label: 'Gift cards', href: '#' },
    ],
  },
  {
    title: 'Care',
    links: [
      { label: 'Plant library', href: '#' },
      { label: 'Symptom ID', href: '#' },
      { label: 'Light guide', href: '#' },
      { label: 'Repotting 101', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Our growers', href: '#' },
      { label: 'Sustainability', href: '#' },
      { label: 'Journal', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Press', href: '#' },
    ],
  },
] as const;

export const TRUST_STATS = [
  { value: '180k+', label: 'Plants delivered' },
  { value: '98%', label: 'Arrive thriving' },
  { value: '4.9★', label: '12,400 reviews' },
] as const;

export const HERO_META = {
  eyebrow: 'Est. 2016 — cuttings, rare finds, and slow-grown heirlooms',
  headline: 'Your home, in conversation with the forest.',
  sub:
    'Verdant ships living plants nursery-raised for 180+ days — then pairs each one with a care plan tuned to your light, water, and rhythm.',
  ctas: {
    primary: 'Shop the garden',
    secondary: 'Meet the growers',
  },
} as const;

export { Leaf, Sprout, Sun, Heart, Truck, ArrowRight };
