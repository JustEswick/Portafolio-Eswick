# Guía: Generar el video ASCII del ghost

> Para Fase 8.5 (post-MVP). Se integra como video pre-renderizado, NO se renderiza ASCII en runtime para evitar latencia.

## Por qué video pre-renderizado y no canvas en runtime

- ASCII en runtime requiere `<canvas>` corriendo en cada frame → consume CPU del visitante.
- En móviles de gama media puede causar drops de FPS y calentar el dispositivo.
- Un video MP4 H.264 de 2MB se reproduce con aceleración por hardware, mucho más eficiente.
- Aceptamos perder personalización en runtime a cambio de rendimiento.

## Pipeline completo

### 1. Genera el video fuente del ghost

Necesitas un video corto (3-8s) de tu ghost moviéndose. Opciones:

**Opción A — Animación 2D simple (recomendada para empezar)**
- After Effects, Rive, o Lottie: anima el ghost con flotación + parpadeo.
- Exporta a MP4 1080x1080, fondo transparente o negro, 30fps.

**Opción B — Render 3D (si quieres más impacto)**
- Blender con un modelo 3D del ghost.
- Más trabajo pero el resultado en ASCII se ve increíble.

**Opción C — Stop motion / dibujo a mano**
- Frames dibujados en Procreate o Krita exportados como secuencia.
- Convertir a MP4 con ffmpeg.

### 2. Convierte a ASCII con ASCII Studio

[ASCII Studio](https://github.com/vansh-nagar/ascii-studio) es una webapp Next.js. Dos formas de usarla:

**Forma rápida — webapp desplegada**
1. Si Vansh tiene un deploy público, súbele tu video.
2. Ajusta:
   - **Density**: media-alta (que se vea el ghost claro pero con detalle).
   - **Contrast**: alto (importante para que destaquen los ojos).
   - **Character set**: `@%#*+=-:. ` o un set custom monoespaciado.
3. Exporta el resultado como secuencia de frames o video.

**Forma local — clonando el repo**
```bash
git clone https://github.com/vansh-nagar/ascii-studio.git
cd ascii-studio
npm install
npm run dev
# Abre http://localhost:3000 y sube tu video
```

### 3. Re-encodea para web

Una vez tengas el video ASCII final:

```bash
ffmpeg -i ascii-raw.mp4 \
  -vcodec libx264 \
  -crf 28 \
  -preset slow \
  -movflags +faststart \
  -an \
  -vf "scale=800:800" \
  src/assets/brand/ghost-ascii.mp4
```

Flags importantes:
- `-crf 28`: balance calidad/peso. Subir a 30-32 si pesa mucho.
- `-preset slow`: mejor compresión.
- `-movflags +faststart`: el video empieza a reproducirse antes de cargar completo.
- `-an`: sin audio (no necesitamos).
- Tamaño 800x800 suficiente para web.

Objetivo: < 2MB. Si supera, baja resolución a 600x600 o sube CRF.

### 4. Genera el poster (primer frame)

```bash
ffmpeg -i src/assets/brand/ghost-ascii.mp4 \
  -vf "select=eq(n\,0)" \
  -q:v 2 \
  src/assets/brand/ghost-ascii-poster.png
```

### 5. Integración en el sitio

Componente sugerido `src/components/brand/AsciiGhostVideo.tsx`:

```tsx
import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/cn';

import asciiVideo from '@/assets/brand/ghost-ascii.mp4';
import asciiPoster from '@/assets/brand/ghost-ascii-poster.png';

type Props = {
  className?: string;
};

export const AsciiGhostVideo = ({ className }: Props) => {
  const ref = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();
  const [inView, setInView] = useState(false);

  // Lazy: solo carga cuando entra al viewport
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setInView(true),
      { rootMargin: '200px' }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Si reduced motion, mostrar solo el poster
  if (reduced) {
    return (
      <img
        src={asciiPoster}
        alt="ASCII rendition of Eswick mascot"
        className={cn('w-full h-auto', className)}
      />
    );
  }

  return (
    <video
      ref={ref}
      className={cn('w-full h-auto', className)}
      poster={asciiPoster}
      autoPlay
      muted
      loop
      playsInline
      preload={inView ? 'auto' : 'none'}
      aria-label="ASCII animation of Eswick mascot"
    >
      {inView && <source src={asciiVideo} type="video/mp4" />}
      <img src={asciiPoster} alt="ASCII rendition of Eswick mascot" />
    </video>
  );
};
```

### 6. Performance checklist

- [ ] Video < 2MB.
- [ ] `playsInline` para iOS (no abrir en pantalla completa).
- [ ] `muted` obligatorio para autoplay en navegadores modernos.
- [ ] `preload="none"` hasta que entre al viewport.
- [ ] Poster optimizado (< 100KB).
- [ ] Fallback respeta `prefers-reduced-motion`.
- [ ] `aria-label` descriptivo.

## Easter egg: ASCII en consola

En `src/lib/console-banner.ts`:

```ts
const ghostAscii = `
       .-.
      (o o)
      | O |
      |   |
      '~~~'
`;

export function printConsoleBanner() {
  if (typeof window === 'undefined') return;
  console.log(
    `%c${ghostAscii}\n  Eswick · isaacscamacho.dev\n  Hi dev! 👋`,
    'color: #00FF94; font-family: monospace;'
  );
}
```

Llamar desde `App.tsx` con un `useEffect`. Reemplaza el ASCII por uno tuyo más detallado cuando lo tengas.
