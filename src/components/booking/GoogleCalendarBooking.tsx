"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  CalendarDays,
  LoaderCircle,
  Video,
  X,
} from "lucide-react";

type CalendarStatus = "idle" | "loading" | "slow" | "ready";

type GoogleCalendarBookingProps = {
  bookingUrl: string;
};

export default function GoogleCalendarBooking({
  bookingUrl,
}: GoogleCalendarBookingProps) {
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [calendarStatus, setCalendarStatus] = useState<CalendarStatus>("idle");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  function openCalendar() {
    setCalendarOpen(true);
    setCalendarStatus("loading");
  }

  function closeCalendar() {
    setCalendarOpen(false);
  }

  function handleDialogClose() {
    setCalendarOpen(false);
    setCalendarStatus("idle");
    window.requestAnimationFrame(() => triggerRef.current?.focus());
  }

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (calendarOpen && !dialog.open) {
      dialog.showModal();
      closeButtonRef.current?.focus();
    } else if (!calendarOpen && dialog.open) {
      dialog.close();
    }
  }, [calendarOpen]);

  useEffect(() => {
    if (!calendarOpen || calendarStatus !== "loading") return;

    const timeoutId = window.setTimeout(() => setCalendarStatus("slow"), 10000);
    return () => window.clearTimeout(timeoutId);
  }, [calendarOpen, calendarStatus]);

  useEffect(() => {
    if (!calendarOpen) return;

    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${window.scrollY}px`;
    document.body.style.width = "100%";

    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
    };
  }, [calendarOpen]);

  useEffect(() => {
    if (!calendarOpen) return;

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setCalendarOpen(false);
      }
    }

    window.addEventListener("keydown", closeOnEscape, true);
    return () => window.removeEventListener("keydown", closeOnEscape, true);
  }, [calendarOpen]);

  return (
    <section
      id="book-a-call"
      aria-labelledby="book-a-call-heading"
      className="scroll-mt-24"
    >
      <div className="relative overflow-hidden rounded-[1.75rem] border border-border-subtle bg-surface/80 p-6 shadow-[0_24px_70px_-48px_var(--primary-glow-strong)] sm:p-8 lg:p-10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-32 h-72 w-72 rounded-full bg-primary/10 blur-[100px]"
        />
        <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-primary-accessible">
              <CalendarDays aria-hidden="true" className="h-3.5 w-3.5" />
              FonderDigital · Discovery call
            </span>
            <h2
              id="book-a-call-heading"
              className="mt-4 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl"
            >
              Book a Discovery Call
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-accessible sm:text-base">
              Choose a time that works for you. We&apos;ll meet on Google Meet
              to understand your goals and discuss a useful next step.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-background/70 px-3 py-1.5 text-xs font-semibold text-muted-accessible">
                <Video
                  aria-hidden="true"
                  className="h-3.5 w-3.5 text-primary-accessible"
                />
                Google Meet link included
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-background/70 px-3 py-1.5 text-xs font-semibold text-muted-accessible">
                <CalendarDays
                  aria-hidden="true"
                  className="h-3.5 w-3.5 text-primary-accessible"
                />
                Times shown in your time zone
              </span>
            </div>
          </div>

          <div className="flex flex-col items-start gap-3 lg:items-end">
            <button
              ref={triggerRef}
              type="button"
              aria-expanded={calendarOpen}
              aria-controls="google-calendar-booking-dialog"
              onClick={openCalendar}
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-[0_0_24px_var(--primary-line)] transition hover:-translate-y-0.5 hover:shadow-[0_0_32px_var(--primary-glow)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:w-auto"
            >
              Schedule a call
              <CalendarDays aria-hidden="true" className="h-4 w-4" />
            </button>
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-semibold text-muted-accessible transition-colors hover:text-primary-accessible focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Booking Calendar Page
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </a>
          </div>
        </div>

        <dialog
          ref={dialogRef}
          id="google-calendar-booking-dialog"
          aria-labelledby="google-calendar-dialog-heading"
          onClose={handleDialogClose}
          onCancel={(event) => {
            event.preventDefault();
            closeCalendar();
          }}
          onClick={(event) => {
            if (event.target === event.currentTarget) closeCalendar();
          }}
          className="m-auto open:flex h-[92dvh] max-h-[56rem] w-[calc(100vw-1rem)] max-w-6xl flex-col overflow-hidden rounded-2xl border border-border-subtle bg-background p-0 text-foreground shadow-[0_32px_100px_-32px_rgba(0,0,0,0.55)] backdrop:bg-black/60 backdrop:backdrop-blur-sm"
        >
          <div className="flex items-center gap-4 border-b border-border-subtle px-4 py-3 sm:px-6">
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-primary-accessible">
                FonderDigital
              </p>
              <h2
                id="google-calendar-dialog-heading"
                className="truncate text-base font-bold text-foreground sm:text-lg"
              >
                Book a Discovery Call
              </h2>
            </div>
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open booking page in a new tab"
              className="inline-flex min-h-10 shrink-0 items-center gap-1.5 rounded-full px-3 text-xs font-semibold text-muted-accessible transition-colors hover:text-primary-accessible focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:text-sm"
            >
              Discover by page
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </a>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={closeCalendar}
              aria-label="Close booking calendar"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border-subtle text-muted-accessible transition-colors hover:bg-surface hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <X aria-hidden="true" className="h-4 w-4" />
            </button>
          </div>

          <div className="relative min-h-0 flex-1 bg-background">
            {calendarOpen && (
              <>
                <iframe
                  src={bookingUrl}
                  title="Book a Discovery Call with FonderDigital"
                  referrerPolicy="strict-origin-when-cross-origin"
                  onLoad={() => setCalendarStatus("ready")}
                  className={`absolute inset-0 block h-full w-full border-0 transition-opacity duration-300 ${
                    calendarStatus === "ready" ? "opacity-100" : "opacity-0"
                  }`}
                />
                {calendarStatus !== "ready" && (
                  <div
                    role="status"
                    aria-live="polite"
                    aria-busy={calendarStatus === "loading"}
                    className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-surface/95 px-6 text-center"
                  >
                    {calendarStatus === "slow" ? (
                      <>
                        <p className="text-sm font-semibold text-foreground">
                          The booking calendar is taking longer than expected.
                        </p>
                        <a
                          href={bookingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm font-bold text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                        >
                          Open booking page in a new tab
                          <ArrowUpRight
                            aria-hidden="true"
                            className="h-4 w-4"
                          />
                        </a>
                      </>
                    ) : (
                      <>
                        <LoaderCircle
                          aria-hidden="true"
                          className="h-8 w-8 animate-spin text-primary motion-reduce:animate-none"
                        />
                        <p className="mt-4 text-sm font-semibold text-foreground">
                          Loading the booking calendar…
                        </p>
                        <p className="mt-1 text-xs text-muted-accessible">
                          This can take a moment on a slower connection.
                        </p>
                      </>
                    )}
                  </div>
                )}
              </>
            )}
          </div>

          <p className="border-t border-border-subtle px-4 py-2.5 text-center text-xs text-muted">
            Booking powered by Google Calendar.{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold underline underline-offset-2 hover:text-primary"
            >
              Privacy details
            </a>
          </p>
        </dialog>
      </div>
    </section>
  );
}
