"use client";

import { GraduationCap, MapPin, Sparkles } from "lucide-react";
import { profile } from "@/data/content";

const cards = [
  {
    label: "Education",
    value: "B.Tech AI & ML",
    sub: profile.education.school,
    icon: GraduationCap,
  },
  {
    label: "CGPA",
    value: profile.education.cgpa,
    sub: profile.education.years,
    icon: Sparkles,
  },
  {
    label: "Based In",
    value: "Jaipur, India",
    sub: "Open to remote & hybrid",
    icon: MapPin,
  },
];

export function About() {
  return (
    <section className="section">
      <div className="section-inner">
        <div className="section-heading reveal-item">
          <p className="eyebrow">About</p>
          <h2 className="section-title">About</h2>
          <p className="section-sub">
            AI & ML undergraduate at Manipal University Jaipur with a 9.79 CGPA,
            currently shipping software at Grids App LLC — from clinical ML to
            satellite Earth observation.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {cards.map((card) => (
            <div key={card.label} className="info-card glass-panel reveal-item">
              <div className="mb-4 inline-flex rounded-2xl bg-[var(--accent-soft)] p-3 text-[var(--accent)]">
                <card.icon size={20} />
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                {card.label}
              </p>
              <p className="mt-2 font-display text-xl font-semibold text-[var(--heading)]">
                {card.value}
              </p>
              <p className="mt-1 text-sm text-[var(--text-soft)]">{card.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
