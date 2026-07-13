"use client";

import { ProjectGrid } from "@/components/ProjectGrid";

export function Projects() {
  return (
    <section className="section">
      <div className="section-inner">
        <div className="section-heading reveal-item">
          <p className="eyebrow">Projects</p>
          <h2 className="section-title">Selected work</h2>
          <p className="section-sub">
            From clinical ML and conversational AI to satellite geospatial
            pipelines — each project listed clearly for phone and desktop.
          </p>
        </div>
        <div className="mt-8">
          <ProjectGrid />
        </div>
      </div>
    </section>
  );
}
