import type { Metadata } from "next";
import { PageMotion } from "@/components/AppShell";
import { About } from "@/components/sections/About";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <PageMotion>
      <About />
    </PageMotion>
  );
}
