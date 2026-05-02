import { Fragment } from "react";
import { SlideShell, SlideHeader } from "../SlideShell";
import { ArrowRight } from "lucide-react";

const steps = [
  { n: 1, t: "Fill in VSME in our intuitive forms ", s: "Just once, guided step by step" },
  { n: 2, t: "Select your clients", s: "From our complete portfolio" },
  { n: 3, t: "Our AI will fill your clients' forms", s: "Let the magic begin" },
  { n: 4, t: "Download ready-made forms", s: "In the exact format each client requires" },
];

export default function Slide13SolutionExtended() {
  return (
    <SlideShell>
      <SlideHeader eyebrow="The solution" title="How ESGlab works" />
      <div className="flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-stretch gap-6">
          {steps.map((s, i) => (
            <Fragment key={s.n}>
              <div className="h-full flex flex-col items-center text-center rounded-2xl bg-background border border-border p-7 accent-bar-left">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">
                  {s.n}
                </div>
                <h3 className="mt-5 text-xl font-bold text-foreground">{s.t}</h3>
                <p className="mt-2 text-[15px] text-muted-foreground">{s.s}</p>
              </div>
              {i < steps.length - 1 && (
                <ArrowRight className="h-8 w-8 text-primary self-center" />
              )}
            </Fragment>
          ))}
        </div>

        <div className="mt-12 rounded-xl bg-accent text-accent-foreground p-6 accent-bar-left">
          <p className="text-lg">
            <span className="font-bold">The following year:</span> just update quantitative data.
            Everything else is already saved.
          </p>
        </div>

        <div className="mt-4 rounded-xl bg-muted p-6 accent-bar-left">
          <p className="text-lg">
            <span className="font-bold">Natural retention:</span> the proprietary database makes switching hard and raises entry barriers for competitors.
          </p>
        </div>
      </div>
    </SlideShell>
  );
}
