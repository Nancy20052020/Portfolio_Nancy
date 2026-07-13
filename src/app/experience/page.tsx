import type { Metadata } from "next";
import { PageMotion } from "@/components/AppShell";
import { Experience } from "@/components/sections/Experience";

export const metadata: Metadata = { title: "Experience" };

export default function ExperiencePage() {
  return (
    <PageMotion>
      <Experience />
    </PageMotion>
  );
}
