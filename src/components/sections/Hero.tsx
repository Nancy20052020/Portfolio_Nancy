"use client";

import { Mail, ArrowRight } from "lucide-react";
import { profile } from "@/data/content";
import { Typewriter } from "@/components/Typewriter";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";

export function Hero() {
  return (
    <section id="home" className="section hero-section">
      <div className="hero-bg" aria-hidden>
        <div className="hero-arch" />
        <div className="hero-glow hero-glow-a" />
        <div className="hero-glow hero-glow-b" />
        <div className="floating-orb orb-1" />
        <div className="floating-orb orb-2" />
        <div className="floating-orb orb-3" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl flex-col justify-center px-4 py-16 md:px-8">
        <p className="hero-kicker reveal-item">Portfolio · 2026</p>
        <h1 className="reveal-item mt-3 font-display text-4xl font-bold leading-[1.1] tracking-tight text-[var(--text)] sm:text-5xl md:text-6xl lg:text-7xl">
          Hello, I&apos;m{" "}
          <span className="name-gradient">{profile.name}</span>
        </h1>
        <p className="reveal-item mt-5 text-lg text-[var(--text-muted)] md:text-xl">
          <Typewriter phrases={profile.titleRoles} />
        </p>
        <p className="reveal-item mt-4 max-w-xl text-sm leading-relaxed text-[var(--text-soft)] md:text-base">
          {profile.tagline}
        </p>

        <div className="reveal-item mt-8 flex flex-wrap items-center gap-4">
          <a href="#projects" className="btn-primary">
            Explore My Work
            <ArrowRight size={16} />
          </a>
          <div className="flex gap-2">
            <a
              href={profile.links.github}
              target="_blank"
              rel="noreferrer"
              className="social-btn"
              aria-label="GitHub"
            >
              <GitHubIcon size={18} />
            </a>
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="social-btn"
              aria-label="LinkedIn"
            >
              <LinkedInIcon size={18} />
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="social-btn"
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
