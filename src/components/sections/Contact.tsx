"use client";

import { useState, type FormEvent } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { profile } from "@/data/content";

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
    <section className="section">
      <div className="section-inner">
        <div className="section-heading reveal-item">
          <p className="eyebrow">Let&apos;s Connect</p>
          <h2 className="section-title">Say hello</h2>
          <p className="section-sub">
            Open to internships, research collaborations, and interesting
            problems in AI, ML, and software engineering.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="flex flex-col gap-4 reveal-item">
            <a href={`mailto:${profile.email}`} className="contact-row glass-panel">
              <Mail size={18} />
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-[var(--text-muted)]">
                  Email
                </p>
                <p className="break-all text-sm font-semibold text-[var(--text)]">
                  {profile.email}
                </p>
              </div>
            </a>
            <a
              href={`tel:${profile.phone.replace(/\s/g, "")}`}
              className="contact-row glass-panel"
            >
              <Phone size={18} />
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-[var(--text-muted)]">
                  Phone
                </p>
                <p className="text-sm font-semibold text-[var(--text)]">
                  {profile.phone}
                </p>
              </div>
            </a>
            <div className="contact-row glass-panel">
              <MapPin size={18} />
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-[var(--text-muted)]">
                  Location
                </p>
                <p className="text-sm font-semibold text-[var(--text)]">
                  {profile.location}
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={onSubmit} className="contact-form glass-panel reveal-item">
            <label className="form-field">
              <span>Your Name</span>
              <input name="name" required placeholder="Alex Rivera" />
            </label>
            <label className="form-field">
              <span>Your Email</span>
              <input
                name="email"
                type="email"
                required
                placeholder="alex@email.com"
              />
            </label>
            <label className="form-field">
              <span>Your Message</span>
              <textarea
                name="message"
                required
                rows={4}
                placeholder="Tell me about your project or opportunity…"
              />
            </label>
            <button type="submit" className="btn-primary w-full justify-center">
              {sent ? "Opening mail…" : "Send Message"}
              <Send size={16} />
            </button>
          </form>
        </div>

        <footer className="mt-16 border-t border-[var(--border)] pt-6 text-center text-xs text-[var(--text-muted)]">
          © {new Date().getFullYear()} {profile.name}. Crafted with motion & care.
        </footer>
      </div>
    </section>
  );
}
