"use client";

import { useState } from "react";
import { domains, projects, type Domain, type Project } from "@/data/profile";
import ProjectCover from "./ProjectCover";
import { ArrowUpRight, GitHubIcon } from "./Icons";

const featured = projects.filter((p) => p.featured);
const supporting = projects.filter((p) => !p.featured);
const order = (Object.keys(domains) as Domain[]).filter((d) => supporting.some((p) => p.domain === d));

function Links({ p }: { p: Project }) {
  if (!p.links?.code && !p.links?.demo && !p.codeNote) return null;
  return (
    <div className="proj-links">
      {p.links?.code && (
        <a href={p.links.code} target="_blank" rel="noopener" className="proj-link">
          <GitHubIcon /> {p.links.codeLabel ?? "Code"}
          <span className="sr-only"> for {p.title} on GitHub (opens in a new tab)</span>
        </a>
      )}
      {p.links?.demo && (
        <a href={p.links.demo} target="_blank" rel="noopener" className="proj-link">
          <ArrowUpRight /> Live demo<span className="sr-only"> of {p.title} (opens in a new tab)</span>
        </a>
      )}
      {p.codeNote && <p className="code-note">{p.codeNote}</p>}
    </div>
  );
}

function Top({ p, flag }: { p: Project; flag?: boolean }) {
  return (
    <div className="proj-top">
      <span className="domain">
        <span className="dot" style={{ background: domains[p.domain].color }} />
        {domains[p.domain].label}
      </span>
      {flag && <span className="proj-flag">Featured</span>}
      {p.year && <span className="mono proj-year">{p.year}</span>}
    </div>
  );
}

/** Flagship project: the same structure every time, so a reviewer knows where to look. */
function CaseStudy({ p, n }: { p: Project; n: number }) {
  const c = p.caseStudy!;
  const id = `case-${p.slug}`;
  return (
    <article id={`p-${p.slug}`} className="proj case reveal" aria-labelledby={id} style={{ "--c": domains[p.domain].color } as React.CSSProperties}>
      <div className="proj-cover case-cover">
        <ProjectCover slug={p.slug} />
        <span className="case-num mono" aria-hidden>
          0{n}
        </span>
      </div>
      <div className="case-head">
        <Top p={p} flag />
        <h3 id={id}>{p.title}</h3>
        <p className="proj-tagline">{p.tagline}</p>
        {p.status && <p className="case-status mono">{p.status}</p>}
        <dl className="case-dl">
          <div>
            <dt>Problem &amp; intended user</dt>
            <dd>{c.problem}</dd>
          </div>
          <div>
            <dt>My contribution</dt>
            <dd>
              <ul className="pts">
                {c.contribution.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>
      </div>

      <div className="case-body">
        <h4 className="case-h">Evaluation &amp; measured results</h4>
        <ul className="case-metrics">
          {c.evaluation.map((m) => (
            <li key={m.label}>
              <span className="case-metric-label">{m.label}</span>
              <b>{m.value}</b>
              <small>{m.note}</small>
            </li>
          ))}
        </ul>
        <p className="case-unmeasured">
          <span className="mono">Not yet measured:</span> {c.notMeasured.join(" · ")}
        </p>

        <details className="case-more">
          <summary>Architecture, limitations{c.reproduce ? " and how to reproduce" : ""}</summary>
          <div className="case-more-grid">
            <div>
              <h4 className="case-h">Technologies &amp; architecture</h4>
              <ul className="pts">
                {c.architecture.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="case-h">Trade-offs &amp; limitations</h4>
              <ul className="pts">
                {c.limitations.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
              {c.reproduce && (
                <>
                  <h4 className="case-h">Reproduce</h4>
                  <pre className="case-pre">
                    <code>{c.reproduce.join("\n")}</code>
                  </pre>
                </>
              )}
            </div>
          </div>
        </details>

        <div className="proj-foot">
          <p className="stack mono">{p.stack.join(" · ")}</p>
          <Links p={p} />
        </div>
      </div>
    </article>
  );
}

function Card({ p }: { p: Project }) {
  return (
    <article id={`p-${p.slug}`} className="proj reveal" style={{ "--c": domains[p.domain].color } as React.CSSProperties}>
      <div className="proj-body">
        <Top p={p} />
        <h4 className="proj-title">{p.title}</h4>
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
  const list = filter === "all" ? supporting : supporting.filter((p) => p.domain === filter);

  return (
    <>
      <div className="cases">
        {featured.map((p, i) => (
          <CaseStudy key={p.slug} p={p} n={i + 1} />
        ))}
      </div>

      <div className="sec-head support-head" id="more-projects">
        <div>
          <h3 className="h3">Other projects</h3>
          <p className="lead" style={{ marginTop: 8 }}>
            Earlier, smaller or private work. Links appear where the code is public.
          </p>
        </div>
        <div className="filters" role="group" aria-label="Filter other projects by field">
          <button type="button" aria-pressed={filter === "all"} onClick={() => setFilter("all")} aria-label={`All other projects, ${supporting.length}`}>
            All <span className="count">{supporting.length}</span>
          </button>
          {order.map((d) => (
            <button
              key={d}
              type="button"
              aria-pressed={filter === d}
              onClick={() => setFilter(d)}
              aria-label={`${domains[d].label}, ${supporting.filter((p) => p.domain === d).length} projects`}
            >
              <span className="dot" style={{ background: domains[d].color }} />
              {domains[d].label}
              <span className="count">{supporting.filter((p) => p.domain === d).length}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="proj-grid support-grid">
        {list.map((p) => (
          <Card key={p.slug} p={p} />
        ))}
      </div>
    </>
  );
}
