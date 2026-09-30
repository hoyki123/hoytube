"use client";

import { Moon, Sun } from "lucide-react";

import { THEME_STORAGE_KEY, type Theme } from "@/lib/theme";

export function ThemeToggle({ className }: { className?: string }) {
  const toggle = () => {
    const root = document.documentElement;
    const next: Theme = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Storage can be unavailable (e.g. private mode); the toggle still works for this visit.
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle dark theme"
      className={className}
    >
      <Moon className="size-6 dark:hidden" aria-hidden />
      <Sun className="hidden size-6 dark:block" aria-hidden />
    </button>
  );
}
