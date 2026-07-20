"use client";

import type { ReactNode } from "react";
import { Sidebar } from "@/components/Sidebar";
import { AmbientUniverse } from "@/components/AmbientUniverse";
import { ParallaxProvider } from "@/components/Parallax";
import { SmoothScroll } from "@/components/SmoothScroll";
import { PageTransition } from "@/components/PageTransition";
import { usePathname } from "next/navigation";

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <ParallaxProvider>
      {!isHome && <SmoothScroll />}
      <PageTransition />
      <div className={`portfolio-shell${isHome ? " is-home" : ""}`}>
        <AmbientUniverse />
        <Sidebar />
        <main className="main-content">{children}</main>
      </div>
    </ParallaxProvider>
  );
}

/** Static page wrapper — no opacity/transform entrance tweens (avoids text flash). */
export function PageMotion({ children }: { children: ReactNode }) {
  return <div className="page-motion">{children}</div>;
}
