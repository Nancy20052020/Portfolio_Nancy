"use client";

import { ExternalLink } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { projects } from "@/data/content";
import { GitHubIcon } from "@/components/icons";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export function ProjectGrid() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="project-grid"
      variants={reduceMotion ? undefined : containerVariants}
      initial={reduceMotion ? false : "hidden"}
      whileInView={reduceMotion ? undefined : "show"}
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -8% 0px" }}
    >
      {projects.map((project, i) => (
        <motion.article
          key={project.id}
          className="project-card-v2 glass-panel"
          style={{ ["--card-accent" as string]: project.accent }}
          variants={reduceMotion ? undefined : cardVariants}
          initial={reduceMotion ? false : undefined}
        >
          <div className="project-media" aria-hidden>
            <div className="project-media-inner">
              <span className="project-media-index">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="project-media-glow" />
            </div>
          </div>

          <div className="project-card-body">
            <div className="project-card-top">
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
                  className="btn-ghost project-cta"
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
                  className="btn-ghost project-cta"
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
                  className="btn-ghost project-cta"
                >
                  <ExternalLink size={16} />
                  Earth Engine
                </a>
              )}
            </div>
          </div>
        </motion.article>
      ))}
    </motion.div>
  );
}
