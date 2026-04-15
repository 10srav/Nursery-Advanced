'use client';

import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Sparkles } from 'lucide-react';
import { PRODUCTS } from '@/lib/constants';
import { SectionHeading } from '@/components/shared/section-heading';
import { Reveal } from '@/components/shared/reveal';
import { PlantPot } from '@/components/shared/illustrations/plant-pot';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const ACCENT = {
  forest: {
    bg: 'from-forest-50 to-mint-200',
    chip: 'bg-forest-900 text-mint-50',
    blobColor: 'bg-forest-200/40',
  },
  sage: {
    bg: 'from-mint to-forest-100',
    chip: 'bg-forest-100 text-forest-900',
    blobColor: 'bg-forest-200/40',
  },
  bloom: {
    bg: 'from-bloom-50 to-mint',
    chip: 'bg-bloom-700 text-white',
    blobColor: 'bg-bloom-200/50',
  },
} as const;

const POT_TONES = ['terracotta', 'sand', 'forest'] as const;

export function FeaturedProducts() {
  return (
    <section
      id="featured"
      className="relative overflow-hidden py-32 scroll-mt-20"
    >
      <div className="container">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Featured this week"
            title="Handpicked by our growers."
            subtitle="This week's most-loved specimens — updated every Monday morning."
            align="left"
            accent="default"
            className="max-w-xl"
          />
          <Reveal delay={0.3} direction="left">
            <Button variant="outline" size="lg" className="group">
              View all 220+
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Button>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map((p, i) => {
            const palette = ACCENT[p.accent];
            const tone = POT_TONES[i % POT_TONES.length];
            return (
              <Reveal key={p.id} delay={i * 0.08}>
                <motion.article
                  whileHover="hover"
                  className="group relative h-full overflow-hidden rounded-3xl border border-white/60 bg-white/70 shadow-soft backdrop-blur-xl"
                >
                  <motion.div
                    variants={{ hover: { y: -10 } }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="relative h-full"
                  >
                    <div
                      className={cn(
                        'relative aspect-[4/5] overflow-hidden bg-gradient-to-br',
                        palette.bg,
                      )}
                    >
                      <div
                        aria-hidden
                        className={cn(
                          'pointer-events-none absolute -bottom-10 -right-10 h-52 w-52 rounded-blob blur-2xl animate-blob',
                          palette.blobColor,
                        )}
                      />
                      {p.tag && (
                        <span
                          className={cn(
                            'absolute left-4 top-4 z-10 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest shadow-soft',
                            palette.chip,
                          )}
                        >
                          <Sparkles className="h-2.5 w-2.5" aria-hidden />
                          {p.tag}
                        </span>
                      )}
                      <button
                        type="button"
                        aria-label={`Save ${p.name} to wishlist`}
                        className="group/wish absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/80 text-forest-900/80 shadow-soft backdrop-blur transition-all cursor-pointer hover:bg-white hover:text-bloom-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bloom-500 focus-visible:ring-offset-2"
                      >
                        <Heart className="h-4 w-4 transition-transform duration-300 group-hover/wish:scale-110" aria-hidden />
                      </button>

                      <motion.div
                        variants={{ hover: { scale: 1.07 } }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-0 flex items-end justify-center pb-2"
                      >
                        <PlantPot
                          variant={p.variant}
                          tone={tone}
                          className="h-[92%] w-auto origin-bottom"
                        />
                      </motion.div>

                      {/* CTA — always visible on mobile; hover/focus-within reveal on lg */}
                      <div className="absolute inset-x-4 bottom-4 z-10 transition-all duration-[350ms] ease-liquid lg:translate-y-4 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 lg:group-focus-within:translate-y-0 lg:group-focus-within:opacity-100">
                        <Button className="w-full" size="md">
                          <ShoppingBag className="h-4 w-4" aria-hidden />
                          Add to cart
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-start justify-between gap-3 p-5">
                      <div>
                        <h3 className="font-display text-lg font-medium leading-tight tracking-tight text-forest-900">
                          {p.name}
                        </h3>
                        <p className="mt-1 text-xs italic text-forest-900/75">
                          {p.latin}
                        </p>
                      </div>
                      <div className="shrink-0 text-right">
                        <p className="font-display text-lg font-medium text-forest-900">
                          ${p.price}
                        </p>
                        <p className="text-[10px] uppercase tracking-widest text-forest-900/70">
                          Care kit included
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </motion.article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
