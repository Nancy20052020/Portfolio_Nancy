"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

/** Soft, slower route wash — never leaves the next page stuck hidden. */
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

    const tl = gsap.timeline({
      defaults: { ease: "power2.inOut" },
      onComplete: () => {
        gsap.set(overlay, {
          opacity: 0,
          visibility: "hidden",
          pointerEvents: "none",
        });
      },
    });

    tl.set(overlay, {
      visibility: "visible",
      pointerEvents: "none",
    })
      .fromTo(
        overlay,
        { opacity: 0 },
        { opacity: 0.72, duration: 0.35 },
      )
      .to(overlay, {
        opacity: 0,
        duration: 0.65,
        delay: 0.12,
      })
      .set(overlay, { visibility: "hidden" });

    return () => {
      tl.kill();
      gsap.set(overlay, {
        opacity: 0,
        visibility: "hidden",
        pointerEvents: "none",
      });
    };
  }, [pathname]);

  return (
    <div ref={overlayRef} className="page-transition" aria-hidden>
      <div className="pt-backdrop" />
    </div>
  );
}
