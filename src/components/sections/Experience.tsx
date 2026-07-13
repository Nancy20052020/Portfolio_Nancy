"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experiencePortals } from "@/data/content";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function Experience() {
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const track = trackRef.current;
      if (!root || !track) return;

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const portals = gsap.utils.toArray<HTMLElement>(".experience-portal");

      if (prefersReduced) return;

      const getDistance = () =>
        Math.max(track.scrollWidth - window.innerWidth + 48, 0);

      const tween = gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: () => `+=${getDistance() + window.innerHeight * 0.55}`,
          pin: true,
          scrub: 1.1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      portals.forEach((portal, i) => {
        gsap.fromTo(
          portal.querySelector(".portal-ring"),
          { rotate: i % 2 === 0 ? -20 : 20, scale: 0.85 },
          {
            rotate: 0,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: () => `+=${getDistance() + window.innerHeight * 0.55}`,
              scrub: true,
            },
          },
        );

        gsap.fromTo(
          portal,
          { y: 40, opacity: 0.45 },
          {
            y: 0,
            opacity: 1,
            ease: "power1.out",
            scrollTrigger: {
              trigger: root,
              containerAnimation: tween,
              start: "left 85%",
              end: "left 40%",
              scrub: true,
            },
          },
        );
      });
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} className="portal-journey-section">
      <div className="section-inner portal-intro reveal-item">
        <p className="eyebrow">Experience</p>
        <h2 className="section-title">Portal journey</h2>
        <p className="section-sub">
          Scroll to walk through floating year-portals — each gateway holds a
          chapter of work, scholarships, and growth.
        </p>
      </div>

      <div className="portal-stage">
        <div ref={trackRef} className="portal-track">
          {experiencePortals.map((portal) => (
            <article key={portal.year} className="experience-portal">
              <div className="portal-ring" aria-hidden>
                <span />
                <span />
                <span />
              </div>
              <div className="portal-core glass-panel">
                <p className="portal-year">{portal.year}</p>
                <p className="portal-label">{portal.label}</p>
                <ul className="portal-list">
                  {portal.items.map((item) => (
                    <li key={`${item.role}-${item.org}`}>
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3>{item.role}</h3>
                        {item.current && <span className="now-pill">Now</span>}
                      </div>
                      <p className="portal-org">{item.org}</p>
                      <p className="portal-period">{item.period}</p>
                      <p className="portal-desc">{item.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
