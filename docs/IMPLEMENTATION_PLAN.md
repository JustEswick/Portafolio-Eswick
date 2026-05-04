# Implementation Plan — Portfolio + Link Tree (Eswick)

> **Cómo usar este documento**: pégalo como primer mensaje al agente de Antigravity en Planning mode. Él generará su propio plan de tareas a partir de aquí. Aprobar fase por fase.

## Visión general

Sitio personal de **Isaac Sánchez Camacho** (handle creator: **@eswick**) que combina **portafolio profesional de AI/Solutions Architecture** con **link tree de creator**. Hospedado en GitHub Pages, bilingüe ES/EN, dark mode, identidad "Neural Brutalism".

Lee primero estos archivos antes de empezar:
- `.agents/rules/00-project-context.md`
- `.agents/rules/10-code-style.md`
- `.agents/rules/20-design-system.md`
- `.agents/rules/30-accessibility-and-perf.md`
- `.agents/rules/40-deployment.md`
- `.agents/rules/50-brand-assets.md`

Docs de referencia adicionales:
- `docs/DESIGN_TOKENS.md` — Tailwind config + globals.css listos para copiar.
- `docs/COMPONENTS_GHOST.md` — Código del componente `<Ghost>` con placeholder.
- `docs/BRAND_ASSETS_README.md` — Va dentro de `src/assets/brand/README.md` para Isaac.
- `docs/ASCII_VIDEO_GUIDE.md` — Pipeline para Fase 8.5.

## Stack
Vite + React 18 + TypeScript strict + Tailwind CSS + Reactbits (variante TS-TW) + Framer Motion + react-i18next + Lucide.

## Arquitectura de carpetas
```
src/
├── components/{reactbits,ui}/
├── sections/{Hero,Stack,Projects,Education,Creator,LinkTree,Footer}.tsx
├── layouts/RootLayout.tsx
├── data/{links,projects,certifications,stack}.ts
├── hooks/{useReducedMotion,useTheme,useLocale}.ts
├── lib/{cn,utils}.ts
├── styles/globals.css
├── i18n/{index.ts,locales/{es,en}.json}
├── types/index.ts
└── App.tsx
```

## Fases

### Fase 1 — Setup técnico (1 sesión)
1. `npm create vite@latest . -- --template react-ts`
2. Instalar Tailwind, configurar `tailwind.config.ts` con los tokens de `20-design-system.md`.
3. Configurar path alias `@/` en `vite.config.ts` y `tsconfig.json`.
4. Instalar `framer-motion`, `lucide-react`, `clsx`, `tailwind-merge`, `react-i18next`, `i18next`, `i18next-browser-languagedetector`, `vite-plugin-svgr`.
5. Configurar ESLint + Prettier con reglas estrictas.
6. Crear `src/styles/globals.css` con `@tailwind` directives, custom properties para tokens, scrollbar custom, keyframes del ghost.
7. Crear `src/lib/cn.ts` (clsx + tailwind-merge).
8. Crear estructura de carpetas vacía + `src/assets/brand/` con README copiado de `docs/BRAND_ASSETS_README.md`.
9. Crear `src/assets/brand/ghost.config.ts` (de `docs/COMPONENTS_GHOST.md`).
10. Crear `src/components/brand/Ghost.tsx` con placeholder fail-safe (de `docs/COMPONENTS_GHOST.md`). El componente debe funcionar SIN que `ghost.svg` exista — muestra placeholder "LOGO" con borde punteado.
11. Setup i18n básico con strings de prueba.
12. Smoke test: `npm run dev` muestra "Hola Eswick" + el placeholder del ghost. Sin errores en consola más allá del warn esperado de "ghost.svg no encontrado".

**Entregable**: app vacía corriendo con sistema de diseño, i18n y placeholder del logo. Isaac puede subir `ghost.svg` cuando quiera y el sitio se actualiza solo.

### Fase 2 — Layout y navegación (1 sesión)
1. `RootLayout.tsx` con `<header>`, `<main>`, `<footer>`, skip-to-content link.
2. Navbar minimal: logo ghost (placeholder SVG), nav anchors, toggle ES/EN, toggle theme (preparado, sin implementar light mode aún).
3. Footer con: copyright, version tag, easter egg pixel ghost, mini link tree.
4. Smooth scroll entre anchors.
5. Responsive (mobile-first).

**Entregable**: shell completo navegable, sin contenido aún.

### Fase 3 — Datos y contenido (0.5 sesiones)
Crear todos los archivos en `src/data/`:
- `links.ts`: LinkedIn, GitHub, TikTok, YouTube, Twitch, MIT portfolio, Email.
- `projects.ts`: OPDAPAS Metepec, 4GUARD, THEMIS by Nexus 360, hackathon Talent Land 2026.
- `certifications.ts`: MIT IDSS Data Science, Anthropic Claude Code, Curso IA, UAEMéx AI Engineering.
- `stack.ts`: Python, TypeScript, Claude, Ollama, RAG, MCP, NotebookLM, Google AI Studio, Pandas, Numpy, Scikit-learn, etc.

Todo bilingüe.

**Entregable**: contenido tipado y traducido listo.

### Fase 4 — Hero (1 sesión)
1. Instalar Aurora **y** Threads de Reactbits, probar ambos en hero, elegir.
2. Instalar SplitText o DecryptedText.
3. Crear ghost mascot SVG inline animado (parpadeo cada 4-6s, flotación sutil).
4. Layout: ghost a la izquierda, texto a la derecha (mobile: ghost arriba).
5. Headline: "Building the future with AI & Neural Networks" (rotativo ES/EN).
6. Subhead corto + 2 CTAs: "Ver proyectos" / "Contáctame".
7. Metadata terminal-style abajo: `v1.0.0 · Toluca, MX · es-MX`.

**Entregable**: hero con animación, accesible, con prefers-reduced-motion respetado.

### Fase 5 — Stack & What I Do (0.5 sesiones)
1. LogoLoop con 12-16 iconos del stack.
2. 3 cards: AI Engineering / Solutions Architecture / Full-Stack Dev.
3. Cada card: icono Lucide, título, 2-3 bullets.

### Fase 6 — Proyectos (1 sesión)
1. SpotlightCard o TiltedCard (probar y elegir).
2. 4 proyectos con: stack, rol, impacto, link.
3. OPDAPAS Metepec destacado primero (proyecto más relevante).

### Fase 7 — Educación & Certificaciones (0.5 sesiones)
1. Timeline vertical en mobile, horizontal en desktop.
2. Logos institucionales (MIT, UAEMéx, Anthropic).

### Fase 8 — Sección Creator (Eswick) (0.5 sesiones)
1. Embeds de YouTube y TikTok (lazy load).
2. Estilo visual ligeramente distinto: hint pixel-art en bordes.
3. CTA: suscríbete / sígueme.
4. **Espacio reservado** para el video ASCII (Fase 8.5). Mientras no exista, mostrar `<Ghost size="ascii" animation="glow" />` como fallback.

### Fase 8.5 — Video ASCII del ghost (opcional, post-MVP)

> Esta fase NO bloquea el deploy inicial. Se hace cuando Isaac tenga el video ASCII pre-renderizado.

Referencia completa: `docs/ASCII_VIDEO_GUIDE.md`.

Resumen del flujo:
1. Isaac genera video corto (3-8s) animando el ghost.
2. Convierte a ASCII usando [ASCII Studio](https://github.com/vansh-nagar/ascii-studio) (web o local).
3. Re-encodea con ffmpeg a `< 2MB`, formato MP4 H.264, sin audio, faststart.
4. Sube a `src/assets/brand/ghost-ascii.mp4` + `ghost-ascii-poster.png`.
5. Crea componente `<AsciiGhostVideo>` (código en la guía).
6. Reemplaza el fallback `<Ghost>` en sección Creator por `<AsciiGhostVideo>`.
7. Verifica:
   - Lazy load (solo carga al entrar al viewport).
   - `prefers-reduced-motion` muestra solo el poster.
   - Funciona en iOS (`playsInline`).
   - Performance: el video no degrada el LCP del hero.

**Entregable**: sección Creator con video ASCII del ghost en loop, optimizado, accesible.

**Easter egg paralelo**: ASCII art del ghost en `console.log` del navegador (ver guía).

### Fase 9 — Link Tree (Dock) (0.5 sesiones)
1. Dock de Reactbits con todos los links sociales.
2. Hover effects.
3. Iconos custom o de Lucide/Simple Icons.

### Fase 10 — SEO + meta + assets (0.5 sesiones)
1. `<title>`, descriptions, OG, Twitter Card.
2. Generar OG image 1200x630 (puede ser diseño con ghost).
3. Favicon (ghost).
4. JSON-LD Person schema.
5. `sitemap.xml`, `robots.txt`.
6. `404.html` para SPA fallback.

### Fase 11 — QA y despliegue (1 sesión)
1. Lighthouse mobile ≥ 95 en las 4 categorías.
2. axe DevTools sin issues críticos.
3. Test en navegadores: Chrome, Firefox, Safari (iOS), Edge.
4. Crear repo en GitHub.
5. Configurar GitHub Action.
6. Push y verificar deploy.

## No hagas

- No instales librerías sin justificación previa.
- No uses `any`.
- No metas estilos fuera de Tailwind.
- No hardcodees strings — todo va por i18n.
- No hagas commits con `WIP` o `test`. Convencionales siempre.
- No animes todo. Máximo 3 efectos visuales activos en pantalla.

## Empieza por

Lee los rules, confirma que entendiste el sistema de diseño (resúmemelo en 5 bullets), y propón un plan de Fase 1. Espera mi aprobación antes de tocar código.
