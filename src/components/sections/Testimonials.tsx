"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { testimonials, type Testimonial } from "@/config/site";
import Reveal from "@/components/motion/Reveal";

const previewReviews: Testimonial[] = [
  { name: "Jordan", quote: "Clear communication and a thoughtful process helped turn our early ideas into a polished experience for our customers.", rating: 4.5 },
  { name: "Akira", quote: "The team brought structure to a complex brief, shared progress at each milestone, and made collaboration straightforward.", rating: 4 },
  { name: "Vicc", quote: "From the first concepts through final refinements, the work felt considered, responsive, and aligned with our goals.", rating: 5 },
  { name: "Thomson", quote: "They connected the design and development details into a cohesive product and kept decisions clear throughout.", rating: 4 },
  { name: "Seth Braddock", quote: "We appreciated the practical recommendations, quick feedback loops, and the care taken to make the final experience intuitive for our team and customers.", rating: 5 },
  { name: "Jerry", quote: "A collaborative team translated our early ideas into a clear digital experience. They kept feedback organized, explained decisions, and made the handoff easy for our team to continue.", rating: 3.8 },
];

function getVisibleCount() {
  if (window.matchMedia("(min-width: 1280px)").matches) return 3;
  if (window.matchMedia("(min-width: 768px)").matches) return 2;
  return 1;
}

export default function Testimonials() {
  const [visibleCount, setVisibleCount] = useState(1);
  const [firstVisible, setFirstVisible] = useState(0);
  const [expandedReviews, setExpandedReviews] = useState<Record<string, boolean>>({});
  const [longReviews, setLongReviews] = useState<Record<string, boolean>>({});
  const quoteRefs = useRef<Record<string, HTMLParagraphElement | null>>({});
  const isPreview = testimonials.length === 0;
  const reviews = isPreview ? previewReviews : testimonials;
  const total = reviews.length;
  const maxFirstVisible = Math.max(0, total - visibleCount);

  useEffect(() => {
    const updateVisibleCount = () => {
      const nextCount = getVisibleCount();
      setVisibleCount(nextCount);
      setFirstVisible((current) => Math.min(current, Math.max(0, total - nextCount)));
    };
    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount, { passive: true });
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, [total]);

  useEffect(() => {
    const measureQuotes = () => {
      const measured: Record<string, boolean> = {};
      reviews
        .slice(firstVisible, firstVisible + visibleCount)
        .forEach((review) => {
          const key = `${review.name}-${review.company ?? "client"}`;
          const quote = quoteRefs.current[key];
          if (!quote || expandedReviews[key]) return;
          measured[key] = quote.scrollHeight > quote.clientHeight + 1;
        });
      setLongReviews((current) => ({ ...current, ...measured }));
    };

    const frame = window.requestAnimationFrame(measureQuotes);
    window.addEventListener("resize", measureQuotes, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", measureQuotes);
    };
  }, [expandedReviews, firstVisible, reviews, visibleCount]);

  if (isPreview && process.env.NODE_ENV === "production") return null;

  const move = (direction: -1 | 1) => {
    setFirstVisible((current) =>
      Math.min(maxFirstVisible, Math.max(0, current + direction * visibleCount)),
    );
  };
  const endVisible = Math.min(firstVisible + visibleCount, total);
  const canMove = total > visibleCount;

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="band-dark relative isolate overflow-hidden border-y border-border-subtle py-14 sm:py-18 lg:py-20"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-dots opacity-[0.12] [mask-image:radial-gradient(ellipse_at_center,black,transparent_78%)]" />
        <div className="absolute -left-40 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-primary/[0.12] blur-[110px]" />
        <div className="absolute -right-40 top-0 h-96 w-96 rounded-full bg-accent-2/[0.1] blur-[110px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.2em] text-primary-accessible">
                <span aria-hidden="true" className="h-px w-7 bg-primary/60" />
                {isPreview ? "Demo review content" : "Client perspectives"}
              </span>
              <h2
                id="testimonials-heading"
                className="mt-4 text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
              >
                Good work, told in their words.
              </h2>
            </div>
            {canMove && (
              <div className="flex items-center gap-3">
                <span className="mr-1 font-mono text-xs text-muted-accessible" aria-live="polite">
                  {String(firstVisible + 1).padStart(2, "0")}–{String(endVisible).padStart(2, "0")} / {String(total).padStart(2, "0")}
                </span>
                <button
                  type="button"
                  onClick={() => move(-1)}
                  disabled={firstVisible === 0}
                  aria-label="Show previous client reviews"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border-subtle text-foreground transition-colors hover:border-primary/60 hover:text-primary-accessible disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ArrowLeft aria-hidden="true" className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => move(1)}
                  disabled={firstVisible >= maxFirstVisible}
                  aria-label="Show more client reviews"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border-subtle text-foreground transition-colors hover:border-primary/60 hover:text-primary-accessible disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.08} className="mt-8 sm:mt-10">
          <div
            role="region"
            aria-roledescription="carousel"
            aria-label="Client reviews"
            className="overflow-hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={firstVisible}
                initial={{ opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -18 }}
                transition={{ duration: 0.28, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="grid gap-4 md:grid-cols-2 xl:grid-cols-3"
              >
                {reviews
                  .slice(firstVisible, firstVisible + visibleCount)
                  .map((review) => {
                    const reviewKey = `${review.name}-${review.company ?? "client"}`;
                    const expanded = Boolean(expandedReviews[reviewKey]);
                    const hasMore = Boolean(longReviews[reviewKey]);

                    return (
                      <figure
                        key={reviewKey}
                        className="relative flex min-h-64 flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl sm:p-7"
                      >
                        <span aria-hidden="true" className="absolute -right-5 -top-10 font-display text-8xl font-black leading-none text-white/[0.045]">“</span>
                        <div className="relative flex flex-wrap items-center gap-2">
                          <span
                            className="flex items-center gap-1"
                            role="img"
                            aria-label={review.rating !== undefined ? `${review.rating} out of 5 stars` : "Rating not provided"}
                          >
                            {Array.from({ length: 5 }, (_, index) => (
                              <span key={index} className="relative h-4 w-4">
                                <Star aria-hidden="true" className="absolute inset-0 h-4 w-4 text-white/25" />
                                {review.rating !== undefined && review.rating > index && (
                                  <Star
                                    aria-hidden="true"
                                    className="absolute inset-0 h-4 w-4 fill-primary text-primary"
                                    style={{ clipPath: `inset(0 ${100 - Math.min(1, review.rating - index) * 100}% 0 0)` }}
                                  />
                                )}
                              </span>
                            ))}
                          </span>
                          {review.rating !== undefined && <span className="ml-auto text-xs font-bold tabular-nums text-foreground">{review.rating}/5</span>}
                          {/* {isPreview && <span className="rounded-full border border-primary/25 bg-primary/10 px-2 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-primary-accessible">Demo</span>} */}
                        </div>
                        <blockquote className="relative mt-5 flex-1 text-base leading-relaxed text-foreground sm:text-lg">
                          <p
                            id={`review-quote-${reviewKey}`}
                            ref={(element) => { quoteRefs.current[reviewKey] = element; }}
                            className={expanded ? "" : "line-clamp-3"}
                          >
                            {isPreview ? review.quote : <>&ldquo;{review.quote}&rdquo;</>}
                          </p>
                          {hasMore && (
                            <button
                              type="button"
                              aria-expanded={expanded}
                              aria-controls={`review-quote-${reviewKey}`}
                              onClick={() => setExpandedReviews((current) => ({ ...current, [reviewKey]: !current[reviewKey] }))}
                              className="mt-2 text-sm font-bold text-primary-accessible underline decoration-primary/50 underline-offset-4 hover:decoration-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                            >
                              {expanded ? "Read less" : "Read more"}
                            </button>
                          )}
                        </blockquote>
                        <figcaption className="relative mt-7 flex items-center gap-3 border-t border-white/10 pt-5">
                          <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary/25 bg-primary/10 text-xs font-bold text-primary-accessible">
                            {review.name
                              .split(/\s+/)
                              .map((part) => part[0])
                              .join("")
                              .slice(0, 2)
                              .toUpperCase()}
                          </span>
                          <span className="min-w-0">
                            <span className="block truncate text-sm font-bold text-foreground">{review.name}</span>
                            {(review.role || review.company) && (
                              <span className="mt-0.5 block truncate text-xs text-muted-accessible">
                                {[review.role, review.company].filter(Boolean).join(" · ")}
                              </span>
                            )}
                          </span>
                        </figcaption>
                      </figure>
                    );
                  })}
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
