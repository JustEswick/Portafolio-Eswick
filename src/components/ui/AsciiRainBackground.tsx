import { useEffect, useRef } from 'react';
import { cn } from '@/lib/cn';

type Props = {
  className?: string;
};

export const AsciiRainBackground = ({ className }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let columns = 0;
    const fontSize = 16;
    let drops: number[] = [];

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        width = rect.width;
        height = rect.height;
        canvas.width = width * window.devicePixelRatio;
        canvas.height = height * window.devicePixelRatio;
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        
        columns = Math.floor(width / fontSize);
        drops = Array(columns).fill(1);
      }
    };

    resize();
    window.addEventListener('resize', resize);

    // Characters to use for the rain
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*'.split('');

    const draw = () => {
      // Clear the canvas completely so the background is completely transparent
      ctx.clearRect(0, 0, width, height);

      ctx.font = `${fontSize}px "VT323", "Press Start 2P", monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Draw the head of the drop (brightest, white)
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        const headChar = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(headChar, i * fontSize, drops[i] * fontSize);

        // Draw a short tail (fading grays)
        for (let j = 1; j < 8; j++) {
          ctx.fillStyle = `rgba(200, 200, 200, ${Math.max(0, 0.15 - j * 0.02)})`;
          const tailChar = chars[Math.floor(Math.random() * chars.length)];
          ctx.fillText(tailChar, i * fontSize, (drops[i] - j) * fontSize);
        }

        // Reset the drop to the top randomly to create staggered effect
        // or if it has reached the bottom
        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = Math.floor(Math.random() * -20); // Start slightly offscreen to stagger
        }

        // Move the drop down
        drops[i]++;
      }
    };

    // Use interval instead of requestAnimationFrame to control the speed of the rain
    const intervalId = setInterval(draw, 50); // 50ms = ~20fps, good for terminal effect

    return () => {
      window.removeEventListener('resize', resize);
      clearInterval(intervalId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={cn("absolute inset-0 z-0 pointer-events-none", className)}
    />
  );
};
