"use client";

import { ProjectCarousel } from "@/components/ProjectCarousel";

export function Projects() {
  return (
    <section id="projects" className="section">
      <div className="section-inner">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4 reveal-item">
          <div className="section-heading !mb-0">
            <p className="eyebrow">Projects</p>
            <h2 className="section-title">Selected work</h2>
            <p className="section-sub">
              From clinical ML and conversational AI to satellite geospatial
              pipelines — swipe through the highlights.
            </p>
          </div>
          <a href="#contact" className="text-sm font-medium text-[var(--accent)] hover:underline">
            View all via contact →
          </a>
        </div>
        <div className="reveal-item">
          <ProjectCarousel />
        </div>
      </div>
    </section>
  );
}
