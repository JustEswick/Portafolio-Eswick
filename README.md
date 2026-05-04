# Portfolio + Link Tree — Eswick

Sitio personal de **Isaac Sánchez Camacho** (`@eswick`).

## Estructura del workspace

```
portfolio-eswick/
├── .agents/
│   ├── rules/                  # Reglas que el agente DEBE seguir
│   │   ├── 00-project-context.md
│   │   ├── 10-code-style.md
│   │   ├── 20-design-system.md
│   │   ├── 30-accessibility-and-perf.md
│   │   ├── 40-deployment.md
│   │   └── 50-brand-assets.md       # Sistema de logo intercambiable
│   └── workflows/              # Procedimientos invocables
│       ├── add-reactbits-component.md
│       ├── new-section.md
│       ├── deploy-pages.md
│       ├── i18n-add-key.md
│       └── update-brand-asset.md    # Reemplazar el logo en el futuro
├── .github/workflows/
│   └── deploy.yml              # GitHub Action de despliegue
├── docs/
│   ├── IMPLEMENTATION_PLAN.md  # Pegar como primer prompt en Antigravity
│   ├── STARTER_PROMPTS.md      # Prompts por fase
│   ├── DESIGN_TOKENS.md        # Tailwind config + globals.css listos
│   ├── COMPONENTS_GHOST.md     # Código del componente <Ghost> con placeholder
│   ├── BRAND_ASSETS_README.md  # Va a src/assets/brand/README.md
│   └── ASCII_VIDEO_GUIDE.md    # Pipeline para Fase 8.5 (video ASCII)
└── README.md
```

## Cómo arrancar en Antigravity

1. **Instalar Antigravity** desde https://antigravity.google/download.
2. **Setup inicial**: Start fresh → tema dark → Review-driven development → instalar comando `agy`.
3. **Abrir esta carpeta como Workspace** (File → Open Folder → `portfolio-eswick/`).
4. **Activar Planning mode** (no Fast) en el panel del agente.
5. **Pegar el "Prompt inicial"** de `docs/STARTER_PROMPTS.md` en el chat.
6. El agente leerá las reglas y te confirmará comprensión. **Aprueba o corrige.**
7. **Avanza fase por fase** pegando el prompt correspondiente cuando estés listo.

## Tu logo y el sistema de placeholder

**No necesitas tener el logo listo para empezar.** El sitio funciona desde el día 1 con un placeholder (círculo punteado con la palabra "LOGO") en cada lugar donde irá el ghost.

Cuando tengas tu logo:
1. Sube `ghost.svg` a `src/assets/brand/ghost.svg`.
2. Refresca el navegador.
3. Listo — todo el sitio se actualiza automáticamente.

Detalles en `docs/BRAND_ASSETS_README.md`.

## Animaciones del fondo y la mascota

- **Fondo del hero**: viene de Reactbits (Aurora o Threads). Se instala con un comando, ya viene animado.
- **Ghost flotando/parpadeando**: CSS keyframes simples definidos en `globals.css`.
- **Stack tech, cards, link tree**: animaciones de Reactbits, instaladas en sus respectivas fases.
- **Video ASCII del ghost**: pre-renderizado, integrado como video MP4 lazy-loaded (Fase 8.5, opcional). Pipeline completo en `docs/ASCII_VIDEO_GUIDE.md`.

Nada de esto se diseña fuera del código — todo es código que el agente integra paso a paso.

## Comandos clave dentro del workspace

```bash
npm run dev        # Dev server en :5173
npm run build      # Build de producción a dist/
npm run preview    # Preview del build en :4173
npm run lint       # ESLint
```

## Despliegue

Push a `main` → GitHub Action corre → sitio en vivo en pocos minutos.

Verifica que en el repo de GitHub:
- **Settings → Pages → Source = GitHub Actions**.
- **Settings → Actions → General → Workflow permissions = Read and write**.
