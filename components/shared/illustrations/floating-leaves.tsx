'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { Leaf } from './leaf';
import { useReducedMotion } from '@/lib/hooks/use-reduced-motion';

interface FloatingLeafConfig {
  variant: 'simple' | 'monstera' | 'frond' | 'round';
  top: string;
  left: string;
  size: number;
  rotate: number;
  delay: number;
  duration: number;
  opacity: number;
  fill: string;
  accent: string;
  drift: number;
}

const LEAVES: FloatingLeafConfig[] = [
  {
    variant: 'simple',
    top: '14%',
    left: '8%',
    size: 56,
    rotate: -20,
    delay: 0,
    duration: 9,
    opacity: 0.85,
    fill: '#4ADE80',
    accent: '#14532D',
    drift: 22,
  },
  {
    variant: 'round',
    top: '22%',
    left: '82%',
    size: 38,
    rotate: 28,
    delay: 1.2,
    duration: 11,
    opacity: 0.9,
    fill: '#86EFAC',
    accent: '#052E16',
    drift: 18,
  },
  {
    variant: 'frond',
    top: '68%',
    left: '14%',
    size: 64,
    rotate: 12,
    delay: 0.6,
    duration: 13,
    opacity: 0.75,
    fill: '#22C55E',
    accent: '#14532D',
    drift: 28,
  },
  {
    variant: 'simple',
    top: '62%',
    left: '76%',
    size: 44,
    rotate: -12,
    delay: 2.4,
    duration: 10,
    opacity: 0.85,
    fill: '#F472B6',
    accent: '#9D174D',
    drift: 20,
  },
  {
    variant: 'round',
    top: '40%',
    left: '48%',
    size: 30,
    rotate: 8,
    delay: 1.8,
    duration: 12,
    opacity: 0.6,
    fill: '#86EFAC',
    accent: '#14532D',
    drift: 16,
  },
];

export function FloatingLeaves() {
  const reduced = useReducedMotion();
  const leaves = useMemo(() => LEAVES, []);

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      {leaves.map((l, i) => (
        <motion.div
          key={i}
          initial={{ y: 0, x: 0, rotate: l.rotate, opacity: 0 }}
          animate={
            reduced
              ? { opacity: l.opacity }
              : {
                  y: [0, -l.drift, 0, l.drift * 0.5, 0],
                  x: [0, l.drift * 0.4, 0, -l.drift * 0.3, 0],
                  rotate: [l.rotate, l.rotate + 10, l.rotate - 6, l.rotate + 4, l.rotate],
                  opacity: l.opacity,
                }
          }
          transition={{
            duration: l.duration,
            delay: l.delay,
            repeat: reduced ? 0 : Infinity,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            top: l.top,
            left: l.left,
            width: l.size,
            height: l.size,
          }}
        >
          <Leaf
            variant={l.variant}
            fill={l.fill}
            accent={l.accent}
            className="h-full w-full"
          />
        </motion.div>
      ))}
    </div>
  );
}
