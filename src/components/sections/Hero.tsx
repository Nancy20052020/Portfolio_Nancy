"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download, Mail } from "lucide-react";
import { profile } from "@/data/content";
import { Typewriter } from "@/components/Typewriter";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";

export function Hero() {
  return (
    <section className="section hero-section">
      <div className="hero-bg" aria-hidden>
        <div className="hero-glow hero-glow-a" />
        <div className="hero-glow hero-glow-b" />
        <div className="floating-orb orb-1" />
        <div className="floating-orb orb-2" />
      </div>

      <div className="hero-layout">
        <div className="hero-copy">
          <p className="hero-kicker reveal-item">Portfolio</p>
          <h1 className="hero-title reveal-item">
            Hi, I&apos;m <span className="name-gradient">{profile.name}</span>
          </h1>
          <p className="hero-role reveal-item">
            <Typewriter phrases={profile.titleRoles} />
          </p>
          <p className="hero-tagline reveal-item">{profile.tagline}</p>

          <div className="hero-actions reveal-item">
            <Link href="/projects" className="btn-primary">
              Explore My Work
              <ArrowRight size={16} />
            </Link>
            <a
              href="/Nancy_Verma_CV.pdf"
              className="btn-ghost hero-cv"
              download
            >
              <Download size={16} />
              Download CV
            </a>
          </div>

          <div className="hero-socials reveal-item">
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

        <div className="hero-portal reveal-item">
          <div className="hero-portal-frame">
            <Image
              src="/images/hero-portal.png"
              alt="Cosmic portal gateway"
              fill
              priority
              sizes="(max-width: 900px) 100vw, 42vw"
              className="hero-portal-img"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
