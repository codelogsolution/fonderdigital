import type { Metadata } from "next";
import PageHeader from "@/components/sections/PageHeader";
import { createPageMetadata } from "@/config/seo";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = createPageMetadata({
  title: "Privacy Policy",
  description:
    "How Fonder Digital collects, uses, and protects the information you share through this website.",
  path: "/privacy",
});

const sections = [
  {
    title: "What we collect",
    body: "The contact and newsletter forms validate information in your browser and open your email application with a prefilled message. They do not send form data directly to this website. Information is shared with us only if you choose to send that email. If you book a meeting, Google Calendar processes the information you provide on its appointment booking page. This site also stores your selected visual theme in your browser's local storage.",
  },
  {
    title: "How we use it",
    body: "If you email us, we use the information in your message to respond to your inquiry and continue that conversation.",
  },
  {
    title: "Sharing",
    body: "Email is handled by your email provider and ours. Meeting bookings are handled by Google Calendar and added to our connected calendar; Google Meet video-conferencing details are included with the booking. Review Google's privacy information for details about its processing and storage. Do not include sensitive personal information in a project inquiry.",
    links: [
      {
        href: "https://policies.google.com/privacy",
        label: "Google privacy notice",
      },
    ],
  },
  {
    title: "Retention & your rights",
    body: `Email copies may remain in the mailboxes and backups operated by the email providers involved. Contact us at ${siteConfig.infoEmail} to ask about a message you sent.`,
  },
  {
    title: "Questions",
    body: `For a privacy question or request, contact us at ${siteConfig.infoEmail}.`,
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        description="How we collect, use, and protect the information you share with us."
      />
      <section className="pb-24">
        <div className="mx-auto max-w-3xl space-y-8 px-4 sm:px-6">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-lg font-bold tracking-tight text-foreground">
                {section.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {section.body}
              </p>
              {section.links && (
                <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-primary underline underline-offset-4"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
