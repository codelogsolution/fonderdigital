"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Globe2, FolderKanban, Layers } from "lucide-react";

const SECTION_EASE = [0.16, 1, 0.3, 1] as const;

function AnimatedCounter({ target, duration = 2 }: { target: number; duration?: number }) {
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
    description: "across AI, web & mobile",
  },
  {
    label: "Years of Experience",
    value: 3,
    icon: Layers,
    suffix: "",
    description: "since 2023",
  },
  {
    label: "Countries Served",
    value: 4,
    icon: Globe2,
    suffix: "",
    description: "India · US · UK · Canada",
  },
];

function StatCard({
  stat,
  index,
  inView,
}: {
  stat: StatItem;
  index: number;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.3 + index * 0.12, ease: SECTION_EASE }}
      className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/4 p-7 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-white/20 hover:bg-white/7.5 hover:shadow-[0_30px_60px_-30px_var(--primary-glow-strong)]"
    >
      {/* Top accent line */}
      <div className="absolute left-7 right-7 top-0 h-px bg-linear-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative flex items-start gap-4">
        {/* Icon box */}
        <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-primary/25 bg-primary/15 transition-all duration-400 group-hover:scale-110 group-hover:-rotate-3 group-hover:border-primary/50 group-hover:shadow-[0_0_20px_-6px_var(--primary-glow)]">
          <span className="absolute inset-0 rounded-xl bg-primary/20 blur-md opacity-0 transition-opacity duration-400 group-hover:opacity-100" />
          <stat.icon className="relative h-5 w-5 text-primary" />
        </div>

        {/* Content */}
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted">
            {stat.label}
          </p>

          <div className="mt-2 flex items-baseline gap-1">
            <span className="bg-linear-to-b from-foreground to-muted bg-clip-text text-5xl font-extrabold tracking-tight text-transparent">
              <AnimatedCounter target={stat.value} duration={2.2} />
            </span>
            <span className="text-2xl font-bold text-primary">{stat.suffix}</span>
          </div>

          <p className="mt-1.5 text-sm leading-relaxed text-muted group-hover:text-foreground transition-colors duration-300">
            {stat.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProvenResults() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Section-wide mouse tracking
  const [spotlightX, setSpotlightX] = useState(50);
  const [spotlightY, setSpotlightY] = useState(50);
  const [isHovered, setIsHovered] = useState(false);

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    setSpotlightX(((e.clientX - bounds.left) / bounds.width) * 100);
    setSpotlightY(((e.clientY - bounds.top) / bounds.height) * 100);
  };

  return (
    <section
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      aria-label="Proven results"
      className="band-dark relative isolate overflow-hidden py-16 sm:py-20 lg:py-24"
    >
      {/* Section-wide Mouse-tracking spotlight */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(600px circle at ${spotlightX}% ${spotlightY}%, var(--primary-soft, rgba(217,119,87,0.12)), transparent 70%)`,
        }}
      />

      {/* Atmospheric background layers */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute left-1/2 top-[20%] h-240 w-360 -translate-x-1/2 opacity-35 blur-[160px]"
          style={{ background: "radial-gradient(ellipse at center, var(--primary-glow), transparent 65%)" }}
        />
        <div
          className="absolute right-0 bottom-0 h-160 w-200 opacity-20 blur-[140px]"
          style={{ background: "radial-gradient(ellipse at center, var(--accent-2-soft), transparent 70%)" }}
        />
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute inset-0 bg-noise opacity-[0.015] mix-blend-overlay" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Eyebrow + Title + Description */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: SECTION_EASE }}
          className="mx-auto max-w-3xl text-center"
        >
          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.1, ease: SECTION_EASE }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-primary">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              Proven Results
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.15, ease: SECTION_EASE }}
            className="mt-7 text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-[3.125rem]"
          >
            Trusted by growing businesses
            <span className="block mt-1 bg-linear-to-r from-foreground via-primary to-accent-2 bg-clip-text text-transparent">
              across four countries
            </span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.25, ease: SECTION_EASE }}
            className="mt-5 text-base leading-relaxed text-muted sm:text-lg max-w-2xl mx-auto"
          >
            Fonder Digital has delivered{" "}
            <strong className="font-semibold text-foreground">50+ projects</strong>{" "}
            spanning generative AI, web and mobile applications, and digital marketing systems. Founded in 2023, our Noida-based team now serves clients in India, the US, the UK, and Canada — helping startups and established companies ship products that convert, automate, and scale.
          </motion.p>
        </motion.div>

        {/* Stats Cards */}
        <div className="mt-14 grid gap-5 sm:gap-6 lg:grid-cols-3">
          {STATS.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
