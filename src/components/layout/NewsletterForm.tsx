"use client";

import { useState, type FormEvent } from "react";
import { Check, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

type NewsletterFormProps = { className?: string };

export default function NewsletterForm({ className }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()) return;
    const body = `Please add this email address to the FonderDigital newsletter: ${email.trim()}`;
    window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
      "Newsletter subscription request",
    )}&body=${encodeURIComponent(body)}`;
    setSubscribed(true);
  };

  if (subscribed) {
    return (
      <div
        className={cn(
          "flex items-center gap-3 rounded-2xl border border-primary/30 bg-primary/5 px-5 py-4",
          className,
        )}
        role="status"
      >
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
          <Check className="h-4 w-4" />
        </span>
        <p className="text-sm text-foreground">
          Your email app should open with a subscription request. Press Send
          there to request a subscription. If it doesn&apos;t open, email{" "}
          <a
            href={`mailto:${siteConfig.email}`}
            className="font-semibold text-primary underline underline-offset-4"
          >
            {siteConfig.email}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "flex items-center gap-2 rounded-2xl border border-border-subtle bg-surface-2/60 p-2 transition-colors duration-300 focus-within:border-primary/50",
        className,
      )}
    >
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="you@company.com"
        className="h-10 min-w-0 flex-1 bg-transparent px-3 text-sm text-foreground placeholder:text-muted/60 focus:outline-none"
      />
      <button
        type="submit"

        className="flex h-10 shrink-0 items-center gap-2 appearance-none rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:shadow-[0_0_24px_var(--primary-line)]"
      >
        Request updates <Send className="h-3.5 w-3.5" />
      </button>
    </form>
  );
}
