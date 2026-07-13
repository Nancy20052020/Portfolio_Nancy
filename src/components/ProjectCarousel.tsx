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
  const touchStartX = useRef<number | null>(null);

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
          scale: i === active ? 1 : 0.96,
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
      <div
        className="overflow-hidden touch-pan-y"
        onTouchStart={(e) => {
          touchStartX.current = e.touches[0]?.clientX ?? null;
        }}
        onTouchEnd={(e) => {
          if (touchStartX.current == null) return;
          const delta = (e.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
          touchStartX.current = null;
          if (Math.abs(delta) < 48) return;
          go(delta < 0 ? 1 : -1);
        }}
      >
        <div ref={trackRef} className="flex will-change-transform">
          {projects.map((project, i) => (
            <article
              key={project.id}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="project-card glass-panel relative min-w-full shrink-0 p-5 sm:p-6 md:p-8"
              style={{ ["--card-accent" as string]: project.accent }}
            >
              <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
                <div className="project-orb" />
              </div>

              <div className="relative z-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between md:gap-6">
                <div className="min-w-0 max-w-xl">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                    Featured project
                  </p>
                  <h3 className="font-display text-xl font-bold text-[var(--text)] sm:text-2xl md:text-3xl">
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
                  <div className="mt-5 flex flex-wrap gap-2 sm:gap-3">
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

                <div className="project-preview mx-auto md:mx-0" aria-hidden>
                  <div className="preview-ring" />
                  <div className="preview-core">
                    <span className="font-display text-3xl font-bold text-white/90 sm:text-4xl">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3 sm:mt-6">
        <div className="flex gap-2">
          {projects.map((p, i) => (
            <button
              key={p.id}
              type="button"
              aria-label={`Go to ${p.title}`}
              onClick={() => setActive(i)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                i === active
                  ? "w-8 bg-[var(--accent)]"
                  : "w-2.5 bg-[var(--border-strong)] hover:bg-[var(--accent-soft)]"
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
