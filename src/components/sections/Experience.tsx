"use client";

import { experience } from "@/data/content";

export function Experience() {
  return (
    <section id="experience" className="section section-alt">
      <div className="section-inner">
        <div className="section-heading reveal-item">
          <p className="eyebrow">Experience</p>
          <h2 className="section-title">Where I&apos;ve been growing</h2>
          <p className="section-sub">
            Scholarships, immersion programs, geospatial internship work, and
            shipping software in industry.
          </p>
        </div>

        <ol className="timeline mt-12">
          {experience.map((item) => (
            <li key={`${item.role}-${item.org}`} className="timeline-item reveal-item">
              <div className="timeline-marker" data-current={item.current} />
              <div className="timeline-card glass-panel">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-display text-lg font-semibold text-[var(--text)]">
                    {item.role}
                  </h3>
                  <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-medium text-[var(--accent)]">
                    {item.period}
                  </span>
                </div>
                <p className="mt-1 text-sm font-medium text-[var(--accent)]">
                  {item.org}
                  {item.current ? " · Current" : ""}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[var(--text-soft)]">
                  {item.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
