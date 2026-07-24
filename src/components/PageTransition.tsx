"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

/** Soft route wash — always clears itself so pages never stay covered. */
export function PageTransition() {
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const prevPath = useRef(pathname);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    const hide = () => {
      gsap.set(overlay, {
        opacity: 0,
        visibility: "hidden",
        pointerEvents: "none",
      });
    };

    if (pathname === prevPath.current) {
      hide();
      return;
    }
    prevPath.current = pathname;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      hide();
      return;
    }

    const tl = gsap.timeline({
      defaults: { ease: "power2.inOut" },
      onComplete: hide,
      onInterrupt: hide,
    });

    tl.set(overlay, { visibility: "visible", pointerEvents: "none" })
      .fromTo(overlay, { opacity: 0 }, { opacity: 0.55, duration: 0.28 })
      .to(overlay, { opacity: 0, duration: 0.5, delay: 0.06 });

    return () => {
      tl.kill();
      hide();
    };
  }, [pathname]);

  return (
    <div ref={overlayRef} className="page-transition" aria-hidden>
      <div className="pt-backdrop" />
    </div>
  );
}
