"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";
type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  /** "left" sits above the copy; "split" puts the copy in a right-hand column. */
  layout?: "left" | "split";
  align?: "left" | "center";
  className?: string;
};

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * One heading treatment for the whole site. Sections that hand-roll their own
 * h2 are the main reason the page reads as inconsistent, so the eyebrow,
 * tracking, scale and reveal rhythm all live here.
 */
export default function SectionHeading({
  eyebrow,
  title,
  lede,
  layout = "left",
  align = "left",
  className = "",
}: SectionHeadingProps) {
  const reduced = useReducedMotionSafe();

  const reveal = () =>
    reduced
      ? { initial: { opacity: 0 }, whileInView: { opacity: 1 } }
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
        };

  const heading = (
    <>
      <motion.span
        {...reveal()}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: EASE }}
        className="inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.2em] text-primary"
      >
        <span aria-hidden className="h-px w-7 bg-primary/45" />
        {eyebrow}
      </motion.span>

      <motion.h2
        {...reveal()}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, delay: 0.06, ease: EASE }}
        className={`mt-4 text-balance text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-[3.25rem] lg:leading-[1.06] ${
          align === "center" ? "mx-auto" : ""
        }`}
      >
        {title}
      </motion.h2>
    </>
  );

  const copy = lede ? (
    <motion.p
      {...reveal()}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: 0.12, ease: EASE }}
      className={`text-base leading-relaxed text-muted sm:text-lg ${
        align === "center" ? "mx-auto max-w-2xl" : "max-w-xl"
      }`}
    >
      {lede}
    </motion.p>
  ) : null;

  return (
    <div
      className={
        align === "center"
          ? `mx-auto max-w-3xl text-center ${className}`
          : className
      }
    >
      {layout === "split" ? (
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:items-end lg:gap-16">
          <div>{heading}</div>
          <div className="lg:pb-2">{copy}</div>
        </div>
      ) : (
        <>
          {heading}
          {copy ? <div className="mt-5">{copy}</div> : null}
        </>
      )}
    </div>
  );
}