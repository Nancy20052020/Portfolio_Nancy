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
import { PageTransition } from "@/components/PageTransition";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <ParallaxProvider>
      <SmoothScroll />
      <PageTransition />
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
      const depthItems = gsap.utils.toArray<HTMLElement>(".depth-enter");
      const scrollItems = gsap.utils.toArray<HTMLElement>(".scroll-3d");

      if (prefersReduced) {
        gsap.set([...items, ...depthItems, ...scrollItems], {
          clearProps: "all",
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          filter: "none",
        });
        return;
      }

      const master = gsap.timeline({ defaults: { ease: "power3.out" } });

      master.from(items, {
        y: 56,
        opacity: 0,
        rotateX: 14,
        transformOrigin: "50% 100%",
        filter: "blur(10px)",
        duration: 0.9,
        stagger: 0.07,
      });

      master.from(
        depthItems,
        {
          y: 72,
          opacity: 0,
          rotateX: 22,
          scale: 0.94,
          transformOrigin: "50% 100%",
          filter: "blur(12px)",
          duration: 1,
          stagger: 0.09,
        },
        0.08,
      );

      const isMobile = window.innerWidth < 640;

      gsap.utils.toArray<HTMLElement>(".zero-g").forEach((el, i) => {
        gsap.to(el, {
          y: `+=${3 + (i % 3)}`,
          x: isMobile ? 0 : `+=${i % 2 === 0 ? 2 : -2}`,
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

      scrollItems.forEach((el, i) => {
        const rect = el.getBoundingClientRect();
        const inView = rect.top < window.innerHeight * 0.92;

        if (inView) {
          gsap.fromTo(
            el,
            {
              y: 64,
              opacity: 0.1,
              rotateX: 24,
              scale: 0.93,
              transformOrigin: "50% 100%",
            },
            {
              y: 0,
              opacity: 1,
              rotateX: 0,
              scale: 1,
              duration: 0.85,
              delay: 0.12 + i * 0.08,
              ease: "power3.out",
            },
          );
        } else {
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
        }
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

      gsap.utils.toArray<HTMLElement>(".rail-draw").forEach((el) => {
        gsap.fromTo(
          el,
          { scaleY: 0, transformOrigin: "top center" },
          {
            scaleY: 1,
            duration: 1.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>(".track-draw").forEach((el) => {
        gsap.fromTo(
          el,
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          },
        );
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
