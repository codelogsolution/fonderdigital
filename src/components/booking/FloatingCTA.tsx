"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, ArrowUpRight } from "lucide-react";
import { ScheduleMeetingModal } from "@/components/booking/ScheduleMeetingModal";

const STORAGE_KEY = "fonder-floating-cta-dismissed";

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [hintSeen, setHintSeen] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const hasShownRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const dismissed = sessionStorage.getItem(STORAGE_KEY);
    if (dismissed) return;
    setHintSeen(true);

    const t = setTimeout(() => {
      if (!hasShownRef.current) {
        hasShownRef.current = true;
        setShowHint(true);
      }
    }, 4000);

    const onScroll = () => {
      clearTimeout(t);
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight || 1;
      setVisible(window.scrollY / maxScroll > 0.25);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(t);
    };
  }, []);

  const handleDismissHint = () => {
    sessionStorage.setItem(STORAGE_KEY, "1");
    setShowHint(false);
  };

  const handleOpen = () => {
    sessionStorage.setItem(STORAGE_KEY, "1");
    setShowHint(false);
    setOpen(true);
  };

  return (
    <>
      <AnimatePresence>
        {/* Gentle hint pill — slides up after 4s on first visit */}
        {hintSeen && !visible && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={showHint ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 8, scale: 0.95 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="pointer-events-none fixed bottom-24 left-6 z-40 flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-background border border-border-subtle shadow-[0_4px_20px_rgba(0,0,0,0.1),0_1px_3px_rgba(0,0,0,0.06)] sm:left-8 lg:hidden"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span className="text-xs font-semibold text-muted-accessible whitespace-nowrap">
              Free 30-min call — tap to book
            </span>
            <button
              onClick={handleDismissHint}
              className="ml-1 rounded-full p-0.5 text-muted hover:text-foreground transition-colors pointer-events-auto"
              aria-label="Dismiss"
            >
              <ArrowUpRight className="h-3 w-3 -rotate-45" />
            </button>
          </motion.div>
        )}

        {/* Main floating button — appears after 25% scroll */}
        {visible && (
          <motion.div
            initial={{ opacity: 0, x: -40, scale: 0.85 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -40, scale: 0.85 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="fixed bottom-6 left-6 z-40 lg:bottom-8 lg:left-8"
          >
            <button
              onClick={handleOpen}
              className="group relative flex items-center gap-2.5 rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-[0_4px_24px_rgba(180,83,9,0.4),0_0_56px_rgba(180,83,9,0.18)] transition-all hover:-translate-y-1 hover:shadow-[0_8px_36px_rgba(180,83,9,0.55),0_0_80px_rgba(180,83,9,0.28)]"
            >
              {/* Shimmer sweep */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 overflow-hidden rounded-full"
              >
                <span className="absolute top-0 -left-full h-full w-1/2 skew-x-[-20deg] bg-linear-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
              </span>
              {/* Subtle live-ring pulse */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -inset-1 rounded-full border-2 border-primary opacity-0 group-hover:opacity-30 transition-opacity duration-500"
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
