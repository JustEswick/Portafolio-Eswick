import { useEffect, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';
import { cn } from '@/lib/cn';
import { NAV_ITEMS } from '@/data/navigation';
import { LanguageToggle } from './LanguageToggle';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

/**
 * Drawer lateral móvil con overlay oscuro.
 * Incluye focus trap (Tab cicla dentro del drawer) y cierre con Escape.
 */
export const MobileDrawer = ({ isOpen, onClose }: Props) => {
  const { t } = useTranslation();
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Cerrar con Escape
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      // Focus trap: mantener foco dentro del drawer
      if (e.key === 'Tab' && drawerRef.current) {
        const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // Prevenir scroll del body
      document.body.style.overflow = 'hidden';
      // Mover foco al botón de cerrar
      closeButtonRef.current?.focus();
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-bg/60 backdrop-blur-sm transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label={t('a11y.mainNav')}
        className={cn(
          'fixed right-0 top-0 z-50 flex h-full w-72 flex-col',
          'border-l border-border bg-surface p-6',
          'transition-transform duration-300 ease-out-expo',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Botón cerrar */}
        <div className="mb-8 flex justify-end">
          <button
            ref={closeButtonRef}
            onClick={onClose}
            aria-label={t('a11y.closeMenu')}
            className="rounded-md p-2 text-text-muted transition-colors hover:text-text"
          >
            <X size={20} strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>

        {/* Links de navegación */}
        <nav>
          <ul className="flex flex-col gap-2">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  onClick={onClose}
                  className="block rounded-md px-4 py-3 font-mono text-sm text-text-muted transition-colors hover:bg-surface-elevated hover:text-accent"
                >
                  {t(item.labelKey)}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Toggle idioma al fondo */}
        <div className="mt-auto pt-6">
          <LanguageToggle className="w-full justify-center" />
        </div>
      </div>
    </>
  );
};
