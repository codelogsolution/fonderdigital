"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  BrainCircuit,
  CalendarDays,
  Code2,
  Database,
  Download,
  FileText,
  Gauge,
  Layers,
  Link2,
  Megaphone,
  MousePointerClick,
  Palette,
  PenLine,
  PenTool,
  Search,
  ShieldCheck,
  Smartphone,
  Sparkles,
  TrendingUp,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import Scene3D from "@/components/motion/Scene3D";
import AuroraOrb from "@/components/motion/AuroraOrb";
import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";
import BrowserBar from "@/components/sections/BrowserBar";
import HeroServiceDeck, {
  serviceIndexForSlide,
} from "@/components/sections/hero/HeroServiceDeck";
import { cn } from "@/lib/utils";

function DashboardScreen() {
  return (
    <div className="flex h-full flex-col gap-3 bg-[#0c111b] p-4 text-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/15 text-primary-on-dark">
            <BrainCircuit className="h-4 w-4" />
          </span>
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400">
              AI workflow concept
            </p>
            <p className="text-[13px] font-extrabold tracking-tight text-white">
              Product intelligence
            </p>
          </div>
        </div>
        <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2 py-1 text-[8px] font-bold text-emerald-300">HUMAN IN LOOP</span>
      </div>

      <div className="relative grid grid-cols-4 gap-1.5 rounded-xl border border-white/10 bg-white/[0.035] p-2.5">
        <span aria-hidden="true" className="absolute left-[12%] right-[12%] top-[1.55rem] h-px bg-gradient-to-r from-primary/25 via-primary/70 to-primary/25" />
        {[
          { icon: Database, label: "Approved\nsource" },
          { icon: Search, label: "Retrieve\ncontext" },
          { icon: BrainCircuit, label: "AI\nresponse" },
          { icon: ShieldCheck, label: "Human\nreview" },
        ].map(({ icon: Icon, label }, index) => (
          <div key={label} className="relative z-10 flex min-w-0 flex-col items-center gap-1.5 text-center">
            <span className={`flex h-7 w-7 items-center justify-center rounded-lg border ${index === 2 ? "border-primary/35 bg-primary/20 text-primary-on-dark" : "border-white/10 bg-[#151d2a] text-slate-300"}`}>
              <Icon className="h-3.5 w-3.5" />
            </span>
            <span className="whitespace-pre-line text-[7px] font-semibold leading-tight text-slate-400">{label}</span>
          </div>
        ))}
      </div>

      <div className="flex-1 rounded-xl border border-white/10 bg-white/[0.035] p-3">
        <div className="flex items-center gap-2">
          <span className="flex h-5 w-5 items-center justify-center rounded-md bg-primary/15 text-primary-on-dark"><Users className="h-3 w-3" /></span>
          <p className="text-[8px] font-bold uppercase tracking-[0.12em] text-slate-400">Workspace request</p>
        </div>
        <p className="mt-2 text-[10px] font-semibold leading-relaxed text-slate-200">“Find the right next step from our approved service guide.”</p>
        <div className="mt-2 rounded-lg border border-primary/20 bg-primary/[0.08] p-2">
          <div className="flex items-center gap-1.5 text-[8px] font-bold text-primary-on-dark"><Sparkles className="h-2.5 w-2.5" /> Context-aware response</div>
          <p className="mt-1 text-[8px] leading-relaxed text-slate-300">A grounded answer with a source reference, ready for a person to review.</p>
        </div>
        <div className="mt-2 flex items-center gap-1.5 text-[7px] text-slate-300"><Workflow className="h-2.5 w-2.5" /> Retrieval, model, and review steps are project-specific.</div>
      </div>
    </div>
  );
}

const CHIP_SLOTS = [
  "left-[1%] top-[54%]",
  "right-[-4%] top-[18%]",
  "left-[30%] bottom-[2%]",
] as const;

type Chip = { icon: LucideIcon; label: string };

const CHIPS_BY_SERVICE: Chip[][] = [
  [
    { icon: Code2, label: "Next.js" },
    { icon: Gauge, label: "Performance" },
    { icon: MousePointerClick, label: "Conversion-led" },
  ],
  [
    { icon: Smartphone, label: "React Native" },
    { icon: Download, label: "Store-ready" },
    { icon: ShieldCheck, label: "Monitored" },
  ],
  [
    { icon: Search, label: "Technical SEO" },
    { icon: TrendingUp, label: "Intent-led" },
    { icon: Link2, label: "Search reporting" },
  ],
  [
    { icon: Megaphone, label: "Paid + social" },
    { icon: Users, label: "Audience-led" },
    { icon: CalendarDays, label: "Always-on" },
  ],
  [
    { icon: Palette, label: "Brand kit" },
    { icon: Layers, label: "Design system" },
    { icon: PenTool, label: "Logo suite" },
  ],
  [
    { icon: FileText, label: "Search-ready" },
    { icon: PenLine, label: "SEO briefs" },
    { icon: Sparkles, label: "Conversion-led" },
  ],
];

const AI_CHIPS: Chip[] = [
  { icon: BrainCircuit, label: "AI features" },
  { icon: Database, label: "RAG assistants" },
  { icon: ShieldCheck, label: "Human reviewed" },
];

export default function HeroStage({
  className,
  activeSlide = 0,
}: {
  className?: string;
  activeSlide?: number;
}) {
  const reduced = useReducedMotionSafe();
  const stageRef = useRef<HTMLDivElement>(null);
  const chips = activeSlide === 0
    ? AI_CHIPS
    : CHIPS_BY_SERVICE[serviceIndexForSlide(activeSlide)] ?? CHIPS_BY_SERVICE[0];

  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start end", "end start"],
  });
  const orbY = useTransform(scrollYProgress, [0, 1], ["-6%", "12%"]);
  const stageY = useTransform(scrollYProgress, [0, 1], ["5%", "-7%"]);

  return (

    <div
      ref={stageRef}
      aria-hidden
      data-device-mock
      className={cn("relative", className)}
    >

      <div
        aria-hidden
        className="contact-shadow pointer-events-none absolute bottom-[6%] left-1/2 h-24 w-[72%] -translate-x-1/2 blur-xl"
      />

      <motion.div
        aria-hidden
        style={reduced ? undefined : { y: orbY }}
        className="pointer-events-none absolute left-1/2 top-[40%] aspect-square h-[70%] -translate-x-1/2 -translate-y-1/2"
      >
        <AuroraOrb size="100%" rings />
      </motion.div>

      <motion.div style={reduced ? undefined : { y: stageY }} className="relative">
        <Scene3D intensity={5} shift={10} float={false}>
          <div className="relative aspect-[5/6] w-full">

            <div
              className="absolute left-0 top-[4%] w-[74%] overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-[0_40px_80px_-30px_rgba(15,23,42,0.4)]"
              style={{ transform: "rotateY(15deg) rotateX(3deg) translateZ(-70px)" }}
            >
              <BrowserBar url="ai-workspace.demo" />
              <div className="aspect-[16/10]">
                <DashboardScreen />
              </div>
            </div>

            <div
              className="absolute right-0 top-[44%] w-[33%] overflow-hidden rounded-[1.4rem] border-[3px] border-slate-800 bg-[#0f1220] shadow-[0_50px_90px_-30px_rgba(15,23,42,0.55)]"
              style={{ transform: "rotateY(-17deg) rotateX(4deg) translateZ(60px)" }}
            >
              <div className="flex items-center justify-between bg-[#0f1220] px-2.5 py-1.5">
                <span className="text-[7px] font-semibold text-slate-400">9:41</span>
                <span className="h-1 w-6 rounded-full bg-slate-700" />
                <span className="flex items-center gap-0.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-600" />
                  <span className="h-1 w-2 rounded-sm bg-slate-600" />
                </span>
              </div>
              <div className="@container aspect-[9/17]">
                <HeroServiceDeck activeSlide={activeSlide} />
              </div>
            </div>

            {chips.map((chip, i) => (
              <motion.div
                key={`${serviceIndexForSlide(activeSlide)}-${chip.label}`}
                initial={reduced ? false : { scale: 0.96, y: 8 }}
                animate={{ scale: 1, y: 0 }}
                transition={{
                  duration: reduced ? 0 : 0.32,
                  delay: reduced ? 0 : 0.06 + i * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{ transform: "translateZ(120px)" }}
                className={cn(
                  "absolute z-20 flex items-center gap-1.5 rounded-full border border-white/70 bg-white/85 px-2.5 py-1.5 text-[10px] font-bold text-slate-700 shadow-[0_14px_30px_-14px_rgba(15,23,42,0.45)] backdrop-blur-xl",
                  CHIP_SLOTS[i],
                )}
              >
                <chip.icon className="h-3 w-3 text-primary-on-dark" />
                {chip.label}
              </motion.div>
            ))}
          </div>
        </Scene3D>
      </motion.div>
    </div>
  );
}
