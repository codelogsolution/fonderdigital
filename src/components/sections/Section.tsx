"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
type SectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  labelledBy?: string;

  backdrop?: "aurora" | "grid" | "none";

  tone?: "light" | "muted";

  rich?: boolean;
};

export default function Section({
  children,
  className = "",
  id,
  labelledBy,
  backdrop = "aurora",
  tone = "light",
  rich = false,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`site-section relative isolate overflow-x-clip py-16 sm:py-20 lg:py-24 ${className}`}
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

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-background/80 to-transparent"
      />

      <motion.div
        initial={false}
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
