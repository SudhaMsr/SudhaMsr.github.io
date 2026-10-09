"use client";

import { useState } from "react";
import { domains, projects, type Domain, type Project } from "@/data/profile";
import ProjectCover from "./ProjectCover";
import { ArrowUpRight, GitHubIcon } from "./Icons";

const featured = projects.filter((p) => p.featured);
const order = Object.keys(domains) as Domain[];

function Links({ p }: { p: Project }) {
  if (!p.links?.code && !p.links?.demo) return null;
  return (
    <div className="proj-links">
      {p.links.code && (
        <a href={p.links.code} target="_blank" rel="noopener" className="proj-link">
          <GitHubIcon /> Code
        </a>
      )}
      {p.links.demo && (
        <a href={p.links.demo} target="_blank" rel="noopener" className="proj-link">
          <ArrowUpRight /> Live demo
        </a>
      )}
    </div>
  );
}

function Card({ p, lead = false }: { p: Project; lead?: boolean }) {
  return (
    <article
      id={`p-${p.slug}`}
      className={`proj reveal ${lead ? "proj-lead" : ""}`}
      style={{ "--c": domains[p.domain].color } as React.CSSProperties}
    >
      <div className="proj-cover">
        <ProjectCover slug={p.slug} />
      </div>
      <div className="proj-body">
        <div className="proj-top">
          <span className="domain">
            <span className="dot" style={{ background: domains[p.domain].color }} />
            {domains[p.domain].label}
          </span>
          {lead && <span className="proj-flag">Featured</span>}
          {p.year && <span className="mono proj-year">{p.year}</span>}
        </div>
        <h3>{p.title}</h3>
        <p className="proj-tagline">{p.tagline}</p>
        {p.points.length > 0 && (
          <ul className="pts">
            {p.points.map((pt) => (
              <li key={pt}>{pt}</li>
            ))}
          </ul>
        )}
        <div className="proj-foot">
          <p className="stack mono">{p.stack.join(" · ")}</p>
          <Links p={p} />
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState<Domain | "all">("all");
  const list = filter === "all" ? featured : featured.filter((p) => p.domain === filter);
  // with no filter, the first project gets the large featured card
  const lead = filter === "all" ? list[0] : null;
  const rest = lead ? list.slice(1) : list;

  return (
    <>
      <div className="filters" role="group" aria-label="Filter projects by field">
        <button type="button" aria-pressed={filter === "all"} onClick={() => setFilter("all")} aria-label={`All projects, ${featured.length}`}>
          All <span className="count">{featured.length}</span>
        </button>
        {order.map((d) => (
          <button
            key={d}
            type="button"
            aria-pressed={filter === d}
            onClick={() => setFilter(d)}
            aria-label={`${domains[d].label}, ${featured.filter((p) => p.domain === d).length} projects`}
          >
            <span className="dot" style={{ background: domains[d].color }} />
            {domains[d].label}
            <span className="count">{featured.filter((p) => p.domain === d).length}</span>
          </button>
        ))}
      </div>

      {lead && <Card p={lead} lead />}
      <div className="proj-grid">
        {rest.map((p) => (
          <Card key={p.slug} p={p} />
        ))}
      </div>
    </>
  );
}
