"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { useEffect, useState } from "react";

const playEvent = "dijker:play-video";

// Lets a button elsewhere on the page start a specific embed.
export function playVideo(id: string) {
  window.dispatchEvent(new CustomEvent<string>(playEvent, { detail: id }));
}

// The YouTube player costs ~850 KB of JS/CSS, so it only loads once someone
// actually wants to watch.
export function YouTubeEmbed({
  id,
  title,
  poster,
  playLabel,
}: {
  id: string;
  title: string;
  poster: string;
  playLabel: string;
}) {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const onPlay = (event: Event) => {
      if ((event as CustomEvent<string>).detail === id) setPlaying(true);
    };
    window.addEventListener(playEvent, onPlay);
    return () => window.removeEventListener(playEvent, onPlay);
  }, [id]);

  if (playing) {
    return (
      <iframe
        className="h-full w-full"
        src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`${playLabel}: ${title}`}
      className="group relative block h-full w-full cursor-pointer"
    >
      <Image
        src={poster}
        alt=""
        fill
        sizes="(min-width: 768px) 50vw, 100vw"
        className="object-cover"
      />
      <span className="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/70 text-white transition-colors group-hover:bg-red-600">
        <Play className="ml-1 size-7 fill-current" />
      </span>
    </button>
  );
}
