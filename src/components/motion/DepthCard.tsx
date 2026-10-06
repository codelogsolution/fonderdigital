import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";

type DepthCardProps = {
  children: ReactNode;
  /** Where the card sits relative to the pinned device, as a percentage. */
  x: number;
  y: number;
  /** Rotation in degrees, so no two cards share the same angle. */
  rotate?: number;
  /** Depth in the 3D stack. Negative values push the card behind the device. */
  depth?: number;
  /** Drift amplitude in px — how far the card floats from its anchor. */
  drift?: number;
  duration?: number;
  delay?: number;
  className?: string;
  /** Rendered small on narrow viewports where the orbit is hidden. */
  compact?: boolean;
};

/**
 * A single card orbiting a pinned device.
 *
 * Two transforms are combined deliberately:
 *  - the *layout* transform (`left`/`top` + rotate) is static and owns placement
 *  - the *float* transform runs on a nested wrapper, driven by a CSS keyframe
 *
 * Keeping them on separate elements is what allows the card to sit at a fixed
 * point in the composition and still breathe independently. Animating `transform`
 * on the same element that carries `rotate` would replace the rotation outright
 * and every card would snap square to the viewport.
 */
export default function DepthCard({
  children,
  x,
  y,
  rotate = 0,
  depth = 0,
  drift = 10,
  duration = 9,
  delay = 0,
  className,
  compact = false,
}: DepthCardProps) {
  const reduced = useReducedMotionSafe();

  return (
    <div
      className={cn(
        "pointer-events-none absolute z-20 w-[13rem] sm:w-[15rem]",
        compact && "hidden lg:block",
        className,
      )}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        // `translate(-50%,-50%)` centres the card on its anchor point.
        transform: `translate(-50%, -50%) rotate(${rotate}deg)`,
      }}
    >
      <div
        className={cn("animate-card-float", !reduced && "will-change-transform")}
        style={
          reduced
            ? undefined
            : {
                animationDuration: `${duration}s`,
                animationDelay: `${delay}s`,
                // Depth drives both the parallax offset and how much the card
                // recedes: negative depth sits behind the device and reads smaller.
                "--float-y": `${-drift}px`,
                "--float-x": `${depth * 6}px`,
              } as React.CSSProperties
        }
      >
        {children}
      </div>
    </div>
  );
}
