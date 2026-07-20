"use client";

import Image from "next/image";
import { publications } from "@/data/content";
import { ParallaxLayer } from "@/components/Parallax";
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

        <div className="pubs-layout mt-10">
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

          <ParallaxLayer depth={1.3} className="pubs-art reveal-item depth-enter">
            <Image
              src="/images/publications-books.png"
              alt=""
              fill
              sizes="(max-width: 900px) 100vw, 320px"
              className="pubs-art-img"
            />
          </ParallaxLayer>
        </div>
      </div>
    </section>
  );
}
