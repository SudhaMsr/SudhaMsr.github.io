"use client";

import { useEffect, useRef, useState } from "react";
import { experience, experienceMix, type RoleType } from "@/data/profile";
import { ChevronDown } from "./Icons";

const SHOWN = 5;

/** Role types, in legend order, with the colour token each uses. */
const TYPES: Record<RoleType, { label: string; color: string }> = {
  freelance: { label: "Freelance", color: "var(--v-vision)" },
  internship: { label: "Internship", color: "var(--v-nlp)" },
  consulting: { label: "Consulting", color: "var(--v-analytics)" },
  academic: { label: "University project", color: "var(--v-llm)" },
  research: { label: "Independent research", color: "var(--v-ml)" },
};

// ── dates: "Aug 2026 – Present" → month indexes (year * 12 + month)
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const NOW = 2026 * 12 + 9; // Oct 2026
const toMonth = (s: string) => {
  if (/present/i.test(s)) return NOW;
  const [m, y] = s.trim().split(/\s+/);
  return Number(y) * 12 + MONTHS.indexOf(m);
};
const span = (r: { dates: string }) => {
  const [a, b] = r.dates.split("–");
  return [toMonth(a), toMonth(b) + 1] as const; // end month is inclusive
};
const START = 2021 * 12; // Jan 2021
const END = 2027 * 12; // Jan 2027
const pct = (m: number) => ((m - START) / (END - START)) * 100;
const YEARS = [2021, 2022, 2023, 2024, 2025, 2026];

export default function Experience() {
  const [all, setAll] = useState(false);
  const [open, setOpen] = useState<Set<number>>(new Set([0]));
  const [active, setActive] = useState(0); // role currently being read
  const [hover, setHover] = useState<number | null>(null);
  const cardRefs = useRef<(HTMLLIElement | null)[]>([]);
  const roles = all ? experience : experience.slice(0, SHOWN);

  // light up the bar for the card in the middle of the screen
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    cardRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [roles.length]);

  const toggle = (i: number) =>
    setOpen((s) => {
      const next = new Set(s);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  const jumpTo = (i: number) => {
    if (i >= SHOWN) setAll(true);
    setOpen((s) => new Set(s).add(i));
    // wait for the card to render if it was hidden
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        cardRefs.current[i]?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" });
      }),
    );
  };

  const shown = hover ?? active;
  const sr = experience[shown];

  return (
    <div className="xp">
      <div className="xp-side">
        <p className="eyebrow">Experience</p>
        <h2 className="h2">
          Internships, freelance work <em>and project partnerships.</em>
        </h2>
        <p className="lead">Since 2021: {experienceMix.join(", ")}. Each role is labelled with its type.</p>

        <figure className="xp-chart">
          <div className="xp-chart-bar mono">
            <span>
              <b>Timeline</b>
            </span>
            <span>2021 → now</span>
          </div>
          <div className="xp-legend">
            {(Object.keys(TYPES) as RoleType[]).map((t) => (
              <span key={t}>
                <i style={{ background: TYPES[t].color }} />
                {TYPES[t].label}
              </span>
            ))}
          </div>
          <div className="xp-plot" onMouseLeave={() => setHover(null)}>
            <div className="xp-axis" aria-hidden>
              {YEARS.map((y) => (
                <span key={y} style={{ left: `${pct(y * 12)}%` }}>
                  {String(y).slice(2)}
                </span>
              ))}
              <span className="now" style={{ left: `${pct(NOW)}%` }}>
                now
              </span>
            </div>
            <ol className="xp-rows">
              {experience.map((r, i) => {
                const [a, b] = span(r);
                return (
                  <li key={r.org + r.dates}>
                    <button
                      type="button"
                      className={`xp-row ${i === shown ? "on" : ""}`}
                      style={{ "--c": TYPES[r.type].color } as React.CSSProperties}
                      onMouseEnter={() => setHover(i)}
                      onFocus={() => setHover(i)}
                      onBlur={() => setHover(null)}
                      onClick={() => jumpTo(i)}
                      aria-label={`${r.title}, ${r.org}, ${r.dates}. Show details`}
                    >
                      <span className="xp-row-org">{r.short}</span>
                      <span className="xp-track">
                        {YEARS.map((y) => (
                          <i key={y} className="grid" style={{ left: `${pct(y * 12)}%` }} />
                        ))}
                        <span className="xp-bar" style={{ left: `${pct(a)}%`, width: `max(6px, ${pct(b) - pct(a)}%)` }} />
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
          <figcaption className="xp-readout" aria-live="polite">
            <span className="dot" style={{ background: TYPES[sr.type].color }} />
            <span>
              <b>{sr.title}</b> · {sr.org}
              <small className="mono">{sr.dates}</small>
            </span>
          </figcaption>
        </figure>
      </div>

      <div>
        <ol className="xp-list">
          {roles.map((r, i) => {
            const isOpen = open.has(i);
            const id = `xp-details-${i}`;
            const t = TYPES[r.type];
            return (
              <li
                key={r.org + r.dates}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                data-i={i}
                className={`xp-item reveal ${i === 0 ? "now" : ""} ${i === active ? "is-active" : ""}`}
                style={{ "--c": t.color } as React.CSSProperties}
              >
                <div className={`xp-card ${i === 0 ? "xp-current" : ""}`}>
                  <div className="xp-head">
                    <span className="xp-mark" aria-hidden>
                      {r.mark}
                    </span>
                    <div className="xp-headtext">
                      <h3>{r.title}</h3>
                      <p className="xp-org">{r.org}</p>
                      <div className="xp-meta">
                        <span className="mono">{r.dates}</span>
                        <span>{r.place}</span>
                        <span className="xp-type">{t.label}</span>
                        {i === 0 && <span className="xp-live">Current</span>}
                      </div>
                    </div>
                  </div>
                  <p className="xp-summary">{r.summary}</p>
                  <button type="button" className="xp-toggle" aria-expanded={isOpen} aria-controls={id} onClick={() => toggle(i)}>
                    What I did <span className="xp-count">{r.points.length}</span>
                    <span className="chev" aria-hidden>
                      <ChevronDown />
                    </span>
                  </button>
                  <div id={id} className="xp-details" hidden={!isOpen}>
                    <ul>
                      {r.points.map((pt) => (
                        <li key={pt}>{pt}</li>
                      ))}
                    </ul>
                    <p className="xp-tags mono">{r.tags.join(" · ")}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
        {experience.length > SHOWN && (
          <button type="button" className="btn ghost more-btn" onClick={() => setAll((a) => !a)} aria-expanded={all}>
            {all ? "Show fewer roles" : `Show ${experience.length - SHOWN} earlier roles`}
            <span className="chev" aria-hidden>
              <ChevronDown />
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
