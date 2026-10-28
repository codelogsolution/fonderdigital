import ShowcaseCard from "@/components/sections/ShowcaseCard";
import { AureliaPage, OrbitPage } from "@/components/sections/WebShowcase";
import BrowserBar from "@/components/sections/BrowserBar";

const SITES = [
  { page: <AureliaPage />, eyebrow: "Storefront concept", title: "Retail UI concept", url: "storefront.demo" },
  { page: <OrbitPage />, eyebrow: "SaaS website concept", title: "Product site concept", url: "product-site.demo" },
];

export default function WebPage({
  index = 0,
  height = 300,
  frameHeight,
}: {
  index?: number;
  height?: number;
  frameHeight?: number;
}) {
  const slot = SITES[index % SITES.length];

  return (
    <ShowcaseCard
      eyebrow={slot.eyebrow}
      title={slot.title}
      height={height}
      frameHeight={frameHeight}
      duration={80}
      frameClassName="rounded-2xl border border-slate-200 bg-white"
      top={<BrowserBar url={slot.url} />}
    >
      {slot.page}
    </ShowcaseCard>
  );
}
