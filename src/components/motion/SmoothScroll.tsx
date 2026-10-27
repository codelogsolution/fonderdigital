"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "framer-motion";

// Keep browser-native scrolling. Long pinned scenes and custom scroll inertia
// made ordinary wheel and trackpad gestures feel delayed on some devices.
export default function SmoothScroll({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
