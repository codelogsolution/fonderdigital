"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";
type SectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  labelledBy?: string;
  /** "aurora" paints soft colour fields, "grid" paints a technical grid. */
  backdrop?: "aurora" | "grid" | "none";
  /** Slight desaturation of the backdrop while the section is off-screen. */
  tone?: "light" | "muted";
  /** Opt into the dot lattice + film grain. Off by default so most sections
   *  carry one quiet wash instead of four stacked layers behind body copy. */
  rich?: boolean;
};

/**
 * The shared frame every section on the site sits inside: consistent vertical
 * rhythm and one container width.
 *
 * Note on the backdrop: it is deliberately a *single* soft wash. An earlier
 * version stacked a mesh, a dot lattice, a noise layer and a top vignette —
 * four treatments per section, which meant most pages had eight or nine
 * translucent layers stacked behind body copy and every section competed for
 * attention. Clean reading comes from fewer layers, not prettier ones, so the
 * noise and dot treatments now live only on the few sections that opt into
 * them via the `rich` prop.
 */
export default function Section({
  children,
  className = "",
  id,
  labelledBy,
  backdrop = "aurora",
  tone = "light",
  rich = false,
}: SectionProps) {
  const reduced = useReducedMotionSafe();

  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`relative isolate overflow-x-clip py-16 sm:py-20 lg:py-24 ${className}`}
    >
      {backdrop !== "none" && (
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div
            className={`absolute inset-0 transition-opacity duration-700 ${
              backdrop === "aurora" ? "bg-mesh" : "bg-grid"
            } ${tone === "muted" ? "opacity-60" : "opacity-100"}`}
          />
          {rich && (
            <>
              {/* Dot lattice gives the flat areas a sense of scale. */}
              <div
                className="absolute inset-0 bg-dots opacity-20"
                style={{
                  maskImage:
                    "radial-gradient(ellipse 70% 60% at 50% 45%, black 10%, transparent 100%)",
                }}
              />
              <div className="absolute inset-0 bg-noise opacity-[0.02] mix-blend-multiply" />
            </>
          )}
        </div>
      )}

      {/* Soft vignette pulls the eye to the centre of the composition. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-background/80 to-transparent"
      />

      <motion.div
        initial={reduced ? { opacity: 0 } : { opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        {children}
      </motion.div>
    </section>
  );
}