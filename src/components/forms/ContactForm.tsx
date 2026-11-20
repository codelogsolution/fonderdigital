"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertCircle,
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronDown,
  Send,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

const inputBaseClasses =
  "h-12 w-full rounded-2xl bg-background/70 px-4 text-sm text-foreground placeholder:text-muted/60 transition-all duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/10";

const inputIdleClasses =
  "border border-border-subtle focus:border-primary/60 focus:shadow-[0_0_20px_var(--primary-line)]";

const inputErrorClasses =
  "border-2 border-rose-500 focus:border-rose-500 focus:shadow-[0_0_20px_rgba(225,29,72,0.18)]";

const labelClasses =
  "mb-2 block text-sm font-semibold tracking-tight text-foreground";

const errorTextClasses =
  "mt-1.5 flex items-start gap-1.5 text-xs font-medium text-rose-700";

const serviceOptions = [
  { value: "ai-development", label: "AI Development" },
  { value: "web-dev", label: "Website Development" },
  { value: "app-dev", label: "Mobile App Development" },
  { value: "seo", label: "SEO" },
  { value: "marketing", label: "Digital Marketing" },
  { value: "content", label: "Content Writing" },
  { value: "branding", label: "Branding & UI/UX Design" },
  { value: "other", label: "Other" },
];

const ease: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];

type FormField = "name" | "email" | "phone" | "service" | "website" | "message";

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  website: string;
  message: string;
}

interface FieldErrors {
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  website?: string;
  message?: string;
}

const validateField = (field: FormField, value: string): string | undefined => {
  switch (field) {
    case "name":
      if (value.trim().length < 2) return "Please enter your full name";
      return undefined;
    case "email":
      if (!value.trim()) return "Email address is required";
      if (!/^[\w.+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(value.trim()))
        return "Enter a valid email address";
      return undefined;
    case "service":
      if (!value) return "Please select a service";
      return undefined;
    case "website":
      if (!value.trim()) return undefined;
      if (!/^https?:\/\/.+/.test(value.trim()))
        return "Include https:// in the URL";
      return undefined;
    case "message":
      if (value.trim().length < 10)
        return "Tell us more — at least 10 characters";
      return undefined;
    default:
      return undefined;
  }
};

export default function ContactForm({ className }: { className?: string }) {
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    service: "",
    website: "",
    message: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Record<FormField, boolean>>({
    name: false,
    email: false,
    phone: false,
    service: false,
    website: false,
    message: false,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    const field = name as FormField;
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleBlur = (
    e: React.FocusEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    const field = name as FormField;
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }));
  };

  const openEmailClient = () => {
    const serviceLabel = serviceOptions.find(
      (option) => option.value === formData.service,
    )?.label;
    const body = [
      `Name: ${formData.name.trim()}`,
      `Email: ${formData.email.trim()}`,
      `Phone: ${formData.phone.trim() || "Not provided"}`,
      `Service: ${serviceLabel ?? formData.service}`,
      `Website: ${formData.website.trim() || "Not provided"}`,
      "",
      "Message:",
      formData.message.trim(),
    ].join("\n");
    window.location.href = `mailto:${siteConfig.infoEmail}?subject=${encodeURIComponent(
      `Project inquiry from ${formData.name.trim()}`,
    )}&body=${encodeURIComponent(body)}`;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const fields: FormField[] = [
      "name",
      "email",
      "phone",
      "service",
      "website",
      "message",
    ];
    const newErrors: FieldErrors = {};
    fields.forEach((field) => {
      const err = validateField(field, formData[field]);
      if (err) newErrors[field] = err;
    });
    setTouched({
      name: true,
      email: true,
      phone: true,
      service: true,
      website: true,
      message: true,
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setStatus("submitting");
    try {
      const serviceLabel = serviceOptions.find(
        (option) => option.value === formData.service,
      )?.label;

      const response = await fetch("/api/contact-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim() || "Not provided",
          service: serviceLabel ?? formData.service,
          website: formData.website.trim() || "Not provided",
          message: formData.message.trim(),
        }),
      });

      if (!response.ok) throw new Error("Failed to submit");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const handleRetry = () => {
    setStatus("idle");
  };

  const fieldClassName = (field: FormField, extra = "") =>
    cn(
      inputBaseClasses,
      errors[field] && touched[field] ? inputErrorClasses : inputIdleClasses,
      extra,
    );

  const errorId = (field: FormField) => `${field}-error`;

  const renderError = (field: FormField): ReactNode =>
    errors[field] && touched[field] ? (
      <motion.p
        id={errorId(field)}
        key={`${field}-error`}
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        className={errorTextClasses}
      >
        <AlertCircle className="h-3.5 w-3.5 shrink-0" />
        <span>{errors[field]}</span>
      </motion.p>
    ) : null;

  return (
    <div className={cn("relative", className)}>
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -12 }}
            transition={{ duration: 0.45, ease }}
            role="status"
            className="flex min-h-130 flex-col items-center justify-center rounded-3xl border border-primary/30 bg-primary/5 px-8 py-20 text-center"
          >
            <motion.span
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                delay: 0.2,
                type: "spring",
                stiffness: 220,
                damping: 14,
              }}
              className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/15 text-primary shadow-[0_0_32px_var(--primary-line)]"
            >
              <Check className="h-8 w-8" />
            </motion.span>
            <h2 className="mt-8 text-2xl font-extrabold tracking-tight">
              Inquiry Submitted Successfully
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
              Thank you! We've received your project details and will get back
              to you within 24 hours.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={openEmailClient}
                className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-background/70 px-5 py-2.5 text-sm font-semibold text-muted-accessible transition-colors hover:text-primary-accessible hover:border-primary/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <Send className="h-4 w-4" />
                Also share via email
              </button>
              <button
                onClick={() => setStatus("idle")}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition-colors hover:-translate-y-0.5 hover:shadow-[0_0_32px_var(--primary-glow)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Submit another inquiry
              </button>
            </div>
          </motion.div>
        ) : status === "error" ? (
          <motion.div
            key="error"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -12 }}
            transition={{ duration: 0.45, ease }}
            role="alert"
            className="flex min-h-130 flex-col items-center justify-center rounded-3xl border border-rose-500/30 bg-rose-500/5 px-8 py-20 text-center"
          >
            <motion.span
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                delay: 0.2,
                type: "spring",
                stiffness: 220,
                damping: 14,
              }}
              className="flex h-16 w-16 items-center justify-center rounded-full bg-rose-500/15 text-rose-500 shadow-[0_0_32px_rgba(225,29,72,0.3)]"
            >
              <AlertCircle className="h-8 w-8" />
            </motion.span>
            <h2 className="mt-8 text-2xl font-extrabold tracking-tight">
              Something went wrong
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
              We couldn't submit your inquiry. Please try again or contact us
              directly at
              <a
                href={`mailto:${siteConfig.infoEmail}`}
                className="font-semibold text-primary underline underline-offset-4"
              >
                {siteConfig.infoEmail}
              </a>
              .
            </p>
            <button
              onClick={handleRetry}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition-colors hover:-translate-y-0.5 hover:shadow-[0_0_32px_var(--primary-glow)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Try again
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-5 rounded-4xl border border-border-subtle bg-surface p-5 sm:p-8 shadow-[0_2px_8px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.08)]"
          >
            <div className="border-b border-border-subtle pb-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                Project inquiry
              </p>
              <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                Tell us what you're building.
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
                A few details will help us understand your goals and prepare a
                useful next step.
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-name" className={labelClasses}>
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Your full name"
                  className={fieldClassName("name")}
                  aria-invalid={!!(errors.name && touched.name)}
                  aria-describedby={
                    errors.name && touched.name ? errorId("name") : undefined
                  }
                />
                {renderError("name")}
              </div>
              <div>
                <label htmlFor="contact-email" className={labelClasses}>
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="name@company.com"
                  className={fieldClassName("email")}
                  aria-invalid={!!(errors.email && touched.email)}
                  aria-describedby={
                    errors.email && touched.email ? errorId("email") : undefined
                  }
                />
                {renderError("email")}
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-service" className={labelClasses}>
                  Which service are you interested in?
                </label>
                <div className="relative">
                  <select
                    id="contact-service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={fieldClassName(
                      "service",
                      `appearance-none cursor-pointer pr-12 ${formData.service ? "text-foreground" : "text-muted"}`,
                    )}
                    aria-invalid={!!(errors.service && touched.service)}
                    aria-describedby={
                      errors.service && touched.service
                        ? errorId("service")
                        : undefined
                    }
                  >
                    <option value="" disabled>
                      Choose a service
                    </option>
                    {serviceOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
                    aria-hidden="true"
                  />
                </div>
                {renderError("service")}
              </div>
              <div>
                <label htmlFor="contact-phone" className={labelClasses}>
                  Phone number{" "}
                  <span className="font-normal text-muted">(optional)</span>
                </label>
                <input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your phone number"
                  className={fieldClassName("phone")}
                  aria-invalid={!!(errors.phone && touched.phone)}
                  aria-describedby={
                    errors.phone && touched.phone ? errorId("phone") : undefined
                  }
                />
                {renderError("phone")}
              </div>
            </div>

            <div>
              <label htmlFor="contact-website" className={labelClasses}>
                Your current website URL{" "}
                <span className="font-normal text-muted">(optional)</span>
              </label>
              <input
                id="contact-website"
                name="website"
                type="url"
                autoComplete="url"
                value={formData.website}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="https://www.example.com"
                className={fieldClassName("website")}
                aria-invalid={!!(errors.website && touched.website)}
                aria-describedby={
                  errors.website && touched.website
                    ? errorId("website")
                    : undefined
                }
              />
              {renderError("website")}
            </div>

            <div>
              <label htmlFor="contact-message" className={labelClasses}>
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                onBlur={handleBlur}
                rows={5}
                placeholder="Share your goals, timeline, and what you would like to build or improve."
                className={cn(
                  inputBaseClasses,
                  "h-auto min-h-36 rounded-2xl py-3 resize-y",
                  errors.message && touched.message
                    ? inputErrorClasses
                    : inputIdleClasses,
                )}
                aria-invalid={!!(errors.message && touched.message)}
                aria-describedby={
                  errors.message && touched.message
                    ? errorId("message")
                    : undefined
                }
              />
              {renderError("message")}
            </div>

            {/* What Happens Next */}
            <div className="rounded-2xl border border-border-subtle bg-surface/50 p-5">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-primary-accessible">
                What happens after you hit send
              </p>
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  {
                    step: "01",
                    title: "We review your brief",
                    desc: "Our team reads every inquiry carefully — no auto-replies.",
                    icon: Check,
                  },
                  {
                    step: "02",
                    title: "Quick call booked",
                    desc: "Within 24 hours, we schedule a free 30-min discovery call.",
                    icon: CalendarDays,
                  },
                  {
                    step: "03",
                    title: "Roadmap shared",
                    desc: "You get a clear scope, timeline, and next steps — zero pressure.",
                    icon: ArrowUpRight,
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 rounded-xl border border-border-subtle bg-background/50 p-4">
                    <span className="text-2xl font-black text-primary/25 leading-none">{item.step}</span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <item.icon className="h-3.5 w-3.5 text-primary shrink-0" />
                        <p className="text-sm font-bold text-foreground">{item.title}</p>
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-muted">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="mt-1 inline-flex h-12 w-full appearance-none items-center justify-center gap-2 rounded-2xl bg-primary px-7 text-sm font-bold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_32px_var(--primary-glow)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/25 disabled:opacity-50 disabled:cursor-not-allowed sm:w-fit sm:min-w-52"
            >
              {status === "submitting" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Submit inquiry
                  <ArrowUpRight className="h-4 w-4" />
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
