import { Check } from "lucide-react";
import Reveal from "@/components/motion/Reveal";

const timeline = [
  {
    year: "01",
    title: "Understand the context",
    description:
      "Get clear on the people you need to reach, the problem to solve, and the constraints around the work.",
  },
  {
    year: "02",
    title: "Set a useful direction",
    description:
      "Turn the brief into priorities, a defined scope, and a plan your team can review before execution begins.",
  },
  {
    year: "03",
    title: "Make and review the work",
    description:
      "Share progress as the design, build, content, or campaign takes shape so decisions stay visible.",
  },
  {
    year: "04",
    title: "Learn what should happen next",
    description:
      "After launch, use the analytics and feedback available to decide what to maintain, test, or improve.",
  },
];

const principles = [
  "Agree performance priorities before development",
  "Consider accessibility in design and quality checks",
  "Plan measurement around useful project questions",
  "Share progress in reviewable increments",
  "Make scope, assumptions, and trade-offs explicit",
  "Document next-step recommendations where useful",
];

export default function Story() {
  return (
    <section className="relative isolate overflow-hidden border-t border-border-subtle py-14 sm:py-20">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-aurora opacity-50" />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-noise opacity-[0.025] mix-blend-multiply" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
            Our story
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Strategy, design, and delivery in one clear process
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-16 lg:grid-cols-2">

          <ol className="relative space-y-10 border-l border-border-subtle pl-8">
            {timeline.map((entry, index) => (
              <Reveal key={entry.year} delay={index * 0.1}>
                <li className="relative">
                  <span
                    aria-hidden
                    className="absolute -left-[2.45rem] top-1.5 h-3 w-3 rounded-full border-2 border-primary bg-background shadow-[0_0_12px_var(--primary-glow)]"
                  />
                  <p className="text-sm font-bold uppercase tracking-widest text-primary">
                    {entry.year}
                  </p>
                  <h3 className="mt-2 text-lg font-bold tracking-tight">
                    {entry.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {entry.description}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={0.1}>
            <div className="h-full rounded-[1.75rem] glass-premium ring-gradient p-8">
              <h3 className="text-xl font-extrabold tracking-tight">
                Standard operating principles
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Quality checks and clear communication should fit the goals,
                constraints, and scope of each engagement. These principles
                guide that process:
              </p>
              <ul className="mt-8 space-y-4">
                {principles.map((principle) => (
                  <li key={principle} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-sm text-foreground/90">
                      {principle}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
