"use client";

import type { ReactNode } from "react";
import { Sidebar } from "@/components/Sidebar";
import { AmbientUniverse } from "@/components/AmbientUniverse";
import { usePathname } from "next/navigation";

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <div className={`portfolio-shell${isHome ? " is-home" : ""}`}>
      <AmbientUniverse />
      <Sidebar />
      <main className="main-content">{children}</main>
    </div>
  );
}

/** Static page wrapper — content always visible, no entrance tweens. */
export function PageMotion({ children }: { children: ReactNode }) {
  return <div className="page-motion">{children}</div>;
}
