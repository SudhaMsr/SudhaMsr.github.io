"use client";

import { useState } from "react";
import { skillColor, skills } from "@/data/profile";
import SkillsUniverse from "./SkillsUniverse";

export default function Skills() {
  const [view, setView] = useState<"universe" | "grid">("grid");

  return (
    <>
      <div className="view-toggle" role="group" aria-label="Skills view">
        <button type="button" aria-pressed={view === "grid"} onClick={() => setView("grid")}>
          <span aria-hidden>▦</span> List
        </button>
        <button type="button" aria-pressed={view === "universe"} onClick={() => setView("universe")}>
          <span aria-hidden>✦</span> Interactive 3D view
        </button>
      </div>

      {view === "universe" ? (
        <SkillsUniverse />
      ) : (
        <div className="skills-grid">
          {skills.map((g) => (
            <div key={g.group} className="skill">
              <h3>
                <span className="dot" style={{ background: skillColor(g.domain) }} />
                {g.group}
              </h3>
              <ul>
                {g.items.map((s) => (
                  <li key={s} className="chip">{s}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
