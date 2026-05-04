import { motion } from 'framer-motion';
import { SpotlightCard } from '@/components/reactbits/SpotlightCard';
import { ExternalLink } from 'lucide-react';
import { cn } from '@/lib/cn';

export type TimelineItem = {
  id: string;
  date: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  url?: string | null;
  status?: {
    label: string;
    type: 'in-progress' | 'completed';
  };
  featured?: boolean;
};

type Props = {
  items: TimelineItem[];
  className?: string;
  viewCertificateText?: string;
};

export const Timeline = ({ items, className, viewCertificateText = 'View' }: Props) => {
  return (
    <div className={cn("relative", className)}>
      {/* Mobile: Vertical Line */}
      <div className="absolute left-[15px] top-2 bottom-0 w-0.5 pixel-flow-vertical lg:hidden z-0 opacity-60" />
      {/* Desktop: Horizontal Line */}
      <div className="hidden lg:block absolute left-0 right-0 top-[47px] h-0.5 w-full pixel-flow-horizontal z-0 opacity-60" />

      <div className="flex flex-col gap-10 lg:flex-row lg:gap-8 lg:overflow-x-auto lg:pb-8 hide-scrollbar scroll-smooth">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative flex flex-col lg:w-[400px] lg:shrink-0 lg:pt-[72px]"
          >
            {/* The Dot (Pixel Node) */}
            <div className="absolute left-[11px] top-1.5 h-2.5 w-2.5 bg-accent shadow-[0_0_10px_rgba(0,255,148,0.6)] lg:left-1/2 lg:-translate-x-1/2 lg:top-[43px] z-10" />

            {/* Date & Status Container - Centered on Desktop, Beside Node on Mobile */}
            <div className="pl-10 lg:pl-0 lg:absolute lg:top-0 lg:left-0 lg:right-0 flex flex-wrap items-center lg:justify-center gap-3 mb-3 lg:mb-0">
              <span className="font-mono text-sm font-bold tracking-wider text-accent">
                {item.date}
              </span>
              {item.status && (
                <span
                  className={cn(
                    "font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 border",
                    item.status.type === 'in-progress'
                      ? "border-accent/30 bg-accent/10 text-accent"
                      : "border-text-muted/30 bg-text-muted/10 text-text-muted"
                  )}
                >
                  {item.status.label}
                </span>
              )}
            </div>

            {/* Card */}
            <div className="pl-10 lg:pl-0 lg:h-full w-full">
              <SpotlightCard className="h-full flex flex-col p-6 lg:p-8 rounded-none">
                <div className="flex-1">
                  <h3 className="font-mono text-xl font-bold text-text mb-1">
                    {item.title}
                  </h3>
                  <p className="font-mono text-sm text-text-muted mb-4">
                    {item.subtitle}
                  </p>
                  <p className="text-sm text-text-subtle mb-6 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-auto space-y-6">
                  {/* Tags */}
                  {item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-surface-elevated/50 px-2 py-1 font-mono text-[10px] text-text-subtle border border-border-subtle"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* URL */}
                  {item.url && (
                    <div className="pt-4 border-t border-border-strong">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link flex items-center gap-2 font-mono text-xs text-text hover:text-accent transition-colors w-fit"
                      >
                        {viewCertificateText}
                        <ExternalLink className="h-3 w-3 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                      </a>
                    </div>
                  )}
                </div>
              </SpotlightCard>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
