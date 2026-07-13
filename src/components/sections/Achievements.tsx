"use client";

import { Trophy, Star, Code2, Award } from "lucide-react";
import { achievements } from "@/data/content";

const iconMap = {
  trophy: Trophy,
  star: Star,
  code: Code2,
  award: Award,
};

export function Achievements() {
  return (
    <section id="achievements" className="section">
      <div className="section-inner">
        <div className="section-heading reveal-item">
          <p className="eyebrow">Achievements</p>
          <h2 className="section-title">Milestones that matter</h2>
          <p className="section-sub">
            Academic excellence, scholarships, consistent engineering craft, and
            competitive hackathon finishes.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {achievements.map((item) => {
            const Icon = iconMap[item.icon];
            return (
              <div
                key={item.title}
                className="achievement-card glass-panel reveal-item"
              >
                <div className="achievement-icon">
                  <Icon size={22} />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-[var(--text)]">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm text-[var(--text-soft)]">
                    {item.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
