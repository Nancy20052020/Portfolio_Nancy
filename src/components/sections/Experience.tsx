"use client";

import { experience } from "@/data/content";

export function Experience() {
  return (
    <section className="section">
      <div className="section-inner">
        <div className="section-heading reveal-item">
          <p className="eyebrow">Experience</p>
          <h2 className="section-title">Experience</h2>
          <p className="section-sub">
            Internships, scholarships, and programs that shaped my work in AI,
            software, and geospatial tech.
          </p>
        </div>

        <div className="experience-list mt-10">
          {experience.map((item) => (
            <article
              key={`${item.role}-${item.org}`}
              className="experience-card glass-panel reveal-item"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="font-display text-lg font-semibold text-[var(--heading)]">
                    {item.role}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-[var(--accent)]">
                    {item.org}
                    {item.current ? " · Current" : ""}
                  </p>
                </div>
                <span className="w-fit rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-semibold text-[var(--accent)]">
                  {item.period}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[var(--text-soft)]">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
