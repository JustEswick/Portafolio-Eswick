# 📦 Cómo subir tu logo y assets de marca

> Este archivo va al final dentro de tu proyecto en: `src/assets/brand/README.md`
> Sirve como guía para ti (Isaac) cuando tengas el logo listo.

## TL;DR

1. Pon tu archivo en `src/assets/brand/ghost.svg`.
2. Corre `npm run dev`.
3. Verifica que se vea bien en hero, navbar y footer.
4. Commit y push.

## El logo principal: `ghost.svg`

### Requisitos del archivo

- **Formato**: SVG (vectorial). No PNG ni JPG en este slot.
- **Nombre exacto**: `ghost.svg` (minúsculas, sin espacios).
- **viewBox**: debe estar definido. Ej. `viewBox="0 0 200 200"`.
- **Sin `width` ni `height` hardcodeados** en el `<svg>` raíz. Si tu archivo los tiene, bórralos antes de subir.
- **Peso**: idealmente < 10KB. Si pesa más, optimízalo:
  ```bash
  npx svgo src/assets/brand/ghost.svg
  ```
- **Limpio**: sin metadata de Figma/Illustrator (etiquetas `<title>`, `<desc>`, comentarios). `svgo` los quita.

### Para que la animación de parpadeo funcione (opcional)

Si quieres que el ghost parpadee, los ojos deben tener `id` reconocibles. Cualquiera de estos patrones funciona:

**Opción A** — un solo grupo de ojos:
```xml
<g id="eyes">
  <ellipse cx="80" cy="90" .../>
  <ellipse cx="120" cy="90" .../>
</g>
```

**Opción B** — ojos individuales:
```xml
<ellipse id="left-eye" cx="80" cy="90" .../>
<ellipse id="right-eye" cx="120" cy="90" .../>
```

Si tu SVG no los tiene identificados, no pasa nada — el ghost solo flotará (animación `float`), que es perfecto.

## Variantes opcionales

### `ghost-pixel.svg`
Versión pixel-art para el footer y easter eggs. Misma estructura, estilo retro 8-bit. Si no la subes, el footer usará una versión simplificada del ghost principal.

### `ghost-ascii.mp4`
Video ASCII pre-renderizado para la sección Creator. Generado con [ASCII Studio](https://github.com/vansh-nagar/ascii-studio). Ver Fase 8.5 en `docs/IMPLEMENTATION_PLAN.md`.

**Specs del video**:
- Formato: MP4 H.264, audio mudo.
- Resolución: 800x800 mínimo.
- Duración: 3-8 segundos.
- Loopable (último frame ≈ primer frame).
- Peso: < 2MB (comprimir con `ffmpeg -i input.mp4 -crf 28 -preset slow output.mp4`).

### `ghost-ascii-poster.png`
Imagen estática que se muestra **antes** de que el video cargue (lazy load). Captura del primer frame del video ASCII. Mismo tamaño que el video.

## Configuración: `ghost.config.ts`

Si necesitas ajustar tamaños o desactivar animaciones para una versión específica del logo, edita este archivo. El componente `<Ghost>` lo lee automáticamente.

## Mientras no subas el logo

El componente `<Ghost>` tiene un **placeholder inteligente**: muestra un círculo punteado con la palabra "LOGO" y un `console.warn` en dev. El sitio funciona perfectamente sin tu logo, solo se ve incompleto en lugares donde aparece el ghost. Subir el logo es tan simple como soltar el archivo y refrescar.

## Checklist antes de hacer commit del nuevo logo

- [ ] Archivo en la ruta correcta: `src/assets/brand/ghost.svg`.
- [ ] Optimizado con `svgo` (peso < 10KB).
- [ ] Sin `width`/`height` fijos en el `<svg>` raíz.
- [ ] Visualmente correcto en navbar (32px) y hero (240px).
- [ ] Si quieres parpadeo: ojos con IDs reconocibles.
- [ ] Favicon regenerado: `npm run brand:favicon` (si el script existe).
- [ ] OG image regenerada si aplica.
