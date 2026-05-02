import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { SLIDES } from "./slides";

export const Deck = () => {
  const [index, setIndex] = useState(0);
  const total = SLIDES.length;

  const next = useCallback(() => setIndex((i) => Math.min(i + 1, total - 1)), [total]);
  const prev = useCallback(() => setIndex((i) => Math.max(i - 1, 0)), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") { e.preventDefault(); next(); }
      else if (e.key === "ArrowLeft" || e.key === "PageUp") { e.preventDefault(); prev(); }
      else if (e.key === "Home") setIndex(0);
      else if (e.key === "End") setIndex(total - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, total]);

  const Current = SLIDES[index];
  const isPrimaryBg = index === total - 1;

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-background">
      <div className="absolute inset-0">
        <Current key={index} />
      </div>

      {/* Nav */}
      <div className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center">
        <div className={cn(
          "pointer-events-auto flex items-center gap-3 rounded-full px-3 py-2 backdrop-blur",
          isPrimaryBg ? "bg-white/15 text-primary-foreground" : "bg-foreground/5 text-foreground"
        )}>
          <button
            aria-label="Previous slide"
            onClick={prev}
            disabled={index === 0}
            className={cn(
              "inline-flex h-9 w-9 items-center justify-center rounded-full transition",
              isPrimaryBg ? "bg-white/20 hover:bg-white/30 disabled:opacity-30" : "bg-background hover:bg-muted disabled:opacity-30"
            )}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <span className="px-2 text-sm font-semibold tabular-nums">
            {index + 1} / {total}
          </span>
          <button
            aria-label="Next slide"
            onClick={next}
            disabled={index === total - 1}
            className={cn(
              "inline-flex h-9 w-9 items-center justify-center rounded-full transition",
              isPrimaryBg ? "bg-white/20 hover:bg-white/30 disabled:opacity-30" : "bg-background hover:bg-muted disabled:opacity-30"
            )}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* progress dots */}
      <div className="pointer-events-none absolute top-3 left-1/2 -translate-x-1/2 flex gap-1.5">
        {SLIDES.map((_, i) => (
          <span
            key={i}
            className={cn(
              "h-1 rounded-full transition-all",
              i === index ? "w-8 bg-primary" : "w-2 bg-foreground/15",
              isPrimaryBg && i !== index && "bg-white/30",
              isPrimaryBg && i === index && "bg-white"
            )}
          />
        ))}
      </div>
    </main>
  );
};

export default Deck;