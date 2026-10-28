import type { Metadata, Viewport } from "next";
import {
  Instrument_Sans,
  Outfit,
} from "next/font/google";
import { serviceAreas, siteConfig } from "@/config/site";
import ScrollProgress from "@/components/layout/ScrollProgress";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AssistantLauncher from "@/components/assistant/AssistantLauncher";
import SmoothScroll from "@/components/motion/SmoothScroll";
import CustomCursor from "@/components/motion/CustomCursor";
import ThemeProvider from "@/components/theme/ThemeProvider";
import "./globals.css";

const themeBootScript = `(function(){try{var t=localStorage.getItem('fd-theme');var ok=['copper','azure','noir'];document.documentElement.setAttribute('data-theme',ok.indexOf(t)>-1?t:'copper')}catch(e){document.documentElement.setAttribute('data-theme','copper')}})();`;

const display = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const sans = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  alternates: { canonical: "/" },
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    url: siteConfig.url,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: `${siteConfig.name} — ${siteConfig.tagline}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    alternateName: "Fonder Digital",
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/fonderdigital-logo.svg`,
    email: siteConfig.email,
    description: siteConfig.description,
    areaServed: serviceAreas.map(({ city, region, country }) => ({
      "@type": "City",
      name: city,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: region,
        containedInPlace: { "@type": "Country", name: country },
      },
    })),
  };
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    alternateName: "Fonder Digital",
    url: siteConfig.url,
    publisher: { "@id": `${siteConfig.url}/#organization` },
  };

  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <ThemeProvider>
          <SmoothScroll>
            <ScrollProgress />
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <AssistantLauncher />
            <CustomCursor />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
