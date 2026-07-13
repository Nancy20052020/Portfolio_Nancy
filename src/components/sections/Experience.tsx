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
            Internships, scholarships, and programs along one clear path.
          </p>
        </div>

        <ol className="exp-timeline mt-10">
          {experience.map((item) => (
            <li
              key={`${item.role}-${item.org}`}
              className="exp-timeline-item reveal-item"
            >
              <span
                className="exp-timeline-dot"
                data-current={item.current}
                aria-hidden
              />
              <div className="exp-timeline-content">
                <div className="exp-timeline-meta">
                  <span className="exp-timeline-period">{item.period}</span>
                  {item.current && (
                    <span className="exp-timeline-now">Current</span>
                  )}
                </div>
                <h3 className="exp-timeline-role">{item.role}</h3>
                <p className="exp-timeline-org">{item.org}</p>
                <p className="exp-timeline-desc">{item.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
