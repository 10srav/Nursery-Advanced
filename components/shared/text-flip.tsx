'use client';

import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface TextFlipProps {
  children: ReactNode;
  className?: string;
}

export function TextFlip({ children, className }: TextFlipProps) {
  return (
    <span
      className={cn(
        'relative inline-flex items-center overflow-hidden motion-reduce:overflow-visible',
        className,
      )}
    >
      <span
        aria-hidden
        className="flex items-center gap-2 transition-transform duration-500 ease-liquid motion-reduce:transition-none motion-safe:group-hover:-translate-y-full"
      >
        {children}
      </span>
      <span className="absolute inset-0 flex translate-y-full items-center gap-2 transition-transform duration-500 ease-liquid motion-reduce:hidden motion-safe:group-hover:translate-y-0">
        {children}
      </span>
    </span>
  );
}
