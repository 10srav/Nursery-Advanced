'use client';

import { useRef, type ReactNode } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from 'framer-motion';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/lib/hooks/use-reduced-motion';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  max?: number;
  scale?: number;
  glareOpacity?: number;
  /**
   * Radial glare color (with opacity). Defaults to a soft bloom-pink.
   */
  glareColor?: string;
}

export function TiltCard({
  children,
  className,
  max = 12,
  scale = 1.04,
  glareOpacity = 0.42,
  glareColor = 'rgba(249, 168, 212',
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  // Snappier than before — 300/22 is the 21dev inspiration default for card tilts.
  const sx = useSpring(x, { stiffness: 300, damping: 22, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 300, damping: 22, mass: 0.5 });

  const rotateX = useTransform(sy, [-0.5, 0.5], [max, -max]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-max, max]);
  const glareX = useTransform(sx, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(sy, [-0.5, 0.5], ['0%', '100%']);
  // Two stacked gradients: warm bloom tint that follows cursor + subtle white highlight.
  const glareBackground = useMotionTemplate`radial-gradient(420px circle at ${glareX} ${glareY}, ${glareColor}, ${glareOpacity}), transparent 55%), radial-gradient(180px circle at ${glareX} ${glareY}, rgba(255,255,255,0.32), transparent 50%)`;

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(px);
    y.set(py);
  };

  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      whileHover={reduced ? {} : { scale }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      style={{
        rotateX: reduced ? 0 : rotateX,
        rotateY: reduced ? 0 : rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={cn('relative will-change-transform', className)}
    >
      <div
        style={{ transformStyle: 'preserve-3d' }}
        className="h-full w-full"
      >
        {children}
      </div>
      {!reduced && (
        <motion.div
          style={{ background: glareBackground }}
          className="pointer-events-none absolute inset-0 rounded-[inherit] mix-blend-overlay"
          aria-hidden
        />
      )}
    </motion.div>
  );
}
