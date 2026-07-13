import type { Metadata } from "next";
import { PageMotion } from "@/components/AppShell";
import { Skills } from "@/components/sections/Skills";

export const metadata: Metadata = { title: "Skills" };

export default function SkillsPage() {
  return (
    <PageMotion>
      <Skills />
    </PageMotion>
  );
}
