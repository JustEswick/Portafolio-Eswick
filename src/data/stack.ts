/**
 * Stack tecnológico organizado por categorías.
 * Usado en la sección "Stack & What I Do".
 */

export type StackCategory =
  | 'languages'
  | 'ai-ml'
  | 'ai-tools'
  | 'data'
  | 'web'
  | 'devops'
  | 'other';

export type StackItem = {
  id: string;
  name: string;
  category: StackCategory;
  /** Nivel de competencia */
  level: 'expert' | 'advanced' | 'intermediate';
  /** URL al logo o icono (para LogoLoop futuro). null = usar placeholder */
  logoUrl: string | null;
  /** Si se muestra en el carrusel principal del hero/stack */
  showInCarousel: boolean;
};

export const STACK: StackItem[] = [
  // ── Lenguajes ──
  { id: 'python', name: 'Python', category: 'languages', level: 'expert', logoUrl: 'https://cdn.simpleicons.org/python/00FF94', showInCarousel: true },
  { id: 'typescript', name: 'TypeScript', category: 'languages', level: 'advanced', logoUrl: 'https://cdn.simpleicons.org/typescript/00FF94', showInCarousel: true },
  { id: 'javascript', name: 'JavaScript', category: 'languages', level: 'advanced', logoUrl: 'https://cdn.simpleicons.org/javascript/00FF94', showInCarousel: true },
  { id: 'sql', name: 'SQL', category: 'languages', level: 'advanced', logoUrl: 'https://cdn.simpleicons.org/postgresql/00FF94', showInCarousel: false },
  { id: 'cpp', name: 'C++', category: 'languages', level: 'intermediate', logoUrl: 'https://cdn.simpleicons.org/cplusplus/00FF94', showInCarousel: false },

  // ── AI / ML ──
  { id: 'scikit-learn', name: 'Scikit-learn', category: 'ai-ml', level: 'expert', logoUrl: 'https://cdn.simpleicons.org/scikitlearn/00FF94', showInCarousel: true },
  { id: 'pytorch', name: 'PyTorch', category: 'ai-ml', level: 'intermediate', logoUrl: 'https://cdn.simpleicons.org/pytorch/00FF94', showInCarousel: true },
  { id: 'langchain', name: 'LangChain', category: 'ai-ml', level: 'advanced', logoUrl: 'https://cdn.simpleicons.org/langchain/00FF94', showInCarousel: true },
  { id: 'rag', name: 'RAG', category: 'ai-ml', level: 'advanced', logoUrl: null, showInCarousel: true },

  // ── AI Tools ──
  { id: 'claude', name: 'Claude', category: 'ai-tools', level: 'expert', logoUrl: 'https://cdn.simpleicons.org/anthropic/00FF94', showInCarousel: true },
  { id: 'ollama', name: 'Ollama', category: 'ai-tools', level: 'advanced', logoUrl: 'https://cdn.simpleicons.org/ollama/00FF94', showInCarousel: true },
  { id: 'mcp', name: 'MCP', category: 'ai-tools', level: 'advanced', logoUrl: 'https://cdn.simpleicons.org/anthropic/00FF94', showInCarousel: true },
  { id: 'notebooklm', name: 'NotebookLM', category: 'ai-tools', level: 'expert', logoUrl: 'https://cdn.simpleicons.org/google/00FF94', showInCarousel: true },
  { id: 'google-ai-studio', name: 'Google AI Studio', category: 'ai-tools', level: 'advanced', logoUrl: 'https://cdn.simpleicons.org/google/00FF94', showInCarousel: true },

  // ── Data ──
  { id: 'pandas', name: 'Pandas', category: 'data', level: 'expert', logoUrl: 'https://cdn.simpleicons.org/pandas/00FF94', showInCarousel: true },
  { id: 'numpy', name: 'NumPy', category: 'data', level: 'expert', logoUrl: 'https://cdn.simpleicons.org/numpy/00FF94', showInCarousel: false },
  { id: 'matplotlib', name: 'Matplotlib', category: 'data', level: 'advanced', logoUrl: 'https://cdn.simpleicons.org/python/00FF94', showInCarousel: false },
  { id: 'seaborn', name: 'Seaborn', category: 'data', level: 'advanced', logoUrl: 'https://cdn.simpleicons.org/python/00FF94', showInCarousel: false },

  // ── Web ──
  { id: 'react', name: 'React', category: 'web', level: 'advanced', logoUrl: 'https://cdn.simpleicons.org/react/00FF94', showInCarousel: true },
  { id: 'vite', name: 'Vite', category: 'web', level: 'advanced', logoUrl: 'https://cdn.simpleicons.org/vite/00FF94', showInCarousel: false },
  { id: 'tailwindcss', name: 'Tailwind CSS', category: 'web', level: 'advanced', logoUrl: 'https://cdn.simpleicons.org/tailwindcss/00FF94', showInCarousel: false },
  { id: 'fastapi', name: 'FastAPI', category: 'web', level: 'advanced', logoUrl: 'https://cdn.simpleicons.org/fastapi/00FF94', showInCarousel: false },

  // ── DevOps / Infra ──
  { id: 'git', name: 'Git', category: 'devops', level: 'advanced', logoUrl: 'https://cdn.simpleicons.org/git/00FF94', showInCarousel: false },
  { id: 'docker', name: 'Docker', category: 'devops', level: 'intermediate', logoUrl: 'https://cdn.simpleicons.org/docker/00FF94', showInCarousel: false },
  { id: 'github-actions', name: 'GitHub Actions', category: 'devops', level: 'intermediate', logoUrl: 'https://cdn.simpleicons.org/githubactions/00FF94', showInCarousel: false },
];

/**
 * Categorías con labels bilingües para la UI.
 */
export const STACK_CATEGORIES: Record<StackCategory, { es: string; en: string }> = {
  languages: { es: 'Lenguajes', en: 'Languages' },
  'ai-ml': { es: 'AI / Machine Learning', en: 'AI / Machine Learning' },
  'ai-tools': { es: 'Herramientas de IA', en: 'AI Tools' },
  data: { es: 'Datos', en: 'Data' },
  web: { es: 'Web', en: 'Web' },
  devops: { es: 'DevOps', en: 'DevOps' },
  other: { es: 'Otros', en: 'Other' },
};

/**
 * Roles/facetas para las "What I Do" cards.
 */
export type WhatIDo = {
  id: string;
  title: { es: string; en: string };
  description: { es: string; en: string };
  bullets: { es: string[]; en: string[] };
  icon: string;
};

export const WHAT_I_DO: WhatIDo[] = [
  {
    id: 'ai-engineering',
    title: {
      es: 'AI Engineering',
      en: 'AI Engineering',
    },
    description: {
      es: 'Diseño e implementación de sistemas de IA para problemas reales',
      en: 'Design and implementation of AI systems for real-world problems',
    },
    bullets: {
      es: [
        'Modelos predictivos con Scikit-learn y PyTorch',
        'Pipelines RAG con LangChain y embeddings',
        'Agentes autónomos con MCP y Claude',
      ],
      en: [
        'Predictive models with Scikit-learn and PyTorch',
        'RAG pipelines with LangChain and embeddings',
        'Autonomous agents with MCP and Claude',
      ],
    },
    icon: 'Brain',
  },
  {
    id: 'solutions-architecture',
    title: {
      es: 'Solutions Architecture',
      en: 'Solutions Architecture',
    },
    description: {
      es: 'Arquitectura de sistemas escalables con componentes de IA',
      en: 'Architecture of scalable systems with AI components',
    },
    bullets: {
      es: [
        'Diseño de APIs y microservicios con FastAPI',
        'Integración de modelos en producción',
        'Documentación técnica y diagramas de arquitectura',
      ],
      en: [
        'API and microservice design with FastAPI',
        'Model integration in production',
        'Technical documentation and architecture diagrams',
      ],
    },
    icon: 'Network',
  },
  {
    id: 'content-creation',
    title: {
      es: 'Creator',
      en: 'Creator',
    },
    description: {
      es: 'Contenido educativo de IA, matemáticas y programación',
      en: 'Educational content about AI, math and programming',
    },
    bullets: {
      es: [
        'Videos educativos en YouTube y TikTok',
        'Streams en vivo de programación en Twitch',
        'Divulgación de IA para audiencia hispanohablante',
      ],
      en: [
        'Educational videos on YouTube and TikTok',
        'Live coding streams on Twitch',
        'AI outreach for Spanish-speaking audiences',
      ],
    },
    icon: 'Video',
  },
];
