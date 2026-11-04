import dynamic from "next/dynamic";
import ServiceDetail from "@/components/sections/ServiceDetail";
import { ShowcaseFallback } from "@/components/sections/ShowcaseCard";
import { createPageMetadata } from "@/config/seo";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";

const ServicePreview = dynamic(() => import("@/components/sections/ServicePreview"), {
  loading: () => <ShowcaseFallback cards={3} height={510} />,
});

export const metadata = createPageMetadata({
  title: "Digital Marketing",
  description:
    "Paid campaign planning, social content, and email marketing scoped around your audience, offer, and measurable goals.",
  path: "/services/marketing",
});

export default function MarketingPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: "Digital Marketing", path: "/services/marketing" }]} />
      <ServiceDetail slug="marketing">
        <ServicePreview slug="marketing" />
      </ServiceDetail>
    </>
  );
}
