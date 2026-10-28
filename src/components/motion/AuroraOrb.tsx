"use client";

import { cn } from "@/lib/utils";
import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";

type AuroraOrbProps = {
  className?: string;

  size?: number | string;

  rings?: boolean;

  glow?: boolean;
};

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