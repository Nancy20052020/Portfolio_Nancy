"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type ParallaxValue = { x: number; y: number };

const ParallaxContext = createContext<ParallaxValue>({ x: 0, y: 0 });

export function ParallaxProvider({ children }: { children: ReactNode }) {
  const [value, setValue] = useState<ParallaxValue>({ x: 0, y: 0 });

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let raf = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const onMove = (event: PointerEvent) => {
      const nx = (event.clientX / window.innerWidth - 0.5) * 2;
      const ny = (event.clientY / window.innerHeight - 0.5) * 2;
      targetX = nx;
      targetY = ny;
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;
      setValue({ x: currentX, y: currentY });
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  const memo = useMemo(() => value, [value.x, value.y]);

  return (
    <ParallaxContext.Provider value={memo}>{children}</ParallaxContext.Provider>
  );
}

export function useParallax() {
  return useContext(ParallaxContext);
}

export function ParallaxLayer({
  depth = 1,
  className = "",
  children,
}: {
  depth?: number;
  className?: string;
  children: ReactNode;
}) {
  const { x, y } = useParallax();
  const style = {
    transform: `translate3d(${x * depth * 12}px, ${y * depth * 10}px, 0)`,
  };

  return (
    <div className={`parallax-layer ${className}`} style={style}>
      {children}
    </div>
  );
}
