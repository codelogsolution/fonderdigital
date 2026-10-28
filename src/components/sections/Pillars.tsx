import Link from "next/link";
import { ArrowUpRight, BrainCircuit, Code2, Search, type LucideIcon } from "lucide-react";
import Reveal from "@/components/motion/Reveal";

type Pillar = {
  title: string;
  icon: LucideIcon;
  description: string;
  href: string;
  capabilities: string[];
};

const pillars: Pillar[] = [
  {
    title: "Digital products",
    icon: Code2,
    description:
      "Websites and mobile apps planned around the people who use them, the systems they connect to, and the team that will maintain them.",
    href: "/services/web-dev",
    capabilities: ["Next.js & React", "Mobile apps", "Product UX"],
  },
  {
    title: "AI engineering",
    icon: BrainCircuit,
    description:
      "RAG assistants, AI product features, and workflow integrations shaped around approved information, evaluation, and human review.",
    href: "/services/ai-development",
    capabilities: ["RAG & chatbots", "AI workflows", "Human review"],
  },
  {
    title: "Search & growth",
    icon: Search,
    description:
      "Technical SEO, useful content, and campaign measurement aligned with your audience and business goals.",
    href: "/services/seo",
    capabilities: ["Technical SEO", "Content strategy", "Measurement"],
  },
];

export default function Pillars() {
  return (
    <section id="capabilities" className="relative isolate overflow-hidden py-16 sm:py-20 lg:py-24">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-mesh opacity-50" />
        <div className="absolute -right-48 top-1/3 h-[28rem] w-[28rem] rounded-full bg-primary/[0.055] blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 border-b border-border-subtle pb-8 sm:gap-8 sm:pb-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(18rem,0.75fr)] lg:items-end">
          <Reveal>
            <span className="inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.2em] text-primary">
              <span aria-hidden="true" className="h-px w-7 bg-primary/55" />
              What we bring together
            </span>
            <h2 className="mt-4 max-w-3xl text-balance text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              Connected capabilities. <span className="text-gradient">One clear direction.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="max-w-xl text-sm leading-relaxed text-muted sm:text-base">
              Choose the expertise your next step needs. We shape the scope together, keep reviews visible, and bring in the right disciplines without making the work feel fragmented.
            </p>
          </Reveal>
        </div>

        <ol className="mt-2">
          {pillars.map(({ title, icon: Icon, description, href, capabilities }, index) => (
            <li key={title} className="group relative border-b border-border-subtle">
              <Reveal delay={index * 0.055}>
                <Link
                  href={href}
                  className="relative grid gap-x-5 gap-y-4 py-7 outline-none transition-colors duration-300 hover:bg-primary/[0.025] focus-visible:bg-primary/[0.035] sm:py-8 lg:grid-cols-[4rem_minmax(13rem,0.9fr)_minmax(16rem,1.25fr)_minmax(15rem,1fr)_2.5rem] lg:items-center lg:gap-x-7 lg:py-9"
                >
                  <span className="flex items-center gap-3">
                    <span className="font-mono text-xs font-semibold tracking-[0.18em] text-primary/75">0{index + 1}</span>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border-subtle bg-background/70 text-primary transition-all duration-300 group-hover:border-primary/30 group-hover:bg-primary/10 group-hover:-rotate-3">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </span>

                  <h3 className="text-xl font-bold tracking-tight text-foreground transition-transform duration-300 group-hover:translate-x-1 sm:text-2xl">{title}</h3>

                  <p className="max-w-xl text-sm leading-relaxed text-muted sm:text-base">{description}</p>

                  <ul className="flex flex-wrap gap-2 lg:justify-start">
                    {capabilities.map((capability) => (
                      <li key={capability} className="rounded-full border border-border-subtle bg-background/70 px-2.5 py-1 text-[10px] font-semibold text-muted sm:text-[11px]">
                        {capability}
                      </li>
                    ))}
                  </ul>

                  <span className="absolute right-0 top-8 flex h-9 w-9 items-center justify-center rounded-full border border-border-subtle text-muted transition-all duration-300 group-hover:border-primary/35 group-hover:bg-primary group-hover:text-primary-foreground group-focus-visible:border-primary/35 group-focus-visible:bg-primary group-focus-visible:text-primary-foreground lg:static">
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                  </span>

                  <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-primary/70 via-primary/20 to-transparent transition-transform duration-500 group-hover:scale-x-100 group-focus-visible:scale-x-100" />
                </Link>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal delay={0.12}>
          <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 border-l-2 border-primary/50 pl-4 text-sm">
            <span className="font-bold tracking-tight text-foreground">One joined-up team.</span>
            <span className="text-muted">Strategy, design, engineering, and growth scoped around the same goal.</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
