import { SlideShell, SlideHeader } from "../SlideShell";

const VB_W = 600;
const VB_H = 300;

type Competitor = {
  name: string;
  x: number;
  y: number;
  pos: "above" | "below" | "left" | "right";
};

const competitors: Competitor[] = [
  // Top-left: SME Consulting
  { name: "Ollum", x: 22, y: 22, pos: "above" },
  { name: "ECOLoOp", x: 35, y: 38, pos: "below" },
  // Bottom-left: Corporate Consulting
  { name: "EcoVadis", x: 30, y: 65, pos: "below" },
  { name: "Deloitte ESG", x: 18, y: 78, pos: "left" },
  // Bottom-right: Corporate Software
  { name: "SAP Sustainability", x: 62, y: 72, pos: "below" },
  { name: "Workiva", x: 75, y: 65, pos: "below" },
];

export default function Slide12Competitive() {
  const px = (p: number) => (p / 100) * VB_W;
  const py = (p: number) => (p / 100) * VB_H;

  const esgX = px(78);
  const esgY = py(22);

  return (
    <SlideShell className="!py-8 !px-10 !pb-28">
      <SlideHeader eyebrow="Competitive landscape" title="Refillo sits where no one else does" />
      <p className="text-base text-muted-foreground -mt-6 mb-3 max-w-4xl">
        Every competitor is either manual or serves large corporates. Refillo is the only AI-automated solution built for SMEs.
      </p>

      {/* MATRIX */}
      <div className="flex-1 min-h-0 rounded-xl border border-border bg-background shadow-sm p-3 mx-auto w-full max-w-3xl">
        <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          {/* Quadrant fills */}
          <rect x="0" y="0" width={VB_W / 2} height={VB_H / 2} fill="#F1EFE8" opacity="0.5" />
          <rect x={VB_W / 2} y="0" width={VB_W / 2} height={VB_H / 2} fill="#E1F5EE" opacity="0.8" />
          <rect x="0" y={VB_H / 2} width={VB_W / 2} height={VB_H / 2} fill="white" />
          <rect x={VB_W / 2} y={VB_H / 2} width={VB_W / 2} height={VB_H / 2} fill="#F1EFE8" opacity="0.3" />

          {/* Axes */}
          <line x1="0" y1={VB_H / 2} x2={VB_W} y2={VB_H / 2} stroke="#e8e4d9" strokeWidth="1" />
          <line x1={VB_W / 2} y1="0" x2={VB_W / 2} y2={VB_H} stroke="#e8e4d9" strokeWidth="1" />

          {/* Quadrant corner labels */}
          <text x="6" y="12" fontSize="8" fontFamily="Inter" fill="#5F5E5A">SME Consulting</text>
          <text x={VB_W - 6} y="12" fontSize="8" fontFamily="Inter" fill="#085041" fontWeight="700" textAnchor="end">⭐ Our Space</text>
          <text x="6" y={VB_H - 5} fontSize="8" fontFamily="Inter" fill="#5F5E5A">Corporate Consulting</text>
          <text x={VB_W - 6} y={VB_H - 5} fontSize="8" fontFamily="Inter" fill="#5F5E5A" textAnchor="end">Corporate Software</text>

          {/* Axis end labels */}
          <text x="6" y={VB_H / 2 - 4} fontSize="9" fontFamily="Inter" fill="#5F5E5A">Consulting</text>
          <text x={VB_W - 6} y={VB_H / 2 - 4} fontSize="9" fontFamily="Inter" fill="#5F5E5A" textAnchor="end">AI-Automated</text>
          <text x={VB_W / 2 + 5} y="10" fontSize="9" fontFamily="Inter" fill="#5F5E5A">SMEs / Suppliers</text>
          <text x={VB_W / 2 + 5} y={VB_H - 5} fontSize="9" fontFamily="Inter" fill="#5F5E5A">Large Corporates</text>

          {/* Competitor dots */}
          {competitors.map((c) => {
            const cx = px(c.x);
            const cy = py(c.y);
            let lx = cx;
            let ly = cy;
            let anchor: "start" | "middle" | "end" = "middle";
            if (c.pos === "above") { ly = cy - 12; anchor = "middle"; }
            else if (c.pos === "below") { ly = cy + 18; anchor = "middle"; }
            else if (c.pos === "left") { lx = cx - 11; ly = cy + 3; anchor = "end"; }
            else { lx = cx + 11; ly = cy + 3; anchor = "start"; }
            return (
              <g key={c.name}>
                <circle cx={cx} cy={cy} r="7" fill="#5F5E5A" />
                <text x={lx} y={ly} fontSize="9" fontFamily="Inter" fill="#2C2C2A" textAnchor={anchor}>
                  {c.name}
                </text>
              </g>
            );
          })}

          {/* Refillo dot */}
          <circle cx={esgX} cy={esgY} r="20" fill="none" stroke="#1D9E75" strokeWidth="1.5" opacity="0.25" />
          <circle cx={esgX} cy={esgY} r="13" fill="#1D9E75" />
          <text x={esgX - 24} y={esgY + 4} fontSize="11" fontFamily="Inter" fontWeight="700" fill="#085041" textAnchor="end">
            Refillo
          </text>
        </svg>
      </div>
    </SlideShell>
  );
}
