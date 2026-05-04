# Design Tokens — Listos para copiar

## `tailwind.config.ts`

```ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: '#0A0A0F',
        surface: {
          DEFAULT: '#14141C',
          elevated: '#1A1A26',
        },
        border: {
          DEFAULT: '#1F1F2E',
          strong: '#2D2D42',
        },
        text: {
          DEFAULT: '#F5F5F7',
          muted: '#8B8B9E',
          subtle: '#5A5A6E',
        },
        accent: {
          DEFAULT: '#00FF94',
          pink: '#FF2E63',
          blue: '#4D5BFF',
        },
        success: '#00FF94',
        warning: '#FFB800',
        danger: '#FF2E63',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Geist Mono', 'monospace'],
        sans: ['Geist Sans', 'Inter', 'system-ui', 'sans-serif'],
        pixel: ['VT323', 'Press Start 2P', 'monospace'],
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      transitionDuration: {
        '400': '400ms',
      },
      boxShadow: {
        'glow-sm': '0 0 12px rgba(0, 255, 148, 0.12)',
        'glow': '0 0 20px rgba(0, 255, 148, 0.15)',
        'glow-lg': '0 0 40px rgba(0, 255, 148, 0.2)',
      },
      backgroundImage: {
        'grid': "linear-gradient(rgba(31,31,46,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(31,31,46,0.5) 1px, transparent 1px)",
      },
      backgroundSize: {
        'grid': '40px 40px',
      },
    },
  },
  plugins: [],
};

export default config;
```

## `src/styles/globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    color-scheme: dark;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    @apply bg-bg text-text font-sans antialiased;
    text-rendering: optimizeLegibility;
  }

  /* Selection */
  ::selection {
    @apply bg-accent/30 text-text;
  }

  /* Focus visible default */
  *:focus-visible {
    @apply outline-none ring-2 ring-accent ring-offset-2 ring-offset-bg;
  }

  /* Scrollbar custom */
  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }
  ::-webkit-scrollbar-track {
    @apply bg-bg;
  }
  ::-webkit-scrollbar-thumb {
    @apply bg-border rounded;
  }
  ::-webkit-scrollbar-thumb:hover {
    @apply bg-border-strong;
  }

  /* Prefers reduced motion */
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
}

@layer components {
  .container-x {
    @apply mx-auto max-w-6xl px-6 md:px-8;
  }

  .heading-1 {
    @apply font-mono text-5xl md:text-7xl font-700 tracking-tight;
  }

  .heading-2 {
    @apply font-mono text-3xl md:text-5xl font-600 tracking-tight;
  }

  .terminal-meta {
    @apply font-mono text-xs text-text-subtle uppercase tracking-widest;
  }

  .btn-primary {
    @apply inline-flex items-center gap-2 rounded-md border border-accent bg-accent/10 px-5 py-2.5
           font-mono text-sm font-500 text-accent transition-all duration-200 ease-out-expo
           hover:bg-accent/20 hover:shadow-glow focus-visible:bg-accent/20;
  }

  .btn-ghost {
    @apply inline-flex items-center gap-2 rounded-md border border-border px-5 py-2.5
           font-mono text-sm font-500 text-text transition-all duration-200 ease-out-expo
           hover:border-border-strong hover:bg-surface;
  }

  .card {
    @apply rounded-lg border border-border bg-surface p-6 transition-all duration-200 ease-out-expo
           hover:border-border-strong hover:bg-surface-elevated;
  }
}
```

## `src/lib/cn.ts`

```ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

## `src/hooks/useReducedMotion.ts`

```ts
import { useEffect, useState } from 'react';

export function useReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return prefersReduced;
}
```

## Ghost mascot SVG (placeholder inicial)

Guarda en `src/components/ui/GhostMascot.tsx`:

```tsx
import { cn } from '@/lib/cn';
import { useReducedMotion } from '@/hooks/useReducedMotion';

type Props = {
  className?: string;
  size?: number;
};

export const GhostMascot = ({ className, size = 200 }: Props) => {
  const reduced = useReducedMotion();

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Eswick mascot"
      className={cn(
        'select-none',
        !reduced && 'animate-[float_5s_ease-in-out_infinite]',
        className
      )}
    >
      {/* Cuerpo del ghost — silueta plana */}
      <path
        d="M40 90 C40 50, 70 30, 100 30 C130 30, 160 50, 160 90 L160 165 L145 150 L130 165 L115 150 L100 165 L85 150 L70 165 L55 150 L40 165 Z"
        fill="#F5F5F7"
      />
      {/* Ojos ovalados */}
      <ellipse cx="80" cy="90" rx="9" ry="14" fill="#0A0A0F" />
      <ellipse cx="120" cy="90" rx="9" ry="14" fill="#0A0A0F" />
      {/* Brillo en ojos */}
      <ellipse cx="83" cy="85" rx="2.5" ry="3" fill="#F5F5F7" />
      <ellipse cx="123" cy="85" rx="2.5" ry="3" fill="#F5F5F7" />
    </svg>
  );
};
```

Y añade al CSS global:

```css
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
```
