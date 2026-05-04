import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/cn';
import type { StackItem } from '@/data/stack';

type Props = {
  items: StackItem[];
  className?: string;
  speed?: 'slow' | 'normal' | 'fast';
};

export const LogoWall = ({ items, className, speed = 'normal' }: Props) => {
  const reducedMotion = useReducedMotion();


  const speedClass = {
    slow: 'duration-[60s]',
    normal: 'duration-[30s]',
    fast: 'duration-[15s]',
  }[speed];

  return (
    <div 
      className={cn(
        "relative flex w-full overflow-hidden border-y border-border-strong bg-surface py-6",
        className
      )}
      aria-label="Technology stack logos"
    >
      {/* Left and right gradient masks for a smooth fade effect */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-surface to-transparent md:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-surface to-transparent md:w-32" />

      <div 
        className={cn(
          "flex w-max",
          // Only animate if the user hasn't preferred reduced motion
          !reducedMotion && "animate-marquee hover:[animation-play-state:paused]",
          !reducedMotion && speedClass
        )}
      >
        {[...Array(2)].map((_, groupIndex) => (
          <div 
            key={groupIndex}
            className="flex shrink-0 items-center gap-8 px-4 md:gap-16 md:px-8"
            aria-hidden={groupIndex === 1 ? "true" : "false"}
          >
            {items.map((item, index) => (
              <div 
                key={`${item.id}-${index}`} 
                className="flex items-center justify-center gap-3 grayscale transition-all duration-300 hover:grayscale-0"
                title={item.name}
              >
                {item.logoUrl ? (
                  <img 
                    src={item.logoUrl} 
                    alt={`${item.name} logo`} 
                    className="h-8 w-8 object-contain md:h-10 md:w-10"
                    loading="lazy" 
                  />
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center rounded-sm border border-border-strong bg-surface-elevated md:h-10 md:w-10">
                    <span className="font-mono text-xs text-text-muted">{item.name.substring(0, 2)}</span>
                  </div>
                )}
                <span className="font-mono text-sm font-medium text-text-muted md:text-base">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
