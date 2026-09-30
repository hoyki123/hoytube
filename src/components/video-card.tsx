import { EllipsisVertical } from "lucide-react";
import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";

import { formatDaysAgo, formatViews } from "@/lib/format";
import type { Video } from "@/lib/videos";

type VideoCardProps = {
  video: Video;
  /** Load the thumbnail immediately; use for cards visible on first paint. */
  eager?: boolean;
};

export function VideoCard({ video, eager = false }: VideoCardProps) {
  // The watch page is not built yet.
  const href = `/watch/${video.id}` as Route;

  return (
    <article>
      <Link
        href={href}
        tabIndex={-1}
        aria-hidden
        className="relative block aspect-video overflow-hidden rounded-xl bg-thumb"
      >
        <Image
          src={video.thumbnail}
          alt=""
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
          loading={eager ? "eager" : "lazy"}
          className="object-cover"
        />
        <span className="absolute right-2 bottom-2 rounded-md bg-black/80 px-1.5 py-0.5 text-xs font-medium text-white">
          {video.duration}
        </span>
      </Link>

      <div className="mt-3 flex gap-3">
        <div aria-hidden className="size-9 shrink-0 rounded-full bg-avatar" />
        <div className="min-w-0 flex-1">
          <h3 className="line-clamp-2 leading-snug font-medium">
            <Link href={href} className="hover:underline">
              {video.title}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-muted">{video.channel}</p>
          <p className="text-sm text-muted">
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
      </div>
    </article>
  );
}
