"use client";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  function toggle() {
    const el = document.documentElement;
    const next = el.getAttribute("data-theme") === "light" ? "dark" : "light";
    el.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* localStorage unavailable — ignore */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle light and dark mode"
      title="Toggle theme"
      className="relative inline-flex h-7 w-[52px] shrink-0 items-center rounded-full border border-border bg-bg-subtle px-1 transition-colors hover:border-ink/40"
    >
      <span className="theme-knob flex h-5 w-5 items-center justify-center rounded-full bg-accent text-accent-ink">
        <Moon className="theme-moon h-3 w-3" />
        <Sun className="theme-sun h-3 w-3" />
      </span>
    </button>
  );
}
