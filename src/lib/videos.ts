export const CATEGORIES = [
  "All",
  "Music",
  "Gaming",
  "Tech",
  "Education",
  "Lifestyle",
  "Food",
  "Fitness",
  "Travel",
  "Recently uploaded",
] as const;

export type Category = (typeof CATEGORIES)[number];

export type VideoCategory = Exclude<Category, "All" | "Recently uploaded">;

export type Video = {
  id: string;
  title: string;
  thumbnail: string;
  channel: string;
  category: VideoCategory;
  views: number;
  uploadedDaysAgo: number;
  duration: string;
};

export type SectionIcon = "recommended" | "trending" | "watched";

export type VideoSection = {
  id: string;
  title: string;
  icon: SectionIcon;
  videos: Video[];
};

/** Videos uploaded within this many days count as "Recently uploaded". */
export const RECENT_UPLOAD_DAYS = 3;

// Mock data until a real backend exists.
export const HOME_SECTIONS: VideoSection[] = [
  {
    id: "recommended",
    title: "Recommended for you",
    icon: "recommended",
    videos: [
      {
        id: "a-day-in-my-life",
        title: "A Day in My Life (Realistic)",
        thumbnail: "/thumbnails/a-day-in-my-life.jpg",
        channel: "Hoy Vlogs",
        category: "Lifestyle",
        views: 485_000,
        uploadedDaysAgo: 2,
        duration: "12:34",
      },
      {
        id: "building-my-dream-setup",
        title: "Building My Dream Setup",
        thumbnail: "/thumbnails/building-my-dream-setup.jpg",
        channel: "TechWithHoy",
        category: "Tech",
        views: 230_000,
        uploadedDaysAgo: 4,
        duration: "8:21",
      },
      {
        id: "best-foods-for-energy",
        title: "The Best Foods for Energy",
        thumbnail: "/thumbnails/best-foods-for-energy.jpg",
        channel: "Hoy Eats",
        category: "Food",
        views: 1_200_000,
        uploadedDaysAgo: 6,
        duration: "15:47",
      },
      {
        id: "why-i-started-this-channel",
        title: "Why I Started This Channel",
        thumbnail: "/thumbnails/why-i-started-this-channel.jpg",
        channel: "HoyMindset",
        category: "Lifestyle",
        views: 673_000,
        uploadedDaysAgo: 7,
        duration: "10:03",
      },
    ],
  },
  {
    id: "trending",
    title: "Trending now",
    icon: "trending",
    videos: [
      {
        id: "science-of-better-habits",
        title: "The Science of Better Habits",
        thumbnail: "/thumbnails/science-of-better-habits.jpg",
        channel: "Hoy Learn",
        category: "Education",
        views: 3_600_000,
        uploadedDaysAgo: 1,
        duration: "9:18",
      },
      {
        id: "epic-road-trip-vlog",
        title: "Epic Road Trip Vlog",
        thumbnail: "/thumbnails/epic-road-trip-vlog.jpg",
        channel: "Hoy Adventures",
        category: "Travel",
        views: 1_900_000,
        uploadedDaysAgo: 2,
        duration: "14:32",
      },
      {
        id: "react-vs-nextjs",
        title: "React vs. Next.js - Which One?",
        thumbnail: "/thumbnails/react-vs-nextjs.jpg",
        channel: "Hoy Dev",
        category: "Tech",
        views: 4_200_000,
        uploadedDaysAgo: 3,
        duration: "11:05",
      },
      {
        id: "simple-home-workouts",
        title: "Simple Home Workouts",
        thumbnail: "/thumbnails/simple-home-workouts.jpg",
        channel: "Hoy Fitness",
        category: "Fitness",
        views: 1_100_000,
        uploadedDaysAgo: 4,
        duration: "7:46",
      },
    ],
  },
  {
    id: "because-you-watched",
    title: "Because you watched",
    icon: "watched",
    videos: [
      {
        id: "coffee-shop-study-vibes",
        title: "Coffee Shop Study Vibes",
        thumbnail: "/thumbnails/coffee-shop-study-vibes.jpg",
        channel: "Hoy Study",
        category: "Music",
        views: 820_000,
        uploadedDaysAgo: 5,
        duration: "13:22",
      },
      {
        id: "top-10-travel-destinations",
        title: "Top 10 Travel Destinations",
        thumbnail: "/thumbnails/top-10-travel-destinations.jpg",
        channel: "Hoy Travel",
        category: "Travel",
        views: 2_400_000,
        uploadedDaysAgo: 14,
        duration: "6:48",
      },
      {
        id: "30-min-full-body-workout",
        title: "30 Min Full Body Workout",
        thumbnail: "/thumbnails/30-min-full-body-workout.jpg",
        channel: "Hoy Fitness",
        category: "Fitness",
        views: 950_000,
        uploadedDaysAgo: 3,
        duration: "9:36",
      },
      {
        id: "easy-weeknight-dinners",
        title: "Easy Weeknight Dinners",
        thumbnail: "/thumbnails/easy-weeknight-dinners.jpg",
        channel: "Hoy Eats",
        category: "Food",
        views: 540_000,
        uploadedDaysAgo: 5,
        duration: "12:11",
      },
    ],
  },
];

export function matchesCategory(video: Video, category: Category): boolean {
  if (category === "All") return true;
  if (category === "Recently uploaded") {
    return video.uploadedDaysAgo <= RECENT_UPLOAD_DAYS;
  }
  return video.category === category;
}
