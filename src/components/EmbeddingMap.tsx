"use client";

import { useEffect, useRef, useState } from "react";
import { rgba } from "@/lib/color";
import { domains, projects, type Domain } from "@/data/profile";

type Tip = { x: number; y: number; title: string; tagline: string } | null;

// deterministic pseudo-random so the background cloud is stable between renders
function rng(seed: number) {
  return () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
}

const order = Object.keys(domains) as Domain[];

export default function EmbeddingMap() {
  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [focus, setFocus] = useState<Domain | null>(null);
  const [tip, setTip] = useState<Tip>(null);
  const focusRef = useRef<Domain | null>(null);
  const hoverRef = useRef<string | null>(null);

  useEffect(() => {
    focusRef.current = focus;
  }, [focus]);

  useEffect(() => {
    const box = boxRef.current!;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, raf = 0, colors: Record<string, string> = {};

    const readColors = () => {
      const cs = getComputedStyle(document.documentElement);
      colors = {
        line: cs.getPropertyValue("--line").trim(),
        muted: cs.getPropertyValue("--muted").trim(),
        ink: cs.getPropertyValue("--ink").trim(),
        ...Object.fromEntries(order.map((d) => [d, cs.getPropertyValue(`--v-${d}`).trim()])),
      };
    };

    // background cloud: small points scattered around each project
    const r = rng(7);
    const cloud = projects.flatMap((p) =>
      Array.from({ length: 9 }, () => {
        const a = r() * Math.PI * 2, d = Math.pow(r(), 0.7) * 0.075;
        return { x: p.xy[0] + Math.cos(a) * d, y: p.xy[1] + Math.sin(a) * d, domain: p.domain, ph: r() * 6.28 };
      }),
    );

    // edges: each project to its two nearest neighbours in the same domain
    const edges: [number, number][] = [];
    projects.forEach((p, i) => {
      projects
        .map((q, j) => ({ j, d: Math.hypot(p.xy[0] - q.xy[0], p.xy[1] - q.xy[1]), same: q.domain === p.domain }))
        .filter((o) => o.j !== i && o.same)
        .sort((a, b) => a.d - b.d)
        .slice(0, 2)
        .forEach((o) => i < o.j && edges.push([i, o.j]));
    });

    const pad = { l: 0.1, r: 0.1, t: 0.16, b: 0.2 };
    const toPx = (x: number, y: number) => [
      (pad.l + x * (1 - pad.l - pad.r)) * w,
      (pad.t + y * (1 - pad.t - pad.b)) * h,
    ];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = box.clientWidth; h = box.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      const f = focusRef.current;
      const drift = (ph: number, amp: number) => (reduced ? 0 : Math.sin(t / 1600 + ph) * amp);

      // grid
      ctx.strokeStyle = rgba(colors.line, 0.6);
      ctx.lineWidth = 1;
      const step = w / 10;
      for (let x = step; x < w; x += step) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
      for (let y = step; y < h; y += step) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }

      // cloud
      for (const c of cloud) {
        const [x, y] = toPx(c.x, c.y);
        const dim = f && f !== c.domain;
        ctx.fillStyle = rgba(colors[c.domain], dim ? 0.08 : 0.35);
        ctx.beginPath();
        ctx.arc(x + drift(c.ph, 2), y + drift(c.ph + 1, 2), 1.8, 0, Math.PI * 2);
        ctx.fill();
      }

      // edges
      const pos = projects.map((p, i) => {
        const [x, y] = toPx(p.xy[0], p.xy[1]);
        return [x + drift(i, 3), y + drift(i + 2, 3)];
      });
      for (const [a, b] of edges) {
        const d = projects[a].domain;
        ctx.strokeStyle = rgba(colors[d], f && f !== d ? 0.06 : 0.4);
        ctx.beginPath(); ctx.moveTo(pos[a][0], pos[a][1]); ctx.lineTo(pos[b][0], pos[b][1]); ctx.stroke();
      }

      // project points
      projects.forEach((p, i) => {
        const [x, y] = pos[i];
        const dim = f && f !== p.domain;
        const hot = hoverRef.current === p.slug;
        const rad = (p.featured ? 6 : 4) + (hot ? 3 : 0);
        if (!dim) {
          const g = ctx.createRadialGradient(x, y, 0, x, y, rad * 4);
          g.addColorStop(0, rgba(colors[p.domain], hot ? 0.45 : 0.25));
          g.addColorStop(1, rgba(colors[p.domain], 0));
          ctx.fillStyle = g;
          ctx.beginPath(); ctx.arc(x, y, rad * 4, 0, Math.PI * 2); ctx.fill();
        }
        ctx.fillStyle = rgba(colors[p.domain], dim ? 0.2 : 1);
        ctx.beginPath(); ctx.arc(x, y, rad, 0, Math.PI * 2); ctx.fill();
      });

      // cluster labels at each domain's centroid, offset above the group
      ctx.font = `500 11px ${getComputedStyle(document.body).getPropertyValue("--font-geist-mono") || "monospace"}, monospace`;
      ctx.textAlign = "center";
      for (const d of order) {
        const ps = projects.filter((p) => p.domain === d);
        const cx = ps.reduce((s, p) => s + p.xy[0], 0) / ps.length;
        const top = Math.min(...ps.map((p) => p.xy[1]));
        const [x, y] = toPx(cx, top);
        ctx.fillStyle = rgba(colors[d], f && f !== d ? 0.25 : 0.95);
        ctx.fillText(domains[d].label.toUpperCase(), x, y - 22);
      }

      if (!reduced) raf = requestAnimationFrame(draw);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left, my = e.clientY - rect.top;
      let best: { p: (typeof projects)[number]; d: number; x: number; y: number } | null = null;
      for (const p of projects) {
        const [x, y] = toPx(p.xy[0], p.xy[1]);
        const d = Math.hypot(mx - x, my - y);
        if (d < 22 && (!best || d < best.d)) best = { p, d, x, y };
      }
      hoverRef.current = best?.p.slug ?? null;
      canvas.style.cursor = best ? "pointer" : "default";
      setTip(best ? { x: best.x, y: best.y, title: best.p.title, tagline: best.p.tagline } : null);
      if (reduced) draw(0);
    };
    const onLeave = () => { hoverRef.current = null; setTip(null); if (reduced) draw(0); };
    const onClick = () => {
      const slug = hoverRef.current;
      const el = slug && document.getElementById(`p-${slug}`);
      if (el) el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" });
    };

    readColors(); resize();
    raf = requestAnimationFrame(draw);
    const ro = new ResizeObserver(() => { resize(); if (reduced) draw(0); });
    ro.observe(box);
    const mo = new MutationObserver(() => { readColors(); if (reduced) draw(0); });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    canvas.addEventListener("click", onClick);
    const onRedraw = () => draw(0);
    box.addEventListener("redraw", onRedraw);
    return () => {
      box.removeEventListener("redraw", onRedraw);
      cancelAnimationFrame(raf); ro.disconnect(); mo.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("click", onClick);
    };
  }, []);

  // with reduced motion the loop doesn't run, so redraw when focus changes
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      boxRef.current?.dispatchEvent(new Event("redraw"));
    }
  }, [focus]);

  return (
    <figure style={{ margin: 0 }}>
      <div className="map" ref={boxRef}>
        <div className="map-bar mono">
          <span><b>Project map</b></span>
          <span>{projects.length} projects by field</span>
        </div>
        <canvas ref={canvasRef} role="img" aria-label="Illustrative map of Sudha's projects grouped into Computer Vision, LLMs & GenAI, NLP & Speech, and Data & Analytics. The same projects are listed in the Projects section." />
        {tip && (
          <div className="map-tip" style={{ left: tip.x, top: tip.y }}>
            <b>{tip.title}</b>
            <span>{tip.tagline}</span>
          </div>
        )}
        <div className="map-legend">
          {order.map((d) => (
            <button
              key={d}
              type="button"
              aria-pressed={focus === d}
              style={{ "--c": domains[d].color } as React.CSSProperties}
              onClick={() => setFocus((f) => (f === d ? null : d))}
            >
              <span className="dot" style={{ background: domains[d].color }} />
              {domains[d].label}
            </button>
          ))}
        </div>
      </div>
      <figcaption className="map-caption">
        Projects grouped by field (an illustrative layout, not a computed embedding). Hover a point for its name, or pick a field to highlight it.
      </figcaption>
    </figure>
  );
}
