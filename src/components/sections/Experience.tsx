"use client";

import { experience } from "@/data/content";

const years = [...new Set(experience.map((item) => item.year))];

export function Experience() {
  return (
    <section className="section">
      <div className="section-inner">
        <div className="section-heading reveal-item">
          <p className="eyebrow">Journey</p>
          <h2 className="section-title">Journey</h2>
          <p className="section-sub">
            A clear look at internships, scholarships, and programs across the
            years.
          </p>
        </div>

        <div className="journey-chapters mt-10">
          {years.map((year, yearIndex) => {
            const items = experience.filter((item) => item.year === year);
            return (
              <div
                key={year}
                className={`journey-chapter reveal-item ${
                  yearIndex % 2 === 1 ? "journey-chapter-alt" : ""
                }`}
              >
                <div className="journey-year-rail" aria-hidden>
                  <span className="journey-year-badge">{year}</span>
                  <span className="journey-year-line" />
                </div>

                <div className="journey-chapter-body">
                  <p className="journey-chapter-label">
                    {year === "2026" ? "Industry & geospatial" : "Scholarships & immersion"}
                  </p>
                  <div className="journey-cards">
                    {items.map((item) => (
                      <article
                        key={`${item.role}-${item.org}`}
                        className="journey-card glass-panel"
                      >
                        <div className="journey-card-top">
                          <h3>{item.role}</h3>
                          {item.current && (
                            <span className="journey-now">Current</span>
                          )}
                        </div>
                        <p className="journey-org">{item.org}</p>
                        <p className="journey-period">{item.period}</p>
                        <p className="journey-desc">{item.description}</p>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
