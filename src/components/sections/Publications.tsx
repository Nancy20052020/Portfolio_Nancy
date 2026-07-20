"use client";
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
            {publications.map((pub) => (
              <article
                key={pub.title}
                className="pub-card glass-panel reveal-item zero-g scroll-3d depth-enter"
              >
                <p className="pub-venue">{pub.venue}</p>
                <h3 className="pub-title">{pub.title}</h3>
                <p className="pub-desc">{pub.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
