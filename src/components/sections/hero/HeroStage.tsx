"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  Bell,
  CalendarDays,
  Code2,
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
  Zap,
  type LucideIcon,
} from "lucide-react";
import Scene3D from "@/components/motion/Scene3D";
import AuroraOrb from "@/components/motion/AuroraOrb";
import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";
import { BrowserBar } from "@/components/sections/WebShowcase";
import HeroServiceDeck, {
  serviceIndexForSlide,
} from "@/components/sections/hero/HeroServiceDeck";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------
   Mock screens. Hand-built rather than reused from the showcase
   sliders so the hero reads as one deliberate composition at a glance —
   the shapes and densities are tuned to survive being seen for 2 seconds.
------------------------------------------------------------------- */

const KPIS = [
  { label: "Revenue", value: "$48.2k", delta: "+18%", tone: "text-sky-600" },
  { label: "Signups", value: "3,140", delta: "+26%", tone: "text-violet-600" },
  { label: "Conv. rate", value: "7.4%", delta: "+1.2", tone: "text-emerald-600" },
];

const DASH_ROWS = [
  { icon: Users, name: "Checkout redesign", meta: "Live · 2.1k visits" },
  { icon: Zap, name: "Speed pass", meta: "Live · 0.9s LCP" },
  { icon: Bell, name: "Winback flow", meta: "In review" },
];

function DashboardScreen() {
  return (
    <div className="flex h-full flex-col gap-3 bg-slate-50 p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400">
            Growth overview
          </p>
          <p className="text-[13px] font-extrabold tracking-tight text-slate-900">
            Funderly Co.
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="rounded-md border border-slate-200 bg-white px-2 py-1 text-[8px] font-semibold text-slate-500">
            Last 30 days
          </span>
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-sky-500 to-violet-500 text-[9px] font-bold text-white">
            F
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {KPIS.map((kpi) => (
          <div
            key={kpi.label}
            className="rounded-lg border border-slate-200/80 bg-white p-2"
          >
            <p className="text-[8px] font-semibold text-slate-400">{kpi.label}</p>
            <p className="text-[13px] font-extrabold tracking-tight text-slate-900">
              {kpi.value}
            </p>
            <p className={`text-[8px] font-bold ${kpi.tone}`}>{kpi.delta}</p>
          </div>
        ))}
      </div>

      <div className="relative flex-1 overflow-hidden rounded-lg border border-slate-200/80 bg-white p-2">
        <div className="flex items-center justify-between">
          <span className="text-[8px] font-bold uppercase tracking-[0.16em] text-slate-400">
            Sessions
          </span>
          <TrendingUp className="h-3 w-3 text-sky-500" />
        </div>
        <svg
          viewBox="0 0 200 56"
          preserveAspectRatio="none"
          className="mt-1 h-full w-full"
          aria-hidden
        >
          <defs>
            <linearGradient id="heroChart" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.45" />
              <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0,44 L25,38 L50,41 L75,28 L100,31 L125,19 L150,23 L175,10 L200,14 L200,56 L0,56 Z"
            fill="url(#heroChart)"
          />
          <path
            d="M0,44 L25,38 L50,41 L75,28 L100,31 L125,19 L150,23 L175,10 L200,14"
            fill="none"
            stroke="var(--primary)"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="flex flex-col gap-1.5">
        {DASH_ROWS.map((row) => (
          <div
            key={row.name}
            className="flex items-center gap-2 rounded-lg border border-slate-200/80 bg-white px-2 py-1.5"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded bg-sky-50 text-sky-600">
              <row.icon className="h-2.5 w-2.5" />
            </span>
            <span className="text-[9px] font-bold text-slate-700">{row.name}</span>
            <span className="ml-auto text-[8px] font-medium text-slate-400">
              {row.meta}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* The stage is 5:6, so the browser occupies roughly the top 42% and the phone
   the lower right. Chips are placed in the two genuinely empty quadrants —
   lower-left and upper-right — so none of them ever sit on a mockup.

   Chip copy follows the active slide so the whole 3D composition argues the
   same point as the rotating word on the left, instead of showing a fixed set
   of three while the headline talks about something else. */
const CHIP_SLOTS = [
  "left-[1%] top-[54%]",
  "right-[-4%] top-[18%]",
  "left-[30%] bottom-[2%]",
] as const;

type Chip = { icon: LucideIcon; label: string };

const CHIPS_BY_SERVICE: Chip[][] = [
  // Web Development
  [
    { icon: Code2, label: "Next.js" },
    { icon: Gauge, label: "0.9s LCP" },
    { icon: MousePointerClick, label: "+41% CVR" },
  ],
  // App Development
  [
    { icon: Smartphone, label: "React Native" },
    { icon: Download, label: "35k+ installs" },
    { icon: ShieldCheck, label: "99.8% crash-free" },
  ],
  // SEO
  [
    { icon: Search, label: "+240% organic" },
    { icon: TrendingUp, label: "Top-3 × 34" },
    { icon: Link2, label: "1.2k backlinks" },
  ],
  // Social Marketing
  [
    { icon: Megaphone, label: "2.8x ROAS" },
    { icon: Users, label: "310 leads/mo" },
    { icon: CalendarDays, label: "Always-on" },
  ],
  // Branding
  [
    { icon: Palette, label: "Brand kit" },
    { icon: Layers, label: "19 systems" },
    { icon: PenTool, label: "Logo suite" },
  ],
  // Content Writing
  [
    { icon: FileText, label: "42k words/mo" },
    { icon: PenLine, label: "SEO briefs" },
    { icon: Sparkles, label: "+27% CVR" },
  ],
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
  const chips = CHIPS_BY_SERVICE[serviceIndexForSlide(activeSlide)] ?? CHIPS_BY_SERVICE[0];

  // Slow parallax: the orb sinks as the hero scrolls away while the devices
  // lift, which separates the two depth planes instead of moving them together.
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start end", "end start"],
  });
  const orbY = useTransform(scrollYProgress, [0, 1], ["-6%", "12%"]);
  const stageY = useTransform(scrollYProgress, [0, 1], ["5%", "-7%"]);

  return (
    /* The whole stage is decorative artwork: a dashboard and a phone rendered
       from primitives. Its inner labels are part of the illustration, not
       content a reader has to read, so the root carries `aria-hidden` and
       `data-device-mock` (the latter marks it for contrast tooling). */
    <div
      ref={stageRef}
      aria-hidden
      data-device-mock
      className={cn("relative", className)}
    >
      {/* Contact shadow anchors the composition to an implied floor. */}
      <div
        aria-hidden
        className="contact-shadow pointer-events-none absolute bottom-[6%] left-1/2 h-24 w-[72%] -translate-x-1/2 blur-xl"
      />

      {/* The glow sphere the devices sit in front of. */}
      <motion.div
        aria-hidden
        style={reduced ? undefined : { y: orbY }}
        className="pointer-events-none absolute left-1/2 top-[40%] aspect-square h-[70%] -translate-x-1/2 -translate-y-1/2"
      >
        <AuroraOrb size="100%" rings />
      </motion.div>

      <motion.div style={reduced ? undefined : { y: stageY }} className="relative">
        <Scene3D intensity={7} shift={14}>
          <div className="relative aspect-[5/6] w-full">
            {/* Browser — pushed back and turned away from the reader. */}
            <div
              className="absolute left-0 top-[4%] w-[74%] overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-[0_40px_80px_-30px_rgba(15,23,42,0.4)]"
              style={{ transform: "rotateY(15deg) rotateX(3deg) translateZ(-70px)" }}
            >
              <BrowserBar url="funderly.co" />
              <div className="aspect-[16/10]">
                <DashboardScreen />
              </div>
            </div>

            {/* Phone — pulled forward and turned the opposite way. Sits low
                and right so it overlaps the browser's lower corner without
                hiding the metrics that give the mockup its detail. */}
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

            {/* Glass chips that drift around the stage. Keyed by the service
                so they re-mount and re-animate whenever the word changes. */}
            {chips.map((chip, i) => (
              <motion.div
                key={`${serviceIndexForSlide(activeSlide)}-${chip.label}`}
                initial={{ opacity: 0, scale: 0.85, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.09, ease: [0.16, 1, 0.3, 1] }}
                style={{ transform: "translateZ(120px)" }}
                className={cn(
                  "absolute z-20 flex items-center gap-1.5 rounded-full border border-white/70 bg-white/85 px-2.5 py-1.5 text-[10px] font-bold text-slate-700 shadow-[0_14px_30px_-14px_rgba(15,23,42,0.45)] backdrop-blur-xl",
                  CHIP_SLOTS[i],
                )}
              >
                <chip.icon className="h-3 w-3 text-primary" />
                {chip.label}
              </motion.div>
            ))}
          </div>
        </Scene3D>
      </motion.div>
    </div>
  );
}