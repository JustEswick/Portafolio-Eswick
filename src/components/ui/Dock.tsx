import { motion, useMotionValue, useSpring, useTransform, AnimatePresence, type MotionValue } from 'framer-motion';
import { Children, cloneElement, useEffect, useMemo, useRef, useState } from 'react';
import type { ReactElement, ReactNode } from 'react';

interface DockItemProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  mouseX?: any;
  spring?: any;
  distance?: number;
  magnification?: number;
  baseItemSize?: number;
  ariaLabel?: string;
}

function DockItem({ children, className = '', onClick, mouseX, spring, distance, magnification, baseItemSize, ariaLabel }: DockItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isHovered = useMotionValue(0);

  const mouseDistance = useTransform(mouseX as any, (val: any) => {
    const rect = ref.current?.getBoundingClientRect() ?? {
      x: 0,
      width: baseItemSize ?? 50
    };
    return (val ?? 0) - rect.x - (baseItemSize ?? 50) / 2;
  }) as MotionValue<number>;

  const targetSize = useTransform(mouseDistance, [-(distance ?? 200), 0, (distance ?? 200)], [baseItemSize ?? 50, magnification ?? 70, baseItemSize ?? 50]);
  const size = useSpring(targetSize, spring);

  return (
    <motion.div
      ref={ref}
      style={{
        width: size,
        height: size
      }}
      onHoverStart={() => isHovered.set(1)}
      onHoverEnd={() => isHovered.set(0)}
      onFocus={() => isHovered.set(1)}
      onBlur={() => isHovered.set(0)}
      onClick={onClick}
      className={`relative flex items-center justify-center cursor-pointer transition-colors ${className}`}
      tabIndex={0}
      role="button"
      aria-label={ariaLabel}
      aria-haspopup="true"
    >
      {Children.map(children, child => cloneElement(child as ReactElement, { isHovered } as any))}
    </motion.div>
  );
}

interface DockLabelProps {
  children: ReactNode;
  className?: string;
  isHovered?: any;
}

function DockLabel({ children, className = '', ...rest }: DockLabelProps) {
  const { isHovered } = rest;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = isHovered.on('change', (latest: number) => {
      setIsVisible(latest === 1);
    });
    return () => unsubscribe();
  }, [isHovered]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: -10 }}
          exit={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.2 }}
          className={`absolute -top-10 left-1/2 whitespace-nowrap rounded-md border border-border bg-card px-3 py-1.5 text-sm font-medium text-text shadow-lg ${className}`}
          role="tooltip"
          style={{ x: '-50%' }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface DockIconProps {
  children: ReactNode;
  className?: string;
}

function DockIcon({ children, className = '' }: DockIconProps) {
  return <div className={`flex items-center justify-center transition-transform hover:scale-110 text-text hover:text-accent ${className}`}>{children}</div>;
}

export interface DockProps {
  items: Array<{
    icon: ReactNode;
    label: ReactNode;
    onClick: () => void;
    className?: string;
  }>;
  className?: string;
  spring?: any;
  magnification?: number;
  distance?: number;
  panelHeight?: number;
  dockHeight?: number;
  baseItemSize?: number;
}

export default function Dock({
  items,
  className = '',
  spring = { mass: 0.1, stiffness: 150, damping: 12 },
  magnification = 70,
  distance = 200,
  panelHeight = 68,
  dockHeight = 256,
  baseItemSize = 50
}: DockProps) {
  const mouseX = useMotionValue(Infinity);
  const isHovered = useMotionValue(0);

  const maxHeight = useMemo(
    () => Math.max(dockHeight, magnification + magnification / 2 + 4),
    [magnification, dockHeight]
  );
  const heightRow = useTransform(isHovered, [0, 1], [panelHeight, maxHeight]);
  const height = useSpring(heightRow, spring);

  return (
    <motion.div 
      style={{ height, scrollbarWidth: 'none' }} 
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-end justify-center pointer-events-none"
    >
      <motion.div
        onMouseMove={({ pageX }) => {
          isHovered.set(1);
          mouseX.set(pageX);
        }}
        onMouseLeave={() => {
          isHovered.set(0);
          mouseX.set(Infinity);
        }}
        className={`pointer-events-auto flex items-end gap-2 rounded-full border border-border bg-[#0A0A0F]/80 px-4 pb-2 pt-2 shadow-2xl backdrop-blur-md ${className}`}
        style={{ height: panelHeight }}
        role="toolbar"
        aria-label="Application dock"
      >
        {items.map((item, index) => (
          <DockItem
            key={index}
            onClick={item.onClick}
            className={item.className}
            mouseX={mouseX}
            spring={spring}
            distance={distance}
            magnification={magnification}
            baseItemSize={baseItemSize}
            ariaLabel={typeof item.label === 'string' ? item.label : undefined}
          >
            <DockIcon>{item.icon}</DockIcon>
            <DockLabel>{item.label}</DockLabel>
          </DockItem>
        ))}
      </motion.div>
    </motion.div>
  );
}
