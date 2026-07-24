"use client";

import { useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Sidebar } from "@/components/Sidebar";
import { AmbientUniverse } from "@/components/AmbientUniverse";
import { SmoothScroll } from "@/components/SmoothScroll";
import { PageTransition } from "@/components/PageTransition";

gsap.registerPlugin(useGSAP);

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <>
      {!isHome && <SmoothScroll />}
      <PageTransition />
      <div className={`portfolio-shell${isHome ? " is-home" : ""}`}>
        <AmbientUniverse />
        <Sidebar />
        <main className="main-content">{children}</main>
      </div>
    </>
  );
}

function showFully(el: HTMLElement) {
  gsap.set(el, {
    opacity: 1,
    visibility: "visible",
    y: 0,
    clearProps: "transform,filter",
  });
}

/** Gentle page enter — cleanup always restores full visibility (Strict Mode safe). */
export function PageMotion({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        showFully(el);
        return;
      }

      // Baseline visible first so a killed tween can never strand the page blank
      showFully(el);

      const tween = gsap.fromTo(
        el,
        { opacity: 0.15, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: "power2.out",
          overwrite: "auto",
          onComplete: () => showFully(el),
        },
      );

      const safety = gsap.delayedCall(1, () => showFully(el));

      return () => {
        tween.kill();
        safety.kill();
        showFully(el);
      };
    },
    { dependencies: [pathname] },
  );

  return (
    <div ref={ref} className="page-motion" key={pathname}>
      {children}
    </div>
  );
}
