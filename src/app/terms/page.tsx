import type { Metadata } from "next";
import PageHeader from "@/components/sections/PageHeader";
import { createPageMetadata } from "@/config/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Terms of Service",
  description: "The terms that apply to FonderDigital's services and the use of this website.",
  path: "/terms",
});

const sections = [
  {
    title: "Scope",
    body: "These terms cover the use of this website and the basis on which we provide marketing and development services. Each engagement is governed by the proposal or agreement you sign with us, which takes precedence over this page.",
  },
  {
    title: "Quotes & payment",
    body: "The scope, price, schedule, payment terms, and process for handling changes should be set out in a written agreement for each engagement before work begins.",
  },
  {
    title: "Ownership",
    body: "Ownership, handover, and third-party licences should be agreed in writing for each project. Third-party tools, libraries, fonts, and services remain subject to their own licence terms.",
  },
  {
    title: "Results & content",
    body: "Interface previews and concepts shown on this site are illustrative design demonstrations. They are not represented as completed client projects, published products, or measured business outcomes. Any future case study or performance claim should be supported by the relevant project data and client permission.",
  },
  {
    title: "Liability & changes",
    body: "Project responsibilities, liability, cancellation, and dispute terms should be recorded in the written agreement for the engagement. This website page is general information and does not replace that agreement.",
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Terms of Service"
        description="The terms that apply to our services and the use of this website."
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
