import * as LucideIcons from 'lucide-react';
import { cn } from '@/lib/cn';
import type { WhatIDo } from '@/data/stack';
import { useLocale } from '@/hooks/useLocale';

type Props = {
  item: WhatIDo;
  className?: string;
};

export const WhatIDoCard = ({ item, className }: Props) => {
  const locale = useLocale();
  
  // Dynamically resolve the Lucide icon from the string name in the data
  const IconComponent = (LucideIcons as unknown as Record<string, typeof LucideIcons.Code>)[item.icon] || LucideIcons.Code;

  // Use the correct locale for the text
  const currentLocale = locale === 'es' ? 'es' : 'en';
  return (
    <div 
      className={cn(
        "group relative flex flex-col justify-between border border-border-strong bg-liquid-noise p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-glow hover:border-accent/50",
        className
      )}
    >

      {/* Neural Brutalism decorative corner */}
      <div className="absolute -right-px -top-px h-4 w-4 border-r-2 border-t-2 border-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="absolute -bottom-px -left-px h-4 w-4 border-b-2 border-l-2 border-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div>
        <div className="mb-6 inline-flex rounded-sm bg-accent/10 p-3 text-accent">
          <IconComponent size={32} strokeWidth={1.5} />
        </div>

        <h3 className="mb-3 font-sans text-2xl font-bold tracking-tight text-text group-hover:text-accent transition-colors duration-300">
          {item.title[currentLocale]}
        </h3>
        
        <p className="mb-6 font-sans text-text-muted">
          {item.description[currentLocale]}
        </p>
      </div>

      <ul className="space-y-3">
        {item.bullets[currentLocale].map((bullet, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <div className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-accent" />
            <span className="font-mono text-sm leading-relaxed text-text-subtle group-hover:text-text-muted transition-colors duration-300">
              {bullet}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
