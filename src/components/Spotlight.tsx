"use client";

import { useEffect } from "react";

export const GLOW = ".card-mc, .proj, .xp-card, .msc, .btech, .panel, .ask, .map, .stats > div";

/** Feeds the pointer position to any glowing card so its CSS spotlight can follow the cursor. */
export default function Spotlight() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover)").matches) return;
    const onMove = (e: PointerEvent) => {
      const card = (e.target as Element | null)?.closest?.<HTMLElement>(GLOW);
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => document.removeEventListener("pointermove", onMove);
  }, []);
  return null;
}
