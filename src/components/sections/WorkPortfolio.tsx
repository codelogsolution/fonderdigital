import Link from "next/link";
import { ArrowDown, ArrowUpRight, BrainCircuit, Code2, Search, Smartphone } from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import { caseStudies } from "@/config/site";

const capabilities = [
  { title: "AI engineering", detail: "RAG assistants, AI features and workflow integrations", href: "/services/ai-development", icon: BrainCircuit },
  { title: "Web development", detail: "Responsive websites and digital products", href: "/services/web-dev", icon: Code2 },
  { title: "Mobile apps", detail: "Product experiences for iOS and Android", href: "/services/app-dev", icon: Smartphone },
  { title: "Search & growth", detail: "SEO and digital marketing shaped around goals", href: "/services/seo", icon: Search },
];

export default function WorkPortfolio() {
  return (
    <>
      <section aria-labelledby="work-feature" className="relative isolate overflow-hidden pb-24 sm:pb-32">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -right-40 top-0 h-[32rem] w-[32rem] rounded-full bg-primary/10 blur-[120px]" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/35 to-transparent" />
        </div>
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-8">
          <Reveal direction="left">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[color:var(--primary-deep,var(--primary))]">In-house digital product</p>
            <h2 id="work-feature" className="mt-5 max-w-xl text-3xl font-extrabold leading-[1.08] tracking-tight sm:text-4xl lg:text-5xl">
              A digital home for <span className="text-gradient">FonderDigital.</span>
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              Our own website brings the studio’s AI engineering, web and app development, and growth services into one clear experience. It is a live in-house project—not a client case study or a claim about client outcomes.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {["Next.js", "React", "Responsive experience", "Service-led content"].map((item) => (
                <span key={item} className="rounded-full border border-border-subtle bg-surface/70 px-3.5 py-2 text-xs font-semibold text-foreground/80">{item}</span>
              ))}
            </div>
            <a href="https://www.fonderdigital.com" target="_blank" rel="noreferrer" className="mt-9 inline-flex items-center gap-2 text-sm font-bold text-[color:var(--primary-deep,var(--primary))] transition-colors hover:text-foreground">
              Visit the live website <ArrowUpRight aria-hidden className="h-4 w-4" />
            </a>
          </Reveal>

          <Reveal direction="right" delay={0.08}>
            <div className="relative mx-auto w-full max-w-2xl">
              <div aria-hidden className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-primary/20 via-transparent to-primary/5 blur-xl" />
              <div className="band-dark relative overflow-hidden rounded-[1.6rem] border border-white/10 p-4 shadow-[0_32px_100px_-40px_var(--primary-glow-strong)] sm:rounded-[2rem] sm:p-6">
                <div className="flex items-center gap-2 border-b border-white/10 pb-4">
                  <span className="h-2.5 w-2.5 rounded-full bg-primary" /><span className="h-2.5 w-2.5 rounded-full bg-white/25" /><span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                  <span className="ml-3 truncate rounded-full bg-white/[0.06] px-4 py-1.5 text-[10px] text-white/55">fonderdigital.com</span>
                  <span className="ml-auto rounded-full border border-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">Site overview</span>
                </div>
                <div className="grid min-h-[330px] gap-5 py-7 sm:min-h-[390px] sm:grid-cols-[1fr_0.8fr] sm:items-center sm:gap-7 sm:py-10">
                  <div className="relative z-10">
                    <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-primary">AI · Digital products · Growth</span>
                    <p className="mt-4 max-w-sm text-3xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-4xl">Build what moves your business forward.</p>
                    <p className="mt-4 max-w-sm text-xs leading-relaxed text-white/55 sm:text-sm">A studio experience for AI engineering, web and app development, and digital growth.</p>
                    <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-[11px] font-bold text-primary-foreground">Explore the studio <ArrowUpRight aria-hidden className="h-3.5 w-3.5" /></div>
                  </div>
                  <div aria-label="Representation of the website's service areas" className="relative grid grid-cols-2 gap-2.5 sm:gap-3">
                    {[
                      ["01", "AI systems", "RAG · assistants"],
                      ["02", "Web products", "React · Next.js"],
                      ["03", "Mobile apps", "Product design"],
                      ["04", "Digital growth", "SEO · marketing"],
                    ].map(([number, title, subtitle], index) => (
                      <div key={number} className={`min-h-28 rounded-2xl border border-white/10 p-3 sm:min-h-32 sm:p-4 ${index === 1 ? "translate-y-4 bg-primary/15" : index === 2 ? "-translate-y-2 bg-white/[0.07]" : "bg-white/[0.035]"}`}>
                        <span className="text-[10px] font-bold tracking-widest text-primary">{number}</span>
                        <p className="mt-3 text-xs font-bold text-white sm:text-sm">{title}</p>
                        <p className="mt-1 text-[10px] text-white/65">{subtitle}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-white/10 pt-4 text-[10px] text-white/60">
                  <span>Visual summary · not a screenshot</span><span>In-house website project</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="explorations-heading" className="relative overflow-hidden py-24 sm:py-32">
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-surface-2/40 via-transparent to-primary/[0.04]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-12 grid gap-5 border-b border-border-subtle pb-8 sm:mb-16 sm:grid-cols-[1fr_auto] sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[color:var(--primary-deep,var(--primary))]">Studio explorations</p>
              <h2 id="explorations-heading" className="mt-4 max-w-3xl text-3xl font-extrabold tracking-tight sm:text-4xl">Ideas in interface form.</h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-muted">These are original visual explorations that demonstrate possible product directions. They are clearly marked concepts—not client work, published apps, or measured results.</p>
          </Reveal>

          <div className="grid gap-5 lg:grid-cols-2 lg:gap-8">
            {caseStudies.map((study, index) => (
              <Reveal key={study.title} delay={index * 0.08}>
                <article className={`group relative isolate flex h-full min-h-[360px] flex-col overflow-hidden rounded-[1.75rem] border border-border-subtle p-6 transition-transform duration-500 hover:-translate-y-1 sm:min-h-[420px] sm:p-9 ${index === 0 ? "band-dark text-white" : "bg-surface"}`}>
                  <div aria-hidden className={`absolute -right-16 -top-20 -z-10 h-64 w-64 rounded-full blur-[90px] transition-opacity duration-700 group-hover:opacity-90 ${index === 0 ? "bg-primary/25" : "bg-primary/10"}`} />
                  <div className="flex items-center justify-between gap-4">
                  <span className={`rounded-full border px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] ${index === 0 ? "border-primary/40 bg-primary/10 text-primary" : "border-primary/30 bg-primary/5 text-[color:var(--primary-deep,var(--primary))]"}`}>Concept study</span>
                    <span className={`text-xs ${index === 0 ? "text-white/65" : "text-muted"}`}>0{index + 1} / 02</span>
                  </div>
                  <p className={`mt-10 text-xs font-semibold uppercase tracking-[0.15em] ${index === 0 ? "text-white/65" : "text-muted"}`}>{study.industry}</p>
                  <h3 className="mt-3 max-w-lg text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl">{study.title}</h3>
                  <p className={`mt-4 max-w-xl text-sm leading-relaxed ${index === 0 ? "text-white/60" : "text-muted"}`}>{study.summary}</p>
                  <ul className="mt-auto flex flex-wrap gap-2 pt-8">
                    {study.services.map((service) => <li key={service} className={`rounded-full border px-3 py-1.5 text-[10px] font-semibold ${index === 0 ? "border-white/10 bg-white/[0.04] text-white/70" : "border-border-subtle bg-surface-2/50 text-foreground/75"}`}>{service}</li>)}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
          <p className="mt-5 text-xs leading-relaxed text-muted">Concepts are shared to show design direction only. They do not represent client engagements or outcomes.</p>
        </div>
      </section>

      <section aria-labelledby="capabilities-heading" className="relative overflow-hidden py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="grid gap-6 border-t border-border-subtle pt-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[color:var(--primary-deep,var(--primary))]">What we do</p>
              <h2 id="capabilities-heading" className="mt-4 max-w-xl text-3xl font-extrabold tracking-tight sm:text-4xl">One studio. Connected capabilities.</h2>
            </div>
            <p className="max-w-2xl text-base leading-relaxed text-muted sm:text-lg">Explore the services FonderDigital offers. Each engagement is scoped to the business goal, the people using it, and the work required.</p>
          </Reveal>
          <div className="mt-10 grid border-t border-border-subtle sm:grid-cols-2">
            {capabilities.map(({ title, detail, href, icon: Icon }, index) => (
              <Reveal key={title} delay={index * 0.04}>
                <Link href={href} className="group flex min-h-32 items-start gap-5 border-b border-border-subtle py-6 transition-colors hover:bg-primary/[0.035] sm:px-5 sm:py-8">
                  <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-primary/20 bg-primary/[0.06] text-[color:var(--primary-deep,var(--primary))] transition-transform duration-300 group-hover:scale-105"><Icon aria-hidden className="h-5 w-5" /></span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center justify-between gap-3 text-lg font-bold tracking-tight">{title}<ArrowUpRight aria-hidden className="h-4 w-4 shrink-0 text-[color:var(--primary-deep,var(--primary))] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
                    <span className="mt-2 block text-sm leading-relaxed text-muted">{detail}</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-8 flex items-center gap-3 text-xs text-muted">
            <ArrowDown aria-hidden className="h-4 w-4 text-[color:var(--primary-deep,var(--primary))]" />
            <span>Have a specific brief? <Link href="/contact" className="font-bold text-[color:var(--primary-deep,var(--primary))] hover:text-foreground">Tell us what you’re building.</Link></span>
          </Reveal>
        </div>
      </section>
    </>
  );
}
