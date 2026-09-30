"use client";

import { EllipsisVertical } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { cn } from "@/lib/cn";
import { formatDaysAgo, formatViews } from "@/lib/format";
import { RECENT_UPLOAD_DAYS, type Video } from "@/lib/videos";

type Filter = "all" | "channel" | "related" | "recent";

type RelatedVideosProps = {
  current: Video;
  /** Candidate videos, excluding the current one. */
  videos: Video[];
};

export function RelatedVideos({ current, videos }: RelatedVideosProps) {
  const [filter, setFilter] = useState<Filter>("all");

  const filters: { id: Filter; label: string }[] = [
    { id: "all", label: "All" },
    { id: "channel", label: `From ${current.channel}` },
    { id: "related", label: "Related" },
    { id: "recent", label: "Recently uploaded" },
  ];

  const sameChannel = (video: Video) => video.channel === current.channel;
  const visible = (() => {
    switch (filter) {
      case "all":
        // Same channel first, like the mockup's "up next" list.
        return [
          ...videos.filter(sameChannel),
          ...videos.filter((v) => !sameChannel(v)),
        ];
      case "channel":
        return videos.filter(sameChannel);
      case "related":
        return videos.filter((video) => video.category === current.category);
      case "recent":
        return videos.filter(
          (video) => video.uploadedDaysAgo <= RECENT_UPLOAD_DAYS,
        );
    }
  })();

  return (
    <section aria-label="Up next">
      <div
        role="toolbar"
        aria-label="Filter suggestions"
        className="-mx-4 flex [scrollbar-width:none] gap-3 overflow-x-auto px-4 sm:mx-0 sm:px-0"
      >
        {filters.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            onClick={() => setFilter(id)}
            aria-pressed={filter === id}
            className={cn(
              "h-8 shrink-0 rounded-lg px-3 text-sm font-medium whitespace-nowrap transition-colors",
              filter === id
                ? "bg-fg text-canvas"
                : "bg-surface hover:bg-surface-hover",
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {visible.length > 0 ? (
        <ul className="mt-4 space-y-3">
          {visible.map((video) => (
            <li key={video.id}>
              <CompactVideoCard video={video} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="py-12 text-center text-sm text-muted">
          No videos match this filter.
        </p>
      )}
    </section>
  );
}

function CompactVideoCard({ video }: { video: Video }) {
  const href = `/watch/${video.id}` as const;

  return (
    <article className="flex gap-2">
      <Link
        href={href}
        tabIndex={-1}
        aria-hidden
        className="relative aspect-video w-40 shrink-0 overflow-hidden rounded-lg bg-thumb sm:w-44"
      >
        <Image
          src={video.thumbnail}
          alt=""
          fill
          sizes="176px"
          className="object-cover"
        />
        <span className="absolute right-1 bottom-1 rounded bg-black/80 px-1 py-0.5 text-xs font-medium text-white">
          {video.duration}
        </span>
      </Link>
      <div className="min-w-0 flex-1">
        <h3 className="line-clamp-2 text-sm leading-snug font-medium">
          <Link href={href} className="hover:underline">
            {video.title}
          </Link>
        </h3>
        <p className="mt-1 text-xs text-muted">{video.channel}</p>
        <p className="text-xs text-muted">
          {formatViews(video.views)} • {formatDaysAgo(video.uploadedDaysAgo)}
        </p>
      </div>
      <button
        type="button"
        aria-label={`More actions for ${video.title}`}
        className="-mr-2 grid size-8 shrink-0 place-items-center self-start rounded-full text-muted hover:bg-surface-hover hover:text-fg"
      >
        <EllipsisVertical className="size-5" aria-hidden />
      </button>
    </article>
  );
}
