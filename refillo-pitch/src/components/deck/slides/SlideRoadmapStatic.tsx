import { SlideShell } from "../SlideShell";
import { TrendingUp } from "lucide-react";

type Phase = {
  num: string;
  period: string;
  name: string;
  title: string;
  bullets: string[];
  date: string;
  arr: string;
  arrColor: string;
  dot: string;
  cardBg: string;
  cardBorder: string;
};

const phases: Phase[] = [
  {
    num: "PHASE 0",
    period: "Foundation",
    name: "FOUNDATION",
    title: "Build the engine",
    bullets: [
      "🗄️ Start bulding the corporate module database using AI tools",
      "🤖 AI extraction from real ESG reports",
      "\n",
    ],
    date: "May 2026",
    arr: "ARR: —",
    arrColor: "#C2410C",
    dot: "#F97316",
    cardBg: "#FFF7ED",
    cardBorder: "#FDBA74",
  },
  {
    num: "PHASE 1",
    period: "Market Entry Italy",
    name: "MARKET ENTRY",
    title: "Win the Italian beachhead",
    bullets: [
      "⭐ First priority sectors: Automotive, Fashion & Luxury, Food",
      "🏭 Target: 100 clients by the end of 2027, 500 by the end of 2028",
      "\n",
      "📋 Finished building the fully automated system for ESG reports",
    ],
    date: "Gen 2027 - Dec 2028",
    arr: "ARR: €245K",
    arrColor: "#085041",
    dot: "#1D9E75",
    cardBg: "#E1F5EE",
    cardBorder: "#1D9E75",
  },
  {
    num: "PHASE 2",
    period: "EU Expansion",
    name: "SCALE",
    title: "Expansion in DE, FR, ES",
    bullets: [
      "🇪🇺 This four contries together account 70% of EU SAM",
      "📈 Target: 2000 clients ",
      "\n",
      "🌍 Expand while maintaining the priority sectors",
    ],
    date: "Gen 2029 - Dec 2029",
    arr: "ARR: €980K",
    arrColor: "#0E7490",
    dot: "#0891B2",
    cardBg: "#ECFEFF",
    cardBorder: "#67E8F9",
  },
  {
    num: "PHASE 3",
    period: "Market Expansion",
    name: "MARKET EXPANSION",
    title: "Launch in new sectors",
    bullets: [
      "🌐 Opening our market to the remaining sectors available thanks to the strength gained in the previous year.",
      "\n",
      "🎯 Target: 3.800 clients.",
      "\n",
      "➕ Possibility of adding new features to our product.",
    ],
    date: "Gen 2030 - Dec 2030",
    arr: "ARR: €1,8M",
    arrColor: "#5B21B6",
    dot: "#7C3AED",
    cardBg: "#F5F3FF",
    cardBorder: "#C4B5FD",
  },
];

const PhaseCard = ({ p }: { p: Phase }) => (
  <div
    className="rounded-2xl border-2 shadow-sm p-5 flex flex-col h-full"
    style={{ backgroundColor: p.cardBg, borderColor: p.cardBorder }}
  >
    <div className="flex items-center gap-2 text-xs uppercase tracking-wide font-bold">
      <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: p.dot }} />
      <span style={{ color: p.dot }}>{p.num}</span>
    </div>
    <div className="text-xs text-muted-foreground font-semibold mt-1">{p.period}</div>

    <div className="text-base font-bold mt-2 text-foreground leading-tight">
      {p.title}
    </div>

    <ul className="mt-3 space-y-1.5 flex-1">
      {p.bullets
        .filter((b) => b.trim() !== "")
        .map((b, i) => (
          <li key={i} className="text-xs text-foreground/80 leading-snug">
            {b}
          </li>
        ))}
    </ul>
  </div>
);

export default function SlideRoadmapStatic() {
  return (
    <SlideShell className="!px-12 !py-8">
      <header className="shrink-0">
        <div className="slide-eyebrow" style={{ color: "#1D9E75" }}>
          ROADMAP
        </div>
        <h2 className="slide-title text-2xl font-bold mt-1">
          From database to European standard
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          A 4-phase plan to own the ESG infrastructure layer for European SMEs.
        </p>
      </header>

      <div className="flex-1 flex flex-col mt-6">
        {/* Timeline spine with date markers */}
        <div className="relative px-2">
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[3px] bg-border rounded-full" />
          {/* Break-even marker between Phase 2 (blue) and Phase 3 (purple) */}
          {/* Icon sits on the timeline */}
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-10"
            style={{ left: "75%" }}
          >
            <span
              className="flex h-6 w-6 items-center justify-center rounded-full text-background border-[2px] border-background shadow"
              style={{ backgroundColor: "#1D9E75" }}
            >
              <TrendingUp className="h-3.5 w-3.5" strokeWidth={2.5} />
            </span>
          </div>
          <div className="relative grid grid-cols-4 gap-5">
            {/* "Break-even" label aligned horizontally with the date row */}
            <div
              className="absolute top-0 -translate-x-1/2 z-10 text-sm font-bold whitespace-nowrap"
              style={{ left: "75%", color: "#1D9E75" }}
            >
              Break-even
            </div>
            {phases.map((p) => (
              <div key={p.num} className="flex flex-col items-center gap-2">
                <span className="text-sm font-bold text-foreground">{p.date}</span>
                <span
                  className="relative z-10 block h-5 w-5 rounded-full border-[3px] border-background shadow"
                  style={{ backgroundColor: p.dot }}
                />
                <span
                  className="rounded-full border-2 px-3 py-0.5 text-xs font-bold bg-background"
                  style={{ color: p.arrColor, borderColor: p.cardBorder }}
                >
                  {p.arr}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Cards row below timeline */}
        <div className="grid grid-cols-4 gap-5 mt-5 flex-1">
          {phases.map((p) => (
            <PhaseCard key={p.num} p={p} />
          ))}
        </div>
      </div>
    </SlideShell>
  );
}