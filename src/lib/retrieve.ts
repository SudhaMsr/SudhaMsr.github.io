import { chunks, type Chunk } from "@/data/knowledge";

const STOP = new Set(
  "a an and are as at be by can could did do does for from has have her hers how i in is it its me my of on or she sudha tell the their them to was what when where which who why will with you your about any some".split(" "),
);

const norm = (w: string) => w.replace(/(ing|ed|es|s)$/, "");

function tokens(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter((t) => t && !STOP.has(t));
}

// inverse document frequency over keyword stems, so rare terms count more
const df = new Map<string, number>();
for (const c of chunks) {
  for (const stem of new Set(c.keywords.flatMap((k) => tokens(k).map(norm)))) {
    df.set(stem, (df.get(stem) ?? 0) + 1);
  }
}
const idf = (stem: string) => Math.log(1 + chunks.length / (df.get(stem) ?? chunks.length));

export type Hit = { chunk: Chunk; score: number };

export function retrieve(query: string, k = 2): Hit[] {
  const q = query.toLowerCase();
  const qStems = new Set(tokens(query).map(norm));
  if (!qStems.size) return [];

  const hits = chunks.map((chunk) => {
    let score = 0;
    for (const kw of chunk.keywords) {
      const parts = tokens(kw).map(norm);
      if (parts.length > 1) {
        if (q.includes(kw)) score += 3; // exact phrase
      } else if (qStems.has(parts[0])) {
        score += idf(parts[0]);
      }
    }
    return { chunk, score };
  });

  return hits
    .filter((h) => h.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, k);
}
