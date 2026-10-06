"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useSyncExternalStore,
  type ReactNode,
} from "react";

export const THEMES = [
  { id: "copper", label: "Copper", swatch: "#b45309" },
  { id: "azure", label: "Azure", swatch: "#0284c7" },
  { id: "noir", label: "Noir", swatch: "#a78bfa" },
] as const;

export type ThemeId = (typeof THEMES)[number]["id"];

export const THEME_STORAGE_KEY = "fd-theme";

const DEFAULT_THEME: ThemeId = "copper";

function isThemeId(value: unknown): value is ThemeId {
  return THEMES.some((t) => t.id === value);
}

/* The <html> attribute is the single source of truth, not React state.
   The boot script in layout.tsx writes it before first paint, so reading it
   back keeps the server render and the client in step — a useState seeded
   from localStorage would either flash the default palette or trip a
   hydration mismatch. */
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((fn) => fn());
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  const onStorage = (e: StorageEvent) => {
    if (e.key === THEME_STORAGE_KEY) onChange();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot(): ThemeId {
  const attr = document.documentElement.getAttribute("data-theme");
  return isThemeId(attr) ? attr : DEFAULT_THEME;
}

/* Server render always claims the default; React swaps to the client
   snapshot immediately after hydration. */
function getServerSnapshot(): ThemeId {
  return DEFAULT_THEME;
}

type ThemeContextValue = {
  theme: ThemeId;
  setTheme: (next: ThemeId) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // Enables the colour transition once real values are on the element, so the
  // very first paint is not animated.
  useEffect(() => {
    document.documentElement.classList.add("theme-ready");
  }, []);

  const setTheme = useCallback((next: ThemeId) => {
    document.documentElement.setAttribute("data-theme", next);
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      /* Private mode or storage disabled — the theme still applies for this
         page view, it just will not persist. */
    }
    emit();
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used inside <ThemeProvider>");
  }
  return ctx;
}

export default ThemeProvider;