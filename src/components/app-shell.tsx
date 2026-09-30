"use client";

import { useCallback, useEffect, useState } from "react";

import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";

// Matches Tailwind's `lg` breakpoint.
const DESKTOP_QUERY = "(min-width: 64rem)";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [desktopOpen, setDesktopOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleSidebar = useCallback(() => {
    if (window.matchMedia(DESKTOP_QUERY).matches) {
      setDesktopOpen((open) => !open);
    } else {
      setMobileOpen((open) => !open);
    }
  }, []);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  return (
    <>
      <Header onMenuClick={toggleSidebar} />
      <div className="flex">
        <Sidebar
          desktopOpen={desktopOpen}
          mobileOpen={mobileOpen}
          onClose={closeMobile}
        />
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </>
  );
}
