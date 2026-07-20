"use client";

import { useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Sidebar } from "@/components/Sidebar";
import { AmbientUniverse } from "@/components/AmbientUniverse";
import { ParallaxProvider } from "@/components/Parallax";
import { SmoothScroll } from "@/components/SmoothScroll";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <ParallaxProvider>
      <SmoothScroll />
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
        gsap.set(items, { clearProps: "all", opacity: 1, y: 0, rotateX: 0 });
        return;
      }

      gsap.from(items, {
        y: 48,
        opacity: 0,
        rotateX: 12,
        transformOrigin: "50% 100%",
        filter: "blur(8px)",
        duration: 0.95,
        stagger: 0.08,
        ease: "power3.out",
      });

      gsap.utils.toArray<HTMLElement>(".zero-g").forEach((el, i) => {
        gsap.to(el, {
          y: `+=${3 + (i % 3)}`,
          x: `+=${i % 2 === 0 ? 2 : -2}`,
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

      gsap.utils.toArray<HTMLElement>(".scroll-3d").forEach((el) => {
        gsap.fromTo(
          el,
          {
            y: 80,
            opacity: 0.15,
            rotateX: 28,
            scale: 0.92,
            transformOrigin: "50% 100%",
          },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 92%",
              end: "top 45%",
              scrub: 0.8,
            },
          },
        );
      });

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

      ScrollTrigger.refresh();
    },
    { scope: ref, dependencies: [pathname], revertOnUpdate: true },
  );

  return (
    <div ref={ref} className="page-motion" key={pathname}>
      {children}
    </div>
  );
}
