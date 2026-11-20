"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, CalendarDays } from "lucide-react";
import { ScheduleMeetingModal } from "@/components/booking/ScheduleMeetingModal";

export default function HeaderBookingButton({ size = "sm" }: { size?: "sm" | "md" }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setIsModalOpen(true)}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="group relative inline-flex h-9 items-center gap-2 overflow-hidden rounded-full bg-primary px-5 text-sm font-bold text-primary-foreground shadow-[0_0_24px_var(--primary-line)] transition-shadow hover:shadow-[0_0_32px_var(--primary-glow)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:h-10 sm:text-base"
      >
        {/* Shimmer sweep overlay */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-full"
        >
          <span className="absolute top-0 -left-full h-full w-1/2 skew-x-[-20deg] bg-linear-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
        </span>

        {/* Breathing glow ring — continuous subtle pulse */}
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute -inset-[3px] rounded-full border-2 border-primary/80"
          animate={{ opacity: [0.3, 0.8, 0.3], scale: [1, 1.1, 1] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        />

        <CalendarDays className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
        Book a Discovery Call
        <ArrowUpRight className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 sm:h-4 sm:w-4" />
      </motion.button>

      <ScheduleMeetingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        serviceName="Discovery Call"
      />
    </>
  );
}
