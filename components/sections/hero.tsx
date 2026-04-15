'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown, Leaf as LeafIcon } from 'lucide-react';
import { HERO_META } from '@/lib/constants';
import { WordReveal } from '@/components/shared/word-reveal';
import { Magnetic } from '@/components/shared/magnetic';
import { AnimatedNumber } from '@/components/shared/animated-number';
import { HeroScene } from '@/components/shared/illustrations/hero-scene';
import { FloatingLeaves } from '@/components/shared/illustrations/floating-leaves';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useReducedMotion } from '@/lib/hooks/use-reduced-motion';

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const contentY = useTransform(scrollYProgress, [0, 0.8], reduced ? [0, 0] : [0, -40]);
  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.6, 0.9],
    reduced ? [1, 1, 1] : [1, 1, 0],
  );

  const animateIn = (delay: number) =>
    reduced
      ? { initial: false as const }
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease },
        };

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-hero-mesh"
    >
      <HeroScene />
      <FloatingLeaves />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="container relative z-10 pt-32 pb-20 sm:pt-36"
      >
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          {/* Eyebrow */}
          <motion.div {...animateIn(0.1)}>
            <Badge variant="glass" className="gap-2 py-1.5 text-[11px]">
              <span className="relative flex h-1.5 w-1.5" aria-hidden>
                {!reduced && (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-bloom-400 opacity-75" />
                )}
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-bloom-500" />
              </span>
              {HERO_META.eyebrow}
            </Badge>
          </motion.div>

          {/* Headline */}
          <WordReveal
            text={HERO_META.headline}
            as="h1"
            className="mt-8 justify-center font-display text-[clamp(2.5rem,7vw,5.25rem)] font-medium leading-[0.98] tracking-[-0.02em] text-forest-900"
            stagger={0.06}
            delay={0.2}
            duration={0.9}
          />

          {/* Italic serif accent */}
          <motion.div {...animateIn(0.55)} className="relative mt-2">
            <span className="font-display italic text-bloom-600 text-[clamp(2rem,5vw,4rem)]">
              A living dialogue.
            </span>
            <svg
              className="absolute left-1/2 top-full h-3 w-[clamp(120px,45%,180px)] -translate-x-1/2"
              viewBox="0 0 180 14"
              fill="none"
              preserveAspectRatio="none"
              aria-hidden
            >
              <motion.path
                d="M4 8 Q 50 2 90 7 T 176 6"
                stroke="#DB2777"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
                initial={reduced ? false : { pathLength: 0 }}
                animate={reduced ? undefined : { pathLength: 1 }}
                transition={reduced ? undefined : { duration: 1, delay: 0.8, ease: 'easeInOut' }}
              />
            </svg>
          </motion.div>

          {/* Sub */}
          <motion.p
            {...animateIn(0.65)}
            className="mt-10 max-w-xl text-lg leading-relaxed text-forest-900/85 sm:text-xl"
          >
            {HERO_META.sub}
          </motion.p>

          {/* CTAs */}
          <motion.div
            {...animateIn(0.8)}
            className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:gap-4"
          >
            <Magnetic strength={22}>
              <Button size="xl" variant="bloom" className="group">
                {HERO_META.ctas.primary}
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden
                />
              </Button>
            </Magnetic>
            <Magnetic strength={14}>
              <Button size="xl" variant="glass" className="group">
                <LeafIcon
                  className="h-4 w-4 transition-transform duration-500 group-hover:rotate-12"
                  aria-hidden
                />
                {HERO_META.ctas.secondary}
              </Button>
            </Magnetic>
          </motion.div>

          {/* Trust stats — animated */}
          <motion.div
            {...animateIn(1)}
            className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-5 border-t border-forest-900/10 pt-8"
          >
            <div className="flex flex-col items-center gap-0.5 sm:flex-row sm:gap-3">
              <span className="font-display text-2xl font-medium text-forest-900">
                <AnimatedNumber value={180} suffix="k+" duration={1800} />
              </span>
              <span className="text-xs uppercase tracking-widest text-forest-900/70">
                Plants delivered
              </span>
            </div>
            <div className="flex flex-col items-center gap-0.5 sm:flex-row sm:gap-3">
              <span className="font-display text-2xl font-medium text-forest-900">
                <AnimatedNumber value={98} suffix="%" duration={1400} />
              </span>
              <span className="text-xs uppercase tracking-widest text-forest-900/70">
                Arrive thriving
              </span>
            </div>
            <div className="flex flex-col items-center gap-0.5 sm:flex-row sm:gap-3">
              <span className="font-display text-2xl font-medium text-forest-900">
                4.9★
              </span>
              <span className="text-xs uppercase tracking-widest text-forest-900/70">
                12,400 reviews
              </span>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator — desktop only to avoid collision on short mobile */}
        <motion.div
          {...animateIn(1.3)}
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 sm:flex"
          aria-hidden
        >
          <motion.div
            animate={reduced ? undefined : { y: [0, 8, 0] }}
            transition={
              reduced ? undefined : { duration: 2, repeat: Infinity, ease: 'easeInOut' }
            }
            className="flex flex-col items-center gap-2 text-forest-900/65"
          >
            <span className="text-[10px] uppercase tracking-[0.25em]">Scroll</span>
            <ChevronDown className="h-4 w-4" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
