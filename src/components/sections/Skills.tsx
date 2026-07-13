"use client";

import { skills } from "@/data/content";
import { TechObject } from "@/components/TechObjects";

export function Skills() {
  return (
    <section className="section skills-section">
      <div className="section-inner">
        <div className="section-heading reveal-item">
          <p className="eyebrow">Skills</p>
          <h2 className="section-title">Skills</h2>
          <p className="section-sub">
            Languages, ML frameworks, tools, and soft skills I use to build.
          </p>
        </div>

        <div className="mt-10 space-y-10">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} className="reveal-item">
              <h3 className="mb-4 font-display text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                {category}
              </h3>
              <div className="skills-float-grid">
                {items.map((item) => (
                  <TechObject key={item.name} item={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
