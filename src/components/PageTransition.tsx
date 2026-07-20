"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/** Lightweight route flash — no heavy overlay that hides page copy. */
export function PageTransition() {
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const prevPath = useRef(pathname);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    if (pathname === prevPath.current) return;
    prevPath.current = pathname;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    overlay.style.opacity = "0.35";
    overlay.style.visibility = "visible";
    overlay.style.pointerEvents = "none";

    const id = window.setTimeout(() => {
      overlay.style.opacity = "0";
      window.setTimeout(() => {
        overlay.style.visibility = "hidden";
      }, 180);
    }, 40);

    return () => window.clearTimeout(id);
  }, [pathname]);

  return (
    <div ref={overlayRef} className="page-transition is-soft" aria-hidden>
      <div className="pt-backdrop" />
    </div>
  );
}
