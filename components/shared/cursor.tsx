'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useReducedMotion } from '@/lib/hooks/use-reduced-motion';

export function Cursor() {
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [visible, setVisible] = useState(false);

  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  const ringX = useSpring(dotX, { damping: 26, stiffness: 300, mass: 0.5 });
  const ringY = useSpring(dotY, { damping: 26, stiffness: 300, mass: 0.5 });

  useEffect(() => {
    if (reduced || typeof window === 'undefined') return;
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    if (coarse) return;
    setEnabled(true);

    const onMove = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      if (!visible) setVisible(true);
    };
    const onEnter = () => setVisible(true);
    const onLeave = () => setVisible(false);
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const isInteractive = !!target.closest(
        'a, button, input, textarea, select, [role="button"], [data-cursor="hover"]',
      );
      setHovering(isInteractive);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    document.documentElement.addEventListener('mouseenter', onEnter);
    document.documentElement.addEventListener('mouseleave', onLeave);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      document.documentElement.removeEventListener('mouseenter', onEnter);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
    };
  }, [dotX, dotY, reduced, visible]);

  if (!enabled) return null;

  const ringScale = hovering ? 1.9 : pressed ? 0.75 : 1;
  const dotScale = hovering ? 0.5 : pressed ? 0.8 : 1;

  return (
    <>
      <style jsx global>{`
        @media (pointer: fine) {
          html,
          html * {
            cursor: none !important;
          }
        }
      `}</style>
      <motion.div
        aria-hidden
        style={{ x: dotX, y: dotY, opacity: visible ? 1 : 0 }}
        animate={{ scale: dotScale }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className="pointer-events-none fixed left-0 top-0 z-[200] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-forest-900 mix-blend-difference"
      />
      <motion.div
        aria-hidden
        style={{ x: ringX, y: ringY, opacity: visible ? 1 : 0 }}
        animate={{ scale: ringScale }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        className="pointer-events-none fixed left-0 top-0 z-[200] h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-forest-900/60 mix-blend-difference"
      />
    </>
  );
}
