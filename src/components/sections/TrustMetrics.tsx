"use client";

import { useEffect, useRef } from "react";
import { Medal, Target, Users, type LucideIcon } from "lucide-react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import CountUp from "@/components/motion/CountUp";
import AuroraOrb from "@/components/motion/AuroraOrb";
import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";

const metrics: {
  icon: LucideIcon;
  to: number;
  suffix: string;
  label: string;
  detail: string;
}[] = [
  {
    icon: Target,
    to: 125,
    suffix: "+",
    label: "Projects delivered",
    detail: "Web, mobile and campaign work shipped end to end.",
  },
  {
    icon: Users,
    to: 96,
    suffix: "%",
    label: "Clients who return",
    detail: "Repeat engagements, most spanning multiple quarters.",
  },
  {
    icon: Medal,
    to: 12,
    suffix: "+",
    label: "Years of experience",
    detail: "Combined senior experience across every discipline.",
  },
];

/**
 * A stat card that lights up as it enters the viewport and follows the cursor
 * with a soft spotlight, so the row feels alive instead of printed on the page.
 */
function StatCard({
  icon: Icon,
  to,
  suffix,
  label,
  detail,
  progress,
}: {
  icon: LucideIcon;
  to: number;
  suffix: string;
  label: string;
  detail: string;
  progress: MotionValue<number>;
}) {
  const reduced = useReducedMotionSafe();
  const cardRef = useRef<HTMLDivElement>(null);
  const pointerX = useMotionValue(50);
  const pointerY = useMotionValue(50);
  const x = useSpring(pointerX, { stiffness: 150, damping: 24 });
  const y = useSpring(pointerY, { stiffness: 150, damping: 24 });

  const spotlight = useMotionTemplate`radial-gradient(260px circle at ${x}% ${y}%, rgba(251,191,36,0.14), transparent 68%)`;

  // Card rises and rotates to a flat, front-facing pose as it enters view.
  const enter = useTransform(progress, [0, 0.75], [0, 1]);

  // The reduced-motion preference is routed through the same MotionValue
  // channel instead of dropping the `style` prop. Framer Motion attaches these
  // values to the DOM node on first paint and keeps writing to them, so
  // switching to `undefined` when the preference resolves after hydration
  // leaves the card stuck at `opacity: 0`. Expressing it here guarantees the
  // card lands fully visible for reduced-motion users.
  const calm = useMotionValue(reduced ? 1 : 0);

  useEffect(() => {
    calm.set(reduced ? 1 : 0);
  }, [calm, reduced]);

  const cardY = useTransform(
    [enter, calm],
    ([e, c]: number[]) => (c > 0.5 ? 0 : 34 * (1 - e)),
  );
  const cardOpacity = useTransform(
    [enter, calm],
    ([e, c]: number[]) => (c > 0.5 ? 1 : Math.min(1, e / 0.6)),
  );

  const trackPointer = (event: React.PointerEvent<HTMLDivElement>) => {
    const bounds = cardRef.current?.getBoundingClientRect();
    if (!bounds) return;
    pointerX.set(((event.clientX - bounds.left) / bounds.width) * 100);
    pointerY.set(((event.clientY - bounds.top) / bounds.height) * 100);
  };

  return (
    <motion.div
      ref={cardRef}
      onPointerMove={trackPointer}
      style={{ y: cardY, opacity: cardOpacity }}
      className="group relative h-full overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:border-white/20 hover:bg-white/[0.075] hover:shadow-[0_30px_60px_-30px_rgba(180,83,9,0.45)] sm:p-8"
    >
      {!reduced && (
        <motion.div
          aria-hidden
          style={{ background: spotlight }}
          className="pointer-events-none absolute inset-0"
        />
      )}

      <div className="relative flex items-start justify-between gap-4">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-primary ring-1 ring-white/15 transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-6">
          <Icon className="h-5 w-5" />
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted/70">
          Track record
        </span>
      </div>

      <p className="relative mt-7 bg-gradient-to-br from-white via-primary to-accent-2 bg-clip-text font-display text-[3.25rem] font-extrabold leading-none tracking-tight text-transparent">
        <CountUp to={to} suffix={suffix} />
      </p>

      <p className="relative mt-3 text-base font-bold tracking-tight text-white">
        {label}
      </p>
      <p className="relative mt-1.5 text-sm leading-relaxed text-muted">
        {detail}
      </p>
    </motion.div>
  );
}

export default function TrustMetrics() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.95", "start 0.35"],
  });

  return (
    <section
      ref={sectionRef}
      aria-label="Track record"
      className="band-dark relative isolate overflow-x-clip py-16 sm:py-20 lg:py-24"
    >
      {/* A dark band in the middle of an otherwise light page. It gives the
          scroll a clear tonal beat and lets the numbers carry the colour.
          Everything is painted from the band's own tokens so the wash tracks
          whichever theme is active. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            /* Painted from the band's own tokens rather than fixed copper
               rgba, so the wash tracks whichever theme is active. */
            background:
              "radial-gradient(60rem 30rem at 18% 0%, var(--primary-soft), transparent 62%), radial-gradient(50rem 28rem at 85% 90%, var(--accent-2-soft), transparent 60%)",
          }}
        />
        {/* Fine dot lattice reads as depth rather than as texture. */}
        <div
          className="absolute inset-0 bg-dots opacity-[0.16]"
          style={{
            maskImage:
              "radial-gradient(ellipse 70% 70% at 50% 50%, black 20%, transparent 100%)",
          }}
        />
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-background/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background/70 to-transparent" />
      </div>
            {/* One sphere per card, sitting behind each panel. They give the band
          the same lit-3D quality the rest of the page uses, so the strip
          between the hero and the pillars does not read as a flat black slab.

          The wrapper clips: the section only sets overflow-x, so the orb
          bloom previously spilled past the band and left a grey haze on the
          light sections above and below. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <AuroraOrb
          size={340}
          className="left-[8%] top-1/2 -translate-y-1/2 opacity-60"
          glow={false}
        />
        <AuroraOrb
          size={300}
          className="right-[10%] top-1/2 -translate-y-1/2 opacity-50"
          glow={false}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-5 sm:gap-6 lg:grid-cols-3">
          {metrics.map((metric) => (
            <StatCard key={metric.label} {...metric} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}
