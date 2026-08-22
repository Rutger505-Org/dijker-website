"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

/**
 * Interactive explainer for the dijker's "spiral belt drive multispeed®".
 *
 * The mechanism: a toothed nylon belt is wound in a flat spiral around the
 * wheel axle. Pushing a pedal in a straight line pays belt on/off the spiral,
 * which changes the effective radius at which force is applied to the axle —
 * a continuously variable gear ratio. A larger wrap = higher gear (speed),
 * a smaller wrap = lower gear (torque). Left and right belts act independently.
 *
 * The diagram is a self-contained SVG driven by a single "gear" slider so a
 * visitor can *feel* how belt length maps to gear ratio.
 */
export function DriveSystem() {
  const t = useTranslations("drive");

  // 0 = lowest gear (small spiral, high torque) .. 1 = highest gear (large spiral)
  const [gear, setGear] = useState(0.45);

  // Spiral geometry: turns of belt wound around the axle.
  const cx = 150;
  const cy = 150;
  const axleR = 14;
  const minOuter = 40;
  const maxOuter = 120;
  const outer = minOuter + gear * (maxOuter - minOuter);

  // Build an Archimedean spiral path from the axle out to the current outer radius.
  const turns = 3.2;
  const steps = 240;
  const spiralPoints: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const f = i / steps;
    const r = axleR + f * (outer - axleR);
    const a = f * turns * Math.PI * 2;
    const x = cx + r * Math.cos(a);
    const y = cy + r * Math.sin(a);
    spiralPoints.push(`${x.toFixed(2)},${y.toFixed(2)}`);
  }
  const spiralPath = `M ${spiralPoints.join(" L ")}`;

  // Belt "tail" leaving the spiral tangentially down to the pedal linkage.
  const tailAngle = turns * Math.PI * 2;
  const tailX = cx + outer * Math.cos(tailAngle);
  const tailY = cy + outer * Math.sin(tailAngle);

  const gearPct = Math.round(gear * 100);
  const ratio = (0.6 + gear * 2.4).toFixed(2); // illustrative ratio label

  return (
    <div className="grid gap-10 md:grid-cols-2 md:items-center">
      <div className="space-y-5">
        <h3 className="text-2xl font-semibold tracking-tight">
          {t("heading")}
        </h3>
        <p className="text-muted-foreground">{t("intro")}</p>

        <ul className="space-y-3">
          {["step1", "step2", "step3", "step4"].map((k, i) => (
            <li key={k} className="flex gap-3">
              <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border border-border text-sm font-semibold">
                {i + 1}
              </span>
              <span className="text-muted-foreground">{t(k)}</span>
            </li>
          ))}
        </ul>

        <div className="rounded-xl border border-border bg-muted/40 p-5">
          <p className="text-sm font-medium">{t("noChainTitle")}</p>
          <p className="mt-1 text-sm text-muted-foreground">{t("noChain")}</p>
        </div>
      </div>

      <figure className="space-y-4">
        <div className="overflow-hidden rounded-xl border border-border bg-muted/30 p-4">
          <svg
            viewBox="0 0 300 300"
            className="mx-auto h-auto w-full max-w-sm"
            role="img"
            aria-label={t("diagramAlt")}
          >
            {/* wheel axle */}
            <circle cx={cx} cy={cy} r={axleR} className="fill-foreground" />
            <circle cx={cx} cy={cy} r={axleR - 5} className="fill-background" />

            {/* wound belt spiral */}
            <path
              d={spiralPath}
              className="fill-none stroke-foreground"
              strokeWidth={5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* effective-radius indicator */}
            <circle
              cx={cx}
              cy={cy}
              r={outer}
              className="fill-none stroke-primary/50"
              strokeWidth={1}
              strokeDasharray="4 4"
            />

            {/* belt tail toward pedal */}
            <path
              d={`M ${tailX.toFixed(2)} ${tailY.toFixed(2)} L ${tailX.toFixed(
                2,
              )} 285`}
              className="stroke-primary"
              strokeWidth={5}
              strokeLinecap="round"
            />
            <rect
              x={tailX - 18}
              y={286}
              width={36}
              height={10}
              rx={3}
              className="fill-primary"
            />
          </svg>

          <div className="mt-3 space-y-2">
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={gear}
              onChange={(e) => setGear(Number(e.target.value))}
              aria-label={t("sliderLabel")}
              className="w-full accent-[var(--primary)]"
            />
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>{t("lowGear")}</span>
              <span className="font-medium text-foreground">
                {t("ratio", { ratio, pct: gearPct })}
              </span>
              <span>{t("highGear")}</span>
            </div>
          </div>
        </div>
        <figcaption className="text-center text-sm text-muted-foreground">
          {t("caption")}
        </figcaption>
      </figure>
    </div>
  );
}
