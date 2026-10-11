"use client";

import { useEffect, useRef } from "react";
import { rgba } from "@/lib/color";
import { BUILD_COLORS, BUILD_EVENT, type BuildProgress } from "@/lib/build";
// one accent colour keeps the brain calm; BUILD_COLORS only sets how many sections train it

const N = 170;

type Node = { x: number; y: number; z: number; sec: number; born: number };

// deterministic pseudo-random so the brain is the same shape on every visit
function rng(seed: number) {
  return () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
}

function buildBrain() {
  const r = rng(23);
  const nodes: Node[] = [];
  for (let i = 0; i < N; i++) {
    const hemi = i % 2 ? 1 : -1;
    // point on a bumpy ellipsoid shell (gyri), with a few inner nodes
    const u = r() * Math.PI * 2, v = Math.acos(2 * r() - 1);
    const bump = 1 + 0.09 * Math.sin(5 * u) * Math.sin(6 * v);
    const shell = (i % 9 === 0 ? 0.45 + r() * 0.3 : 0.9 + r() * 0.12) * bump;
    let x = Math.sin(v) * Math.cos(u) * 0.5 * shell;
    const y = Math.cos(v) * 0.62 * shell;
    const z = Math.sin(v) * Math.sin(u) * 0.85 * shell;
    x = hemi * (0.52 + Math.abs(x)) - hemi * 0.04; // two hemispheres with a gap
    nodes.push({ x, y: y * (y > 0 ? 1 : 0.8), z, sec: 0, born: -1 });
  }
  // reveal order: shuffled, then split into the five sections that "train" it
  const order = nodes.map((_, i) => i).sort(() => r() - 0.5);
  order.forEach((idx, j) => (nodes[idx].sec = Math.min(4, Math.floor((j / N) * 5))));

  // edges: 3 nearest neighbours in the same hemisphere, plus a few bridges across the middle
  const edges: [number, number][] = [];
  const seen = new Set<string>();
  nodes.forEach((a, i) => {
    nodes
      .map((b, j) => ({ j, d: (a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2, same: Math.sign(a.x) === Math.sign(b.x) }))
      .filter((o) => o.j !== i && o.same)
      .sort((p, q) => p.d - q.d)
      .slice(0, 3)
      .forEach(({ j }) => {
        const key = i < j ? `${i}-${j}` : `${j}-${i}`;
        if (!seen.has(key)) {
          seen.add(key);
          edges.push([i, j]);
        }
      });
  });
  const inner = nodes.map((n, i) => ({ i, n })).filter(({ n }) => Math.abs(n.x) < 0.62);
  for (let b = 0; b < 14 && inner.length > 1; b++) {
    const a = inner[Math.floor(r() * inner.length)], c = inner[Math.floor(r() * inner.length)];
    if (Math.sign(a.n.x) !== Math.sign(c.n.x)) edges.push([a.i, c.i]);
  }
  return { nodes, order, edges };
}

export default function Brain() {
  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const box = boxRef.current!;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const { nodes, order, edges } = buildBrain();

    let w = 0, h = 0, raf = 0, visible = false;
    let target = 0; // how many nodes should be shown
    let shown = 0; // how many have been revealed
    let done = false;
    const tiltX = -0.18;
    let rotY = 0.6, mx = 0, my = 0;
    let colors: string[] = [], line = "#2e3946", ink = "#e9edf0";
    const pulses: { e: number; t: number; sp: number }[] = [];

    const readTheme = () => {
      const cs = getComputedStyle(document.documentElement);
      const acc = cs.getPropertyValue("--acc").trim();
      colors = BUILD_COLORS.map(() => acc);
      line = cs.getPropertyValue("--line-2").trim();
      ink = cs.getPropertyValue("--ink").trim();
    };
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = box.clientWidth; h = box.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const onProgress = (e: Event) => {
      const d = (e as CustomEvent<BuildProgress>).detail;
      target = Math.round(d.p * N);
      done = d.p >= 0.999;
    };

    const project = (x: number, y: number, z: number) => {
      const ry = rotY + mx * 0.35, rx = tiltX + my * 0.2;
      const cy = Math.cos(ry), sy = Math.sin(ry), cx = Math.cos(rx), sx = Math.sin(rx);
      const x1 = x * cy - z * sy, z1 = x * sy + z * cy;
      const y1 = y * cx - z1 * sx, z2 = y * sx + z1 * cx;
      const persp = 3.2 / (3.2 + z2);
      const sc = Math.min(w * 0.36, h * 0.46);
      return { sx: w / 2 + x1 * sc * persp, sy: h * 0.5 + y1 * sc * persp, s: persp, z: z2 };
    };

    const draw = (t: number) => {
      raf = requestAnimationFrame(draw);
      if (!visible) return;
      // reveal (or un-reveal when scrolling back up) a few nodes per frame
      if (shown < target) {
        const step = reduced ? target - shown : Math.max(1, Math.ceil((target - shown) / 8));
        for (let s = 0; s < step && shown < target; s++) nodes[order[shown++]].born = t;
      } else if (shown > target) {
        while (shown > target) nodes[order[--shown]].born = -1;
      }
      if (!reduced) rotY += done ? 0.0022 : 0.0012;

      ctx.clearRect(0, 0, w, h);
      const P = nodes.map((n) => {
        if (n.born < 0) return null;
        const a = reduced ? 1 : Math.min(1, (t - n.born) / 900);
        const e = 1 - Math.pow(1 - a, 3);
        // fly in from above, where the data thread arrives
        const p = project(n.x, n.y - (1 - e) * 1.6, n.z * e);
        return { ...p, a: e };
      });

      // edges
      edges.forEach(([i, j]) => {
        const a = P[i], b = P[j];
        if (!a || !b) return;
        const alpha = Math.min(a.a, b.a) * (0.1 + 0.22 * ((a.s + b.s) / 2 - 0.7));
        ctx.strokeStyle = rgba(done ? colors[nodes[i].sec] : line, Math.max(0.04, alpha * (done ? 0.8 : 1)));
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(a.sx, a.sy); ctx.lineTo(b.sx, b.sy); ctx.stroke();
      });

      // pulses travel along edges once the brain is complete (a trickle while it trains)
      if (!reduced && (done ? Math.random() < 0.18 : Math.random() < 0.03) && pulses.length < 22) {
        const e = Math.floor(Math.random() * edges.length);
        if (P[edges[e][0]] && P[edges[e][1]]) pulses.push({ e, t: 0, sp: 0.015 + Math.random() * 0.02 });
      }
      for (let k = pulses.length - 1; k >= 0; k--) {
        const pl = pulses[k];
        const [i, j] = edges[pl.e];
        const a = P[i], b = P[j];
        pl.t += pl.sp;
        if (!a || !b || pl.t >= 1) { pulses.splice(k, 1); continue; }
        const x = a.sx + (b.sx - a.sx) * pl.t, y = a.sy + (b.sy - a.sy) * pl.t;
        const c = colors[nodes[j].sec];
        const g = ctx.createRadialGradient(x, y, 0, x, y, 6);
        g.addColorStop(0, rgba(ink, 0.9)); g.addColorStop(0.35, rgba(c, 0.45)); g.addColorStop(1, rgba(c, 0));
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, 6, 0, Math.PI * 2); ctx.fill();
      }

      // nodes, back to front
      P.map((p, i) => ({ p, i }))
        .filter((o) => o.p)
        .sort((a, b) => b.p!.z - a.p!.z)
        .forEach(({ p, i }) => {
          const c = colors[nodes[i].sec];
          const depth = 0.45 + 0.55 * Math.min(1, Math.max(0, (1.2 - p!.z) / 2.2));
          const rad = (1.8 + (i % 7 === 0 ? 0.9 : 0)) * p!.s;
          const glowR = rad * (p!.a < 1 ? 5 : 3);
          const g = ctx.createRadialGradient(p!.sx, p!.sy, 0, p!.sx, p!.sy, glowR);
          g.addColorStop(0, rgba(c, 0.28 * depth * p!.a)); g.addColorStop(1, rgba(c, 0));
          ctx.fillStyle = g; ctx.beginPath(); ctx.arc(p!.sx, p!.sy, glowR, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = rgba(c, depth * p!.a);
          ctx.beginPath(); ctx.arc(p!.sx, p!.sy, rad, 0, Math.PI * 2); ctx.fill();
        });
    };

    const onMove = (e: PointerEvent) => {
      const r = box.getBoundingClientRect();
      mx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      my = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };

    readTheme(); resize();
    if (window.__build) onProgress(new CustomEvent(BUILD_EVENT, { detail: window.__build }));
    raf = requestAnimationFrame(draw);
    const io = new IntersectionObserver(([en]) => (visible = en.isIntersecting), { rootMargin: "200px" });
    io.observe(box);
    const ro = new ResizeObserver(resize); ro.observe(box);
    const mo = new MutationObserver(readTheme);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    window.addEventListener(BUILD_EVENT, onProgress);
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf); io.disconnect(); ro.disconnect(); mo.disconnect();
      window.removeEventListener(BUILD_EVENT, onProgress);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  // decorative only: the network fills in as the visitor scrolls, with no fake progress readout
  return (
    <div className="brain" ref={boxRef} aria-hidden>
      <canvas ref={canvasRef} />
      <span className="brain-entry" />
    </div>
  );
}
