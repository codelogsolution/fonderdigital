"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, ArrowUpRight } from "lucide-react";
import { ScheduleMeetingModal } from "@/components/booking/ScheduleMeetingModal";

export default function HeaderBookingButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className="group relative inline-flex h-10 items-center gap-0 overflow-hidden rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:shadow-[0_8px_32px_rgba(180,83,9,0.35)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary active:scale-95"
      >
        {/* Subtle bottom highlight */}
        <span
          aria-hidden="true"
          className="absolute bottom-0 left-3 right-3 h-px bg-white/20"
        />

        <CalendarDays className="relative z-10 mr-1.5 h-3.5 w-3.5 shrink-0 opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
        <span className="relative z-10 flex items-baseline gap-0 whitespace-nowrap">
          <span className="font-bold">Quick Call</span>
        </span>

        {/* Living arrow — perpetual gentle pulse; freezes when modal opens */}
        <motion.span
          className="relative z-10 ml-1.5 flex shrink-0"
          animate={
            isModalOpen
              ? { scale: 1, rotate: 0, opacity: 1 }
              : {
                  scale: [1, 1.12, 1],
                  rotate: [0, -8, 0],
                }
          }
          transition={
            isModalOpen
              ? { duration: 0.3, ease: "easeOut" }
              : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
          }
        >
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:scale-110" />
          {/* Tiny sparkle dot */}
          <span
            aria-hidden="true"
            className="absolute -right-0.5 -top-0.5 h-1 w-1 rounded-full bg-white/80 transition-opacity duration-200 group-hover:opacity-100 opacity-0"
          />
        </motion.span>
      </button>

      <ScheduleMeetingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        serviceName="Quick Call"
      />
    </>
  );
}
