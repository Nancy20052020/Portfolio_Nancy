"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Code2, Heart, Rocket, Sparkles, Star } from "lucide-react";
import { aboutContent } from "@/data/content";
import { SectionAura } from "@/components/SectionAura";

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

function EduIcon({
  icon,
}: {
  icon: (typeof aboutContent.education)[number]["icon"];
}) {
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
  const orbitRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      const orbit = orbitRef.current;
      if (!orbit) return;
      if (!orbit.contains(event.target as Node)) {
        setActiveTrait(null);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  return (
    <section ref={rootRef} className="section about-section">
      <SectionAura variant="about" />
      <div className="section-inner about-layout">
        <div className="about-copy">
          <div className="about-heading reveal-item">
            <div className="about-eyebrow-row">
              <p className="about-eyebrow">About</p>
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
            {aboutContent.education.map((item) => (
              <article
                key={item.label}
                className={`about-stat ${toneClass[item.tone]}`}
              >
                <span className="about-stat-icon">
                  <EduIcon icon={item.icon} />
                </span>
                <p className="about-stat-value">{item.value}</p>
                <p className="about-stat-label">{item.label}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="about-visual reveal-item">
          <p className="about-orbit-hint">Tap a glowing dot</p>
          <div ref={orbitRef} className="about-orbit">
            <span className="about-orbit-ring ring-1" aria-hidden />
            <span className="about-orbit-ring ring-2" aria-hidden />
            <span className="about-orbit-ring ring-3" aria-hidden />

            <div className="about-core" aria-hidden>
              <span className="about-core-glow" />
              <Image
                src="/images/about-portrait.png"
                alt=""
                fill
                sizes="120px"
                className="about-core-img"
              />
            </div>

            {aboutContent.traits.map((trait, index) => {
              const isActive = activeTrait === trait.title;
              return (
                <div
                  key={trait.title}
                  className={`about-node-wrap pos-${trait.position}`}
                >
                  <button
                    type="button"
                    className={`about-orbit-node is-interactive ${nodeTone[trait.tone]} n${index + 1}${isActive ? " is-active" : ""}`}
                    aria-expanded={isActive}
                    aria-controls={`about-trait-${trait.title}`}
                    aria-label={trait.title}
                    onMouseEnter={() => setActiveTrait(trait.title)}
                    onMouseLeave={() => setActiveTrait(null)}
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      setActiveTrait((current) =>
                        current === trait.title ? null : trait.title,
                      );
                    }}
                    onTouchEnd={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      setActiveTrait((current) =>
                        current === trait.title ? null : trait.title,
                      );
                    }}
                  />
                  <article
                    id={`about-trait-${trait.title}`}
                    className={`about-trait glass-panel ${toneClass[trait.tone]}${isActive ? " is-visible" : ""}`}
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
