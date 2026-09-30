import type { LucideIcon } from "lucide-react";
import {
  Clapperboard,
  Clock,
  Flame,
  Gamepad2,
  History,
  House,
  Lightbulb,
  Music2,
  Podcast,
  SquarePlay,
  ThumbsUp,
  Trophy,
  TvMinimalPlay,
  X,
  Zap,
} from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Logo } from "@/components/logo";
import { cn } from "@/lib/cn";

type NavItem = { label: string; href: Route; icon: LucideIcon };
type NavGroup = { heading?: string; items: NavItem[] };

// Only "/" exists so far; the other pages are cast until they are built.
const NAV_GROUPS: NavGroup[] = [
  {
    items: [
      { label: "Home", href: "/", icon: House },
      { label: "Shorts", href: "/shorts" as Route, icon: Zap },
      {
        label: "Subscriptions",
        href: "/feed/subscriptions" as Route,
        icon: TvMinimalPlay,
      },
    ],
  },
  {
    heading: "You",
    items: [
      { label: "History", href: "/feed/history" as Route, icon: History },
      {
        label: "Your videos",
        href: "/feed/your-videos" as Route,
        icon: SquarePlay,
      },
      {
        label: "Watch later",
        href: "/playlist/watch-later" as Route,
        icon: Clock,
      },
      {
        label: "Liked videos",
        href: "/playlist/liked" as Route,
        icon: ThumbsUp,
      },
    ],
  },
  {
    heading: "Explore",
    items: [
      { label: "Trending", href: "/explore/trending" as Route, icon: Flame },
      { label: "Music", href: "/explore/music" as Route, icon: Music2 },
      { label: "Gaming", href: "/explore/gaming" as Route, icon: Gamepad2 },
      { label: "Sports", href: "/explore/sports" as Route, icon: Trophy },
      {
        label: "Learning",
        href: "/explore/learning" as Route,
        icon: Lightbulb,
      },
      {
        label: "Movies & Shows",
        href: "/explore/movies" as Route,
        icon: Clapperboard,
      },
      { label: "Podcasts", href: "/explore/podcasts" as Route, icon: Podcast },
    ],
  },
];

type SidebarProps = {
  desktopOpen: boolean;
  mobileOpen: boolean;
  onClose: () => void;
};

export function Sidebar({ desktopOpen, mobileOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {mobileOpen && (
        <div
          aria-hidden
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        id="app-sidebar"
        aria-label="Main navigation"
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 shrink-0 overflow-y-auto bg-canvas px-4 pb-6 transition-[translate,visibility] duration-200",
          "lg:sticky lg:top-16 lg:z-auto lg:h-[calc(100dvh-4rem)] lg:translate-x-0 lg:border-r lg:border-line lg:pt-4",
          mobileOpen
            ? "translate-x-0"
            : "max-lg:invisible max-lg:-translate-x-full",
          !desktopOpen && "lg:hidden",
        )}
      >
        <div className="flex h-16 items-center gap-3 lg:hidden">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation"
            className="grid size-10 place-items-center rounded-full hover:bg-surface-hover"
          >
            <X className="size-6" aria-hidden />
          </button>
          <Logo onClick={onClose} />
        </div>

        <nav>
          {NAV_GROUPS.map((group, index) => (
            <div
              key={group.heading ?? index}
              className={cn(index > 0 && "mt-3 border-t border-line pt-4")}
            >
              {group.heading && (
                <h2 className="mb-1 px-4 text-base font-medium text-muted">
                  {group.heading}
                </h2>
              )}
              <ul>
                {group.items.map(({ label, href, icon: Icon }) => {
                  const active = pathname === href;
                  return (
                    <li key={label}>
                      <Link
                        href={href}
                        onClick={onClose}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "flex h-11 items-center gap-5 rounded-xl px-4 text-[15px]",
                          active
                            ? "bg-surface font-medium"
                            : "hover:bg-surface-hover",
                        )}
                      >
                        <Icon className="size-6 shrink-0" aria-hidden />
                        {label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}

          <div className="mt-3 border-t border-line pt-4">
            <Link
              href={"/originals" as Route}
              onClick={onClose}
              className="flex h-11 items-center gap-4 rounded-xl px-4 text-[15px] hover:bg-surface-hover"
            >
              <span
                aria-hidden
                className="grid size-7 place-items-center rounded-md bg-accent text-sm font-bold text-white"
              >
                H
              </span>
              Hoytube Originals
            </Link>
          </div>
        </nav>
      </aside>
    </>
  );
}
