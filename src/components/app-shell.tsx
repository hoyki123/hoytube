"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";

// Matches Tailwind's `lg` breakpoint.
const DESKTOP_QUERY = "(min-width: 64rem)";

/** Routes where the sidebar is always a drawer, so content gets full width. */
function isDrawerOnlyRoute(pathname: string): boolean {
  return pathname.startsWith("/watch/");
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const docked = !isDrawerOnlyRoute(pathname);
  const [desktopOpen, setDesktopOpen] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Close the drawer on any navigation, including browser back/forward.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setDrawerOpen(false);
  }

  const toggleSidebar = useCallback(() => {
    if (docked && window.matchMedia(DESKTOP_QUERY).matches) {
      setDesktopOpen((open) => !open);
    } else {
      setDrawerOpen((open) => !open);
    }
  }, [docked]);

  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  useEffect(() => {
    if (!drawerOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDrawerOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [drawerOpen]);

  return (
    <>
      <Header onMenuClick={toggleSidebar} />
      <div className="flex">
        <Sidebar
          docked={docked}
          desktopOpen={desktopOpen}
          drawerOpen={drawerOpen}
          onClose={closeDrawer}
        />
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </>
  );
}
