"use client";

import { useEffect, useRef, useState } from "react";
import { suggestions } from "@/data/knowledge";
import { retrieve } from "@/lib/retrieve";
import { SendIcon } from "./Icons";

type Msg = { role: "user" | "bot"; text: string; sources?: string[] };

const FALLBACK =
  "I couldn't find that in Sudha's CV. Try asking about her LLM, computer vision or analytics work, her education, or where she is based. Or email her at sudhamsr23@gmail.com.";

export default function AskCV() {
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      role: "bot",
      text: "Ask about Sudha's projects, skills, experience or location. I match your words against short passages from her CV.",
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
    setMsgs((m) => [...m, { role: "user", text }, answer]);
  };

  return (
    <div className="ask">
      <div className="ask-intro">
        <p className="eyebrow">Retrieval demo</p>
        <h2 className="h2" style={{ fontSize: "clamp(28px,3.4vw,40px)" }}>
          Search <em>my CV.</em>
        </h2>
        <p>
          A small keyword-retrieval demo, not a generative model: it scores short passages from my CV against your question and shows
          which section each answer came from. It runs entirely in your browser, so nothing you type is sent anywhere.
        </p>
        <div className="pipeline">
          <div><i>1</i>Split the question into keyword stems</div>
          <div><i>2</i>Score CV passages by IDF-weighted keyword overlap</div>
          <div><i>3</i>Show the best one or two passages and their sources</div>
        </div>
      </div>

      <div className="chat">
        <div className="chat-log" ref={logRef} aria-live="polite">
          {msgs.map((m, i) => (
            <div key={i} className={`msg ${m.role}`}>
              {m.text}
              {m.sources && (
                <div className="src">
                  {m.sources.map((s) => (
                    <span key={s} className="chip">{s}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="suggest" role="group" aria-label="Example questions">
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
