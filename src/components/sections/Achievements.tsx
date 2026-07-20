"use client";

import {
  Award,
  Code2,
  Flame,
  Heart,
  Mountain,
  Sparkles,
  Star,
  Target,
  Trophy,
  TrendingUp,
} from "lucide-react";
import { achievements } from "@/data/content";
import { SectionAura } from "@/components/SectionAura";

const iconMap = {
  trophy: Trophy,
  star: Star,
  code: Code2,
  award: Award,
};

const toneClass = ["is-cyan", "is-purple", "is-teal", "is-pink"] as const;

const footerTraits = [
  { label: "Dedication", icon: Mountain },
  { label: "Perseverance", icon: Flame },
  { label: "Passion", icon: Heart },
  { label: "Growth", icon: TrendingUp },
  { label: "Impact", icon: Target },
];

export function Achievements() {
  return (
    <section className="section achieve-section">
      <SectionAura variant="achievements" />
      <div className="section-inner">
        <div className="achieve-top reveal-item">
          <div className="achieve-heading">
            <h2 className="achieve-title">Achievements</h2>
            <p className="achieve-sub">
              Academic excellence, scholarships, commits, and hackathon finishes.
            </p>
          </div>

          <blockquote className="achieve-quote">
            <Sparkles className="achieve-quote-mark" size={22} aria-hidden />
            <p>
              Achievements are the evidence of commitment, consistency, and
              courage to go beyond limits.
            </p>
          </blockquote>
        </div>

        <div className="achieve-track reveal-item">
          <span className="achieve-track-line track-draw" aria-hidden />
          <div className="achieve-cards">
            {achievements.map((item, index) => {
              const Icon = iconMap[item.icon];
              const tone = toneClass[index % toneClass.length];
              const number = String(index + 1).padStart(2, "0");
              return (
                <article
                  key={item.title}
                  className={`achieve-card zero-g scroll-3d depth-enter ${tone}`}
                >
                  <span className="achieve-card-icon" aria-hidden>
                    <Icon size={18} strokeWidth={2.2} />
                  </span>
                  <p className="achieve-card-num">{number}</p>
                  <h3 className="achieve-card-title">{item.title}</h3>
                  <p className="achieve-card-detail">{item.detail}</p>
                  <span className="achieve-card-arrows" aria-hidden>
                    {">>>"}
                  </span>
                </article>
              );
            })}
          </div>
        </div>

        <div className="achieve-footer reveal-item scroll-reveal" aria-label="Core traits">
          {footerTraits.map((trait) => (
            <span key={trait.label} className="achieve-footer-item zero-g depth-enter">
              <trait.icon size={14} strokeWidth={2.2} aria-hidden />
              {trait.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
