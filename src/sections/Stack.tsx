import { useTranslation } from 'react-i18next';
import { LogoWall } from '@/components/ui/LogoWall';
import { WhatIDoCard } from '@/components/ui/WhatIDoCard';
import { AsciiPhysicsBackground } from '@/components/ui/AsciiPhysicsBackground';
import { STACK, WHAT_I_DO } from '@/data/stack';

export const Stack = () => {
  const { t } = useTranslation();

  // Filter only the stack items that should be in the carousel
  const carouselItems = STACK.filter(item => item.showInCarousel);

  return (
    <section 
      id="stack" 
      className="relative flex flex-col items-center justify-center py-24 md:py-32 overflow-hidden"
    >
      <AsciiPhysicsBackground />

      {/* 1. Stack / LogoWall */}
      <div className="w-full relative z-10">
        <div className="mx-auto w-full max-w-6xl px-8 mb-12">
          <h2 className="font-sans text-3xl font-extrabold tracking-tight text-text md:text-4xl">
            {t('stack.title')}
          </h2>
          <p className="mt-4 font-mono text-text-muted">
            {t('stack.subtitle')}
          </p>
        </div>
        
        {/* Infinite Marquee for Technologies */}
        <LogoWall items={carouselItems} speed="normal" className="mb-24" />
      </div>

      {/* 2. What I Do Cards */}
      <div className="relative z-10 w-full max-w-6xl px-8 py-12 -mx-8 sm:mx-0">
        <div>
          <div className="mb-12">
            <h2 className="font-sans text-3xl font-extrabold tracking-tight text-text md:text-4xl">
              {t('stack.whatIDoTitle')}
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {WHAT_I_DO.map((item) => (
              <WhatIDoCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
