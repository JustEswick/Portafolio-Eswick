import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Ghost } from '@/components/brand/Ghost';
import { LanguageToggle } from './LanguageToggle';
import { MobileDrawer } from './MobileDrawer';
import { NAV_ITEMS } from '@/data/navigation';

/**
 * Navbar fixed con glassmorphism.
 * Desktop: logo + anchors + toggle idioma.
 * Mobile: logo + toggle idioma + hamburger → drawer.
 */
export const Navbar = () => {
  const { t } = useTranslation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50',
          'border-b border-border bg-bg/80 backdrop-blur-md'
        )}
      >
        <nav
          aria-label={t('a11y.mainNav')}
          className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 md:px-8"
        >
          {/* Logo */}
          <a
            href="#top"
            className="shrink-0 transition-opacity hover:opacity-80"
            aria-label="Ir al inicio"
          >
            <Ghost size="nav" animation="none" ariaLabel="Eswick logo" />
          </a>

          {/* Anchors — solo desktop */}
          <ul className="hidden items-center gap-1 md:flex">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  className={cn(
                    'rounded-md px-3 py-2 font-mono text-sm text-text-muted',
                    'transition-colors duration-200 ease-out-expo',
                    'hover:text-accent'
                  )}
                >
                  {t(item.labelKey)}
                </a>
              </li>
            ))}
          </ul>

          {/* Controles derecha */}
          <div className="flex items-center gap-3">
            <LanguageToggle />

            {/* Hamburger — solo mobile */}
            <button
              onClick={() => setDrawerOpen(true)}
              aria-label={t('a11y.openMenu')}
              aria-expanded={drawerOpen}
              aria-controls="mobile-drawer"
              className="rounded-md p-2 text-text-muted transition-colors hover:text-text md:hidden"
            >
              <Menu size={20} strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>
        </nav>
      </header>

      {/* Drawer móvil */}
      <MobileDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </>
  );
};
