import type { Metadata } from "next";
import { PageMotion } from "@/components/AppShell";
import { Experience } from "@/components/sections/Experience";

export const metadata: Metadata = { title: "Journey" };

export default function ExperiencePage() {
  return (
    <PageMotion>
      <Experience />
    </PageMotion>
  );
}
