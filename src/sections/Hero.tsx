import { useTranslation } from 'react-i18next';
import { ArrowRight, Mail } from 'lucide-react';
import { Ghost } from '@/components/brand/Ghost';
import { Silk } from '@/components/reactbits/Silk';
import { LiquidChrome } from '@/components/reactbits/LiquidChrome';
import TextType from '@/components/ui/TextType';

export const Hero = () => {
  const { t } = useTranslation();

  // Feature flag para elegir el fondo 3D del Hero ('silk' | 'liquid')
  const activeBg: string = 'liquid';

  return (
    <section 
      id="hero" 
      className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center overflow-hidden px-8 py-20 md:py-32"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0 opacity-40">
        {activeBg === 'silk' && (
          <Silk speed={17.4} scale={1.2} noiseIntensity={1.8} color="#3417b4ff" />
        )}
        {activeBg === 'liquid' && (
          <LiquidChrome 
            baseColor={[0.1, 0.1, 0.1]} 
            speed={0.3} 
            amplitude={0.87} 
            interactive={true} 
          />
        )}
      </div>

      <div className="z-10 flex w-full max-w-6xl flex-col items-center gap-12 md:flex-row md:justify-between md:gap-24">
        
        {/* Ghost (Top in mobile, Left in desktop) */}
        <div className="flex flex-shrink-0 items-center justify-center md:w-1/2">
          <Ghost size="hero" animation="float" className="scale-75 sm:scale-90 md:scale-100 lg:scale-110 -rotate-3 transition-transform duration-700 hover:-rotate-6" />
        </div>

        {/* Text content (Bottom in mobile, Right in desktop) */}
        <div className="flex flex-col items-start gap-6 text-left md:w-1/2">
          
          {/* Greeting tag */}
          <div className="inline-block border border-accent/30 bg-accent/10 px-3 py-1 font-mono text-sm text-accent backdrop-blur-sm">
            {t('hero.greeting')}
          </div>
          
          {/* Headline */}
          <h1 className="font-sans text-4xl font-extrabold tracking-tight text-text sm:text-5xl lg:text-6xl min-h-[120px] sm:min-h-[150px] lg:min-h-[180px]">
            <TextType 
              text={t('hero.headline')} 
              typingSpeed={50} 
              cursorClassName="text-accent"
              showCursor={true}
            />
          </h1>
          
          {/* Subtitle */}
          <p className="max-w-xl font-mono text-base text-text-muted sm:text-lg">
            {t('hero.subtitle')}
          </p>
          
          {/* CTAs */}
          <div className="mt-4 flex flex-wrap gap-4">
            <a 
              href="#projects" 
              className="group flex items-center gap-2 border border-transparent bg-accent px-6 py-3 font-mono text-sm font-semibold text-bg transition-all hover:bg-accent/90 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            >
              {t('hero.ctaProjects')}
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </a>
            
            <a 
              href="mailto:eswicke.contacto@gmail.com" 
              className="flex items-center gap-2 border border-border bg-surface px-6 py-3 font-mono text-sm font-semibold text-text transition-all hover:border-border-strong hover:bg-surface-elevated focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            >
              <Mail size={18} />
              {t('hero.ctaContact')}
            </a>
          </div>

        </div>
      </div>

      {/* Terminal Metadata at bottom left */}
      <div className="absolute bottom-8 left-8 hidden md:block">
        <p className="font-pixel text-[10px] uppercase text-text-subtle opacity-70">
          <span className="text-accent">&gt;</span> {t('hero.metadata')}
        </p>
      </div>
    </section>
  );
};
