import PageHeader from "@/components/sections/PageHeader";
import AboutPillars from "@/components/sections/AboutPillars";
import Story from "@/components/sections/Story";
import CallToAction from "@/components/sections/CallToAction";
import { createPageMetadata } from "@/config/seo";

export const metadata = createPageMetadata({
  title: "About Us",
  description:
    "Learn how FonderDigital connects strategy, design, engineering, and digital growth around practical business goals.",
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
      <CallToAction />
    </>
  );
}
