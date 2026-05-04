/**
 * Proyectos destacados del portfolio.
 * Orden: más relevante primero (OPDAPAS).
 */

export type ProjectStatus = "production" | "in-progress" | "completed" | "hackathon";

export type Project = {
  id: string;
  title: string;
  subtitle: { es: string; en: string };
  description: { es: string; en: string };
  role: { es: string; en: string };
  impact: { es: string; en: string };
  stack: string[];
  status: ProjectStatus;
  // URL al repo, demo o caso de estudio (null si es privado)
  url: string | null;
  // Fecha de inicio YYYY-MM
  startDate: string;
  // Fecha de fin YYYY-MM o "present"
  endDate: string;
  // Si se muestra como proyecto destacado
  featured: boolean;
};

export const PROJECTS: Project[] = [
  {
    id: "opdapas",
    title: "OPDAPAS",
    subtitle: {
      es: "Sistema integral de cobranza para organismo de agua",
      en: "Integrated billing system for water utility",
    },
    description: {
      es: "Plataforma de gestión integral para el organismo de agua OPDAPAS Metepec. Incluye análisis de negocio, documentación técnica y funcional, prototipado del sistema de cobranza, validación con stakeholders y presentaciones ejecutivas. Implementación real en un organismo público descentralizado.",
      en: "Comprehensive management platform for OPDAPAS Metepec water utility. Includes business analysis, technical and functional documentation, billing system prototyping, stakeholder validation, and executive presentations. Real-world implementation in a decentralized public agency.",
    },
    role: {
      es: "AI Engineer & Solutions Architect — Análisis de negocio, documentación técnica, prototipado y presentaciones ejecutivas con clientes",
      en: "AI Engineer & Solutions Architect — Business analysis, technical documentation, prototyping and executive client presentations",
    },
    impact: {
      es: "Primer prototipo funcional de sistema integral de cobranza entregado a un organismo público. Participación como expositor en conferencia de IA en el Tecnológico Nacional de México campus Toluca.",
      en: "First functional prototype of integrated billing system delivered to a public agency. Speaker at AI conference at Tecnológico Nacional de México Toluca campus.",
    },
    stack: [
      "Python",
      "FastAPI",
      "Pandas",
      "NumPy",
      "Scrum",
      "Google Workspace",
      "Jira",
      "NotebookLM",
      "MCP",
    ],
    status: "in-progress",
    url: null,
    startDate: "2026-02",
    endDate: "present",
    featured: true,
  },

  {
    id: "4guard",
    title: "4GUARD",
    subtitle: {
      es: "Sistema inteligente de seguridad con agentes de IA",
      en: "Intelligent security system with AI agents",
    },
    description: {
      es: "Solución de optimización de procesos operativos para la empresa 4GUARD, desarrollada mediante orquestación de agentes de IA con arquitecturas de skills y tools. Prototipada con desarrollo spec-driven apoyado en MCP para estructurar requisitos, diseño y código de forma sistemática. Optimización del consumo de tokens y llamadas a APIs de modelos avanzados como MiniMax 2.5.",
      en: "Operational process optimization solution for 4GUARD, developed through AI agent orchestration with skills and tools architectures. Prototyped using spec-driven development backed by MCP to systematically structure requirements, design and code. Optimization of token consumption and API calls for advanced models like MiniMax 2.5.",
    },
    role: {
      es: "AI Engineer — Diseño de arquitectura de agentes, desarrollo spec-driven, optimización de tokens y prototipado de solución",
      en: "AI Engineer — Agent architecture design, spec-driven development, token optimization and solution prototyping",
    },
    impact: {
      es: "Prototipo funcional de optimización de procesos operativos entregado al cliente, usando agentes de IA con modelos avanzados como MiniMax 2.5 con balance óptimo entre costo y desempeño.",
      en: "Functional prototype for operational process optimization delivered to client, using AI agents with advanced models like MiniMax 2.5 with optimal cost-performance balance.",
    },
    stack: [
      "Python",
      "TypeScript",
      "Claude",
      "OpenClaw",
      "Ollama",
      "MiniMax 2.5",
      "MCP",
    ],
    status: "in-progress",
    url: null,
    startDate: "2026-02",
    endDate: "present",
    featured: true,
  },

  {
    id: "themis",
    title: "THEMIS by Nexus 360",
    subtitle: {
      es: "Arquitectura de soluciones de IA aplicadas",
      en: "Applied AI solutions architecture",
    },
    description: {
      es: "Proyecto de consultoría e ingeniería de IA dentro de THEMIS by Nexus 360. Abarca investigación automatizada con la API de Perplexity, configuración de sistemas RAG con NotebookLM vía MCP, infraestructura distribuida de alta disponibilidad para modelos de IA locales, y arquitectura de agentes con Claude, OpenClaw y Ollama.",
      en: "AI consulting and engineering project within THEMIS by Nexus 360. Covers automated research with Perplexity API, RAG systems with NotebookLM via MCP, high-availability distributed infrastructure for local AI models, and agent architecture with Claude, OpenClaw and Ollama.",
    },
    role: {
      es: "Solutions Architect — Diseño e implementación de arquitectura de IA, investigación automatizada, infraestructura distribuida y orquestación de agentes",
      en: "Solutions Architect — AI architecture design and implementation, automated research, distributed infrastructure and agent orchestration",
    },
    impact: {
      es: "Infraestructura interna para modelos de IA locales con alta disponibilidad y flujo eficiente de datos. Flujos de investigación automatizada que enriquecen reportes estratégicos con fuentes académicas y de negocio. Repositorios de conocimiento RAG consultados por agentes de IA en tiempo real.",
      en: "Internal infrastructure for local AI models with high availability and efficient data flow. Automated research pipelines that enrich strategic reports with academic and business sources. RAG knowledge repositories queried by AI agents in real time.",
    },
    stack: [
      "Python",
      "Claude",
      "RAG",
      "MCP",
      "Perplexity API",
      "NotebookLM",
      "Google AI Studio",
      "Google Stitch",
      "Ollama",
      "OpenClaw",
      "Google Workspace",
      "Jira",
    ],
    status: "in-progress",
    url: null,
    startDate: "2026-01",
    endDate: "present",
    featured: true,
  },

  {
    id: "talent-land-2026",
    title: "Hackathon Talent Land 2026",
    subtitle: {
      es: "Hackathon Genius Arena · Capital One · Talent Land México",
      en: "Genius Arena Hackathon · Capital One · Talent Land México",
    },
    description: {
      es: "Participación en el Hackathon Genius Arena de Talent Land México 2026, patrocinado por Capital One. Durante tres días se diseñaron e implementaron soluciones tecnológicas con impacto real bajo presión de tiempo, integrando desarrollo de software, innovación y pensamiento crítico en un entorno altamente competitivo.",
      en: "Participation in the Genius Arena Hackathon at Talent Land México 2026, sponsored by Capital One. Over three days, real-impact tech solutions were designed and implemented under time pressure, integrating software development, innovation and critical thinking in a highly competitive environment.",
    },
    role: {
      es: "Desarrollador e innovador — Diseño e implementación de solución tecnológica en entorno contrarreloj de 3 días",
      en: "Developer & Innovator — Design and implementation of tech solution in a 3-day time-pressured environment",
    },
    impact: {
      es: "Experiencia intensiva de hackathon con desarrollo de soluciones tecnológicas reales. Networking con referentes del sector tech en México.",
      en: "Intensive hackathon experience with real-world tech solution development. Networking with key tech industry figures in Mexico.",
    },
    stack: ["Python", "AI"],
    status: "hackathon",
    url: null,
    startDate: "2026-04",
    endDate: "2026-04",
    featured: false,
  },
];