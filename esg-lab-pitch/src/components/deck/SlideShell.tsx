import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SlideShellProps {
  children: ReactNode;
  className?: string;
  topBar?: boolean;
  bg?: "white" | "muted" | "primary";
}

export const SlideShell = ({ children, className, topBar = false, bg = "white" }: SlideShellProps) => {
  const bgClass =
    bg === "primary" ? "bg-primary text-primary-foreground" :
    bg === "muted" ? "bg-muted" : "bg-background";
  return (
    <section className={cn("slide-shell fade-enter", bgClass)}>
      {topBar && <div className="h-1 w-full bg-primary" />}
      <div className={cn("flex-1 px-16 py-14 flex flex-col", className)}>
        {children}
      </div>
    </section>
  );
};

export const SlideHeader = ({ eyebrow, title }: { eyebrow?: string; title?: string }) => (
  <header className="mb-8">
    {eyebrow && <div className="slide-eyebrow mb-2">{eyebrow}</div>}
    {title && <h2 className="slide-title text-[32px] leading-tight max-w-5xl">{title}</h2>}
  </header>
);