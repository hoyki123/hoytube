const compactFormatter = new Intl.NumberFormat("en", {
  notation: "compact",
  maximumFractionDigits: 1,
});

const relativeTimeFormatter = new Intl.RelativeTimeFormat("en");

/** 12_000 -> "12K" */
export function formatCount(count: number): string {
  return compactFormatter.format(count);
}

/** 1_200_000 -> "1.2M views" */
export function formatViews(views: number): string {
  return `${formatCount(views)} views`;
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

/** 754 -> "12:34", 3725 -> "1:02:05" */
export function formatTimestamp(totalSeconds: number): string {
  const seconds = Math.floor(totalSeconds % 60);
  const minutes = Math.floor(totalSeconds / 60) % 60;
  const hours = Math.floor(totalSeconds / 3600);
  const ss = String(seconds).padStart(2, "0");
  if (hours > 0) return `${hours}:${String(minutes).padStart(2, "0")}:${ss}`;
  return `${minutes}:${ss}`;
}

/** "12:34" -> 754 */
export function parseTimestamp(timestamp: string): number {
  return timestamp
    .split(":")
    .reduce((total, part) => total * 60 + Number(part), 0);
}
