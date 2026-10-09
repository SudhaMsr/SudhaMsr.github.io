"use client";

import { useEffect, useRef } from "react";
import { rgba } from "@/lib/color";
import { BUILD_COLORS, BUILD_EVENT, type BuildProgress } from "@/lib/build";

type P = { x: number; y: number; vx: number; vy: number; c: number; onLine: boolean; life: number };

/**
 * Small data pulses that travel down the thread in the left margin while you scroll,
 * coloured by the section you are in.
 */
export default function DataStream() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    let w = 0, h = 0, raf = 0, colors: string[] = [];
    let lineX = 40, section = 0, budget = 0, drawing = false;
    const parts: P[] = [];

    const readTheme = () => {
      const cs = getComputedStyle(document.documentElement);
      colors = BUILD_COLORS.map((v) => cs.getPropertyValue(v).trim());
    };
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const onProgress = (e: Event) => {
      const d = (e as CustomEvent<BuildProgress>).detail;
      lineX = d.x;
      section = Math.min(4, Math.max(0, d.k - (d.k > 0 ? 1 : 0)));
      // only release particles while the thread is still being drawn
      if (d.p > 0 && d.p < 1) budget += Math.min(2, Math.abs(d.dy) / 60);
      if (!drawing) {
        drawing = true;
        raf = requestAnimationFrame(tick);
      }
    };

    const tick = () => {
      // spawn on the drawn part of the thread
      while (budget >= 1 && parts.length < 60) {
        budget -= 1;
        parts.push({ x: lineX, y: h * (0.08 + Math.random() * 0.4), vx: 0, vy: 1.5 + Math.random() * 2, c: section, onLine: true, life: 0 });
      }
      budget = Math.min(budget, 6);

      ctx.clearRect(0, 0, w, h);
      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i];
        p.life++;
        if (!p.onLine) {
          // pulled towards the thread
          const dx = lineX - p.x;
          p.vx += dx * 0.0016 - p.vx * 0.04;
          p.vy += 0.03 - p.vy * 0.03;
          if (Math.abs(dx) < 5) { p.onLine = true; p.x = lineX; p.vx = 0; p.vy = Math.max(p.vy, 3); }
        } else {
          p.x = lineX;
          p.vy = Math.min(p.vy + 0.35, 16);
        }
        const ox = p.x, oy = p.y;
        p.x += p.vx; p.y += p.vy;
        // absorbed by the thread head, which sits at 62% of the viewport
        if (p.y > h * 0.62 || p.life > 600) { parts.splice(i, 1); continue; }

        const c = colors[p.c];
        const a = Math.min(1, p.life / 10);
        const g = ctx.createLinearGradient(ox, oy - 18, p.x, p.y);
        g.addColorStop(0, rgba(c, 0)); g.addColorStop(1, rgba(c, 0.7 * a));
        ctx.strokeStyle = g; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(ox, oy - 18); ctx.lineTo(p.x, p.y); ctx.stroke();
        ctx.fillStyle = rgba(c, a);
        ctx.beginPath(); ctx.arc(p.x, p.y, 1.8, 0, Math.PI * 2); ctx.fill();
      }
      if (parts.length || budget >= 1) raf = requestAnimationFrame(tick);
      else drawing = false;
    };

    readTheme(); resize();
    window.addEventListener("resize", resize);
    window.addEventListener(BUILD_EVENT, onProgress);
    const mo = new MutationObserver(readTheme);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => {
      cancelAnimationFrame(raf); mo.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener(BUILD_EVENT, onProgress);
    };
  }, []);

  return <canvas ref={ref} className="datastream" aria-hidden />;
}
