import type { Metadata } from "next";
import PageHeader from "@/components/sections/PageHeader";
import { createPageMetadata } from "@/config/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Privacy Policy",
  description:
    "How FonderDigital collects, uses, and protects the information you share through this website.",
  path: "/privacy",
});

const sections = [
  {
    title: "What we collect",
    body: "The contact and newsletter forms validate information in your browser and open your email application with a prefilled message. They do not send form data directly to this website. Information is shared with us only if you choose to send that email. This site also stores your selected visual theme in your browser's local storage.",
  },
  {
    title: "How we use it",
    body: "If you email us, we use the information in your message to respond to your enquiry and continue that conversation.",
  },
  {
    title: "Sharing",
    body: "Email is handled by your email provider and ours. Review those providers' privacy information for details about their processing and storage. Do not include sensitive personal information in a project enquiry.",
  },
  {
    title: "Retention & your rights",
    body: "Email copies may remain in the mailboxes and backups operated by the email providers involved. Contact us at hello@fonderdigital.com to ask about a message you sent.",
  },
  {
    title: "Questions",
    body: "For a privacy question or request, contact us at hello@fonderdigital.com.",
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
              <p className="mt-2 text-sm leading-relaxed text-muted">{section.body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
