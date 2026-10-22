import dynamic from "next/dynamic";
import ServiceDetail from "@/components/sections/ServiceDetail";
import { ShowcaseFallback } from "@/components/sections/ShowcaseCard";
import { createPageMetadata } from "@/config/seo";

const WebShowcase = dynamic(() => import("@/components/sections/WebShowcase"), {
  loading: () => <ShowcaseFallback cards={2} height={520} />,
});

export const metadata = createPageMetadata({
  title: "Web Development",
  description:
    "React and Next.js development from requirements and architecture through reusable components, QA, CI/CD, and production release.",
  path: "/services/web-dev",
});

export default function WebDevPage() {
  return (
    <ServiceDetail slug="web-dev">
      <WebShowcase />
    </ServiceDetail>
  );
}
