import Image from "next/image";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import Reveal from "@/components/motion/Reveal";

type Pillar = {
  index: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  imageAlt: string;
  points: string[];
};

const pillars: Pillar[] = [
  {
    index: "01",
    title: "Technical Backend Architecture",
    subtitle: "Robust & Scalable Infrastructure",
    description:
      "Plan the data, APIs, integrations, and deployment approach around the product's needs and expected usage.",
    image:
      "/images/photo-1558494949.webp",
    imageAlt: "Server racks in a modern data center",
    points: [
      "Type-safe APIs & resilient data layers",
      "Cloud-native CI/CD pipelines",
      "Performance and reliability priorities scoped up front",
    ],
  },
  {
    index: "02",
    title: "Frontend & Motion Engineering",
    subtitle: "Premium User Experiences",
    description:
      "Shape clear interfaces and purposeful motion, with reusable design systems and accessibility considered throughout the work.",
    image:
      "/images/photo-1587620962725.webp",
    imageAlt: "Frontend code on a laptop screen",
    points: [
      "Motion tuned to the interaction",
      "Design systems in Figma + code",
      "Accessibility considered from design through QA",
    ],
  },
  {
    index: "03",
    title: "Growth Marketing & Copywriting",
    subtitle: "High-Converting Copy & Strategy",
    description:
      "Connect messaging, campaign planning, and reporting to the goals agreed for your business and audience.",
    image:
      "/images/photo-1557804506.webp",
    imageAlt: "Growth team reviewing campaign performance together",
    points: [
      "Direct-response copywriting",
      "Full-funnel campaign architecture",
      "Reporting aligned to agreed business measures",
    ],
  },
];

export default function AboutPillars() {
  return (
    <section className="relative py-8 sm:py-14">
      <div className="mx-auto max-w-7xl space-y-24 px-4 sm:px-6 lg:space-y-32 lg:px-8">
        {pillars.map((pillar, index) => {
          const reversed = index % 2 === 1;
          return (
            <div
              key={pillar.index}
              className="grid items-center gap-12 lg:grid-cols-2"
            >

              <Reveal className={cn("group", reversed && "lg:order-2")}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border-subtle shadow-[0_24px_64px_var(--primary-soft)]">
                  <Image
                    src={pillar.image}
                    alt={pillar.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 42rem, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent"
                  />
                  <span className="text-gradient absolute bottom-6 left-6 text-6xl font-extrabold tracking-tight sm:text-7xl">
                    {pillar.index}
                  </span>
                </div>
              </Reveal>

              <Reveal delay={0.1} className={cn(reversed && "lg:order-1")}>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                  {pillar.subtitle}
                </p>
                <h2 className="mt-4 text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
                  {pillar.title}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
                  {pillar.description}
                </p>
                <ul className="mt-6 space-y-3">
                  {pillar.points.map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      <span className="text-sm text-foreground/90">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          );
        })}
      </div>
    </section>
  );
}
