"use client";

import { useEffect } from "react";

// Reference-counted so concurrent locks (e.g. the mobile menu and a
// modal opened from it) behave correctly: the scroll lock only releases
// when the last lock is released.
let lockCount = 0;
let saved: {
  htmlOverflow: string;
  bodyOverflow: string;
  bodyPaddingRight: string;
} | null = null;

export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;

    const { body, documentElement } = document;

    lockCount++;
    if (lockCount === 1) {
      saved = {
        htmlOverflow: documentElement.style.overflow,
        bodyOverflow: body.style.overflow,
        bodyPaddingRight: body.style.paddingRight,
      };

      // Measure the scrollbar gutter before it disappears, then keep the
      // layout stable by padding the body with that width.
      const scrollBarWidth = window.innerWidth - documentElement.clientWidth;

      // Lock <html>, not just <body>. The site's Lenis smooth-scroll
      // drives window.scrollTo() every frame and the document scrolls at
      // the html level. `clip` (not `hidden`) makes the document a
      // non-scroll container even for programmatic scrolling, so Lenis
      // cannot move the page behind open overlays.
      documentElement.style.overflow = "clip";
      body.style.overflow = "hidden";
      if (scrollBarWidth > 0) {
        body.style.paddingRight = `${scrollBarWidth}px`;
      }
    }

    return () => {
      lockCount--;
      if (lockCount === 0 && saved) {
        documentElement.style.overflow = saved.htmlOverflow;
        body.style.overflow = saved.bodyOverflow;
        body.style.paddingRight = saved.bodyPaddingRight;
        saved = null;
      }
    };
  }, [locked]);
}
