"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {
  Boxes,
  Brain,
  Code2,
  Database,
  FileCode2,
  GitBranch,
  Network,
  Palette,
  Sparkles,
  Users,
  Workflow,
  BarChart3,
  MessageCircle,
} from "lucide-react";
import {
  additionalSkills,
  skillsFooter,
  technicalSkills,
  toolSkills,
  type AdditionalSkill,
  type SkillTone,
  type TechnicalSkill,
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
    case "code":
      return <Code2 {...props} />;
    case "python":
      return <FileCode2 {...props} />;
    case "react":
      return <Network {...props} />;
    case "node":
      return <Workflow {...props} />;
    case "database":
      return <Database {...props} />;
    case "git":
      return <GitBranch {...props} />;
  }
}

function ExtraIcon({ icon }: { icon: AdditionalSkill["icon"] }) {
  const props = { size: 15, strokeWidth: 2.2, "aria-hidden": true as const };
  switch (icon) {
    case "cube":
      return <Boxes {...props} />;
    case "users":
      return <Users {...props} />;
    case "brain":
      return <Brain {...props} />;
    case "chart":
      return <BarChart3 {...props} />;
    case "database":
      return <Database {...props} />;
    case "api":
      return <Workflow {...props} />;
    case "html":
      return <Code2 {...props} />;
    case "css":
      return <Palette {...props} />;
    case "js":
      return <FileCode2 {...props} />;
    case "ml":
      return <Sparkles {...props} />;
    case "comms":
      return <MessageCircle {...props} />;
    case "team":
      return <Users {...props} />;
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
            <p className="skills-eyebrow">My Expertise</p>
            <span className="skills-eyebrow-line" aria-hidden />
          </div>
          <h2 className="skills-title">Skills</h2>
          <p className="skills-sub">
            A blend of technical expertise and creative thinking that helps me
            build impactful solutions.
          </p>
          <span className="skills-divider" aria-hidden />
        </div>

        <div className="skills-layout">
          <div className="skills-main">
            <div className="reveal-item">
              <SectionLabel>Technical Skills</SectionLabel>
              <div className="skill-tech-grid">
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
              <SectionLabel>Additional Skills</SectionLabel>
              <div className="skill-extra-grid">
                {additionalSkills.map((skill) => (
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
            <SectionLabel>Tools & Technologies</SectionLabel>
            <div className="skills-tools-panel">
              <div className="skills-tools-row">
                {toolSkills.map((tool) => (
                  <div key={tool.name} className="skills-tool">
                    <div className="skills-tool-icon">
                      <Image
                        src={tool.image}
                        alt=""
                        width={44}
                        height={44}
                        className="skills-tool-img"
                      />
                    </div>
                    <span className="skills-tool-name">{tool.name}</span>
                  </div>
                ))}
              </div>
              <span className="skills-tools-spark" aria-hidden />
            </div>
          </aside>
        </div>

        <div className="skills-footer reveal-item">
          <div className="skills-footer-copy">
            <span className="skills-footer-star" aria-hidden>
              <Sparkles size={22} />
            </span>
            <p>{skillsFooter}</p>
          </div>
          <div className="skills-footer-art">
            <Image
              src="/images/skills-orbit.png"
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 320px"
              className="skills-footer-img"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
