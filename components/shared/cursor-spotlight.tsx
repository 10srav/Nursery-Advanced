'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CursorSpotlightProps {
  children: ReactNode;
  className?: string;
  color?: string;
  size?: number;
}

export function CursorSpotlight({
  children,
  className,
  color = 'rgba(249, 168, 212, 0.35)',
  size = 560,
}: CursorSpotlightProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(-1000);
  const y = useMotionValue(-1000);

  const background = useMotionTemplate`radial-gradient(${size}px circle at ${x}px ${y}px, ${color}, transparent 60%)`;

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  const onLeave = () => {
    x.set(-1000);
    y.set(-1000);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn('relative', className)}
    >
      <motion.div
        aria-hidden
        style={{ background }}
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-90 mix-blend-screen transition-opacity duration-500"
      />
      {children}
    </div>
  );
}
