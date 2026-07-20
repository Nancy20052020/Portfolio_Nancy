"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { profile } from "@/data/content";
import { Typewriter } from "@/components/Typewriter";
import { GitHubIcon } from "@/components/icons";
import { Magnetic } from "@/components/Magnetic";
import { HeroWebGL } from "@/components/HeroWebGL";

gsap.registerPlugin(useGSAP);

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".igloo-brand", { y: 36, opacity: 0, filter: "blur(10px)", duration: 1.05 })
        .from(".igloo-line", { scaleX: 0, duration: 0.7 }, "-=0.45")
        .from(".igloo-role", { y: 18, opacity: 0, duration: 0.65 }, "-=0.35")
        .from(".igloo-tagline", { y: 16, opacity: 0, duration: 0.65 }, "-=0.4")
        .from(".igloo-cta", { y: 14, opacity: 0, duration: 0.55 }, "-=0.35")
        .from(".igloo-socials", { y: 12, opacity: 0, duration: 0.5 }, "-=0.3");

      gsap.to(".igloo-frost-veil", {
        opacity: 0.42,
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".igloo-chromatic", {
        x: 1.5,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} className="section hero-section igloo-hero">
      <div className="igloo-stage" aria-hidden>
        <HeroWebGL className="igloo-webgl" fullBleed />
        <div className="igloo-frost-veil" />
        <div className="igloo-vignette" />
        <div className="igloo-grid-floor" />
        <span className="igloo-chromatic" />
      </div>

      <div className="igloo-overlay">
        <div className="igloo-copy">
          <p className="igloo-kicker">Portfolio</p>
          <h1 className="igloo-brand">
            <span className="igloo-brand-main">{profile.name}</span>
          </h1>
          <span className="igloo-line" aria-hidden />
          <p className="igloo-role">
            <Typewriter phrases={profile.titleRoles} />
          </p>
          <p className="igloo-tagline">{profile.tagline}</p>

          <div className="igloo-cta">
            <Magnetic>
              <Link href="/projects" className="btn-primary btn-magnetic igloo-btn">
                Explore My Work
                <ArrowRight size={16} />
              </Link>
            </Magnetic>
          </div>

          <div className="igloo-socials">
            <a
              href={profile.links.github}
              target="_blank"
              rel="noreferrer"
              className="social-btn social-orbit"
              aria-label="GitHub"
            >
              <GitHubIcon size={18} />
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="social-btn social-orbit"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
