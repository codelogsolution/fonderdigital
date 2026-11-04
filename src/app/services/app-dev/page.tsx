import dynamic from "next/dynamic";
import ServiceDetail from "@/components/sections/ServiceDetail";
import { ShowcaseFallback } from "@/components/sections/ShowcaseCard";
import { createPageMetadata } from "@/config/seo";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";

const AppShowcase = dynamic(() => import("@/components/sections/AppShowcase"), {
  loading: () => <ShowcaseFallback cards={3} height={520} />,
});

export const metadata = createPageMetadata({
  title: "App Development",
  description:
    "End-to-end iOS and Android app development with React Native, Flutter, or native Kotlin and Swift, including QA and release workflows.",
  path: "/services/app-dev",
});

export default function AppDevPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: "App Development", path: "/services/app-dev" }]} />
      <ServiceDetail slug="app-dev">
        <AppShowcase />
      </ServiceDetail>
    </>
  );
}
