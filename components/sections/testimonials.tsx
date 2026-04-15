import { Quote } from 'lucide-react';
import { TESTIMONIALS } from '@/lib/constants';
import { SectionHeading } from '@/components/shared/section-heading';
import { Leaf } from '@/components/shared/illustrations/leaf';
import { cn } from '@/lib/utils';

const PLANT_ACCENTS: Record<string, { fill: string; accent: string; bg: string }> = {
  monstera: { fill: '#22C55E', accent: '#14532D', bg: 'bg-forest-50' },
  fern: { fill: '#4ADE80', accent: '#14532D', bg: 'bg-mint' },
  snake: { fill: '#16A34A', accent: '#052E16', bg: 'bg-forest-100' },
  orchid: { fill: '#F472B6', accent: '#9D174D', bg: 'bg-bloom-50' },
  'fiddle-leaf': { fill: '#22C55E', accent: '#14532D', bg: 'bg-forest-50' },
  succulent: { fill: '#86EFAC', accent: '#14532D', bg: 'bg-mint-200' },
  'peace-lily': { fill: '#DCFCE7', accent: '#14532D', bg: 'bg-mint' },
  cactus: { fill: '#22C55E', accent: '#14532D', bg: 'bg-forest-100' },
};

function TestimonialCard({ t }: { t: (typeof TESTIMONIALS)[number] }) {
  const palette = PLANT_ACCENTS[t.plant] ?? PLANT_ACCENTS.monstera;
  return (
    <figure className="group relative flex h-full w-[86vw] max-w-[360px] shrink-0 flex-col justify-between overflow-hidden rounded-3xl border border-white/60 bg-white/75 p-7 shadow-glass backdrop-blur-xl transition-all duration-500 ease-liquid hover:-translate-y-1 hover:shadow-lift md:w-[400px]">
      <Quote
        className="h-8 w-8 text-forest-900/25"
        strokeWidth={1.5}
        aria-hidden
      />
      <blockquote className="mt-5 font-display text-lg font-normal leading-snug tracking-tight text-forest-900">
        &ldquo;{t.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-8 flex items-center gap-4">
        <div
          aria-hidden
          className={cn(
            'flex h-12 w-12 items-center justify-center rounded-2xl',
            palette.bg,
          )}
        >
          <Leaf
            variant="round"
            fill={palette.fill}
            accent={palette.accent}
            className="h-7 w-7"
          />
        </div>
        <div>
          <p className="text-sm font-semibold text-forest-900">{t.name}</p>
          <p className="text-xs text-forest-900/75">{t.role}</p>
        </div>
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  const loop = [...TESTIMONIALS, ...TESTIMONIALS];
  const row2 = [
    ...TESTIMONIALS.slice(3),
    ...TESTIMONIALS,
    ...TESTIMONIALS.slice(0, 3),
  ];

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden py-32 scroll-mt-20"
      aria-labelledby="testimonials-heading"
    >
      <div className="container mb-16">
        <SectionHeading
          eyebrow="Stories"
          title="Loved by 12,400 verified plant people."
          subtitle="Real humans. Real plants. The stories keep arriving in our inbox — here are a few of our favorites."
          accent="sage"
        />
      </div>

      <div
        className="group/marquee relative overflow-hidden"
        style={{
          maskImage:
            'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        }}
      >
        <div className="flex w-max animate-marquee gap-5 pr-5 hover:[animation-play-state:paused] focus-within:[animation-play-state:paused] motion-reduce:[animation:none]">
          {loop.map((t, i) => (
            <TestimonialCard key={`${t.id}-${i}`} t={t} />
          ))}
        </div>
      </div>

      <div
        className="group/marquee relative mt-5 overflow-hidden"
        style={{
          maskImage:
            'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        }}
      >
        <div className="flex w-max animate-marquee gap-5 pr-5 [animation-direction:reverse] [animation-duration:55s] hover:[animation-play-state:paused] focus-within:[animation-play-state:paused] motion-reduce:[animation:none]">
          {row2.map((t, i) => (
            <TestimonialCard key={`row2-${t.id}-${i}`} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
