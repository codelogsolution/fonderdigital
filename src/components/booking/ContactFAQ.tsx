"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ChevronDown, Clock, DollarSign, Sparkles, type LucideIcon } from "lucide-react";

interface FAQItemData {
  q: string;
  a: string;
  icon: LucideIcon;
}

const faqs: FAQItemData[] = [
  {
    q: "Do I need to pay anything upfront?",
    a: "No. The discovery call is free and comes with zero obligation. We review your goals first, then share a clear proposal — only if you want to move forward.",
    icon: DollarSign,
  },
  {
    q: "What if I only have a rough idea?",
    a: "That's exactly where most of our clients start. We help shape vague ideas into scoped plans with timelines, budgets, and technical direction before any work begins.",
    icon: Sparkles,
  },
  {
    q: "How quickly can we get started?",
    a: "After your inquiry, we typically respond within 24 hours. Once scope is aligned, most projects kick off within 3–5 business days.",
    icon: Clock,
  },
  {
    q: "Do you work with startups or only enterprises?",
    a: "Both. We partner with founders, scale-ups, and established brands — whichever stage you're at, as long as the project has ambition and clarity.",
    icon: Check,
  },
];

export default function ContactFAQ() {
  return (
    <div className="mt-16">
      <p className="mb-6 text-center text-xs font-bold uppercase tracking-[0.2em] text-primary-accessible">
        Common questions before you reach out
      </p>
      <div className="mx-auto max-w-3xl space-y-3">
        {faqs.map((faq, i) => (
          <FAQAccordion key={i} {...faq} />
        ))}
      </div>
    </div>
  );
}

function FAQAccordion({ q, a, icon: Icon }: FAQItemData) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-2xl border border-border-subtle bg-surface/50 transition-colors hover:border-primary/20">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-3 px-5 py-4 text-left"
        aria-expanded={open}
      >
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Icon className="h-4 w-4" />
        </span>
        <span className="flex-1 text-sm font-semibold text-foreground">{q}</span>
        <ChevronDown
          className={`h-4 w-4 text-muted transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden"
        >
          <p className="px-5 pb-4 pl-20 text-sm leading-relaxed text-muted">
            {a}
          </p>
        </motion.div>
      )}
    </div>
  );
}
