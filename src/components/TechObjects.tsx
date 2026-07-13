"use client";

import type { SkillItem } from "@/data/content";

const brand: Record<string, string> = {
  Python: "#3776ab",
  "C++": "#00599c",
  HTML: "#e34f26",
  JavaScript: "#f7df1e",
  CSS: "#1572b6",
  TensorFlow: "#ff6f00",
  Keras: "#d00000",
  "Scikit-Learn": "#f7931e",
  Git: "#f05032",
  React: "#61dafb",
  LaTeX: "#008080",
  "Google Colab": "#f9ab00",
  "Google Earth Engine": "#34a853",
  Leadership: "#0d9488",
  Communication: "#0891b2",
  "Team Collaboration": "#ea580c",
};

function ShapeVisual({ shape, color }: { shape: SkillItem["shape"]; color: string }) {
  if (shape === "crystal") {
    return (
      <div className="tech-shape tech-crystal" style={{ color }}>
        <span />
        <span />
        <span />
      </div>
    );
  }
  if (shape === "atom") {
    return (
      <div className="tech-shape tech-atom" style={{ color }}>
        <i />
        <i />
        <i />
        <b />
      </div>
    );
  }
  if (shape === "cube") {
    return (
      <div className="tech-shape tech-cube" style={{ color }}>
        <span className="face front" />
        <span className="face back" />
        <span className="face left" />
        <span className="face right" />
        <span className="face top" />
        <span className="face bottom" />
      </div>
    );
  }
  if (shape === "cylinder") {
    return (
      <div className="tech-shape tech-cylinder" style={{ color }}>
        <span className="cyl-top" />
        <span className="cyl-body" />
        <span className="cyl-bottom" />
      </div>
    );
  }
  if (shape === "ribbon") {
    return (
      <div className="tech-shape tech-ribbon" style={{ color }}>
        <span />
        <span />
      </div>
    );
  }
  if (shape === "hex") {
    return <div className="tech-shape tech-hex" style={{ color }} />;
  }
  if (shape === "orb") {
    return <div className="tech-shape tech-orb" style={{ color }} />;
  }
  return <div className="tech-shape tech-chip" style={{ color }} />;
}

export function TechObject({ item }: { item: SkillItem }) {
  const color = brand[item.name] ?? "#0d9488";
  return (
    <div className="skill-float-card glass-panel">
      <div className="skill-visual" aria-hidden>
        <ShapeVisual shape={item.shape} color={color} />
      </div>
      <div>
        <p className="skill-name">{item.name}</p>
        <p className="skill-shape-label">{item.shape}</p>
      </div>
    </div>
  );
}
