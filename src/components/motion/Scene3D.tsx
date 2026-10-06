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
  /** Maximum rotation in degrees at the edge of the pointer range. */
  intensity?: number;
  /** Pixels the stage shifts toward the pointer. */
  shift?: number;
  /** Adds a slow constant float on top of the pointer tilt. */
  float?: boolean;
  /** Resting rotation applied before any pointer input. */
  resting?: { x?: number; y?: number };
};

const SPRING = { stiffness: 120, damping: 18, mass: 0.6 };

/**
 * A true 3D stage: the parent establishes perspective and the inner layer is
 * rotated in 3D space toward the pointer, with a spring so it settles rather
 * than snapping. This is what makes a flat card read as a physical object
 * tilted toward the reader.
 *
 * Touch devices and reduced-motion readers get a static, upright composition —
 * a hover-only tilt would otherwise leave the layout frozen mid-rotation.
 */
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

  // Normalised pointer position, -0.5 (left/top) to 0.5 (right/bottom).
  const px = useMotionValue(0);
  const py = useMotionValue(0);

  const springPx = useSpring(px, SPRING);
  const springPy = useSpring(py, SPRING);

  // Pointer left/right drives Y rotation, top/bottom drives X rotation, so the
  // stage always turns *toward* the cursor like a real object on a hinge.
  // `resting` is folded into the output range so the two never contend for the
  // same transform value.
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
      // clientX/Y are viewport-absolute, so the element's own offset has to be
      // removed before dividing by its size. Without this the tilt is skewed by
      // however far down the page the stage sits.
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
      {/* Outer layer owns the pointer rotation (framer-motion writes
          `transform`), inner layer owns the idle float (a CSS keyframe also
          writes `transform`). Keeping them on separate elements stops one from
          silently clobbering the other. */}
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