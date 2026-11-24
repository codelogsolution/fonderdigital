"use client";

import { memo, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";

type RotatingTextProps = {
  words: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  holdPause?: number;
  initialHoldPause?: number;
  delay?: number;
  className?: string;
  onWordChange?: (index: number) => void;
};

function RotatingText({
  words,
  typeSpeed = 95,
  deleteSpeed = 70,
  holdPause = 1800,
  initialHoldPause = 1200,
  delay = 0,
  className,
  onWordChange,
}: RotatingTextProps) {
  const reduced = useReducedMotionSafe();
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState(words[0] ?? "");
  const [phase, setPhase] = useState<"waiting" | "typing" | "deleting">(
    "waiting",
  );
  const hasRotatedRef = useRef(false);
  const onWordChangeRef = useRef(onWordChange);
  useEffect(() => {
    onWordChangeRef.current = onWordChange;
  }, [onWordChange]);

  useEffect(() => {
    const current = words[wordIndex] ?? "";
    if (reduced) return;

    let timer: ReturnType<typeof setTimeout> | undefined;

    if (phase === "waiting") {
      timer = setTimeout(() => setPhase("typing"), delay);
    } else if (phase === "typing") {
      if (text.length < current.length) {
        timer = setTimeout(
          () => setText(current.slice(0, text.length + 1)),
          typeSpeed,
        );
      } else {
        const visiblePause = hasRotatedRef.current
          ? holdPause
          : initialHoldPause;
        timer = setTimeout(() => {
          hasRotatedRef.current = true;
          setPhase("deleting");
        }, visiblePause);
      }
    } else {
      if (text.length > 0) {
        timer = setTimeout(() => setText(text.slice(0, -1)), deleteSpeed);
      } else {
        timer = setTimeout(() => {
          const next = (wordIndex + 1) % words.length;
          setWordIndex(next);
          onWordChangeRef.current?.(next);
          setPhase("typing");
        }, 90);
      }
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [
    phase,
    text,
    wordIndex,
    words,
    typeSpeed,
    deleteSpeed,
    holdPause,
    initialHoldPause,
    delay,
    reduced,
  ]);

  const currentFull = words[wordIndex] ?? "";
  const isComplete = !reduced && text === currentFull && phase === "typing";

  return (
    <span className={cn("relative inline-block whitespace-nowrap", className)}>
      <span className="sr-only">{currentFull}</span>
      <span
        aria-hidden="true"
        className="font-bold bg-linear-to-r from-primary via-primary to-primary bg-clip-text text-transparent"
      >
        {isComplete ? currentFull : phase === "waiting" ? "" : text || " "}
      </span>
      {(phase === "typing" || phase === "deleting") && (
        <span className="inline-block align-middle ml-px h-[0.95em] w-0.5 bg-primary animate-pulse mb-1.5" />
      )}
    </span>
  );
}

export default memo(RotatingText);
