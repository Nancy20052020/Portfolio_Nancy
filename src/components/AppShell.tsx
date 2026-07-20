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
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <ParallaxProvider>
      {!isHome && <SmoothScroll />}
      <PageTransition />
      <div className={`portfolio-shell${isHome ? " is-home" : ""}`}>
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

      const settle = (els: HTMLElement[]) => {
        if (!els.length) return;
        gsap.set(els, {
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          clearProps: "opacity,transform,filter",
        });
      };

      const master = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => settle([...items, ...depthItems]),
      });

      if (items.length) {
        master.fromTo(
          items,
          { y: 36, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            stagger: 0.06,
            clearProps: "opacity,transform,filter",
          },
        );
      }

      if (depthItems.length) {
        // Skip nodes already animated as reveal-item to avoid opacity fights
        const uniqueDepth = depthItems.filter(
          (el) => !el.classList.contains("reveal-item"),
        );
        if (uniqueDepth.length) {
          master.fromTo(
            uniqueDepth,
            { y: 28, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              stagger: 0.05,
              clearProps: "opacity,transform,filter",
            },
            0.05,
          );
        }
      }

      gsap.delayedCall(1.2, () => {
        settle([...items, ...depthItems, ...scrollItems]);
      });

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
        if (el.classList.contains("reveal-item") || el.classList.contains("depth-enter")) {
          return;
        }
        const rect = el.getBoundingClientRect();
        const inView = rect.top < window.innerHeight * 0.92;

        if (inView) {
          gsap.fromTo(
            el,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              delay: 0.08 + i * 0.06,
              ease: "power3.out",
              clearProps: "opacity,transform",
            },
          );
        } else {
          gsap.fromTo(
            el,
            { y: 48, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top 92%",
                end: "top 55%",
                scrub: 0.6,
                once: true,
              },
            },
          );
        }
      });

      gsap.utils.toArray<HTMLElement>(".scroll-reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            clearProps: "opacity,transform",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          },
        );
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
              toggleActions: "play none none none",
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
              toggleActions: "play none none none",
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
