'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useReducedMotion } from '@/lib/hooks/use-reduced-motion';

/**
 * A fixed full-screen layer that morphs its color with scroll progress.
 * Subtle mint → warm pink → forest shift across the length of the page.
 * Sits behind every content layer (-z-20). No state, no re-renders —
 * driven directly by motion values.
 */
export function ScrollBackdrop() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const background = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    reduced
      ? ['#F0FDF4', '#F0FDF4', '#F0FDF4', '#F0FDF4', '#F0FDF4']
      : ['#F0FDF4', '#F6FDF7', '#FBF6FA', '#F6F8F0', '#EAF4EE'],
  );

  return (
    <motion.div
      aria-hidden
      style={{ backgroundColor: background }}
      className="fixed inset-0 -z-20"
    />
  );
}
