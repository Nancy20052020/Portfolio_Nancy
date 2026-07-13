"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sidebar } from "@/components/Sidebar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Achievements } from "@/components/sections/Achievements";
import { Publications } from "@/components/sections/Publications";
import { Contact } from "@/components/sections/Contact";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function Portfolio() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      gsap.from(".hero-section .reveal-item", {
        y: prefersReduced ? 0 : 36,
        opacity: 0,
        duration: prefersReduced ? 0.01 : 0.9,
        stagger: prefersReduced ? 0 : 0.12,
        ease: "power3.out",
        delay: 0.15,
      });

      gsap.to(".floating-orb", {
        y: prefersReduced ? 0 : "+=18",
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.45,
      });

      gsap.to(".hero-arch", {
        scale: prefersReduced ? 1 : 1.04,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.utils.toArray<HTMLElement>(".section").forEach((section) => {
        const items = section.querySelectorAll(".reveal-item");
        if (!items.length || section.id === "home") return;

        gsap.from(items, {
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
          y: prefersReduced ? 0 : 40,
          opacity: 0,
          duration: prefersReduced ? 0.01 : 0.75,
          stagger: prefersReduced ? 0 : 0.1,
          ease: "power3.out",
        });
      });
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef} className="portfolio-shell">
      <Sidebar />
      <main className="main-content">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Achievements />
        <Publications />
        <Contact />
      </main>
    </div>
  );
}
