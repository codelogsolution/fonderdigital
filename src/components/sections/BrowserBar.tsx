import { Lock } from "lucide-react";

export default function BrowserBar({ url }: { url: string }) {
  return (
    <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-50 px-4 py-2.5">
      <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-red-400" />
      <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-amber-400" />
      <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
      <span className="ml-3 flex flex-1 items-center gap-1.5 truncate rounded-md bg-white px-3 py-1 font-mono text-[10px] text-slate-500 ring-1 ring-slate-200">
        <Lock aria-hidden className="h-2.5 w-2.5 text-emerald-500" />
        {url}
      </span>
    </div>
  );
}
