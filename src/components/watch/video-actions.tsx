"use client";

import {
  BadgeCheck,
  Ellipsis,
  ListCheck,
  ListPlus,
  Share2,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import { useRef, useState } from "react";

import { cn } from "@/lib/cn";
import { formatCount } from "@/lib/format";
import type { Channel } from "@/lib/videos";

const pill =
  "flex h-10 shrink-0 items-center gap-2 rounded-full bg-surface px-4 text-sm font-medium hover:bg-surface-hover";

type Rating = "like" | "dislike" | null;

type VideoActionsProps = {
  channelName: string;
  channel: Channel;
  likes: number;
  title: string;
};

export function VideoActions({
  channelName,
  channel,
  likes,
  title,
}: VideoActionsProps) {
  const [subscribed, setSubscribed] = useState(false);
  const [rating, setRating] = useState<Rating>(null);
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const copiedTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const rate = (next: Exclude<Rating, null>) =>
    setRating((current) => (current === next ? null : next));

  const share = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        // The user dismissed the share sheet.
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      clearTimeout(copiedTimer.current);
      copiedTimer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked; nothing sensible to fall back to.
    }
  };

  return (
    <div className="mt-3 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
      <div className="flex min-w-0 items-center gap-3">
        <div aria-hidden className="size-10 shrink-0 rounded-full bg-avatar" />
        <div className="min-w-0">
          <p className="flex items-center gap-1 font-medium">
            <span className="truncate">{channelName}</span>
            {channel.verified && (
              <BadgeCheck
                className="size-4 shrink-0 text-muted"
                aria-label="Verified"
                role="img"
              />
            )}
          </p>
          <p className="text-xs text-muted">
            {formatCount(channel.subscribers)} subscribers
          </p>
        </div>
        <button
          type="button"
          onClick={() => setSubscribed((value) => !value)}
          aria-pressed={subscribed}
          className={cn(
            "ml-3 h-10 shrink-0 rounded-full px-4 text-sm font-medium",
            subscribed
              ? "bg-surface hover:bg-surface-hover"
              : "bg-fg text-canvas hover:opacity-85",
          )}
        >
          {subscribed ? "Subscribed" : "Subscribe"}
        </button>
      </div>

      <div className="-mx-4 flex [scrollbar-width:none] gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        <div className="flex h-10 shrink-0 items-center rounded-full bg-surface text-sm font-medium">
          <button
            type="button"
            onClick={() => rate("like")}
            aria-pressed={rating === "like"}
            aria-label={`Like this video along with ${formatCount(likes)} other people`}
            className="flex h-full items-center gap-2 rounded-l-full pr-3 pl-4 hover:bg-surface-hover"
          >
            <ThumbsUp
              className={cn("size-5", rating === "like" && "fill-current")}
              aria-hidden
            />
            {formatCount(likes + (rating === "like" ? 1 : 0))}
          </button>
          <span aria-hidden className="h-6 w-px bg-line" />
          <button
            type="button"
            onClick={() => rate("dislike")}
            aria-pressed={rating === "dislike"}
            aria-label="Dislike this video"
            className="flex h-full items-center rounded-r-full pr-4 pl-3 hover:bg-surface-hover"
          >
            <ThumbsDown
              className={cn("size-5", rating === "dislike" && "fill-current")}
              aria-hidden
            />
          </button>
        </div>

        <button type="button" onClick={share} className={pill}>
          <Share2 className="size-5" aria-hidden />
          <span aria-live="polite">{copied ? "Link copied" : "Share"}</span>
        </button>

        <button
          type="button"
          onClick={() => setSaved((value) => !value)}
          aria-pressed={saved}
          className={pill}
        >
          {saved ? (
            <ListCheck className="size-5" aria-hidden />
          ) : (
            <ListPlus className="size-5" aria-hidden />
          )}
          {saved ? "Saved" : "Save"}
        </button>

        <button
          type="button"
          aria-label="More actions"
          className="grid size-10 shrink-0 place-items-center rounded-full bg-surface hover:bg-surface-hover"
        >
          <Ellipsis className="size-5" aria-hidden />
        </button>
      </div>
    </div>
  );
}
