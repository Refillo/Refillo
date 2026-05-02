import { SlideShell, SlideHeader } from "../SlideShell";
import { FileSpreadsheet, FileText, Globe, ClipboardList, User } from "lucide-react";

export default function Slide03Problem() {
  const painsTop = ["Weeks of admin work", "Same data, different formats"];
  const painsBottom = ["Mistakes that risk exclusion from the supply chain"];
  const badgeStyle = {
    backgroundColor: "hsl(0 85% 55% / 0.12)",
    color: "hsl(0 85% 50%)",
    border: "1px solid hsl(0 85% 55% / 0.5)",
  } as const;
  const sources = [
    { Icon: FileSpreadsheet, label: "Excel", color: "hsl(140 60% 40%)" },
    { Icon: FileText, label: "PDF", color: "hsl(6 78% 57%)" },
    { Icon: Globe, label: "Portal", color: "hsl(220 70% 55%)" },
    { Icon: ClipboardList, label: "Form", color: "hsl(40 90% 50%)" },
  ];

  return (
    <SlideShell>
      <SlideHeader eyebrow="The problem" />
      <div className="flex-1 grid grid-cols-5 gap-10 items-center">
        {/* Left 60% */}
        <div className="col-span-3">
          <p className="text-foreground font-bold leading-tight" style={{ fontSize: 40 }}>
            An SME that supplies 4 different large companies receives{" "}
            <span className="text-primary">4 different questionnaires</span>{" "}
            to fill out, <span className="underline">every year</span>,{" "}
            <span className="underline">all at the same time</span>.
          </p>
          <div className="mt-10 flex items-center justify-start gap-4">
            <div className="flex flex-col items-start gap-3">
              <ul className="flex flex-wrap items-center justify-start gap-3">
                {painsTop.map((p) => (
                  <li
                    key={p}
                    className="inline-flex items-center rounded-full px-4 py-2 text-[15px] font-semibold"
                    style={badgeStyle}
                  >
                    {p}
                  </li>
                ))}
              </ul>
              <ul className="flex justify-start">
                {painsBottom.map((p) => (
                  <li
                    key={p}
                    className="inline-flex items-center rounded-full px-4 py-2 text-[15px] font-semibold"
                    style={badgeStyle}
                  >
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right 40% */}
        <div className="col-span-2 relative h-[420px]">
          <svg viewBox="0 0 400 420" className="w-full h-full">
            {sources.map((s, i) => {
              const x = 30;
              const y = 40 + i * 95;
              return (
                <line
                  key={i}
                  x1={x + 70}
                  y1={y + 35}
                  x2={300}
                  y2={210}
                  stroke="hsl(var(--border))"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                />
              );
            })}
          </svg>

          <div className="absolute inset-0">
            {sources.map((s, i) => (
              <div
                key={s.label}
                className="absolute flex items-center gap-3 rounded-lg bg-background border border-border px-3 py-2 shadow-sm"
                style={{ left: 0, top: 32 + i * 95, width: 150 }}
              >
                <s.Icon className="h-6 w-6" style={{ color: s.color }} />
                <span className="text-sm font-semibold text-foreground">{s.label}</span>
              </div>
            ))}

            <div
              className="absolute flex flex-col items-center justify-center rounded-2xl bg-warn/10 border-2 border-warn"
              style={{ right: 0, top: 160, width: 140, height: 140 }}
            >
              <User className="h-14 w-14 text-warn" />
              <span className="mt-1 text-xs font-bold text-warn uppercase tracking-wider">SME</span>
            </div>
          </div>
        </div>
      </div>
    </SlideShell>
  );
}