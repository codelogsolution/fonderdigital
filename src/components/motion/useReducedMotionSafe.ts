"use client";

import { useCallback, useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

/**
 * Hydration-safe replacement for Framer Motion's `useReducedMotion`.
 *
 * `useReducedMotion` reads a module-level ref that is populated as soon as the
 * module is evaluated in the browser. That means the server always renders with
 * `false` while the first client render already returns `true`, so any markup
 * that is conditionally rendered or styled from this value produces a hydration
 * mismatch.
 *
 * `useSyncExternalStore` solves exactly this: React uses `getServerSnapshot` for
 * the server render *and* the first client render, then re-renders with the live
 * snapshot once hydration completes. Both sides therefore agree on the initial
 * output, and the value still updates live when the user changes the OS setting.
 */
export function useReducedMotionSafe(): boolean {
  const subscribe = useCallback((onChange: () => void) => {
    const media = window.matchMedia(QUERY);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const getSnapshot = useCallback(
    () => window.matchMedia(QUERY).matches,
    [],
  );

  // Keep `false` for the server render and the first client render so the two
  // trees match; the effect-free store swap below applies the real value after.
  const getServerSnapshot = useCallback(() => false, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export default useReducedMotionSafe;
