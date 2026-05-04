import { useEffect, useState, type ComponentType, type SVGProps } from 'react';
import { cn } from '@/lib/cn';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import {
  GHOST_SIZES,
  type GhostSize,
  type GhostAnimation,
} from '@/assets/brand/ghost.config';

type SvgComponent = ComponentType<SVGProps<SVGSVGElement>>;

type Props = {
  size?: GhostSize | number;
  animation?: GhostAnimation;
  className?: string;
  ariaLabel?: string;
};

/**
 * Componente centralizado para el ghost/logo de Eswick.
 *
 * - Si `ghost.svg` no existe → renderiza placeholder fail-safe (círculo punteado).
 * - Si existe → renderiza el SVG con animaciones opcionales.
 * - Respeta `prefers-reduced-motion` desactivando animaciones.
 *
 * NUNCA importar ghost.svg directamente en otros componentes.
 * NUNCA dibujar el ghost inline con <path> en otros componentes.
 */
export const Ghost = ({
  size = 'hero',
  animation = 'float',
  className,
  ariaLabel = 'Eswick mascot',
}: Props) => {
  const reduced = useReducedMotion();
  const [SvgIcon, setSvgIcon] = useState<SvgComponent | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // import.meta.glob maneja la ausencia del archivo sin romper el build.
    // Si ghost.svg no existe, ghostModules será un objeto vacío.
    const ghostModules = import.meta.glob<{ default: SvgComponent }>(
      '/src/assets/brand/ghost.svg',
      { query: '?react' }
    );

    const loader = Object.values(ghostModules)[0];

    if (loader) {
      loader()
        .then((mod) => {
          setSvgIcon(() => mod.default);
        })
        .catch(() => {
          // eslint-disable-next-line no-console
          console.warn(
            '[Ghost] Error cargando ghost.svg. Renderizando placeholder.'
          );
        })
        .finally(() => setChecked(true));
    } else {
      // eslint-disable-next-line no-console
      console.warn(
        '[Ghost] No se encontró src/assets/brand/ghost.svg. ' +
        'Renderizando placeholder. Sube el archivo y refresca.'
      );
      setChecked(true);
    }
  }, []);

  const px = typeof size === 'number' ? size : GHOST_SIZES[size];
  const effectiveAnimation = reduced ? 'none' : animation;

  // Mientras verifica si el SVG existe, muestra placeholder para evitar flash
  if (!checked || !SvgIcon) {
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
      <SvgIcon width={px} height={px} aria-hidden="true" />
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
