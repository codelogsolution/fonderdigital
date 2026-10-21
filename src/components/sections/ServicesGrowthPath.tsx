"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useScroll, useSpring } from "framer-motion";
import Reveal from "@/components/motion/Reveal";
import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";

const phases = [
  {
    number: "01",
    name: "Build",
    title: "Create a stronger foundation.",
    detail: "Give your business a clear identity and a digital experience built to move people forward.",
    services: [
      { label: "Branding & design", href: "/services/branding" },
      { label: "Web development", href: "/services/web-dev" },
      { label: "App development", href: "/services/app-dev" },
    ],
  },
  {
    number: "02",
    name: "Grow",
    title: "Reach the people who matter.",
    detail: "Build discoverability and a consistent presence where your next customers are looking.",
    services: [
      { label: "SEO & growth", href: "/services/seo" },
      { label: "Content & copywriting", href: "/services/content" },
      { label: "Performance marketing", href: "/services/marketing" },
    ],
  },
  {
    number: "03",
    name: "Convert",
    title: "Turn attention into action.",
    detail: "Connect the experience, message, and measurement so every next step feels obvious.",
    services: [
      { label: "Conversion-ready websites", href: "/services/web-dev" },
      { label: "Performance marketing", href: "/services/marketing" },
      { label: "Content & copywriting", href: "/services/content" },
    ],
  },
];

const startingPoints = [
  {
    number: "A",
    eyebrow: "Starting from an idea",
    title: "Launch something new",
    detail: "Shape the brand, then give it a digital home built for the next stage.",
    links: [
      { label: "Branding & design", href: "/services/branding" },
      { label: "Web development", href: "/services/web-dev" },
    ],
  },
  {
    number: "B",
    eyebrow: "Ready for more reach",
    title: "Get discovered",
    detail: "Make it easier for the right people to find you, understand you, and remember you.",
    links: [
      { label: "SEO & growth", href: "/services/seo" },
      { label: "Content & copywriting", href: "/services/content" },
    ],
  },
  {
    number: "C",
    eyebrow: "Turning visits into value",
    title: "Win more customers",
    detail: "Bring your message, website, and campaigns together around a clear next step.",
    links: [
      { label: "Performance marketing", href: "/services/marketing" },
      { label: "Web development", href: "/services/web-dev" },
    ],
  },
];

export function ServicesGrowthPath() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.78", "end 0.5"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.35 });

  return (
    <section ref={sectionRef} aria-labelledby="growth-path-title" className="band-dark relative isolate overflow-hidden py-20 sm:py-28">
      <div aria-hidden className="pointer-events-none absolute -right-32 top-8 -z-10 h-80 w-80 rounded-full bg-primary/10 blur-[100px]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">A connected approach</p>
          <h2 id="growth-path-title" className="mt-4 text-3xl font-extrabold tracking-tight text-primary sm:text-5xl">Build. Grow. Convert.</h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            The best results happen when each part of your digital presence works together. Start where you need us; we’ll help connect the rest.
          </p>
        </Reveal>

        <div className="relative mt-12 grid gap-4 md:mt-16 md:grid-cols-3 md:gap-5">
          <div aria-hidden className="absolute left-[16.5%] right-[16.5%] top-5 hidden h-px bg-border-subtle md:block">
            <motion.div className="h-full origin-left bg-primary" style={{ scaleX: reducedMotion ? 1 : progress }} />
          </div>
          {phases.map((phase, index) => (
            <Reveal key={phase.number} delay={index * 0.08} className="h-full">
              <article className="group relative flex h-full min-h-[20rem] flex-col rounded-2xl border border-border-subtle bg-surface/70 p-6 transition-[border-color,background-color,transform] duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-surface sm:p-8">
                <div className="flex items-center gap-3">
                  <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-primary/40 bg-[var(--band-bg)] font-mono text-xs font-bold text-primary">{phase.number}</span>
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-primary">{phase.name}</span>
                </div>
                <h3 className="mt-8 max-w-xs text-2xl font-bold tracking-tight text-primary sm:text-[1.7rem]">{phase.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{phase.detail}</p>
                <ul className="mt-auto flex flex-wrap gap-2 pt-7">
                  {phase.services.map((service) => (
                    <li key={service.label}>
                      <Link href={service.href} className="inline-flex min-h-9 items-center rounded-full border border-border-subtle px-3 text-xs font-medium text-muted transition-colors hover:border-primary/50 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">
                        {service.label}<ArrowUpRight aria-hidden className="ml-1.5 h-3 w-3 text-primary" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServicesStartingPoints() {
  return (
    <section aria-labelledby="starting-point-title" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-5 border-b border-border-subtle pb-7 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <Reveal className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Make the first move</p>
            <h2 id="starting-point-title" className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl">What would you like to change?</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="max-w-md text-sm leading-relaxed text-muted sm:text-base">Pick the outcome closest to your goal. We’ll point you to a practical place to begin.</p>
          </Reveal>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          {startingPoints.map((item, index) => (
            <Reveal key={item.number} delay={index * 0.07} className="h-full">
              <article className="group flex h-full min-h-[19rem] flex-col rounded-2xl border border-border-subtle bg-surface/60 p-6 transition-[border-color,background-color,box-shadow] duration-300 hover:border-primary/40 hover:bg-surface hover:shadow-[0_24px_70px_-50px_var(--primary-glow)] sm:p-7">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-primary">0{index + 1}</span>
                  <span className="h-px w-12 bg-primary/35 transition-all duration-300 group-hover:w-20 group-hover:bg-primary" />
                </div>
                <p className="mt-8 text-[10px] font-bold uppercase tracking-[0.17em] text-muted">{item.eyebrow}</p>
                <h3 className="mt-2 text-2xl font-bold tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.detail}</p>
                <ul className="mt-auto flex flex-wrap gap-x-4 gap-y-2 border-t border-border-subtle pt-5">
                  {item.links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="inline-flex items-center text-xs font-semibold text-foreground transition-colors hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">
                        {link.label}<ArrowUpRight aria-hidden className="ml-1 h-3.5 w-3.5 text-primary" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
