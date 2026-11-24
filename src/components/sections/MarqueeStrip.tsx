"use client";

import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useScroll, useTransform } from "framer-motion";

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

function Row({
  items,
  reverse = false,
}: {
  items: string[];
  reverse?: boolean;
}) {
  const reduced = useReducedMotionSafe();

  return (
    <div
      className="flex overflow-hidden"
      style={{ maskImage: MASK, WebkitMaskImage: MASK }}
    >
      <div
        className={`flex w-max shrink-0 items-center ${
          reduced
            ? ""
            : "animate-marquee group-hover/row:[animation-play-state:paused]"
        } ${reverse ? "[animation-direction:reverse]" : ""}`}
      >
        {[0, 1].map((copy) => (
          <div
            key={copy}
            aria-hidden={copy === 1}
            className="flex items-center"
          >
            {items.map((item, index) => (
              <span key={`${item}-${index}`} className="flex items-center">
                <span className="whitespace-nowrap px-10 text-lg font-semibold tracking-tight text-white sm:px-12 sm:text-xl">
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

  const rowATranslate = useTransform(scrollYProgress, [0, 0.7], [4, -4]);
  const rowBTranslate = useTransform(scrollYProgress, [0, 0.7], [-4, 4]);

  const calm = useMotionValue(reduced ? 0.7 : 0);

  useEffect(() => {
    calm.set(reduced ? 0.7 : 0);
  }, [calm, reduced]);

  const rowAY = useTransform([rowATranslate, calm], ([y, c]: number[]) =>
    c > 0.5 ? 0 : y,
  );
  const rowBY = useTransform([rowBTranslate, calm], ([y, c]: number[]) =>
    c > 0.5 ? 0 : y,
  );

  // Mouse-tracking spotlight for atmospheric feel
  const [spotlightX, setSpotlightX] = useState(50);
  const [spotlightY, setSpotlightY] = useState(50);
  const [isHovered, setIsHovered] = useState(false);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduced) return;
    const bounds = e.currentTarget.getBoundingClientRect();
    setSpotlightX(((e.clientX - bounds.left) / bounds.width) * 100);
    setSpotlightY(((e.clientY - bounds.top) / bounds.height) * 100);
  };

  return (
    <section
      ref={bandRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      aria-label="Services marquee"
      className="band-dark relative isolate overflow-x-clip border-y border-border-subtle select-none py-9 sm:py-11"
    >
      {/* Atmospheric background — mouse-tracking glow + ambient orbs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        {/* Central radial wash (always present) */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--primary-soft),transparent_72%)]" />

        {/* Mouse-tracking spotlight */}
        {!reduced && (
          <div
            className="absolute inset-0"
            style={{
              opacity: isHovered ? 1 : 0,
              background: `radial-gradient(500px circle at ${spotlightX}% ${spotlightY}%, var(--primary-soft), transparent 60%)`,
              transition: "opacity 300ms",
            }}
          />
        )}

        {/* Floating warm orbs */}
        {!reduced && (
          <>
            <div
              className="absolute -left-20 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full opacity-20 blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, var(--primary-glow), transparent 70%)",
              }}
            />
            <div
              className="absolute -right-20 top-1/3 h-64 w-64 rounded-full opacity-15 blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, var(--accent-2-soft), transparent 70%)",
              }}
            />
          </>
        )}
      </div>

      <motion.div
        ref={bandRef}
        style={{ y: rowAY }}
        className="flex flex-col gap-5 sm:gap-7"
      >
        <Row items={rowA} />
      </motion.div>

      <motion.div style={{ y: rowBY }} className="mt-5 flex flex-col sm:mt-7">
        <Row items={rowB} reverse />
      </motion.div>
    </section>
  );
}
