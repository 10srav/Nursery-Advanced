import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium tracking-wide uppercase transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-forest-900 text-mint-50',
        sage: 'bg-forest-100 text-forest-900 border border-forest-900/10',
        bloom: 'bg-bloom-100 text-bloom-700 border border-bloom-200',
        glass:
          'bg-white/50 text-forest-900 border border-white/70 backdrop-blur-xl',
        outline: 'border border-forest-900/20 text-forest-900',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
