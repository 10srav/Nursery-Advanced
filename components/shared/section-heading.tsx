'use client';

import { Reveal } from './reveal';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  accent?: 'default' | 'sage' | 'bloom';
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  accent = 'sage',
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-5',
        align === 'center' ? 'items-center text-center' : 'items-start text-left',
        className,
      )}
    >
      <Reveal delay={0}>
        <Badge variant={accent === 'default' ? 'default' : accent === 'bloom' ? 'bloom' : 'sage'}>
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
          {eyebrow}
        </Badge>
      </Reveal>
      <Reveal delay={0.08}>
        <h2
          className={cn(
            'font-display text-4xl font-medium tracking-tight text-forest-900',
            'sm:text-5xl md:text-6xl',
            'max-w-4xl',
          )}
        >
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.16}>
          <p
            className={cn(
              'max-w-2xl text-base leading-relaxed text-forest-900/85 sm:text-lg',
            )}
          >
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
