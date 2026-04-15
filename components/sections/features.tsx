'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { FEATURES } from '@/lib/constants';
import { SectionHeading } from '@/components/shared/section-heading';
import { gsap, ScrollTrigger } from '@/lib/hooks/use-gsap';
import { useIsomorphicLayoutEffect } from '@/lib/hooks/use-gsap';
import { useReducedMotion } from '@/lib/hooks/use-reduced-motion';
import { cn } from '@/lib/utils';

const ACCENT = {
  forest: {
    iconBg: 'bg-forest-900 text-mint-50',
    ring: 'ring-forest-200',
    accent: 'text-forest-700',
  },
  sage: {
    iconBg: 'bg-forest-100 text-forest-900',
    ring: 'ring-forest-200',
    accent: 'text-forest-700',
  },
  bloom: {
    iconBg: 'bg-bloom-700 text-white',
    ring: 'ring-bloom-200',
    accent: 'text-bloom-700',
  },
} as const;

export function Features() {
  const reduced = useReducedMotion();
  const gridRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (reduced) return;
    const grid = gridRef.current;
    if (!grid) return;

    const ctx = gsap.context(() => {
      const cards = grid.querySelectorAll<HTMLElement>('[data-feature-card]');
      const icons = grid.querySelectorAll<HTMLElement>('[data-feature-icon]');

      gsap.fromTo(
        cards,
        { y: 60, opacity: 0, scale: 0.97 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.1,
          ease: 'power3.out',
          stagger: 0.16,
          scrollTrigger: {
            trigger: grid,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        },
      );

      icons.forEach((icon, i) => {
        gsap.fromTo(
          icon,
          { scale: 0, rotate: -30 },
          {
            scale: 1,
            rotate: 0,
            duration: 0.9,
            ease: 'back.out(2)',
            delay: 0.3 + i * 0.16,
            scrollTrigger: {
              trigger: grid,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          },
        );
      });
    }, grid);

    return () => {
      ScrollTrigger.getAll()
        .filter((t) => t.trigger === grid)
        .forEach((t) => t.kill());
      ctx.revert();
    };
  }, [reduced]);

  return (
    <section
      id="features"
      className="relative overflow-hidden py-32 scroll-mt-20"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-mint via-transparent to-transparent opacity-60"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-blob bg-bloom-100/50 blur-3xl animate-blob"
      />

      <div className="container relative">
        <SectionHeading
          eyebrow="Why Verdant"
          title="Care so good, the plants write home."
          subtitle="Three promises we sign with every delivery — and keep without making you ask."
          accent="bloom"
        />

        <div
          ref={gridRef}
          className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {FEATURES.map((f, i) => {
            const palette = ACCENT[f.accent];
            const Icon = f.icon;
            return (
              <article
                key={f.id}
                data-feature-card
                className={cn(
                  'group relative overflow-hidden rounded-3xl border border-white/60 bg-white/70 p-8 shadow-glass backdrop-blur-xl transition-all duration-500 ease-liquid',
                  'hover:-translate-y-1 hover:shadow-lift',
                )}
              >
                <span className="absolute left-6 top-6 text-xs font-medium tracking-widest text-forest-900/55">
                  0{i + 1}
                </span>

                <div
                  data-feature-icon
                  aria-hidden
                  className={cn(
                    'mt-10 flex h-16 w-16 items-center justify-center rounded-2xl shadow-soft ring-1',
                    palette.iconBg,
                    palette.ring,
                  )}
                >
                  <Icon className="h-7 w-7" strokeWidth={1.6} />
                </div>

                <h3 className="mt-8 font-display text-2xl font-medium leading-tight tracking-tight text-forest-900">
                  {f.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-forest-900/85">
                  {f.copy}
                </p>

                <motion.a
                  href="#"
                  className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium cursor-pointer rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white/60"
                  whileHover="hover"
                >
                  <span className={cn(palette.accent)}>Learn more</span>
                  <motion.span
                    variants={{ hover: { x: 6 } }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className={cn(palette.accent)}
                    aria-hidden
                  >
                    →
                  </motion.span>
                </motion.a>

                <div
                  aria-hidden
                  className="pointer-events-none absolute -bottom-24 -right-10 h-48 w-48 rounded-full bg-forest-200/40 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
