"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ProjectGrid } from "@/components/ProjectGrid";

export function Projects() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="section">
      <div className="section-inner">
        <motion.div
          className="section-heading"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="eyebrow">Projects</p>
          <h2 className="section-title">Projects</h2>
          <p className="section-sub">
            ML, geospatial analysis, prep tools, and conversational AI.
          </p>
        </motion.div>
        <div className="mt-8">
          <ProjectGrid />
        </div>
      </div>
    </section>
  );
}
