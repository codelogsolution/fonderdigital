import Reveal from "@/components/motion/Reveal";
import SplitText from "@/components/motion/SplitText";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

/**
 * Shared by every inner page, so it carries the site's depth treatment:
 * layered colour fields, a fading technical grid and film grain behind the
 * title, plus a rule that ties the header back to the content below.
 */
export default function PageHeader({
  eyebrow,
  title,
  description,
}: PageHeaderProps) {
  return (
    <section className="relative isolate overflow-hidden pb-14 pt-32 sm:pb-16 sm:pt-40 lg:pt-44">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-aurora" />
        <div className="absolute inset-x-0 top-0 h-[420px] bg-grid [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)] opacity-60" />
        <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-multiply" />
        <div
          className="absolute -top-32 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-primary/12 blur-[130px]"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal delay={0.05}>
          <span className="inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.2em] text-primary">
            <span aria-hidden className="h-px w-7 bg-primary/45" />
            {eyebrow}
          </span>
        </Reveal>

        <h1 className="mt-5 max-w-4xl text-balance text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl lg:leading-[1.02]">
          <SplitText text={title} by="char" className="inline-block" />
        </h1>

        {description && (
          <Reveal delay={0.45}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              {description}
            </p>
          </Reveal>
        )}

        <Reveal delay={0.55}>
          <div
            aria-hidden
            className="mt-12 h-px w-full bg-gradient-to-r from-transparent via-border-subtle to-transparent"
          />
        </Reveal>
      </div>
    </section>
  );
}
