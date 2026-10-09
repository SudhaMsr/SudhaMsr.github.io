"use client";

import { useEffect, useRef, useState } from "react";
import { BUILD_COLORS as LAYER_COLORS, BUILD_EVENT, BUILD_SECTIONS as LAYER_SECTIONS, type BuildProgress } from "@/lib/build";

type Geo = { w: number; h: number; d: string; x: number; ys: number[]; y0: number; yEnd: number };

/**
 * A glowing thread down the side of the page that draws itself as you scroll. Each section it
 * passes lights a node and "trains" one layer of the contact network; at Contact it curves into
 * the network's input layer.
 */
export default function ScrollThread() {
  const [geo, setGeo] = useState<Geo | null>(null);
  const [built, setBuilt] = useState(0);
  const pathRef = useRef<SVGPathElement>(null);
  const headRef = useRef<SVGGElement>(null);

  // measure section positions and the network's input node
  useEffect(() => {
    const main = document.querySelector("main");
    if (!main) return;
    const measure = () => {
      const mr = main.getBoundingClientRect();
      const top = (el: Element | null) => (el ? el.getBoundingClientRect().top - mr.top : 0);
      const wrap = document.querySelector("#about .wrap");
      const inNode = document.querySelector(".brain-entry");
      if (!wrap || !inNode) return;
      const x = Math.round(Math.max(8, wrap.getBoundingClientRect().left - mr.left - 40));
      const ys = LAYER_SECTIONS.map((id) => Math.round(top(document.getElementById(id)) + 60));
      const ir = inNode.getBoundingClientRect();
      const xIn = Math.round(ir.left + ir.width / 2 - mr.left);
      const yIn = Math.round(ir.top + ir.height / 2 - mr.top);
      const y0 = ys[0] - 50;
      const turn = yIn - 80;
      const d = `M${x} ${y0} V${turn} C${x} ${yIn} ${xIn - Math.min(220, (xIn - x) * 0.6)} ${yIn} ${xIn} ${yIn}`;
      setGeo({ w: Math.round(mr.width), h: Math.round(main.scrollHeight), d, x, ys, y0, yEnd: yIn });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(main);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  // draw the thread and train the network as the visitor scrolls
  useEffect(() => {
    const path = pathRef.current;
    const main = document.querySelector("main");
    if (!geo || !path || !main) return;
    const L = path.getTotalLength();
    let raf = 0, lastY = window.scrollY;
    const update = () => {
      const mainTop = main.getBoundingClientRect().top + window.scrollY;
      const reach = window.scrollY + window.innerHeight * 0.62 - mainTop;
      const p = Math.min(1, Math.max(0, (reach - geo.y0) / (geo.yEnd - geo.y0)));
      path.style.strokeDashoffset = String(1 - p);
      const pt = path.getPointAtLength(p * L);
      headRef.current?.setAttribute("transform", `translate(${pt.x} ${pt.y})`);
      if (headRef.current) headRef.current.style.opacity = p > 0 ? "1" : "0";

      const k = geo.ys.filter((y) => reach > y).length;
      setBuilt(k);
      const root = document.documentElement.classList;
      for (let i = 1; i <= LAYER_SECTIONS.length; i++) root.toggle(`built-${i}`, k >= i);
      root.toggle("built-done", p >= 0.999);

      const svgLeft = path.ownerSVGElement?.getBoundingClientRect().left ?? 0;
      const detail: BuildProgress = { p, k, x: svgLeft + geo.x, dy: window.scrollY - lastY };
      lastY = window.scrollY;
      window.__build = detail;
      window.dispatchEvent(new CustomEvent(BUILD_EVENT, { detail }));
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, [geo]);

  if (!geo) return null;
  return (
    <svg className="thread" width={geo.w} height={geo.h} viewBox={`0 0 ${geo.w} ${geo.h}`} aria-hidden>
      <path d={geo.d} className="thread-track" />
      <path ref={pathRef} d={geo.d} className="thread-line" pathLength={1} />
      {geo.ys.map((y, i) => (
        <g key={LAYER_SECTIONS[i]} className={`thread-node ${built > i ? "on" : ""}`} style={{ "--c": `var(${LAYER_COLORS[i]})` } as React.CSSProperties}>
          <circle cx={geo.x} cy={y} r="10" className="thread-halo" />
          <circle cx={geo.x} cy={y} r="4.5" className="thread-dot" />
        </g>
      ))}
      <g ref={headRef} className="thread-head">
        <circle r="9" className="thread-head-glow" />
        <circle r="3.5" className="thread-head-core" />
      </g>
    </svg>
  );
}
