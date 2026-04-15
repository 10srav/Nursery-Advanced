'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium cursor-pointer transition-all duration-300 ease-liquid focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-500 focus-visible:ring-offset-2 focus-visible:ring-offset-mint-50 disabled:pointer-events-none disabled:opacity-50 overflow-hidden isolate',
  {
    variants: {
      variant: {
        default:
          'bg-forest-900 text-mint-50 shadow-soft hover:shadow-lift hover:-translate-y-0.5 hover:bg-forest-800 active:translate-y-0',
        bloom:
          'bg-bloom-700 text-white shadow-bloom hover:shadow-[0_0_0_1px_rgba(236,72,153,0.2),0_30px_80px_-20px_rgba(236,72,153,0.55)] hover:-translate-y-0.5 hover:bg-bloom-600 active:translate-y-0',
        glass:
          'bg-white/60 text-forest-900 backdrop-blur-xl border border-white/60 shadow-glass hover:bg-white/80 hover:-translate-y-0.5',
        outline:
          'border border-forest-900/20 bg-transparent text-forest-900 hover:bg-forest-900/5 hover:border-forest-900/40',
        ghost:
          'bg-transparent text-forest-900 hover:bg-forest-900/5',
        link: 'bg-transparent text-forest-900 underline-offset-4 hover:underline',
      },
      size: {
        sm: 'h-9 px-4 text-sm',
        md: 'h-11 px-6 text-sm',
        lg: 'h-14 px-8 text-base',
        xl: 'h-16 px-10 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      >
        {children}
      </Comp>
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
