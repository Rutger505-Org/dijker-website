"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Scroll-progress indicator styled as the dijker's toothed drive belt.
 *
 * A vertical toothed nylon belt is pinned to the right edge of the viewport in
 * place of the usual scrollbar visual. The dijker rides down the belt as the
 * page scrolls — a literal nod to the spiral belt drive multispeed®.
 */
export function ScrollBelt() {
  const [progress, setProgress] = useState(0);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    const update = () => {
      frame.current = null;
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, doc.scrollTop / max)) : 0);
    };
    const onScroll = () => {
      frame.current ??= requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-y-0 right-1 z-40 hidden w-8 select-none md:block"
    >
      {/* the belt */}
      <svg
        className="h-full w-full"
        preserveAspectRatio="none"
        viewBox="0 0 32 1000"
      >
        <defs>
          <pattern
            id="belt-teeth"
            width="32"
            height="16"
            patternUnits="userSpaceOnUse"
          >
            <rect x="11" y="0" width="10" height="16" className="fill-primary/25" />
            <rect x="9" y="4" width="14" height="8" rx="2" className="fill-primary/60" />
          </pattern>
        </defs>
        {/* belt body */}
        <rect x="10" y="0" width="12" height="1000" rx="6" className="fill-muted" />
        {/* teeth track */}
        <rect x="10" y="0" width="12" height="1000" fill="url(#belt-teeth)" />
        {/* traveled portion tinted */}
        <rect
          x="10"
          y="0"
          width="12"
          height={progress * 1000}
          rx="6"
          className="fill-primary/15"
        />
      </svg>

      {/* the dijker riding the belt */}
      <div
        className="absolute left-1/2 -translate-x-1/2 transition-[top] duration-75 ease-out"
        style={{ top: `calc(${progress * 100}% )`, marginTop: "-14px" }}
      >
        <DijkerIcon className="size-8 -rotate-90 drop-shadow" />
      </div>
    </div>
  );
}

/** Simplified side-profile silhouette of the dijker (teardrop pod, tadpole trike). */
function DijkerIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 40" className={className} role="img" aria-label="the dijker">
      {/* body pod */}
      <path
        d="M4 24 C4 15 14 8 30 8 C44 8 58 10 60 20 C61 24 58 27 52 27 L10 27 C6 27 4 26 4 24 Z"
        className="fill-foreground"
      />
      {/* lime top accent */}
      <path
        d="M12 12 C20 9 40 9 52 13 C46 11 22 11 14 14 Z"
        className="fill-primary"
      />
      {/* wheels */}
      <circle cx="16" cy="30" r="7" className="fill-foreground" />
      <circle cx="16" cy="30" r="3" className="fill-background" />
      <circle cx="48" cy="30" r="7" className="fill-foreground" />
      <circle cx="48" cy="30" r="3" className="fill-background" />
    </svg>
  );
}
