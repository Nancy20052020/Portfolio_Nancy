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
import { ParallaxLayer, useParallax } from "@/components/Parallax";
import { HeroWebGL } from "@/components/HeroWebGL";

gsap.registerPlugin(useGSAP);

function PortalStage() {
  const { x, y } = useParallax();
  const tilt = {
    transform: `perspective(1400px) rotateY(${x * 9}deg) rotateX(${-y * 7}deg)`,
  };

  return (
    <div className="hero-stage-wrap reveal-item depth-enter" style={tilt}>
      <span className="hero-frost-halo halo-a" />
      <span className="hero-frost-halo halo-b" />

      <div className="hero-portal zero-g">
        <span className="portal-ring ring-a" />
        <span className="portal-ring ring-b" />
        <span className="portal-ring ring-c" />
        <div className="hero-portal-frame">
          <HeroWebGL />
          <span className="portal-sheen" />
        </div>
      </div>

      <article className="hero-stage-panel panel-top glass-panel">
        <p className="hero-stage-label">Education</p>
        <p className="hero-stage-value">{profile.education.school}</p>
      </article>

      <article className="hero-stage-panel panel-bottom glass-panel">
        <p className="hero-stage-label">Current Focus</p>
        <p className="hero-stage-value">{profile.education.degree}</p>
      </article>
    </div>
  );
}

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;

      gsap.to(".portal-ring", {
        rotate: 360,
        duration: 18,
        repeat: -1,
        ease: "none",
        stagger: { each: 3, from: "end" },
      });

      gsap.to(".portal-sheen", {
        opacity: 0.55,
        duration: 2.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".ice-scan-line", {
        xPercent: 130,
        duration: 5.8,
        repeat: -1,
        ease: "none",
      });

      gsap.to(".hero-ice-chip", {
        y: "-=5",
        duration: 2.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.12,
      });
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} className="section hero-section">
      <div className="hero-bg" aria-hidden>
        <span className="ice-scan-line" />
        <div className="hero-glow hero-glow-a" />
        <div className="hero-glow hero-glow-b" />
        <div className="floating-orb orb-1" />
        <div className="floating-orb orb-2" />
      </div>

      <div className="hero-igloo-grid">
        <ParallaxLayer depth={0.35} className="hero-copy">
          <div>
            <p className="hero-kicker reveal-item">Portfolio</p>
            <h1 className="hero-title reveal-item">
              <span className="name-gradient name-shimmer">{profile.name}</span>
              <span className="hero-title-sub">AI &amp; ML Engineer</span>
            </h1>
            <p className="hero-role reveal-item">
              <Typewriter phrases={profile.titleRoles} />
            </p>
            <p className="hero-tagline reveal-item">{profile.tagline}</p>
          </div>

          <div className="hero-actions reveal-item">
            <Magnetic>
              <Link href="/projects" className="btn-primary btn-magnetic">
                Explore My Work
                <ArrowRight size={16} />
              </Link>
            </Magnetic>
          </div>

          <div className="hero-socials reveal-item">
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

          <div className="hero-ice-rail reveal-item" aria-label="Specialties">
            {profile.titleRoles.map((role) => (
              <span key={role} className="hero-ice-chip">
                {role}
              </span>
            ))}
          </div>
        </ParallaxLayer>

        <ParallaxLayer depth={1.15} className="hero-stage-col">
          <PortalStage />
        </ParallaxLayer>
      </div>
    </section>
  );
}
