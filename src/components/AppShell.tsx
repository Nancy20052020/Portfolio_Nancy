"use client";

import { useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Sidebar } from "@/components/Sidebar";
import { AmbientUniverse } from "@/components/AmbientUniverse";
import { ParallaxProvider } from "@/components/Parallax";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <ParallaxProvider>
      <div className="portfolio-shell">
        <AmbientUniverse />
        <Sidebar />
        <main className="main-content">{children}</main>
      </div>
    </ParallaxProvider>
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

      const items = gsap.utils.toArray<HTMLElement>(".reveal-item");

      if (prefersReduced) {
        gsap.set(items, { clearProps: "all", opacity: 1, y: 0 });
        return;
      }

      gsap.from(items, {
        y: 36,
        opacity: 0,
        filter: "blur(6px)",
        duration: 0.85,
        stagger: 0.09,
        ease: "power3.out",
      });

      gsap.utils.toArray<HTMLElement>(".zero-g").forEach((el, i) => {
        gsap.to(el, {
          y: `+=${3 + (i % 3)}`,
          x: `+=${(i % 2 === 0 ? 2 : -2)}`,
          duration: 2.8 + (i % 4) * 0.35,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.12,
        });
      });

      if (ref.current?.querySelector(".floating-orb")) {
        gsap.to(".floating-orb", {
          y: "+=16",
          duration: 3.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: 0.45,
        });
      }

      gsap.utils.toArray<HTMLElement>(".scroll-reveal").forEach((el) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });
      });
    },
    { scope: ref, dependencies: [pathname], revertOnUpdate: true },
  );

  return (
    <div ref={ref} className="page-motion" key={pathname}>
      {children}
    </div>
  );
}
