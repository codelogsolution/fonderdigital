"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { MotionConfig } from "framer-motion";

type IdleWindow = Window & {
  requestIdleCallback?: (
    callback: () => void,
    options?: { timeout: number },
  ) => number;
  cancelIdleCallback?: (handle: number) => void;
};

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) return;

    const idleWindow = window as IdleWindow;
    let active = true;
    let lenis: { raf: (time: number) => void; destroy: () => void } | undefined;
    let frame = 0;
    let idleHandle: number | undefined;
    let timeoutHandle: number | undefined;

    const initialize = async () => {
      try {
        const { default: Lenis } = await import("lenis");
        if (!active) return;

        lenis = new Lenis({
          duration: 1.05,
          smoothWheel: true,
          wheelMultiplier: 0.9,
          touchMultiplier: 1,
          syncTouch: false,
        });

        const raf = (time: number) => {
          if (!active || !lenis) return;
          lenis.raf(time);
          frame = window.requestAnimationFrame(raf);
        };
        frame = window.requestAnimationFrame(raf);
      } catch {
        lenis = undefined;
      }
    };

    const scheduleInitialization = () => {
      if (idleWindow.requestIdleCallback) {
        idleHandle = idleWindow.requestIdleCallback(
          () => void initialize(),
          { timeout: 1200 },
        );
      } else {
        timeoutHandle = window.setTimeout(() => void initialize(), 150);
      }
    };

    if (document.readyState === "complete") {
      scheduleInitialization();
    } else {
      window.addEventListener("load", scheduleInitialization, { once: true });
    }

    return () => {
      active = false;
      window.removeEventListener("load", scheduleInitialization);
      if (idleHandle !== undefined) idleWindow.cancelIdleCallback?.(idleHandle);
      if (timeoutHandle !== undefined) window.clearTimeout(timeoutHandle);
      window.cancelAnimationFrame(frame);
      lenis?.destroy();
    };
  }, []);

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
