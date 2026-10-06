"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown, Sparkles, Star } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Button from "@/components/ui/Button";
import SplitText from "@/components/motion/SplitText";
import RotatingText from "@/components/motion/RotatingText";
import HeroStage from "@/components/sections/hero/HeroStage";
import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";
import { heroServices, heroSlides } from "@/config/site";

const EASE = [0.16, 1, 0.3, 1] as const;
const heroWords = heroSlides.map((s) => s.word + ".");

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const reduced = useReducedMotionSafe();
  const slide = heroSlides[activeSlide];

  const fade = (delay: number) =>
    reduced
      ? { initial: { opacity: 0 }, animate: { opacity: 1 } }
      : {
        initial: { opacity: 0, y: 26 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8, delay, ease: EASE },
      };

  return (
    /* The hero is a true full-screen unit: `min-h-[100svh]` + flex column
         lets the rail settle against the bottom of the viewport so the service
         pills and "Scroll to explore" are visible on arrival, instead of sitting
         a scroll away. `svh` (not `vh`) keeps the rail in view when mobile
         browser chrome expands and shrinks the visual viewport. */
    <section
      id="home"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-background"
    >
      {/* Atmosphere: one soft mesh wash plus a fine dot field, masked so they
          fade before reaching the section edges. The top/bottom fades use the
          page background token so they blend with the warm neutral — a literal
          white here showed as a grey band against the new tint. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-mesh" />
        <div
          className="absolute inset-0 bg-dots opacity-25"
          style={{
            maskImage:
              "radial-gradient(ellipse 80% 70% at 50% 40%, black 30%, transparent 100%)",
          }}
        />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background/75 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="hero-grid mx-auto flex w-full max-w-7xl flex-1 flex-col items-center gap-10 px-4 pb-8 pt-24 sm:px-6 lg:grid lg:grid-cols-[1.02fr_0.98fr] lg:gap-8 lg:px-8 lg:pb-6 lg:pt-28">
        {/* ---------------- Copy column ---------------- */}
        <div className="relative">
          <motion.div
            {...fade(0.05)}
            className="flex flex-wrap items-center gap-2.5"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-background/70 py-1 pl-1 pr-3.5 text-xs font-semibold backdrop-blur-sm">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary text-white">
                <Sparkles className="h-3.5 w-3.5" />
              </span>
              Marketing + Digital
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/8 px-3 py-1 text-xs font-semibold text-primary">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
              </span>
              2 project slots open
            </span>
          </motion.div>

          <h1 className="hero-title mt-7 text-[2.6rem] font-extrabold leading-[0.98] tracking-[-0.035em] sm:text-6xl lg:text-[4.35rem]">
            <SplitText text="We design, build &" className="block" />
            <span className="block">
              <RotatingText
                words={heroWords}
                className="bg-gradient-to-r from-primary via-primary to-primary bg-clip-text text-transparent"
                onWordChange={setActiveSlide}
              />
              <span className="animate-pulse text-primary">|</span>
            </span>
          </h1>

          <div className="hero-tagline mt-6 min-h-[3.5rem] max-w-xl">
            <AnimatePresence mode="wait">
              <motion.p
                key={slide.word}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="text-lg leading-relaxed text-muted"
              >
                {slide.tagline}
              </motion.p>
            </AnimatePresence>
          </div>

          <motion.p {...fade(0.2)} className="hero-lede mt-4 max-w-xl text-base leading-relaxed text-muted">
            FonderDigital helps startups &amp; growing brands with websites, apps,
            SEO, social media, branding, design &amp; content — one passionate
            team for all your marketing and tech needs.
          </motion.p>
          <motion.div {...fade(0.28)} className="hero-cta mt-9 flex flex-wrap items-center gap-3">
            <Button href="/contact" size="lg" className="btn-shine">
              Get Free Growth Plan
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button href="/services" variant="outline" size="lg">
              Explore Services
            </Button>
          </motion.div>

          {/* Trust row */}
          <motion.div
            {...fade(0.34)}
            className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-border-subtle pt-7"
          >
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2.5">
                {["AV", "MK", "DS", "RJ"].map((initials) => (
                  <span
                    key={initials}
                    className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-gradient-to-br from-primary to-primary text-[10px] font-extrabold text-white"
                  >
                    {initials}
                  </span>
                ))}
                <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-surface text-[10px] font-extrabold text-muted">
                  +26
                </span>
              </div>
              <div>
                <p className="text-sm font-bold tracking-tight">30+ clients onboarded</p>
                <p className="text-xs text-muted">6 disciplines under one roof</p>
              </div>
            </div>

            <div>
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="mt-1 text-xs text-muted">
                Longest client partnership: <span className="font-bold text-foreground">3 years</span>
              </p>
            </div>
          </motion.div>
        </div>

        {/* ---------------- 3D stage column ---------------- */}
        {/* The stage follows the same index the headline does, so the phone
            deck and the floating chips always argue the active service.

            Capped on lg: uncapped it filled its column at ~580px, which made
            the 5:6 stage 696px tall and set the floor for the whole hero. */}
        <HeroStage
          className="hero-stage mx-auto w-full max-w-[288px] sm:max-w-[420px] lg:max-w-[500px]"
          activeSlide={activeSlide}
        />
      </div>

      {/* ---------------- Bottom bar ----------------
          Spans the full width so the section ends on a single horizontal
          rule rather than a ragged column edge. `pb` matters here: the bar
          previously had top padding only, so the pill row sat flush against
          the section boundary and the dark band below crowded it. */}
      {/* `lg:pr-24` reserves a lane for the fixed chat launcher (bottom-5
          right-5, ~56px wide + 20px inset). Without it the rail's scroll link
          ran under the launcher on 1280x720 and 1366x768, where max-w-7xl
          stops constraining the rail and its right edge hits the viewport. */}
      <div className="hero-rail mx-auto w-full max-w-7xl shrink-0 px-4 pb-8 sm:px-6 lg:px-8 lg:pb-10 lg:pr-24">
        <div className="flex flex-col gap-6 border-t border-border-subtle pt-7 lg:flex-row lg:items-center lg:justify-between">
          <ul className="flex flex-wrap gap-2">
            {heroServices.map((service, i) => (
              <motion.li
                key={service.label}
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: EASE }}
              >
                <Link
                  href={service.href}
                  className="group inline-flex items-center gap-2 rounded-full border border-border-subtle bg-background/70 px-3.5 py-2 text-xs font-semibold text-muted backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary hover:shadow-[0_10px_24px_-14px_var(--primary-glow)]"
                >
                  <service.icon className="h-3.5 w-3.5" />
                  {service.label}
                </Link>
              </motion.li>
            ))}
          </ul>

          <a
            href="#metrics"
            className="group inline-flex shrink-0 items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-muted transition-colors hover:text-primary"
          >
            Scroll to explore
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-border-subtle transition-all duration-300 group-hover:border-primary/60 group-hover:translate-y-0.5">
              <ChevronDown className="h-3.5 w-3.5" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
