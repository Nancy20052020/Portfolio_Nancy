"use client";

import { ExternalLink, FileText } from "lucide-react";
import { publications } from "@/data/content";

export function Publications() {
  return (
    <section className="section">
      <div className="section-inner">
        <div className="section-heading reveal-item">
          <p className="eyebrow">Publications</p>
          <h2 className="section-title">Research & IP</h2>
          <p className="section-sub">
            Peer-reviewed deep learning work and a multi-country patent on
            eye-tracking for autism detection.
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-4">
          {publications.map((pub) => (
            <article
              key={pub.title}
              className="publication-card glass-panel reveal-item"
            >
              <div className="publication-thumb" aria-hidden>
                <FileText size={28} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                  {pub.venue}
                </p>
                <h3 className="mt-1 font-display text-lg font-semibold text-[var(--text)]">
                  {pub.title}
                </h3>
                <p className="mt-2 text-sm text-[var(--text-soft)]">
                  {pub.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-3">
                  {Object.entries(pub.links).map(([key, href]) => (
                    <a
                      key={key}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--accent)] hover:underline"
                    >
                      {key}
                      <ExternalLink size={12} />
                    </a>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
