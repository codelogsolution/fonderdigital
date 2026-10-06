"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { BarChart3, Globe, Search, Sparkles, Target, TrendingUp } from "lucide-react";
import Section from "@/components/sections/Section";
import SectionHeading from "@/components/sections/SectionHeading";
import AuroraOrb from "@/components/motion/AuroraOrb";
import DepthCard from "@/components/motion/DepthCard";
import Reveal from "@/components/motion/Reveal";
import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";
import { cn } from "@/lib/utils";

type OrbitCard = {
  icon: typeof TrendingUp;
  label: string;
  value: string;
  caption: string;
  x: number;
  y: number;
  rotate: number;
  depth: number;
  drift: number;
  duration: number;
  delay: number;
};

/* Orbit anchors are percentages of the stage box, placed to keep clear of the
   centre column where the device sits. This mirrors the reference composition
   — a device in the middle with results floating around it — using our own
   markup, tokens and motion. */
const orbitCards: OrbitCard[] = [
  {
    icon: TrendingUp,
    label: "ROAS",
    value: "+214%",
    caption: "Blended, 90 days",
    x: 20,
    y: 24,
    rotate: -5,
    depth: 1,
    drift: 12,
    duration: 9,
    delay: 0,
  },
  {
    icon: Search,
    label: "Organic clicks",
    value: "3.1k",
    caption: "Monthly, up 62%",
    x: 78,
    y: 20,
    rotate: 4,
    depth: -1,
    drift: 14,
    duration: 11,
    delay: 0.8,
  },
  {
    icon: Target,
    label: "Cost per lead",
    value: "−38%",
    caption: "vs. previous quarter",
    x: 15,
    y: 68,
    rotate: 3,
    depth: -1,
    drift: 11,
    duration: 10,
    delay: 1.6,
  },
  {
    icon: Globe,
    label: "Markets live",
    value: "7",
    caption: "Across 4 regions",
    x: 83,
    y: 72,
    rotate: -4,
    depth: 1,
    drift: 13,
    duration: 12,
    delay: 0.4,
  },
];


/** The pinned device. Purely presentational — a stand-in for the live product. */
function DeviceFrame({ progress }: { progress: MotionValue<number> }) {
  const reduced = useReducedMotionSafe();
  const lift = useTransform(progress, [0, 1], [0, -18]);
  const glow = useTransform(progress, [0, 0.5, 1], [0.35, 0.7, 0.45]);

  const tiles = [
    { k: "Revenue", v: "$48.2k", d: "+18%" },
    { k: "Signups", v: "3140", d: "+24%" },
    { k: "Conv.", v: "7.4%", d: "+2" },
  ];

  const rows = ["Checkout redesign", "Speed pass", "Winback flow"];

  return (
    <motion.div
      style={reduced ? undefined : { y: lift }}
      className="relative z-10 mx-auto w-[17rem] sm:w-[19rem]"
    >
      {/* Contact shadow grounds the device instead of letting it float flat. */}
      <div
        aria-hidden
        className="contact-shadow absolute -bottom-10 left-1/2 h-16 w-[130%] -translate-x-1/2"
      />

      <div className="edge-shine relative rounded-[2.1rem] border border-border-subtle bg-white/85 p-2 shadow-[0_40px_90px_-40px_rgba(11,18,32,0.45)] backdrop-blur-xl">
        <div className="rounded-[1.7rem] border border-border-subtle bg-white/70 p-4">
          {/* Window chrome — reads as a real tool, not a generic rectangle. */}
          <div className="flex items-center gap-1.5 pb-3">
            <span className="h-2 w-2 rounded-full bg-rose-400/70" />
            <span className="h-2 w-2 rounded-full bg-amber-400/70" />
            <span className="h-2 w-2 rounded-full bg-emerald-400/70" />
            <span className="ml-2 h-4 flex-1 rounded-full bg-surface-2" />
          </div>

          <div className="rounded-2xl bg-mesh-tight p-4">
            <p className="text-[0.6rem] font-bold uppercase tracking-[0.18em] text-muted">
              Growth overview
            </p>
            <p className="mt-1 text-lg font-bold tracking-tight text-foreground">
              Fonderly Co.
            </p>

            <div className="mt-4 grid grid-cols-3 gap-2">
              {tiles.map((s) => (
                <div
                  key={s.k}
                  className="rounded-xl border border-border-subtle bg-white/80 px-2 py-2.5"
                >
                  <p className="text-[0.55rem] font-semibold uppercase tracking-wider text-muted">
                    {s.k}
                  </p>
                  <p className="mt-0.5 text-sm font-bold tabular-nums text-foreground">
                    {s.v}
                  </p>
                  <p className="text-[0.6rem] font-semibold text-emerald-600">{s.d}</p>
                </div>
              ))}
            </div>

            {/* Sparkline drawn as a gradient stroke — no chart library needed. */}
            <div className="mt-3 rounded-xl border border-border-subtle bg-white/80 px-3 py-3">
              <div className="flex items-center justify-between">
                <span className="text-[0.55rem] font-semibold uppercase tracking-wider text-muted">
                  Trend
                </span>
                <Sparkles className="h-3 w-3 text-primary" aria-hidden />
              </div>
              <svg
                viewBox="0 0 120 34"
                className="mt-2 h-9 w-full"
                preserveAspectRatio="none"
                aria-hidden
              >
                <defs>
                  <linearGradient id="dc-spark" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="100%" stopColor="#6366f1" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 27 L18 22 L36 24 L54 15 L72 17 L90 8 L108 11 L120 4"
                  fill="none"
                  stroke="url(#dc-spark)"
                  strokeWidth="2.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          <ul className="mt-3 space-y-1.5">
            {rows.map((row) => (
              <li
                key={row}
                className="flex items-center gap-2 rounded-lg border border-border-subtle bg-white/70 px-3 py-2"
              >
                <BarChart3 className="h-3 w-3 shrink-0 text-primary" aria-hidden />
                <span className="text-[0.7rem] font-medium text-foreground/85">
                  {row}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Progress-linked bloom behind the device. Alpha stays low so it never
          competes with the numbers inside the frame. */}
      <motion.div
        aria-hidden
        style={reduced ? { opacity: 0.4 } : { opacity: glow }}
        className="absolute -inset-16 -z-10 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.3),transparent_68%)] blur-2xl"
      />
    </motion.div>
  );
}

const stages = [
  { label: "Discover", detail: "Research & positioning" },
  { label: "Build", detail: "Design, code, ship" },
  { label: "Grow", detail: "Measure & compound" },
];



function OrbitCardBody({ card }: { card: OrbitCard }) {
  const Icon = card.icon;
  return (
    <div
      className={cn(
        "edge-shine rounded-2xl border border-border-subtle bg-white/88 p-3.5",
        "shadow-[0_24px_50px_-28px_rgba(11,18,32,0.5)] backdrop-blur-md",
      )}
    >
      <div className="flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="h-3.5 w-3.5" aria-hidden />
        </span>
        <span className="text-[0.6rem] font-bold uppercase tracking-[0.14em] text-muted">
          {card.label}
        </span>
      </div>
      <p className="mt-2 text-xl font-extrabold tabular-nums tracking-tight text-foreground">
        {card.value}
      </p>
      <p className="text-[0.68rem] text-muted">{card.caption}</p>
    </div>
  );
}

export default function DeliveryShowcase() {
  const reduced = useReducedMotionSafe();
  const trackRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  // 0 -> 1 across the pinned track; drives the device lift and bloom pulse.
  const progress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <Section id="delivery" labelledBy="delivery-heading" backdrop="aurora">
      <SectionHeading
        eyebrow="How the work ships"
        title={
          <span id="delivery-heading">
            Numbers you can <span className="text-muted">actually watch move.</span>
          </span>
        }
        lede="Every engagement reports on the same handful of metrics, updated weekly. This is the reporting our clients actually see — not a monthly PDF."
        align="center"
      />

      {/* Tall track gives the pinned stage room to travel. On mobile the orbit
          is dropped (see DepthCard `compact`) and the track collapses to normal
          document flow, so nothing is pinned in a cramped viewport. */}
      <div ref={trackRef} className="relative mt-14 lg:h-[150vh]">
        <div className="lg:sticky lg:top-16 lg:flex lg:min-h-[calc(100svh-4rem)] lg:items-center">
          <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="relative mx-auto h-[26rem] max-w-5xl sm:h-[30rem]">
              {/* Painted from the theme's own accent tokens, so the bloom
                  stays inside whichever palette is active. */}
              <AuroraOrb
                className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                size={520}
              />

              <DeviceFrame progress={progress} />

              {orbitCards.map((card) => (
                <DepthCard
                  key={card.label}
                  x={card.x}
                  y={card.y}
                  rotate={card.rotate}
                  depth={card.depth}
                  drift={card.drift}
                  duration={card.duration}
                  delay={card.delay}
                  compact
                >
                  <OrbitCardBody card={card} />
                </DepthCard>
              ))}
            </div>

            {/* Stage steps under the device, so the reader can tell the section
                is scroll-driven rather than a static hero. */}
            <Reveal delay={0.1}>
              <ol className="mt-10 grid gap-3 sm:grid-cols-3">
                {stages.map((stage, i) => (
                  <li
                    key={stage.label}
                    className="flex items-center gap-3 rounded-2xl border border-border-subtle bg-white/70 px-4 py-3 backdrop-blur-sm"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold tabular-nums text-primary-foreground">
                      {i + 1}
                    </span>
                    <span>
                      <span className="block text-sm font-bold tracking-tight text-foreground">
                        {stage.label}
                      </span>
                      <span className="block text-xs text-muted">{stage.detail}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </Reveal>

            {!reduced && (
              <p className="mt-6 text-center text-xs font-medium text-muted">
                Keep scrolling — the dashboard stays pinned.
              </p>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
