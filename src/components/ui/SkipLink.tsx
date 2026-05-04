import { useTranslation } from 'react-i18next';

/**
 * Link accesible de salto al contenido.
 * Invisible por defecto, se muestra al recibir foco con Tab.
 * Debe ser el PRIMER elemento focusable del DOM.
 */
export const SkipLink = () => {
  const { t } = useTranslation();

  return (
    <a
      href="#main-content"
      className="fixed left-4 top-4 z-[100] -translate-y-20 rounded-md border border-accent bg-bg px-5 py-2.5 font-mono text-sm font-medium text-accent transition-transform duration-200 focus:translate-y-0"
    >
      {t('a11y.skipToContent')}
    </a>
  );
};
