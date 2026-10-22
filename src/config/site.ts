
import {
  Code2,
  FileText,
  Megaphone,
  Palette,
  Search,
  Smartphone,
  type LucideIcon,
} from "lucide-react";

export type Stat = { value: string; label: string };

export type NavItem = { label: string; href: string };

export const siteConfig = {
  name: "FonderDigital",
  tagline: "Digital Marketing & Development",
  description:
    "FonderDigital crafts high-performance websites, unforgettable brands, and growth campaigns that convert.",
  url: "https://fonderdigital.com",
  email: "hello@fonderdigital.com",
  phone: "",
  location: "",
  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Work", href: "/work" },
    { label: "Contact", href: "/contact" },
  ] satisfies NavItem[],
  socials: [] as SocialLink[],
  footerServices: [
    { label: "Web Development", href: "/services/web-dev" },
    { label: "App Development", href: "/services/app-dev" },
    { label: "SEO", href: "/services/seo" },
    { label: "Marketing", href: "/services/marketing" },
    { label: "Copywriting", href: "/services/content" },
    { label: "Branding", href: "/services/branding" },
  ] satisfies NavItem[],
};

export type SocialLink = {
  label: string;
  href: string;
  icon: "linkedin" | "instagram";
};

export type HeroSlide = {
  word: string;
  long: string;
  tagline: string;
  service: string;
  href: string;
  stat: string;
  caption: string;
  blurb?: string;
  label?: string;
};

export const heroSlides: HeroSlide[] = [
  {
        word: "websites",
    long: "high-converting websites",
    tagline: "that turn visitors into customers.",
    service: "Web Development",
    href: "/services/web-dev",
    stat: "Custom-built",
    caption: "for your goals",
    blurb:
      "FonderDigital builds fast, conversion-focused websites that load in a flash and guide visitors to book, buy or sign up.",
    label: "Websites",
  },
  {
        word: "apps",
    long: "beautiful mobile apps",
    tagline: "your customers love to use.",
    service: "App Development",
    href: "/services/app-dev",
    stat: "iOS + Android",
    caption: "cross-platform builds",
    blurb:
      "Plan and build iOS and Android apps with a cross-platform or native stack chosen for the product.",
    label: "Apps",
  },
  {
        word: "rankings",
    long: "search rankings",
    tagline: "that compound month after month.",
    service: "SEO",
    href: "/services/seo",
    stat: "Search-led",
    caption: "growth strategy",
    blurb:
      "Technical + content SEO that compounds: clean architecture, fast pages and keyword-rich content.",
    label: "SEO",
  },
  {
        word: "campaigns",
    long: "growth campaigns",
    tagline: "that bring leads every week.",
    service: "Social Marketing",
    href: "/services/marketing",
    stat: "Full-funnel",
    caption: "campaign planning",
    blurb:
      "Full-funnel campaigns across paid search, social, and email, planned around your audience and business goals.",
    label: "Marketing",
  },
  {
        word: "brands",
    long: "memorable brands",
    tagline: "people remember & trust.",
    service: "Branding",
    href: "/services/branding",
    stat: "Distinctive",
    caption: "brand identities",
    blurb:
      "Brand foundations — visual identity, voice and design system — built to stand out and last.",
    label: "Branding",
  },
  {
        word: "interfaces",
    long: "intuitive interfaces",
    tagline: "that users understand at first click.",
    service: "UI/UX Design",
    href: "/services/branding",
    stat: "User-centred",
    caption: "digital experiences",
    blurb:
      "Pixel-perfect interfaces and prototypes designed for clarity, not clutter — tested with real users.",
    label: "Design",
  },
  {
        word: "content",
    long: "effective content",
    tagline: "that ranks, engages & sells.",
    service: "Content Writing",
    href: "/services/content",
    stat: "Useful",
    caption: "search-ready content",
    blurb:
      "Content strategy, SEO copy and long-form stories that rank in Google and convert readers into leads.",
    label: "Content",
  },
];

export const heroServices: { label: string; href: string; icon: LucideIcon }[] =
  [
    { label: "Web Development", href: "/services/web-dev", icon: Code2 },
    { label: "App Development", href: "/services/app-dev", icon: Smartphone },
    { label: "SEO", href: "/services/seo", icon: Search },
    { label: "Social Marketing", href: "/services/marketing", icon: Megaphone },
    { label: "Branding", href: "/services/branding", icon: Palette },
    { label: "Content Writing", href: "/services/content", icon: FileText },
  ];

export type ProcessStep = { step: string; title: string; description: string };

export type ServicePage = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  image: string;
  imageAlt: string;
  fitFor: string[];
  features: string[];
  stats: Stat[];
  process: ProcessStep[];
};

export const servicePages: ServicePage[] = [
  {
    slug: "web-dev",
    title: "Web Development",
    tagline: "Blazing-fast, scalable web applications.",
    description:
      "From React interfaces to full Next.js websites and platforms, we take the work from requirements and architecture through component-based development, QA, and a controlled production release.",
    icon: Code2,
    image:
      "/images/photo-1461749280684.webp",
    imageAlt: "Developer writing code across dual monitors",
    fitFor: [
      "Your current website is slow, hard to update, or not turning visits into enquiries.",
      "You are launching a new digital product and need a strong technical foundation.",
      "Your business needs a site that connects content, commerce, and useful integrations.",
    ],
    features: [
      "React for interactive interfaces; Next.js when routing, server rendering, or full-stack features fit the project",
      "Feature-based architecture with reusable, documented components",
      "Lazy loading, code splitting, and image, font, and bundle optimization where they improve the experience",
      "Developer unit tests plus QA integration, browser, and regression checks with a fix-and-retest cycle",
      "GitHub pull requests and CI/CD checks before a controlled production release",
      "AI-assisted scaffolding, debugging, and test generation when useful, reviewed by developers",
      "Docker for backend services or repeatable environments when useful; it is not required for a web frontend",
    ],
    stats: [
      { value: "React + Next.js", label: "selected for the project needs" },
      { value: "Reusable", label: "features and UI components" },
      { value: "CI/CD", label: "checks and controlled releases" },
    ],
    process: [
      {
        step: "Discovery",
        title: "Define the product and scope",
        description:
          "Clarify users, content, features, integrations, constraints, and success measures. For an existing site, review the current codebase and performance before recommending what to keep or change.",
      },
      {
        step: "Architecture",
        title: "Choose the right web foundation",
        description:
          "Plan the information architecture, React or Next.js approach, data flow, integrations, hosting, environments, and acceptance criteria before implementation.",
      },
      {
        step: "Build",
        title: "Develop in clear feature slices",
        description:
          "Build responsive pages and reusable components by feature. Add only the code each route needs, with lazy loading and code splitting where they improve loading and interaction.",
      },
      {
        step: "QA & release",
        title: "Test, fix, review, and release",
        description:
          "Developers run unit tests; QA checks integrations, browsers, devices, and acceptance criteria. Log issues, fix them, and retest before changes move through GitHub review and CI/CD to production.",
      },
    ],
  },
  {
    slug: "app-dev",
    title: "App Development",
    tagline: "Mobile apps built for the platforms your product needs.",
    description:
      "We plan and build Android and iOS apps from requirements through production release. React Native with TypeScript/JavaScript is a common cross-platform choice; Flutter with Dart or native Kotlin and Swift may fit better when the product calls for them.",
    icon: Smartphone,
    image:
      "/images/photo-1512941937669.webp",
    imageAlt: "Smartphone running a mobile application",
    fitFor: [
      "You have a mobile product idea and want to validate it before committing to a full build.",
      "Your customers or team would benefit from a focused iOS and Android experience.",
      "Your existing app needs a better release process, analytics, or user experience.",
    ],
    features: [
      "Stack selection: React Native + TypeScript/JavaScript, Flutter + Dart, or native Android Kotlin and iOS Swift",
      "Feature-based app structure, shared design tokens, and reusable components",
      "On-demand screen and module loading, with startup, bundle, image, memory, and network optimization",
      "Developer unit tests plus QA unit, integration, device, and regression testing",
      "Feedback and bug cycle: record issues, fix, retest, and get acceptance before release",
      "GitHub reviews and CI/CD for repeatable builds, checks, signing, and store-submission workflows",
      "Android Studio and Xcode for platform-specific development, device testing, and release builds",
      "AI-assisted coding, debugging, or test generation where useful, with developer and QA review",
      "Docker for API/backend services or repeatable pipeline environments when needed—not for packaging store apps",
    ],
    stats: [
      { value: "React Native", label: "common cross-platform choice" },
      { value: "Flutter or native", label: "when the requirements call for it" },
      { value: "QA → CI/CD", label: "tested release workflow" },
    ],
    process: [
      {
        step: "Discovery",
        title: "Turn the idea into a feature plan",
        description:
          "Map users, core journeys, feature requirements, target devices, integrations, risks, and a sensible first release. Prioritize the backlog before build work starts.",
      },
      {
        step: "Architecture",
        title: "Choose the stack and app structure",
        description:
          "Use React Native for many shared iOS and Android builds; consider Flutter or native Kotlin/Swift when platform needs, existing code, or product constraints support that choice. Plan APIs, data, security, and release environments.",
      },
      {
        step: "Implementation",
        title: "Build features from reusable pieces",
        description:
          "Implement screens in feature-based modules with reusable components. Load heavy screens and modules on demand where supported, and optimize startup time, rendering, assets, memory use, and network requests.",
      },
      {
        step: "QA & feedback",
        title: "Fix, retest, and refine before release",
        description:
          "Developers run unit tests; QA verifies unit and integration behavior across target devices and checks the agreed features. Log bugs and feedback, send fixes back through QA, and repeat until acceptance criteria pass.",
      },
      {
        step: "Release",
        title: "Automate App Store and Play Store delivery",
        description:
          "Use GitHub branches and pull requests, merge to main after review and automated checks pass, then let CI/CD create and sign Android and iOS builds and upload them to Google Play Console and App Store Connect when configured. Google and Apple review and staged-release approvals remain part of publishing.",
      },
      {
        step: "Support",
        title: "Monitor and plan the next iteration",
        description:
          "Agree handover, crash monitoring, analytics, and post-launch support in the project scope. Use real product feedback to prioritize future fixes and features.",
      },
    ],
  },
  {
    slug: "seo",
    title: "SEO & Growth",
    tagline: "Make your site easier to find, understand, and improve.",
    description:
      "Practical search work across crawlability, page quality, useful content, and measurement. We use Search Console and analytics to find issues and track changes; search visibility and business outcomes depend on many factors and are never guaranteed.",
    icon: Search,
    image:
      "/images/photo-1460925895917.webp",
    imageAlt: "Analytics dashboard with growth charts on a laptop",
    fitFor: [
      "The right customers are not finding your business through search.",
      "You need a clear technical and content plan instead of a list of disconnected SEO tasks.",
      "You want reporting that connects search activity to meaningful enquiries and sales.",
    ],
    features: [
      "Crawl and indexation checks: robots directives, sitemaps, canonical URLs, redirects, status codes, and internal links",
      "Page-level improvements to titles, headings, descriptions, image text, structured data, and mobile experience where appropriate",
      "Search query and audience research turned into useful topic briefs, page plans, and content refresh priorities",
      "Local search support when relevant: accurate business details, location pages, and Google Business Profile upkeep",
      "Search Console and analytics setup or review, with a baseline for impressions, clicks, landing pages, and agreed enquiry actions",
      "Prioritized technical recommendations, implementation coordination, and follow-up checks after changes ship",
    ],
    stats: [
      { value: "Crawl & index", label: "help search engines access key pages" },
      { value: "Useful content", label: "answer the audience’s real questions" },
      { value: "Measure & refine", label: "use Search Console and analytics data" },
    ],
    process: [
      {
        step: "Audit",
        title: "Check access, indexing, and page health",
        description:
          "Review crawl access, index coverage, redirects, canonicals, sitemap and robots settings, internal links, page templates, and available Search Console data. Findings are prioritized by impact and effort; timing depends on site size and access.",
      },
      {
        step: "Strategy",
        title: "Plan around people and search intent",
        description:
          "Research the language people use, the questions they need answered, and the pages already available. Build a focused content plan with a clear audience, purpose, source material, and internal-link path for each page.",
      },
      {
        step: "Execution",
        title: "Implement and publish carefully",
        description:
          "Coordinate agreed technical fixes and page updates with your development and content teams. Check titles, headings, links, mobile rendering, indexability, and structured data where it fits the page.",
      },
      {
        step: "Optimization",
        title: "Review evidence and choose next steps",
        description:
          "Use Search Console and analytics to review impressions, clicks, landing-page engagement, and tracked enquiries. Separate measured changes from assumptions, then revise priorities. Search engines control crawling, indexing, and ranking; no provider can promise a position.",
      },
    ],
  },
  {
    slug: "marketing",
    title: "Performance Marketing",
    tagline: "Coordinate paid campaigns, social content, and email around a clear goal.",
    description:
      "Campaign planning and execution across the channels included in your scope. We align the audience, offer, creative, landing page, budget, and measurement, then use observed results to guide the next test rather than promise a specific return.",
    icon: Megaphone,
    image:
      "/images/photo-1552664730.webp",
    imageAlt: "Marketing analytics workspace with campaign charts",
    fitFor: [
      "You are investing in ads but cannot clearly see what is driving qualified leads.",
      "Your campaigns need a stronger testing rhythm across creative, audiences, and offers.",
      "You want paid, social, and email activity to work toward the same business goal.",
    ],
    features: [
      "Channel and audience plan based on your offer, customers, budget, and existing data",
      "Paid search or social campaign setup, structure, creative briefs, and landing-page alignment",
      "Organic social content themes and publishing calendar when included in the agreed scope",
      "Email sequences and automation mapped to consent, audience stage, and a useful next action",
      "Conversion tracking plan for agreed website or app actions, with privacy and consent requirements considered",
      "Creative and message tests with a written hypothesis, observation period, and documented learning",
    ],
    stats: [
      { value: "Goal first", label: "define the action that matters" },
      { value: "Test with a reason", label: "change one meaningful variable at a time" },
      { value: "Read the data", label: "report results and limitations clearly" },
    ],
    process: [
      {
        step: "Audit",
        title: "Review the offer, accounts, and measurement",
        description:
          "Review current campaigns, audiences, landing pages, creative, budget, and available tracking. Agree which actions count as conversions and check that measurement is configured before using it to guide decisions.",
      },
      {
        step: "Strategy",
        title: "Choose channels and plan the journey",
        description:
          "Map how a person discovers the offer, evaluates it, and takes the next step. Set a test budget, audience assumptions, creative needs, and practical decision points that fit the available spend and data.",
      },
      {
        step: "Execution",
        title: "Launch, observe, and learn",
        description:
          "Publish approved campaign assets and test messages or formats against a stated hypothesis. Check delivery, landing-page behavior, and conversion events, allowing enough time and data before drawing conclusions.",
      },
      {
        step: "Optimization",
        title: "Refine based on evidence",
        description:
          "Review spend, reach, clicks, and the agreed conversion events alongside sales context. Platform attribution is not proof of incremental impact, so explain what is measured, what is modeled, and what remains uncertain before changing budgets.",
      },
    ],
  },
  {
    slug: "content",
    title: "Content & Copywriting",
    tagline: "Clear, useful writing shaped around your audience and brand voice.",
    description:
      "Website copy, campaign messages, and editorial content that explain your offer clearly and help readers decide what to do next. We build drafts from your expertise and source material, verify factual claims, and agree review and approval before publishing.",
    icon: FileText,
    image:
      "/images/photo-1434030216411.webp",
    imageAlt: "Writer drafting copy in a notebook",
    fitFor: [
      "Your website does not explain your value clearly enough to the right buyers.",
      "You need a consistent editorial plan for search, education, and lead generation.",
      "Your email or landing-page copy needs to guide people toward a clear next step.",
    ],
    features: [
      "Website and landing-page messaging: audience, problem, offer, supporting evidence, and next step",
      "Editorial briefs and publishing plans based on customer questions, business priorities, and search intent",
      "Email, campaign, product, and social copy adapted to the channel and reader journey",
      "Voice and messaging guidance with examples your team can reuse",
      "Source and subject-matter review for factual claims, plus a clear client approval step",
      "Editing for structure, plain language, accessibility, metadata, and internal links where relevant",
    ],
    stats: [
      { value: "Understand", label: "audience, offer, and source material" },
      { value: "Write & review", label: "original drafts with fact checks" },
      { value: "Publish & learn", label: "measure and update useful content" },
    ],
    process: [
      {
        step: "Audit",
        title: "Understand the audience and current message",
        description:
          "Review the current pages, product information, customer questions, and any approved research. Identify unclear language, missing evidence, and places where readers may need a better explanation.",
      },
      {
        step: "Strategy",
        title: "Agree the message and content brief",
        description:
          "Set the page purpose, audience, key message, supporting proof supplied by your team, tone, call to action, sources, and review owners before writing begins.",
      },
      {
        step: "Execution",
        title: "Draft, fact-check, and edit",
        description:
          "Write original drafts for the agreed formats, check factual statements against supplied sources or subject experts, and edit for clarity, structure, brand voice, and accessibility. AI tools may assist research or drafting, but output is reviewed and verified before delivery.",
      },
      {
        step: "Optimization",
        title: "Publish and improve when evidence supports it",
        description:
          "After publication, review available reader feedback and analytics with you. Recommend revisions or experiments where there is enough traffic and a clear measurement plan; results vary and are not guaranteed.",
      },
    ],
  },
  {
    slug: "branding",
    title: "Branding & Design",
    tagline: "A coherent visual and verbal identity your team can use consistently.",
    description:
      "Brand discovery, positioning, messaging, and visual identity brought together in a usable system. The work is grounded in your business, audience, category, and goals rather than claims of guaranteed market perception.",
    icon: Palette,
    image:
      "/images/photo-1561070791.webp",
    imageAlt: "Designer's desk with color swatches and brand sketches",
    fitFor: [
      "Your visual identity feels inconsistent across your website, product, and marketing.",
      "You are launching or repositioning and need a distinctive direction people can recognize.",
      "Your team needs reusable brand and interface rules to create work more consistently.",
    ],
    features: [
      "Discovery covering business goals, audience, existing materials, category context, and practical constraints",
      "Positioning and message foundations, including what makes the offer distinct and what evidence supports that difference",
      "Logo family, color palette, typography, imagery direction, and layout rules for real digital and print uses",
      "Accessible color and type decisions, responsive logo variants, and reusable digital components where in scope",
      "Brand voice principles and example language for website and marketing touchpoints",
      "Guidelines and organized source files so your team can apply the identity consistently",
    ],
    stats: [
      { value: "Discover", label: "business, audience, and context" },
      { value: "Define", label: "positioning, voice, and visual direction" },
      { value: "Apply", label: "usable assets and clear guidelines" },
    ],
    process: [
      {
        step: "Audit",
        title: "Understand the business and category",
        description:
          "Review your goals, audience, offer, existing identity, competitors, and category conventions. Use the findings to identify opportunities and constraints; competitor review informs the work but does not replace customer research.",
      },
      {
        step: "Strategy",
        title: "Agree a strategic and creative direction",
        description:
          "Define the position the business wants to own, the audience promise, voice principles, and a visual direction. Review the rationale and agree a route before developing the identity system.",
      },
      {
        step: "Execution",
        title: "Build the identity and its applications",
        description:
          "Develop logo variations, color, type, graphic elements, and examples across the agreed touchpoints. Check legibility, contrast, responsive use, and handoff needs as the system takes shape.",
      },
      {
        step: "Optimization",
        title: "Handoff a system the team can maintain",
        description:
          "Deliver approved assets, source files, and practical usage guidance. Further rollout, brand tracking, or ongoing design support can be scoped separately once the identity is in use.",
      },
    ],
  },
];

export function getServicePage(slug: string): ServicePage | undefined {
  return servicePages.find((service) => service.slug === slug);
}

export interface ServicePreviewItem {
  id: string;
  title: string;
  subtitle: string;
  domain: string;
  kind: "app" | "web" | "seo" | "brand" | "marketing" | "content";
  entries: string[];
}

type PreviewSeed = [ServicePreviewItem["kind"], string, string, string[]];

export interface ServicePreviewCopy {
  eyebrow: string;
  heading: string;
  accent: string;
  description: string;
  cardNote: string;
}

const servicePreviewCopy: Record<string, ServicePreviewCopy> = {
  seo: {
    eyebrow: "Search performance",
    heading: "Where growth",
    accent: "compounds",
    description:
      "Illustrative views of technical checks, search performance, and content planning. These are interface concepts, not FonderDigital client results. Hover a card to pause it.",
    cardNote: "Illustrative concept · no client data",
  },
  branding: {
    eyebrow: "Identity system",
    heading: "One brand,",
    accent: "every surface",
    description:
      "Illustrative identity-system views showing how marks, color, typography, and applications can work together. Hover a card to pause it.",
    cardNote: "Illustrative concept · sample identity",
  },
  marketing: {
    eyebrow: "Campaign lifecycle",
    heading: "From brief to",
    accent: "booked revenue",
    description:
      "Illustrative campaign, email, and planning views. They show possible formats, not a live campaign or reported result. Hover a card to pause it.",
    cardNote: "Illustrative concept · no campaign results",
  },
  content: {
    eyebrow: "Editorial system",
    heading: "Copy that earns",
    accent: "attention",
    description:
      "Illustrative journal, landing-page, and newsletter layouts showing possible content formats. Hover a card to pause it.",
    cardNote: "Illustrative concept · sample copy",
  },
};

const defaultPreviewCopy: ServicePreviewCopy = {
  eyebrow: "Inside the work",
  heading: "What we build,",
  accent: "in action",
  description: "Concept screens for this service — headers, panels and data — scrolling slowly. Hover a card to pause.",
  cardNote: "",
};

export function getServicePreviewCopy(slug: string): ServicePreviewCopy {
  return servicePreviewCopy[slug] ?? defaultPreviewCopy;
}

const servicePreviewSeeds: Record<string, PreviewSeed[]> = {
  "app-dev": [
    ["app", "Daily rhythm", "Wellness app", ["Good morning, Alex", "Your daily goal · 6,000 steps", "Morning stretch · 12 minutes", "Mindful break · 5 minutes", "Evening walk · 20 minutes"]],
    ["app", "Pocket studio", "Creator app", ["Make something today", "Your workspace", "Moodboard · 12 saved ideas", "New collection · Summer light", "Drafts · Ready when you are"]],
    ["app", "Local table", "Food ordering app", ["A little closer to delicious", "Nearby favourites", "Harvest bowl · Fresh & seasonal", "Weekend brunch · Book a table", "Your order · On its way"]],
  ],
  "web-dev": [
    ["web", "Retail concept", "Editorial storefront", ["Everyday rituals. Beautifully made.", "Explore the collection", "The everyday essential", "Made with intention", "Find your next favourite"]],
    ["web", "Forma", "Architecture website", ["Spaces for a slower life.", "Selected spaces", "Courtyard house · Residential", "Studio 04 · Workplace", "Start a conversation"]],
    ["web", "Product concept", "SaaS landing page", ["Less busywork. More momentum.", "One workspace for your team", "Plan the week", "See the bigger picture", "Build your next chapter"]],
  ],
  seo: [
    ["seo", "Search pulse", "Analytics dashboard", ["Organic search overview", "Search impressions · connect Search Console", "Clicks · review by query and page", "Queries in focus · based on your data", "Pages to refresh · prioritize after audit"]],
    ["seo", "Site health", "Technical audit", ["A clearer path to discovery", "Indexability · review key pages", "Canonical checks · validate setup", "Internal links · find orphaned pages", "Next review · agree project cadence"]],
    ["seo", "Topic atlas", "Content planning", ["Build around search intent", "Pillar · Sustainable living", "Cluster · Everyday essentials", "Intent · Compare options", "Next brief · Buying guide"]],
  ],
  branding: [
    ["brand", "Nova", "Visual identity", ["Stand apart. Stay yourself.", "Signature palette", "Typography · Expressive & clear", "Mark construction · Clear space", "Applications · Print & digital"]],
    ["brand", "Ember", "Brand guidelines", ["Warm by nature.", "Colour with character", "Voice · Thoughtful, never formal", "Photography · Honest moments", "Packaging · A lighter touch"]],
    ["brand", "Fieldwork", "Design system", ["Room to grow.", "A connected visual language", "Type scale · Display to detail", "Components · Consistent by design", "Launch kit · Ready to share"]],
  ],
  marketing: [
    ["marketing", "Fresh perspective", "Social campaign", ["Your next chapter starts outside.", "Campaign · Weekend reset", "Audience · Curious explorers", "Creative A · Discover more", "Creative B · Take the scenic route"]],
    ["marketing", "The welcome series", "Lifecycle email", ["Glad you found us.", "Day 01 · A warm welcome", "Day 03 · Meet your favourites", "Day 07 · A little inspiration", "Day 14 · Make it yours"]],
    ["marketing", "Launch room", "Campaign planner", ["One idea. Many ways to connect.", "Monday · Teaser", "Wednesday · Product story", "Friday · Community spotlight", "Sunday · Weekly recap"]],
  ],
  content: [
    ["content", "The Sunday edit", "Editorial journal", ["Good stories deserve a little space.", "A considered approach to everyday life", "Start with what matters", "Make room for curiosity", "A new perspective, every Sunday"]],
    ["content", "Words that work", "Landing page copy", ["A clearer message. A better first impression.", "The problem, simply put", "A solution worth knowing", "Proof that earns attention", "Your next step starts here"]],
    ["content", "Notes from the studio", "Newsletter", ["A small dose of inspiration.", "This week in the studio", "One idea to try today", "What we are reading", "Until next time, keep creating"]],
  ],
};

export function getServicePreviewItems(slug: string): ServicePreviewItem[] {
  if (!getServicePage(slug)) return [];
  return (servicePreviewSeeds[slug] ?? []).map(([kind, title, subtitle, entries], index) => ({
    id: `${slug}-${index}`,
    kind,
    title,
    subtitle,
    domain: `${title.toLowerCase().replace(/\s+/g, "-")}.demo`,
    entries,
  }));
}

export type CaseMetric = {
  label: string;
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  displayValue?: string;
  explanation?: string;
};

export type CaseStudy = {
  client: string;
  industry: string;
  period: string;
  title: string;
  summary: string;
  services: string[];
  metrics: CaseMetric[];
};

export const caseStudies: CaseStudy[] = [
  {
    client: "Illustrative concept",
    industry: "E-commerce · Storefront UI",
    period: "Design demonstration · not client work",
    title: "A considered storefront for a modern retail brand",
    summary:
      "A visual concept showing how product storytelling, clear navigation, and a focused shopping flow can come together. This is a design sample, not a completed client engagement.",
    services: ["Storefront design", "Product storytelling", "Responsive UI"],
    metrics: [],
  },
  {
    client: "Illustrative concept",
    industry: "Digital product · Fitness UI",
    period: "Design demonstration · not client work",
    title: "A fitness app concept built around daily momentum",
    summary:
      "A sample mobile experience exploring approachable progress tracking, clear workout choices, and a calm daily routine. This is a UI concept, not a published app or client result.",
    services: ["Product UI concept", "Mobile interaction design", "Component system"],
    metrics: [],
  },
];

export type RecentWin = { metric: string; title: string; detail: string };

export const recentWins: RecentWin[] = [
  {
    metric: "01",
    title: "Find the friction",
    detail: "Review the customer journey, content, and available analytics to identify what is getting in the way.",
  },
  {
    metric: "02",
    title: "Make focused improvements",
    detail: "Prioritize changes around the audience, business goal, and practical constraints of the project.",
  },
  {
    metric: "03",
    title: "Learn from real signals",
    detail: "Agree on useful measures before launch, then use the data available to plan what to improve next.",
  },
];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  initials: string;
  company: string;
  sector: string;
  metric: string;
  metricLabel: string;
};

export const testimonials: Testimonial[] = [];
