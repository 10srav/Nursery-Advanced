# Nursery Advanced

Immersive, animated landing page for a modern plant nursery brand. "Digital garden" experience — premium, interactive, production-ready.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS + shadcn-style primitives (cva + @radix-ui/react-slot)
- Framer Motion (reveals, tilt, parallax, stagger)
- GSAP + ScrollTrigger (scroll-driven stagger sequences)
- Lenis (smooth scroll, wired into gsap.ticker)
- Lucide React (icons)
- Inline SVG plant illustrations (zero network, crisp at any DPI)

## Run

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # production build
npm start         # serve built output
```

## Design tokens

- `cream` background (#f5f3ef)
- `forest` primary (#1a3a2e)
- `sage` / `moss` accents
- `bark` supporting warm neutral
- Inter via next/font (swap)
- rounded-2xl default, soft glass panels

## Reduced motion

`prefers-reduced-motion: reduce` disables Lenis, collapses reveal timings, and pauses marquees. Respect the user's OS setting.

## Folder map

```
app/                server — layout, page, globals
components/
  layout/           navbar, footer (client)
  sections/         hero, categories, features, featured-products, testimonials, cta
  shared/           smooth-scroll provider, reveal, word-reveal, tilt-card, illustrations
  ui/               button, card, badge (shadcn-style cva)
lib/
  utils.ts          cn() helper
  constants.ts      typed data (nav, categories, features, products, testimonials)
  hooks/            useReducedMotion, useGsap
```
