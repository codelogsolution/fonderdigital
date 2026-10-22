import type { Metadata, Viewport } from "next";
import {
  Instrument_Sans,
  JetBrains_Mono,
  Outfit,
} from "next/font/google";
import { siteConfig } from "@/config/site";
import ScrollProgress from "@/components/layout/ScrollProgress";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AssistantLauncher from "@/components/assistant/AssistantLauncher";
import SmoothScroll from "@/components/motion/SmoothScroll";
import CustomCursor from "@/components/motion/CustomCursor";
import ThemeProvider from "@/components/theme/ThemeProvider";
import "./globals.css";

/* Applies the stored theme before first paint.
   This has to run synchronously in <head>, ahead of any CSS paint —
   doing it from a React effect means the page renders once in the default
   palette and then snaps to the chosen one. Kept in sync with the theme list
   in ThemeProvider; unknown ids fall back to the default rather than
   leaving the attribute unset. */
const themeBootScript = `(function(){try{var t=localStorage.getItem('fd-theme');var ok=['copper','azure','noir'];document.documentElement.setAttribute('data-theme',ok.indexOf(t)>-1?t:'copper')}catch(e){document.documentElement.setAttribute('data-theme','copper')}})();`;

/**
 * Display face: geometric, confident and tightly spaced at large sizes — the
 * premium-studio read. Body copy stays on Instrument Sans, which is neutral
 * and highly legible at small sizes, so the two never compete.
 */
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

const mono = JetBrains_Mono({
  variable: "--font-jetbrains",
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
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "FonderDigital — Digital Marketing & Development" }],
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
    logo: `${siteConfig.url}/icon.svg`,
    email: siteConfig.email,
    description: siteConfig.description,
  };

  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable} h-full antialiased`}
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
