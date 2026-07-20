"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ExternalLink, Rocket } from "lucide-react";
import { projectFilters, projects, type Project } from "@/data/content";

function primaryLink(project: Project) {
  return project.links.demo ?? project.links.github ?? project.links.code;
}

function actionLabel(project: Project) {
  if (project.links.demo) return "Live Demo";
  if (project.links.github) return "View Code";
  if (project.links.code) return "Earth Engine";
  return "View";
}

export function ProjectGrid() {
  const pathname = usePathname();
  const [active, setActive] = useState<(typeof projectFilters)[number]>("All");

  const filtered = useMemo(() => {
    if (active === "All") return projects;
    return projects.filter((project) => project.categories.includes(active));
  }, [active]);

  const viewAllHref =
    pathname === "/projects"
      ? "https://github.com/Nancy20052020"
      : "/projects";
  const viewAllExternal = viewAllHref.startsWith("http");

  return (
    <div className="projects-showcase">
      <div className="project-filters" role="tablist" aria-label="Project filters">
        {projectFilters.map((filter) => (
          <button
            key={filter}
            type="button"
            role="tab"
            aria-selected={active === filter}
            className={`project-filter${active === filter ? " is-active" : ""}`}
            onClick={() => setActive(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="project-grid">
        {filtered.map((project) => {
          const href = primaryLink(project);
          return (
            <article key={project.id} className="project-card reveal-item">
              <div className="project-media">
                <Image
                  src={project.image}
                  alt={`${project.title} preview`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="project-media-img"
                />
                {project.featured && (
                  <span className="project-featured">Featured</span>
                )}
              </div>

              <div className="project-body">
                <div className="project-tags">
                  {project.tags.map((tag, i) => (
                    <span
                      key={tag}
                      className={`project-tag${i % 2 === 1 ? " is-alt" : ""}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.description}</p>

                <div className="project-stack">
                  {project.stack.map((tech) => (
                    <span key={tech} className="project-stack-item">
                      <span
                        className="project-stack-dot"
                        style={{ background: project.accent }}
                        aria-hidden
                      />
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="project-footer">
                  {href ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="project-live"
                    >
                      {actionLabel(project)}
                      <ExternalLink size={14} aria-hidden />
                    </a>
                  ) : (
                    <span className="project-live is-disabled">Coming soon</span>
                  )}

                  {href && (
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="project-arrow"
                      aria-label={`Open ${project.title}`}
                    >
                      <ArrowRight size={18} />
                    </a>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p className="project-empty">No projects in this category yet.</p>
      )}

      <div className="project-view-all-wrap">
        {viewAllExternal ? (
          <a
            href={viewAllHref}
            target="_blank"
            rel="noreferrer"
            className="project-view-all"
          >
            <Rocket size={18} aria-hidden />
            View All Projects
            <ArrowRight size={18} aria-hidden />
          </a>
        ) : (
          <Link href={viewAllHref} className="project-view-all">
            <Rocket size={18} aria-hidden />
            View All Projects
            <ArrowRight size={18} aria-hidden />
          </Link>
        )}
      </div>
    </div>
  );
}
