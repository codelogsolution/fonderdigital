import dynamic from "next/dynamic";
import ServiceDetail from "@/components/sections/ServiceDetail";
import { ShowcaseFallback } from "@/components/sections/ShowcaseCard";
import { createPageMetadata } from "@/config/seo";

const ServicePreview = dynamic(() => import("@/components/sections/ServicePreview"), {
  loading: () => <ShowcaseFallback cards={3} height={510} />,
});

export const metadata = createPageMetadata({
  title: "SEO & Growth",
  description:
    "Technical SEO, useful content planning, local search support, and Search Console reporting tailored to your site and goals.",
  path: "/services/seo",
});

export default function SeoPage() {
  return (
    <ServiceDetail slug="seo">
      <ServicePreview slug="seo" />
    </ServiceDetail>
  );
}
