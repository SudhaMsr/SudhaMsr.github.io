"use client";

import { useEffect, useState } from "react";

/**
 * Bubu, a little guide that always sits in the corner (GIF via Tenor's official embed)
 * with a speech bubble whose message follows the section in view.
 */

const TIPS: Record<string, string> = {
  hero: "Hi, I’m Bubu! Ask me about Sudha",
  about: "This is Sudha’s model card, documented like an ML model.",
  skills: "Grab the skills universe and give it a spin!",
  projects: "Hover a project. Each one glows in its field colour.",
  experience: "Click any bar on the timeline to jump to that role.",
  education: "MSc Data Science from the University of Bristol!",
  ask: "Ask me anything about Sudha. I’ll find it in her CV!",
  contact: "Say hi to Sudha! You can copy her email with one click.",
};
const GIF_ID = "742968837071118085";

export default function Mascot() {
  const [section, setSection] = useState("hero");

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setSection(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    Object.keys(TIPS).forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <div className="bit">
      <div className="bit-bubble" role="status">
        <p key={section}>
          {TIPS[section] ?? TIPS.hero}
          {section === "hero" && <span className="bit-love"> ♥</span>}
        </p>
        {section !== "ask" && (
          <div className="bit-actions">
            <a href="#ask">Ask about Sudha</a>
          </div>
        )}
      </div>
      <a href="#ask" className="bit-btn" aria-label="Bubu: ask about Sudha">
        <iframe
          className="bit-gif"
          src={`https://tenor.com/embed/${GIF_ID}`}
          title="Bubu eating at the computer (GIF via Tenor)"
          loading="lazy"
          tabIndex={-1}
          aria-hidden
        />
      </a>
    </div>
  );
}
