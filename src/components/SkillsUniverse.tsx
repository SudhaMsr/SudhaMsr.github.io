"use client";

import { useEffect, useRef, useState } from "react";
import { rgba } from "@/lib/color";
import { skillColor, skills } from "@/data/profile";

type Node = { x: number; y: number; z: number; label: string; group: number; hub: boolean };

const colorVar = (d: string) => (d === "eng" ? "--ink-2" : `--v-${d}`);

// deterministic pseudo-random so the layout is the same on every visit
function rng(seed: number) {
  return () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
}

function norm(x: number, y: number, z: number) {
  const l = Math.hypot(x, y, z) || 1;
  return [x / l, y / l, z / l];
}

function buildNodes(): Node[] {
  const r = rng(11);
  const nodes: Node[] = [];
  const n = skills.length;
  skills.forEach((g, gi) => {
    // hubs spread evenly on a sphere (Fibonacci lattice)
    const y = 1 - (gi + 0.5) * (2 / n);
    const rad = Math.sqrt(1 - y * y);
    const th = gi * Math.PI * (3 - Math.sqrt(5));
    const hub = [Math.cos(th) * rad, y, Math.sin(th) * rad];
    nodes.push({ x: hub[0], y: hub[1], z: hub[2], label: g.group, group: gi, hub: true });
    // skills scattered on an outer shell around their hub's direction
    g.items.forEach((label) => {
      const [dx, dy, dz] = norm(hub[0] + (r() - 0.5) * 1.1, hub[1] + (r() - 0.5) * 1.1, hub[2] + (r() - 0.5) * 1.1);
      const shell = 1.55 + r() * 0.35;
      nodes.push({ x: dx * shell, y: dy * shell, z: dz * shell, label, group: gi, hub: false });
    });
  });
  return nodes;
}

export default function SkillsUniverse() {
  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const focusRef = useRef<number | null>(null);
  const [focus, setFocus] = useState<number | null>(null);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    focusRef.current = focus;
  }, [focus]);

  useEffect(() => {
    const box = boxRef.current!;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nodes = buildNodes();
    const hubOf = (g: number) => nodes.find((n) => n.hub && n.group === g)!;

    let w = 0, h = 0, raf = 0;
    let rotX = -0.25, rotY = 0.4, velX = 0, velY = reduced ? 0 : 0.0025;
    let drag: { x: number; y: number; t: number } | null = null;
    let hover: Node | null = null;
    let colors: string[] = [];
    let line = "#222b37", ink = "#e9edf0", panel = "#121821", sans = "system-ui";

    const readTheme = () => {
      const cs = getComputedStyle(document.documentElement);
      colors = skills.map((g) => cs.getPropertyValue(colorVar(g.domain)).trim());
      line = cs.getPropertyValue("--line-2").trim();
      ink = cs.getPropertyValue("--ink").trim();
      panel = cs.getPropertyValue("--surface").trim();
      sans = cs.getPropertyValue("--font-geist-sans").trim() || "system-ui";
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    type P = { n: Node; sx: number; sy: number; s: number; z: number };
    let projected: P[] = [];

    const project = (n: { x: number; y: number; z: number }) => {
      const cy = Math.cos(rotY), sy = Math.sin(rotY), cx = Math.cos(rotX), sx = Math.sin(rotX);
      const x1 = n.x * cy - n.z * sy;
      const z1 = n.x * sy + n.z * cy;
      const y1 = n.y * cx - z1 * sx;
      const z2 = n.y * sx + z1 * cx;
      const persp = 6 / (6 + z2);
      // max extent is radius 1.9 at perspective 1.46, so ~2.8 units must fit each half-axis
      const scaleX = Math.min(w * 0.165, h * 0.42);
      const scaleY = h * 0.145;
      return { sx: w / 2 + x1 * scaleX * persp, sy: h * 0.47 + y1 * scaleY * persp, s: persp, z: z2 };
    };

    const draw = () => {
      if (!drag) {
        rotY += velY; rotX += velX;
        velX *= 0.95;
        // ease back to the gentle idle spin after a fling
        const idle = reduced ? 0 : 0.0025;
        velY += (idle - velY) * 0.02;
      }
      rotX = Math.max(-1.2, Math.min(1.2, rotX));

      ctx.clearRect(0, 0, w, h);
      const core = project({ x: 0, y: 0, z: 0 });
      projected = nodes.map((n) => ({ n, ...project(n) }));
      const f = hover ? hover.group : focusRef.current;
      const depth = (z: number) => 0.35 + 0.65 * ((2.2 - z) / 4.4); // nearer = brighter

      // links: core → hub, hub → skill
      for (const p of projected) {
        const from = p.n.hub ? core : project(hubOf(p.n.group));
        const on = f === null || f === p.n.group;
        ctx.strokeStyle = p.n.hub ? rgba(colors[p.n.group], on ? 0.55 : 0.08) : rgba(on && f !== null ? colors[p.n.group] : line, on ? 0.45 * depth(p.z) : 0.06);
        ctx.lineWidth = p.n.hub ? 1.4 : 1;
        ctx.beginPath(); ctx.moveTo(from.sx, from.sy); ctx.lineTo(p.sx, p.sy); ctx.stroke();
      }

      // core
      const g = ctx.createRadialGradient(core.sx, core.sy, 0, core.sx, core.sy, 34);
      g.addColorStop(0, rgba(colors[0], 0.35)); g.addColorStop(1, rgba(colors[0], 0));
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(core.sx, core.sy, 34, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = ink; ctx.beginPath(); ctx.arc(core.sx, core.sy, 5, 0, Math.PI * 2); ctx.fill();

      // dots, back to front
      for (const p of [...projected].sort((a, b) => b.z - a.z)) {
        const on = f === null || f === p.n.group;
        const c = colors[p.n.group];
        if (p.n.hub) {
          const rad = 9 * p.s;
          const glow = ctx.createRadialGradient(p.sx, p.sy, 0, p.sx, p.sy, rad * 3.5);
          glow.addColorStop(0, rgba(c, on ? 0.45 : 0.08)); glow.addColorStop(1, rgba(c, 0));
          ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(p.sx, p.sy, rad * 3.5, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = rgba(c, on ? 1 : 0.25); ctx.beginPath(); ctx.arc(p.sx, p.sy, rad, 0, Math.PI * 2); ctx.fill();
        } else {
          const rad = (hover === p.n ? 5.5 : 3.6) * p.s;
          ctx.fillStyle = rgba(c, on ? depth(p.z) : 0.12);
          ctx.beginPath(); ctx.arc(p.sx, p.sy, rad, 0, Math.PI * 2); ctx.fill();
        }
      }

      // labels: hubs first, then skills nearest the viewer; skip any that would overlap
      const placed: [number, number, number, number][] = [];
      const fits = (x: number, y: number, bw: number, bh: number) =>
        x > 4 && x + bw < w - 4 && !placed.some(([px, py, pw, ph]) => x < px + pw && x + bw > px && y < py + ph && y + bh > py);
      const order = [...projected].sort((a, b) =>
        a.n === hover ? -1 : b.n === hover ? 1 : a.n.hub !== b.n.hub ? (a.n.hub ? -1 : 1) : a.z - b.z,
      );
      ctx.textAlign = "center"; ctx.textBaseline = "middle";
      for (const p of order) {
        const on = f === null || f === p.n.group;
        const isHover = hover === p.n;
        if (!p.n.hub && !isHover && (!on || (f === null && p.z > 0.9))) continue;
        const size = p.n.hub ? 13.5 : isHover ? 14 : 12;
        ctx.font = `${p.n.hub || isHover ? 600 : 450} ${Math.round(size * Math.min(p.s, 1.15))}px ${sans}, system-ui, sans-serif`;
        const tw = ctx.measureText(p.n.label).width;
        const lh = size + 6;
        const ly = p.n.hub ? p.sy - 9 * p.s - 14 : p.sy + 4 * p.s + 10;
        const box: [number, number, number, number] = [p.sx - tw / 2 - 8, ly - lh / 2, tw + 16, lh];
        if (!fits(...box) && !isHover) continue;
        placed.push(box);
        if (p.n.hub) {
          ctx.fillStyle = rgba(panel, on ? 0.82 : 0.4);
          ctx.beginPath(); ctx.roundRect(box[0], box[1], box[2], box[3], lh / 2); ctx.fill();
          ctx.fillStyle = rgba(ink, on ? 1 : 0.3);
        } else {
          ctx.fillStyle = rgba(ink, isHover ? 1 : Math.min(1, depth(p.z) + 0.1));
        }
        ctx.fillText(p.n.label, p.sx, ly);
      }
      raf = requestAnimationFrame(draw);
    };

    const pick = (mx: number, my: number) => {
      let best: P | null = null, bd = 26;
      for (const p of projected) {
        const d = Math.hypot(mx - p.sx, my - p.sy);
        if (d < bd && (!best || p.z < best.z + 0.3)) { best = p; bd = d; }
      }
      return best?.n ?? null;
    };

    const local = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      return [e.clientX - r.left, e.clientY - r.top];
    };
    const onDown = (e: PointerEvent) => {
      canvas.setPointerCapture(e.pointerId);
      drag = { x: e.clientX, y: e.clientY, t: performance.now() };
      velX = velY = 0;
      setDragging(true);
    };
    const onMove = (e: PointerEvent) => {
      if (drag) {
        const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
        rotY += dx * 0.006; rotX += dy * 0.006;
        velY = dx * 0.006; velX = dy * 0.006;
        drag = { x: e.clientX, y: e.clientY, t: performance.now() };
        return;
      }
      const [mx, my] = local(e);
      hover = pick(mx, my);
      canvas.style.cursor = hover ? "pointer" : "grab";
    };
    const onUp = (e: PointerEvent) => {
      if (drag && performance.now() - drag.t > 80) { velX = 0; velY *= 0.3; } // released without a flick
      drag = null;
      setDragging(false);
      if (canvas.hasPointerCapture(e.pointerId)) canvas.releasePointerCapture(e.pointerId);
    };
    const onLeave = () => { hover = null; };
    const onKey = (e: KeyboardEvent) => {
      const k = { ArrowLeft: [0, -0.15], ArrowRight: [0, 0.15], ArrowUp: [-0.15, 0], ArrowDown: [0.15, 0] }[e.key];
      if (k) { e.preventDefault(); rotX += k[0]; rotY += k[1]; }
    };

    readTheme(); resize();
    raf = requestAnimationFrame(draw);
    const ro = new ResizeObserver(resize); ro.observe(box);
    const mo = new MutationObserver(readTheme);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);
    canvas.addEventListener("pointerleave", onLeave);
    canvas.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(raf); ro.disconnect(); mo.disconnect();
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
      canvas.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("keydown", onKey);
    };
  }, []);

  const total = skills.reduce((s, g) => s + g.items.length, 0);

  return (
    <div className={`universe ${dragging ? "is-dragging" : ""}`} ref={boxRef}>
      <canvas
        ref={canvasRef}
        tabIndex={0}
        role="img"
        aria-label={`3D map of ${total} skills in ${skills.length} groups. Drag or use arrow keys to rotate. Switch to grid view for a list.`}
      />
      <div className="uni-hint mono" aria-hidden>
        <span className="uni-drag">⟲</span> drag to explore · {total} skills
      </div>
      <div className="uni-legend">
        {skills.map((g, i) => (
          <button key={g.group} type="button" style={{ "--c": skillColor(g.domain) } as React.CSSProperties} aria-pressed={focus === i} onClick={() => setFocus((f) => (f === i ? null : i))}>
            <span className="dot" style={{ background: skillColor(g.domain) }} />
            {g.group}
          </button>
        ))}
      </div>
    </div>
  );
}
