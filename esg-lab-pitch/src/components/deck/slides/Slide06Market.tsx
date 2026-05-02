import { SlideShell, SlideHeader } from "../SlideShell";

const metrics = [
  { v: "110.000", l: "B2B SMEs suppliers (projection for 2030)" },
  { v: "70%", l: "SAM in automotive, fashion & luxury and food." },
  { v: "~3800", l: "Realistic target in the first 3 years (5%)" },
  { v: "€490", l: "Average revenue per customer/ year" },
  { v: "€1.86M", l: "Potential ARR" },
];

export default function Slide06Market() {
  return (
    <SlideShell>
      <SlideHeader eyebrow="The market" title="A big opportunity, at a precise moment" />

      <div className="grid grid-cols-2 gap-5">
        {metrics.slice(0, 4).map((m, i) => (
          <div
            key={`metric-${i}`}
            className={`rounded-2xl p-6 ${i % 2 === 0 ? "bg-accent text-accent-foreground" : "bg-background border border-border accent-bar-left"}`}
          >
            <div className="text-primary font-extrabold leading-none" style={{ fontSize: 48 }}>
              {m.v}
            </div>
            <div className="mt-2 text-foreground/80 text-[14px]">{m.l}</div>
          </div>
        ))}
      </div>

      {metrics[4] && (
        <div className="mt-5 grid grid-cols-2 gap-5">
          <div key="metric-4" className="col-start-1 col-end-3 mx-auto w-1/2">
            <div className="rounded-2xl p-6 bg-accent text-accent-foreground">
              <div className="text-primary font-extrabold leading-none" style={{ fontSize: 48 }}>
                {metrics[4].v}
              </div>
              <div className="mt-2 text-foreground/80 text-[14px]">{metrics[4].l}</div>
            </div>
          </div>
        </div>
      )}
    </SlideShell>
  );
}