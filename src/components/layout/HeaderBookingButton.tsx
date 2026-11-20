"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, ArrowUpRight } from "lucide-react";
import { ScheduleMeetingModal } from "@/components/booking/ScheduleMeetingModal";

export default function HeaderBookingButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setIsModalOpen(true)}
        animate={isModalOpen ? { scale: 0.95, opacity: 0.7 } : { scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
        whileHover={!isModalOpen ? { scale: 1.02 } : {}}
        className="group relative inline-flex h-10 items-center gap-0 overflow-hidden rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none"
      >
        {/* Subtle bottom highlight */}
        <span
          aria-hidden="true"
          className="absolute bottom-0 left-3 right-3 h-px bg-white/20"
        />

        <CalendarDays
          className={`relative z-10 mr-1.5 h-3.5 w-3.5 shrink-0 transition-opacity duration-300 ${
            isModalOpen ? "opacity-60" : "opacity-80 group-hover:opacity-100"
          }`}
        />
        <span
          className={`relative z-10 flex items-baseline gap-0 whitespace-nowrap transition-colors duration-300 ${
            isModalOpen ? "text-primary-foreground/70" : ""
          }`}
        >
          <span className="font-bold">Quick Call</span>
        </span>

        {/* Living arrow — perpetual gentle pulse; freezes and fades when modal opens */}
        <motion.span
          className="relative z-10 ml-1.5 flex shrink-0"
          animate={
            isModalOpen
              ? { scale: 1, rotate: 0, opacity: 0 }
              : {
                  scale: [1, 1.12, 1],
                  rotate: [0, -8, 0],
                }
          }
          transition={
            isModalOpen
              ? { duration: 0.35, ease: "easeOut", opacity: { delay: 0.1 } }
              : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
          }
        >
          <ArrowUpRight className="h-3.5 w-3.5" />
          {/* Tiny sparkle dot */}
          <span
            aria-hidden="true"
            className={`absolute -right-0.5 -top-0.5 h-1 w-1 rounded-full bg-white transition-opacity duration-200 ${
              isModalOpen ? "opacity-0" : "opacity-0 group-hover:opacity-100"
            }`}
          />
        </motion.span>
      </motion.button>

      <ScheduleMeetingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        serviceName="Quick Call"
      />
    </>
  );
}
