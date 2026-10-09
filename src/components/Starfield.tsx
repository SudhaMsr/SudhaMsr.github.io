"use client";

import { useEffect, useRef } from "react";
import { rgba } from "@/lib/color";

/** Faint, slowly twinkling stars fixed behind the page, with gentle scroll parallax. */
export default function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, raf = 0, last = 0;
    let ink = "#e9edf0", tints: string[] = [];

    // deterministic layout so it never "jumps" between visits
    let seed = 42;
    const rnd = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
    const stars = Array.from({ length: 170 }, () => ({
      x: rnd(), y: rnd(), r: rnd() < 0.08 ? 1.6 : 0.5 + rnd() * 0.9,
      depth: 0.2 + rnd() * 0.8, ph: rnd() * Math.PI * 2, tint: rnd() < 0.18 ? Math.floor(rnd() * 4) : -1,
    }));

    const readTheme = () => {
      const cs = getComputedStyle(document.documentElement);
      ink = cs.getPropertyValue("--star").trim() || cs.getPropertyValue("--ink").trim();
      tints = ["--v-nlp", "--v-vision", "--v-analytics", "--v-llm"].map((v) => cs.getPropertyValue(v).trim());
    };
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const draw = (t: number) => {
      raf = requestAnimationFrame(draw);
      if (t - last < 33) return; // ~30fps is plenty for twinkling
      last = t;
      ctx.clearRect(0, 0, w, h);
      const sy = window.scrollY;
      const strength = parseFloat(getComputedStyle(canvas).opacity) || 1;
      if (!strength) return;
      // keep the same density on every screen: fewer stars on small ones
      const count = Math.max(45, Math.round(stars.length * Math.min(1, (w * h) / (1440 * 900))));
      for (const s of stars.slice(0, count)) {
        const y = (((s.y * h * 1.6 - sy * s.depth * 0.12) % (h * 1.6)) + h * 1.6) % (h * 1.6) - h * 0.3;
        const tw = reduced ? 0.7 : 0.45 + 0.55 * (0.5 + 0.5 * Math.sin(t / 1400 + s.ph));
        const c = s.tint >= 0 ? tints[s.tint] : ink;
        ctx.fillStyle = rgba(c, tw * (0.25 + s.depth * 0.55));
        ctx.beginPath(); ctx.arc(s.x * w, y, s.r, 0, Math.PI * 2); ctx.fill();
        if (s.r > 1.4) {
          // soft halo that fades to nothing, so bright stars glow instead of showing a disc
          const g = ctx.createRadialGradient(s.x * w, y, 0, s.x * w, y, s.r * 6);
          g.addColorStop(0, rgba(c, tw * 0.22));
          g.addColorStop(1, rgba(c, 0));
          ctx.fillStyle = g;
          ctx.beginPath(); ctx.arc(s.x * w, y, s.r * 6, 0, Math.PI * 2); ctx.fill();
        }
      }
    };

    readTheme(); resize();
    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    const mo = new MutationObserver(readTheme);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    const onVis = () => { cancelAnimationFrame(raf); if (!document.hidden) raf = requestAnimationFrame(draw); };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      cancelAnimationFrame(raf); mo.disconnect();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return <canvas ref={ref} className="starfield" aria-hidden />;
}
