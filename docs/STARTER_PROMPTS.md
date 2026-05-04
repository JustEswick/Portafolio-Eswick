# Prompts de arranque por fase

Pega cada uno cuando estés listo para iniciar la fase correspondiente. Antigravity en Planning mode, agente con acceso al workspace.

---

## 🚀 Prompt inicial (primera vez que abras el workspace)

```
Hola. Antes de hacer nada, lee TODOS los archivos en .agents/rules/ y .agents/workflows/, y luego docs/IMPLEMENTATION_PLAN.md, docs/COMPONENTS_GHOST.md, docs/BRAND_ASSETS_README.md y docs/ASCII_VIDEO_GUIDE.md.

Después confírmame en español que entendiste:
1. Qué construimos y para quién.
2. El stack obligatorio.
3. Los 3 tokens de color principales del sistema de diseño.
4. Cómo funciona el sistema de Brand Assets (logo placeholder + reemplazo futuro).
5. Cómo trabajamos juntos (idioma, modo, aprobaciones).
6. Cuál es la Fase 1 y qué entregable tiene.

NO toques código todavía. Solo confirma comprensión y propón plan de Fase 1.
```

---

## Fase 1 — Setup técnico

```
Procede con la Fase 1 (Setup técnico) del Implementation Plan.

Antes de instalar cualquier dependencia más allá de las del template Vite, lístame qué vas a instalar y por qué. Espera aprobación.

Incluye obligatoriamente vite-plugin-svgr para que el componente <Ghost> pueda importar SVG como componente React.

Crea el componente <Ghost> con el placeholder fail-safe (código en docs/COMPONENTS_GHOST.md). Verifica que el sitio NO se rompa cuando ghost.svg no existe — debe mostrar el círculo punteado con texto "LOGO".

Copia docs/BRAND_ASSETS_README.md a src/assets/brand/README.md para que cuando yo abra esa carpeta vea las instrucciones.

El criterio de "hecho" es: `npm run dev` corre, muestra:
- "Hola Eswick" en JetBrains Mono, fondo #0A0A0F, texto #F5F5F7.
- Placeholder del ghost (círculo punteado) renderizado al lado del texto.
- Botón temporal cambia idioma a "Hello Eswick".
- Console muestra warning esperado de "ghost.svg no encontrado" sin más errores.
```

---

## Fase 2 — Layout y navegación

```
Procede con Fase 2: Layout y navegación.

Quiero ver primero un wireframe textual (ASCII art o lista anidada) del header, footer y skip-link antes de implementar. No uses Reactbits aún — solo HTML semántico + Tailwind.

Foco en accesibilidad: skip-to-content debe funcionar al tabular desde 0, navbar navegable con teclado, toggle ES/EN funcional con react-i18next.
```

---

## Fase 3 — Datos

```
Procede con Fase 3: Datos.

Crea los 4 archivos en src/data/. El contenido lo saco de:
- LinkedIn: https://www.linkedin.com/in/isaacscamacho/
- TikTok: https://www.tiktok.com/@eswicke
- YouTube: https://www.youtube.com/@Eswick
- MIT portfolio: https://www.mygreatlearning.com/eportfolio/isaac-s-nchez-camacho

Si te falta info de algún proyecto (OPDAPAS, 4GUARD, THEMIS), déjame placeholders claros (// TODO: Isaac) y yo los lleno. Tipa todo fuerte y deja todo bilingüe.
```

---

## Fase 4 — Hero

```
Procede con Fase 4: Hero.

Antes de instalar Silk y Liquid Chrome de Reactbits:
1. Muéstrame el comando exacto y dime qué dependencias jala cada uno.
2. Implementa primero el ghost SVG inline animado (sin Reactbits) y muéstrame el resultado.
3. Luego instala UNO de los dos backgrounds, intégralo, y mostrame.
4. Después el otro en una rama temporal o feature flag, comparamos y elijo.

prefers-reduced-motion debe quedar perfecto.
```

---

## Fase 5 — Stack & What I Do

```
Procede con Fase 5.

Para el LogoLoop necesitas iconos. Usa simple-icons (npm: simple-icons) o react-icons. Justifícame cuál antes de instalar.

Las 3 cards: el contenido lo saco yo, tú deja los textos como i18n keys con valores placeholder.
```

---

## Fase 6 — Proyectos

```
Procede con Fase 6: Proyectos.

Implementa SpotlightCard primero. Pruébalo con los 4 proyectos. Si no me convence, probamos TiltedCard en una segunda iteración.

OPDAPAS va primero. Marca el proyecto destacado con un badge "Featured" usando accent-pink (sutil).
```

---

## Fase 7 — Educación

```
Procede con Fase 7: Educación & Certificaciones.

Timeline vertical en mobile, horizontal en desktop ≥ 1024px. Sin Reactbits — esto lo hacemos custom con Tailwind + Framer Motion. Mantenlo sobrio.
```

---

## Fase 8 — Creator

```
Procede con Fase 8: Sección Creator.

Embeds de YouTube y TikTok con lazy load (no carguen iframe hasta scroll cercano). Considera react-lite-youtube-embed para perf.

Esta sección puede tener un toque visual distinto (border pixelado, fuente VT323 en algún detalle) para diferenciarla del resto sin romper coherencia.

En el espacio donde irá el video ASCII (Fase 8.5 futura), por ahora coloca <Ghost size="ascii" animation="glow" /> como fallback. Cuando suba el video MP4 lo reemplazaremos por <AsciiGhostVideo>.
```

---

## Fase 8.5 — Video ASCII (post-MVP, opcional)

```
Procede con Fase 8.5: integración del video ASCII del ghost.

Ya subí los archivos:
- src/assets/brand/ghost-ascii.mp4
- src/assets/brand/ghost-ascii-poster.png

Sigue exactamente el flujo de docs/ASCII_VIDEO_GUIDE.md:
1. Crea el componente <AsciiGhostVideo> con lazy load por IntersectionObserver.
2. Respeta prefers-reduced-motion (mostrar solo poster).
3. Reemplaza el <Ghost> fallback en la sección Creator por <AsciiGhostVideo>.
4. Verifica que no degrade el LCP del hero.
5. Implementa también el easter egg de console.log con ASCII art (ver guía).

Reporta el peso final del video, el LCP antes y después, y comparte screenshot.
```

---

## Fase 9 — Link Tree (Dock)

```
Procede con Fase 9: Link Tree.

Instala Dock de Reactbits. Iconos: usa simple-icons para LinkedIn, GitHub, TikTok, YouTube, Twitch. Email con Lucide (Mail).

Cada item con tooltip + aria-label correcto.
```

---

## Fase 10 — SEO + assets

```
Procede con Fase 10: SEO + meta + assets.

Para la OG image (1200x630): genera un SVG con el ghost grande, mi nombre, headline, fondo #0A0A0F, accent verde. Conviértelo a PNG con un script (sharp o similar) en build time, o entrégalo como SVG si el navegador lo soporta para OG.

JSON-LD Person schema completo con sameAs apuntando a todos mis perfiles.
```

---

## Fase 11 — QA y despliegue

```
Procede con Fase 11: QA y despliegue.

Antes de push:
1. Corre `npm run build` y comparte el output.
2. Corre `npx lighthouse http://localhost:4173 --view` y comparte scores.
3. Corre axe DevTools mental check.

Después:
1. Crea el repo (yo lo hago en GitHub UI, tú dame el comando exacto de `git remote add`).
2. Push a main.
3. Verifica el deploy y dime la URL final.
```

---

## Prompts de utilidad (úsalos cuando los necesites)

### Revisión de accesibilidad
```
Revisa la sección X contra .agents/rules/30-accessibility-and-perf.md. Lista cada checkbox con ✅ o ❌ y razón. No corrijas todavía, solo audita.
```

### Refactor
```
Antes de refactorizar, dime qué archivos vas a tocar, qué cambios harás, y por qué. Espera aprobación.
```

### Bug
```
Reproduce el bug paso a paso. Identifica la causa raíz. Propón 2 soluciones (mínima invasiva vs. refactor mayor). Espera que elija.
```
