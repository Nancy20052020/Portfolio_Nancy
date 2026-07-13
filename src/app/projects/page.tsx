import type { Metadata } from "next";
import { PageMotion } from "@/components/AppShell";
import { Projects } from "@/components/sections/Projects";

export const metadata: Metadata = { title: "Projects" };

export default function ProjectsPage() {
  return (
    <PageMotion>
      <Projects />
    </PageMotion>
  );
}
