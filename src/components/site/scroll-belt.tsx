"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Subtle scroll-progress indicator styled as the direct-current symbol (⎓)
 * rotated 90° clockwise and repeated seamlessly down the right edge — a
 * continuous solid line beside a parallel dashed line.
 *
 * It reads like a normal, understated scrollbar: a faint DC-symbol track with a
 * slightly stronger "thumb" segment that moves with scroll progress.
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
      className="pointer-events-none fixed inset-y-0 right-0 z-40 hidden w-4 select-none text-foreground md:block"
    >
      <svg
        className="h-full w-full"
        preserveAspectRatio="none"
        viewBox="0 0 16 1000"
      >
        <defs>
          {/* direct-current symbol rotated 90° CW: solid line (right) beside a
              dashed line (left). Tile abuts seamlessly so the solid line runs
              continuous and the dashes form an even dashed line. */}
          <pattern
            id="dc-symbol"
            width="16"
            height="8"
            patternUnits="userSpaceOnUse"
          >
            {/* continuous solid line (spans full tile height → no gaps) */}
            <rect x="10" y="0" width="1.6" height="8" fill="currentColor" />
            {/* one dash of the parallel dashed line per tile */}
            <rect x="5" y="1" width="1.6" height="6" rx="0.8" fill="currentColor" />
          </pattern>
        </defs>

        {/* faint full-height DC-symbol track */}
        <rect
          x="0"
          y="0"
          width="16"
          height="1000"
          fill="url(#dc-symbol)"
          opacity="0.18"
        />

        {/* stronger "thumb": a short run of DC symbols at the scroll position */}
        <rect
          x="0"
          width="16"
          height="80"
          y={progress * (1000 - 80)}
          fill="url(#dc-symbol)"
          opacity="0.7"
        />
      </svg>
    </div>
  );
}
