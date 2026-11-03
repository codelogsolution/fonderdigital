"use client";

import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Reveal from "@/components/motion/Reveal";
import Tilt3D from "@/components/motion/Tilt3D";
import HeroPreview from "@/components/sections/HeroPreview";
import { heroSlides } from "@/config/site";

const ROTATE_MS = 7000;

const SWAP_S = 0.3;

export default function HomeShowcase() {
  const [active, setActive] = useState(0);
  const prefersReducedMotion = useReducedMotionSafe();
  const slide = heroSlides[active % heroSlides.length];

  useEffect(() => {
    if (prefersReducedMotion) return;
    const timer = setTimeout(() => {
      setActive((current) => (current + 1) % heroSlides.length);
    }, ROTATE_MS);
    return () => clearTimeout(timer);
  }, [prefersReducedMotion, active]);

  const go = (direction: 1 | -1) => {
    setActive(
      (current) => (current + direction + heroSlides.length) % heroSlides.length,
    );
  };

  return (
    <section
      aria-labelledby="home-showcase"
      className="relative overflow-hidden py-9 sm:py-13 pb-3 sm:pb-6 lg:py-16 lg:pb-8"
    >
      <div
        aria-hidden
        className="absolute -top-24 left-1/2 h-72 w-[720px] -translate-x-1/2 rounded-full bg-primary/10 blur-[140px]"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col gap-6 border-border-subtle pb-4 sm:flex-row sm:items-end sm:justify-between sm:pb-6">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.2em] text-primary">
                <span aria-hidden="true" className="h-px w-7 bg-primary/55" />
                The studio, in motion
              </span>
              <h2
                id="home-showcase"
                className="mt-4 text-balance text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl"
              >
                One brief. The right&nbsp;
                <span className="text-gradient">digital pieces.</span>
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-muted sm:text-base">
              Explore AI, web, apps, and growth through original concept previews.
              Choose a discipline to see how the work can take shape.
            </p>
          </div>
        </Reveal>
        <div className="mt-12 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">

          <div className="flex min-w-0 flex-col lg:self-start gap-4">
            <div className="group inline-flex items-center">
              <slide.icon className="h-3.5 w-3.5 text-primary-accessible" />
              <span className="inline-flex items-center px-1.5 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-primary-accessible">
                {slide.service}
              </span>
            </div>
            <div className="mt-4 min-h-[19rem] sm:min-h-[18rem] lg:min-h-[16rem]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`copy-${active}`}
                  initial={prefersReducedMotion ? false : { y: 14 }}
                  animate={{ y: 0 }}
                  exit={
                    prefersReducedMotion
                      ? { transition: { duration: 0.18 } }
                      : { y: -12, transition: { duration: 0.18 } }
                  }
                  transition={{ duration: SWAP_S, ease: [0.21, 0.47, 0.32, 0.98] }}
                >

                  <h3 className="first-letter:uppercase text-1xl font-extrabold tracking-tight sm:text-2xl lg:text-3xl">
                    {slide.long}{" "}
                    <span className="text-muted-accessible">
                      {slide.tagline}
                    </span>
                  </h3>
                  <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-accessible sm:text-base">
                    {slide.blurb}
                  </p>
                  <p className="mt-4 text-sm font-semibold">
                    <span className="text-primary-accessible">{slide.stat}</span>{" "}
                    <span className="font-normal text-muted-accessible">{slide.caption}</span>
                  </p>
                  <div className="mt-6 flex gap-1.5" role="group" aria-label="Choose a service preview">
                    {heroSlides.map((item, index) => (
                      <button
                        type="button"
                        key={`${item.href}-${index}`}
                        onClick={() => setActive(index)}
                        aria-label={`Show ${item.label ?? item.service} preview`}
                        aria-pressed={index === active}
                        className="group/indicator flex h-4 min-w-0 flex-1 items-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                      >
                        <span className="relative block h-1 w-full overflow-hidden rounded-full bg-border-subtle transition-colors group-hover/indicator:bg-primary/30">
                          {index === active && (
                            <span
                              className="home-showcase-progress block h-full rounded-full bg-primary"
                              style={{
                                animationDuration: `${ROTATE_MS}ms`,
                                animationPlayState: prefersReducedMotion ? "paused" : "running",
                              }}
                            />
                          )}
                          {index < active && <span className="block h-full w-full bg-primary/40" />}
                        </span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-5 flex flex-col items-start gap-7">
              <Link
                href={slide.href}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-[0_12px_32px_-12px_var(--primary-glow-strong)] transition-transform duration-300 hover:-translate-y-0.5"
              >
                Explore {slide.service}
                <ArrowRight aria-hidden className="h-4 w-4" />
              </Link>
              <div className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-background/65 py-1 pl-3 pr-1.5">
                <span className="min-w-14 text-center font-mono text-[11px] text-muted-accessible">
                  {String(active + 1).padStart(2, "0")} / {String(heroSlides.length).padStart(2, "0")}
                </span>
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous showcase"
                  className="flex h-8 w-8 appearance-none items-center justify-center rounded-full border border-border-subtle text-muted transition-colors hover:border-primary/40 hover:text-foreground"
                >
                  <ChevronLeft aria-hidden className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next showcase"
                  className="flex h-8 w-8 appearance-none items-center justify-center rounded-full border border-border-subtle text-muted transition-colors hover:border-primary/40 hover:text-foreground"
                >
                  <ChevronRight aria-hidden className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <Reveal delay={0.1} className="mx-auto w-full min-w-0 max-w-[400px] lg:max-w-[450px] lg:-translate-y-7">
            <Tilt3D className="relative" max={6} rounded="rounded-3xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`preview-${active}`}
                  initial={prefersReducedMotion ? false : { scale: 0.98 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.99, transition: { duration: 0.18 } }}
                  transition={{ duration: SWAP_S, ease: [0.21, 0.47, 0.32, 0.98] }}
                >
                  <HeroPreview slide={active % heroSlides.length} />
                </motion.div>
              </AnimatePresence>
              <p className="mt-3 w-full truncate text-center text-[11px] text-muted">
                Illustrative concept preview · not client work
                <span className="hidden sm:inline"> · heading opens {slide.service}</span>
              </p>
            </Tilt3D>
          </Reveal>
        </div>

      </div>
    </section>
  );
}
