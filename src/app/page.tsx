import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";
import TrustMetrics from "@/components/sections/TrustMetrics";
import Pillars from "@/components/sections/Pillars";
import MarqueeStrip from "@/components/sections/MarqueeStrip";
import RecentWins from "@/components/sections/RecentWins";
import CallToAction from "@/components/sections/CallToAction";
import AIStudio from "@/components/sections/AIStudio";
import type { Metadata } from "next";

const homeTitle = "Fonder Digital | Web, App & AI Development";
const homeDescription =
  "FonderDigital plans and builds websites, mobile apps, and AI features, alongside SEO and digital marketing for businesses in the US and UK.";

export const metadata: Metadata = {
  title: homeTitle,
  description: homeDescription,
  alternates: { canonical: "/" },
  openGraph: {
    title: homeTitle,
    description: homeDescription,
    url: "/",
  },
  twitter: {
    title: homeTitle,
    description: homeDescription,
  },
};

const HomeShowcase = dynamic(() => import("@/components/sections/HomeShowcase"));
const StickyProcess = dynamic(() => import("@/components/sections/StickyProcess"));
const DeliveryShowcase = dynamic(
  () => import("@/components/sections/DeliveryShowcase"),
);

export default function Home() {
  return (
    <>
      <Hero />
      <AIStudio />
      <RecentWins />
      <TrustMetrics />
      <Pillars />
      <MarqueeStrip />
      <HomeShowcase />
      <StickyProcess />
      <DeliveryShowcase />
      <CallToAction />
    </>
  );
}
