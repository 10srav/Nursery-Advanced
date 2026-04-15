'use client';

import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { CATEGORIES } from '@/lib/constants';
import { SectionHeading } from '@/components/shared/section-heading';
import { TiltCard } from '@/components/shared/tilt-card';
import { Reveal } from '@/components/shared/reveal';
import { PlantPot } from '@/components/shared/illustrations/plant-pot';
import {
  gsap,
  ScrollTrigger,
  useIsomorphicLayoutEffect,
} from '@/lib/hooks/use-gsap';
import { useReducedMotion } from '@/lib/hooks/use-reduced-motion';
import { cn } from '@/lib/utils';

const ACCENT_MAP = {
  forest: {
    bg: 'from-forest-50 via-mint to-mint-200',
    overlay: 'from-transparent via-transparent to-forest-900/85',
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
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (reduced) return;
    if (typeof window === 'undefined') return;

    const mm = gsap.matchMedia();

    mm.add('(min-width: 1280px)', () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      const progress = progressRef.current;
      if (!section || !track) return;

      const getScrollAmount = () =>
        Math.max(0, track.scrollWidth - window.innerWidth + 160);

      const tween = gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,
          pinSpacing: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${getScrollAmount()}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progress) {
              progress.style.setProperty('--p', `${self.progress * 100}%`);
            }
          },
        },
      });

      return () => {
        tween.kill();
      };
    });

    return () => {
      mm.revert();
      ScrollTrigger.getAll()
        .filter((t) => t.trigger === sectionRef.current)
        .forEach((t) => t.kill());
    };
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      id="categories"
      className="relative overflow-hidden py-24 xl:flex xl:min-h-screen xl:flex-col xl:justify-center xl:py-0 scroll-mt-20"
    >
      <div className="container">
        <SectionHeading
          eyebrow="Categories"
          title="Find your kind of green."
          subtitle="Six curated families — from humidity-craving tropicals to desert-minimalist succulents. Every category is hand-curated by our growers."
          align="center"
          accent="sage"
        />
      </div>

      <div className="relative mt-16 xl:mt-16 xl:overflow-visible">
        <div
          ref={trackRef}
          className={cn(
            'grid grid-cols-1 gap-5 px-6',
            'sm:grid-cols-2 sm:px-8',
            'lg:grid-cols-3',
            'xl:flex xl:w-max xl:grid-cols-none xl:gap-6 xl:px-[10vw] xl:will-change-transform',
          )}
        >
          {CATEGORIES.map((c, i) => {
            const palette = ACCENT_MAP[c.accent];
            const tone = POT_TONES[i % POT_TONES.length];
            return (
              <Reveal key={c.id} delay={i * 0.06}>
                <div
                  className="group h-full xl:w-[420px] xl:shrink-0"
                  style={{ perspective: 1200 }}
                >
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
                      data-cursor="hover"
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
                          <p className="mt-3 max-w-[22ch] text-sm leading-relaxed text-forest-900/85">
                            {c.tagline}
                          </p>
                        </div>
                        <div
                          aria-hidden
                          className={cn(
                            'flex h-11 w-11 items-center justify-center rounded-full bg-white/70 text-forest-900 shadow-soft backdrop-blur-sm transition-all duration-500 ease-liquid',
                            'group-hover:-translate-y-1 group-hover:rotate-[-8deg] group-hover:bg-forest-900 group-hover:text-mint-50',
                          )}
                        >
                          <ArrowUpRight className="h-4 w-4" />
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
                            'pointer-events-none absolute inset-0 bg-gradient-to-t opacity-0 transition-opacity duration-500 group-hover:opacity-100 xl:opacity-0',
                            palette.overlay,
                          )}
                        />
                        <div
                          aria-hidden
                          className="pointer-events-none absolute inset-x-0 bottom-0 px-4 pb-4 opacity-100 translate-y-0 transition-all duration-500 ease-liquid xl:translate-y-4 xl:opacity-0 xl:group-hover:translate-y-0 xl:group-hover:opacity-100"
                        >
                          <p className="font-display text-lg text-mint-50 drop-shadow">
                            <span className="hidden xl:inline">Explore the </span>
                            <span className="xl:hidden">Shop </span>
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

      {/* Desktop scroll hint + progress */}
      <div
        ref={progressRef}
        aria-hidden
        className="mx-auto mt-10 hidden h-[2px] w-[36vw] overflow-hidden rounded-full bg-forest-900/10 xl:block"
        style={{ ['--p' as string]: '0%' }}
      >
        <div
          className="h-full bg-gradient-to-r from-forest-700 to-bloom-500 transition-[width] duration-75"
          style={{ width: 'var(--p)' }}
        />
      </div>
      <p
        aria-hidden
        className="mt-4 hidden text-center text-[10px] uppercase tracking-[0.35em] text-forest-900/55 xl:block"
      >
        Scroll to explore
      </p>
    </section>
  );
}
