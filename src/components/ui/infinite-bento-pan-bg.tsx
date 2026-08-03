import { useEffect, useRef } from "react";
import React from "react";

// ── Card definitions ──────────────────────────────────────────────────────────
const CARDS = [
  { x: 60,   y: 60,   w: 520, h: 300, kind: "chart",    label: "Performance",  accent: 160 },
  { x: 620,  y: 60,   w: 300, h: 300, kind: "counter",  label: "Deployments",  accent: 165 },
  { x: 960,  y: 60,   w: 400, h: 180, kind: "gradient", label: "",             accent: 155 },
  { x: 1400, y: 60,   w: 520, h: 300, kind: "code",     label: "deploy.ts",    accent: 0   },
  { x: 1960, y: 60,   w: 300, h: 300, kind: "ring",     label: "Uptime",       accent: 160 },
  { x: 2300, y: 60,   w: 400, h: 180, kind: "stat",     label: "99.9%",        accent: 160 },
  { x: 2740, y: 60,   w: 380, h: 300, kind: "bars",     label: "Requests",     accent: 158 },
  { x: 960,  y: 280,  w: 400, h: 200, kind: "counter",  label: "Users",        accent: 162 },
  { x: 2300, y: 280,  w: 400, h: 200, kind: "sparkline",label: "Latency",      accent: 160 },
  { x: 60,   y: 400,  w: 300, h: 300, kind: "gradient", label: "",             accent: 145 },
  { x: 400,  y: 400,  w: 520, h: 300, kind: "code",     label: "api.ts",       accent: 0   },
  { x: 1400, y: 400,  w: 300, h: 300, kind: "ring",     label: "Coverage",     accent: 160 },
  { x: 1740, y: 400,  w: 400, h: 300, kind: "bars",     label: "Builds",       accent: 158 },
  { x: 2740, y: 400,  w: 380, h: 300, kind: "stat",     label: "P95",          accent: 160 },
  { x: 60,   y: 740,  w: 520, h: 260, kind: "chart",    label: "Memory",       accent: 160 },
  { x: 620,  y: 740,  w: 300, h: 260, kind: "counter",  label: "Errors",       accent: 162 },
  { x: 960,  y: 760,  w: 400, h: 240, kind: "gradient", label: "",             accent: 145 },
  { x: 1400, y: 760,  w: 380, h: 240, kind: "sparkline",label: "CPU",          accent: 160 },
  { x: 1820, y: 760,  w: 520, h: 260, kind: "code",     label: "worker.ts",    accent: 0   },
  { x: 2380, y: 760,  w: 380, h: 260, kind: "bars",     label: "Queue",        accent: 158 },
  { x: 60,   y: 1040, w: 380, h: 240, kind: "ring",     label: "Cache Hit",    accent: 160 },
  { x: 480,  y: 1040, w: 400, h: 240, kind: "stat",     label: "RPS",          accent: 160 },
  { x: 920,  y: 1040, w: 520, h: 240, kind: "chart",    label: "Throughput",   accent: 160 },
  { x: 1480, y: 1040, w: 300, h: 240, kind: "counter",  label: "Jobs",         accent: 162 },
  { x: 1820, y: 1060, w: 380, h: 240, kind: "gradient", label: "",             accent: 145 },
  { x: 2240, y: 1060, w: 400, h: 240, kind: "code",     label: "db.sql",       accent: 0   },
  { x: 2680, y: 1060, w: 420, h: 240, kind: "bars",     label: "Tasks",        accent: 158 },
  { x: 60,   y: 1320, w: 520, h: 280, kind: "code",     label: "edge.ts",      accent: 0   },
  { x: 620,  y: 1320, w: 380, h: 280, kind: "chart",    label: "TTFB",         accent: 160 },
  { x: 1040, y: 1320, w: 300, h: 280, kind: "ring",     label: "SLA",          accent: 160 },
  { x: 1380, y: 1320, w: 400, h: 280, kind: "stat",     label: "Hits",         accent: 160 },
  { x: 1820, y: 1320, w: 380, h: 280, kind: "sparkline",label: "Bandwidth",    accent: 160 },
  { x: 2240, y: 1320, w: 400, h: 280, kind: "gradient", label: "",             accent: 145 },
  { x: 2680, y: 1320, w: 420, h: 280, kind: "bars",     label: "Errors",       accent: 158 },
  { x: 60,   y: 1640, w: 400, h: 240, kind: "counter",  label: "Saved",        accent: 162 },
  { x: 500,  y: 1640, w: 520, h: 240, kind: "chart",    label: "Net Out",      accent: 160 },
  { x: 1060, y: 1640, w: 380, h: 240, kind: "code",     label: "auth.ts",      accent: 0   },
  { x: 1480, y: 1640, w: 300, h: 240, kind: "ring",     label: "Auth Rate",    accent: 160 },
  { x: 1820, y: 1660, w: 400, h: 240, kind: "counter",  label: "Hooks",        accent: 162 },
  { x: 2260, y: 1660, w: 380, h: 240, kind: "bars",     label: "Runs",         accent: 158 },
  { x: 2680, y: 1660, w: 420, h: 240, kind: "gradient", label: "",             accent: 145 },
];

const TILE_W    = 3200;
const SUPER_W   = TILE_W * 2;
const SUPER_H   = 2000;
const ACCENT    = "#10b981";
const ACCENT_DIM = "rgba(16,185,129,";
const DURATION_MS = 9000;

// ── Shared card wrapper style ─────────────────────────────────────────────────
function cardStyle(card: typeof CARDS[number]): React.CSSProperties {
  const isCode = card.kind === "code";
  return {
    position: "absolute",
    left: card.x,
    top: card.y,
    width: card.w,
    height: card.h,
    borderRadius: 20,
    border: isCode
      ? "1px solid rgba(139,92,246,0.20)"
      : "1px solid rgba(16,185,129,0.14)",
    background: isCode
      ? "linear-gradient(135deg,rgba(15,8,30,0.92),rgba(10,5,25,0.88))"
      : "linear-gradient(145deg,rgba(4,16,10,0.90),rgba(3,12,8,0.82))",
    boxShadow: isCode
      ? "0 0 32px rgba(139,92,246,0.06), inset 0 1px 0 rgba(255,255,255,0.04)"
      : "0 0 32px rgba(16,185,129,0.05), inset 0 1px 0 rgba(255,255,255,0.03)",
    overflow: "hidden",
    padding: card.kind === "gradient" ? 0 : 22,
    display: "flex",
    flexDirection: "column" as const,
    gap: 10,
    backdropFilter: "blur(8px)",
  };
}

// ── Card label ────────────────────────────────────────────────────────────────
function Label({ text, color = "#6ee7b7" }: { text?: string; color?: string }) {
  if (!text) return null;
  return (
    <div style={{
      fontSize: 10,
      fontFamily: "monospace",
      letterSpacing: "0.18em",
      textTransform: "uppercase" as const,
      color,
      opacity: 0.65,
      fontWeight: 600,
    }}>
      {text}
    </div>
  );
}

// ── Smooth line chart ─────────────────────────────────────────────────────────
function ChartCard({ t }: { t: number }) {
  const pts: [number, number][] = Array.from({ length: 14 }, (_, i) => [
    (i / 13) * 100,
    50 - (Math.sin(i * 0.65 + t) * 20 + Math.cos(i * 0.38 + t * 0.5) * 10),
  ]);
  const d = pts.map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x} ${y}`).join(" ");
  const fill = [...pts, [100, 100], [0, 100]].map(([x, y], i) =>
    i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`
  ).join(" ") + " Z";
  return (
    <svg viewBox="0 0 100 100" style={{ width: "100%", flex: 1 }} preserveAspectRatio="none">
      <defs>
        <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={ACCENT} stopOpacity="0.25" />
          <stop offset="100%" stopColor={ACCENT} stopOpacity="0.01" />
        </linearGradient>
      </defs>
      <path d={fill} fill="url(#cg)" />
      <path d={d} fill="none" stroke={ACCENT} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
      {pts.filter((_, i) => i % 4 === 0).map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1.8" fill={ACCENT} opacity="0.7" />
      ))}
    </svg>
  );
}

// ── Sparkline (mini chart, no fill) ──────────────────────────────────────────
function SparklineCard({ t }: { t: number }) {
  const pts: string[] = Array.from({ length: 20 }, (_, i) => {
    const x = (i / 19) * 100;
    const y = 50 - (Math.sin(i * 0.5 + t * 1.3) * 15 + Math.cos(i * 0.9 + t * 0.6) * 8);
    return `${x},${y}`;
  });
  const last = pts[pts.length - 1].split(",");
  return (
    <svg viewBox="0 0 100 100" style={{ width: "100%", flex: 1 }} preserveAspectRatio="none">
      <polyline points={pts.join(" ")} fill="none" stroke={ACCENT} strokeWidth="1.4" opacity="0.75" strokeLinecap="round" />
      <circle cx={last[0]} cy={last[1]} r="2.5" fill={ACCENT} opacity="0.9" />
      <circle cx={last[0]} cy={last[1]} r="5" fill={ACCENT} opacity="0.15" />
    </svg>
  );
}

// ── Bar chart ─────────────────────────────────────────────────────────────────
function BarsCard({ t }: { t: number }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 5, flex: 1, paddingTop: 4 }}>
      {Array.from({ length: 8 }).map((_, i) => {
        const h = 25 + Math.abs(Math.sin(i * 1.2 + t * 0.9)) * 65;
        const bright = Math.abs(Math.sin(i + t * 0.5));
        return (
          <div key={i} style={{
            flex: 1,
            height: `${h}%`,
            background: `linear-gradient(to top, ${ACCENT_DIM}${0.5 + bright * 0.4}), ${ACCENT_DIM}${0.15 + bright * 0.1}))`,
            borderRadius: "4px 4px 2px 2px",
            transition: "height 0.4s ease",
            boxShadow: `0 0 8px ${ACCENT_DIM}${0.1 + bright * 0.15})`
          }} />
        );
      })}
    </div>
  );
}

// ── Counter ───────────────────────────────────────────────────────────────────
function CounterCard({ label, t }: { label?: string; t: number }) {
  const val = Math.floor(2500 + Math.abs(Math.sin(t * 0.4)) * 12000);
  const delta = (Math.abs(Math.sin(t * 0.25)) * 18).toFixed(1);
  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", flex: 1, gap: 6 }}>
      <Label text={label} />
      <div style={{ fontSize: 42, fontWeight: 800, color: "white", fontFamily: "monospace", letterSpacing: -2, lineHeight: 1 }}>
        {val.toLocaleString()}
      </div>
      <div style={{
        display: "inline-flex", alignItems: "center", gap: 4,
        fontSize: 11, fontFamily: "monospace", color: ACCENT,
        background: ACCENT_DIM + "0.1)", border: `1px solid ${ACCENT_DIM}0.2)`,
        borderRadius: 6, padding: "2px 8px",
      }}>
        ↑ {delta}%
      </div>
    </div>
  );
}

// ── Stat ──────────────────────────────────────────────────────────────────────
function StatCard({ label, t }: { label?: string; t: number }) {
  const pct = (99.5 + Math.abs(Math.sin(t * 0.1)) * 0.4).toFixed(2);
  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", flex: 1, gap: 10 }}>
      <Label text={label} />
      <div style={{ fontSize: 38, fontWeight: 800, color: "white", fontFamily: "monospace" }}>
        {pct}<span style={{ fontSize: 18, color: ACCENT, marginLeft: 2 }}>%</span>
      </div>
      <div style={{ position: "relative", height: 5, background: "rgba(255,255,255,0.05)", borderRadius: 4, overflow: "hidden" }}>
        <div style={{
          position: "absolute", inset: 0, right: `${100 - parseFloat(pct)}%`,
          background: `linear-gradient(90deg, ${ACCENT}, #34d399)`,
          borderRadius: 4,
          boxShadow: `0 0 10px ${ACCENT_DIM}0.5)`,
        }} />
      </div>
    </div>
  );
}

// ── Ring / donut ──────────────────────────────────────────────────────────────
function RingCard({ label, t }: { label?: string; t: number }) {
  const pct = 65 + Math.abs(Math.sin(t * 0.3)) * 30;
  const r = 32, circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flex: 1, gap: 4 }}>
      <Label text={label} />
      <div style={{ position: "relative", width: 90, height: 90 }}>
        <svg viewBox="0 0 80 80" style={{ width: 90, height: 90, transform: "rotate(-90deg)" }}>
          <circle cx="40" cy="40" r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="7" />
          <circle
            cx="40" cy="40" r={r} fill="none" stroke={ACCENT} strokeWidth="7"
            strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
            style={{ filter: `drop-shadow(0 0 6px ${ACCENT_DIM}0.5))`, transition: "stroke-dasharray 0.5s ease" }}
          />
        </svg>
        <div style={{
          position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "monospace", fontWeight: 800, fontSize: 16, color: "white",
        }}>
          {pct.toFixed(0)}%
        </div>
      </div>
    </div>
  );
}

// ── Gradient orb ─────────────────────────────────────────────────────────────
function GradientCard({ t }: { t: number }) {
  const x = 40 + Math.sin(t * 0.4) * 15;
  const y = 40 + Math.cos(t * 0.3) * 15;
  return (
    <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden" }}>
      <div style={{
        position: "absolute",
        left: `${x - 30}%`, top: `${y - 30}%`,
        width: "60%", height: "60%",
        borderRadius: "50%",
        background: `radial-gradient(circle at 40% 40%, rgba(16,185,129,0.35), rgba(20,184,166,0.12), transparent 70%)`,
        filter: "blur(18px)",
        transition: "left 0.1s, top 0.1s",
      }} />
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(135deg, rgba(16,185,129,0.07) 0%, transparent 60%, rgba(20,184,166,0.05) 100%)",
      }} />
      {/* Grid overlay */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `linear-gradient(rgba(16,185,129,0.06) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(16,185,129,0.06) 1px, transparent 1px)`,
        backgroundSize: "28px 28px",
      }} />
    </div>
  );
}

// ── Code snippet ──────────────────────────────────────────────────────────────
function CodeCard({ label }: { label?: string }) {
  const lines = [
    { color: "#c084fc", text: "export async function" },
    { color: "#60a5fa", text: `  ${label?.replace(".ts","") ?? "deploy"}(ctx: Ctx) {` },
    { color: "#6ee7b7", text: "    const res = await build()" },
    { color: "#f9a8d4", text: "    await push(res, ctx.env)" },
    { color: "#fbbf24", text: "    notify('✓ deployed')" },
    { color: "#94a3b8", text: "  }" },
  ];
  return (
    <div style={{ fontFamily: "'Fira Code', monospace", fontSize: 12.5, lineHeight: "22px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <div style={{ fontSize: 10, color: "#a78bfa", opacity: 0.7, letterSpacing: "0.15em", marginBottom: 8 }}>{label}</div>
      {lines.map((l, i) => (
        <div key={i} style={{ color: l.color, whiteSpace: "nowrap" }}>{l.text}</div>
      ))}
    </div>
  );
}

// ── Individual card with its own animation frame ──────────────────────────────
function BentoCard({ card, tileOffsetX = 0 }: { card: typeof CARDS[number]; tileOffsetX?: number }) {
  const [t, setT] = React.useState(0);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    function frame(ts: number) {
      if (!startRef.current) startRef.current = ts;
      setT((ts - startRef.current) / 1000);
      rafRef.current = requestAnimationFrame(frame);
    }
    rafRef.current = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const style = { ...cardStyle(card), left: card.x + tileOffsetX };

  let inner: React.ReactNode;
  switch (card.kind) {
    case "chart":    inner = <><Label text={card.label} /><ChartCard t={t} /></>; break;
    case "sparkline":inner = <><Label text={card.label} /><SparklineCard t={t} /></>; break;
    case "bars":     inner = <><Label text={card.label} /><BarsCard t={t} /></>; break;
    case "counter":  inner = <CounterCard label={card.label} t={t} />; break;
    case "stat":     inner = <StatCard label={card.label} t={t} />; break;
    case "ring":     inner = <RingCard label={card.label} t={t} />; break;
    case "gradient": inner = <GradientCard t={t} />; break;
    case "code":     inner = <CodeCard label={card.label} />; break;
    default:         inner = null;
  }

  return <div style={style}>{inner}</div>;
}

// ── Main component ─────────────────────────────────────────────────────────────
export function InfiniteBentoPanBackground() {
  const panRef = useRef<HTMLDivElement>(null);
  const startRef = useRef<number | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const el = panRef.current;
    if (!el) return;
    const maxY = SUPER_H - window.innerHeight;

    function pan(ts: number) {
      if (!startRef.current) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const loopT = (elapsed % DURATION_MS) / DURATION_MS;
      const px = loopT * TILE_W;
      const py = (maxY / 2) * (1 - Math.cos(loopT * Math.PI * 2)) * 0.28;
      el.style.transform = `translate(${-px}px, ${-py}px)`;
      rafRef.current = requestAnimationFrame(pan);
    }
    const id = requestAnimationFrame(pan);
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div style={{
      position: "absolute", inset: 0,
      background: "radial-gradient(ellipse 120% 100% at 50% 60%, #03100a 0%, #020807 60%, #010504 100%)",
      overflow: "hidden",
    }}>
      {/* Moving canvas */}
      <div ref={panRef} style={{ position: "absolute", left: 0, top: 0, width: SUPER_W, height: SUPER_H, willChange: "transform" }}>
        {/* Tile 0 */}
        {CARDS.map((c, i) => <BentoCard key={`t0-${i}`} card={c} tileOffsetX={0} />)}
        {/* Tile 1 — seamless loop copy */}
        {CARDS.map((c, i) => <BentoCard key={`t1-${i}`} card={c} tileOffsetX={TILE_W} />)}
      </div>

      {/* Depth fog — left & right edges */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "linear-gradient(to right, rgba(2,8,5,0.9) 0%, transparent 12%, transparent 88%, rgba(2,8,5,0.9) 100%)",
      }} />
      {/* Depth fog — top & bottom */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "linear-gradient(to bottom, rgba(2,8,5,0.8) 0%, transparent 15%, transparent 85%, rgba(2,8,5,0.85) 100%)",
      }} />
      {/* Vignette */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.75) 100%)",
      }} />
      {/* Subtle scan-line */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.018,
        backgroundImage: "repeating-linear-gradient(0deg, #10b981 0px, transparent 1px, transparent 3px)",
        backgroundSize: "100% 4px",
      }} />
    </div>
  );
}

export default InfiniteBentoPanBackground;
