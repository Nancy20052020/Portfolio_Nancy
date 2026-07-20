"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {
  Code2,
  FileCode2,
  GitBranch,
  Globe2,
  MessageCircle,
  Network,
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

gsap.registerPlugin(useGSAP);

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
  const props = { size: 15, strokeWidth: 2.2, "aria-hidden": true as const };
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
    case "react":
      return <Network {...props} />;
    case "latex":
      return <FileCode2 {...props} />;
    case "colab":
      return <Sparkles {...props} />;
    case "gee":
      return <Globe2 {...props} />;
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
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const fills = gsap.utils.toArray<HTMLElement>(".skill-meter-fill");
      if (reduce) {
        fills.forEach((el) => {
          el.style.width = `${el.dataset.level ?? 0}%`;
        });
        return;
      }

      gsap.from(".skill-tech-card", {
        y: 24,
        opacity: 0,
        duration: 0.55,
        stagger: 0.07,
        ease: "power3.out",
      });

      fills.forEach((el) => {
        gsap.fromTo(
          el,
          { width: "0%" },
          {
            width: `${el.dataset.level ?? 0}%`,
            duration: 1.1,
            ease: "power2.out",
            delay: 0.2,
          },
        );
      });
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} className="section skills-section">
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

        <div className="skills-layout">
          <div className="skills-main">
            <div className="reveal-item">
              <SectionLabel>Languages</SectionLabel>
              <div className="skill-tech-grid skill-tech-grid-5">
                {technicalSkills.map((skill) => (
                  <article
                    key={skill.name}
                    className={`skill-tech-card ${toneClass[skill.tone]}`}
                  >
                    <div className="skill-tech-icon" aria-hidden>
                      <TechIcon icon={skill.icon} />
                    </div>
                    <p className="skill-tech-name">{skill.name}</p>
                    <div
                      className="skill-meter"
                      role="meter"
                      aria-valuenow={skill.level}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`${skill.name} proficiency`}
                    >
                      <span
                        className="skill-meter-fill"
                        data-level={skill.level}
                      />
                    </div>
                    <p className="skill-tech-level">{skill.level}%</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="reveal-item skills-additional-block">
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

            <div className="reveal-item">
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

          <aside className="skills-side reveal-item">
            <SectionLabel>Tools</SectionLabel>
            <div className="skills-tools-panel">
              <div className="skills-tools-row">
                {toolSkills.map((tool) => (
                  <div key={tool.name} className="skills-tool">
                    <div className="skills-tool-icon skills-tool-icon-lucide">
                      <ToolIcon icon={tool.icon} />
                    </div>
                    <span className="skills-tool-name">{tool.name}</span>
                  </div>
                ))}
              </div>
              <span className="skills-tools-spark" aria-hidden />
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
