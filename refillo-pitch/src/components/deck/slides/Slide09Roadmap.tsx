import { SlideShell, SlideHeader } from "../SlideShell";

const items = [
  { d: "July 2026", t: "MVP launch", s: "10–15 large-company templates" },
  { d: "End of 2026", t: "First 100 paying customers", s: "Model validation" },
  { d: "2027", t: "Accountants channel", s: "and industry associations" },
  { d: "2028", t: "European expansion", s: "France, Spain, Germany" },
];

export default function Slide09Roadmap() {
  return (
    <SlideShell>
      <SlideHeader eyebrow="Roadmap" title="The next 12 months" />
      <div className="flex-1 flex items-center">
        <div className="relative w-full">
          <div className="absolute left-6 right-6 top-7 h-0.5 bg-primary/30" />
          <ol className="relative grid grid-cols-4 gap-6">
            {items.map((it, i) => (
              <li key={it.d} className="flex flex-col items-center text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                  {i + 1}
                </span>
                <div className="mt-5 text-primary font-semibold text-sm uppercase tracking-widest">{it.d}</div>
                <div className="mt-2 text-xl font-bold text-foreground">{it.t}</div>
                <div className="mt-1 text-sm text-muted-foreground">{it.s}</div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </SlideShell>
  );
}