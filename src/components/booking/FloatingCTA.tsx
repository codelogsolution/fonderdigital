"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, ArrowUpRight } from "lucide-react";
import { ScheduleMeetingModal } from "@/components/booking/ScheduleMeetingModal";

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const maxScroll =
          document.documentElement.scrollHeight - window.innerHeight || 1;
        setVisible(window.scrollY / maxScroll > 0.25);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, x: 60, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 60, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-6 right-6 z-50 lg:bottom-8 lg:right-8"
          >
            <button
              onClick={() => setOpen(true)}
              className="group relative flex items-center gap-2.5 rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-[0_4px_24px_rgba(180,83,9,0.45),0_0_50px_rgba(180,83,9,0.2)] transition-all hover:-translate-y-1 hover:shadow-[0_8px_36px_rgba(180,83,9,0.6),0_0_70px_rgba(180,83,9,0.3)]"
            >
              {/* Shimmer sweep overlay */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 overflow-hidden rounded-full"
              >
                <span className="absolute top-0 -left-full h-full w-1/2 skew-x-[-20deg] bg-linear-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
              </span>
              {/* Pulsing glow ring behind button */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-full animate-ring-pulse-glow"
              />
              <CalendarDays className="h-4 w-4 shrink-0" />
              Book a Call
              <ArrowUpRight className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
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
