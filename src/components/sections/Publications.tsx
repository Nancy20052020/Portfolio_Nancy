"use client";

import { ArrowUpRight } from "lucide-react";
import { publications } from "@/data/content";
import { SectionAura } from "@/components/SectionAura";

export function Publications() {
  return (
    <section className="section pubs-section">
      <SectionAura variant="publications" />
      <div className="section-inner">
        <div className="pubs-heading reveal-item">
          <p className="pubs-eyebrow">Publications</p>
          <h2 className="pubs-title">Publications</h2>
          <p className="pubs-sub">
            Peer-reviewed deep learning research and a multi-country patent.
          </p>
        </div>

        <div className="pubs-layout pubs-layout-single mt-10">
          <div className="pubs-list">
            {publications.map((pub) => {
              const primary = Object.entries(pub.links)[0];
              return (
                <article
                  key={pub.title}
                  className="pub-card glass-panel reveal-item"
                >
                  <p className="pub-venue">{pub.venue}</p>
                  <h3 className="pub-title">{pub.title}</h3>
                  <p className="pub-desc">{pub.description}</p>
                  {primary && (
                    <a
                      href={primary[1]}
                      target="_blank"
                      rel="noreferrer"
                      className="pub-link"
                    >
                      {primary[0] === "ieee" ? "Read Paper" : "View Patent"}
                      <ArrowUpRight size={14} aria-hidden />
                    </a>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
