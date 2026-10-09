"use client";

import { useEffect, useRef } from "react";

// The poster image is the LCP element; attaching the video only after the page
// has loaded keeps it from competing for bandwidth on slow connections.
export function HeroVideo({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const attach = () => {
      const video = ref.current;
      if (!video) return;
      video.src = src;
      void video.play().catch(() => undefined);
    };
    if (document.readyState === "complete") {
      attach();
      return;
    }
    window.addEventListener("load", attach, { once: true });
    return () => window.removeEventListener("load", attach);
  }, [src]);

  return (
    <video
      ref={ref}
      className="absolute inset-0 -z-20 h-full w-full object-cover"
      autoPlay
      muted
      loop
      playsInline
      aria-hidden="true"
    />
  );
}
