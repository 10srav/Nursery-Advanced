import { cn } from '@/lib/utils';

/**
 * Fixed, pointer-events-none ambient background. Three gradient-filled
 * orbs drift on pure CSS keyframes (transform-only, GPU-composited).
 * Hidden on prefers-reduced-motion via the global media query in globals.css
 * (which pauses animate-float-lg).
 */
export function AmbientOrbs({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        'pointer-events-none fixed inset-0 -z-10 overflow-hidden',
        className,
      )}
    >
      <div
        className="absolute -left-40 top-[8%] h-[560px] w-[560px] rounded-full bg-forest-300/30 blur-[120px] animate-float-lg will-change-transform"
      />
      <div
        className="absolute right-[-14%] top-[42%] h-[640px] w-[640px] rounded-full bg-bloom-200/40 blur-[130px] animate-float-lg will-change-transform"
        style={{ animationDelay: '-9s', animationDuration: '13s' }}
      />
      <div
        className="absolute left-[22%] bottom-[-8%] h-[520px] w-[520px] rounded-full bg-mint-400/35 blur-[110px] animate-float-lg will-change-transform"
        style={{ animationDelay: '-18s', animationDuration: '15s' }}
      />
    </div>
  );
}
