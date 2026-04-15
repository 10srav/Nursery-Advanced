'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '@/lib/hooks/use-gsap';
import { useReducedMotion } from '@/lib/hooks/use-reduced-motion';

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({
      lerp: 0.1,
      duration: 1.15,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
    });

    const onScroll = () => ScrollTrigger.update();
    lenis.on('scroll', onScroll);

    const rafTick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(rafTick);
    gsap.ticker.lagSmoothing(0);

    const refreshId = window.setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    return () => {
      window.clearTimeout(refreshId);
      lenis.off('scroll', onScroll);
      gsap.ticker.remove(rafTick);
      lenis.destroy();
    };
  }, [reduced]);

  return <>{children}</>;
}
