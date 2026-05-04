import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';
import { cn } from '@/lib/cn';

type Props = {
  className?: string;
};

/**
 * Botón toggle de idioma ES/EN.
 * Muestra el código del idioma actual y un icono.
 */
export const LanguageToggle = ({ className }: Props) => {
  const { i18n, t } = useTranslation();

  const toggleLanguage = () => {
    const nextLang = i18n.language.startsWith('es') ? 'en' : 'es';
    i18n.changeLanguage(nextLang);
    document.documentElement.lang = nextLang;
  };

  const currentLang = i18n.language.startsWith('es') ? 'ES' : 'EN';

  return (
    <button
      onClick={toggleLanguage}
      aria-label={t('a11y.switchLang')}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5',
        'font-mono text-xs font-medium text-text-muted',
        'transition-all duration-200 ease-out-expo',
        'hover:border-border-strong hover:text-text',
        className
      )}
    >
      <Languages size={14} strokeWidth={1.5} aria-hidden="true" />
      {currentLang}
    </button>
  );
};
