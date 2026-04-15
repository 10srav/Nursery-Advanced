import { cn } from '@/lib/utils';

interface LeafProps {
  className?: string;
  variant?: 'simple' | 'monstera' | 'frond' | 'round';
  fill?: string;
  accent?: string;
}

export function Leaf({
  className,
  variant = 'simple',
  fill = '#22C55E',
  accent = '#14532D',
}: LeafProps) {
  if (variant === 'monstera') {
    return (
      <svg
        viewBox="0 0 120 140"
        className={cn('overflow-visible', className)}
        aria-hidden
      >
        <path
          d="M60 6c25 10 46 36 46 66 0 34-21 56-46 60-25-4-46-26-46-60C14 42 35 16 60 6Z"
          fill={fill}
        />
        <path
          d="M60 18c18 8 33 28 33 52 0 24-14 40-33 46-19-6-33-22-33-46 0-24 15-44 33-52Z"
          fill={accent}
          opacity="0.18"
        />
        {/* fenestrations */}
        <path d="M40 40c4 6 10 9 18 10-2-7-9-11-18-10Z" fill={accent} opacity="0.45" />
        <path d="M40 70c4 6 12 9 22 10-2-7-11-12-22-10Z" fill={accent} opacity="0.45" />
        <path d="M40 100c6 5 14 7 22 8-2-6-10-10-22-8Z" fill={accent} opacity="0.45" />
        <path d="M82 50c-3 6-9 10-18 12 2-7 8-12 18-12Z" fill={accent} opacity="0.45" />
        <path d="M82 80c-3 6-9 10-18 12 2-7 8-12 18-12Z" fill={accent} opacity="0.45" />
        <path
          d="M60 10v122"
          stroke={accent}
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (variant === 'frond') {
    return (
      <svg
        viewBox="0 0 80 180"
        className={cn('overflow-visible', className)}
        aria-hidden
      >
        <path
          d="M40 4c2 25 4 50 6 70 4 32 10 55 18 86-4 0-11 2-16 14-3-10-8-18-14-20 6-28 8-52 6-80-1-24 0-48 0-70Z"
          fill={fill}
        />
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <g key={i} opacity={0.6}>
            <path
              d={`M40 ${24 + i * 18} q-14 ${6 - i} -20 ${14 - i * 0.6}`}
              stroke={accent}
              strokeWidth="1"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d={`M40 ${24 + i * 18} q14 ${6 - i} 20 ${14 - i * 0.6}`}
              stroke={accent}
              strokeWidth="1"
              fill="none"
              strokeLinecap="round"
            />
          </g>
        ))}
      </svg>
    );
  }

  if (variant === 'round') {
    return (
      <svg
        viewBox="0 0 100 100"
        className={cn('overflow-visible', className)}
        aria-hidden
      >
        <path
          d="M50 6c26 0 44 20 44 44s-18 44-44 44S6 76 6 50 24 6 50 6Z"
          fill={fill}
        />
        <path
          d="M50 12c22 0 38 17 38 38S72 88 50 88 12 72 12 50 28 12 50 12Z"
          fill={accent}
          opacity="0.18"
        />
        <path
          d="M50 14v72"
          stroke={accent}
          strokeWidth="1.1"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 100 130"
      className={cn('overflow-visible', className)}
      aria-hidden
    >
      <path
        d="M50 4c30 10 46 38 46 64 0 32-20 54-46 58-26-4-46-26-46-58C4 42 20 14 50 4Z"
        fill={fill}
      />
      <path
        d="M50 10v116"
        stroke={accent}
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      {[30, 50, 70, 90].map((y) => (
        <g key={y} opacity="0.45">
          <path
            d={`M50 ${y} q-18 -6 -30 -${y / 4}`}
            stroke={accent}
            strokeWidth="1"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d={`M50 ${y} q18 -6 30 -${y / 4}`}
            stroke={accent}
            strokeWidth="1"
            fill="none"
            strokeLinecap="round"
          />
        </g>
      ))}
    </svg>
  );
}
