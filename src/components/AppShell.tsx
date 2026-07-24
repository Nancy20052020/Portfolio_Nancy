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

/** Gentle page enter — always settles to fully visible. */
export function PageMotion({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        gsap.set(el, { clearProps: "all", opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        el,
        { autoAlpha: 0, y: 28 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.95,
          ease: "power3.out",
          clearProps: "all",
          onComplete: () => {
            gsap.set(el, { clearProps: "all", opacity: 1, visibility: "visible", y: 0 });
          },
        },
      );

      // Safety net if the tween is interrupted
      gsap.delayedCall(1.3, () => {
        gsap.set(el, { clearProps: "all", opacity: 1, visibility: "visible", y: 0 });
      });
    },
    { scope: ref, dependencies: [pathname] },
  );

  return (
    <div ref={ref} className="page-motion" key={pathname}>
      {children}
    </div>
  );
}
