"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";
type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "left" | "right";
};

export default function Reveal({
  children,
  delay = 0,
  className,
  direction = "up",
}: RevealProps) {
  const prefersReducedMotion = useReducedMotionSafe();
  const offset = direction === "left" ? -20 : direction === "right" ? 20 : 0;

  return (
    <motion.div
      className={className}
      initial={
        prefersReducedMotion
          ? false
          : { x: offset, y: direction === "up" ? 14 : 0 }
      }
      whileInView={{ x: 0, y: 0 }}
      viewport={{ once: true, margin: "-72px" }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.48,
        delay: prefersReducedMotion ? 0 : delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
    >
      {children}
    </motion.div>
  );
}
