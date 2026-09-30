"use client";

import {
  Captions,
  Check,
  Maximize,
  Minimize,
  Pause,
  PictureInPicture2,
  Play,
  Settings,
  Volume2,
  VolumeX,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/cn";
import { formatTimestamp, parseTimestamp } from "@/lib/format";

const PLAYBACK_RATES = [0.5, 0.75, 1, 1.25, 1.5, 2];

const controlButton =
  "grid size-10 shrink-0 place-items-center rounded-full hover:bg-white/15 disabled:opacity-40 disabled:hover:bg-transparent";

type VideoPlayerProps = {
  /** Media URL. Without one the player shows the poster and explains why it can't play. */
  src?: string;
  poster: string;
  title: string;
  /** Display duration like "12:34", used until the media reports its own. */
  duration: string;
};

export function VideoPlayer({
  src,
  poster,
  title,
  duration,
}: VideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(() =>
    parseTimestamp(duration),
  );
  const [muted, setMuted] = useState(false);
  const [rate, setRate] = useState(1);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => {
    const onChange = () =>
      setFullscreen(document.fullscreenElement === containerRef.current);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) {
      setUnavailable(true);
      return;
    }
    if (video.paused) {
      video.play().catch((error: unknown) => {
        // AbortError just means a pause() interrupted play(); anything else is a real failure.
        if (!(error instanceof DOMException && error.name === "AbortError")) {
          setUnavailable(true);
        }
      });
    } else {
      video.pause();
    }
  };

  const toggleMute = () => {
    const next = !muted;
    if (videoRef.current) videoRef.current.muted = next;
    setMuted(next);
  };

  const seek = (seconds: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = seconds;
    setCurrentTime(seconds);
  };

  const changeRate = (nextRate: number) => {
    if (videoRef.current) videoRef.current.playbackRate = nextRate;
    setRate(nextRate);
    setSettingsOpen(false);
  };

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      void document.exitFullscreen();
    } else {
      void containerRef.current?.requestFullscreen();
    }
  };

  const togglePictureInPicture = async () => {
    const video = videoRef.current;
    if (!video) return;
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else {
        await video.requestPictureInPicture();
      }
    } catch {
      // The browser refused (unsupported or no media loaded); nothing to do.
    }
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.target instanceof HTMLInputElement) return;
    const onPlayer = event.target === event.currentTarget;
    switch (event.key) {
      case " ":
        // Let a focused button handle its own Space press.
        if (!onPlayer) return;
        break;
      case "k":
        break;
      case "m":
        toggleMute();
        event.preventDefault();
        return;
      case "f":
        toggleFullscreen();
        event.preventDefault();
        return;
      default:
        return;
    }
    event.preventDefault();
    togglePlay();
  };

  const showControls = !playing || settingsOpen;

  return (
    <div
      ref={containerRef}
      role="region"
      aria-label={`Video player: ${title}`}
      tabIndex={0}
      onKeyDown={onKeyDown}
      className="group relative aspect-video overflow-hidden bg-black text-white sm:rounded-xl [&:fullscreen]:rounded-none"
    >
      {!started && (
        <Image
          src={poster}
          alt=""
          fill
          sizes="(min-width: 1024px) 70vw, 100vw"
          loading="eager"
          fetchPriority="high"
          className="object-cover"
        />
      )}

      {src && (
        <video
          ref={videoRef}
          src={src}
          playsInline
          preload="metadata"
          onClick={togglePlay}
          onPlay={() => {
            setStarted(true);
            setPlaying(true);
            setUnavailable(false);
          }}
          onPause={() => setPlaying(false)}
          onTimeUpdate={(event) =>
            setCurrentTime(event.currentTarget.currentTime)
          }
          onLoadedMetadata={(event) => {
            const seconds = event.currentTarget.duration;
            if (Number.isFinite(seconds)) setTotalSeconds(seconds);
          }}
          onVolumeChange={(event) => setMuted(event.currentTarget.muted)}
          onError={() => setUnavailable(true)}
          className={cn("absolute inset-0 size-full", !started && "opacity-0")}
        />
      )}

      {unavailable ? (
        <div
          role="status"
          className="absolute inset-0 grid place-items-center bg-black/70 p-6 text-center"
        >
          <div>
            <p className="text-lg font-medium">Playback isn&apos;t available</p>
            <p className="mt-1 text-sm text-white/75">
              {src
                ? "This video couldn't be loaded. Try again later."
                : "This demo video has no media file yet."}
            </p>
          </div>
        </div>
      ) : (
        !playing && (
          <button
            type="button"
            onClick={togglePlay}
            aria-label="Play"
            className="absolute inset-0 m-auto grid size-16 place-items-center rounded-full bg-black/60 transition-colors hover:bg-black/75 sm:size-20"
          >
            <Play className="ml-1 size-8 fill-current sm:size-10" aria-hidden />
          </button>
        )
      )}

      <div
        className={cn(
          "absolute inset-x-0 bottom-0 bg-linear-to-t from-black/75 to-transparent px-2 pt-10 pb-1 transition-opacity sm:px-4 sm:pb-2",
          showControls
            ? "opacity-100"
            : "opacity-0 group-focus-within:opacity-100 group-hover:opacity-100",
        )}
      >
        <input
          type="range"
          min={0}
          max={totalSeconds}
          step="any"
          value={currentTime}
          onChange={(event) => seek(Number(event.target.value))}
          disabled={!src}
          aria-label="Seek"
          aria-valuetext={`${formatTimestamp(currentTime)} of ${formatTimestamp(totalSeconds)}`}
          className="block h-1 w-full cursor-pointer accent-red-600 disabled:cursor-default"
        />

        <div className="mt-1 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={togglePlay}
              aria-label={playing ? "Pause (k)" : "Play (k)"}
              className={controlButton}
            >
              {playing ? (
                <Pause className="size-6 fill-current" aria-hidden />
              ) : (
                <Play className="size-6 fill-current" aria-hidden />
              )}
            </button>
            <button
              type="button"
              onClick={toggleMute}
              aria-label={muted ? "Unmute (m)" : "Mute (m)"}
              className={controlButton}
            >
              {muted ? (
                <VolumeX className="size-6" aria-hidden />
              ) : (
                <Volume2 className="size-6" aria-hidden />
              )}
            </button>
            <span className="ml-1 text-sm whitespace-nowrap tabular-nums">
              {formatTimestamp(currentTime)} / {formatTimestamp(totalSeconds)}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled
              aria-label="Subtitles unavailable"
              title="Subtitles unavailable"
              className={cn(controlButton, "max-sm:hidden")}
            >
              <Captions className="size-6" aria-hidden />
            </button>

            <div
              className="relative"
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) {
                  setSettingsOpen(false);
                }
              }}
              onKeyDown={(event) => {
                if (event.key === "Escape") setSettingsOpen(false);
              }}
            >
              <button
                type="button"
                onClick={() => setSettingsOpen((open) => !open)}
                aria-label="Settings"
                aria-haspopup="menu"
                aria-expanded={settingsOpen}
                className={controlButton}
              >
                <Settings
                  className={cn(
                    "size-6 transition-transform",
                    settingsOpen && "rotate-45",
                  )}
                  aria-hidden
                />
              </button>
              {settingsOpen && (
                <div
                  role="menu"
                  aria-label="Playback speed"
                  className="absolute right-0 bottom-12 w-44 rounded-xl bg-black/90 py-2 text-sm"
                >
                  <p className="px-4 pb-1 text-white/60">Playback speed</p>
                  {PLAYBACK_RATES.map((option) => (
                    <button
                      key={option}
                      type="button"
                      role="menuitemradio"
                      aria-checked={option === rate}
                      onClick={() => changeRate(option)}
                      className="flex w-full items-center gap-3 px-4 py-1.5 text-left hover:bg-white/15"
                    >
                      <Check
                        className={cn("size-4", option !== rate && "invisible")}
                        aria-hidden
                      />
                      {option === 1 ? "Normal" : option}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={togglePictureInPicture}
              disabled={!src}
              aria-label="Miniplayer"
              className={cn(controlButton, "max-sm:hidden")}
            >
              <PictureInPicture2 className="size-6" aria-hidden />
            </button>
            <button
              type="button"
              onClick={toggleFullscreen}
              aria-label={
                fullscreen ? "Exit full screen (f)" : "Full screen (f)"
              }
              className={controlButton}
            >
              {fullscreen ? (
                <Minimize className="size-6" aria-hidden />
              ) : (
                <Maximize className="size-6" aria-hidden />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
