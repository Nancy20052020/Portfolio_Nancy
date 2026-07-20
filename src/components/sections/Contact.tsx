"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { Mail, Send } from "lucide-react";
import { profile } from "@/data/content";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { Magnetic } from "@/components/Magnetic";
import { ParallaxLayer } from "@/components/Parallax";
import { SectionAura } from "@/components/SectionAura";

export function Contact() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const message = String(data.get("message") || "");
    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`,
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section className="section contact-section">
      <SectionAura variant="contact" />
      <div className="section-inner">
        <div className="contact-heading reveal-item">
          <p className="contact-eyebrow">Contact</p>
          <h2 className="contact-title">Contact</h2>
          <p className="contact-sub">
            Open to internships, research collaborations, and interesting
            problems in AI, ML, and software engineering.
          </p>
        </div>

        <div className="contact-layout mt-10">
          <div className="contact-left reveal-item depth-enter">
            <a href={`mailto:${profile.email}`} className="contact-row glass-panel scroll-3d">
              <Mail size={18} />
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-[var(--text-muted)]">
                  Email
                </p>
                <p className="break-all text-sm font-semibold text-[var(--heading)]">
                  {profile.email}
                </p>
              </div>
            </a>

            <div className="contact-socials">
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

            <ParallaxLayer depth={1.1}>
              <div className="contact-plane zero-g plane-orbit">
                <Image
                  src="/images/contact-plane.png"
                  alt=""
                  fill
                  sizes="220px"
                  className="contact-plane-img"
                />
                <span className="plane-trail" aria-hidden />
              </div>
            </ParallaxLayer>
          </div>

          <form
            onSubmit={onSubmit}
            className="contact-form glass-panel reveal-item depth-enter scroll-3d"
          >
            <label className="form-field scroll-reveal">
              <span>Your Name</span>
              <input name="name" required placeholder="Alex Rivera" />
            </label>
            <label className="form-field scroll-reveal">
              <span>Your Email</span>
              <input
                name="email"
                type="email"
                required
                placeholder="alex@email.com"
              />
            </label>
            <label className="form-field scroll-reveal">
              <span>Your Message</span>
              <textarea
                name="message"
                required
                rows={4}
                placeholder="Tell me about your project or opportunity…"
              />
            </label>
            <Magnetic>
              <button type="submit" className="btn-primary btn-magnetic w-full justify-center">
                {sent ? "Opening mail…" : "Send Message"}
                <Send size={16} />
              </button>
            </Magnetic>
          </form>
        </div>

        <footer className="mt-16 border-t border-[var(--border)] pt-6 text-center text-xs text-[var(--text-muted)]">
          © {new Date().getFullYear()} {profile.name}. Crafted with motion & care.
        </footer>
      </div>
    </section>
  );
}
