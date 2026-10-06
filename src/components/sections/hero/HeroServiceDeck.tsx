"use client";

import { AnimatePresence, motion } from "framer-motion";
import { heroServices } from "@/config/site";
import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";
import { cn } from "@/lib/utils";

/* The phone renders at roughly a third of the stage width, so this is a
   glanceable proof panel, not readable body copy — labels stay short and the
   type stays in the 8–11px range the other mock screens already use. */

/* `heroSlides` rotates 7 words but the studio sells 6 services, so the deck is
   exactly 6 rows — one per service — and every slide resolves to one of them.
   "brands" and "interfaces" both point at /services/branding, so they share
   the Branding row rather than padding the list out to a 7th. */
export const slideToServiceIndex = [0, 1, 2, 3, 4, 4, 5];

export function serviceIndexForSlide(slide: number): number {
  return slideToServiceIndex[slide] ?? 0;
}

/* The shared Branding row is called "Branding" on its own slide and
   "Branding & UI/UX" while the interfaces word is up, so the highlighted row
   always matches the copy the reader is looking at on the left. */
export function serviceLabelFor(slide: number): string {
  return slide === 5
    ? "Branding & UI/UX"
    : heroServices[serviceIndexForSlide(slide)].label;
}

type Detail = { headline: string; rows: { label: string; value: string }[] };

/* Proof per service, drawn from figures the rest of the site already claims
   (28+ sites shipped, 35k+ installs, +240% organic, 34 top-three terms,
   2.8x ROAS) so the deck can't drift into numbers the copy never backs. */
const DETAIL: Detail[] = [
  {
    headline: "Conversion-focused builds",
    rows: [
      { label: "Avg. LCP", value: "0.9s" },
      { label: "Sites shipped", value: "28+" },
      { label: "Avg. rebuild", value: "5 wks" },
    ],
  },
  {
    headline: "One codebase, two stores",
    rows: [
      { label: "Installs", value: "35k+" },
      { label: "Crash-free", value: "99.8%" },
      { label: "Store rating", value: "4.8" },
    ],
  },
  {
    headline: "Rankings that compound",
    rows: [
      { label: "Top-3 terms", value: "34" },
      { label: "Organic", value: "+240%" },
      { label: "Keywords", value: "1.2k" },
    ],
  },
  {
    headline: "Weekly lead flow",
    rows: [
      { label: "ROAS", value: "2.8x" },
      { label: "Leads / mo", value: "310" },
      { label: "Cost per lead", value: "-24%" },
    ],
  },
  {
    headline: "Identity systems",
    rows: [
      { label: "Brand kits", value: "19" },
      { label: "Assets", value: "140+" },
      { label: "Turnaround", value: "3 wks" },
    ],
  },
  {
    headline: "Words that sell",
    rows: [
      { label: "Words / mo", value: "42k" },
      { label: "Avg. CVR", value: "+27%" },
      { label: "Briefs / mo", value: "60" },
    ],
  },
];
export default function HeroServiceDeck({ activeSlide }: { activeSlide: number }) {
  const reduced = useReducedMotionSafe();
  const serviceIndex = serviceIndexForSlide(activeSlide);
  const detail = DETAIL[serviceIndex];

  /* The phone is a percentage of the stage, so its width swings from ~158px on a
       1440-wide desktop down to ~89px on a phone. Fixed px sizing overflows the
       frame at the small end, so the deck is a container-query component and
       sheds detail as the frame narrows:

         >= 157px  full — 3 metrics under the list
         >= 112px  list only
         <  112px  list only, tighter rows

       The 157px floor is measured, not guessed: the full panel needs ~296px of
       height, and the frame is 17/9 of its width, so anything under ~157px wide
       clips. Dropping it to 136px overflowed by 29px at a 141px phone.

       The six rows themselves never drop: they are the point of the panel. */
const ROW_PAD = "px-1.5 py-[3px] @min-[112px]:py-[4px] @min-[157px]:py-[5px]";
const ROW_TEXT = "truncate text-[8px] @min-[112px]:text-[9px]";

return (
    <div className="flex h-full flex-col gap-1.5 bg-[#0f1220] p-1.5 @min-[112px]:gap-2 @min-[112px]:p-2">
      {/* Header echoes the word currently typing on the left. */}
      <div className="flex items-center justify-between">
        <span className="text-[7px] font-bold uppercase tracking-[0.16em] text-slate-500 @min-[112px]:text-[8px]">
          Services
        </span>
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={serviceIndex}
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -4 }}
            transition={{ duration: reduced ? 0.12 : 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-md bg-primary/20 px-1.5 py-0.5 text-[7px] font-bold text-primary @min-[112px]:text-[8px]"
          >
            {serviceLabelFor(activeSlide)}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* One row per service — six, matching heroServices exactly. */}
      <ul className="flex flex-col gap-0.5 @min-[112px]:gap-1">
        {heroServices.map((service, i) => {
          const isActive = i === serviceIndex;
          return (
            <li key={service.label}>
              <motion.div
                /* layoutId slides the copper pill between rows instead of
                   cross-fading two backgrounds. It must go on the ACTIVE row
                   only — tagging every row with the same id makes Framer
                   treat all six as one shared element and hide five of them. */
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
                    isActive ? "text-white" : "text-slate-500",
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

      {/* Detail swaps with the row; AnimatePresence keeps it from popping.
          Dropped on narrow frames — it is supporting proof, not the list. */}
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
                  <span className="truncate text-[8px] text-slate-500">{row.label}</span>
                  <span className="shrink-0 text-[8px] font-bold text-primary @min-[157px]:text-[9px]">
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