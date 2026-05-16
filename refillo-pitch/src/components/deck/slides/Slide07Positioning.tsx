import { Fragment } from "react";
import { SlideShell, SlideHeader } from "../SlideShell";

const rows: [string, string][] = [
  ["Buyer-side (large companies)", "Supplier-side (SMEs)"],
  ["€20,000–50,000 / year", "€290–790 / year"],
  ["Months to implement", "Up and running in an afternoon"],
  ["Requires a dedicated ESG team", "Built for the back office"],
];

export default function Slide07Positioning() {
  return (
    <SlideShell>
      <SlideHeader eyebrow="Positioning" title="Why Refillo" />
      <div className="flex-1 flex flex-col justify-center max-w-5xl mx-auto w-full">
        <p className="text-primary font-bold text-center" style={{ fontSize: 32, lineHeight: 1.25 }}>
          "Everyone helps large companies ask the questions.<br />
          We help SMEs answer them."
        </p>

        <div className="mt-12 grid grid-cols-2 rounded-2xl overflow-hidden border border-border">
          <div className="bg-muted px-6 py-4 text-muted-foreground font-semibold border-r border-border">
            Competitors (osapiens, EcoVadis...)
          </div>
          <div className="bg-primary text-primary-foreground px-6 py-4 font-semibold">
            Refillo
          </div>
          {rows.map(([a, b], i) => (
            <Fragment key={i}>
              <div className="px-6 py-4 text-foreground/80 border-t border-r border-border bg-background">{a}</div>
              <div className="px-6 py-4 text-foreground font-semibold border-t border-border bg-accent/40">{b}</div>
            </Fragment>
          ))}
        </div>
      </div>
    </SlideShell>
  );
}