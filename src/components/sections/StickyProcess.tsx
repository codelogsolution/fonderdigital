"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useMotionValue, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  Compass,
  Layers3,
  Rocket,
  ScanSearch,
  type LucideIcon,
} from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";

type Phase = {
  name: string;
  title: string;
  description: string;
  deliverable: string;
  icon: LucideIcon;
  checkpoints: string[];
};

const phases: Phase[] = [
  {
    name: "Discover",
    title: "Start with the right question.",
    description:
      "We learn about your audience, current setup, and the outcome you need—before recommending a direction.",
    deliverable: "A focused brief and priorities",
    icon: ScanSearch,
    checkpoints: [
      "Understand your audience and their needs",
      "Review the current product, site, or marketing",
      "Agree on goals, constraints, and open questions",
    ],
  },
  {
    name: "Plan",
    title: "Agree on the route before work begins.",
    description:
      "Turn the brief into a practical scope, milestones, and measures of success. You review and approve the plan first.",
    deliverable: "A shared roadmap and clear scope",
    icon: Compass,
    checkpoints: [
      "Prioritise the work that matters first",
      "Set milestones and review points together",
      "Confirm the tools and approach for the job",
    ],
  },
  {
    name: "Create",
    title: "Make progress visible as we build.",
    description:
      "Design, development, content, and campaign work move through agreed reviews, so feedback arrives while it can still shape the result.",
    deliverable: "Reviewable work at each milestone",
    icon: Layers3,
    checkpoints: [
      "Share work in manageable increments",
      "Collect feedback at planned checkpoints",
      "Check quality, usability, and agreed requirements",
    ],
  },
  {
    name: "Launch & learn",
    title: "Ship carefully. Decide what comes next.",
    description:
      "Prepare the handover, confirm launch details, and use the evidence available to shape useful next steps.",
    deliverable: "A considered handover and next-step list",
    icon: Rocket,
    checkpoints: [
      "Review launch readiness and key details",
      "Document the work and agreed handover",
      "Identify what to maintain, test, or improve next",
    ],
  },
];

function PhasePanel({ phase, index }: { phase: Phase; index: number }) {
  const Icon = phase.icon;

  return (
    <div className="process-phase-content relative flex h-full flex-col">
      <div className="flex items-start justify-between gap-6">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/30 bg-primary/15 text-primary">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
              Delivery playbook
            </p>
            <p className="mt-1 text-xs font-medium text-muted">
              Stage 0{index + 1} <span aria-hidden="true">·</span> {phase.name}
            </p>
          </div>
        </div>
        <span className="font-mono text-5xl font-semibold leading-none tracking-[-0.08em] text-white/10 sm:text-6xl">
          0{index + 1}
        </span>
      </div>

      <h3 className="mt-5 line-clamp-2 max-w-2xl text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        {phase.title}
      </h3>
      <p className="mt-3 line-clamp-3 min-h-[4.5rem] max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
        {phase.description}
      </p>

      <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
        {phase.checkpoints.map((checkpoint) => (
          <li
            key={checkpoint}
            className="flex min-h-[4.25rem] items-start gap-2.5 rounded-xl border border-white/[0.08] bg-white/[0.035] px-3.5 py-2.5 text-xs leading-relaxed text-foreground/85 sm:text-sm"
          >
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            <span>{checkpoint}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-col gap-4 border-t border-white/10 pt-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted">
            What you take away
          </p>
          <p className="mt-1.5 text-sm font-semibold text-foreground">
            {phase.deliverable}
          </p>
        </div>
        <Link
          href="/contact"
          className="group inline-flex shrink-0 items-center gap-2 text-sm font-bold text-primary transition-colors hover:text-primary/80"
        >
          Talk through your project
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}

function ScrollJourney() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const reduced = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });
  const phaseTarget = useMotionValue(0);
  const phasePosition = useSpring(phaseTarget, {
    stiffness: 210,
    damping: 30,
    mass: 0.45,
  });
  const cursorTop = useTransform(phasePosition, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const position = activeIndex / (phases.length - 1);
    phaseTarget.set(position);
    if (reduced) phasePosition.jump(position);
  }, [activeIndex, phasePosition, phaseTarget, reduced]);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const nextIndex = Math.min(
      phases.length - 1,
      Math.floor(progress * phases.length),
    );
    setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
  });

  const goToPhase = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const start = track.getBoundingClientRect().top + window.scrollY;
    const travel = Math.max(0, track.offsetHeight - window.innerHeight);
    const progress = (index + 0.5) / phases.length;
    window.scrollTo({
      top: start + travel * progress,
      behavior: reduced ? "instant" : "smooth",
    });
  };

  return (
    <div ref={trackRef} className="process-scroll-story relative hidden h-[260svh] lg:block motion-reduce:hidden">
      <div className="sticky top-16 flex min-h-[calc(100svh-4rem)] flex-col justify-center py-5">
        <div className="mb-4 flex shrink-0 items-end justify-between gap-4 border-b border-border-subtle/70 pb-3 sm:mb-5">
          <div>
            <p aria-hidden="true" className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
              A clear way to work
            </p>
            <p aria-hidden="true" className="mt-1 text-base font-semibold tracking-tight text-foreground sm:text-lg">
              From first brief to a better launch.
            </p>
          </div>
          <span className="shrink-0 font-mono text-[10px] font-semibold tracking-[0.16em] text-muted">
            0{activeIndex + 1} <span aria-hidden="true">/</span> 0{phases.length}
          </span>
        </div>
        <div className="grid w-full grid-cols-[minmax(14rem,0.72fr)_3rem_minmax(0,1.28fr)] grid-rows-[auto_auto] items-center gap-x-6 gap-y-4">
          <div className="col-start-1 row-start-1 self-start">
            <div className="relative h-[19.5rem] space-y-2">
              {phases.map((phase, index) => {
                const Icon = phase.icon;
                const active = index === activeIndex;

                return (
                  <button
                    key={phase.name}
                    type="button"
                    aria-current={active ? "step" : undefined}
                    aria-controls="process-story-panel"
                    onClick={() => goToPhase(index)}
                    className={
                      "group relative flex w-full items-center gap-3 rounded-2xl border p-3.5 text-left transition-all duration-300 " +
                      (active
                        ? "border-primary/35 bg-surface shadow-[0_16px_42px_-30px_var(--primary-glow-strong)]"
                        : "border-transparent bg-background/35 hover:border-border-subtle hover:bg-surface/70")
                    }
                  >
                    <span
                      className={
                        "relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-all duration-300 " +
                        (active
                          ? "scale-105 border-primary/30 bg-primary text-primary-foreground shadow-[0_6px_18px_-8px_var(--primary-glow-strong)]"
                          : "border-border-subtle bg-surface text-muted group-hover:text-primary")
                      }
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-mono text-[10px] font-semibold tracking-[0.16em] text-primary/80">
                        STEP 0{index + 1}
                      </span>
                      <span className="mt-0.5 block text-sm font-bold text-foreground">
                        {phase.name}
                      </span>
                    </span>
                    <ArrowDownRight
                      aria-hidden="true"
                      className={
                        "h-4 w-4 shrink-0 transition-all duration-300 " +
                        (active
                          ? "translate-x-0.5 translate-y-0.5 text-primary"
                          : "text-muted/50 group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:text-primary")
                      }
                    />
                  </button>
                );
              })}
            </div>
          </div>

          <div aria-hidden="true" className="relative col-start-2 row-start-1 h-[19.5rem] self-start">
            <div className="absolute inset-x-0 inset-y-9">
              <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 rounded-full bg-primary/20" />
              <motion.span
                style={{ scaleY: phasePosition }}
                className="absolute inset-y-0 left-1/2 w-px origin-top -translate-x-1/2 rounded-full bg-gradient-to-b from-primary via-primary to-primary/45"
              />
              {phases.map((phase, index) => (
                <span
                  key={phase.name}
                  className="absolute left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/55 bg-background"
                  style={{ top: `${(index / (phases.length - 1)) * 100}%` }}
                />
              ))}
              <motion.span
                className="absolute left-1/2 z-10 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-background bg-primary font-mono text-[9px] font-bold text-primary-foreground shadow-[0_0_0_4px_var(--primary-soft),0_0_20px_var(--primary-glow)]"
                style={{ top: cursorTop }}
              >
                0{activeIndex + 1}
              </motion.span>
            </div>
          </div>

          <p className="col-start-1 row-start-2 rounded-2xl border border-border-subtle bg-background/50 p-4 text-sm leading-relaxed text-foreground/80">
            You approve the scope and key milestones. Progress stays visible
            while the work takes shape.
          </p>

          <div
            id="process-story-panel"
            className="process-story-panel band-dark relative col-start-3 row-span-2 row-start-1 self-center overflow-hidden rounded-[1.75rem] border border-white/10 p-6 shadow-[0_32px_90px_-52px_var(--primary-glow-strong)] sm:p-7 lg:p-9"
            aria-live="off"
          >
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
              <div className="absolute inset-0 bg-grid opacity-25" />
              <div className="absolute -right-24 -top-28 h-80 w-80 rounded-full bg-primary/20 blur-[90px]" />
              <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-primary/55 to-transparent" />
            </div>
            <motion.div
              key={activeIndex}
              initial={reduced ? false : { y: 7 }}
              animate={{ y: 0 }}
              transition={{ duration: reduced ? 0 : 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="relative h-full"
            >
              <PhasePanel phase={phases[activeIndex]} index={activeIndex} />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function StickyProcess() {
  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="relative isolate overflow-x-clip border-y border-border-subtle py-16 sm:py-20 lg:py-24"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-mesh opacity-80" />
        <div className="absolute -left-48 top-1/3 h-[30rem] w-[30rem] rounded-full bg-primary/[0.08] blur-[100px]" />
        <div className="absolute -right-48 bottom-0 h-[26rem] w-[26rem] rounded-full bg-primary/[0.07] blur-[100px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col gap-6 border-b border-border-subtle pb-8 sm:flex-row sm:items-end sm:justify-between sm:pb-10">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.2em] text-primary">
                <span aria-hidden="true" className="h-px w-7 bg-primary/55" />
                A clear way to work
              </span>
              <h2
                id="process-heading"
                className="mt-4 text-balance text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl"
              >
                From first brief to&nbsp;
                <span className="text-gradient">a better launch.</span>
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-muted sm:text-base">
              Good work should feel clear while it is happening. Scroll through
              each stage to see what you can expect.
            </p>
          </div>
        </Reveal>

        <div className="mt-8 lg:mt-10">
          <ScrollJourney />

          <div className="process-flow space-y-4 lg:hidden motion-reduce:block">
            {phases.map((phase, index) => (
              <Reveal key={phase.name} delay={index * 0.04}>
                <article className="rounded-2xl border border-border-subtle bg-surface/70 p-5 sm:p-6">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/25 bg-primary/10 text-primary">
                      <phase.icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-primary">
                        Step 0{index + 1}
                      </p>
                      <h3 className="text-sm font-bold text-foreground">{phase.name}</h3>
                    </div>
                  </div>
                  <p className="mt-4 font-semibold text-foreground">{phase.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{phase.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.12}>
          <div className="mt-7 flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-t border-border-subtle pt-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
              Strategy <span className="px-2 text-primary">→</span> Design &amp; build{" "}
              <span className="px-2 text-primary">→</span> Launch &amp; learn
            </p>
            <p className="text-xs text-muted">
              Clear checkpoints. Thoughtful delivery. No mystery handoffs.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
