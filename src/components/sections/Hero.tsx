"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { profile } from "@/data/content";
import { Typewriter } from "@/components/Typewriter";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { Magnetic } from "@/components/Magnetic";
import { ParallaxLayer, useParallax } from "@/components/Parallax";
import { HeroWebGL } from "@/components/HeroWebGL";

gsap.registerPlugin(useGSAP);

function PortalStage() {
  const { x, y } = useParallax();
  const tilt = {
    transform: `perspective(1200px) rotateY(${x * 8}deg) rotateX(${-y * 6}deg)`,
  };

  return (
    <div className="hero-portal reveal-item zero-g" style={tilt}>
      <span className="portal-ring ring-a" />
      <span className="portal-ring ring-b" />
      <span className="portal-ring ring-c" />
      <div className="hero-portal-frame">
        <Image
          src="/images/hero-portal.png"
          alt="Cosmic portal gateway"
          fill
          priority
          sizes="(max-width: 900px) 100vw, 42vw"
          className="hero-portal-img"
        />
        <HeroWebGL />
        <span className="portal-sheen" />
      </div>
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
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} className="section hero-section">
      <div className="hero-bg" aria-hidden>
        <div className="hero-glow hero-glow-a" />
        <div className="hero-glow hero-glow-b" />
        <div className="floating-orb orb-1" />
        <div className="floating-orb orb-2" />
      </div>

      <div className="hero-layout">
        <div className="hero-copy">
          <ParallaxLayer depth={0.4}>
            <p className="hero-kicker reveal-item">Portfolio</p>
            <h1 className="hero-title reveal-item">
              Hello, I&apos;m{" "}
              <span className="name-gradient name-shimmer">{profile.name}</span>
            </h1>
            <p className="hero-role reveal-item">
              <Typewriter phrases={profile.titleRoles} />
            </p>
            <p className="hero-tagline reveal-item">{profile.tagline}</p>
          </ParallaxLayer>

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
              href={profile.links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="social-btn social-orbit"
              aria-label="LinkedIn"
            >
              <LinkedInIcon size={18} />
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

        <ParallaxLayer depth={1.4}>
          <PortalStage />
        </ParallaxLayer>
      </div>
    </section>
  );
}
