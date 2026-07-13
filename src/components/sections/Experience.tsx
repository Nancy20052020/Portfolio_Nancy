"use client";

import { experience } from "@/data/content";

export function Experience() {
  return (
    <section className="section">
      <div className="section-inner">
        <div className="section-heading reveal-item">
          <p className="eyebrow">Experience</p>
          <h2 className="section-title">Where I&apos;ve been growing</h2>
          <p className="section-sub">
            Scholarships, immersion programs, geospatial internship work, and
            shipping software in industry.
          </p>
        </div>

        <ol className="timeline mt-10 sm:mt-12">
          {experience.map((item) => (
            <li
              key={`${item.role}-${item.org}`}
              className="timeline-item reveal-item"
            >
              <div className="timeline-marker" data-current={item.current} />
              <div className="timeline-card glass-panel">
                <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
                  <h3 className="font-display text-base font-semibold text-[var(--text)] sm:text-lg">
                    {item.role}
                  </h3>
                  <span className="w-fit rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-semibold text-[var(--accent)]">
                    {item.period}
                  </span>
                </div>
                <p className="mt-1 text-sm font-semibold text-[var(--accent)]">
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
