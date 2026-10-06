"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowRight, Code2, PenTool, Search, type LucideIcon } from "lucide-react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";
import AuroraOrb from "@/components/motion/AuroraOrb";
import Reveal from "@/components/motion/Reveal";

type Pillar = {
  title: string;
  icon: LucideIcon;
  description: string;
  /** Second gradient stop, as a CSS colour (usually a theme token). */
  tone: string;
  cta: string;
  href: string;
  capabilities: string[];
};

/* `tone` varies the second gradient stop per card so the three read as
   distinct disciplines rather than one repeated panel. Both stops are theme
   tokens — literal hexes here pinned the whole section to the copper
   palette regardless of which theme was active. */
const pillars: Pillar[] = [
  {
    title: "Development",
    icon: Code2,
    description:
      "Next.js web platforms and cross-platform mobile apps — engineered for speed, scale, and measurable outcomes.",
    tone: "var(--accent-2)",
    cta: "See engineering",
    href: "/services/web-dev",
    capabilities: ["Next.js platforms", "Mobile apps", "Core Web Vitals"],
  },
  {
    title: "Content",
    icon: PenTool,
    description:
      "Brand identities, design systems, and editorial engines that keep your audience coming back.",
    tone: "var(--primary)",
    cta: "See brand & copy",
    href: "/services/branding",
    capabilities: ["Brand identity", "Design systems", "SEO content"],
  },
  {
    title: "SEO",
    icon: Search,
    description:
      "Technical foundations and intent-mapped content that compound organic traffic quarter over quarter.",
    tone: "var(--accent-2)",
    cta: "See organic growth",
    href: "/services/seo",
    capabilities: ["Technical audits", "Keyword mapping", "Content strategy"],
  },
];

/**
 * A pillar card that scales and lifts itself as the reader scrolls it to the
 * centre. Every card stays mounted and visible, so the section never blanks
 * out and the reader can take in all three disciplines at a glance.
 */
function PillarCard({
  pillar,
  scrollYProgress,
  index,
}: {
  pillar: Pillar;
  scrollYProgress: MotionValue<number>;
  index: number;
}) {
  // Distance from this card being centred in the viewport.
  const distance = useTransform(scrollYProgress, [0, 1], [index, index - 2]);

  /* The depth cues stay strong, but opacity barely moves. An earlier pass ran
     opacity down to 0.45 at the extremes, which left the two outer cards
     greyed to the point of being hard to read — the effect looked better in
     isolation than it did with body copy sitting on top of it. Scale, lift
     and glow carry the spotlight now; text contrast never drops. */
  const opacity = useTransform(distance, [-1, 0, 1], [0.88, 1, 0.88]);
  const scale = useTransform(distance, [-1, 0, 1], [0.95, 1, 0.95]);
  const lift = useTransform(distance, [-1, 0, 1], [18, 0, 18]);
  const glow = useTransform(distance, [-1, 0, 1], [0.3, 0.85, 0.3]);

  const reduced = useReducedMotionSafe();

  // Hover tilt. The card turns toward the cursor on both axes so it reads as a
  // physical panel rather than a flat rectangle. `transformPerspective` is set
  // inline because a CSS `perspective` on an ancestor would flatten the
  // section's own scroll-driven transforms.
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rotateX = useSpring(tiltX, { stiffness: 200, damping: 22 });
  const rotateY = useSpring(tiltY, { stiffness: 200, damping: 22 });

  const handleMove = (event: React.PointerEvent<HTMLElement>) => {
    if (reduced) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - bounds.left) / bounds.width - 0.5;
    const py = (event.clientY - bounds.top) / bounds.height - 0.5;
    tiltY.set(px * 12);
    tiltX.set(-py * 12);
  };

  const resetTilt = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  return (
    <motion.article
      onPointerMove={handleMove}
      onPointerLeave={resetTilt}
      style={{
        opacity,
        scale,
        y: lift,
        rotateX,
        rotateY,
        transformPerspective: 1100,
      }}
      className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-border-subtle bg-background/90 p-7 shadow-[0_20px_50px_-32px_rgba(2,6,23,0.55)] backdrop-blur-xl transition-colors duration-500 hover:border-primary/40 sm:p-8"
    >
      {/* Per-card colour wash so the three pillars never read as the same box.
          This sits above the card's own background, so it tints the panel
          rather than bleeding through from the section sphere behind it —
          with the two stacked, the outer cards picked up a visible cast
          while the middle one stayed neutral. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-mesh-tight opacity-55"
      />
      <motion.span
        aria-hidden
        style={{ opacity: glow }}
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl"
      >
        <span
          className="block h-full w-full rounded-full"
          style={{ backgroundColor: pillar.tone }}
        />
      </motion.span>

      <div className="relative flex items-start justify-between gap-4">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border-subtle bg-background/80 text-primary transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-105">
          <pillar.icon className="h-5 w-5" />
        </span>
        {/* Oversized index — an editorial detail that stops the three cards
            from reading as a generic icon row. */}
        <span
          aria-hidden
          className="font-display text-5xl font-extrabold leading-none tracking-tighter text-foreground/[0.07] transition-colors duration-500 group-hover:text-primary/15"
        >
          0{index + 1}
        </span>
      </div>

      <h3 className="relative mt-6 text-xl font-extrabold tracking-tight sm:text-2xl">
        {pillar.title}
      </h3>
      <p className="relative mt-3 text-sm leading-relaxed text-muted">
        {pillar.description}
      </p>

      <ul className="relative mt-6 flex flex-wrap gap-2">
        {pillar.capabilities.map((capability) => (
          <li
            key={capability}
            className="rounded-full border border-border-subtle bg-background/70 px-3 py-1 text-xs font-semibold text-muted"
          >
            {capability}
          </li>
        ))}
      </ul>

      <Link
        href={pillar.href}
        className="relative mt-7 inline-flex items-center gap-2 text-sm font-bold text-primary"
      >
        {pillar.cta}
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </motion.article>
  );
}

export default function Pillars() {
  const reduced = useReducedMotionSafe();
  const sectionRef = useRef<HTMLElement>(null);

  // A short scroll window drives the spotlight. It is deliberately brief so the
  // reader never has to scroll through empty space to reach the next section.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden py-16 sm:py-20 lg:py-24"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-mesh opacity-70" />
        <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-multiply" />
      </div>
      {/* One large sphere anchors the three cards to a single light source
          instead of three unrelated blobs. It sits behind the card row and is
          large enough that its lit core still reads past the panels — the
          earlier version was tucked above the fold with the glow off, which
          left the section looking like flat mesh.

          Opacity is deliberately modest. The lit core is near-white, so at
          full strength it washed out the muted paragraph beside the heading
          and the card body copy. `blur-3xl` in the ring below is what makes it
          read as a soft glow rather than a hard disc. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <AuroraOrb
          size={620}
          className="left-1/2 top-[58%] -translate-x-1/2 -translate-y-1/2 opacity-45 blur-3xl"
        />
        {/* A smaller counterweight low on the left keeps the corner from
            reading empty once the cards cover the main sphere. */}
        <AuroraOrb
          size={240}
          className="-left-20 bottom-[4%] opacity-35"
          glow={false}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-end lg:gap-16">
          <Reveal>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Core pillars
            </span>
            <h2 className="mt-4 text-balance text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-[3.25rem] lg:leading-[1.06]">
              Three disciplines. One growth engine.
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="lg:pb-2">
            <p className="text-base leading-relaxed text-muted sm:text-lg">
              Everything we do ladders up to the same outcome — your growth.
              Development, content and SEO run together, so each one makes the
              next compounding instead of competing for the same budget.
            </p>
          </Reveal>
        </div>

        <div className="mt-11 grid gap-5 sm:mt-12 sm:gap-6 lg:grid-cols-3">
          {pillars.map((pillar, index) =>
            reduced ? (
              <PillarCard
                key={pillar.title}
                pillar={pillar}
                index={index}
                scrollYProgress={scrollYProgress}
              />
            ) : (
              <Reveal key={pillar.title} delay={index * 0.09}>
                <div className="h-full">
                  <PillarCard
                    pillar={pillar}
                    index={index}
                    scrollYProgress={scrollYProgress}
                  />
                </div>
              </Reveal>
            )
          )}
        </div>

        <Reveal delay={0.15}>
          <div className="mt-12 flex flex-wrap items-center gap-x-3 gap-y-3 rounded-2xl border border-border-subtle bg-surface/70 px-6 py-5">
            <span className="text-sm font-bold tracking-tight">
              One team, one plan, one invoice.
            </span>
            <span className="text-sm text-muted">
              No handoffs between separate agencies — strategy, build and
              marketing stay in the same room.
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
