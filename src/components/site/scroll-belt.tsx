"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Subtle scroll-progress indicator styled as the direct-current symbol (⎓)
 * repeated down the right edge — a solid line over three dashes, stacked.
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
          {/* one direct-current symbol: solid line over three dashes */}
          <pattern
            id="dc-symbol"
            width="16"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            {/* solid top line */}
            <rect x="3" y="7" width="10" height="1.5" rx="0.75" fill="currentColor" />
            {/* three dashes below */}
            <rect x="3" y="11.5" width="2.4" height="1.5" rx="0.75" fill="currentColor" />
            <rect x="6.8" y="11.5" width="2.4" height="1.5" rx="0.75" fill="currentColor" />
            <rect x="10.6" y="11.5" width="2.4" height="1.5" rx="0.75" fill="currentColor" />
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
