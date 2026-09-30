"use client";

import { ArrowLeft, Bell, Menu, Search, UserRound, Video } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/cn";

const iconButton =
  "grid size-10 shrink-0 place-items-center rounded-full hover:bg-surface-hover";

export function Header({ onMenuClick }: { onMenuClick: () => void }) {
  // Below `sm` the search box is collapsed behind an icon and takes over the header when opened.
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (mobileSearchOpen) inputRef.current?.focus();
  }, [mobileSearchOpen]);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-2 border-b border-line bg-canvas px-2 sm:gap-4 sm:px-4">
      <div
        className={cn(
          "flex shrink-0 items-center gap-3",
          mobileSearchOpen && "max-sm:hidden",
        )}
      >
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Toggle navigation"
          aria-controls="app-sidebar"
          className={iconButton}
        >
          <Menu className="size-6" aria-hidden />
        </button>
        <Logo />
      </div>

      {mobileSearchOpen && (
        <button
          type="button"
          onClick={() => setMobileSearchOpen(false)}
          aria-label="Close search"
          className={cn(iconButton, "sm:hidden")}
        >
          <ArrowLeft className="size-6" aria-hidden />
        </button>
      )}

      <form
        action="/results"
        role="search"
        onKeyDown={(event) => {
          if (event.key === "Escape") setMobileSearchOpen(false);
        }}
        className={cn(
          "mx-auto h-11 max-w-xl min-w-0 flex-1 overflow-hidden rounded-full border border-line bg-surface focus-within:border-accent",
          mobileSearchOpen ? "flex" : "hidden sm:flex",
        )}
      >
        <label htmlFor="search" className="sr-only">
          Search Hoytube
        </label>
        <input
          ref={inputRef}
          id="search"
          name="search_query"
          type="search"
          placeholder="Search Hoytube..."
          className="min-w-0 flex-1 bg-transparent px-5 placeholder:text-muted focus:outline-none"
        />
        <button
          type="submit"
          aria-label="Search"
          className="grid w-16 shrink-0 place-items-center border-l border-line bg-surface-hover hover:bg-thumb"
        >
          <Search className="size-5" aria-hidden />
        </button>
      </form>

      <div
        className={cn(
          "ml-auto flex shrink-0 items-center gap-1 sm:ml-0 sm:gap-2",
          mobileSearchOpen && "max-sm:hidden",
        )}
      >
        <button
          type="button"
          onClick={() => setMobileSearchOpen(true)}
          aria-label="Search"
          className={cn(iconButton, "sm:hidden")}
        >
          <Search className="size-6" aria-hidden />
        </button>
        <ThemeToggle className={iconButton} />
        <button
          type="button"
          aria-label="Create"
          className={cn(iconButton, "max-sm:hidden")}
        >
          <Video className="size-6" aria-hidden />
        </button>
        <button
          type="button"
          aria-label="Notifications"
          className={cn(iconButton, "max-sm:hidden")}
        >
          <Bell className="size-6" aria-hidden />
        </button>
        <button
          type="button"
          aria-label="Account"
          className="grid size-10 shrink-0 place-items-center rounded-full bg-avatar text-canvas hover:opacity-90"
        >
          <UserRound className="size-6" aria-hidden />
        </button>
      </div>
    </header>
  );
}
