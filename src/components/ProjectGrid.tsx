"use client";

import { ExternalLink } from "lucide-react";
import { projects } from "@/data/content";
import { GitHubIcon } from "@/components/icons";

export function ProjectGrid() {
  return (
    <div className="project-grid">
      {projects.map((project, i) => (
        <article
          key={project.id}
          className="project-card-v2 glass-panel reveal-item"
          style={{ ["--card-accent" as string]: project.accent }}
        >
          <div className="project-card-top">
            <span className="project-index">{String(i + 1).padStart(2, "0")}</span>
            <p className="project-kicker">Featured project</p>
          </div>

          <h3 className="project-title">{project.title}</h3>
          <p className="project-desc">{project.description}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {project.stack.map((tag) => (
              <span key={tag} className="skill-chip">
                {tag}
              </span>
            ))}
          </div>

          <div className="project-actions">
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noreferrer"
                className="btn-ghost"
              >
                <GitHubIcon size={16} />
                GitHub
              </a>
            )}
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noreferrer"
                className="btn-ghost"
              >
                <ExternalLink size={16} />
                Demo
              </a>
            )}
            {project.links.code && (
              <a
                href={project.links.code}
                target="_blank"
                rel="noreferrer"
                className="btn-ghost"
              >
                <ExternalLink size={16} />
                Earth Engine
              </a>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
