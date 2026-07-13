"use client";

import { skills } from "@/data/content";

export function Skills() {
  return (
    <section id="skills" className="section section-alt">
      <div className="section-inner">
        <div className="section-heading reveal-item">
          <p className="eyebrow">Skills</p>
          <h2 className="section-title">Tools I think and build with</h2>
          <p className="section-sub">
            A focused stack spanning languages, ML frameworks, geospatial tools,
            and the soft skills that make collaboration click.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} className="skill-column reveal-item">
              <h3 className="mb-4 font-display text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                {category}
              </h3>
              <ul className="flex flex-col gap-2">
                {items.map((item) => (
                  <li key={item} className="skill-row glass-panel">
                    <span className="skill-dot" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
