import type { Metadata } from "next";
import dynamic from "next/dynamic";
import ServiceDetail from "@/components/sections/ServiceDetail";
import { ShowcaseFallback } from "@/components/sections/ShowcaseCard";

const ServicePreview = dynamic(() => import("@/components/sections/ServicePreview"), {
  loading: () => <ShowcaseFallback cards={3} height={510} />,
});

export const metadata: Metadata = {
  title: "Content & Copywriting",
  description:
    "Website copy, editorial planning, email, and campaign writing developed from your audience, source material, and brand voice.",
};

export default function ContentPage() {
  return (
    <ServiceDetail slug="content">
      <ServicePreview slug="content" />
    </ServiceDetail>
  );
}
