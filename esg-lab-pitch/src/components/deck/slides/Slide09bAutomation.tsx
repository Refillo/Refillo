import { Fragment } from "react";
import {
  ChevronRight,
  FileSpreadsheet,
  FileText,
  ScanLine,
  Network,
  FileCheck2,
} from "lucide-react";
import { SlideShell, SlideHeader } from "../SlideShell";

type Step = {
  step: string;
  title: string;
  bullets: string[];
  icon: React.ReactNode;
  featured?: boolean;
};

const steps: Step[] = [
  {
    step: "Step 1",
    title: "Data upload",
    bullets: [
      "Customer Excel form",
      "Bills (electricity / gas / water)",
      "ISO certificates & policies",
    ],
    icon: (
      <div className="flex gap-2">
        <div className="rounded-lg bg-accent p-3">
          <FileSpreadsheet className="h-7 w-7 text-primary" />
        </div>
        <div className="rounded-lg bg-muted p-3">
          <FileText className="h-7 w-7 text-muted-foreground" />
        </div>
      </div>
    ),
  },
  {
    step: "Step 2",
    title: "OCR & digitization",
    bullets: [
      "Advanced OCR model",
      "Automatic table reading",
      "Conversion to Markdown",
    ],
    icon: (
      <div className="rounded-lg bg-accent p-4">
        <ScanLine className="h-9 w-9 text-primary" />
      </div>
    ),
  },
  {
    step: "Step 3",
    title: "RAG match",
    bullets: [
      "Form question analysis",
      "Data retrieval from the Vault",
      "Question-to-data mapping",
    ],
    featured: true,
    icon: (
      <div className="rounded-lg bg-primary-foreground/10 p-4">
        <Network className="h-9 w-9 text-primary-foreground animate-pulse" />
      </div>
    ),
  },
  {
    step: "Step 4",
    title: "Filled form",
    bullets: [
      "Excel cell writing",
      "AI-generated narrative",
      "Report ready to send",
    ],
    icon: (
      <div className="rounded-lg bg-accent p-4">
        <FileCheck2 className="h-9 w-9 text-primary" />
      </div>
    ),
  },
];

export default function Slide09bAutomation() {
  return (
    <SlideShell>
      <SlideHeader eyebrow="Automation" title="How we build our automated system" />

      <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-stretch gap-3">
        {steps.map((s, i) => (
          <Fragment key={s.step}>
            <article
              className={
                s.featured
                  ? "rounded-2xl bg-primary text-primary-foreground p-5 flex flex-col shadow-sm"
                  : "rounded-2xl bg-background border border-border accent-bar-left p-5 flex flex-col"
              }
            >
              <div className="mb-4">{s.icon}</div>
              <div
                className={
                  s.featured
                    ? "text-[11px] uppercase tracking-widest font-bold text-primary-foreground/70"
                    : "text-[11px] uppercase tracking-widest font-bold text-primary"
                }
              >
                {s.step}
              </div>
              <h4
                className={
                  s.featured
                    ? "mt-1 font-bold text-primary-foreground text-lg leading-tight"
                    : "mt-1 font-bold text-foreground text-lg leading-tight"
                }
              >
                {s.title}
              </h4>
              <ul
                className={
                  s.featured
                    ? "mt-3 space-y-1 text-xs text-primary-foreground/80 list-disc list-inside"
                    : "mt-3 space-y-1 text-xs text-muted-foreground list-disc list-inside"
                }
              >
                {s.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </article>
            {i < steps.length - 1 && (
              <div className="flex items-center justify-center">
                <ChevronRight className="h-6 w-6 text-primary/60" />
              </div>
            )}
          </Fragment>
        ))}
      </div>

      <div className="mt-8 rounded-2xl bg-accent text-accent-foreground p-4 flex items-center gap-5">
        <div className="flex -space-x-2">
          <div className="h-9 w-9 rounded-full bg-primary text-primary-foreground border-2 border-background flex items-center justify-center text-[10px] font-bold">
            API
          </div>
          <div className="h-9 w-9 rounded-full bg-foreground text-background border-2 border-background flex items-center justify-center text-[10px] font-bold">
            AI
          </div>
        </div>
        <p className="text-sm text-foreground/80">
          <span className="font-bold text-foreground">Result:</span> we turn documents
          into intelligence, ready to deliver to any global partner.
        </p>
      </div>
    </SlideShell>
  );
}