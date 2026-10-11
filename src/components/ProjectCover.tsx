/**
 * Illustrations of how each project works. Abstract on purpose: they explain the
 * mechanism (boxes, waveforms, chunks, attention) rather than imitate screenshots.
 * Colours come from CSS classes so they follow the theme and the card's field colour (--c).
 */

const r2 = (n: number) => Math.round(n * 100) / 100;

function VisionAssist() {
  return (
    <svg viewBox="0 0 480 300" aria-hidden className="cv">
      {/* street in perspective */}
      <path className="l" d="M0 210 H480" />
      <path className="l" d="M240 120 L40 300 M240 120 L440 300 M240 120 L170 300 M240 120 L310 300" opacity=".55" />
      <path className="l" d="M0 120 H480" opacity=".35" />
      {/* detections */}
      <g className="blink">
        <rect className="box" x="78" y="96" width="62" height="128" rx="4" />
        <rect className="c" x="78" y="80" width="54" height="16" rx="3" />
        <text className="lbl" x="84" y="92">person</text>
      </g>
      <g className="blink d2">
        <rect className="box dash" x="268" y="206" width="132" height="42" rx="4" />
        <rect className="c" x="268" y="190" width="40" height="16" rx="3" />
        <text className="lbl" x="274" y="202">kerb</text>
      </g>
      <g className="blink d3">
        <rect className="box" x="318" y="118" width="74" height="62" rx="4" opacity=".75" />
        <rect className="c" x="318" y="102" width="58" height="16" rx="3" opacity=".75" />
        <text className="lbl" x="324" y="114">bicycle</text>
      </g>
      {/* scanning line */}
      <rect className="scan" x="0" y="0" width="480" height="2" />
      {/* spoken guidance */}
      <g transform="translate(24 24)">
        <rect className="s bd" width="196" height="44" rx="22" />
        <circle className="c" cx="22" cy="22" r="10" opacity=".25" />
        <path className="cs" d="M18 18 v8 M22 15 v14 M26 18 v8" strokeWidth="2" strokeLinecap="round" />
        <text className="t" x="42" y="27">“Kerb ahead, step down”</text>
      </g>
    </svg>
  );
}

function Speech() {
  const bars = Array.from({ length: 34 }, (_, i) => r2(8 + Math.abs(Math.sin(i * 0.55) * Math.cos(i * 0.17)) * 70));
  return (
    <svg viewBox="0 0 480 220" aria-hidden className="cv">
      <g className="wave">
        {bars.map((h, i) => (
          <rect key={i} className="c" x={24 + i * 5.4} y={r2(110 - h / 2)} width="3" height={h} rx="1.5" opacity={i % 6 === 0 ? 1 : 0.6} />
        ))}
      </g>
      <path className="cs flow" d="M218 110 H262" strokeWidth="2" strokeDasharray="4 5" />
      <path className="cs" d="M256 104 l8 6 -8 6" strokeWidth="2" fill="none" />
      {[52, 92, 132, 172].map((y, i) => (
        <g key={y}>
          <rect className="m" x="282" y={y - 6} width={[120, 96, 132, 84][i]} height="8" rx="4" opacity=".55" />
          <rect className={i === 2 ? "neg" : "c"} x={[410, 386, 422, 374][i] - 6} y={y - 9} width="44" height="14" rx="7" opacity=".9" />
          <text className={i === 2 ? "lbl lbl-neg" : "lbl"} x={[410, 386, 422, 374][i]} y={y + 1}>{i === 2 ? "neg" : "pos"}</text>
        </g>
      ))}
      <text className="t sm" x="282" y="206">transcript · sentiment · summary</text>
    </svg>
  );
}

function Rag() {
  return (
    <svg viewBox="0 0 480 220" aria-hidden className="cv">
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${24 + i * 14} ${30 + i * 14})`}>
          <rect className="s bd" width="92" height="118" rx="6" />
          {[18, 32, 46, 60, 74, 88].map((y) => (
            <rect key={y} className="m" x="12" y={y} width={y % 28 ? 60 : 68} height="5" rx="2.5" opacity=".45" />
          ))}
        </g>
      ))}
      {/* chunks become vectors */}
      {[60, 92, 124, 156].map((y, i) => (
        <g key={y}>
          <rect className="c" x="168" y={y} width="40" height="18" rx="4" opacity={0.35 + i * 0.15} />
          <path className="cs flow" d={`M212 ${y + 9} C 240 ${y + 9}, 250 108, 282 108`} fill="none" strokeWidth="1.5" opacity=".6" />
        </g>
      ))}
      <g transform="translate(278 62)">
        <rect className="s bd" width="184" height="92" rx="14" />
        <rect className="m" x="16" y="20" width="132" height="7" rx="3.5" opacity=".6" />
        <rect className="m" x="16" y="36" width="112" height="7" rx="3.5" opacity=".6" />
        <rect className="m" x="16" y="52" width="80" height="7" rx="3.5" opacity=".6" />
        <rect className="c" x="96" y="48" width="76" height="16" rx="8" />
        <text className="lbl" x="104" y="60">source p.4</text>
      </g>
      <text className="t sm" x="284" y="178">grounded answer + citation</text>
    </svg>
  );
}

function Screener() {
  const scores = [85, 82, 72, 60, 34, 15];
  return (
    <svg viewBox="0 0 480 220" aria-hidden className="cv">
      {/* CVs with personal details redacted */}
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${24 + i * 14} ${30 + i * 14})`}>
          <rect className="s bd" width="92" height="118" rx="6" />
          <rect className="t-fill" x="12" y="14" width="52" height="9" rx="2" />
          {[34, 48, 62, 76, 90].map((y) => (
            <rect key={y} className="m" x="12" y={y} width={y % 28 ? 60 : 68} height="5" rx="2.5" opacity=".45" />
          ))}
        </g>
      ))}
      <path className="cs flow" d="M168 108 H206" strokeWidth="2" strokeDasharray="4 5" />
      <path className="cs" d="M200 102 l8 6 -8 6" strokeWidth="2" fill="none" />
      {/* ranked, explainable scores */}
      {scores.map((v, i) => (
        <g key={v} transform={`translate(226 ${34 + i * 26})`}>
          <rect className="m" width="196" height="12" rx="6" opacity=".18" />
          <rect className="c" width={r2(v * 1.96)} height="12" rx="6" opacity={0.45 + v / 200} />
          <text className="t sm" x="206" y="10">{v}</text>
        </g>
      ))}
      <text className="t sm" x="226" y="206">skills · nice-to-haves · TF-IDF</text>
    </svg>
  );
}

function Manaswel() {
  return (
    <svg viewBox="0 0 480 220" aria-hidden className="cv">
      <g transform="translate(40 26)">
        <rect className="s bd" width="210" height="40" rx="14" />
        <rect className="m" x="16" y="16" width="150" height="7" rx="3.5" opacity=".6" />
      </g>
      <g transform="translate(110 80)">
        <rect className="c" width="230" height="44" rx="14" opacity=".22" />
        <rect className="c" x="16" y="13" width="170" height="7" rx="3.5" opacity=".8" />
        <rect className="c" x="16" y="25" width="120" height="7" rx="3.5" opacity=".6" />
      </g>
      {/* emotional tone over the conversation */}
      <path className="cs" d="M40 186 C 90 150, 120 196, 170 170 S 250 140, 300 160 S 380 176, 440 150" fill="none" strokeWidth="2.5" />
      {[[170, 170], [300, 160], [440, 150]].map(([x, y]) => (
        <circle key={x} className="c" cx={x} cy={y} r="4" />
      ))}
      <text className="t sm" x="40" y="146">tone</text>
      {/* on-device lock */}
      <g transform="translate(392 30)">
        <rect className="s bd" width="56" height="56" rx="14" />
        <rect className="cs-only" x="18" y="26" width="20" height="16" rx="3" />
        <path className="cs" d="M22 26 v-5 a6 6 0 0 1 12 0 v5" fill="none" strokeWidth="2" />
      </g>
      <text className="t sm" x="370" y="104">on-device</text>
    </svg>
  );
}

function MedVision({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 480 220" aria-hidden className="cv">
      <defs>
        <radialGradient id={`hm-${id}`}>
          <stop offset="0" className="stop-c" stopOpacity=".85" />
          <stop offset="1" className="stop-c" stopOpacity="0" />
        </radialGradient>
      </defs>
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${30 + i * 148} 26)`}>
          <rect className="s bd" width="128" height="150" rx="10" />
          <ellipse className="scanimg" cx="64" cy="72" rx={44 - i * 4} ry={52 - i * 6} />
          <ellipse className="scanimg" cx="64" cy="72" rx={28 - i * 3} ry={34 - i * 4} opacity=".6" />
          {i === 1 && (
            <>
              <circle cx="80" cy="58" r="30" fill={`url(#hm-${id})`} />
              <rect className="box" x="58" y="36" width="44" height="44" rx="4" />
            </>
          )}
          <text className="t sm" x="10" y="142">{["X-ray", "MRI", "retina"][i]}</text>
        </g>
      ))}
      <rect className="scan" x="0" y="0" width="480" height="2" />
    </svg>
  );
}

function TweetEmotion() {
  const emo = [
    ["joy", 0.72],
    ["optimism", 0.55],
    ["anger", 0.14],
    ["sadness", 0.08],
  ] as const;
  return (
    <svg viewBox="0 0 480 220" aria-hidden className="cv">
      <g transform="translate(24 30)">
        <rect className="s bd" width="190" height="150" rx="14" />
        <circle className="m" cx="26" cy="28" r="12" opacity=".5" />
        <rect className="m" x="46" y="22" width="80" height="7" rx="3.5" opacity=".6" />
        {[60, 76, 92, 108].map((y, i) => (
          <rect key={y} className="m" x="16" y={y} width={[158, 140, 150, 96][i]} height="7" rx="3.5" opacity=".45" />
        ))}
      </g>
      {emo.map(([name, v], i) => (
        <g key={name} transform={`translate(244 ${44 + i * 36})`}>
          <text className="t sm" x="0" y="10">{name}</text>
          <rect className="m" x="76" y="0" width="160" height="12" rx="6" opacity=".18" />
          <rect className="c grow" x="76" y="0" width={r2(160 * v)} height="12" rx="6" opacity={i < 2 ? 1 : 0.5} />
        </g>
      ))}
    </svg>
  );
}

function Sentiment() {
  const words = ["oh", "great,", "another", "Monday", "meeting"];
  const xs = [40, 96, 176, 270, 360];
  return (
    <svg viewBox="0 0 480 220" aria-hidden className="cv">
      {/* attention arcs */}
      {[
        [1, 3, 1],
        [1, 4, 0.7],
        [0, 1, 0.5],
        [2, 3, 0.4],
      ].map(([a, b, w]) => (
        <path
          key={`${a}${b}`}
          className="cs"
          d={`M${xs[a] + 20} 120 Q ${(xs[a] + xs[b]) / 2 + 20} ${r2(120 - 40 - (b - a) * 18)} ${xs[b] + 20} 120`}
          fill="none"
          strokeWidth={r2(1 + w * 3)}
          opacity={r2(0.25 + w * 0.6)}
        />
      ))}
      {words.map((w, i) => (
        <g key={w}>
          <rect className={i === 1 ? "c" : "s bd"} x={xs[i] - 8} y="126" width={w.length * 9 + 22} height="30" rx="8" opacity={i === 1 ? 0.25 : 1} />
          <text className="t" x={xs[i] + 3} y="146">{w}</text>
        </g>
      ))}
      <rect className="neg" x="300" y="170" width="156" height="24" rx="12" />
      <text className="lbl lbl-neg" x="314" y="186">negative · sarcasm</text>
    </svg>
  );
}

function ImpactPlatform() {
  return (
    <svg viewBox="0 0 480 220" aria-hidden className="cv">
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${24 + i * 100} 24)`}>
          <rect className="s bd" width="88" height="56" rx="10" />
          <rect className="m" x="12" y="14" width="40" height="6" rx="3" opacity=".5" />
          <rect className={i === 0 ? "c" : "t-fill"} x="12" y="28" width={[54, 44, 60][i]} height="14" rx="4" />
        </g>
      ))}
      {/* activity heatmap */}
      {Array.from({ length: 7 }).map((_, r) =>
        Array.from({ length: 16 }).map((_, c) => {
          const v = Math.abs(Math.sin(r * 1.7 + c * 0.9) * Math.cos(c * 0.3));
          return <rect key={`${r}-${c}`} className="c" x={24 + c * 18} y={98 + r * 14} width="14" height="11" rx="2.5" opacity={r2(0.1 + v * 0.85)} />;
        }),
      )}
      <g transform="translate(340 24)">
        <rect className="s bd" width="116" height="172" rx="10" />
        {[0.8, 0.55, 0.95, 0.4, 0.7].map((v, i) => (
          <rect key={i} className="c grow" x={14 + i * 19} y={r2(150 - v * 110)} width="12" height={r2(v * 110)} rx="3" opacity={0.5 + v * 0.5} />
        ))}
      </g>
    </svg>
  );
}

// fixed pseudo-random cluster of "normal" transactions
const fraudPoints = (() => {
  let seed = 9;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
  return Array.from({ length: 70 }, () => {
    const a = rnd() * Math.PI * 2, d = Math.sqrt(rnd());
    return [r2(190 + Math.cos(a) * d * 110), r2(112 + Math.sin(a) * d * 62)];
  });
})();

function Fraud() {
  const pts = fraudPoints;
  const outliers = [
    [410, 50],
    [420, 178],
    [60, 186],
  ];
  return (
    <svg viewBox="0 0 480 220" aria-hidden className="cv">
      <path className="l" d="M30 200 H460 M30 200 V20" />
      {pts.map(([x, y], i) => (
        <circle key={i} className="m" cx={x} cy={y} r="3.2" opacity=".55" />
      ))}
      {outliers.map(([x, y], i) => (
        <g key={i} className={`blink d${i + 1}`}>
          <circle className="neg" cx={x} cy={y} r="5" />
          <circle className="ring" cx={x} cy={y} r="14" />
        </g>
      ))}
      <rect className="neg" x="330" y="96" width="110" height="22" rx="11" />
      <text className="lbl lbl-neg" x="344" y="111">anomaly flagged</text>
    </svg>
  );
}

export default function ProjectCover({ slug }: { slug: string }) {
  switch (slug) {
    case "vision-assist":
      return <VisionAssist />;
    case "speech-intelligence":
      return <Speech />;
    case "conversational-rag":
      return <Rag />;
    case "resume-screener":
      return <Screener />;
    case "manaswel":
      return <Manaswel />;
    case "ai-medvision":
      return <MedVision id={slug} />;
    case "tweet-emotion":
      return <TweetEmotion />;
    case "sentiment-transformers":
      return <Sentiment />;
    case "impact-dashboard":
      return <ImpactPlatform />;
    case "lloyds-fraud":
      return <Fraud />;
    default:
      return null;
  }
}
