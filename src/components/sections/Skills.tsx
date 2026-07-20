"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {
  Code2,
  FileCode2,
  GitBranch,
  Globe2,
  Map,
  MessageCircle,
  Palette,
  Sparkles,
  Users,
} from "lucide-react";
import {
  machineLearningSkills,
  softSkills,
  skillsSubtitle,
  technicalSkills,
  toolSkills,
  type AdditionalSkill,
  type SkillTone,
  type TechnicalSkill,
  type ToolSkill,
} from "@/data/content";
import { SectionAura } from "@/components/SectionAura";

gsap.registerPlugin(useGSAP);

const toneClass: Record<SkillTone, string> = {
  cyan: "is-cyan",
  purple: "is-purple",
  pink: "is-pink",
};

const tabs = [
  "Languages",
  "Machine Learning",
  "Tools & Technologies",
  "Soft Skills",
] as const;

type Tab = (typeof tabs)[number];

function TechIcon({ icon }: { icon: TechnicalSkill["icon"] }) {
  const props = { size: 22, strokeWidth: 2.1, "aria-hidden": true as const };
  switch (icon) {
    case "python":
      return <FileCode2 {...props} />;
    case "cpp":
      return <Code2 {...props} />;
    case "html":
      return <Globe2 {...props} />;
    case "js":
      return <FileCode2 {...props} />;
    case "css":
      return <Palette {...props} />;
  }
}

function ExtraIcon({ icon }: { icon: AdditionalSkill["icon"] }) {
  const props = { size: 16, strokeWidth: 2.2, "aria-hidden": true as const };
  switch (icon) {
    case "ml":
      return <Sparkles {...props} />;
    case "comms":
      return <MessageCircle {...props} />;
    case "team":
      return <Users {...props} />;
  }
}

function ToolIcon({ icon }: { icon: ToolSkill["icon"] }) {
  const props = { size: 20, strokeWidth: 2.1, "aria-hidden": true as const };
  switch (icon) {
    case "git":
      return <GitBranch {...props} />;
    case "latex":
      return <FileCode2 {...props} />;
    case "colab":
      return <Sparkles {...props} />;
    case "gee":
      return <Globe2 {...props} />;
    case "gis":
      return <Map {...props} />;
  }
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <h3 className="skills-block-label">
      <span className="skills-block-dot" aria-hidden />
      {children}
    </h3>
  );
}

export function Skills() {
  const [active, setActive] = useState<Tab>("Languages");
  const panelRef = useRef<HTMLDivElement>(null);

  const panel = useMemo(() => {
    switch (active) {
      case "Languages":
        return (
          <div className="skill-icon-grid">
            {technicalSkills.map((skill) => (
              <article
                key={skill.name}
                className={`skill-icon-card zero-g depth-enter ${toneClass[skill.tone]}`}
              >
                <div className="skill-tech-icon" aria-hidden>
                  <TechIcon icon={skill.icon} />
                </div>
                <p className="skill-tech-name">{skill.name}</p>
              </article>
            ))}
          </div>
        );
      case "Machine Learning":
        return (
          <div className="skill-extra-grid">
            {machineLearningSkills.map((skill) => (
              <span
                key={skill.name}
                className={`skill-extra-pill zero-g depth-enter ${toneClass[skill.tone]}`}
              >
                <ExtraIcon icon={skill.icon} />
                {skill.name}
              </span>
            ))}
          </div>
        );
      case "Tools & Technologies":
        return (
          <div className="skills-tools-row skills-tools-row-flat">
            {toolSkills.map((tool) => (
              <div key={tool.name} className="skills-tool zero-g depth-enter">
                <div className="skills-tool-icon skills-tool-icon-lucide">
                  <ToolIcon icon={tool.icon} />
                </div>
                <span className="skills-tool-name">{tool.name}</span>
              </div>
            ))}
          </div>
        );
      case "Soft Skills":
        return (
          <div className="skill-extra-grid">
            {softSkills.map((skill) => (
              <span
                key={skill.name}
                className={`skill-extra-pill zero-g depth-enter ${toneClass[skill.tone]}`}
              >
                <ExtraIcon icon={skill.icon} />
                {skill.name}
              </span>
            ))}
          </div>
        );
    }
  }, [active]);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const panel = panelRef.current;
      if (!panel || reduce) return;

      gsap.fromTo(
        panel,
        { opacity: 0, y: 18, rotateX: 8, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          filter: "blur(0px)",
          duration: 0.45,
          ease: "power3.out",
        },
      );
    },
    { dependencies: [active] },
  );

  return (
    <section className="section skills-section">
      <SectionAura variant="skills" />
      <div className="section-inner">
        <div className="skills-heading reveal-item">
          <div className="skills-eyebrow-row">
            <span className="skills-eyebrow-line" aria-hidden />
            <p className="skills-eyebrow">Skills</p>
            <span className="skills-eyebrow-line" aria-hidden />
          </div>
          <h2 className="skills-title">Skills</h2>
          <p className="skills-sub">{skillsSubtitle}</p>
          <span className="skills-divider" aria-hidden />
        </div>

        <div className="skills-tabs-layout reveal-item depth-enter">
          <div className="skills-tabs" role="tablist" aria-label="Skill categories">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={active === tab}
                className={`skills-tab${active === tab ? " is-active" : ""}`}
                onClick={() => setActive(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div
            ref={panelRef}
            className="skills-panel glass-panel skills-panel-3d"
            role="tabpanel"
          >
            <SectionLabel>{active}</SectionLabel>
            {panel}
          </div>
        </div>
      </div>
    </section>
  );
}
