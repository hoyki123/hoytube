"use client";

import { useState } from "react";

import { VideoSection } from "@/components/video-section";
import { cn } from "@/lib/cn";
import {
  CATEGORIES,
  type Category,
  matchesCategory,
  type VideoSection as VideoSectionData,
} from "@/lib/videos";

export function HomeFeed({ sections }: { sections: VideoSectionData[] }) {
  const [category, setCategory] = useState<Category>("All");

  const visibleSections = sections
    .map((section) => ({
      ...section,
      videos: section.videos.filter((video) =>
        matchesCategory(video, category),
      ),
    }))
    .filter((section) => section.videos.length > 0);

  return (
    <>
      <div
        role="toolbar"
        aria-label="Filter by category"
        className="sticky top-16 z-20 flex [scrollbar-width:none] gap-3 overflow-x-auto bg-canvas px-4 py-4 sm:px-6"
      >
        {CATEGORIES.map((item) => {
          const selected = item === category;
          return (
            <button
              key={item}
              type="button"
              aria-pressed={selected}
              onClick={() => setCategory(item)}
              className={cn(
                "h-10 shrink-0 rounded-xl px-5 text-[15px] whitespace-nowrap transition-colors",
                selected
                  ? "bg-accent font-medium text-white hover:bg-accent-hover"
                  : "bg-surface hover:bg-surface-hover",
              )}
            >
              {item}
            </button>
          );
        })}
      </div>

      <div className="space-y-12 px-4 pt-4 pb-12 sm:px-6">
        {visibleSections.length > 0 ? (
          visibleSections.map((section, index) => (
            <VideoSection
              key={section.id}
              section={section}
              eager={index === 0}
            />
          ))
        ) : (
          <p className="py-24 text-center text-muted">
            No {category.toLowerCase()} videos yet.
          </p>
        )}
      </div>
    </>
  );
}
