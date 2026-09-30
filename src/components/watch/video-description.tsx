"use client";

import { useState } from "react";

import { cn } from "@/lib/cn";
import { formatDaysAgo, formatViews } from "@/lib/format";

type VideoDescriptionProps = {
  views: number;
  uploadedDaysAgo: number;
  description: string;
};

/** Descriptions longer than this, or with more than two lines, collapse. */
const COLLAPSE_CHARS = 160;

export function VideoDescription({
  views,
  uploadedDaysAgo,
  description,
}: VideoDescriptionProps) {
  const [expanded, setExpanded] = useState(false);
  const collapsible =
    description.split("\n").length > 2 || description.length > COLLAPSE_CHARS;

  return (
    <div className="mt-4 rounded-xl bg-surface p-3 text-sm">
      <p className="font-medium">
        {formatViews(views)} • {formatDaysAgo(uploadedDaysAgo)}
      </p>
      <p
        id="video-description"
        className={cn(
          "mt-1 whitespace-pre-line",
          collapsible && !expanded && "line-clamp-2",
        )}
      >
        {description}
      </p>
      {collapsible && (
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          aria-expanded={expanded}
          aria-controls="video-description"
          className="mt-1 font-medium hover:underline"
        >
          {expanded ? "Show less" : "...more"}
        </button>
      )}
    </div>
  );
}
