const viewsFormatter = new Intl.NumberFormat("en", {
  notation: "compact",
  maximumFractionDigits: 1,
});

const relativeTimeFormatter = new Intl.RelativeTimeFormat("en");

/** 1_200_000 -> "1.2M views" */
export function formatViews(views: number): string {
  return `${viewsFormatter.format(views)} views`;
}

/** 2 -> "2 days ago", 7 -> "1 week ago", 60 -> "2 months ago" */
export function formatDaysAgo(days: number): string {
  if (days < 7) return relativeTimeFormatter.format(-days, "day");
  if (days < 30)
    return relativeTimeFormatter.format(-Math.floor(days / 7), "week");
  if (days < 365)
    return relativeTimeFormatter.format(-Math.floor(days / 30), "month");
  return relativeTimeFormatter.format(-Math.floor(days / 365), "year");
}
