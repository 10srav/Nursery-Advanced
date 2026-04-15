'use client';

import { motion, type Variants } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/lib/hooks/use-reduced-motion';

interface WordRevealProps {
  text: string;
  className?: string;
  wordClassName?: string;
  stagger?: number;
  delay?: number;
  duration?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

const container = (stagger: number, delay: number): Variants => ({
  hidden: {},
  show: {
    transition: {
      delayChildren: delay,
      staggerChildren: stagger,
    },
  },
});

const child = (duration: number): Variants => ({
  hidden: {
    opacity: 0,
    y: '110%',
    filter: 'blur(8px)',
  },
  show: {
    opacity: 1,
    y: '0%',
    filter: 'blur(0px)',
    transition: {
      duration,
      ease: [0.22, 1, 0.36, 1],
    },
  },
});

export function WordReveal({
  text,
  className,
  wordClassName,
  stagger = 0.06,
  delay = 0.15,
  duration = 0.9,
  as = 'h1',
}: WordRevealProps) {
  const reduced = useReducedMotion();
  const words = text.split(' ');
  const Tag = (reduced ? as : motion[as]) as React.ElementType;

  if (reduced) {
    return <Tag className={cn(className)}>{text}</Tag>;
  }

  return (
    <Tag
      initial="hidden"
      animate="show"
      variants={container(stagger, delay)}
      className={cn('flex flex-wrap', className)}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="relative mr-[0.25em] inline-block overflow-hidden pb-[0.1em]"
          aria-hidden
        >
          <motion.span
            variants={child(duration)}
            className={cn('inline-block', wordClassName)}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
