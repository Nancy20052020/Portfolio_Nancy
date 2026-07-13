"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { projects } from "@/data/content";
import { GitHubIcon } from "@/components/icons";

gsap.registerPlugin(useGSAP);

export function ProjectCarousel() {
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  const go = (dir: -1 | 1) => {
    setActive((prev) => (prev + dir + projects.length) % projects.length);
  };

  useGSAP(
    () => {
      if (!trackRef.current) return;
      gsap.to(trackRef.current, {
        xPercent: -active * 100,
        duration: 0.75,
        ease: "power3.inOut",
      });

      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        gsap.to(card, {
          scale: i === active ? 1 : 0.94,
          opacity: i === active ? 1 : 0.55,
          duration: 0.6,
          ease: "power2.out",
        });
      });
    },
    { dependencies: [active] },
  );

  useEffect(() => {
    const id = setInterval(() => go(1), 7000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div ref={trackRef} className="flex will-change-transform">
          {projects.map((project, i) => (
            <article
              key={project.id}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="project-card glass-panel relative min-w-full shrink-0 p-6 md:p-8"
              style={{ ["--card-accent" as string]: project.accent }}
            >
              <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
                <div className="project-orb" />
              </div>

              <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="max-w-xl">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                    Featured project
                  </p>
                  <h3 className="font-display text-2xl font-bold text-[var(--text)] md:text-3xl">
                    {project.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)] md:text-base">
                    {project.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.stack.map((tag) => (
                      <span key={tag} className="skill-chip">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3">
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
                </div>

                <div className="project-preview" aria-hidden>
                  <div className="preview-ring" />
                  <div className="preview-core">
                    <span className="font-display text-4xl font-bold text-white/90">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="flex gap-2">
          {projects.map((p, i) => (
            <button
              key={p.id}
              type="button"
              aria-label={`Go to ${p.title}`}
              onClick={() => setActive(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === active
                  ? "w-8 bg-[var(--accent)]"
                  : "w-2 bg-[var(--border-strong)] hover:bg-[var(--accent-soft)]"
              }`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Previous project"
            onClick={() => go(-1)}
            className="carousel-nav"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            aria-label="Next project"
            onClick={() => go(1)}
            className="carousel-nav"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
