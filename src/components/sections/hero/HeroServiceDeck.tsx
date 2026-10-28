"use client";

import { AnimatePresence, motion } from "framer-motion";
import { heroServices } from "@/config/site";
import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";
import { cn } from "@/lib/utils";

export const slideToServiceIndex = [6, 0, 1, 2, 3, 4, 4, 5];

export function serviceIndexForSlide(slide: number): number {
  return slideToServiceIndex[slide] ?? 0;
}

export function serviceLabelFor(slide: number): string {
  return slide === 6
    ? "Branding & UI/UX"
    : heroServices[serviceIndexForSlide(slide)].label;
}

type Detail = { headline: string; rows: { label: string; value: string }[] };

const DETAIL: Detail[] = [
  {
    headline: "Conversion-focused builds",
    rows: [
      { label: "Focus", value: "Performance" },
      { label: "CMS", value: "Editor-ready" },
      { label: "Quality", value: "Accessible" },
    ],
  },
  {
    headline: "One codebase, two stores",
    rows: [
      { label: "Platforms", value: "iOS + Android" },
      { label: "Release", value: "Store-ready" },
      { label: "Quality", value: "Monitored" },
    ],
  },
  {
    headline: "Rankings that compound",
    rows: [
      { label: "Foundation", value: "Technical" },
      { label: "Content", value: "Intent-led" },
      { label: "Reporting", value: "Search-led" },
    ],
  },
  {
    headline: "Weekly lead flow",
    rows: [
      { label: "Channels", value: "Paid + social" },
      { label: "Creative", value: "Tested" },
      { label: "Reporting", value: "Clear" },
    ],
  },
  {
    headline: "Identity systems",
    rows: [
      { label: "Identity", value: "Distinctive" },
      { label: "System", value: "Reusable" },
      { label: "Delivery", value: "Launch-ready" },
    ],
  },
  {
    headline: "Words that sell",
    rows: [
      { label: "Content", value: "Search-ready" },
      { label: "Messaging", value: "On-brand" },
      { label: "Copy", value: "Conversion-led" },
    ],
  },
  {
    headline: "Grounded AI workflows",
    rows: [
      { label: "Knowledge", value: "RAG + sources" },
      { label: "Workflow", value: "Reviewed" },
      { label: "API", value: "FastAPI" },
    ],
  },
];
export default function HeroServiceDeck({ activeSlide }: { activeSlide: number }) {
  const reduced = useReducedMotionSafe();
  const serviceIndex = serviceIndexForSlide(activeSlide);
  const detail = DETAIL[serviceIndex];

const ROW_PAD = "px-1.5 py-[3px] @min-[112px]:py-[4px] @min-[157px]:py-[5px]";
const ROW_TEXT = "truncate text-[8px] @min-[112px]:text-[9px]";

return (
    <div className="flex h-full flex-col gap-1.5 bg-[#0f1220] p-1.5 @min-[112px]:gap-2 @min-[112px]:p-2">

      <div className="flex items-center justify-between">
        <span className="text-[7px] font-bold uppercase tracking-[0.16em] text-slate-300 @min-[112px]:text-[8px]">
          Services
        </span>
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={serviceIndex}
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -4 }}
            transition={{ duration: reduced ? 0.12 : 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-md bg-primary/20 px-1.5 py-0.5 text-[7px] font-bold text-primary-on-dark @min-[112px]:text-[8px]"
          >
            {serviceLabelFor(activeSlide)}
          </motion.span>
        </AnimatePresence>
      </div>

      <ul className="flex flex-col gap-0.5 @min-[112px]:gap-1">
        {heroServices.map((service, i) => {
          const isActive = i === serviceIndex;
          return (
            <li key={service.label}>
              <motion.div

                layoutId={isActive && !reduced ? "heroDeckActive" : undefined}
                transition={{ duration: reduced ? 0 : 0.34, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  "flex items-center gap-1.5 rounded-md",
                  isActive ? "bg-primary" : "bg-white/5",
                  ROW_PAD,
                )}
              >
                <service.icon
                  className={cn(
                    "h-2.5 w-2.5 shrink-0",
                    isActive ? "text-white" : "text-slate-300",
                  )}
                />
                <span
                  className={cn(
                    ROW_TEXT,
                    isActive
                      ? "font-bold text-white"
                      : "font-medium text-slate-400",
                  )}
                >
                  {service.label}
                </span>
                {isActive && (
                  <span className="ml-auto h-1 w-1 shrink-0 rounded-full bg-white" />
                )}
              </motion.div>
            </li>
          );
        })}
      </ul>

      <div className="mt-auto hidden rounded-lg bg-white/[0.06] p-1.5 @min-[157px]:block @min-[157px]:p-2">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={serviceIndex}
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -6 }}
            transition={{ duration: reduced ? 0.12 : 0.26, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="truncate text-[8px] font-bold text-slate-300">{detail.headline}</p>
            <div className="mt-1 flex flex-col gap-0.5 @min-[157px]:mt-1.5 @min-[157px]:gap-1">
              {detail.rows.map((row) => (
                <div key={row.label} className="flex items-baseline justify-between gap-1">
                  <span className="truncate text-[8px] text-slate-300">{row.label}</span>
                  <span className="shrink-0 text-[8px] font-bold text-primary-on-dark @min-[157px]:text-[9px]">
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
