"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import type { PointerEvent as ReactPointerEvent, ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";
import { cn } from "@/lib/utils";

type Scene3DProps = {
  children: ReactNode;
  className?: string;

  intensity?: number;

  shift?: number;

  float?: boolean;

  resting?: { x?: number; y?: number };
};

const SPRING = { stiffness: 120, damping: 18, mass: 0.6 };

export default function Scene3D({
  children,
  className,
  intensity = 8,
  shift = 18,
  float = true,
  resting = {},
}: Scene3DProps) {
  const reduced = useReducedMotionSafe();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  const px = useMotionValue(0);
  const py = useMotionValue(0);

  const springPx = useSpring(px, SPRING);
  const springPy = useSpring(py, SPRING);

  const rotateY = useTransform(
    springPx,
    [-0.5, 0.5],
    [(resting.y ?? 0) - intensity, (resting.y ?? 0) + intensity],
  );
  const rotateX = useTransform(
    springPy,
    [-0.5, 0.5],
    [(resting.x ?? 0) + intensity, (resting.x ?? 0) - intensity],
  );

  const translateX = useTransform(springPx, [-0.5, 0.5], [-shift, shift]);
  const translateY = useTransform(springPy, [-0.5, 0.5], [-shift, shift]);

  useEffect(() => {
    if (reduced) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const timer = setTimeout(() => setActive(true), 200);
    return () => clearTimeout(timer);
  }, [reduced]);

  const handlePointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (!active) return;
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;

      px.set((event.clientX - rect.left) / rect.width - 0.5);
      py.set((event.clientY - rect.top) / rect.height - 0.5);
    },
    [active, px, py],
  );

  const reset = useCallback(() => {
    px.set(0);
    py.set(0);
  }, [px, py]);

  if (reduced) {
    return (
      <div ref={sectionRef} data-scene3d="" className={cn("relative", className)}>
        {children}
      </div>
    );
  }

  return (
    <div
      ref={sectionRef}
      data-scene3d=""
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      style={{ perspective: 1400, perspectiveOrigin: "50% 50%" }}
      className={cn("relative", className)}
    >

      <motion.div
        style={{
          rotateX,
          rotateY,
          x: translateX,
          y: translateY,
          transformStyle: "preserve-3d",
        }}
        className="will-change-transform"
      >
        <div
          className={cn(float && "animate-float-slow")}
          style={{ transformStyle: "preserve-3d" }}
        >
          {children}
        </div>
      </motion.div>
    </div>
  );
}