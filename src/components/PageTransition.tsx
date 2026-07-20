"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

export function PageTransition() {
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const [displayPath, setDisplayPath] = useState(pathname);
  const prevPath = useRef(pathname);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const overlay = overlayRef.current;
    if (!overlay || reduce) {
      setDisplayPath(pathname);
      prevPath.current = pathname;
      return;
    }

    if (pathname === prevPath.current) return;

    const rings = overlay.querySelectorAll(".pt-ring");
    const core = overlay.querySelector(".pt-core");

    const tl = gsap.timeline({
      onComplete: () => {
        setDisplayPath(pathname);
        prevPath.current = pathname;
      },
    });

    tl.set(overlay, { pointerEvents: "auto", visibility: "visible" })
      .fromTo(
        overlay,
        { opacity: 0 },
        { opacity: 1, duration: 0.18, ease: "power2.in" },
      )
      .fromTo(
        core,
        { scale: 0.2, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.35, ease: "power3.out" },
        0,
      )
      .fromTo(
        rings,
        { scale: 0.4, rotate: -90, opacity: 0 },
        {
          scale: 1,
          rotate: 0,
          opacity: 1,
          duration: 0.45,
          stagger: 0.06,
          ease: "power3.out",
        },
        0.05,
      )
      .to(core, { scale: 2.8, opacity: 0, duration: 0.4, ease: "power2.in" }, 0.32)
      .to(
        rings,
        { scale: 2.2, rotate: 120, opacity: 0, duration: 0.4, stagger: 0.04, ease: "power2.in" },
        0.32,
      )
      .to(overlay, { opacity: 0, duration: 0.22, ease: "power2.out" }, 0.55)
      .set(overlay, { pointerEvents: "none", visibility: "hidden" });

    return () => {
      tl.kill();
    };
  }, [pathname]);

  return (
    <div
      ref={overlayRef}
      className="page-transition"
      aria-hidden
      data-path={displayPath}
    >
      <div className="pt-backdrop" />
      <div className="pt-stage">
        <span className="pt-ring ring-1" />
        <span className="pt-ring ring-2" />
        <span className="pt-ring ring-3" />
        <span className="pt-core" />
      </div>
    </div>
  );
}
