"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
} from "framer-motion";
import type { ProcessStep } from "@/config/site";
import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";

export default function ServiceJourney({
  serviceName,
  steps,
}: {
  serviceName: string;
  steps: ProcessStep[];
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const reducedMotion = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.72", "end 0.72"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 28,
    mass: 0.35,
  });

  return (
    <section ref={sectionRef} aria-labelledby="service-process" className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-3xl sm:mb-16">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">How we work</p>
          <h2 id="service-process" className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl">
            From first question to real progress.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            A clear path for your {serviceName.toLowerCase()} project, with decisions and deliverables visible at every step.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <aside className="self-start lg:sticky lg:top-28 lg:h-[calc(100svh-9rem)] lg:min-h-[30rem]">
            <div className="flex h-full flex-col justify-between rounded-[1.75rem] border border-border-subtle bg-surface/70 p-6 sm:p-8">
              <div>
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.18em] text-muted">
                  <span>Project path</span>
                  <span className="font-mono">0{activeStep + 1} / 0{steps.length}</span>
                </div>
                <div className="mt-8 flex gap-4">
                  <div className="relative w-px self-stretch overflow-hidden bg-border-subtle">
                    <motion.div
                      aria-hidden
                      className="absolute inset-x-0 top-0 origin-top bg-primary"
                      style={{ scaleY: reducedMotion ? 1 : progress }}
                    />
                  </div>
                  <ol className="space-y-5">
                    {steps.map((step, index) => (
                      <li key={step.step} className="flex min-h-8 items-center gap-3">
                        <span className={`font-mono text-[10px] transition-colors duration-300 ${index === activeStep ? "text-primary" : "text-muted/60"}`}>
                          0{index + 1}
                        </span>
                        <span className={`text-sm font-semibold transition-colors duration-300 ${index === activeStep ? "text-foreground" : "text-muted/70"}`}>
                          {step.step}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
              <p className="mt-10 border-t border-border-subtle pt-5 text-sm leading-relaxed text-muted">
                One team, clear checkpoints, and no mystery handoffs.
              </p>
            </div>
          </aside>

          <ol className="space-y-4 sm:space-y-5">
            {steps.map((step, index) => (
              <li key={step.step}>
                <motion.article
                  onViewportEnter={() => setActiveStep(index)}
                  viewport={{ amount: 0.35, margin: "-18% 0px -26% 0px" }}
                  initial={false}
                  animate={{ y: reducedMotion ? 0 : activeStep === index ? -2 : 0 }}
                  transition={{ duration: reducedMotion ? 0 : 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
                  className={`relative min-h-56 overflow-hidden rounded-[1.5rem] border p-6 transition-[border-color,background-color,box-shadow] duration-300 sm:min-h-64 sm:p-8 lg:min-h-[19rem] ${activeStep === index ? "border-primary/40 bg-surface shadow-[0_22px_60px_-42px_var(--primary-glow)]" : "border-border-subtle bg-surface/60"}`}
                >
                  <span aria-hidden className="pointer-events-none absolute -right-2 -top-8 font-display text-[10rem] font-black leading-none tracking-[-0.09em] text-foreground/[0.035] sm:text-[13rem]">
                    0{index + 1}
                  </span>
                  <div className="relative flex h-full flex-col justify-between gap-10">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-primary/25 font-mono text-xs font-bold text-primary">0{index + 1}</span>
                      <span className="text-xs font-bold uppercase tracking-[0.18em] text-primary">{step.step}</span>
                    </div>
                    <div className="max-w-xl">
                      <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">{step.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">{step.description}</p>
                    </div>
                  </div>
                </motion.article>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
