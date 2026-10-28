"use client";

import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";

import { motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

const rowA = [
  "Web development",
  "Mobile apps",
  "SEO",
  "Branding",
  "UI/UX design",
  "Growth marketing",
];

const rowB = [
  "Next.js",
  "React Native",
  "Technical SEO",
  "Design systems",
  "Content",
  "Analytics",
];

const MASK =
  "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)";

function Row({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const reduced = useReducedMotionSafe();

  return (
    <div className="flex overflow-hidden" style={{ maskImage: MASK, WebkitMaskImage: MASK }}>
      <div
        className={`flex w-max shrink-0 items-center ${
          reduced ? "" : "animate-marquee group-hover/row:[animation-play-state:paused]"
        } ${reverse ? "[animation-direction:reverse]" : ""}`}
      >
        {[0, 1].map((copy) => (
          <div key={copy} aria-hidden={copy === 1} className="flex items-center">
            {items.map((item, index) => (
              <span key={`${item}-${index}`} className="flex items-center">

                <span className="whitespace-nowrap px-10 text-lg font-semibold tracking-tight text-foreground/85 sm:px-12 sm:text-xl">
                  {item}
                </span>

                <span
                  aria-hidden
                  className="h-1 w-1 shrink-0 rounded-full bg-primary/45"
                />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MarqueeStrip() {
  const reduced = useReducedMotionSafe();
  const bandRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: bandRef,
    offset: ["start end", "end start"],
  });

  const rowATranslate = useTransform(scrollYProgress, [0, 1], [10, -10]);
  const rowBTranslate = useTransform(scrollYProgress, [0, 1], [-10, 10]);

  const calm = useMotionValue(reduced ? 1 : 0);

  useEffect(() => {
    calm.set(reduced ? 1 : 0);
  }, [calm, reduced]);

  const rowAY = useTransform(
    [rowATranslate, calm],
    ([y, c]: number[]) => (c > 0.5 ? 0 : y),
  );
  const rowBY = useTransform(
    [rowBTranslate, calm],
    ([y, c]: number[]) => (c > 0.5 ? 0 : y),
  );

  return (
    <section
      aria-hidden
      className="relative isolate overflow-x-clip border-y border-border-subtle select-none py-9 sm:py-10"
    >

      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-surface/60" />
        <div className="absolute inset-x-0 top-0 h-px bg-border-subtle" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-border-subtle" />
      </div>

      <motion.div
        ref={bandRef}
        style={{ y: rowAY }}
        className="flex flex-col gap-8 sm:gap-10"
      >
        <Row items={rowA} />
      </motion.div>

      <motion.div
        style={{ y: rowBY }}
        className="mt-8 flex flex-col sm:mt-10"
      >
        <Row items={rowB} reverse />
      </motion.div>
    </section>
  );
}
