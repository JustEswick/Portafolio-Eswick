/**
 * Certificaciones y formación relevante.
 * Ordenadas por relevancia (MIT primero).
 */

export type CertificationStatus = "completed" | "in-progress";

export type Certification = {
  id: string;
  title: { es: string; en: string };
  institution: string;
  // URL al certificado o portfolio (si es público)
  url: string | null;
  // YYYY-MM
  date: string;
  status: CertificationStatus;
  description: { es: string; en: string };
  // Skills o temas cubiertos
  skills: string[];
  // Si se muestra destacada
  featured: boolean;
};

export const CERTIFICATIONS: Certification[] = [
  {
    id: "mit-idss-dsml",
    title: {
      es: "Data Science and Machine Learning: Making Data-Driven Decisions",
      en: "Data Science and Machine Learning: Making Data-Driven Decisions",
    },
    institution: "MIT Schwarzman College of Computing",
    url: "https://www.mygreatlearning.com/certificate/BAYIYCML",
    date: "2024-04",
    status: "completed",
    description: {
      es: "Programa profesional del MIT enfocado en ciencia de datos, machine learning y toma de decisiones basada en datos. Incluye proyectos aplicados con datos reales.",
      en: "MIT professional program focused on data science, machine learning and data-driven decision making. Includes applied projects with real-world data.",
    },
    skills: [
      "Machine Learning",
      "Statistical Analysis",
      "Python",
      "Pandas",
      "Scikit-learn",
      "Data Visualization",
      "Regression",
      "Classification",
      "Clustering",
      "Recommendation Systems",
    ],
    featured: true,
  },

  {
    id: "uaemex-ai-engineering",
    title: {
      es: "Ingeniería en Inteligencia Artificial",
      en: "AI Engineering Degree",
    },
    institution: "Universidad Autónoma del Estado de México (UAEMéx)",
    url: null,
    date: "2026", // Fecha esperada de graduación
    status: "in-progress",
    description: {
      es: "Licenciatura en Ingeniería en Inteligencia Artificial con enfoque en redes neuronales, procesamiento de lenguaje natural y sistemas distribuidos.",
      en: "Bachelor's degree in AI Engineering focused on neural networks, natural language processing and distributed systems.",
    },
    skills: [
      "Neural Networks",
      "NLP",
      "Computer Vision",
      "Distributed Systems",
      "Mathematics",
      "Statistics",
      "Python",
      "C++",
    ],
    featured: true,
  },

  {
    id: "anthropic-claude-code",
    title: {
      es: "Claude Code in Action",
      en: "Claude Code in Action",
    },
    institution: "Anthropic",
    url: "https://verify.skilljar.com/c/pu4za7mxfuxi",
    date: "2026-01", // Issued: Jan. 29, 2026
    status: "completed",
    description: {
      es: "Certificación en desarrollo de aplicaciones con Claude, prompt engineering avanzado, y uso de herramientas MCP para integración de IA.",
      en: "Certification in application development with Claude, advanced prompt engineering, and MCP tools for AI integration.",
    },
    skills: ["Claude", "Prompt Engineering", "MCP", "RAG", "AI Agents", "TypeScript"],
    featured: true,
  },

  {
    id: "anthropic-claude-101",
    title: {
      es: "Certificate of Completion: Claude 101",
      en: "Certificate of Completion: Claude 101",
    },
    institution: "Anthropic",
    url: "https://verify.skilljar.com/c/8z2opqr9ymea",
    date: "2026-03", // Expedición: mar. 2026
    status: "completed",
    description: {
      es: "Certificado de finalización del curso introductorio Claude 101 de Anthropic, cubriendo fundamentos de uso, prompting y capacidades del modelo Claude.",
      en: "Completion certificate for Anthropic's Claude 101 introductory course, covering fundamentals of usage, prompting and Claude model capabilities.",
    },
    skills: ["Claude", "Prompt Engineering", "LLMs"],
    featured: false,
  },

  {
    id: "ai-course",
    title: {
      es: "Curso de Iniciación al Desarrollo con IA",
      en: "Introduction to AI Development Course",
    },
    institution: "BIG school",
    url: null,
    date: "2026-01", // Expedición: ene. 2026
    status: "completed",
    description: {
      es: "Curso introductorio al desarrollo de software con inteligencia artificial, cubriendo fundamentos de IA generativa, uso de modelos de lenguaje y aplicación práctica en desarrollo.",
      en: "Introductory course on software development with artificial intelligence, covering generative AI fundamentals, language model usage and practical application in development.",
    },
    skills: ["AI", "Generative AI", "LLMs", "Machine Learning"],
    featured: false,
  },
];
