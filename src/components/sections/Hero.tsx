"use client";

import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { profile } from "@/data/content";
import { Typewriter } from "@/components/Typewriter";
import { GitHubIcon } from "@/components/icons";
import { HeroWebGL } from "@/components/HeroWebGL";

export function Hero() {
  return (
    <section className="section hero-section igloo-hero">
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
            <Link href="/projects" className="btn-primary igloo-btn">
              Explore My Work
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="igloo-socials">
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
