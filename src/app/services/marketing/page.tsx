import type { Metadata } from "next";
import dynamic from "next/dynamic";
import ServiceDetail from "@/components/sections/ServiceDetail";
import { ShowcaseFallback } from "@/components/sections/ShowcaseCard";

const ServicePreview = dynamic(() => import("@/components/sections/ServicePreview"), {
  loading: () => <ShowcaseFallback cards={3} height={510} />,
});

export const metadata: Metadata = {
  title: "Digital Marketing",
  description:
    "Paid campaign planning, social content, and email marketing scoped around your audience, offer, and measurable goals.",
};

export default function MarketingPage() {
  return (
    <ServiceDetail slug="marketing">
      <ServicePreview slug="marketing" />
    </ServiceDetail>
  );
}
