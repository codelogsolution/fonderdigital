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
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="group relative inline-flex h-10 items-center gap-2 overflow-hidden rounded-full bg-[#1a1612] px-5 text-sm font-semibold text-primary transition-all duration-300 shadow-[0_1px_3px_rgba(0,0,0,0.4),0_0_30px_rgba(180,83,9,0.08)] hover:shadow-[0_1px_3px_rgba(0,0,0,0.5),0_0_50px_rgba(180,83,9,0.2)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        {/* Ambient glow bloom */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -inset-1 rounded-full opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(circle at center, rgba(180,83,9,0.25) 0%, transparent 65%)",
          }}
        />

        {/* Shimmer line — only on hover, fast elegant sweep */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-full"
        >
          <span className="absolute top-0 left-[-100%] h-full w-1/2 skew-x-[-30deg] bg-linear-to-r from-transparent via-white/12 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[250%]" />
        </span>

        <CalendarDays className="relative z-10 h-3.5 w-3.5 text-primary shrink-0" />
        <span className="relative z-10 flex items-baseline gap-0.5">
          <span className="text-neutral-400 transition-colors duration-300 group-hover:text-neutral-300">Book</span>
          <span className="bg-linear-to-r from-primary to-amber-300 bg-clip-text text-transparent leading-none">A Discovery Call</span>
        </span>
        <ArrowUpRight className="relative z-10 h-3.5 w-3.5 text-primary transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
      </motion.button>

      <ScheduleMeetingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        serviceName="Discovery Call"
      />
    </>
  );
}
