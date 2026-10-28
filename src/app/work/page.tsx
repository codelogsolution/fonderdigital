import PageHeader from "@/components/sections/PageHeader";
import WorkPortfolio from "@/components/sections/WorkPortfolio";
import CallToAction from "@/components/sections/CallToAction";
import { createPageMetadata } from "@/config/seo";

export const metadata = createPageMetadata({
  title: "Selected Work & Studio Explorations",
  description:
    "Explore FonderDigital’s in-house website project, original interface concepts, and capabilities across AI engineering, web and app development, and digital growth.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <PageHeader
        eyebrow="Selected work · studio explorations"
        title="Useful digital work, made with intent."
        description="A look at our in-house digital experience, original product concepts, and the capabilities we bring to client projects. Work is labelled clearly, with outcomes shared only when verified and approved."
      />
      <WorkPortfolio />
      <CallToAction />
    </>
  );
}
