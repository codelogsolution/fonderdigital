"use client";

import { Check, Palette } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { THEMES, useTheme } from "@/components/theme/ThemeProvider";
import { cn } from "@/lib/utils";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const active = THEMES.find((t) => t.id === theme) ?? THEMES[0];

  // Close on outside click and on Escape — a bare toggle with no dismiss
  // leaves the menu stranded over the nav on desktop.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      btnRef.current?.focus();
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={wrapRef} className="relative">
      <button
        ref={btnRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Theme: ${active.label}. Change theme`}
        className="flex items-center gap-2 rounded-full border border-border-subtle px-3 py-2 text-xs font-semibold transition-colors hover:border-primary/50 hover:text-primary"
      >
        <span
          aria-hidden
          className="h-3.5 w-3.5 rounded-full ring-1 ring-inset ring-black/10"
          style={{ background: active.swatch }}
        />
        <span className="hidden sm:inline">{active.label}</span>
        <Palette aria-hidden className="h-3.5 w-3.5 sm:hidden" />
      </button>

      {open && (
        <div
          role="listbox"
          aria-label="Themes"
          className="absolute bottom-[calc(100%+0.5rem)] left-0 z-50 max-h-[50vh] w-48 overflow-y-auto rounded-xl border border-border-subtle bg-background p-1 shadow-[0_18px_40px_-18px_rgba(2,6,23,0.35)] sm:bottom-auto sm:left-auto sm:right-0 sm:top-[calc(100%+0.5rem)]"
        >
          {THEMES.map((t) => (
            <button
              key={t.id}
              type="button"
              role="option"
              aria-selected={t.id === theme}
              onClick={() => {
                setTheme(t.id);
                setOpen(false);
              }}
              className={cn(
                "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm transition-colors",
                t.id === theme
                  ? "bg-primary/10 font-bold text-primary"
                  : "text-muted hover:bg-surface hover:text-foreground",
              )}
            >
              <span
                aria-hidden
                className="h-4 w-4 shrink-0 rounded-full ring-1 ring-inset ring-black/10"
                style={{ background: t.swatch }}
              />
              <span className="flex-1 truncate">{t.label}</span>
              {t.id === theme && <Check aria-hidden className="h-4 w-4" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}