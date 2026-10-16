"use client";

import type { AnchorHTMLAttributes } from "react";
import { playVideo } from "@/components/site/youtube-embed";

// Scrolls to a YouTubeEmbed (via the href anchor) and starts it right away.
export function PlayVideoLink({
  videoId,
  onClick,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { videoId: string }) {
  return (
    <a
      {...props}
      onClick={(event) => {
        onClick?.(event);
        playVideo(videoId);
      }}
    />
  );
}
