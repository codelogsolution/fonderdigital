import dynamic from "next/dynamic";
import ServiceDetail from "@/components/sections/ServiceDetail";
import { ShowcaseFallback } from "@/components/sections/ShowcaseCard";
import { createPageMetadata } from "@/config/seo";

const ServicePreview = dynamic(() => import("@/components/sections/ServicePreview"), {
  loading: () => <ShowcaseFallback cards={3} height={510} />,
});

export const metadata = createPageMetadata({
  title: "Branding & Design",
  description:
    "Brand discovery, positioning, messaging, visual identity, and usage guidance shaped around your business and audience.",
  path: "/services/branding",
});

export default function BrandingPage() {
  return (
    <ServiceDetail slug="branding">
      <ServicePreview slug="branding" />
    </ServiceDetail>
  );
}
