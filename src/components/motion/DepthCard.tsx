import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";

type DepthCardProps = {
  children: ReactNode;

  x: number;
  y: number;

  rotate?: number;

  depth?: number;

  drift?: number;
  duration?: number;
  delay?: number;
  className?: string;

  compact?: boolean;
};

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
