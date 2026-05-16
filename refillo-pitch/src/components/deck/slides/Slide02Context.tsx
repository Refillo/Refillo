import { SlideShell, SlideHeader } from "../SlideShell";

export default function Slide02Context() {
  return (
    <SlideShell>
      <SlideHeader
        eyebrow="the context"
        title="Europe is forcing large companies to report on their entire supply chain"
      />

      <div className="grid grid-cols-3 gap-6 mt-4">
        <article className="rounded-xl bg-primary text-primary-foreground p-7">
          <div className="text-xs uppercase tracking-widest opacity-80">JULY 2024</div>
          <h3 className="mt-2 text-2xl font-bold">CSDDD</h3>
          <p className="mt-3 text-[15px] leading-relaxed opacity-95">
            Large companies must report on their ESG impact through their supply chain.
          </p>
        </article>

        <article className="rounded-xl bg-accent text-accent-foreground p-7">
          <div className="text-xs uppercase tracking-widest text-secondary/80">March 2026</div>
          <h3 className="mt-2 text-2xl font-bold">Omnibus I</h3>
          <p className="mt-3 text-[15px] leading-relaxed">
            Higher standards and heavier sanctions led to an increase pressure on supply chain reports.
          </p>
        </article>

        <article className="rounded-xl bg-background p-7 accent-bar-left border border-border">
          <div className="text-xs uppercase tracking-widest text-primary">RESULT</div>
          <h3 className="mt-2 text-2xl font-bold text-foreground">Indirect impact</h3>
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">Everyone in their supply chain has to report his ESG impact.</p>
        </article>
      </div>

      <div className="mt-4 rounded-xl border border-border bg-background p-4 flex items-center gap-4">
        <h3 className="text-lg font-bold text-foreground">VSME</h3>
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          Standard reporting form for SMEs that large companies rely on.
        </p>
      </div>

      <div className="mt-auto pt-8">
        <p className="text-primary italic text-2xl font-medium">
          "Europe simplified because it was too costly. We remove the excuse."
        </p>
      </div>
    </SlideShell>
  );
}