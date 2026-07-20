"use client";

import type { ReactNode } from "react";
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

const toneClass: Record<SkillTone, string> = {
  cyan: "is-cyan",
  purple: "is-purple",
  pink: "is-pink",
};

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

        <div className="skills-all-layout reveal-item depth-enter">
          <div className="skills-block glass-panel skills-panel-3d">
            <SectionLabel>Languages</SectionLabel>
            <div className="skill-icon-grid">
              {technicalSkills.map((skill) => (
                <article
                  key={skill.name}
                  className={`skill-icon-card ${toneClass[skill.tone]}`}
                >
                  <div className="skill-tech-icon" aria-hidden>
                    <TechIcon icon={skill.icon} />
                  </div>
                  <p className="skill-tech-name">{skill.name}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="skills-block glass-panel skills-panel-3d">
            <SectionLabel>Machine Learning</SectionLabel>
            <div className="skill-extra-grid">
              {machineLearningSkills.map((skill) => (
                <span
                  key={skill.name}
                  className={`skill-extra-pill ${toneClass[skill.tone]}`}
                >
                  <ExtraIcon icon={skill.icon} />
                  {skill.name}
                </span>
              ))}
            </div>
          </div>

          <div className="skills-block glass-panel skills-panel-3d">
            <SectionLabel>Tools & Technologies</SectionLabel>
            <div className="skills-tools-row skills-tools-row-flat">
              {toolSkills.map((tool) => (
                <div key={tool.name} className="skills-tool">
                  <div className="skills-tool-icon skills-tool-icon-lucide">
                    <ToolIcon icon={tool.icon} />
                  </div>
                  <span className="skills-tool-name">{tool.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="skills-block glass-panel skills-panel-3d">
            <SectionLabel>Soft Skills</SectionLabel>
            <div className="skill-extra-grid">
              {softSkills.map((skill) => (
                <span
                  key={skill.name}
                  className={`skill-extra-pill ${toneClass[skill.tone]}`}
                >
                  <ExtraIcon icon={skill.icon} />
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
