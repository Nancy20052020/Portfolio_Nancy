"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { publications } from "@/data/content";

export function Publications() {
  return (
    <section className="section pubs-section">
      <div className="section-inner">
        <div className="section-heading reveal-item">
          <p className="eyebrow">Publications</p>
          <h2 className="section-title">Publications</h2>
          <p className="section-sub">
            Peer-reviewed deep learning research and a multi-country patent.
          </p>
        </div>

        <div className="pubs-layout mt-10">
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
                      Read Paper
                      <ArrowUpRight size={14} aria-hidden />
                    </a>
                  )}
                </article>
              );
            })}
          </div>

          <div className="pubs-art reveal-item">
            <Image
              src="/images/publications-books.png"
              alt=""
              fill
              sizes="(max-width: 900px) 100vw, 320px"
              className="pubs-art-img"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
