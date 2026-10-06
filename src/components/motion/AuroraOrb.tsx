"use client";

import { cn } from "@/lib/utils";
import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";

type AuroraOrbProps = {
  className?: string;
  /** Diameter of the sphere in any CSS length. */
  size?: number | string;
  /** Adds two slow counter-rotating orbit rings for extra depth. */
  rings?: boolean;
  /** Extra glow spread behind the sphere. */
  glow?: boolean;
};

/**
 * The site's signature depth device: a layered sphere rather than a flat
 * radial blob. Three stops (core, rim light, inner shade) fake a lit 3D
 * ball, and the whole thing drifts so the background is never static.
 *
 * Every stop is painted from theme tokens, so one call site reads
 * correctly in all three palettes — there is no per-theme colour here
 * and no hue rotation to tune. Vary `size` and `rings` to keep two
 * orbs from looking like copies.
 *
 * It is decorative only — the layers are all aria-hidden by the parent.
 */
export default function AuroraOrb({
  className,
  size = 420,
  rings = false,
  glow = true,
}: AuroraOrbProps) {
  const reduced = useReducedMotionSafe();
  const dimension = typeof size === "number" ? `${size}px` : size;

  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute", className)}
      style={{ width: dimension, height: dimension }}
    >
      {/* Outer bloom — makes the orb feel like it emits light. Painted from
          the theme's own accent tokens rather than a fixed amber so it never
          fights the active palette. Blur lives in the inline filter, not a
          Tailwind class: an inline `filter` replaces the class's filter
          wholesale, so `blur-3xl` would otherwise be silently dropped. */}
      {glow && (
        <div
          className="absolute -inset-[38%] rounded-full opacity-45"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, var(--primary-glow-strong), var(--accent-2-soft) 46%, transparent 70%)",
            filter: "blur(64px)",
          }}
        />
      )}

      {/* Sphere body. The blur lives on a static inner layer while the drift
          runs on the wrapper — a filtered element that also animates its own
          transform gets re-rastered every frame instead of being composited. */}
      <div className={cn("absolute inset-0", !reduced && "animate-orb-drift")}>
        <div
          className="absolute inset-0 rounded-full"
          style={{ filter: "blur(24px)" }}
        >
          <div className="orb-core absolute inset-0 rounded-full" />
          <div className="orb-shade absolute inset-0 rounded-full" />
          <div className="orb-rim absolute inset-0 rounded-full" />
        </div>
      </div>

      {/* Orbit rings. Each one is two nested elements: the outer holds the
          static 3D tilt and the inner runs the spin keyframe. A keyframe
          animating `transform` would otherwise replace the inline
          rotateX/rotateZ entirely and flatten the ring. */}
      {rings && (
        <>
          <div
            className="absolute -inset-[14%]"
            style={{ transform: "rotateX(74deg)" }}
          >
            <div
              className={cn(
                "absolute inset-0 rounded-[50%] border border-white/40",
                !reduced && "animate-ring-spin",
              )}
              style={{ animationDirection: "reverse" }}
            />
          </div>
          <div
            className="absolute -inset-[30%]"
            style={{ transform: "rotateX(66deg) rotateZ(38deg)" }}
          >
            <div
              className={cn(
                "absolute inset-0 rounded-[50%] border border-primary/30",
                !reduced && "animate-ring-spin",
              )}
            />
          </div>
        </>
      )}
    </div>
  );
}