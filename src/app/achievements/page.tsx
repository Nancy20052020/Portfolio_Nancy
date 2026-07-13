import type { Metadata } from "next";
import { PageMotion } from "@/components/AppShell";
import { Achievements } from "@/components/sections/Achievements";

export const metadata: Metadata = { title: "Achievements" };

export default function AchievementsPage() {
  return (
    <PageMotion>
      <Achievements />
    </PageMotion>
  );
}
