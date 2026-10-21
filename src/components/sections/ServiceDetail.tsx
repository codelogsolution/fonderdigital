import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { getServicePage } from "@/config/site";
import Reveal from "@/components/motion/Reveal";
import CallToAction from "@/components/sections/CallToAction";
import ServiceJourney from "@/components/sections/ServiceJourney";
import WorkFaq from "@/components/sections/WorkFaq";

export default function ServiceDetail({ slug, children }: { slug: string; children?: ReactNode }) {
  const service = getServicePage(slug);
  if (!service) return null;
  const faqItems = [
    ...(service.slug === "app-dev"
      ? [
          {
            question: "How do you choose React Native, Flutter, or native development?",
            answer:
              "We compare the product requirements, existing code, platform-specific features, performance needs, team skills, and long-term maintenance. React Native with TypeScript or JavaScript is a common shared-code option; Flutter uses Dart; native Android uses Kotlin and native iOS uses Swift. The recommendation depends on the project, not a default rule.",
          },
          {
            question: "How do testing and app-store releases work?",
            answer:
              "Developers write and run unit tests; QA checks agreed features, integrations, and supported devices, then logs issues for a fix-and-retest cycle. GitHub reviews and CI/CD can automate checks and signed builds. Store submissions can be prepared or automated through the pipeline, while Apple and Google review and release approvals remain part of publishing.",
          },
          {
            question: "Where does Docker fit in mobile development?",
            answer:
              "Docker can make API/backend services or development and CI environments repeatable. Android and iOS store packages are built with their platform toolchains, such as Android's Gradle tooling and Apple's Xcode—not packaged as Docker containers.",
          },
        ]
      : service.slug === "web-dev"
        ? [
            {
              question: "When do you use React versus Next.js?",
              answer:
                "React is used to build interactive interfaces. Next.js is a React framework that can add routing, server rendering, static generation, and server-side features. We choose the setup based on the content, performance, integrations, and product requirements.",
            },
            {
              question: "How do you keep a website fast as it grows?",
              answer:
                "We measure the relevant pages, keep feature code organized, and use tools such as route-level code splitting, lazy loading, image optimization, and caching where they help. The team retests key journeys and performance after meaningful changes.",
            },
            {
              question: "How do GitHub, QA, and CI/CD fit into delivery?",
              answer:
                "Developers run unit checks and open GitHub pull requests. QA verifies integrations, browsers, and acceptance criteria; issues are fixed and retested. CI/CD can rerun checks and deploy after the required review and approvals. Docker is useful for some backend services and consistent environments, but is not required for every website.",
            },
          ]
        : service.slug === "seo"
          ? [
              {
                question: "Can you guarantee a first-page or number-one ranking?",
                answer:
                  "No. Search engines control crawling, indexing, and ranking, and no agency can guarantee a specific position. We can make the site easier to crawl and understand, improve useful content, and report on observed search data and agreed business actions.",
              },
              {
                question: "What does an SEO engagement include?",
                answer:
                  "It depends on the site and goals. Work may include a technical review, query and content research, on-page improvements, local search support, implementation coordination, and Search Console or analytics reporting. We agree the deliverables after reviewing your current setup.",
              },
              {
                question: "How do you measure progress?",
                answer:
                  "We can review Search Console impressions, clicks, queries, and landing pages alongside analytics and the enquiry or purchase actions configured for your site. Search demand, competition, implementation, and search-engine changes affect outcomes, so reports distinguish measured data from forecasts.",
              },
            ]
          : service.slug === "marketing"
            ? [
                {
                  question: "Do you manage both paid and organic social?",
                  answer:
                    "The engagement can cover paid campaigns, organic social planning, or both. We define the channels, content volume, publishing responsibilities, community support, and approvals in the scope before work begins.",
                },
                {
                  question: "Can you guarantee leads or return on ad spend?",
                  answer:
                    "No. Results depend on the offer, audience, creative, budget, landing page, tracking, competition, and other factors. We agree a measurement plan, report what the platforms and analytics show, and make clear where attribution has limits.",
                },
                {
                  question: "How do you decide whether a campaign is working?",
                  answer:
                    "First we agree the goal and conversion action, then check that tracking works. We review delivery, spend, audience response, landing-page behavior, and the agreed conversions, using enough data to inform decisions rather than treating a few clicks as proof.",
                },
              ]
            : service.slug === "content"
              ? [
                  {
                    question: "How do you make sure the content is accurate?",
                    answer:
                      "We work from your approved product information, source material, and subject-matter input. Factual claims are checked against those sources and sent to your team for review and approval before publication. We do not invent testimonials, credentials, or performance claims.",
                  },
                  {
                    question: "Do you use AI to write content?",
                    answer:
                      "AI may assist with research organization, outlines, or draft exploration when useful. A human editor reviews the work for accuracy, originality, voice, and usefulness; AI output is not published unchecked, and client subject experts verify claims about their business or products.",
                  },
                  {
                    question: "What do you need from us to write well?",
                    answer:
                      "Helpful inputs include your audience and offer, product details, customer questions, existing brand guidance, approved proof, source documents, and a person who can review drafts. We identify missing facts before copy is finalized.",
                  },
                ]
              : service.slug === "branding"
                ? [
                    {
                      question: "Does branding include more than a logo?",
                      answer:
                        "A useful identity can include positioning and message foundations, logo variations, color, typography, imagery direction, layouts, and application guidance. The exact deliverables depend on the project and are listed in the agreed scope.",
                    },
                    {
                      question: "How do you choose a brand direction?",
                      answer:
                        "We use your goals, audience, offer, existing materials, and category context to develop a rationale and creative directions. You review and agree a direction before the identity system is developed and applied.",
                    },
                    {
                      question: "What will our team receive at handoff?",
                      answer:
                        "The proposal specifies approved exports, source files, and guidance for using the identity. File formats, applications, templates, and any Figma or code components are confirmed for the needs of your team.",
                    },
                  ]
                : []),
    {
      question: `How do you scope a ${service.title.toLowerCase()} project?`,
      answer:
        "We start with your goals, audience, and current setup. Before work begins, we agree the deliverables, milestones, responsibilities, and investment in a written proposal.",
    },
    {
      question: "How long will the project take?",
      answer:
        "Timing depends on the scope, integrations, content readiness, and review cycles. After an initial conversation, we can map a realistic schedule instead of guessing from a template.",
    },
    {
      question: "Can you improve something we already have?",
      answer:
        "Yes. We can review your existing site, app, or setup first, then recommend what to keep, improve, integrate, or replace. The proposal will make those boundaries clear.",
    },
    {
      question: "What happens after launch?",
      answer:
        "The handover, documentation, and any ongoing support are agreed as part of the project scope. If you want continued optimization, we can plan that before launch.",
    },
  ];

  return (
    <>

      <section className="relative isolate overflow-hidden pb-16 pt-28 sm:pb-20 sm:pt-36 lg:pb-24 lg:pt-40">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <Image
            src={service.image}
            alt=""
            fill
            sizes="100vw"
            priority
            className="object-cover object-center opacity-[0.16] grayscale mix-blend-soft-light"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/72" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/25 via-transparent to-background" />
          <div className="absolute inset-0 bg-grid opacity-25 [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" />
          <div className="absolute -right-40 top-10 h-96 w-96 rounded-full bg-primary/10 blur-[120px]" />
        </div>
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20 lg:px-8">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/25 bg-background/70 text-primary backdrop-blur-sm">
                <service.icon aria-hidden className="h-5 w-5" />
              </span>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Our services</span>
            </div>
            <h1 className="mt-7 max-w-2xl text-balance text-5xl font-extrabold leading-[0.98] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
              {service.title}
            </h1>
            <p className="mt-6 max-w-xl text-xl font-semibold leading-snug text-foreground/85 sm:text-2xl">
              {service.tagline}
            </p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              {service.description}
            </p>
            <Link href="/contact" className="group mt-8 inline-flex min-h-12 items-center gap-3 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_35px_-14px_var(--primary-glow-strong)]">
              Plan your project
              <ArrowUpRight aria-hidden className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative mx-auto w-full max-w-lg border-l border-primary/30 pl-6 sm:pl-8 lg:ml-auto">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted">A clear path forward</p>
              <ol className="mt-6 space-y-6">
                {service.process.slice(0, 3).map((step, index) => (
                  <li key={step.step} className="group flex items-start gap-4">
                    <span className="font-mono text-xs text-primary">0{index + 1}</span>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">{step.step}</p>
                      <p className="mt-1 text-lg font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">{step.title}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <p className="mt-8 border-t border-border-subtle pt-4 text-xs font-medium uppercase tracking-[0.18em] text-muted">
                Build <span className="px-2 text-primary">·</span> Grow <span className="px-2 text-primary">·</span> Convert
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-8 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <Reveal>
              <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                What&apos;s included
              </h2>
              <ul className="mt-8 grid auto-rows-fr gap-4">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 rounded-xl border border-border-subtle bg-surface/60 p-4 transition-colors duration-300 hover:border-primary/30 hover:bg-surface"
                  >
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                      <Check aria-hidden className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-sm text-foreground/90">{feature}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                What the work can include
              </h2>
              <div className="mt-8 grid auto-rows-fr gap-4 sm:grid-cols-3">
                {service.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-border-subtle flex h-full min-w-0 flex-col items-center justify-center bg-surface px-3 py-6 text-center sm:px-4"
                  >
                    <p className="text-lg font-extrabold text-primary sm:text-xl">
                      {stat.value}
                    </p>
                    <p className="mt-2 text-xs text-muted sm:text-sm">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section aria-labelledby="service-fit" className="band-dark relative isolate overflow-hidden py-16 sm:py-20">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-35 [mask-image:radial-gradient(ellipse_at_center,black,transparent_78%)]" />
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-8">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">A good fit if</p>
            <h2 id="service-fit" className="mt-4 max-w-md text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Is this the right next step?
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
              Start with the challenge you need to solve. We&apos;ll help shape the right scope around it.
            </p>
          </Reveal>
          <ul className="divide-y divide-white/10 border-y border-white/10">
            {service.fitFor.map((item, index) => (
              <li key={item} className="flex items-start gap-4 py-5 sm:py-6">
                <span aria-hidden className="mt-0.5 font-mono text-sm text-primary">0{index + 1}</span>
                <p className="max-w-2xl text-base leading-relaxed text-foreground/90 sm:text-lg">{item}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ServiceJourney serviceName={service.title} steps={service.process} />

      {children}

      <section aria-labelledby="service-faq" className="py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20 lg:px-8">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Before we begin</p>
            <h2 id="service-faq" className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
              A few useful answers.
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
              Have a question specific to your project? Share what you&apos;re trying to achieve and we&apos;ll help you find a practical next step.
            </p>
            <Link href="/contact" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline">
              Talk through your project
              <ArrowUpRight aria-hidden className="h-4 w-4" />
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <WorkFaq items={faqItems} />
          </Reveal>
        </div>
      </section>

      <CallToAction />
    </>
  );
}
