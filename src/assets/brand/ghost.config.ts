export const GHOST_SIZES = {
  favicon: 32,
  nav: 32,
  inline: 48,
  card: 80,
  section: 120,
  hero: 400,
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
