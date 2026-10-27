import type { Metadata } from "next";
import AIEngineeringPage from "@/components/sections/AIEngineeringPage";
import { createPageMetadata } from "@/config/seo";

export const metadata: Metadata = createPageMetadata({
  title: "AI Chatbot & RAG Development",
  description:
    "Explore AI chatbot engineering with retrieval-augmented generation, document chunking, embeddings, FastAPI, LangChain, LangGraph, PostgreSQL, and human review.",
  path: "/services/ai-development",
});

export default function AIDevelopmentPage() {
  return <AIEngineeringPage />;
}
