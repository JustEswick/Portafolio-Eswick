import {
  Code,
  Briefcase,
  Music2,
  Play,
  Gamepad2,
  Mail,
  type LucideIcon,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/cn';
import { Ghost } from '@/components/brand/Ghost';
import { SOCIAL_LINKS } from '@/data/social-links';

/**
 * Mapa de iconos genéricos para plataformas sociales.
 * Lucide no incluye iconos de marca — usamos proxies reconocibles.
 * TODO: Reemplazar con Simple Icons o SVGs custom si Isaac lo prefiere.
 */
const iconMap: Record<string, LucideIcon> = {
  Code,       // GitHub → icono de código
  Briefcase,  // LinkedIn → maletín profesional
  Music2,     // TikTok → nota musical
  Play,       // YouTube → play
  Gamepad2,   // Twitch → gamepad
  Mail,       // Email → sobre
};

/**
 * Footer con 3 columnas (desktop) o stack vertical (mobile).
 */
export const Footer = () => {
  const { t, i18n } = useTranslation();
  const locale = i18n.language.startsWith('es') ? 'es-MX' : 'en-US';

  return (
    <footer className="border-t border-border bg-surface">
      <div
        className={cn(
          'mx-auto flex max-w-6xl flex-col items-center gap-8 px-6 py-12',
          'md:flex-row md:justify-between md:px-8 md:py-8'
        )}
      >
        {/* Izquierda: ghost + copyright */}
        <div className="flex items-center gap-3">
          <Ghost size="inline" animation="none" ariaLabel="Eswick" />
          <span className="font-mono text-xs text-text-subtle">
            {t('footer.copyright')}
          </span>
        </div>

        {/* Centro: links sociales */}
        <div className="flex items-center gap-4">
          {SOCIAL_LINKS.map((link) => {
            const IconComponent = iconMap[link.icon];
            if (!IconComponent) return null;

            return (
              <a
                key={link.id}
                href={link.url}
                target={link.url.startsWith('mailto:') ? undefined : '_blank'}
                rel={link.url.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                aria-label={t(link.labelKey)}
                className="rounded-md p-2 text-text-subtle transition-colors duration-200 hover:text-accent"
              >
                <IconComponent size={18} strokeWidth={1.5} aria-hidden="true" />
              </a>
            );
          })}
        </div>

        {/* Derecha: metadata terminal */}
        <div className="flex flex-col items-center gap-1 md:items-end">
          <span className="font-mono text-xs text-text-subtle">
            v0.1.0 · {locale}
          </span>
          <span className="font-mono text-xs text-text-subtle">
            {t('footer.madeWith')}
          </span>
        </div>
      </div>
    </footer>
  );
};
