import { useEffect, useRef } from 'react';
import { cn } from '@/lib/cn';

type Props = {
  className?: string;
};

// Simple 2D Vector
class Vec2 {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  add(v: Vec2) { this.x += v.x; this.y += v.y; return this; }
  sub(v: Vec2) { this.x -= v.x; this.y -= v.y; return this; }
  mult(n: number) { this.x *= n; this.y *= n; return this; }
  mag() { return Math.sqrt(this.x * this.x + this.y * this.y); }
  normalize() {
    const m = this.mag();
    if (m !== 0) this.mult(1 / m);
    return this;
  }
}

class AsciiEntity {
  pos: Vec2;
  vel: Vec2;
  char: string;
  size: number;
  mass: number;

  constructor(x: number, y: number, char: string, size: number) {
    this.pos = new Vec2(x, y);
    this.vel = new Vec2((Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2);
    this.char = char;
    this.size = size;
    this.mass = size;
  }

  update(width: number, height: number, gravity: Vec2) {
    // Apply gravity
    this.vel.add(gravity);
    
    // Friction
    this.vel.mult(0.98);

    // Limit speed
    const speed = this.vel.mag();
    if (speed > 5) {
      this.vel.normalize().mult(5);
    }

    this.pos.add(this.vel);

    // Bounce off walls
    const padding = this.size;
    if (this.pos.x < padding) {
      this.pos.x = padding;
      this.vel.x *= -0.8;
    } else if (this.pos.x > width - padding) {
      this.pos.x = width - padding;
      this.vel.x *= -0.8;
    }

    if (this.pos.y < padding) {
      this.pos.y = padding;
      this.vel.y *= -0.8;
    } else if (this.pos.y > height - padding) {
      this.pos.y = height - padding;
      this.vel.y *= -0.8;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.font = `${this.size}px "VT323", "Press Start 2P", monospace`;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)'; // Subtle white/gray
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.char, this.pos.x, this.pos.y);
  }
}

export const AsciiPhysicsBackground = ({ className }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const entitiesRef = useRef<AsciiEntity[]>([]);
  const mouseRef = useRef<Vec2 | null>(null);
  const gravityRef = useRef<Vec2>(new Vec2(0, 0));
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        width = rect.width;
        height = rect.height;
        canvas.width = width * window.devicePixelRatio;
        canvas.height = height * window.devicePixelRatio;
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      }
    };

    resize();
    window.addEventListener('resize', resize);

    // Initialize 3 entities with much larger sizes
    const chars = ['[ ]', '*', '#'];
    const sizes = [80, 120, 160];
    entitiesRef.current = chars.map((char, i) => {
      // Ensure they don't spawn outside the canvas if canvas is small
      const safeSize = Math.min(sizes[i], Math.min(width, height) / 3);
      return new AsciiEntity(
        Math.random() * (width - safeSize * 2) + safeSize,
        Math.random() * (height - safeSize * 2) + safeSize,
        char,
        safeSize
      );
    });

    const loop = () => {
      ctx.clearRect(0, 0, width, height);

      // Mouse repulsion
      if (mouseRef.current) {
        entitiesRef.current.forEach((entity) => {
          const dir = new Vec2(entity.pos.x - mouseRef.current!.x, entity.pos.y - mouseRef.current!.y);
          const dist = dir.mag();
          // Increase repulsion radius for larger elements
          const repulsionRadius = entity.size * 1.5;
          if (dist < repulsionRadius) {
            const force = (repulsionRadius - dist) / repulsionRadius;
            dir.normalize().mult(force * 2.5);
            entity.vel.add(dir);
          }
        });
      }

      // Collisions between entities
      for (let i = 0; i < entitiesRef.current.length; i++) {
        for (let j = i + 1; j < entitiesRef.current.length; j++) {
          const a = entitiesRef.current[i];
          const b = entitiesRef.current[j];
          const dir = new Vec2(a.pos.x - b.pos.x, a.pos.y - b.pos.y);
          const dist = dir.mag();
          const minDist = (a.size + b.size) / 2;
          
          if (dist < minDist) {
            const overlap = minDist - dist;
            dir.normalize().mult(overlap * 0.05); // repulsion force
            a.vel.add(dir);
            b.vel.sub(dir);
          }
        }
      }

      entitiesRef.current.forEach((entity) => {
        entity.update(width, height, gravityRef.current);
        entity.draw(ctx);
      });

      animationRef.current = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (rect) {
        // Only update if mouse is over the section
        if (
          e.clientX >= rect.left && e.clientX <= rect.right &&
          e.clientY >= rect.top && e.clientY <= rect.bottom
        ) {
          mouseRef.current = new Vec2(e.clientX - rect.left, e.clientY - rect.top);
        } else {
          mouseRef.current = null;
        }
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (rect && e.touches.length > 0) {
        const touch = e.touches[0];
        if (
          touch.clientX >= rect.left && touch.clientX <= rect.right &&
          touch.clientY >= rect.top && touch.clientY <= rect.bottom
        ) {
          mouseRef.current = new Vec2(touch.clientX - rect.left, touch.clientY - rect.top);
        } else {
          mouseRef.current = null;
        }
      }
    };

    const handleTouchEnd = () => {
      mouseRef.current = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  const handleOrientation = (e: DeviceOrientationEvent) => {
    const beta = e.beta || 0; // -180 to 180
    const gamma = e.gamma || 0; // -90 to 90
    // Map tilt to a small gravity vector
    gravityRef.current = new Vec2(gamma * 0.005, beta * 0.005);
  };

  // Click handler to request iOS gyroscope permissions
  const handleClick = () => {
    if (
      typeof DeviceOrientationEvent !== 'undefined' &&
      typeof (DeviceOrientationEvent as any).requestPermission === 'function'
    ) {
      (DeviceOrientationEvent as any).requestPermission()
        .then((response: string) => {
          if (response === 'granted') {
            window.addEventListener('deviceorientation', handleOrientation);
          }
        })
        .catch(console.error);
    } else {
      window.addEventListener('deviceorientation', handleOrientation);
    }
  };

  useEffect(() => {
    // Attempt to bind without permission for non-iOS devices
    if (
      typeof DeviceOrientationEvent !== 'undefined' &&
      typeof (DeviceOrientationEvent as any).requestPermission !== 'function'
    ) {
      window.addEventListener('deviceorientation', handleOrientation);
    }

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={cn("absolute inset-0 z-0 pointer-events-auto", className)}
      onClick={handleClick}
    />
  );
};
