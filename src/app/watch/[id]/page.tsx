import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Comments } from "@/components/watch/comments";
import { RelatedVideos } from "@/components/watch/related-videos";
import { VideoActions } from "@/components/watch/video-actions";
import { VideoDescription } from "@/components/watch/video-description";
import { VideoPlayer } from "@/components/watch/video-player";
import { CHANNELS, getVideo, MOCK_COMMENTS, VIDEOS } from "@/lib/videos";

// Every video is known at build time; unknown ids 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return VIDEOS.map((video) => ({ id: video.id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/watch/[id]">): Promise<Metadata> {
  const video = getVideo((await params).id);
  if (!video) return {};
  return {
    title: video.title,
    description: video.description.split("\n")[0],
  };
}

export default async function WatchPage({ params }: PageProps<"/watch/[id]">) {
  const video = getVideo((await params).id);
  if (!video) notFound();

  return (
    // Keyed so player, ratings and comments reset when navigating between videos.
    <div
      key={video.id}
      className="mx-auto flex max-w-[1760px] flex-col gap-6 pb-12 sm:px-6 sm:pt-6 lg:flex-row"
    >
      <div className="min-w-0 flex-1">
        <VideoPlayer
          src={video.src}
          poster={video.thumbnail}
          title={video.title}
          duration={video.duration}
        />
        <div className="px-4 sm:px-0">
          <h1 className="mt-3 text-xl font-bold">{video.title}</h1>
          <VideoActions
            channelName={video.channel}
            channel={CHANNELS[video.channel]}
            likes={video.likes}
            title={video.title}
          />
          <VideoDescription
            views={video.views}
            uploadedDaysAgo={video.uploadedDaysAgo}
            description={video.description}
          />
          <Comments
            count={video.commentCount}
            initialComments={MOCK_COMMENTS}
          />
        </div>
      </div>

      <aside className="shrink-0 px-4 sm:px-0 lg:w-[380px] xl:w-[420px]">
        <RelatedVideos
          current={video}
          videos={VIDEOS.filter((other) => other.id !== video.id)}
        />
      </aside>
    </div>
  );
}
