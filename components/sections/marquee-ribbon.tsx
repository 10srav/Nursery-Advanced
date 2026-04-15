import { Leaf } from '@/components/shared/illustrations/leaf';

const ITEMS = [
  'Slow-grown',
  'Nursery-raised 180 days',
  'Shipped alive',
  'Care kit included',
  'Free shipping over $75',
  '30-day guarantee',
  'Rooted since 2016',
  'Carbon-neutral delivery',
] as const;

function Row({ reverse = false }: { reverse?: boolean }) {
  const items = [...ITEMS, ...ITEMS];
  return (
    <div
      className="flex w-max animate-marquee items-center gap-10 whitespace-nowrap pr-10 [animation-duration:60s] hover:[animation-play-state:paused] motion-reduce:[animation:none]"
      style={reverse ? { animationDirection: 'reverse' } : undefined}
    >
      {items.map((item, i) => (
        <span key={`${item}-${i}`} className="flex items-center gap-10">
          <span className="font-display text-4xl font-medium italic text-forest-900/90 sm:text-5xl md:text-6xl">
            {item}
          </span>
          <Leaf
            variant="simple"
            className="h-6 w-auto shrink-0 text-bloom-500"
            fill="#EC4899"
            accent="#9D174D"
          />
        </span>
      ))}
    </div>
  );
}

export function MarqueeRibbon() {
  return (
    <section
      aria-hidden
      className="relative overflow-hidden border-y border-forest-900/10 bg-mint-100/60 py-8 backdrop-blur-sm"
      style={{
        maskImage:
          'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
        WebkitMaskImage:
          'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
      }}
    >
      <Row />
    </section>
  );
}
