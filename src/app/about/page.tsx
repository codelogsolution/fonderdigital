import PageHeader from "@/components/sections/PageHeader";
import AboutPillars from "@/components/sections/AboutPillars";
import Story from "@/components/sections/Story";
import CallToAction from "@/components/sections/CallToAction";
import { createPageMetadata } from "@/config/seo";
import { serviceAreas } from "@/config/site";

export const metadata = createPageMetadata({
  title: "About Us",
  description:
    "Learn how FonderDigital provides remote web and app development, SEO, digital marketing, branding, and UI/UX for businesses across the US and UK.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title="One connected approach to digital growth"
        description="FonderDigital brings strategy, design, engineering, and marketing together around the problem your business needs to solve."
      />
      <AboutPillars />
      <Story />
      <section aria-labelledby="service-areas-title" className="border-t border-border-subtle py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Where we work</p>
            <h2 id="service-areas-title" className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Remote digital services across the US and UK
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              FonderDigital works remotely with businesses in Dallas, Austin, and Atlanta in the United States, and London, Manchester, and Birmingham in the United Kingdom. Our services include website and app development, SEO, digital and social media marketing, branding, and UI/UX design.
            </p>
          </div>
          <ul className="mt-8 flex flex-wrap gap-3" aria-label="Cities we serve remotely">
            {serviceAreas.map(({ city, country }) => (
              <li key={city} className="rounded-full border border-border-subtle bg-surface px-4 py-2 text-sm font-semibold text-foreground/85">
                {city}, {country}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CallToAction />
    </>
  );
}
