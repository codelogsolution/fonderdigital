import { ArrowUpRight, Bot, BrainCircuit, Database, ShieldCheck, Workflow } from "lucide-react";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";

const capabilities = [
  {
    icon: Database,
    title: "Knowledge assistants",
    description:
      "Help people find answers in approved company content with retrieval-based search and clear source context.",
  },
  {
    icon: Workflow,
    title: "Workflow integrations",
    description:
      "Connect AI model APIs to existing tools and workflows, with human approval for actions that need it.",
  },
  {
    icon: Bot,
    title: "AI product features",
    description:
      "Plan AI features for websites and mobile apps, including privacy, evaluation, and useful fallback paths.",
  },
];

const flow = [
  { icon: Database, label: "Your sources" },
  { icon: Workflow, label: "Retrieval" },
  { icon: BrainCircuit, label: "AI feature" },
  { icon: ShieldCheck, label: "Human review" },
];

export default function AIStudio() {
  return (
    <section
      id="ai-development"
      aria-labelledby="ai-development-heading"
      className="relative isolate overflow-hidden border-y border-border-subtle py-16 sm:py-20 lg:py-24"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-mesh opacity-80" />
        <div className="absolute -right-24 top-0 h-96 w-96 rounded-full bg-primary/10 blur-[110px] motion-reduce:animate-none" />
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16 lg:px-8">
        <Reveal direction="left">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
            Applied AI &amp; product engineering
          </span>
          <h2
            id="ai-development-heading"
            className="mt-4 text-balance text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl"
          >
            AI that fits the way your business works.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            We design and build AI features for websites, apps, and internal
            tools—from assistants grounded in approved business knowledge to
            workflow integrations. Each project starts with a clear use case,
            defined data boundaries, and review steps suited to the work.
          </p>
          <Link
            href="/services/app-dev"
            className="group mt-7 inline-flex items-center gap-2 text-sm font-bold text-primary transition-colors hover:text-primary/80"
          >
            Discuss an AI project
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </Reveal>

        <Reveal direction="right" delay={0.08}>
          <div className="band-dark relative overflow-hidden rounded-[1.75rem] border border-white/10 p-5 shadow-[0_28px_80px_-48px_var(--primary-glow-strong)] sm:p-7">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full bg-primary/15 blur-3xl"
            />
            <div className="relative flex items-center justify-between gap-4 border-b border-white/10 pb-5">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/25 bg-primary/10 text-primary">
                  <Bot className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-bold text-foreground">An AI feature, designed end to end</p>
                  <p className="mt-0.5 text-xs text-muted">Designed around your data</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.07] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-primary">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary motion-reduce:animate-none" />
                Human reviewed
              </span>
            </div>

            <div className="relative mt-5 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] px-3 py-4 sm:px-4">
              <p className="mb-4 text-[9px] font-bold uppercase tracking-[0.17em] text-muted">A considered system flow</p>
              <div aria-hidden="true" className="absolute left-[12%] right-[12%] top-[3.35rem] h-px bg-gradient-to-r from-primary/20 via-primary/65 to-primary/20" />
              <ol className="relative grid grid-cols-4 gap-1">
                {flow.map(({ icon: Icon, label }, index) => (
                  <li key={label} className="flex min-w-0 flex-col items-center gap-2 text-center">
                    <span className={`flex h-9 w-9 items-center justify-center rounded-xl border ${index === 2 ? "border-primary/35 bg-primary/15 text-primary" : "border-white/10 bg-[#17120f] text-foreground/80"}`}>
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="text-[9px] font-semibold leading-tight text-muted sm:text-[10px]">{label}</span>
                  </li>
                ))}
              </ol>
            </div>

            <ul className="relative mt-4 space-y-2.5">
              {capabilities.map(({ icon: Icon, title, description }, index) => (
                <li
                  key={title}
                  className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-3 rounded-2xl border border-white/10 bg-white/[0.035] p-3.5"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-foreground">
                      <span className="mr-2 font-mono text-[10px] text-primary/75">
                        0{index + 1}
                      </span>
                      {title}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-muted sm:text-sm">
                      {description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="relative mt-4 text-[11px] leading-relaxed text-muted">
              The right model, integrations, safeguards, and delivery scope are
              chosen for each project.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
