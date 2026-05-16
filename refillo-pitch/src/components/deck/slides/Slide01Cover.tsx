import { SlideShell } from "../SlideShell";
import refilloLogo from "@/assets/refillo-logo.png";

export default function Slide01Cover() {
  return (
    <SlideShell topBar className="items-center text-center relative">
      {/* Logo positioned at 1/4 of the slide height */}
      <img
        src={refilloLogo}
        alt="Refillo logo"
        className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ top: "20%", width: 200, height: 200, objectFit: "contain" }}
      />
      {/* Title block centered exactly at 50% of slide */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center w-full px-16">
        <h1 className="text-primary font-extrabold tracking-tight" style={{ fontSize: 96, lineHeight: 1 }}>
          Refillo
        </h1>
        <p className="mt-8 text-foreground font-semibold" style={{ fontSize: 28 }}>
          Fill it in once. Reply to everyone.
        </p>
        <p className="mt-3 text-muted-foreground" style={{ fontSize: 20 }}>
            The ESG auto-compiler for European SMEs
        </p>
      </div>
      <div className="flex-1" />
      <footer className="pb-2 flex items-center justify-center gap-3 text-muted-foreground text-sm">
        <span>First Last</span><span aria-hidden>·</span>
        <span>First Last</span><span aria-hidden>·</span>
        <span>First Last</span><span aria-hidden>·</span>
        <span>First Last</span>
      </footer>
    </SlideShell>
  );
}