"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
} from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Bot,
  CircleHelp,
  Database,
  FileSearch2,
  GitBranch,
  Layers3,
  LockKeyhole,
  MessageSquareText,
  Network,
  Search,
  ShieldCheck,
  Sparkles,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";

const pexelsVideo =
  "https://videos.pexels.com/video-files/3130182/3130182-hd_1920_1080_30fps.mp4";
const pexelsSource =
  "https://www.pexels.com/video/running-a-light-of-digital-information-3129977/";

function AINetworkVideo() {
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(true);
  const reduced = useReducedMotionSafe();

  useEffect(() => {
    if (reduced) return;
    const frame = frameRef.current;
    if (!frame) return;
    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setReady(true);
          observer.disconnect();
        }
      },
      { rootMargin: "160px", threshold: 0.1 },
    );
    observer.observe(frame);
    return () => observer.disconnect();
  }, [reduced]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (reduced || !playing || !ready) {
      video.pause();
      return;
    }
    void video.play().catch(() => setPlaying(false));
  }, [playing, ready, reduced]);

  const toggleVideo = () => {
    if (!playing) setReady(true);
    setPlaying((current) => !current);
  };

  return (
    <div
      ref={frameRef}
      className="ai-video-frame edge-shine relative aspect-[1.12] overflow-hidden rounded-[2rem] border border-white/15 bg-[#100d0a] shadow-[0_36px_100px_-48px_var(--primary-glow-strong)] sm:aspect-[1.32] lg:aspect-[1.1]"
    >
      <video
        ref={videoRef}
        src={ready ? pexelsVideo : undefined}
        poster="/images/ai-network-poster.jpg"
        autoPlay={ready && playing && !reduced}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-br from-black/15 via-transparent to-primary/30 mix-blend-screen" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-black/15" />

      <div className="absolute inset-x-4 top-4 flex items-center justify-between gap-3 sm:inset-x-5 sm:top-5">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/35 px-3 py-2 text-[10px] font-semibold text-white/90 backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_12px_var(--primary-glow)]" />
          RETRIEVAL TRACE <span className="text-white/45">/</span> CONCEPT
        </span>
        <button
          type="button"
          onClick={toggleVideo}
          aria-label={playing ? "Pause AI visualization" : "Play AI visualization"}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/35 text-white backdrop-blur-md transition-colors hover:bg-black/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          {playing && !reduced ? (
            <span aria-hidden="true" className="flex gap-1">
              <span className="h-3.5 w-0.5 rounded-full bg-current" />
              <span className="h-3.5 w-0.5 rounded-full bg-current" />
            </span>
          ) : (
            <span aria-hidden="true" className="ml-0.5 h-0 w-0 border-y-[6px] border-y-transparent border-l-[9px] border-l-current" />
          )}
        </button>
      </div>

      <div className="absolute inset-x-5 bottom-5 sm:inset-x-7 sm:bottom-7">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">From scattered knowledge to useful context</p>
        <p className="mt-2 max-w-md text-xl font-bold leading-tight text-white sm:text-2xl">Retrieve the right source. Give the model something reliable to work with.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {["approved sources", "retrieval", "review path"].map((item) => (
            <span key={item} className="rounded-full border border-white/15 bg-black/30 px-2.5 py-1 text-[9px] font-medium text-white/75 backdrop-blur-sm">
              {item}
            </span>
          ))}
        </div>
      </div>
      <p className="sr-only">Abstract AI data visualization video by Pressmaster, used under the Pexels Free License.</p>
    </div>
  );
}

type PipelineStep = {
  icon: LucideIcon;
  number: string;
  name: string;
  detail: string;
  tools: string;
};

const pipeline: PipelineStep[] = [
  {
    icon: FileSearch2,
    number: "01",
    name: "Ingest & parse",
    detail: "Bring in only the documents, pages, or records approved for this assistant.",
    tools: "PDF · web · structured data",
  },
  {
    icon: Layers3,
    number: "02",
    name: "Chunk with context",
    detail: "Split content at meaningful boundaries and preserve titles, metadata, and access rules.",
    tools: "chunking · metadata",
  },
  {
    icon: Database,
    number: "03",
    name: "Embed & index",
    detail: "Create embeddings and store searchable vectors beside the source references.",
    tools: "embeddings · PostgreSQL · pgvector",
  },
  {
    icon: Search,
    number: "04",
    name: "Retrieve evidence",
    detail: "Find relevant passages for the question, with filters that respect the data boundary.",
    tools: "similarity search · source context",
  },
  {
    icon: MessageSquareText,
    number: "05",
    name: "Compose an answer",
    detail: "Use retrieved context in a constrained prompt; return sources or say when evidence is missing.",
    tools: "LangChain · LLM API",
  },
  {
    icon: GitBranch,
    number: "06",
    name: "Route & review",
    detail: "Branch to answer, ask a follow-up, retry, or hand off to a person when needed.",
    tools: "LangGraph · evaluation · human review",
  },
];

function PipelineSection() {
  const reduced = useReducedMotionSafe();

  return (
    <section id="rag-architecture" className="relative isolate overflow-hidden border-y border-border-subtle py-20 sm:py-24 lg:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid opacity-45" />
        <div className="absolute -right-48 top-20 h-[34rem] w-[34rem] rounded-full bg-primary/[0.08] blur-[120px]" />
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-16">
          <Reveal direction="left">
            <span className="inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.2em] text-primary">
              <span aria-hidden="true" className="h-px w-7 bg-primary/55" />
              Inside a RAG assistant
            </span>
            <h2 className="mt-4 max-w-2xl text-balance text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              A useful answer starts before the model speaks.
            </h2>
          </Reveal>
          <Reveal direction="right" delay={0.08}>
            <p className="max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              Retrieval-augmented generation connects a model to relevant, approved
              knowledge at question time. Here is one possible path from source
              material to an answer that can be checked.
            </p>
          </Reveal>
        </div>

        <div className="relative mt-12 sm:mt-16">
          <div aria-hidden="true" className="absolute left-0 right-0 top-5 hidden h-px bg-border-subtle lg:block">
            <motion.span
              initial={reduced ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.65 }}
              transition={{ duration: reduced ? 0 : 0.95, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 origin-left bg-gradient-to-r from-primary/40 via-primary to-primary/25"
            />
          </div>
          <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-8">
            {pipeline.map(({ icon: Icon, number, name, detail, tools }, index) => (
              <Reveal key={number} delay={index * 0.055} className="h-full">
                <li className="group relative flex h-full min-h-[13rem] flex-col overflow-hidden rounded-2xl border border-border-subtle bg-background/85 p-5 backdrop-blur-sm transition-colors duration-300 hover:border-primary/35 sm:p-6">
                  <span aria-hidden="true" className="pointer-events-none absolute -right-8 -top-10 h-28 w-28 rounded-full bg-primary/[0.07] blur-2xl transition-colors group-hover:bg-primary/[0.15]" />
                  <div className="relative flex items-center justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/25 bg-primary/10 text-primary transition-transform duration-300 group-hover:-translate-y-0.5">
                      <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                    </span>
                    <span className="font-mono text-[11px] font-semibold tracking-[0.15em] text-primary/75">{number}</span>
                  </div>
                  <h3 className="relative mt-6 text-base font-bold tracking-tight sm:text-lg">{name}</h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-muted">{detail}</p>
                  <p className="relative mt-auto pt-5 text-[9px] font-semibold uppercase tracking-[0.13em] text-primary/80">{tools}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal delay={0.12}>
          <div className="mt-7 grid gap-4 rounded-2xl border border-primary/20 bg-primary/[0.045] p-5 sm:grid-cols-[auto_1fr] sm:items-center sm:p-6">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/25 bg-background/70 text-primary">
              <Network className="h-5 w-5" aria-hidden="true" />
            </span>
            <p className="text-sm leading-relaxed text-muted">
              <strong className="text-foreground">Where the frameworks fit:</strong>{" "}
              FastAPI can expose the application API; LangChain can compose retrieval
              and model calls; LangGraph can coordinate stateful branches and handoffs.
              PostgreSQL with pgvector is one option for storing vectors and source
              metadata. The architecture is selected to fit the real data and workload.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const chatbotExamples = [
  {
    question: "Can you build this with React or Next.js?",
    answer:
      "Yes. React can power interactive interfaces, and Next.js can fit when the project needs routing, server rendering, or full-stack features. The choice depends on your requirements.",
    source: "Approved service brief · Web Development",
  },
  {
    question: "What if the knowledge base has no answer?",
    answer:
      "The assistant should say it cannot find enough approved context and offer the next step you choose, such as asking a clarifying question or handing the conversation to your team.",
    source: "Example policy · Fallback and handoff",
  },
  {
    question: "How do we keep answers traceable?",
    answer:
      "Return the relevant source alongside the answer, preserve document metadata during retrieval, and test the result against examples agreed for the project.",
    source: "Example architecture · Retrieval and evaluation",
  },
];

function ChatbotWalkthrough() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotionSafe();
  const example = chatbotExamples[active];

  return (
    <section className="relative isolate overflow-hidden py-20 sm:py-24 lg:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-mesh opacity-75" />
        <div className="absolute -left-56 top-1/4 h-[34rem] w-[34rem] rounded-full bg-primary/[0.08] blur-[120px]" />
      </div>
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:gap-16 lg:px-8">
        <Reveal direction="left">
          <span className="inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.2em] text-primary">
            <span aria-hidden="true" className="h-px w-7 bg-primary/55" />
            The answer trace
          </span>
          <h2 className="mt-4 text-balance text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Helpful, sourced, and honest about its limits.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            A grounded assistant does more than generate fluent text. It needs
            relevant context, clear source boundaries, and a sensible response
            when retrieval comes up short.
          </p>
          <div className="mt-7 flex items-start gap-3 rounded-2xl border border-border-subtle bg-background/75 p-4">
            <LockKeyhole className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            <p className="text-xs leading-relaxed text-muted">
              Source access, retention, and user permissions are planned with the
              project. A model should only receive the context it is allowed to use.
            </p>
          </div>
        </Reveal>

        <Reveal direction="right" delay={0.08}>
          <div className="band-dark relative overflow-hidden rounded-[1.75rem] border border-white/10 p-4 shadow-[0_32px_90px_-50px_var(--primary-glow-strong)] sm:p-6 lg:p-7">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid opacity-20" />
            <div className="relative flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/25 bg-primary/10 text-primary">
                  <Bot className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-bold text-foreground">Grounded assistant</p>
                  <p className="mt-0.5 text-[10px] text-muted">Example conversation · concept only</p>
                </div>
              </div>
              <span className="rounded-full border border-primary/20 bg-primary/[0.08] px-2.5 py-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-primary">Not connected to a live model</span>
            </div>

            <div className="relative mt-4 flex flex-wrap gap-2" role="group" aria-label="Choose an example chatbot question">
              {chatbotExamples.map((item, index) => (
                <button
                  key={item.question}
                  type="button"
                  aria-pressed={index === active}
                  onClick={() => setActive(index)}
                  className={
                    "rounded-full border px-3 py-2 text-left text-[10px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:text-xs " +
                    (index === active
                      ? "border-primary/40 bg-primary/15 text-foreground"
                      : "border-white/10 bg-white/[0.025] text-muted hover:border-white/20 hover:text-foreground")
                  }
                >
                  {item.question}
                </button>
              ))}
            </div>

            <div className="relative mt-5 min-h-[17rem] rounded-2xl border border-white/10 bg-black/15 p-4 sm:min-h-[15rem] sm:p-5" aria-live="polite" aria-atomic="true">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active}
                  initial={reduced ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? undefined : { opacity: 0, y: -3 }}
                  transition={{ duration: reduced ? 0 : 0.2, ease: "easeOut" }}
                  className="flex min-h-[14rem] flex-col"
                >
                  <div className="ml-auto max-w-[90%] rounded-2xl rounded-tr-sm border border-primary/20 bg-primary/[0.1] px-4 py-3 text-xs leading-relaxed text-foreground sm:text-sm">
                    {example.question}
                  </div>
                  <div className="mt-4 flex max-w-[95%] gap-3 rounded-2xl rounded-tl-sm border border-white/10 bg-white/[0.045] px-4 py-3 text-xs leading-relaxed text-foreground/90 sm:text-sm">
                    <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                    <p>{example.answer}</p>
                  </div>
                  <div className="mt-auto flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-4">
                    <span className="inline-flex items-center gap-2 text-[10px] font-medium text-muted">
                      <FileSearch2 className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                      Source context
                    </span>
                    <span className="rounded-lg border border-white/10 bg-white/[0.035] px-2.5 py-1.5 text-[9px] font-semibold text-foreground/75">{example.source}</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const deliveryChecks = [
  { icon: CircleHelp, title: "Answer quality", text: "Test realistic questions, ambiguous requests, and missing-source cases." },
  { icon: ShieldCheck, title: "Boundaries & fallback", text: "Check source permissions, refusals, escalation, and human approvals." },
  { icon: Workflow, title: "Operational fit", text: "Review latency, token cost, API limits, logs, and ownership." },
];

export default function AIEngineeringPage() {
  return (
    <main>
      <section className="relative isolate overflow-hidden pb-20 pt-28 sm:pb-24 sm:pt-36 lg:pb-32 lg:pt-40">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-grid opacity-35 [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" />
          <div className="absolute -right-40 top-8 h-[34rem] w-[34rem] rounded-full bg-primary/[0.1] blur-[125px]" />
          <div className="absolute -left-56 bottom-0 h-[26rem] w-[26rem] rounded-full bg-primary/[0.06] blur-[110px]" />
        </div>

        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.84fr)_minmax(0,1.16fr)] lg:items-center lg:gap-12 lg:px-8">
          <Reveal direction="left" className="relative z-20">
            <span className="inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.2em] text-primary">
              <span aria-hidden="true" className="h-px w-7 bg-primary/55" />
              AI engineering · RAG assistants
            </span>
            <h1 className="mt-5 max-w-3xl text-balance text-4xl font-extrabold leading-[1.03] tracking-[-0.045em] sm:text-5xl lg:text-6xl">
              Chatbots that answer with your knowledge—and know when to hand off.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              Explore how a business chatbot can combine retrieval, embeddings,
              an API, and stateful workflow logic—grounded in content you approve.
            </p>
            <div className="mt-6 flex flex-wrap gap-2" aria-label="Example implementation technologies">
              {["Python", "FastAPI", "RAG", "LangChain", "LangGraph", "PostgreSQL + pgvector"].map((item) => (
                <span key={item} className="rounded-full border border-border-subtle bg-background/75 px-3 py-1.5 text-[10px] font-semibold text-foreground/80 backdrop-blur-sm">{item}</span>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="#rag-architecture" className="group inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-[0_12px_30px_-16px_var(--primary-glow-strong)] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
                Explore the architecture
                <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-xl border border-border-subtle bg-background/70 px-5 py-3 text-sm font-bold text-foreground transition-colors hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                Discuss an AI project
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="relative mt-8 max-w-lg rounded-2xl border border-primary/20 bg-background/90 p-4 shadow-[0_20px_60px_-38px_var(--primary-glow-strong)] backdrop-blur-xl sm:p-5 lg:absolute lg:-right-16 lg:bottom-[-2rem] lg:mt-0 lg:w-[21rem]">
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.16em] text-primary">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Example retrieval trace
                </span>
                <span className="font-mono text-[9px] text-muted">01 / 03</span>
              </div>
              <div className="mt-3 grid grid-cols-[1fr_auto_1fr] items-center gap-2 text-[10px] font-semibold">
                <span className="rounded-lg border border-border-subtle bg-surface/80 px-2.5 py-2 text-center text-foreground/80">Question</span>
                <ArrowRight className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                <span className="rounded-lg border border-primary/25 bg-primary/[0.08] px-2.5 py-2 text-center text-foreground/80">Source context</span>
              </div>
              <p className="mt-3 text-[10px] leading-relaxed text-muted">Illustrative architecture preview. No live model or customer data is connected.</p>
            </div>
          </Reveal>

          <Reveal direction="right" delay={0.1} className="relative z-10 lg:pl-3">
            <AINetworkVideo />
            <p className="mt-3 text-right text-[9px] text-muted">
              Visual by <a href={pexelsSource} target="_blank" rel="noreferrer" className="underline decoration-border-subtle underline-offset-2 hover:text-primary">Pressmaster on Pexels</a> · Free License
            </p>
          </Reveal>
        </div>
      </section>

      <PipelineSection />
      <ChatbotWalkthrough />

      <section className="relative isolate overflow-hidden border-y border-border-subtle py-20 sm:py-24 lg:py-28">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-grid opacity-30" />
          <div className="absolute -right-56 top-1/3 h-[30rem] w-[30rem] rounded-full bg-primary/[0.08] blur-[120px]" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-16">
            <Reveal direction="left">
              <span className="inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.2em] text-primary">
                <span aria-hidden="true" className="h-px w-7 bg-primary/55" />
                From prototype to production
              </span>
              <h2 className="mt-4 text-balance text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
                The model is one part. The system has to hold up.
              </h2>
            </Reveal>
            <Reveal direction="right" delay={0.08}>
              <p className="max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
                Production readiness depends on the use case and the data. The
                project plan should make quality checks, safe fallbacks, and
                operational ownership visible before release.
              </p>
            </Reveal>
          </div>

          <div className="mt-10 grid gap-3 md:grid-cols-3 lg:mt-14">
            {deliveryChecks.map(({ icon: Icon, title, text }, index) => (
              <Reveal key={title} delay={index * 0.07} className="h-full">
                <article className="group relative flex h-full min-h-48 flex-col overflow-hidden rounded-2xl border border-border-subtle bg-background/80 p-5 transition-colors duration-300 hover:border-primary/35 sm:p-6">
                  <span aria-hidden="true" className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/[0.07] blur-2xl transition-colors group-hover:bg-primary/[0.14]" />
                  <div className="relative flex items-center justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary"><Icon className="h-4.5 w-4.5" aria-hidden="true" /></span>
                    <span className="font-mono text-[10px] text-muted">0{index + 1}</span>
                  </div>
                  <h3 className="relative mt-6 text-base font-bold">{title}</h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-muted">{text}</p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.12}>
            <div className="mt-10 flex flex-col gap-5 rounded-[1.75rem] border border-primary/20 bg-primary/[0.045] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary">Want to explore a chatbot?</p>
                <p className="mt-2 max-w-2xl text-lg font-semibold tracking-tight text-foreground sm:text-xl">Start with your users, your content, and the one answer they need to trust.</p>
              </div>
              <Link href="/contact" className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
                Plan an AI project
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
