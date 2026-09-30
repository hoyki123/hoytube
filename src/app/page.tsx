import { HomeFeed } from "@/components/home-feed";
import { HOME_SECTIONS } from "@/lib/videos";

export default function HomePage() {
  return <HomeFeed sections={HOME_SECTIONS} />;
}
