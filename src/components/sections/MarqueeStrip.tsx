"use client";

import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";

import { motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

/* Two rows of disciplines, but only one carries the display treatment. The
   previous version set every other word in outlined caps, which made the
   band unreadable and left words sliced mid-glyph at the edges. */
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

/* Hairline rules that mark where the text is safe to read. Anything inside
   these bounds is fully opaque; outside, it fades out. */
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
                {/* Sized in body-scale type, not display caps: this band sits
                    between sections and should pass information, not shout. */}
                <span className="whitespace-nowrap px-6 text-lg font-semibold tracking-tight text-foreground/85 sm:px-8 sm:text-xl">
                  {item}
                </span>
                {/* Small copper lozenge as the separator — a precise accent
                    rather than a large dot that competes with the words. */}
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

  // Rows drift apart slightly as the band passes through the viewport.
  const rowATranslate = useTransform(scrollYProgress, [0, 1], [26, -26]);
  const rowBTranslate = useTransform(scrollYProgress, [0, 1], [-22, 22]);

  // Express the reduced-motion preference through the same MotionValue channel
  // rather than dropping the `style` prop. Framer Motion binds these values to
  // the DOM node on first paint and keeps writing them, so switching to
  // `undefined` after hydration leaves the rows parked at a scroll offset.
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
      {/* This band sits between two content sections, so its job is to be quiet.
          The previous version stacked a mesh wash, a dot lattice, two gradient
          rules and a noise layer — five treatments competing with the words.
          Now it is a flat tinted surface with a single hairline above and below. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-surface/60" />
        <div className="absolute inset-x-0 top-0 h-px bg-border-subtle" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-border-subtle" />
      </div>

      <motion.div
        ref={bandRef}
        style={{ y: rowAY }}
        className="flex flex-col gap-6 sm:gap-8"
      >
        <Row items={rowA} />
      </motion.div>

      <motion.div
        style={{ y: rowBY }}
        className="mt-6 flex flex-col sm:mt-8"
      >
        <Row items={rowB} reverse />
      </motion.div>
    </section>
  );
}
