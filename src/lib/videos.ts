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

export type Channel = {
  subscribers: number;
  verified: boolean;
};

// Mock data until a real backend exists.
export const CHANNELS = {
  "Hoy Vlogs": { subscribers: 485_000, verified: true },
  TechWithHoy: { subscribers: 212_000, verified: true },
  "Hoy Eats": { subscribers: 1_050_000, verified: true },
  HoyMindset: { subscribers: 98_400, verified: false },
  "Hoy Learn": { subscribers: 2_300_000, verified: true },
  "Hoy Adventures": { subscribers: 764_000, verified: true },
  "Hoy Dev": { subscribers: 1_400_000, verified: true },
  "Hoy Fitness": { subscribers: 887_000, verified: true },
  "Hoy Study": { subscribers: 356_000, verified: false },
  "Hoy Travel": { subscribers: 1_900_000, verified: true },
} satisfies Record<string, Channel>;

export type ChannelName = keyof typeof CHANNELS;

export type Video = {
  id: string;
  title: string;
  thumbnail: string;
  /** Playable media URL. The mock videos have none yet. */
  src?: string;
  channel: ChannelName;
  category: VideoCategory;
  views: number;
  likes: number;
  commentCount: number;
  uploadedDaysAgo: number;
  duration: string;
  description: string;
};

export type Comment = {
  id: string;
  author: string;
  text: string;
  likes: number;
  /** 0 means it was just posted. */
  postedDaysAgo: number;
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

export const VIDEOS: Video[] = [
  {
    id: "a-day-in-my-life",
    title: "A Day in My Life (Realistic)",
    thumbnail: "/thumbnails/a-day-in-my-life.jpg",
    channel: "Hoy Vlogs",
    category: "Lifestyle",
    views: 485_000,
    likes: 12_000,
    commentCount: 1_234,
    uploadedDaysAgo: 2,
    duration: "12:34",
    description:
      "Just a normal day in my life — coffee, gym, work, and some good food. Hope you enjoy!\nLet me know what you want to see next!\n\nChapters\n0:00 Morning coffee\n2:15 Gym\n5:40 Work session\n9:05 Dinner",
  },
  {
    id: "building-my-dream-setup",
    title: "Building My Dream Setup",
    thumbnail: "/thumbnails/building-my-dream-setup.jpg",
    channel: "TechWithHoy",
    category: "Tech",
    views: 230_000,
    likes: 8_100,
    commentCount: 642,
    uploadedDaysAgo: 4,
    duration: "8:21",
    description:
      "Two years of saving, one weekend of building. Here's the desk, the monitors, and the cable management that almost broke me.",
  },
  {
    id: "best-foods-for-energy",
    title: "The Best Foods for Energy",
    thumbnail: "/thumbnails/best-foods-for-energy.jpg",
    channel: "Hoy Eats",
    category: "Food",
    views: 1_200_000,
    likes: 31_000,
    commentCount: 2_087,
    uploadedDaysAgo: 6,
    duration: "15:47",
    description:
      "Skip the afternoon crash. These are the foods I rely on for steady energy all day, plus a few easy recipes.",
  },
  {
    id: "why-i-started-this-channel",
    title: "Why I Started This Channel",
    thumbnail: "/thumbnails/why-i-started-this-channel.jpg",
    channel: "HoyMindset",
    category: "Lifestyle",
    views: 673_000,
    likes: 24_000,
    commentCount: 1_516,
    uploadedDaysAgo: 7,
    duration: "10:03",
    description:
      "The honest story behind this channel: what pushed me to start, what almost made me quit, and why I'm still here.",
  },
  {
    id: "science-of-better-habits",
    title: "The Science of Better Habits",
    thumbnail: "/thumbnails/science-of-better-habits.jpg",
    channel: "Hoy Learn",
    category: "Education",
    views: 3_600_000,
    likes: 97_000,
    commentCount: 4_310,
    uploadedDaysAgo: 1,
    duration: "9:18",
    description:
      "Why do some habits stick while others fade in a week? We break down the research on cues, rewards, and routines.",
  },
  {
    id: "epic-road-trip-vlog",
    title: "Epic Road Trip Vlog",
    thumbnail: "/thumbnails/epic-road-trip-vlog.jpg",
    channel: "Hoy Adventures",
    category: "Travel",
    views: 1_900_000,
    likes: 52_000,
    commentCount: 2_954,
    uploadedDaysAgo: 2,
    duration: "14:32",
    description:
      "2,000 miles, 6 states, 1 very patient dog. The full road trip from start to finish.",
  },
  {
    id: "react-vs-nextjs",
    title: "React vs. Next.js - Which One?",
    thumbnail: "/thumbnails/react-vs-nextjs.jpg",
    channel: "Hoy Dev",
    category: "Tech",
    views: 4_200_000,
    likes: 118_000,
    commentCount: 7_802,
    uploadedDaysAgo: 3,
    duration: "11:05",
    description:
      "React is a library, Next.js is a framework built on it. We compare routing, rendering, and when you actually need each.",
  },
  {
    id: "simple-home-workouts",
    title: "Simple Home Workouts",
    thumbnail: "/thumbnails/simple-home-workouts.jpg",
    channel: "Hoy Fitness",
    category: "Fitness",
    views: 1_100_000,
    likes: 29_000,
    commentCount: 1_205,
    uploadedDaysAgo: 4,
    duration: "7:46",
    description:
      "No equipment, no excuses. A quick routine you can do in your living room.",
  },
  {
    id: "coffee-shop-study-vibes",
    title: "Coffee Shop Study Vibes",
    thumbnail: "/thumbnails/coffee-shop-study-vibes.jpg",
    channel: "Hoy Study",
    category: "Music",
    views: 820_000,
    likes: 19_000,
    commentCount: 734,
    uploadedDaysAgo: 5,
    duration: "13:22",
    description:
      "Soft jazz and café ambience to help you focus. Put it on, grab a drink, and get to work.",
  },
  {
    id: "top-10-travel-destinations",
    title: "Top 10 Travel Destinations",
    thumbnail: "/thumbnails/top-10-travel-destinations.jpg",
    channel: "Hoy Travel",
    category: "Travel",
    views: 2_400_000,
    likes: 61_000,
    commentCount: 3_388,
    uploadedDaysAgo: 14,
    duration: "6:48",
    description:
      "Our favorite places from a year on the road, ranked. Number one surprised even us.",
  },
  {
    id: "30-min-full-body-workout",
    title: "30 Min Full Body Workout",
    thumbnail: "/thumbnails/30-min-full-body-workout.jpg",
    channel: "Hoy Fitness",
    category: "Fitness",
    views: 950_000,
    likes: 23_000,
    commentCount: 987,
    uploadedDaysAgo: 3,
    duration: "9:36",
    description:
      "A full body session that hits everything: warm-up, strength circuits, and a cool-down stretch.",
  },
  {
    id: "easy-weeknight-dinners",
    title: "Easy Weeknight Dinners",
    thumbnail: "/thumbnails/easy-weeknight-dinners.jpg",
    channel: "Hoy Eats",
    category: "Food",
    views: 540_000,
    likes: 14_000,
    commentCount: 612,
    uploadedDaysAgo: 5,
    duration: "12:11",
    description:
      "Five dinners, thirty minutes each, minimal cleanup. Recipes are in the pinned comment.",
  },
  {
    id: "my-gym-routine",
    title: "My Gym Routine | Full Workout (Upper Body + Core)",
    thumbnail: "/thumbnails/my-gym-routine.jpg",
    channel: "Hoy Vlogs",
    category: "Fitness",
    views: 312_000,
    likes: 9_400,
    commentCount: 488,
    uploadedDaysAgo: 3,
    duration: "10:21",
    description:
      "My current upper body and core routine, with sets and reps for every exercise.",
  },
  {
    id: "exploring-colorado",
    title: "Exploring Colorado | Hiking, Food & Good Friends",
    thumbnail: "/thumbnails/exploring-colorado.jpg",
    channel: "Hoy Vlogs",
    category: "Travel",
    views: 673_000,
    likes: 21_000,
    commentCount: 903,
    uploadedDaysAgo: 7,
    duration: "15:47",
    description:
      "A long weekend in the mountains: trails, tacos, and too many photos of the dog.",
  },
  {
    id: "study-with-me",
    title: "Study With Me | Focus Music & Cozy Vibes",
    thumbnail: "/thumbnails/study-with-me.jpg",
    channel: "Hoy Vlogs",
    category: "Music",
    views: 421_000,
    likes: 11_000,
    commentCount: 356,
    uploadedDaysAgo: 14,
    duration: "8:32",
    description:
      "Put your phone away and study with me. Lo-fi playlist included.",
  },
  {
    id: "easy-weeknight-dinner-ideas",
    title: "Easy Weeknight Dinner Ideas",
    thumbnail: "/thumbnails/easy-weeknight-dinner-ideas.jpg",
    channel: "Hoy Vlogs",
    category: "Food",
    views: 598_000,
    likes: 16_000,
    commentCount: 571,
    uploadedDaysAgo: 14,
    duration: "11:03",
    description:
      "What I actually cook on busy weeknights. Nothing fancy, all tasty.",
  },
  {
    id: "life-update",
    title: "Life Update | Goals, Plans, & What's Next",
    thumbnail: "/thumbnails/life-update.jpg",
    channel: "Hoy Vlogs",
    category: "Lifestyle",
    views: 276_000,
    likes: 13_000,
    commentCount: 1_102,
    uploadedDaysAgo: 21,
    duration: "13:20",
    description:
      "It's been a while! Catching you up on everything and sharing what's coming to the channel.",
  },
  {
    id: "travel-vlog-san-diego",
    title: "Travel Vlog | San Diego",
    thumbnail: "/thumbnails/travel-vlog-san-diego.jpg",
    channel: "Hoy Vlogs",
    category: "Travel",
    views: 432_000,
    likes: 12_000,
    commentCount: 417,
    uploadedDaysAgo: 21,
    duration: "9:45",
    description: "Beaches, fish tacos, and a very happy dog at the dog beach.",
  },
  {
    id: "weekend-getaway",
    title: "Weekend Getaway | Hiking, Nature & Fresh Air",
    thumbnail: "/thumbnails/weekend-getaway.jpg",
    channel: "Hoy Vlogs",
    category: "Travel",
    views: 616_000,
    likes: 18_000,
    commentCount: 662,
    uploadedDaysAgo: 30,
    duration: "14:17",
    description:
      "Unplugging for 48 hours. Just trails, a cabin, and fresh air.",
  },
];

export function getVideo(id: string): Video | undefined {
  return VIDEOS.find((video) => video.id === id);
}

function videosById(ids: string[]): Video[] {
  return ids.map((id) => {
    const video = getVideo(id);
    if (!video) throw new Error(`Unknown video id: ${id}`);
    return video;
  });
}

export const HOME_SECTIONS: VideoSection[] = [
  {
    id: "recommended",
    title: "Recommended for you",
    icon: "recommended",
    videos: videosById([
      "a-day-in-my-life",
      "building-my-dream-setup",
      "best-foods-for-energy",
      "why-i-started-this-channel",
    ]),
  },
  {
    id: "trending",
    title: "Trending now",
    icon: "trending",
    videos: videosById([
      "science-of-better-habits",
      "epic-road-trip-vlog",
      "react-vs-nextjs",
      "simple-home-workouts",
    ]),
  },
  {
    id: "because-you-watched",
    title: "Because you watched",
    icon: "watched",
    videos: videosById([
      "coffee-shop-study-vibes",
      "top-10-travel-destinations",
      "30-min-full-body-workout",
      "easy-weeknight-dinners",
    ]),
  },
];

/** Same comments on every video until there is a backend. */
export const MOCK_COMMENTS: Comment[] = [
  {
    id: "c1",
    author: "@pawsandcoffee",
    text: "This is so relaxing. Love the vibes!",
    likes: 482,
    postedDaysAgo: 2,
  },
  {
    id: "c2",
    author: "@corgi.dad",
    text: "The part with the dog at the end made my whole day 😂",
    likes: 1_204,
    postedDaysAgo: 1,
  },
  {
    id: "c3",
    author: "@trailsandtails",
    text: "Where did you get that mug? Asking for a friend.",
    likes: 57,
    postedDaysAgo: 2,
  },
];

export function matchesCategory(video: Video, category: Category): boolean {
  if (category === "All") return true;
  if (category === "Recently uploaded") {
    return video.uploadedDaysAgo <= RECENT_UPLOAD_DAYS;
  }
  return video.category === category;
}
