import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  showWordmark?: boolean;
}

export function Logo({ className, showWordmark = true }: LogoProps) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <defs>
          <linearGradient id="lgl" x1="0" y1="0" x2="32" y2="32">
            <stop offset="0" stopColor="#22C55E" />
            <stop offset="1" stopColor="#14532D" />
          </linearGradient>
        </defs>
        <circle cx="16" cy="16" r="15" fill="url(#lgl)" />
        <path
          d="M16 6c3 2 5 5 5 8.5 0 3-2 5.5-5 7-3-1.5-5-4-5-7 0-3.5 2-6.5 5-8.5Z"
          fill="#F0FDF4"
          opacity="0.95"
        />
        <path
          d="M16 8.5v13"
          stroke="#14532D"
          strokeWidth="0.8"
          strokeLinecap="round"
        />
      </svg>
      {showWordmark && (
        <span className="font-display text-xl font-semibold tracking-tight text-forest-900">
          Verdant
        </span>
      )}
    </span>
  );
}
