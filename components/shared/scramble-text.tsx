'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { useReducedMotion } from '@/lib/hooks/use-reduced-motion';
import { cn } from '@/lib/utils';

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#%&*+=<>{}[]/\\';

interface ScrambleTextProps {
  text: string;
  duration?: number;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

function randChar() {
  return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
}

export function ScrambleText({
  text,
  duration = 1100,
  className,
  as = 'span',
}: ScrambleTextProps) {
  const Tag = as as 'span';
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: '-15%' });
  const [display, setDisplay] = useState(reduced ? text : ' '.repeat(text.length));

  useEffect(() => {
    if (reduced) {
      setDisplay(text);
      return;
    }
    if (!inView) return;

    let rafId = 0;
    const start = performance.now();
    const chars = text.split('');

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // Ease out cubic for revealed-chars progression
      const eased = 1 - Math.pow(1 - t, 2);
      const locked = Math.floor(eased * chars.length);

      const next = chars
        .map((c, i) => {
          if (i < locked) return c;
          if (c === ' ') return ' ';
          // sometimes show the real char briefly for intrigue
          if (Math.random() < 0.06) return c;
          return randChar();
        })
        .join('');

      setDisplay(next);
      if (t < 1) rafId = requestAnimationFrame(tick);
      else setDisplay(text);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [inView, text, duration, reduced]);

  return (
    <Tag
      ref={ref}
      className={cn('tabular-nums', className)}
      aria-label={text}
    >
      <span aria-hidden>{display}</span>
    </Tag>
  );
}
