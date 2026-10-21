import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDownRight, ArrowRight } from "lucide-react";
import { servicePages } from "@/config/site";
import Reveal from "@/components/motion/Reveal";
import CallToAction from "@/components/sections/CallToAction";
import { ServicesGrowthPath, ServicesStartingPoints } from "@/components/sections/ServicesGrowthPath";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore FonderDigital's services — web development, app development, SEO, paid media, content & copywriting, and branding.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden pb-16 pt-32 sm:pb-20 sm:pt-40 lg:pb-24 lg:pt-44">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-35 [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" />
        <div aria-hidden className="pointer-events-none absolute -right-40 top-20 -z-10 h-[28rem] w-[28rem] rounded-full bg-primary/10 blur-[120px]" />
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-16 lg:px-8">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-primary">
                <span aria-hidden className="h-px w-8 bg-primary" />
                What we do
              </span>
              <h1 className="mt-6 max-w-4xl text-balance text-5xl font-extrabold leading-[0.98] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
                Build what&apos;s next.
                <span className="mt-1 block text-primary">Make it matter.</span>
              </h1>
            </Reveal>
          </div>
          <Reveal delay={0.12}>
            <div className="border-l border-primary/35 pl-5 sm:pl-7">
              <p className="max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                Strategy, design, and engineering under one roof. Choose the
                specialist you need, or bring us in to connect the whole growth
                system.
              </p>
              <a href="#service-list" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-foreground transition-colors hover:text-primary">
                Find your next move
                <ArrowDownRight aria-hidden className="h-4 w-4 text-primary" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="service-list" className="relative pb-20 sm:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-5 flex items-end justify-between border-b border-border-subtle pb-4">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">Capabilities</p>
            <p className="text-xs text-muted">01 — 06</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {servicePages.map((service, index) => (
              <Reveal key={service.slug} delay={(index % 3) * 0.06} className="h-full">
                <Link
                  href={`/services/${service.slug}`}
                  className="group relative flex h-full min-h-64 flex-col overflow-hidden rounded-2xl border border-border-subtle bg-surface/70 p-6 transition-[border-color,background-color,transform] duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-surface sm:min-h-72 sm:p-7"
                >
                  <span aria-hidden className="absolute right-5 top-1 text-7xl font-black tracking-[-0.08em] text-foreground/[0.035] transition-colors duration-300 group-hover:text-primary/10">
                    0{index + 1}
                  </span>
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                    <service.icon aria-hidden className="h-5 w-5" />
                  </span>
                  <div className="mt-auto pt-10">
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-primary">Service 0{index + 1}</p>
                        <h2 className="mt-2 text-xl font-bold tracking-tight sm:text-2xl">{service.title}</h2>
                      </div>
                      <ArrowRight aria-hidden className="mb-1 h-5 w-5 shrink-0 text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-primary" />
                    </div>
                    <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">{service.tagline}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ServicesGrowthPath />
      <ServicesStartingPoints />
      <CallToAction />
    </>
  );
}
