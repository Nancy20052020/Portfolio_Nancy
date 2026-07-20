"use client";

type AuraVariant =
  | "about"
  | "skills"
  | "projects"
  | "experience"
  | "achievements"
  | "publications"
  | "contact";

export function SectionAura({ variant }: { variant: AuraVariant }) {
  return (
    <div className={`section-aura aura-${variant}`} aria-hidden>
      <span className="section-aura-orb orb-a" />
      <span className="section-aura-orb orb-b" />
      <span className="section-aura-orb orb-c" />
    </div>
  );
}
