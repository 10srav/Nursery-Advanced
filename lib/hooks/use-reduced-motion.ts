'use client';

import { useReducedMotion as useFramerReducedMotion } from 'framer-motion';

/**
 * Narrowed to strict boolean. Returns false on SSR / pre-resolution rather than
 * null so consumers can do `if (reduced)` without worrying about tri-state.
 */
export function useReducedMotion(): boolean {
  const prefers = useFramerReducedMotion();
  return prefers === true;
}
