import { SlideShell, SlideHeader } from "../SlideShell";

const tiers = [
  { name: "Base", price: "€290", per: "/year", desc: "1–2 large clients", featured: false },
  { name: "Standard", price: "€490", per: "/year", desc: "3–6 large clients", featured: true },
  { name: "Pro", price: "€790", per: "/year", desc: "7+ large clients", featured: false },
];

export default function Slide08Business() {
  return (
    <SlideShell>
      <SlideHeader eyebrow="Business model" title="How we make money" />

      <div className="grid grid-cols-3 gap-6 items-end">
        {tiers.map((t) => (
          <div
            key={t.name}
            className={`relative rounded-2xl p-7 bg-background border ${t.featured ? "border-2 border-primary scale-105 shadow-sm" : "border-border"}`}
          >
            {t.featured && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest rounded-full px-3 py-1">
                most popular
              </span>
            )}
            <div className="text-sm uppercase tracking-widest text-muted-foreground font-semibold">{t.name}</div>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="text-primary font-extrabold" style={{ fontSize: 48 }}>{t.price}</span>
              <span className="text-muted-foreground">{t.per}</span>
            </div>
            <p className="mt-3 text-foreground/80">{t.desc}</p>
          </div>
        ))}
      </div>

      <div className="pt-6 grid grid-cols-2 gap-6">
        {[
          {
            title: "Operating costs",
            total: "~€79.8k",
            totalSuffix: "/year @ 3,800 clients",
            rows: [
              { label: "Cloud infra & hosting", pct: 38.2, value: "~€30.5k" },
              { label: "Stripe fees (1.75% avg)", pct: 34.9, value: "~€27.9k" },
              { label: "AI & LLM APIs (w/ caching)", pct: 21.2, value: "~€16.9k" },
              { label: "Support, monitoring & security", pct: 5.3, value: "~€4.2k" },
              { label: "Domain, workspace & e-invoicing", pct: 0.4, value: "~€300" },
            ],
            footnote: "Stripe scales with revenue, infra & AI stay marginal thanks to caching.",
          },
          {
            title: "Total estimated costs",
            total: "~€1,217k",
            totalSuffix: "/year @ 3,800 clients",
            rows: [
              { label: "Personnel", pct: 46, value: "€564.2k" },
              { label: "Operating costs", pct: 7, value: "€79.8k" },
              { label: "Marketing", pct: 30, value: "€360k" },
              { label: "Office & Overhead", pct: 14, value: "€177k" },
              { label: "Contingency Buffer", pct: 3, value: "€36.5k" },
            ],
            footnote: "Operating margin +€644.5k — Margin 35%.",
          },
        ].map((card) => (
          <div key={card.title} className="rounded-xl bg-accent text-accent-foreground p-5 accent-bar-left">
            <div className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
              {card.title}
            </div>
            <div className="mt-1 font-extrabold text-2xl text-primary">
              {card.total}
              <span className="text-sm font-bold text-foreground/70">{card.totalSuffix}</span>
            </div>

            <div className="mt-3 space-y-2">
              {card.rows.map((row) => (
                <div key={row.label} className="grid grid-cols-[1fr_auto] gap-3 items-center">
                  <div>
                    <div className="flex justify-between text-[11px] text-foreground/80">
                      <span className="font-semibold">{row.label}</span>
                      <span className="tabular-nums text-muted-foreground">{row.pct}%</span>
                    </div>
                    <div className="mt-1 h-1.5 w-full rounded-full bg-primary/15 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${Math.max(row.pct, 2)}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-foreground/80 tabular-nums">{row.value}</span>
                </div>
              ))}
            </div>

            {card.footnote && (
              <p className="mt-3 text-[11px] text-muted-foreground italic leading-relaxed">
                {card.footnote}
              </p>
            )}
          </div>
        ))}
      </div>

      <p className="mt-4 text-center text-[11px] italic text-muted-foreground">
        See the attached financial report for the full breakdown and assumptions.
      </p>
    </SlideShell>
  );
}