import type { ReactNode } from 'react';
import { SkipLink } from '@/components/ui/SkipLink';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';

type Props = {
  children: ReactNode;
};

/**
 * Layout raíz del sitio.
 * Estructura semántica: skip-link → header/nav → main → footer.
 * El padding-top compensa el navbar fixed (h-16 = 4rem).
 */
export const RootLayout = ({ children }: Props) => {
  return (
    <>
      <SkipLink />
      <Navbar />
      <main id="main-content" className="min-h-screen pt-16">
        {children}
      </main>
      <Footer />
    </>
  );
};
