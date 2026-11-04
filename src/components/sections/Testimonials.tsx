"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { testimonials, type Testimonial } from "@/config/site";
import Reveal from "@/components/motion/Reveal";
import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";

const previewReviews: Testimonial[] = [
  { name: "Jordan", quote: "Clear communication and a thoughtful process helped turn our early ideas into a polished experience for our customers.", rating: 4.5 },
  { name: "Akira", quote: "The team brought structure to a complex brief and made collaboration feel straightforward from the start. They kept us informed at each milestone, explained the thinking behind important choices, and gave us useful ways to share feedback. The final experience felt clear, considered, and aligned with what we wanted to achieve.", rating: 4 },
  { name: "Vicc", quote: "From the first concepts through final refinements, the work felt considered, responsive, and aligned with our goals.", rating: 5 },
  { name: "Thomson", quote: "They connected the design and development details into a cohesive product and kept decisions clear throughout. We always understood what was being worked on and why, and the review points made it easy to give timely feedback. The finished experience feels intuitive for our team and gives our customers a clearer way to engage.", rating: 4 },
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
  const reducedMotion = useReducedMotionSafe();
  const [paused, setPaused] = useState(false);
  const isPreview = testimonials.length === 0;
  const reviews = isPreview ? previewReviews : testimonials;
  const total = reviews.length;

  useEffect(() => {
    const updateVisibleCount = () => {
      const nextCount = getVisibleCount();
      setVisibleCount(nextCount);
      setFirstVisible((current) => Math.min(current, Math.max(0, total - 1)));
    };
    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount, { passive: true });
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, [total]);

  useEffect(() => {
    if (paused || reducedMotion || total <= visibleCount) return;
    const timer = window.setInterval(() => {
      setFirstVisible((current) => (current + visibleCount) % total);
    }, 4800);
    return () => window.clearInterval(timer);
  }, [paused, reducedMotion, total, visibleCount]);

  const move = (direction: -1 | 1) => {
    setFirstVisible((current) => (current + direction * visibleCount + total) % total);
  };
  const visibleReviews = Array.from({ length: Math.min(visibleCount, total) }, (_, index) => reviews[(firstVisible + index) % total]);
  const endVisible = (firstVisible + visibleReviews.length - 1) % total + 1;
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
                {isPreview ? "Illustrative review layout" : "Client perspectives"}
              </span>
              <h2
                id="testimonials-heading"
                className="mt-4 text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
              >
                Good work, told in their words.
              </h2>
              {isPreview && (
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-accessible">
                  These sample quotes and ratings are for layout preview only; they are not client endorsements.
                </p>
              )}
            </div>
            {canMove && (
              <div className="flex items-center gap-3">
                <span className="mr-1 font-mono text-xs text-muted-accessible" aria-live="polite">
                  {String(firstVisible + 1).padStart(2, "0")}–{String(endVisible).padStart(2, "0")} / {String(total).padStart(2, "0")}
                </span>
                <button
                  type="button"
                  onClick={() => move(-1)}
                  aria-label="Show previous client reviews"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border-subtle text-foreground transition-colors hover:border-primary/60 hover:text-primary-accessible"
                >
                  <ArrowLeft aria-hidden="true" className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => move(1)}
                  aria-label="Show more client reviews"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border-subtle text-foreground transition-colors hover:border-primary/60 hover:text-primary-accessible"
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
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPaused(false);
            }}
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
                {visibleReviews.map((review) => {
                  const reviewKey = `${review.name}-${review.company ?? "client"}`;
                  const expanded = Boolean(expandedReviews[reviewKey]);
                  const hasMore = isPreview && review.quote.length > 148;

                  return (
                    <figure
                      key={reviewKey}
                      className="relative flex h-[22rem] flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl sm:h-[23rem] sm:p-7"
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
                      </div>
                      <blockquote className="relative mt-5 flex h-36 shrink-0 flex-col text-[15px] leading-7 text-foreground sm:h-40 sm:text-base">
                        <p
                          id={`review-quote-${reviewKey}`}
                          onWheel={(event) => {
                            if (!expanded) return;
                            const element = event.currentTarget;
                            const canScrollUp = element.scrollTop > 0 && event.deltaY < 0;
                            const canScrollDown =
                              element.scrollTop + element.clientHeight < element.scrollHeight - 1 &&
                              event.deltaY > 0;
                            if (canScrollUp || canScrollDown) {
                              event.preventDefault();
                              event.stopPropagation();
                              element.scrollTop += event.deltaY;
                            }
                          }}
                          className={expanded ? "testimonial-quote-scrollbar min-h-0 flex-1 overflow-y-auto pr-1" : "line-clamp-3 pr-1"}
                        >
                          {isPreview && hasMore && !expanded
                            ? `${review.quote.slice(0, 112).trimEnd()}…`
                            : isPreview ? review.quote : <>&ldquo;{review.quote}&rdquo;</>}
                        </p>
                        {isPreview && hasMore && !expanded && (
                          <button
                            type="button"
                            aria-expanded={false}
                            aria-controls={`review-quote-${reviewKey}`}
                            onClick={() => setExpandedReviews((current) => ({ ...current, [reviewKey]: true }))}
                            className="mt-1 w-fit rounded-sm text-sm font-bold text-primary-accessible underline decoration-primary/50 underline-offset-4 transition-colors hover:decoration-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                          >
                            Read more <span aria-hidden="true">→</span>
                          </button>
                        )}
                      </blockquote>
                      <figcaption className="relative mt-auto flex shrink-0 items-center gap-3 border-t border-white/10 pt-5">
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
