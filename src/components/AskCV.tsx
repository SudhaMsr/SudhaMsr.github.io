"use client";

import { useEffect, useRef, useState } from "react";
import { suggestions } from "@/data/knowledge";
import { retrieve } from "@/lib/retrieve";
import { SendIcon } from "./Icons";

type Msg = { role: "user" | "bot"; text: string; sources?: string[]; pending?: boolean };

const FALLBACK =
  "I couldn't find that in Sudha's CV. Try asking about her LLM, computer vision or analytics work, her education, or whether she can work in the UK. Or email her at sudhamsr23@gmail.com.";

export default function AskCV() {
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      role: "bot",
      text: "Hi! I answer questions about Sudha using her CV. Ask about her projects, skills, experience or availability.",
    },
  ]);
  const [q, setQ] = useState("");
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [msgs]);

  const ask = (question: string) => {
    const text = question.trim();
    if (!text) return;
    setQ("");
    setMsgs((m) => [...m, { role: "user", text }, { role: "bot", text: "", pending: true }]);

    const hits = retrieve(text);
    const top = hits[0];
    const related = hits[1] && hits[1].score >= top.score * 0.7 ? hits[1] : null;
    const answer: Msg = top
      ? {
          role: "bot",
          text: related ? `${top.chunk.answer} ${related.chunk.answer}` : top.chunk.answer,
          sources: [top.chunk.source, ...(related ? [related.chunk.source] : [])],
        }
      : { role: "bot", text: FALLBACK };

    // short pause so the retrieval step reads as a step
    window.setTimeout(() => setMsgs((m) => [...m.slice(0, -1), answer]), 450);
  };

  return (
    <div className="ask">
      <div className="ask-intro">
        <p className="eyebrow">Retrieval demo</p>
        <h2 className="h2" style={{ fontSize: "clamp(28px,3.4vw,40px)" }}>
          Ask my CV <em>anything.</em>
        </h2>
        <p>
          A small retrieval system that finds the most relevant parts of my CV and shows which section each answer came from. It runs
          entirely in your browser, so nothing you type is sent anywhere.
        </p>
        <div className="pipeline" aria-hidden>
          <div><i>1</i>tokenise query → keyword stems</div>
          <div><i>2</i>score CV chunks by IDF-weighted overlap</div>
          <div><i>3</i>return top-k answer + citations</div>
        </div>
      </div>

      <div className="chat">
        <div className="chat-log" ref={logRef} aria-live="polite">
          {msgs.map((m, i) => (
            <div key={i} className={`msg ${m.role}`}>
              {m.pending ? (
                <span className="typing" aria-label="Searching">
                  <i /><i /><i />
                </span>
              ) : (
                <>
                  {m.text}
                  {m.sources && (
                    <div className="src">
                      {m.sources.map((s) => (
                        <span key={s} className="chip">{s}</span>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
        <div className="suggest">
          {suggestions.map((s) => (
            <button key={s} type="button" onClick={() => ask(s)}>
              {s}
            </button>
          ))}
        </div>
        <form
          className="chat-form"
          onSubmit={(e) => {
            e.preventDefault();
            ask(q);
          }}
        >
          <label htmlFor="ask-input" className="sr-only">Ask a question about Sudha</label>
          <input
            id="ask-input"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="e.g. Has she worked with RAG?"
            autoComplete="off"
          />
          <button type="submit" disabled={!q.trim()}>
            Ask <SendIcon />
          </button>
        </form>
      </div>
    </div>
  );
}
