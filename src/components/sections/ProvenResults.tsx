"use client";

import Link from "next/link";
import { useRef, useState, useEffect, type CSSProperties } from "react";
import { motion, useInView } from "framer-motion";
import {
  Globe2,
  FolderKanban,
  Layers,
  MapPin,
  ArrowUpRight,
} from "lucide-react";

const SECTION_EASE = [0.16, 1, 0.3, 1] as const;

function AnimatedCounter({
  target,
  duration = 2,
}: {
  target: number;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const totalFrames = duration * 60;
    const step = target / totalFrames;
    const id = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(id);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(id);
  }, [inView, target, duration]);

  return <span ref={ref}>{count}</span>;
}

interface StatItem {
  label: string;
  value: number;
  icon: typeof Globe2;
  suffix: string;
  description: string;
}

const STATS: StatItem[] = [
  {
    label: "Projects Delivered",
    value: 50,
    icon: FolderKanban,
    suffix: "+",
    description: "Across AI, web & mobile",
  },
  {
    label: "Years of Experience",
    value: 3,
    icon: Layers,
    suffix: "",
    description: "Active since 2023",
  },
  {
    label: "Countries Served",
    value: 4,
    icon: Globe2,
    suffix: "",
    description: "India · US · UK · Canada",
  },
];

const COUNTRIES = ["India", "United States", "United Kingdom", "Canada"];

/* Hanging rig geometry — rope length, sway rhythm and x position per stat.
   Staggered lengths + desynced durations read as a gentle cargo swing. */
const HANG = [
  {
    x: "20%",
    rope: 250,
    duration: "5.6s",
    delay: "-1.1s",
    from: "-0.8deg",
    to: "0.8deg",
  },
  {
    x: "50%",
    rope: 180,
    duration: "6.4s",
    delay: "-2.3s",
    from: "-0.6deg",
    to: "0.6deg",
  },
  {
    x: "80%",
    rope: 310,
    duration: "7.2s",
    delay: "-3.4s",
    from: "-0.9deg",
    to: "0.9deg",
  },
];

/* Stat plates are fixed-width; keep this in sync with the `w-*` on the
   desktop plates so the x-centering math stays correct. */
const PLATE_HALF_WIDTH = 120;

function StatPlate({
  stat,
  className,
}: {
  stat: StatItem;
  className?: string;
}) {
  const Icon = stat.icon;
  return (
    <div
      className={`group relative overflow-hidden rounded-xl border border-white/10 bg-linear-to-b from-white/8 to-white/3 px-4 py-3.5 backdrop-blur-md transition-all duration-500 hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-[0_18px_40px_-20px_var(--primary-glow-strong)] ${className ?? "w-60"}`}
    >
      {/* Shimmer sweep */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/5 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-full"
      />
      {/* Top clip where the rope ties */}
      <span
        aria-hidden
        className="absolute left-1/2 top-0 h-1 w-7 -translate-x-1/2 rounded-b-md bg-primary/30"
      />

      <div className="flex items-center gap-3">
        <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 transition-all duration-500 group-hover:bg-primary/20 group-hover:shadow-[0_0_14px_-4px_var(--primary-glow)]">
          <Icon className="relative h-4 w-4 text-primary" />
        </div>
        <div className="min-w-0">
          <div className="flex items-baseline gap-0.5">
            <span className="bg-linear-to-b from-foreground to-foreground/60 bg-clip-text text-2xl font-extrabold tracking-tight text-transparent">
              <AnimatedCounter target={stat.value} duration={1.8} />
            </span>
            <span className="text-sm font-bold text-primary">
              {stat.suffix}
            </span>
          </div>
          <p className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-muted/80">
            {stat.label}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ProvenResults() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.3 });

  const [spotlightX, setSpotlightX] = useState(50);
  const [spotlightY, setSpotlightY] = useState(50);
  const [isHovered, setIsHovered] = useState(false);

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    setSpotlightX(((e.clientX - bounds.left) / bounds.width) * 100);
    setSpotlightY(((e.clientY - bounds.top) / bounds.height) * 100);
  };

  /* Pointer "wind": the whole rig tilts a fraction of a degree toward the
     cursor, on top of each rope's idle sway. Returns to rest on leave. */
  const wind = isHovered ? (spotlightX - 50) * 0.05 : 0;

  return (
    <section
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      className="band-dark relative isolate overflow-hidden pb-12 lg:pb-12 py-12 lg:py-20"
    >
      {/* Background decor */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute left-[20%] top-1/4 h-160 w-160 -translate-x-1/2 opacity-25 blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, var(--primary-glow), transparent 70%)",
          }}
        />
        <div className="absolute inset-0 bg-grid opacity-20 mask-[radial-gradient(ellipse_at_center,black_70%,transparent)]" />
        <div className="absolute inset-0 bg-noise opacity-[0.012] mix-blend-overlay" />

        {/* Dynamic spotlight */}
        <div
          className="absolute inset-0 transition-opacity duration-700"
          style={{
            opacity: isHovered ? 0.6 : 0,
            background: `radial-gradient(500px circle at ${spotlightX}% ${spotlightY}%, var(--primary-soft), transparent 80%)`,
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-24">
          {/* Left — narrative + conversion */}
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: SECTION_EASE }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                </span>
                Proven Results
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1, ease: SECTION_EASE }}
              className="mt-4 max-w-lg text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
            >
              Trusted by growing businesses
              <span className="block bg-linear-to-r from-primary to-accent-2 bg-clip-text text-transparent">
                across four countries
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2, ease: SECTION_EASE }}
              className="mt-4 max-w-md text-base leading-relaxed text-light-muted sm:text-lg"
            >
              Fonder Digital has delivered{" "}
              <strong className="font-semibold text-foreground">
                50+ projects
              </strong>{" "}
              spanning generative AI, web and mobile applications, and digital
              marketing systems. Founded in 2023, our Noida-based team now
              serves clients in India, the US, the UK, and Canada — helping
              startups and established companies ship products that convert,
              automate, and scale.
            </motion.p>

            {/* Country chips */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="mt-8"
            >
              <div className="flex flex-wrap gap-2">
                {COUNTRIES.map((country, idx) => (
                  <motion.span
                    key={country}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.4 + idx * 0.05, duration: 0.3 }}
                    className="rounded-lg border border-white/10 bg-white/3 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:border-primary/30 hover:text-foreground"
                  >
                    {country}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Conversion row */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5, ease: SECTION_EASE }}
              className="mt-9"
            >
              <Link
                href="/work"
                className="group/link inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
              >
                View our work
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
              </Link>
            </motion.div>
          </div>

          {/* Right — mobile fallback: simple stacked plates */}
          <div className="relative z-10 lg:hidden">
            <p className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.25em] text-muted/60">
              By the numbers
              <span
                aria-hidden
                className="h-px w-16 bg-linear-to-r from-primary/40 to-transparent"
              />
            </p>
            <div className="mt-5 space-y-3">
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.45,
                    delay: 0.3 + i * 0.1,
                    ease: SECTION_EASE,
                  }}
                >
                  <StatPlate stat={stat} className="w-full" />
                </motion.div>
              ))}
            </div>
            <div className="mt-5 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/3 px-4 py-2 backdrop-blur-sm">
              <MapPin className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-semibold text-foreground/85">
                Noida, India · serving clients worldwide
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Right — desktop: the hanging Trust Ledger. A beam runs out of the
          section's top-right corner; three stat plates hang from wires at
          staggered lengths and sway like a gentle cargo swing. */}
      <div className="pointer-events-none absolute right-0 top-0 hidden w-[52%] lg:block">
        {/* Beam */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={inView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.35, ease: SECTION_EASE }}
          style={{ transformOrigin: "right center" }}
          className="relative h-12 shadow-[0_12px_36px_-14px_rgba(0,0,0,0.55)] mask-[linear-gradient(90deg,transparent,black_16%)]"
        >
          {/* Ruler ticks */}
          <span
            aria-hidden
            className="absolute inset-x-0 top-0 h-2 bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.16)_0_1px,transparent_1px_28px)] opacity-70"
          />
          <span
            aria-hidden
            className="absolute inset-x-0 top-0 h-px bg-linear-to-l from-primary/50 via-white/20 to-transparent"
          />
          <div className="flex h-full items-center justify-between bg-linear-to-b from-white/8 to-white/2 px-5 backdrop-blur-sm">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted/80">
              Proof of Impact
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/80">
              Est. 2023
            </span>
          </div>
          {/* Attachment bolts under the beam at each rope x */}
          {HANG.map((h) => (
            <span
              key={h.x}
              aria-hidden
              className="absolute -bottom-1 h-1.75 w-1.75 rounded-full border border-primary/50 bg-(--band-bg) shadow-[0_0_8px_var(--primary-glow)]"
              style={{ left: h.x, transform: "translateX(-50%)" }}
            />
          ))}
        </motion.div>

        {/* Wires + plates */}
        <div className="relative h-96">
          {STATS.map((stat, i) => {
            const hang = HANG[i];
            const swayVars = {
              "--sway-duration": hang.duration,
              "--sway-delay": hang.delay,
              "--sway-from": hang.from,
              "--sway-to": hang.to,
            } as CSSProperties;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: -14 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.55 + i * 0.14,
                  ease: SECTION_EASE,
                }}
                className="absolute"
                style={{ left: `calc(${hang.x} - ${PLATE_HALF_WIDTH}px)` }}
              >
                {/* Wind tilt (pointer-reactive) wraps the idle sway */}
                <div
                  className="hang-item pointer-events-auto"
                  style={{
                    transform: `rotate(${wind}deg)`,
                    transformOrigin: "top center",
                    transition: "transform 0.8s ease-out",
                  }}
                >
                  <div className="hang-sway" style={swayVars}>
                    {/* Wire */}
                    <span
                      aria-hidden
                      className="mx-auto block h-1.5 w-1.5 rounded-full border border-primary/60 bg-(--band-bg)"
                    />
                    <span
                      aria-hidden
                      className="mx-auto block w-px bg-linear-to-b from-white/25 to-primary/45"
                      style={{ height: hang.rope }}
                    />
                    <StatPlate stat={stat} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Grounding cluster — shifted down below rig */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 1.2, ease: SECTION_EASE }}
          className="mt-16 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
        >
          <div className="pointer-events-auto inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/3 px-4 py-2 backdrop-blur-sm">
            <MapPin className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-semibold text-foreground/85">
              Noida, India
            </span>
            <span aria-hidden className="h-1 w-1 rounded-full bg-muted/50" />
            <span className="text-xs text-muted/80">serving 4 countries</span>
          </div>

          <div className="pointer-events-auto inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/3 px-4 py-2 backdrop-blur-sm">
            <div className="flex -space-x-2">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="h-5 w-5 rounded-full border-2 border-(--band-bg) bg-linear-to-br from-primary/60 to-accent-2/60"
                />
              ))}
            </div>
            <span className="text-xs font-semibold text-foreground/85">
              Trusted by 50+ partners
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
