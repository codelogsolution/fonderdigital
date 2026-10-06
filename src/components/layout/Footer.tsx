import type { ComponentType } from "react";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { siteConfig, type SocialLink } from "@/config/site";
import { InstagramIcon, LinkedInIcon } from "@/components/ui/BrandIcons";
import NewsletterForm from "@/components/layout/NewsletterForm";
import BrandMark from "@/components/ui/BrandMark";

/* The footer is a dark band, so it re-tunes the semantic tokens via the
   `.band-dark` class rather than forcing light-mode values onto near-black.
   Those tokens now live in globals.css and are theme-aware, so the footer
   follows the active theme instead of hard-coding one copper.

   It used to pass an inline `--primary: #38bdf8`, which silently recoloured
   every `text-primary` / `bg-primary` in this subtree — most visibly the
   newsletter button. Keeping the override in CSS means a theme switch moves
   the footer and the page together. */
const socialIcons: Record<
  SocialLink["icon"],
  ComponentType<{ className?: string }>
> = {
  linkedin: LinkedInIcon,
  instagram: InstagramIcon,
};

export default function Footer() {
  return (
    <footer className="band-dark relative text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-12 lg:grid-cols-12 lg:gap-8">

          <div className="lg:col-span-4">
            <BrandMark className="mb-3 h-10 w-10 text-primary" />
            <p className="text-lg font-extrabold tracking-tight">
              {siteConfig.name}
              <span className="text-primary">.</span>
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              {siteConfig.description}
            </p>

            <div className="mt-8 grid max-w-xs grid-cols-2 gap-3">
              {siteConfig.socials.map((social) => {
                const Icon = socialIcons[social.icon];
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 rounded-xl border border-border-subtle bg-surface-2/60 px-4 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[0_8px_24px_var(--primary-soft)]"
                  >
                    <Icon className="h-5 w-5 shrink-0 text-muted transition-colors duration-300 group-hover:text-primary" />
                    <span className="text-sm font-semibold transition-colors duration-300 group-hover:text-primary">
                      {social.label}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-2">
            <p className="text-sm font-bold uppercase tracking-widest text-foreground">
              Services
            </p>
            <ul className="mt-5 space-y-3">
              {siteConfig.footerServices.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-primary"
                  >
                    <span
                      aria-hidden
                      className="h-px w-0 bg-primary transition-all duration-300 group-hover:w-3"
                    />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <p className="text-sm font-bold uppercase tracking-widest text-foreground">
              Company
            </p>
            <ul className="mt-5 space-y-3">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-primary"
                  >
                    <span
                      aria-hidden
                      className="h-px w-0 bg-primary transition-all duration-300 group-hover:w-3"
                    />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0 lg:col-span-4">
            <p className="text-sm font-bold uppercase tracking-widest text-foreground">
              Newsletter
            </p>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
              Monthly insights on design, engineering, and growth. No spam —
              unsubscribe anytime.
            </p>
            <NewsletterForm className="mt-6 max-w-sm" />

            <ul className="mt-8 space-y-3 text-sm text-muted">
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="transition-colors hover:text-primary"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                {siteConfig.phone}
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 shrink-0 text-primary" />
                {siteConfig.location}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border-subtle pt-8 sm:flex-row">
          {/* Copyright year is the current year, not the founding year. A
              notice that reads "© 2022" on a live site reads as abandoned.
              `siteConfig.established` stays for the "Est." line elsewhere. */}
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted">
            <Link href="/privacy" className="transition-colors hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-primary">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
