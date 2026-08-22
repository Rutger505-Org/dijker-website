"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Scroll-progress indicator styled as the dijker's toothed drive belt.
 *
 * A vertical, black-and-white toothed nylon belt is pinned flush to the right
 * edge of the viewport in place of the usual scrollbar. The dijker rides down
 * the belt as the page scrolls — a literal nod to the spiral belt drive
 * multispeed®.
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
      className="pointer-events-none fixed inset-y-0 right-0 z-40 hidden w-10 select-none md:block"
    >
      {/* the belt — flush to the right edge, pure black & white */}
      <svg
        className="h-full w-full"
        preserveAspectRatio="none"
        viewBox="0 0 40 1000"
      >
        <defs>
          {/* black teeth on a white belt body */}
          <pattern
            id="belt-teeth"
            width="40"
            height="18"
            patternUnits="userSpaceOnUse"
          >
            <rect x="28" y="3" width="12" height="12" rx="2" className="fill-foreground" />
          </pattern>
        </defs>
        {/* belt body (white) with black edges */}
        <rect
          x="28"
          y="0"
          width="12"
          height="1000"
          className="fill-background stroke-foreground"
          strokeWidth="2"
        />
        {/* teeth track */}
        <rect x="28" y="0" width="12" height="1000" fill="url(#belt-teeth)" />
      </svg>

      {/* the dijker riding on top of the belt (sitting to its left, wheels on it) */}
      <div
        className="absolute right-2 transition-[top] duration-75 ease-out"
        style={{ top: `calc(${progress * 100}% )`, marginTop: "-16px" }}
      >
        <DijkerIcon className="size-9 -rotate-90 drop-shadow" />
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
