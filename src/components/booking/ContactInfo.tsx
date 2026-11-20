import { Mail, MessageCircle } from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

interface ContactInfoProps {
  className?: string;
}

export function ContactInfo({ className }: ContactInfoProps) {
  const whatsappDigits = siteConfig.whatsappNumber.replace(/\D/g, "");
  const whatsappHref = `https://wa.me/${whatsappDigits}`;

  const contacts = [
    {
      label: "General inquiries",
      value: siteConfig.infoEmail,
      href: `mailto:${siteConfig.infoEmail}`,
      icon: Mail,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      label: "Support",
      value: siteConfig.supportEmail,
      href: `mailto:${siteConfig.supportEmail}`,
      icon: Mail,
      color: "text-green-500",
      bg: "bg-green-500/10",
    },
    {
      label: "WhatsApp",
      value: "Chat with us",
      href: whatsappHref,
      icon: MessageCircle,
      color: "text-[#25D366]",
      bg: "bg-[#25D366]/10",
      external: true,
    },
  ];

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {contacts.map((contact) => (
        <a
          key={contact.label}
          href={contact.href}
          target={contact.external ? "_blank" : undefined}
          rel={contact.external ? "noopener noreferrer" : undefined}
          className="group flex items-center gap-4 rounded-2xl border border-border-subtle bg-surface/80 p-4 transition-all duration-300 hover:border-primary/30 hover:shadow-[0_16px_40px_-24px_var(--primary-glow)]"
        >
          <span className={cn("flex h-12 w-12 shrink-0 items-center justify-center rounded-xl", contact.bg, contact.color)}>
            <contact.icon className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[10px] font-bold uppercase tracking-[0.15em] text-muted-accessible">{contact.label}</span>
            <span className="mt-1 block truncate text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{contact.value}</span>
          </span>
        </a>
      ))}
    </div>
  );
}