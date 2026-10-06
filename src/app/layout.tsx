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
import Preloader from "@/components/motion/Preloader";
import ThemeProvider from "@/components/theme/ThemeProvider";
import Script from "next/script";
import "./globals.css";

const skipIntroScript =
  "try{if(sessionStorage.getItem('fd-intro-seen')){document.documentElement.classList.add('fd-skip-intro')}}catch(e){}";

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
  keywords: [
    "digital marketing",
    "web development",
    "Next.js development",
    "SEO",
    "branding",
    "UI design",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    url: siteConfig.url,
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
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <Script id="fd-theme-boot" strategy="beforeInteractive">
          {themeBootScript}
        </Script>
      </head>
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <Script id="fd-skip-intro" strategy="beforeInteractive">
          {skipIntroScript}
        </Script>
        <ThemeProvider>
          <SmoothScroll>
            <ScrollProgress />
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <AssistantLauncher />
            <CustomCursor />
            <Preloader />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
