import type { LucideIcon } from "lucide-react";
import { ChevronRight, SquarePlay, Star, TrendingUp } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";

import { VideoCard } from "@/components/video-card";
import type {
  SectionIcon,
  VideoSection as VideoSectionData,
} from "@/lib/videos";

const SECTION_ICONS: Record<SectionIcon, LucideIcon> = {
  recommended: SquarePlay,
  trending: TrendingUp,
  watched: Star,
};

type VideoSectionProps = {
  section: VideoSectionData;
  /** Load thumbnails immediately; use for the first section on the page. */
  eager?: boolean;
};

export function VideoSection({ section, eager = false }: VideoSectionProps) {
  const Icon = SECTION_ICONS[section.icon];
  const headingId = `section-${section.id}`;

  return (
    <section aria-labelledby={headingId}>
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2
          id={headingId}
          className="flex items-center gap-3 text-xl font-medium sm:text-2xl"
        >
          <Icon className="size-7 shrink-0" aria-hidden />
          {section.title}
        </h2>
        <Link
          // Feed pages are not built yet.
          href={`/feed/${section.id}` as Route}
          aria-label={`See all: ${section.title}`}
          className="flex shrink-0 items-center gap-1 rounded-full px-3 py-1.5 text-sm text-muted hover:bg-surface-hover hover:text-fg"
        >
          See all
          <ChevronRight className="size-4" aria-hidden />
        </Link>
      </div>
      <div className="grid gap-x-4 gap-y-8 sm:grid-cols-2 xl:grid-cols-4">
        {section.videos.map((video) => (
          <VideoCard key={video.id} video={video} eager={eager} />
        ))}
      </div>
    </section>
  );
}
