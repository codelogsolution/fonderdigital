import dynamic from "next/dynamic";
import ServiceDetail from "@/components/sections/ServiceDetail";
import { ShowcaseFallback } from "@/components/sections/ShowcaseCard";
import { createPageMetadata } from "@/config/seo";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";

const ServicePreview = dynamic(() => import("@/components/sections/ServicePreview"), {
  loading: () => <ShowcaseFallback cards={3} height={510} />,
});

export const metadata = createPageMetadata({
  title: "Content & Copywriting",
  description:
    "Website copy, editorial planning, email, and campaign writing developed from your audience, source material, and brand voice.",
  path: "/services/content",
});

export default function ContentPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: "Content & Copywriting", path: "/services/content" }]} />
      <ServiceDetail slug="content">
        <ServicePreview slug="content" />
      </ServiceDetail>
    </>
  );
}
