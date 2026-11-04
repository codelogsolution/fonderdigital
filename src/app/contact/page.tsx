import { ArrowUpRight, Check, Mail, MessageCircle, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import PageHeader from "@/components/sections/PageHeader";
import ContactForm from "@/components/forms/ContactForm";
import Reveal from "@/components/motion/Reveal";
import { createPageMetadata } from "@/config/seo";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";

export const metadata = createPageMetadata({
  title: "Contact Us",
  description:
    "Contact FonderDigital to discuss an AI, website, mobile app, SEO, or digital marketing project. Email hello@fonderdigital.com or call +91 70426-20665.",
  path: "/contact",
});

const phoneDigits = siteConfig.phone.replace(/\D/g, "");
const whatsappHref = `https://wa.me/${phoneDigits}`;

export default function ContactPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }]} />
      <PageHeader
        eyebrow="Contact"
        title="Start a conversation"
        description="Share what you’re working on, where you want to go, and what support would help you get there."
      />

      <section className="pb-24 sm:pb-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-7 lg:grid-cols-12 lg:gap-10">
            <Reveal className="lg:col-span-7">
              <ContactForm />
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-5">
              <aside className="band-dark relative isolate overflow-hidden rounded-[1.75rem] border border-white/10 p-6 shadow-[0_28px_80px_-55px_var(--primary-glow-strong)] sm:p-8">
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
                  <div className="absolute -right-28 -top-28 h-72 w-72 rounded-full bg-primary/20 blur-[90px]" />
                  <div className="absolute inset-0 bg-dots opacity-[0.1] [mask-image:linear-gradient(to_bottom,black,transparent_80%)]" />
                </div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary-accessible">Direct contact</p>
                <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">Prefer a direct conversation?</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-accessible">Reach us by email, phone, or WhatsApp. Include your goal, audience, and timing so we can understand the brief.</p>

                <div className="mt-8 space-y-3">
                  <a href={`mailto:${siteConfig.email}`} className="group flex min-w-0 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.045] p-4 transition-colors hover:border-primary/40 hover:bg-white/[0.075]">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary-accessible"><Mail className="h-5 w-5" aria-hidden="true" /></span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[10px] font-bold uppercase tracking-[0.15em] text-muted-accessible">Email</span>
                      <span className="mt-1 block truncate text-sm font-semibold text-foreground">{siteConfig.email}</span>
                    </span>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-accessible transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                  </a>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary-accessible"><Phone className="h-5 w-5" aria-hidden="true" /></span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[10px] font-bold uppercase tracking-[0.15em] text-muted-accessible">Phone</span>
                        <a href={`tel:${siteConfig.phone}`} className="mt-1 block text-sm font-semibold text-foreground transition-colors hover:text-primary-accessible">{siteConfig.phoneDisplay}</a>
                      </span>
                    </div>
                    <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-4 py-2.5 text-sm font-bold text-white transition hover:brightness-95">
                      <MessageCircle className="h-4 w-4" aria-hidden="true" /> WhatsApp us <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  </div>
                </div>

                <div className="mt-7 border-t border-white/10 pt-5">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted-accessible">A useful first note</p>
                  <ul className="mt-3 space-y-2.5 text-sm text-foreground/90">
                    {["What you want to improve or build", "Who it is for", "Your preferred timing"].map((item) => (
                      <li key={item} className="flex items-start gap-2.5"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary-accessible" aria-hidden="true" />{item}</li>
                    ))}
                  </ul>
                </div>
              </aside>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
