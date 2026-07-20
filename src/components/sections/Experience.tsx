"use client";

import {
  Award,
  Briefcase,
  CalendarDays,
  Rocket,
  Satellite,
} from "lucide-react";
import { experience, type ExperienceItem } from "@/data/content";
import { SectionAura } from "@/components/SectionAura";

const toneClass = {
  cyan: "is-cyan",
  purple: "is-purple",
  pink: "is-pink",
} as const;

function ExperienceIcon({ icon }: { icon: ExperienceItem["icon"] }) {
  const props = { size: 18, strokeWidth: 2.1, "aria-hidden": true as const };
  switch (icon) {
    case "briefcase":
      return <Briefcase {...props} />;
    case "satellite":
      return <Satellite {...props} />;
    case "google":
      return <span className="exp-google-g">G</span>;
    case "award":
      return <Award {...props} />;
    case "rocket":
      return <Rocket {...props} />;
  }
}

export function Experience() {
  return (
    <section className="section exp-section">
      <SectionAura variant="experience" />
      <div className="section-inner">
        <div className="exp-heading">
          <p className="exp-eyebrow">Experience</p>
          <h2 className="exp-title">
            My <span className="exp-title-accent">Professional Journey</span>
          </h2>
          <p className="exp-sub">
            Internships, scholarships, and programs along one clear path.
          </p>
        </div>

        <div className="exp-journey mt-10">
          <span className="exp-journey-glow" aria-hidden />
          <ol className="exp-journey-list">
            {experience.map((item, index) => (
              <li
                key={`${item.role}-${item.org}`}
                className={`exp-journey-item ${toneClass[item.tone]}`}
              >
                <div className="exp-rail" aria-hidden>
                  {index === 0 && <span className="exp-rail-pedestal" />}
                  <span className="exp-hex">
                    <ExperienceIcon icon={item.icon} />
                  </span>
                  {index < experience.length - 1 && (
                    <span className="exp-rail-connector" />
                  )}
                </div>

                <article className="exp-card">
                  <div className="exp-card-main">
                    <h3 className="exp-card-org">{item.org}</h3>
                    <p className="exp-card-role">
                      {item.role}
                      {item.current ? " · Current" : ""}
                    </p>
                    <p className="exp-card-desc">{item.description}</p>
                  </div>

                  <div className="exp-card-side">
                    <span className="exp-card-cal" aria-hidden>
                      <CalendarDays size={14} strokeWidth={2.2} />
                    </span>
                    <p className="exp-card-period">{item.period}</p>
                    <p className="exp-card-location">{item.location}</p>
                  </div>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
