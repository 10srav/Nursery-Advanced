'use client';

import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useRef } from 'react';
import { Leaf } from './leaf';
import { useReducedMotion } from '@/lib/hooks/use-reduced-motion';
import { cn } from '@/lib/utils';

interface HeroSceneProps {
  className?: string;
}

function useParallaxY(scrollYProgress: MotionValue<number>, distance: number, enabled: boolean) {
  return useTransform(scrollYProgress, [0, 1], enabled ? [0, distance] : [0, 0]);
}

export function HeroScene({ className }: HeroSceneProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const enabled = !reduced;
  const yBack = useParallaxY(scrollYProgress, -60, enabled);
  const yMid = useParallaxY(scrollYProgress, -140, enabled);
  const yFront = useParallaxY(scrollYProgress, -220, enabled);
  const opacity = useTransform(scrollYProgress, [0, 0.8], enabled ? [1, 0.2] : [1, 1]);

  return (
    <div
      aria-hidden
      className={cn(
        'pointer-events-none absolute inset-0 overflow-hidden',
        className,
      )}
    >
      <div ref={ref} className="relative h-full w-full">
      {/* Morphing blobs */}
      <motion.div
        style={{ y: yBack, opacity }}
        className="absolute -left-32 top-20 h-[520px] w-[520px] rounded-blob bg-forest-200/60 blur-3xl animate-blob"
      />
      <motion.div
        style={{ y: yBack, opacity }}
        className="absolute right-[-10%] top-40 h-[420px] w-[420px] rounded-blob bg-bloom-200/45 blur-3xl animate-blob [animation-delay:-4s]"
      />
      <motion.div
        style={{ y: yMid, opacity }}
        className="absolute left-1/4 top-[60%] h-[360px] w-[360px] rounded-blob bg-mint-200/80 blur-2xl animate-blob [animation-delay:-8s]"
      />

      {/* Back layer — far silhouettes */}
      <motion.div style={{ y: yBack }} className="absolute inset-0">
        <Leaf
          variant="frond"
          className="absolute -left-6 top-24 h-64 w-auto opacity-30"
          fill="#86EFAC"
          accent="#166534"
        />
        <Leaf
          variant="frond"
          className="absolute -right-10 top-10 h-80 w-auto opacity-25 [transform:scaleX(-1)]"
          fill="#86EFAC"
          accent="#166534"
        />
      </motion.div>

      {/* Mid layer */}
      <motion.div style={{ y: yMid }} className="absolute inset-0">
        <Leaf
          variant="monstera"
          className="absolute -left-16 bottom-[-60px] h-[460px] w-auto opacity-80"
          fill="#22C55E"
          accent="#14532D"
        />
        <Leaf
          variant="monstera"
          className="absolute -right-24 top-[-40px] h-[380px] w-auto opacity-70 [transform:rotate(18deg)]"
          fill="#4ADE80"
          accent="#14532D"
        />
      </motion.div>

      {/* Front layer — closer details */}
      <motion.div style={{ y: yFront }} className="absolute inset-0">
        <Leaf
          variant="simple"
          className="absolute left-[6%] bottom-[-30px] h-52 w-auto opacity-90 [transform:rotate(-20deg)]"
          fill="#16A34A"
          accent="#052E16"
        />
        <Leaf
          variant="round"
          className="absolute right-[8%] bottom-[-10px] h-44 w-auto opacity-85 [transform:rotate(14deg)]"
          fill="#15803D"
          accent="#052E16"
        />
      </motion.div>

      {/* Grain overlay */}
      <div className="absolute inset-0 bg-grain opacity-[0.25] mix-blend-multiply" />
      </div>
    </div>
  );
}
