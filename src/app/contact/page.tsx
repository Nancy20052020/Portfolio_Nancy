import type { Metadata } from "next";
import { PageMotion } from "@/components/AppShell";
import { Contact } from "@/components/sections/Contact";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <PageMotion>
      <Contact />
    </PageMotion>
  );
}
