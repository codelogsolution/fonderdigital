import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";
import MarqueeStrip from "@/components/sections/MarqueeStrip";
import CallToAction from "@/components/sections/CallToAction";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

const homeTitle = "Fonder Digital | Web, App & AI Development";
const homeDescription = siteConfig.description;

export const metadata: Metadata = {
  title: homeTitle,
  description: homeDescription,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: homeTitle,
    description: homeDescription,
    url: siteConfig.url,
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — ${siteConfig.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: homeTitle,
    description: homeDescription,
    images: ["/opengraph-image"],
  },
};

const HomeShowcase = dynamic(() => import("@/components/sections/HomeShowcase"));
const StickyProcess = dynamic(() => import("@/components/sections/StickyProcess"));
const AIHomeStory = dynamic(() => import("@/components/sections/AIHomeStory"));
const TrustMetrics = dynamic(() => import("@/components/sections/TrustMetrics"));
const DeliveryShowcase = dynamic(() => import("@/components/sections/DeliveryShowcase"));
const Testimonials = dynamic(() => import("@/components/sections/Testimonials"));

export default function Home() {
  return (
    <>
      <Hero />
      <TrustMetrics />
      <AIHomeStory />
      <MarqueeStrip />
      <HomeShowcase />
      <StickyProcess />
      <DeliveryShowcase />
      <Testimonials />
      <CallToAction />
    </>
  );
}
