"use client";

import { useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Sidebar } from "@/components/Sidebar";

gsap.registerPlugin(useGSAP);

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="portfolio-shell">
      <Sidebar />
      <main className="main-content">{children}</main>
    </div>
  );
}

export function PageMotion({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      gsap.from(".reveal-item", {
        y: prefersReduced ? 0 : 28,
        opacity: 0,
        duration: prefersReduced ? 0.01 : 0.7,
        stagger: prefersReduced ? 0 : 0.08,
        ease: "power3.out",
      });

      if (ref.current?.querySelector(".floating-orb")) {
        gsap.to(".floating-orb", {
          y: prefersReduced ? 0 : "+=16",
          duration: 3.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: 0.45,
        });
      }

      if (ref.current?.querySelector(".hero-arch")) {
        gsap.to(".hero-arch", {
          scale: prefersReduced ? 1 : 1.04,
          duration: 6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    },
    { scope: ref, dependencies: [pathname] },
  );

  return (
    <div ref={ref} className="page-motion" key={pathname}>
      {children}
    </div>
  );
}
