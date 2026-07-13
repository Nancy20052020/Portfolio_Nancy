import type { Metadata } from "next";
import { Manrope, Syne } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nancy Verma | AI & ML Portfolio",
  description:
    "Portfolio of Nancy Verma — AI & ML enthusiast, software engineering intern, and builder of intelligent systems.",
  openGraph: {
    title: "Nancy Verma | AI & ML Portfolio",
    description:
      "Techy, creative portfolio featuring projects in ML, geospatial tech, and software engineering.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${manrope.variable} ${syne.variable} h-full`}>
      <body className="min-h-full antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
