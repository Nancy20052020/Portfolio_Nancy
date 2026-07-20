"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  a: number;
};

export function AmbientUniverse() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canvas = canvasRef.current;
    if (!canvas || reduce) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let shooting: { x: number; y: number; vx: number; vy: number; life: number } | null =
      null;
    let lastShoot = 0;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(140, Math.floor((width * height) / 14000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.4 + 0.3,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        a: Math.random() * 0.55 + 0.15,
      }));
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.fillStyle = `rgba(165, 243, 252, ${p.a})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!shooting && time - lastShoot > 12000 + Math.random() * 8000) {
        lastShoot = time;
        shooting = {
          x: Math.random() * width * 0.7,
          y: Math.random() * height * 0.35,
          vx: 5 + Math.random() * 3,
          vy: 1.5 + Math.random() * 1.5,
          life: 1,
        };
      }

      if (shooting) {
        shooting.x += shooting.vx;
        shooting.y += shooting.vy;
        shooting.life -= 0.02;
        const g = ctx.createLinearGradient(
          shooting.x,
          shooting.y,
          shooting.x - shooting.vx * 8,
          shooting.y - shooting.vy * 8,
        );
        g.addColorStop(0, "rgba(255,255,255,0.9)");
        g.addColorStop(1, "rgba(167,139,250,0)");
        ctx.strokeStyle = g;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(shooting.x, shooting.y);
        ctx.lineTo(shooting.x - shooting.vx * 8, shooting.y - shooting.vy * 8);
        ctx.stroke();
        if (shooting.life <= 0 || shooting.x > width || shooting.y > height) {
          shooting = null;
        }
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="universe-layer" aria-hidden>
      <canvas ref={canvasRef} className="universe-canvas" />
      <div className="universe-aurora aurora-a" />
      <div className="universe-aurora aurora-b" />
      <div className="universe-grid" />
      <div className="universe-vignette" />
    </div>
  );
}
