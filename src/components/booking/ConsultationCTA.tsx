"use client";

import { useState } from "react";
import { CalendarDays, Video, ArrowRight, Clock } from "lucide-react";
import { ScheduleMeetingModal } from "@/components/booking/ScheduleMeetingModal";
import { cn } from "@/lib/utils";

interface ConsultationCTAProps {
  serviceName?: string;
  className?: string;
}

export function ConsultationCTA({
  serviceName = "Strategic Consultation",
  className,
}: ConsultationCTAProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={cn(className)}>
      <div className="relative isolate overflow-hidden rounded-[1.75rem] border border-border-subtle bg-surface/80 p-6 shadow-[0_24px_70px_-48px_var(--primary-glow-strong)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/10 blur-[90px]"
        />

        <div className="relative">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-primary-accessible">
            <Video aria-hidden="true" className="h-3.5 w-3.5" />
            Quick Call
          </span>

          <h3 className="mt-4 text-2xl font-extrabold tracking-tight text-foreground">
            Get Expert Guidance in 30 Minutes
          </h3>

          <p className="mt-3 text-sm leading-relaxed text-muted-accessible">
            Book a free discovery call — share your idea and leave with a clear plan. No strings attached.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border-subtle bg-background/70 px-3 py-1.5 text-xs font-semibold text-muted-accessible">
              <CalendarDays
                aria-hidden="true"
                className="h-3.5 w-3.5 text-primary-accessible"
              />
              Pick your date
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border-subtle bg-background/70 px-3 py-1.5 text-xs font-semibold text-muted-accessible">
              <Clock
                aria-hidden="true"
                className="h-3.5 w-3.5 text-primary-accessible"
              />
              Choose duration
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border-subtle bg-background/70 px-3 py-1.5 text-xs font-semibold text-muted-accessible">
              <Video
                aria-hidden="true"
                className="h-3.5 w-3.5 text-primary-accessible"
              />
              Google Meet link
            </span>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_32px_var(--primary-glow)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/25"
          >
            Schedule Your Consultation
            <ArrowRight className="h-4 w-4" />
          </button>

          <p className="mt-4 text-center text-xs text-muted">
            No commitment • Free consultation • Within 24 hours
          </p>
        </div>

        <ScheduleMeetingModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          serviceName={serviceName}
        />
      </div>
    </div>
  );
}
