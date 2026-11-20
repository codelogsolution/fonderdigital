"use client";

import { useState, useEffect, useMemo, Fragment } from "react";
import { createPortal } from "react-dom";
import { CalendarDays, Loader2, X, Clock, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScrollLock } from "@/lib/useScrollLock";

const DURATION_OPTIONS = [
  { value: "30", label: "30 min" },
  { value: "45", label: "45 min" },
  { value: "60", label: "1 hr" },
];

const TIME_SLOTS = [
  { value: "09:00", label: "9:00 AM" },
  { value: "10:00", label: "10:00 AM" },
  { value: "11:00", label: "11:00 AM" },
  { value: "12:00", label: "12:00 PM" },
  { value: "14:00", label: "2:00 PM" },
  { value: "15:00", label: "3:00 PM" },
  { value: "16:00", label: "4:00 PM" },
];

interface BookingState {
  date: string;
  time: string;
  duration: string;
  name: string;
  email: string;
  phone: string;
}

const initState: BookingState = {
  date: "",
  time: "",
  duration: "30",
  name: "",
  email: "",
  phone: "",
};

type ModalView = "book" | "confirmed";

interface ModalContentProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName: string;
}

function ModalContent({ isOpen, onClose, serviceName }: ModalContentProps) {
  const [view, setView] = useState<ModalView>("book");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingData, setBookingData] = useState<BookingState>(initState);
  const [calendarMonth, setCalendarMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [step, setStep] = useState(1);

  useScrollLock(isOpen);

  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  const formattedDate = useMemo(() => {
    if (!bookingData.date) return null;
    return new Date(bookingData.date + "T00:00:00").toLocaleDateString("en-IN", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }, [bookingData.date]);

  const selectedTimeObj = useMemo(() => {
    return TIME_SLOTS.find((s) => s.value === bookingData.time);
  }, [bookingData.time]);

  const selectedDurationLabel = useMemo(() => {
    return DURATION_OPTIONS.find((d) => d.value === bookingData.duration)?.label;
  }, [bookingData.duration]);

  const canProceedToStep2 = bookingData.date && bookingData.time;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!bookingData.name || !bookingData.email) return;

    setIsSubmitting(true);
    try {
      const dateStr = `${bookingData.date}T${bookingData.time}:00`;
      await fetch("/api/book-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: bookingData.name,
          email: bookingData.email,
          phone: bookingData.phone || null,
          service: serviceName,
          bookingDate: dateStr,
          duration: parseInt(bookingData.duration),
        }),
      });
      setView("confirmed");
    } catch (error) {
      console.error("Scheduling failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetAndClose = () => {
    setView("book");
    setStep(1);
    setBookingData(initState);
    onClose();
  };

  if (!isOpen) return null;

  const prevMonth = () => {
    setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() - 1, 1));
  };
  const nextMonth = () => {
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3);
    if (calendarMonth < maxDate) {
      setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 1));
    }
  };

  const year = calendarMonth.getFullYear();
  const month = calendarMonth.getMonth();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startingCol = firstDayOfWeek;

  const weekdays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyCells = Array.from({ length: (startingCol + 7) % 7 }, () => null);

  const monthName = calendarMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  return (
    <div
      className="fixed inset-0 z-9999 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="relative w-full max-w-xl bg-background shadow-2xl flex flex-col overflow-hidden"
        style={{ maxHeight: "85dvh", borderRadius: "1.5rem" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border-subtle shrink-0 bg-background">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary-accessible">
              FonderDigital
            </p>
            <h2 id="modal-title" className="text-base font-bold text-foreground mt-0.5">
              {serviceName}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border-subtle text-muted transition-colors hover:bg-surface hover:text-foreground"
            aria-label="Close modal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto overscroll-contain" style={{ flex: "1 1 auto", minHeight: 0 }}>
          {view === "confirmed" ? (
            <div className="flex flex-col items-center px-8 pt-10 pb-12 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 mb-5 animate-in zoom-in duration-300">
                <Check className="h-9 w-9 text-primary" />
              </div>
              <h3 className="text-xl font-extrabold text-foreground">Session Scheduled!</h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">
                We've received your request for <span className="font-semibold text-foreground">{serviceName}</span>.
                Our team will confirm your slot and send a Google Meet link within 24 hours.
              </p>

              {(formattedDate || selectedTimeObj || selectedDurationLabel) && (
                <div className="mt-6 w-full rounded-2xl border border-border-subtle bg-surface/60 p-4 text-left space-y-2">
                  {formattedDate && (
                    <div className="flex items-center gap-3">
                      <CalendarDays className="h-4 w-4 text-primary shrink-0" />
                      <span className="text-sm font-medium text-foreground">{formattedDate}</span>
                    </div>
                  )}
                  {selectedTimeObj && (
                    <div className="flex items-center gap-3">
                      <Clock className="h-4 w-4 text-primary shrink-0" />
                      <span className="text-sm font-medium text-foreground">{selectedTimeObj.label} (IST)</span>
                    </div>
                  )}
                  {selectedDurationLabel && (
                    <div className="flex items-center gap-3">
                      <Clock className="h-4 w-4 text-primary shrink-0" />
                      <span className="text-sm font-medium text-foreground">{selectedDurationLabel} session</span>
                    </div>
                  )}
                </div>
              )}

              <button
                onClick={resetAndClose}
                className="mt-8 w-full rounded-full bg-primary py-3 text-sm font-bold text-primary-foreground hover:brightness-110 active:scale-[0.98] transition-all"
              >
                Book another session
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col">
              {/* Progress Steps */}
              <div className="px-6 pt-5 pb-4">
                <div className="flex items-center gap-2">
                  {[1, 2].map((s) => (
                    <Fragment key={s}>
                      <div
                        className={cn(
                          "flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-all",
                          step === s
                            ? "bg-primary text-primary-foreground scale-110"
                            : step > s
                            ? "bg-primary/20 text-primary"
                            : "bg-surface text-muted",
                        )}
                      >
                        {step > s ? <Check className="h-3.5 w-3.5" /> : s}
                      </div>
                      {s === 1 && (
                        <div className={cn("h-0.5 flex-1 rounded-full transition-all", step > 1 ? "bg-primary" : "bg-surface")} />
                      )}
                    </Fragment>
                  ))}
                </div>
                <p className="mt-3 text-sm font-semibold text-foreground">
                  {step === 1 ? "Pick a time that works for you" : "A few details to finalize"}
                </p>
              </div>

              {/* STEP 1 — Calendar + Times */}
              {step === 1 && (
                <div className="px-6 space-y-5">
                  {/* Mini Calendar */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <button type="button" onClick={prevMonth} className="h-8 w-8 flex items-center justify-center rounded-full border border-border-subtle text-muted hover:border-primary/40 hover:text-foreground transition-colors">
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
                      </button>
                      <span className="text-sm font-bold text-foreground">{monthName}</span>
                      <button type="button" onClick={nextMonth} className="h-8 w-8 flex items-center justify-center rounded-full border border-border-subtle text-muted hover:border-primary/40 hover:text-foreground transition-colors disabled:opacity-30">
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
                      </button>
                    </div>
                    <div className="rounded-2xl border border-border-subtle bg-surface/40 p-3">
                      <div className="grid grid-cols-7 gap-1 mb-2">
                        {weekdays.map((d) => (
                          <div key={d} className="text-center text-[11px] font-bold text-muted uppercase tracking-wide py-1">{d}</div>
                        ))}
                      </div>
                      <div className="grid grid-cols-7 gap-1">
                        {emptyCells.map((_, i) => (
                          <div key={`e-${i}`} />
                        ))}
                        {daysArray.map((day) => {
                          const date = new Date(year, month, day);
                          const isPast = date < today;
                          const isToday = date.getTime() === today.getTime();
                          const isSelected = bookingData.date === `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                          return (
                            <button
                              key={day}
                              type="button"
                              disabled={isPast}
                              onClick={() => setBookingData({ ...bookingData, date: `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`, time: "" })}
                              className={cn(
                                "h-9 w-full flex items-center justify-center rounded-xl text-sm font-medium transition-all",
                                isSelected
                                  ? "bg-primary text-primary-foreground font-bold shadow-md"
                                  : isToday
                                  ? "border border-primary/40 text-primary font-bold"
                                  : isPast
                                  ? "text-muted/30 cursor-not-allowed"
                                  : "text-foreground hover:bg-primary/10 hover:text-primary",
                              )}
                            >
                              {day}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Time Slots */}
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted mb-3 flex items-center gap-2">
                      <Clock className="h-3.5 w-3.5 text-primary" /> Available times (IST)
                      {!bookingData.date && <span className="text-primary font-normal normalcase tracking-normal">(select a date first)</span>}
                    </p>
                    <div className={cn("grid gap-2", bookingData.date ? "grid-cols-3" : "grid-cols-3 opacity-40 pointer-events-none")}>
                      {TIME_SLOTS.map((slot) => {
                        const isSelected = bookingData.time === slot.value;
                        return (
                          <button
                            key={slot.value}
                            type="button"
                            onClick={() => setBookingData({ ...bookingData, time: slot.value })}
                            className={cn(
                              "py-2.5 rounded-xl text-sm font-semibold transition-all border",
                              isSelected
                                ? "bg-primary border-primary text-primary-foreground shadow-md"
                                : "border-border-subtle text-foreground hover:border-primary/40 hover:bg-primary/5",
                            )}
                          >
                            {slot.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Duration */}
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted mb-3">Session duration</p>
                    <div className="grid grid-cols-3 gap-2">
                      {DURATION_OPTIONS.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setBookingData({ ...bookingData, duration: opt.value })}
                          className={cn(
                            "py-2.5 rounded-xl text-sm font-semibold transition-all border",
                            bookingData.duration === opt.value
                              ? "bg-primary border-primary text-primary-foreground shadow-md"
                              : "border-border-subtle text-foreground hover:border-primary/40 hover:bg-primary/5",
                          )}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Confirm button */}
                  <button
                    type="button"
                    disabled={!canProceedToStep2}
                    onClick={() => setStep(2)}
                    className="w-full h-12 rounded-full bg-primary text-sm font-bold text-primary-foreground transition-all hover:-translate-y-0.5 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  >
                    Continue to details
                  </button>
                </div>
              )}

              {/* STEP 2 — Name / Email / Phone */}
              {step === 2 && (
                <div className="px-6 space-y-4">
                  {/* Summary pill */}
                  {formattedDate && selectedTimeObj && (
                    <div className="flex items-center gap-3 rounded-2xl border border-primary-line bg-primary/5 px-4 py-3">
                      <CalendarDays className="h-5 w-5 text-primary shrink-0" />
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-primary">{formattedDate}</p>
                        <p className="text-sm font-semibold text-foreground truncate">
                          {selectedTimeObj.label} · {selectedDurationLabel}
                        </p>
                      </div>
                      <button type="button" onClick={() => setStep(1)} className="ml-auto text-xs font-semibold text-primary hover:underline shrink-0">
                        Change
                      </button>
                    </div>
                  )}

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-semibold text-foreground">Full name *</label>
                      <input
                        type="text"
                        required
                        placeholder="Your full name"
                        value={bookingData.name}
                        onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                        className="h-11 w-full rounded-xl border border-border-subtle bg-background/70 px-4 text-sm text-foreground placeholder:text-muted/40 focus:border-primary/60 focus:outline-none focus:ring-4 focus:ring-primary/10"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-semibold text-foreground">Email *</label>
                      <input
                        type="email"
                        required
                        placeholder="you@company.com"
                        value={bookingData.email}
                        onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                        className="h-11 w-full rounded-xl border border-border-subtle bg-background/70 px-4 text-sm text-foreground placeholder:text-muted/40 focus:border-primary/60 focus:outline-none focus:ring-4 focus:ring-primary/10"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-foreground">Phone number <span className="font-normal text-muted">(optional)</span></label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={bookingData.phone}
                      onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                      className="h-11 w-full rounded-xl border border-border-subtle bg-background/70 px-4 text-sm text-foreground placeholder:text-muted/40 focus:border-primary/60 focus:outline-none focus:ring-4 focus:ring-primary/10"
                    />
                  </div>

                  <div className="flex gap-3 pt-1">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex-1 h-12 rounded-full border border-border-subtle text-sm font-bold text-foreground hover:bg-surface transition-all"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting || !bookingData.name || !bookingData.email}
                      className="grow-[2] shrink-0 h-12 rounded-full bg-primary text-sm font-bold text-primary-foreground transition-all hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <><Loader2 className="h-4 w-4 animate-spin" /> Confirming…</>
                      ) : (
                        `Confirm ${selectedDurationLabel}`
                      )}
                    </button>
                  </div>

                  <p className="text-xs text-muted text-center leading-relaxed">
                    By confirming, you agree to receive a booking email. A Google Meet link will follow within 24 hours.
                  </p>
                </div>
              )}

              {/* Bottom padding for mobile */}
              <div className="h-4 sm:h-6" />
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export function ScheduleMeetingModal({
  isOpen,
  onClose,
  serviceName = "Strategic Consultation",
}: {
  isOpen: boolean;
  onClose: () => void;
  serviceName?: string;
}) {
  if (!isOpen) return null;
  return createPortal(<ModalContent isOpen={isOpen} onClose={onClose} serviceName={serviceName} />, document.body);
}
