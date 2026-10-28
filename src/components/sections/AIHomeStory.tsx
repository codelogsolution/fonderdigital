"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import {
  ArrowUpRight,
  BrainCircuit,
  Database,
  FileSearch2,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";

type WorkflowNode = {
  number: string;
  title: string;
  detail: string;
  icon: LucideIcon;
  position: string;
};

const workflowNodes: WorkflowNode[] = [
  {
    number: "01",
    title: "Your sources",
    detail: "Approved knowledge",
    icon: Database,
    position: "left-[1%] top-[15%]",
  },
  {
    number: "02",
    title: "Retrieval",
    detail: "Relevant context",
    icon: FileSearch2,
    position: "right-[0%] top-[15%]",
  },
  {
    number: "03",
    title: "AI feature",
    detail: "Grounded response",
    icon: BrainCircuit,
    position: "right-[0%] bottom-[12%]",
  },
  {
    number: "04",
    title: "Human review",
    detail: "A clear handoff",
    icon: ShieldCheck,
    position: "left-[1%] bottom-[12%]",
  },
];

function WorkflowVisual() {
  const visualRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({
    target: visualRef,
    offset: ["start end", "end start"],
  });
  const easedProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 30,
    mass: 0.35,
  });
  const pathProgress = useTransform(easedProgress, [0.08, 0.8], [0, 1]);
  const orbitRotate = useTransform(easedProgress, [0, 1], [-8, 8]);
  const nodeLift = useTransform(easedProgress, [0, 0.5, 1], [10, -8, 10]);
  const alternateLift = useTransform(easedProgress, [0, 0.5, 1], [-10, 8, -10]);
  const coreScale = useTransform(easedProgress, [0, 0.5, 1], [0.97, 1, 0.97]);

  return (
    <div
      ref={visualRef}
      className="relative mx-auto aspect-[1.08] w-full max-w-[38rem] sm:aspect-[1.16]"
      aria-label="Illustrative AI workflow from approved source material to a reviewed response"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-[7%] rounded-full border border-primary/10" />
      <motion.div
        aria-hidden="true"
        style={reduced ? undefined : { rotate: orbitRotate }}
        className="pointer-events-none absolute inset-[13%] rounded-full border border-dashed border-primary/20"
      >
        <span className="absolute left-[12%] top-[18%] h-2 w-2 rounded-full bg-primary shadow-[0_0_18px_var(--primary-glow)]" />
        <span className="absolute bottom-[16%] right-[10%] h-1.5 w-1.5 rounded-full bg-accent-2 shadow-[0_0_16px_var(--primary-glow)]" />
      </motion.div>

      <svg
        aria-hidden="true"
        viewBox="0 0 600 500"
        fill="none"
        className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
      >
        <path d="M108 120C170 120 196 161 246 205" stroke="var(--border-subtle)" strokeWidth="2" />
        <path d="M492 120C426 120 403 161 354 205" stroke="var(--border-subtle)" strokeWidth="2" />
        <path d="M492 384C426 384 403 343 354 299" stroke="var(--border-subtle)" strokeWidth="2" />
        <path d="M108 384C170 384 196 343 246 299" stroke="var(--border-subtle)" strokeWidth="2" />
        <motion.path
          d="M108 120C170 120 196 161 246 205C270 226 282 245 300 250C318 255 330 274 354 299C403 343 426 384 492 384"
          pathLength={reduced ? 1 : undefined}
          style={reduced ? undefined : { pathLength: pathProgress }}
          stroke="var(--primary)"
          strokeOpacity="0.78"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>

      {workflowNodes.map(({ number, title, detail, icon: Icon, position }, index) => (
        <motion.div
          key={number}
          style={reduced ? undefined : { y: index % 2 === 0 ? nodeLift : alternateLift }}
          className={`absolute z-10 hidden w-[10.5rem] items-center gap-3 rounded-2xl border border-border-subtle bg-background/90 p-3 shadow-[0_18px_50px_-35px_var(--primary-glow-strong)] backdrop-blur-xl md:flex lg:w-[11.5rem] ${position}`}
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
            <Icon className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="min-w-0">
            <span className="block font-mono text-[9px] font-bold tracking-[0.16em] text-primary/80">{number}</span>
            <span className="mt-0.5 block truncate text-xs font-bold text-foreground">{title}</span>
            <span className="mt-0.5 block truncate text-[10px] text-muted">{detail}</span>
          </span>
        </motion.div>
      ))}

      <motion.div
        style={reduced ? undefined : { scale: coreScale }}
        className="absolute left-1/2 top-1/2 z-20 flex h-48 w-48 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-[2.5rem] border border-primary/25 bg-background/90 text-center shadow-[0_28px_90px_-42px_var(--primary-glow-strong)] backdrop-blur-2xl sm:h-56 sm:w-56"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-2 rounded-[2rem] border border-border-subtle" />
        <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/20">
          <Sparkles className="h-5 w-5" aria-hidden="true" />
        </span>
        <p className="relative mt-4 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-primary">Fonder AI flow</p>
        <p className="relative mt-1 text-lg font-extrabold tracking-tight text-foreground">Useful by design</p>
        <p className="relative mt-1 max-w-[9rem] text-[10px] leading-relaxed text-muted">RAG · context · review</p>
      </motion.div>

      <div className="absolute inset-x-2 bottom-0 z-20 grid grid-cols-2 gap-x-5 md:hidden">
        {workflowNodes.map(({ number, title, detail, icon: Icon }) => (
          <div key={number} className="flex min-w-0 items-center gap-2 border-t border-border-subtle py-3">
            <span className="font-mono text-[9px] font-bold text-primary">{number}</span>
            <Icon className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden="true" />
            <span className="min-w-0">
              <span className="block truncate text-[10px] font-bold text-foreground">{title}</span>
              <span className="block truncate text-[9px] text-muted">{detail}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AIHomeStory() {
  return (
    <section id="ai-workflow" className="relative isolate overflow-hidden border-y border-border-subtle py-16 sm:py-20 lg:py-24">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-mesh opacity-65" />
        <div className="absolute -right-48 top-1/2 h-[32rem] w-[32rem] -translate-y-1/2 rounded-full bg-primary/[0.07] blur-[120px]" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 sm:px-6 md:gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-6 lg:px-8">
        <Reveal direction="left" className="relative z-30">
          <span className="inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.2em] text-primary">
            <span aria-hidden="true" className="h-px w-7 bg-primary/55" />
            Applied AI &amp; product engineering
          </span>
          <h2 className="mt-5 max-w-2xl text-balance text-4xl font-extrabold leading-[1.04] tracking-[-0.045em] sm:text-5xl lg:text-6xl">
            AI that fits the way your business works.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            We design AI features for websites, apps, and internal tools—from assistants grounded in approved business knowledge to workflow integrations. Each project starts with a clear use case, data boundaries, and review steps suited to the work.
          </p>
          <div className="mt-7 flex flex-wrap gap-2" aria-label="AI engineering capabilities">
            {["RAG", "FastAPI", "LangChain", "LangGraph", "PostgreSQL + pgvector"].map((item) => (
              <span key={item} className="rounded-full border border-border-subtle bg-background/70 px-3 py-1.5 text-[10px] font-semibold text-foreground/80">{item}</span>
            ))}
          </div>
          <Link href="/services/ai-development" className="group mt-8 inline-flex items-center gap-2 text-sm font-bold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4">
            Explore AI development
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </Reveal>

        <Reveal direction="right" delay={0.08} className="relative z-10">
          <WorkflowVisual />
        </Reveal>
      </div>
    </section>
  );
}
