'use client';

import type { ReactNode } from 'react';
import { motion, type Variants } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/lib/hooks/use-reduced-motion';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: Direction;
  distance?: number;
  once?: boolean;
  margin?: string;
}

const distanceMap: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 28 },
  down: { y: -28 },
  left: { x: 28 },
  right: { x: -28 },
  none: {},
};

export function Reveal({
  delay = 0,
  duration = 0.8,
  direction = 'up',
  distance = 28,
  once = true,
  margin = '-80px',
  className,
  children,
}: RevealProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <div className={cn(className)}>{children}</div>
    );
  }

  const offset = distanceMap[direction];
  const scaled = Object.fromEntries(
    Object.entries(offset).map(([k, v]) => [k, (v ?? 0) * (distance / 28)]),
  );

  const variants: Variants = {
    hidden: { opacity: 0, ...scaled },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin }}
      variants={variants}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
