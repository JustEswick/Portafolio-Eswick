# Componente `<Ghost>` — código de referencia

Este es el componente que el agente debe crear en Fase 1 (o cuando integre el logo). Va en `src/components/brand/Ghost.tsx`.

## `src/assets/brand/ghost.config.ts`

```ts
export const GHOST_SIZES = {
  favicon: 32,
  nav: 32,
  inline: 48,
  card: 80,
  section: 120,
  hero: 240,
  ascii: 320,
} as const;

export type GhostSize = keyof typeof GHOST_SIZES;

export type GhostAnimation = 'none' | 'float' | 'blink' | 'glow';

export const GHOST_CONFIG = {
  // Si el SVG real tiene IDs identificables para los ojos, pon aquí los selectores.
  // Si está vacío, la animación 'blink' hace fallback a 'float'.
  eyeSelectors: ['#eyes', '#left-eye', '#right-eye'],
  // Glow del accent verde por defecto.
  glowColor: 'rgba(0, 255, 148, 0.35)',
} as const;
```

## `src/components/brand/Ghost.tsx`

```tsx
import { useEffect, useState } from 'react';
import { cn } from '@/lib/cn';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import {
  GHOST_SIZES,
  type GhostSize,
  type GhostAnimation,
} from '@/assets/brand/ghost.config';

// Vite: importa el SVG como componente React si existe el archivo.
// Si no existe en build time, el import lanza error — lo manejamos con try/catch dinámico.
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error - Vite resuelve este import si el archivo existe
import GhostSvg from '@/assets/brand/ghost.svg?react';

type Props = {
  size?: GhostSize | number;
  animation?: GhostAnimation;
  className?: string;
  ariaLabel?: string;
};

export const Ghost = ({
  size = 'hero',
  animation = 'float',
  className,
  ariaLabel = 'Eswick mascot',
}: Props) => {
  const reduced = useReducedMotion();
  const [hasLogo, setHasLogo] = useState<boolean>(true);

  useEffect(() => {
    // Validación runtime: si el componente importado no es función, mostramos placeholder.
    if (typeof GhostSvg !== 'function') {
      setHasLogo(false);
      // eslint-disable-next-line no-console
      console.warn(
        '[Ghost] No se encontró src/assets/brand/ghost.svg. ' +
        'Renderizando placeholder. Sube el archivo y refresca.'
      );
    }
  }, []);

  const px = typeof size === 'number' ? size : GHOST_SIZES[size];
  const effectiveAnimation = reduced ? 'none' : animation;

  if (!hasLogo) {
    return <GhostPlaceholder size={px} className={className} />;
  }

  return (
    <div
      role="img"
      aria-label={ariaLabel}
      className={cn(
        'inline-flex items-center justify-center',
        effectiveAnimation === 'float' && 'animate-ghost-float',
        effectiveAnimation === 'glow' && 'animate-ghost-glow',
        effectiveAnimation === 'blink' && 'animate-ghost-blink',
        className
      )}
      style={{ width: px, height: px }}
    >
      <GhostSvg width={px} height={px} aria-hidden="true" />
    </div>
  );
};

const GhostPlaceholder = ({
  size,
  className,
}: {
  size: number;
  className?: string;
}) => (
  <div
    role="img"
    aria-label="Logo pendiente"
    className={cn(
      'inline-flex items-center justify-center rounded-full',
      'border-2 border-dashed border-text-subtle text-text-subtle',
      'font-mono text-xs uppercase tracking-widest',
      className
    )}
    style={{ width: size, height: size }}
  >
    LOGO
  </div>
);
```

## Animaciones CSS — añadir a `globals.css`

```css
@layer utilities {
  .animate-ghost-float {
    animation: ghost-float 5s ease-in-out infinite;
  }

  .animate-ghost-glow {
    animation: ghost-glow 3s ease-in-out infinite;
    filter: drop-shadow(0 0 20px rgba(0, 255, 148, 0.35));
  }

  .animate-ghost-blink {
    animation: ghost-float 5s ease-in-out infinite;
    /* La animación real de parpadeo debe ir sobre los <eyes> dentro del SVG.
       Si el SVG tiene #eyes, podemos targetearlo con CSS desde aquí. */
  }

  .animate-ghost-blink :is(#eyes, #left-eye, #right-eye) {
    animation: ghost-blink 4.5s ease-in-out infinite;
    transform-origin: center;
  }
}

@keyframes ghost-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@keyframes ghost-glow {
  0%, 100% { filter: drop-shadow(0 0 12px rgba(0, 255, 148, 0.2)); }
  50%      { filter: drop-shadow(0 0 28px rgba(0, 255, 148, 0.45)); }
}

@keyframes ghost-blink {
  0%, 92%, 100% { transform: scaleY(1); }
  95%, 97%      { transform: scaleY(0.1); }
}
```

## Configuración de Vite para `?react` en SVG

En `vite.config.ts` añadir el plugin `vite-plugin-svgr`:

```bash
npm install -D vite-plugin-svgr
```

```ts
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [react(), svgr()],
  // ...
});
```

Y en `src/vite-env.d.ts`:

```ts
/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />
```

## Cómo se usa en cada sección

```tsx
// Navbar
<Ghost size="nav" animation="none" />

// Hero
<Ghost size="hero" animation="float" />

// Sección Creator (cuando NO hay video ASCII todavía)
<Ghost size="ascii" animation="glow" />

// Footer (variante pixel — usa otro componente similar GhostPixel)
<GhostPixel size={48} />

// 404 page
<Ghost size="hero" animation="blink" />
```

## Estado del placeholder

Mientras Isaac no suba `ghost.svg`:
- El sitio **no se rompe**.
- Donde debería estar el ghost se ve un círculo punteado con texto "LOGO".
- Console muestra advertencia en dev.
- En producción, el placeholder es discreto pero visible — incentiva subir el logo.
