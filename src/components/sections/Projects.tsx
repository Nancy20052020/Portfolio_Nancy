"use client";

import { ProjectGrid } from "@/components/ProjectGrid";
import { SectionAura } from "@/components/SectionAura";

export function Projects() {
  return (
    <section className="section projects-section">
      <SectionAura variant="projects" />
      <div className="section-inner">
        <div className="projects-heading reveal-item">
          <p className="projects-eyebrow">My Work</p>
          <h2 className="projects-title">Projects</h2>
          <p className="projects-sub">
            ML, geospatial analysis, and conversational AI.
          </p>
        </div>
        <div className="mt-8">
          <ProjectGrid />
        </div>
      </div>
    </section>
  );
}
