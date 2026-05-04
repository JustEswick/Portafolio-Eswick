/**
 * Links centrales del portfolio.
 * Usados en la sección "Link Tree" y el footer.
 * Cada link tiene etiquetas bilingües y metadata de la plataforma.
 */

export type PlatformLink = {
  id: string;
  platform: string;
  url: string;
  label: { es: string; en: string };
  description: { es: string; en: string };
  /** Icono de Lucide (proxy) o futuro Simple Icons */
  icon: string;
  /** Si es link externo abre en nueva pestaña */
  external: boolean;
};

export const LINKS: PlatformLink[] = [
  {
    id: 'github',
    platform: 'GitHub',
    url: 'https://github.com/isaacscamacho',
    label: { es: 'GitHub', en: 'GitHub' },
    description: {
      es: 'Código abierto y proyectos personales',
      en: 'Open source and personal projects',
    },
    icon: 'Code',
    external: true,
  },
  {
    id: 'linkedin',
    platform: 'LinkedIn',
    url: 'https://www.linkedin.com/in/isaacscamacho/',
    label: { es: 'LinkedIn', en: 'LinkedIn' },
    description: {
      es: 'Perfil profesional y red de contactos',
      en: 'Professional profile and network',
    },
    icon: 'Briefcase',
    external: true,
  },
  {
    id: 'tiktok',
    platform: 'TikTok',
    url: 'https://www.tiktok.com/@eswicke',
    label: { es: 'TikTok', en: 'TikTok' },
    description: {
      es: 'Contenido educativo corto de IA y programación',
      en: 'Short-form AI & programming educational content',
    },
    icon: 'Music2',
    external: true,
  },
  {
    id: 'youtube',
    platform: 'YouTube',
    url: 'https://www.youtube.com/@Eswick',
    label: { es: 'YouTube', en: 'YouTube' },
    description: {
      es: 'Tutoriales de IA, matemáticas y tecnología',
      en: 'AI, math and tech tutorials',
    },
    icon: 'Play',
    external: true,
  },
  {
    id: 'twitch',
    platform: 'Twitch',
    url: 'https://www.twitch.tv/eswick_',
    label: { es: 'Twitch', en: 'Twitch' },
    description: {
      es: 'Streams en vivo de programación y proyectos',
      en: 'Live coding and project streams',
    },
    icon: 'Gamepad2',
    external: true,
  },
  {
    id: 'mit-portfolio',
    platform: 'MIT IDSS',
    url: 'https://www.mygreatlearning.com/eportfolio/isaac-s-nchez-camacho',
    label: { es: 'Portafolio MIT', en: 'MIT Portfolio' },
    description: {
      es: 'E-portfolio del programa MIT IDSS Data Science',
      en: 'E-portfolio for MIT IDSS Data Science program',
    },
    icon: 'GraduationCap',
    external: true,
  },
  {
    id: 'email',
    platform: 'Email',
    url: 'mailto:isaacscreal@gmail.com',
    label: { es: 'Correo', en: 'Email' },
    description: {
      es: 'Contacto directo para oportunidades y colaboraciones',
      en: 'Direct contact for opportunities and collaborations',
    },
    icon: 'Mail',
    external: false,
  },
];
