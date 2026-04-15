'use client';

import { ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/shared/reveal';
import { Magnetic } from '@/components/shared/magnetic';
import { CursorSpotlight } from '@/components/shared/cursor-spotlight';
import { Button } from '@/components/ui/button';
import { Leaf } from '@/components/shared/illustrations/leaf';
import { Badge } from '@/components/ui/badge';

export function CTA() {
  return (
    <section id="cta" className="relative py-32">
      <div className="container">
        <Reveal>
          <CursorSpotlight
            color="rgba(249, 168, 212, 0.45)"
            size={620}
            className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-cta-mesh"
          >
            <div className="relative p-10 text-center sm:p-16 lg:p-24">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(34,197,94,0.25),rgba(236,72,153,0.28),rgba(34,197,94,0.15),rgba(236,72,153,0.22))] bg-[length:300%_300%] animate-gradient-shift opacity-80 mix-blend-overlay"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-grain opacity-[0.18] mix-blend-overlay"
            />
            <Leaf
              variant="monstera"
              className="pointer-events-none absolute -left-10 bottom-[-40px] h-64 w-auto animate-float-lg opacity-60"
              fill="#4ADE80"
              accent="#F0FDF4"
            />
            <Leaf
              variant="simple"
              className="pointer-events-none absolute right-8 top-8 h-28 w-auto animate-float opacity-60 [transform:rotate(-15deg)]"
              fill="#F472B6"
              accent="#FDF2F8"
            />
            <Leaf
              variant="round"
              className="pointer-events-none absolute bottom-10 right-10 h-24 w-auto animate-float [animation-delay:-2s] opacity-60"
              fill="#86EFAC"
              accent="#DCFCE7"
            />

            <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center">
              <Badge variant="glass" className="gap-2">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-bloom-400" />
                Free care kit included
              </Badge>

              <h2 className="mt-8 font-display text-[clamp(2.5rem,6vw,4.5rem)] font-medium leading-[1] tracking-[-0.02em] text-mint-50">
                Your next plant is{' '}
                <span className="italic text-bloom-300">already</span>
                <br />
                waiting for you.
              </h2>

              <p className="mt-8 max-w-xl text-lg leading-relaxed text-mint-50/90">
                Skip the garden center. Skip the doubt. Let us ship you the
                right plant for your light, your space, and your week.
              </p>

              <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row">
                <Magnetic strength={14}>
                  <Button size="xl" variant="bloom" className="group shadow-bloom">
                    Start with one plant
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                  </Button>
                </Magnetic>
                <Magnetic strength={10}>
                  <Button size="xl" variant="glass" className="border-white/40 bg-white/15 text-mint-50 hover:bg-white/25">
                    Take the plant quiz
                  </Button>
                </Magnetic>
              </div>

              <p className="mt-8 text-xs uppercase tracking-[0.25em] text-mint-50/80">
                Free shipping over $75 · 30-day guarantee
              </p>
            </div>
            </div>
          </CursorSpotlight>
        </Reveal>
      </div>
    </section>
  );
}
