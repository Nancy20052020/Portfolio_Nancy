"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {
  Code2,
  Heart,
  Lightbulb,
  Puzzle,
  Rocket,
  Sparkles,
  Star,
  Target,
} from "lucide-react";
import { aboutContent } from "@/data/content";

gsap.registerPlugin(useGSAP);

const toneClass = {
  cyan: "is-cyan",
  purple: "is-purple",
  pink: "is-pink",
  magenta: "is-magenta",
  white: "is-white",
} as const;

const nodeTone: Record<(typeof aboutContent.traits)[number]["tone"], string> = {
  cyan: "n-cyan",
  purple: "n-purple",
  pink: "n-pink",
};

function StatIcon({ icon }: { icon: (typeof aboutContent.stats)[number]["icon"] }) {
  const props = { size: 18, strokeWidth: 2.2, "aria-hidden": true as const };
  switch (icon) {
    case "code":
      return <Code2 {...props} />;
    case "rocket":
      return <Rocket {...props} />;
    case "gear":
      return <Sparkles {...props} />;
    case "heart":
      return <Heart {...props} />;
  }
}

function ValueIcon({
  icon,
}: {
  icon: (typeof aboutContent.values)[number]["icon"];
}) {
  const props = { size: 20, strokeWidth: 2.1, "aria-hidden": true as const };
  switch (icon) {
    case "bulb":
      return <Lightbulb {...props} />;
    case "puzzle":
      return <Puzzle {...props} />;
    case "target":
      return <Target {...props} />;
  }
}

function TraitIcon({
  icon,
}: {
  icon: (typeof aboutContent.traits)[number]["icon"];
}) {
  const props = { size: 16, strokeWidth: 2.2, "aria-hidden": true as const };
  switch (icon) {
    case "rocket":
      return <Rocket {...props} />;
    case "code":
      return <Code2 {...props} />;
    case "heart":
      return <Heart {...props} />;
    case "star":
      return <Star {...props} />;
  }
}

export function About() {
  const rootRef = useRef<HTMLElement>(null);
  const [activeTrait, setActiveTrait] = useState<string | null>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;

      gsap.to(".about-orbit-ring", {
        rotate: 360,
        duration: 28,
        repeat: -1,
        ease: "none",
        stagger: { each: 4, from: "end" },
      });

      gsap.to(".about-core-glow", {
        scale: 1.08,
        opacity: 0.95,
        duration: 2.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} className="section about-section">
      <div className="section-inner about-layout">
        <div className="about-copy">
          <div className="about-heading reveal-item">
            <div className="about-eyebrow-row">
              <p className="about-eyebrow">About Me</p>
              <span className="about-eyebrow-line" aria-hidden />
            </div>
            <h2 className="about-headline">
              {aboutContent.headline.map((line) => (
                <span key={line.text} className={toneClass[line.tone]}>
                  {line.text}
                </span>
              ))}
            </h2>
            <p className="about-intro">
              {aboutContent.introBefore}
              <span className="about-highlight">{aboutContent.introHighlight}</span>
              {aboutContent.introAfter}
            </p>
          </div>

          <div className="about-stats reveal-item">
            {aboutContent.stats.map((stat) => (
              <article
                key={stat.label}
                className={`about-stat ${toneClass[stat.tone]}`}
              >
                <span className="about-stat-icon">
                  <StatIcon icon={stat.icon} />
                </span>
                <p className="about-stat-value">{stat.value}</p>
                <p className="about-stat-label">{stat.label}</p>
              </article>
            ))}
          </div>

          <div className="about-values reveal-item">
            {aboutContent.values.map((value) => (
              <article
                key={value.title}
                className={`about-value ${toneClass[value.tone]}`}
              >
                <span className="about-value-icon">
                  <ValueIcon icon={value.icon} />
                </span>
                <h3 className="about-value-title">{value.title}</h3>
                <p className="about-value-text">{value.text}</p>
              </article>
            ))}
          </div>

          <blockquote className="about-quote reveal-item">
            <span className="about-quote-mark" aria-hidden>
              “”
            </span>
            <p>
              {aboutContent.quoteBefore}
              <span className="about-quote-accent">
                {aboutContent.quoteHighlight}
              </span>
              .
            </p>
            <span className="about-quote-dots" aria-hidden />
          </blockquote>
        </div>

        <div className="about-visual reveal-item">
          <p className="about-orbit-hint">Hover or tap a glowing dot</p>
          <div className="about-orbit">
            <span className="about-orbit-ring ring-1" aria-hidden />
            <span className="about-orbit-ring ring-2" aria-hidden />
            <span className="about-orbit-ring ring-3" aria-hidden />
            <span className="about-orbit-node n5 is-decor" aria-hidden />

            <div className="about-core" aria-hidden>
              <span className="about-core-glow" />
              <Star className="about-core-star" size={28} strokeWidth={1.8} />
            </div>

            {aboutContent.traits.map((trait, index) => {
              const isActive = activeTrait === trait.title;
              const nodeClass = `about-node-wrap pos-${trait.position}`;
              return (
                <div key={trait.title} className={nodeClass}>
                  <button
                    type="button"
                    className={`about-orbit-node is-interactive ${nodeTone[trait.tone]} n${index + 1}${isActive ? " is-active" : ""}`}
                    aria-expanded={isActive}
                    aria-controls={`about-trait-${trait.title}`}
                    aria-label={trait.title}
                    onPointerEnter={(event) => {
                      if (event.pointerType === "mouse") {
                        setActiveTrait(trait.title);
                      }
                    }}
                    onPointerLeave={(event) => {
                      if (event.pointerType === "mouse") {
                        setActiveTrait(null);
                      }
                    }}
                    onFocus={() => setActiveTrait(trait.title)}
                    onBlur={() => setActiveTrait(null)}
                    onClick={() =>
                      setActiveTrait((current) =>
                        current === trait.title ? null : trait.title,
                      )
                    }
                  />
                  <article
                    id={`about-trait-${trait.title}`}
                    className={`about-trait ${toneClass[trait.tone]}${isActive ? " is-visible" : ""}`}
                  >
                    <span className="about-trait-icon">
                      <TraitIcon icon={trait.icon} />
                    </span>
                    <div>
                      <h3 className="about-trait-title">{trait.title}</h3>
                      <p className="about-trait-text">{trait.text}</p>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>

          <span className="about-dot-grid" aria-hidden />
        </div>
      </div>
    </section>
  );
}
