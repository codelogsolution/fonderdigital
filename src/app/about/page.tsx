import PageHeader from "@/components/sections/PageHeader";
import AboutPillars from "@/components/sections/AboutPillars";
import Story from "@/components/sections/Story";
import CallToAction from "@/components/sections/CallToAction";

export const metadata = {
  title: "About Us",
  description:
    "Learn how FonderDigital connects strategy, design, engineering, and digital growth around practical business goals.",
};

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
