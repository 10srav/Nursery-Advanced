'use client';

import { ArrowUpRight } from 'lucide-react';
import { CATEGORIES } from '@/lib/constants';
import { SectionHeading } from '@/components/shared/section-heading';
import { TiltCard } from '@/components/shared/tilt-card';
import { Reveal } from '@/components/shared/reveal';
import { PlantPot } from '@/components/shared/illustrations/plant-pot';
import { cn } from '@/lib/utils';

const ACCENT_MAP = {
  forest: {
    bg: 'from-forest-50 via-mint to-mint-200',
    overlay: 'from-forest-900/0 via-forest-900/0 to-forest-900/85',
    glow: 'group-hover:shadow-forest-glow',
    tagBg: 'bg-forest-100 text-forest-900',
  },
  bloom: {
    bg: 'from-bloom-50 via-mint to-bloom-100',
    overlay: 'from-transparent via-transparent to-bloom-800/85',
    glow: 'group-hover:shadow-bloom',
    tagBg: 'bg-bloom-100 text-bloom-700',
  },
  sage: {
    bg: 'from-mint via-forest-50 to-forest-100',
    overlay: 'from-transparent via-transparent to-forest-950/85',
    glow: 'group-hover:shadow-forest-glow',
    tagBg: 'bg-forest-100 text-forest-900',
  },
} as const;

const POT_TONES = ['terracotta', 'sand', 'forest'] as const;

export function Categories() {
  return (
    <section
      id="categories"
      className="relative overflow-hidden py-32 scroll-mt-20"
    >
      <div className="container">
        <SectionHeading
          eyebrow="Categories"
          title="Find your kind of green."
          subtitle="Six curated families — from humidity-craving tropicals to desert-minimalist succulents. Every category is hand-curated by our growers."
          align="center"
          accent="sage"
        />

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((c, i) => {
            const palette = ACCENT_MAP[c.accent];
            const tone = POT_TONES[i % POT_TONES.length];
            return (
              <Reveal key={c.id} delay={i * 0.08}>
                <div className="group h-full" style={{ perspective: 1200 }}>
                  <TiltCard
                    className={cn(
                      'relative h-full overflow-hidden rounded-3xl border border-white/60 bg-gradient-to-br shadow-soft transition-shadow duration-500',
                      palette.bg,
                      palette.glow,
                    )}
                  >
                    <a
                      href={`#${c.id}`}
                      aria-label={`Shop ${c.title} — ${c.count}`}
                      className="block h-full p-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-500 focus-visible:ring-offset-2 focus-visible:ring-offset-mint-50 rounded-3xl cursor-pointer"
                    >
                      <div
                        aria-hidden
                        className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-blob bg-white/40 blur-2xl animate-blob"
                      />

                      <div className="relative z-10 flex items-start justify-between">
                        <div>
                          <p
                            className={cn(
                              'inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest',
                              palette.tagBg,
                            )}
                          >
                            {c.count}
                          </p>
                          <h3 className="mt-5 font-display text-3xl font-medium leading-tight tracking-tight text-forest-900 sm:text-4xl">
                            {c.title}
                          </h3>
                          <p className="mt-3 max-w-[18ch] text-sm leading-relaxed text-forest-900/85">
                            {c.tagline}
                          </p>
                        </div>
                        <div
                          aria-hidden
                          className={cn(
                            'flex h-11 w-11 items-center justify-center rounded-full bg-white/70 text-forest-900 shadow-soft backdrop-blur-sm transition-all duration-500 ease-liquid',
                            'group-hover:-translate-y-1 group-hover:bg-forest-900 group-hover:text-mint-50',
                          )}
                        >
                          <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:rotate-[-12deg]" />
                        </div>
                      </div>

                      <div className="relative z-10 mt-4 flex aspect-[5/4] items-end justify-center overflow-hidden rounded-2xl">
                        <PlantPot
                          variant={c.variant}
                          tone={tone}
                          className="h-full w-auto origin-bottom transition-transform duration-700 ease-liquid group-hover:scale-105"
                        />
                        <div
                          aria-hidden
                          className={cn(
                            'pointer-events-none absolute inset-0 bg-gradient-to-t opacity-0 transition-opacity duration-500 group-hover:opacity-100 lg:opacity-0',
                            palette.overlay,
                          )}
                        />
                        <div
                          aria-hidden
                          className="pointer-events-none absolute inset-x-0 bottom-0 px-4 pb-4 opacity-100 translate-y-0 transition-all duration-500 ease-liquid lg:translate-y-4 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100"
                        >
                          <p className="font-display text-lg text-mint-50 drop-shadow lg:text-mint-50">
                            <span className="hidden lg:inline">Explore the </span>
                            <span className="lg:hidden">Shop </span>
                            {c.title.toLowerCase()}
                          </p>
                        </div>
                      </div>
                    </a>
                  </TiltCard>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
