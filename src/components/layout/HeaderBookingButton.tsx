"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, CalendarDays } from "lucide-react";
import { ScheduleMeetingModal } from "@/components/booking/ScheduleMeetingModal";

export default function HeaderBookingButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setIsModalOpen(true)}
        whileHover={{ scale: 1 }}
        whileTap={{ scale: 0.97 }}
        className="group relative inline-flex h-10 items-center gap-0 overflow-visible rounded-full border border-border-subtle px-5 text-sm font-semibold transition-colors duration-300 hover:border-primary/60 hover:bg-primary/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        {/* Decorative line — grows from left on hover */}
        <span
          aria-hidden="true"
          className="absolute left-3 top-1/2 h-px w-0 -translate-y-1/2 bg-primary transition-all duration-500 ease-out group-hover:w-[calc(100%-3.25rem)]"
        />

        <CalendarDays className="relative z-10 mr-1.5 h-3.5 w-3.5 text-foreground transition-colors duration-300 group-hover:text-primary shrink-0" />
        <span className="relative z-10 flex items-baseline gap-0 whitespace-nowrap">
          <span className="transition-colors duration-300 group-hover:text-primary">Start</span>
          <span className="font-bold text-foreground">Your Project</span>
        </span>
        <motion.span
          className="relative z-10 ml-1.5 flex shrink-0"
          animate={{ rotate: [0, 0], x: [0, 0] }}
          whileHover={{ rotate: -45, x: 2 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          <ArrowUpRight className="h-3.5 w-3.5 text-foreground transition-colors duration-300 group-hover:text-primary" />
        </motion.span>
      </motion.button>

      <ScheduleMeetingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        serviceName="Discovery Call"
      />
    </>
  );
}
