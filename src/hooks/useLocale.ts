import { useTranslation } from 'react-i18next';

/**
 * Custom hook to cleanly get the current active locale ('es' or 'en').
 * Normalizes variations like 'es-MX' or 'en-US' to their base language.
 */
export const useLocale = (): 'es' | 'en' => {
  const { i18n } = useTranslation();
  
  // Safe fallback to 'en' if i18n is not fully initialized
  const lang = i18n.language || 'en';
  
  return lang.startsWith('es') ? 'es' : 'en';
};
