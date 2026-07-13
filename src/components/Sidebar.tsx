"use client";

import { useEffect, useState } from "react";
import {
  Home,
  User,
  Code2,
  FolderKanban,
  Briefcase,
  Trophy,
  BookOpen,
  Mail,
  Sun,
  Moon,
  Menu,
  X,
} from "lucide-react";
import { navItems, profile } from "@/data/content";
import { useTheme } from "./ThemeProvider";

const icons = {
  home: Home,
  about: User,
  skills: Code2,
  projects: FolderKanban,
  experience: Briefcase,
  achievements: Trophy,
  publications: BookOpen,
  contact: Mail,
} as const;

export function Sidebar() {
  const { theme, toggleTheme } = useTheme();
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const sections = navItems.map((n) => document.getElementById(n.id));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { rootMargin: "-30% 0px -50% 0px", threshold: [0.15, 0.4, 0.7] },
    );
    sections.forEach((s) => s && observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  const brand = (
    <div className="mb-6 flex items-center gap-3 px-2 lg:mb-8">
      <div className="avatar-ring">
        <span className="font-display text-lg font-bold text-white">
          {profile.firstName[0]}
          {profile.lastName[0]}
        </span>
      </div>
      <div className="min-w-0">
        <p className="font-display truncate text-sm font-semibold text-[var(--text)]">
          {profile.name}
        </p>
        <p className="text-xs text-[var(--text-muted)]">AI & ML · SWE</p>
      </div>
    </div>
  );

  const links = (
    <nav className="flex flex-1 flex-col gap-1" aria-label="Primary">
      {navItems.map((item) => {
        const Icon = icons[item.id];
        const isActive = active === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => scrollTo(item.id)}
            className={`nav-item ${isActive ? "nav-item-active" : ""}`}
          >
            <Icon size={18} strokeWidth={isActive ? 2.4 : 1.8} />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );

  const themeBtn = (
    <button
      type="button"
      onClick={toggleTheme}
      className="theme-toggle mt-4 lg:mt-6"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      <Sun
        size={16}
        className={theme === "light" ? "opacity-100" : "opacity-40"}
      />
      <span className="theme-toggle-thumb" data-theme={theme} />
      <Moon
        size={16}
        className={theme === "dark" ? "opacity-100" : "opacity-40"}
      />
    </button>
  );

  return (
    <>
      <aside className="sidebar-desktop glass-sidebar">
        {brand}
        {links}
        {themeBtn}
      </aside>

      <div className="mobile-bar glass-sidebar">
        <div className="flex min-w-0 items-center gap-2.5">
          <div className="avatar-ring avatar-ring-sm shrink-0">
            <span className="font-display text-sm font-bold text-white">NV</span>
          </div>
          <span className="font-display truncate text-sm font-semibold text-[var(--text)]">
            {profile.name}
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className="carousel-nav"
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
          </button>
          <button
            type="button"
            className="carousel-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <>
          <button
            type="button"
            className="mobile-backdrop"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />
          <div className="mobile-drawer glass-sidebar">
            {links}
            {themeBtn}
          </div>
        </>
      )}
    </>
  );
}
