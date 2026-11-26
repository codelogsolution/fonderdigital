"use client";

import { type ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { useScrollLock } from "@/lib/useScrollLock";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** id of the element that labels the dialog (usually an <h2> inside) */
  labelledBy: string;
  /** panel sizing/extra classes, e.g. "max-w-xl" */
  panelClassName?: string;
  children: ReactNode;
}

/**
 * Reusable modal shell.
 *
 * Strategy it owns (do not re-implement in individual modals):
 * - `useScrollLock` freezes the page: `overflow: clip` on <html>, which
 *   blocks Lenis's programmatic `window.scrollTo()` while open.
 * - `data-lenis-prevent` on the wrapper: Lenis smooth-scroll skips the
 *   whole modal subtree, so the `overflow-y-auto` body inside scrolls
 *   natively with wheel/touch.
 * - Escape key + backdrop click close.
 * - `modal-backdrop-in` / `modal-panel-in` CSS entrance animations.
 *
 * Give long content an inner `overflow-y-auto overscroll-contain` div so
 * the page behind never scrolls at the edges.
 */
export default function Modal({
  isOpen,
  onClose,
  labelledBy,
  panelClassName,
  children,
}: ModalProps) {
  useScrollLock(isOpen);

  useEffect(() => {
    if (!isOpen) return;
    const handle = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      data-lenis-prevent
      className="fixed inset-0 z-9999 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelledBy}
    >
      <div
        className="modal-backdrop-in absolute inset-0 bg-black/65 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className={cn(
          "modal-panel-in relative flex w-full flex-col overflow-hidden bg-background shadow-2xl",
          panelClassName ?? "max-w-xl",
        )}
        style={{ maxHeight: "calc(100dvh - 3rem)", borderRadius: "1.5rem" }}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}
