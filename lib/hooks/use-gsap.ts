'use client';

import { useEffect, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

type EffectFn = (ctx: gsap.Context) => void | (() => void);

export function useGsap<T extends HTMLElement = HTMLElement>(
  effect: EffectFn,
  deps: React.DependencyList = [],
) {
  const scopeRef = useRef<T | null>(null);

  useIsomorphicLayoutEffect(() => {
    let innerCleanup: void | (() => void);
    const ctx = gsap.context(() => {
      innerCleanup = effect(ctx);
    }, scopeRef);

    return () => {
      innerCleanup?.();
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return scopeRef;
}

export { gsap, ScrollTrigger };
