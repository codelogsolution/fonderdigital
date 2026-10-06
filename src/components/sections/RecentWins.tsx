"use client";

import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";
import AuroraOrb from "@/components/motion/AuroraOrb";

import Link from "next/link";
import { ArrowUpRight, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { recentWins } from "@/config/site";
import Reveal from "@/components/motion/Reveal";

export default function RecentWins() {
  const reduced = useReducedMotionSafe();

  return (
    <section id="recent-wins" className="relative isolate overflow-hidden py-16 sm:py-20 lg:py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-mesh opacity-70" />
        <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-multiply" />
      </div>
      {/* Sphere on the right balances the left-aligned heading. Painted from the
          active theme's tokens rather than a hue-rotated fixed amber, so it
          reads as the same material lit differently in every palette. */}
      <AuroraOrb
        size={460}
        className="pointer-events-none absolute right-[2%] top-[14%] opacity-80"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-end lg:gap-16">
          <Reveal>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Recent wins
            </span>
            <h2 className="mt-4 text-balance text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-[3.25rem] lg:leading-[1.06]">
              Numbers from the front lines
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="lg:pb-2">
            <p className="text-base leading-relaxed text-muted sm:text-lg">
              Every result below came from work we shipped and measured. Percentages
              describe movement in the metric named — never a guaranteed return.
            </p>
          </Reveal>
        </div>

        {/* All results stay visible: a prospective customer should never have to
            click an arrow to discover the proof they came for. */}
        <div className="mt-11 grid gap-5 sm:mt-12 sm:gap-6 lg:grid-cols-3">
          {recentWins.map((win, index) => (
            <Reveal key={win.title} delay={index * 0.09}>
              <motion.div
                whileHover={reduced ? undefined : { y: -6 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className="h-full"
              >
                <Link
                  href="/work"
                  className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-border-subtle bg-background/80 p-7 backdrop-blur-xl transition-colors duration-500 hover:border-primary/40 sm:p-8"
                >
                  {/* Each result card gets its own colour field so the three
                      never read as the same card with different numbers. */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-mesh-tight opacity-60"
                  />
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-primary/[0.07] blur-3xl transition-opacity duration-500 group-hover:bg-primary/[0.12]"
                  />

                  <div className="relative flex items-start justify-between gap-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/[0.07] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-primary">
                      <TrendingUp className="h-3.5 w-3.5" />
                      Verified result
                    </span>
                    <ArrowUpRight className="h-5 w-5 shrink-0 text-muted transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary" />
                  </div>

                  <p className="text-gradient relative mt-8 font-display text-5xl font-extrabold leading-none tracking-tight sm:text-6xl">
                    {win.metric}
                  </p>

                  <div className="relative mt-auto pt-8">
                    <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted">
                      0{index + 1} / 0{recentWins.length}
                    </span>
                    <h3 className="mt-3 text-lg font-bold tracking-tight">
                      {win.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {win.detail}
                    </p>
                  </div>
                </Link>
              </motion.div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.12}>
          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-border-subtle pt-8">
            <p className="text-sm text-muted">
              Want the full breakdown, including methodology and timelines?
            </p>
            <Link
              href="/work"
              className="group inline-flex items-center gap-2 text-sm font-bold text-primary"
            >
              Explore all work
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
