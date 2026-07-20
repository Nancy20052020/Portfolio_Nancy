"use client";

import { ProjectGrid } from "@/components/ProjectGrid";

export function Projects() {
  return (
    <section className="section">
      <div className="section-inner">
        <div className="section-heading reveal-item">
          <p className="eyebrow">Projects</p>
          <h2 className="section-title">Projects</h2>
          <p className="section-sub">
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
