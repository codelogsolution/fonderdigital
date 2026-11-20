"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, ArrowUpRight, X } from "lucide-react";
import { ScheduleMeetingModal } from "@/components/booking/ScheduleMeetingModal";

const STORAGE_KEY = "fonder-float-dismissed";

export default function FloatingCTA() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const hasShownRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    setMounted(true);
    const t = setTimeout(() => {
      hasShownRef.current = true;
      setShowHint(true);
    }, 4000);
    return () => clearTimeout(t);
  }, []);

  const dismissHint = () => {
    sessionStorage.setItem(STORAGE_KEY, "1");
    setShowHint(false);
  };

  const handleClick = () => {
    sessionStorage.setItem(STORAGE_KEY, "1");
    setShowHint(false);
    setOpen(true);
  };

  return (
    <>
      <AnimatePresence>
        {/* Floating hint card — slides in ~4s after page load */}
        {mounted && !hasShownRef.current && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.92 }}
            animate={showHint ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 12, scale: 0.92 }}
            exit={{ opacity: 0, y: 12, scale: 0.92 }}
            transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="pointer-events-none fixed bottom-28 left-6 z-40 lg:left-8"
          >
            <div className="pointer-events-auto flex items-center gap-3 rounded-2xl border border-border-subtle bg-background px-4 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.1),0_2px_8px_rgba(0,0,0,0.06)]">
              {/* Animated accent bar */}
              <span className="absolute -left-1 top-1/2 h-6 w-1 -translate-y-1/2 rounded-full bg-primary" />

              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <CalendarDays className="h-4 w-4 text-primary" />
              </div>

              <div className="flex flex-col">
                <p className="text-xs font-bold text-foreground leading-none">Book a Discovery Call</p>
                <p className="mt-1 text-xs text-muted-accessible leading-none">Free · 30 min · No commitment</p>
              </div>

              <button
                onClick={dismissHint}
                className="ml-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface hover:text-foreground"
                aria-label="Dismiss"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Main floating button — animates in on mount, gentle bob continuously */}
        {mounted && (
          <motion.div
            initial={{ opacity: 0, x: -48, scale: 0.8, y: 0 }}
            animate={{ opacity: 1, x: 0, scale: 1, y: [0, -4, 0] }}
            exit={{ opacity: 0, x: -48, scale: 0.8, y: 0 }}
            transition={{
              opacity: { duration: 0.35 },
              x: { type: "spring", stiffness: 340, damping: 26 },
              scale: { type: "spring", stiffness: 340, damping: 26 },
              y: { duration: 2.6, repeat: Infinity, ease: "easeInOut" },
            }}
            className="fixed bottom-6 left-6 z-40 lg:bottom-8 lg:left-8"
          >
            <button
              onClick={handleClick}
              className="group relative flex items-center gap-2.5 rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-[0_4px_24px_rgba(180,83,9,0.4),0_0_56px_rgba(180,83,9,0.18)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_36px_rgba(180,83,9,0.55),0_0_80px_rgba(180,83,9,0.28)]"
            >
              {/* Shimmer sweep overlay */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 overflow-hidden rounded-full"
              >
                <span className="absolute top-0 -left-full h-full w-1/2 skew-x-[-20deg] bg-linear-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
              </span>

              {/* Breathing pulse ring — constant subtle animation */}
              <motion.span
                aria-hidden="true"
                className="pointer-events-none absolute -inset-2 rounded-full border-2 border-primary/50"
                animate={{
                  scale: [1, 1.18, 1],
                  opacity: [0.2, 0.55, 0.2],
                }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
              />

              <CalendarDays className="h-4 w-4 shrink-0" />
              Book a Discovery Call
              <ArrowUpRight className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <ScheduleMeetingModal
        isOpen={open}
        onClose={() => setOpen(false)}
        serviceName="Discovery Call"
      />
    </>
  );
}
