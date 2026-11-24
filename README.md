# FonderDigital — Digital Marketing & Development Agency

Premium, multi-page agency website.

**Stack:** Next.js 16 (App Router) · React 19 · Tailwind CSS v4 · Framer Motion · Lucide React · TypeScript

## Getting Started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # production server
```

### Environment Variables

Copy `.env` and set your values:

| Variable | Required | Purpose |
|----------|----------|---------|
| `RESEND_API_KEY` | Yes | Transactional email (contact form, booking confirmations, newsletter) |

## Themes

Three themes — toggled via `<ThemeProvider>` in `src/app/layout.tsx`:

| Theme | Primary | Band-Dark Override | Best For |
|-------|---------|--------------------|----------|
| `copper` | `#B45309` warm amber | `#D97757` terracotta | Brand-first warm identity |
| `azure` | `#0284C7` blue | `#38BDF8` sky | Tech / SaaS feel |
| `noir` | `#A78BFA` violet | `#C4B5FD` lavender | Dark, premium aesthetic |

Set a theme by adding `data-theme="noir"` (or `"azure"`) to `<html>`. The current default is **copper**.

Design tokens live in `src/app/globals.css` under `[data-theme="…"]` blocks. All text and accent colors use CSS variable classes (`text-primary`, `bg-primary-glow`, etc.) so they adapt automatically per theme.

## Routes

| Route | File |
|-------|------|
| `/` | `src/app/page.tsx` |
| `/about` | `src/app/about/page.tsx` |
| `/services` | `src/app/services/page.tsx` |
| `/services/ai-development` · `/web-dev` · `/seo` · `/marketing` · `/content` · `/branding` | `src/app/services/<slug>/page.tsx` |
| `/work` | `src/app/work/page.tsx` |
| `/contact` | `src/app/contact/page.tsx` |

## API Routes

| Endpoint | File |
|----------|------|
| `POST /api/contact-form` | `src/app/api/contact-form/route.ts` |
| `POST /api/book-call` | `src/app/api/book-call/route.ts` |
| `POST /api/newsletter/update` | `src/app/api/newsletter/update/route.ts` |

All endpoints send emails via Resend. Set `RESEND_API_KEY` in `.env`.

## Folder Structure

```
src/
├── app/                      # App Router: layout, routes, metadata
│   ├── services/<slug>/      # Service detail pages (AI dev, web dev, SEO…)
│   └── api/*/route.ts        # Email endpoints (Resend)
├── components/
│   ├── assistant/            # LeadAssistant qualifier + AssistantLauncher
│   ├── booking/              # ConsultationCTA, ContactFAQ, ScheduleMeetingModal
│   ├── forms/                # ContactForm
│   ├── layout/               # Header, Footer, NewsletterForm, ScrollProgress
│   ├── motion/               # Reveal, RotatingText, SplitText, CountUp
│   ├── sections/             # Page sections (Hero, Testimonials, StickyProcess…)
│   ├── theme/                # ThemeProvider + ThemeSwitcher
│   └── ui/                   # Button, Magnetic, BrandMark, BrandIcons
├── config/site.ts            # Branding, nav, servicePages, case studies, stats
└── lib/utils.ts              # cn() class combiner
```

## Key Components

### Sections (`src/components/sections/`)
- `ProvenResults` — Stats band with animated counters + full-section mouse-tracking glow
- `MarqueeStrip` — Scrolling service headline strip with ambient orbs
- `StickyProcess` — Scroll-driven Discover·Plan·Create·Launch framework (right-panel story)
- `WorkPortfolio` — In-house site showcase + concept case-study cards
- `ServicesGrowthPath` — Growth-path services overview with fixed glow overlay
- `ServiceDetail` — Per-service page content wrapper
- `TrustMetrics` — Client trust indicators band
- `Testimonials` — Client testimonial cards with per-card mouse spotlight
- `Hero` / `HeroPreview` — Homepage hero with rotating text

### Booking Flow (`src/components/booking/`)
- `ConsultationCTA` — "Book a Free 30-Minute Discovery Call" card with modal trigger
- `ScheduleMeetingModal` — Google Calendar integration
- `ContactFAQ` / `ContactInfo` — Contact page supporting elements

## Custom CSS Utilities

All defined in `src/app/globals.css` via Tailwind v4 `@utility`:

| Utility | Usage |
|---------|-------|
| `text-gradient` | Gradient text (primary → accent-2) |
| `glass` / `glass-premium` | Backdrop-blur glass morphism surfaces |
| `glow-primary` | Soft primary color drop-shadow |
| `bg-grid` / `bg-mesh` / `bg-dots` | Pattern backgrounds for dark bands |
| `bg-spotlight` | Radial gradient mouse-follow effect |
| `edge-shine` | Border highlight on glass panels |
| `mask-fade-x` / `mask-fade-b` | Directional fade masks |
| `scrollbar-hide` | Hide scrollbar while keeping scroll |
| `band-dark` | Pre-styled dark band background (theme-aware) |

## Conventions

- **Server Components by default.** Add `"use client"` only when using hooks or event handlers.
- **Below-the-fold lazy loading.** Home sections after Hero are loaded with `next/dynamic`.
- **Theme-safe colors.** Always use semantic token classes (`text-primary`, `text-muted`, `bg-primary/10`) instead of hardcoded hex/rgb values. See [Themes](#themes) above.
- **Mouse-tracking spotlights.** When adding a new glow effect to a `band-dark` section, place the handler on the outermost element that receives pointer events (not a child div), and track position with percentage-based state rather than raw pixels.
- **Service detail pages** edit their content in `src/config/site.ts` (`servicePages` array). The page shell in `src/app/services/<slug>/page.tsx` is thin.
