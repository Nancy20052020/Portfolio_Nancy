import type { Metadata } from "next";
import { PageMotion } from "@/components/AppShell";
import { Publications } from "@/components/sections/Publications";

export const metadata: Metadata = { title: "Publications" };

export default function PublicationsPage() {
  return (
    <PageMotion>
      <Publications />
    </PageMotion>
  );
}
