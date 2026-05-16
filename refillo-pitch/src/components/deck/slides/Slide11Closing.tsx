import { SlideShell } from "../SlideShell";
import { QrCode } from "lucide-react";
import refilloLogo from "@/assets/refillo-logo.png";

export default function Slide11Closing() {
  return (
    <SlideShell bg="primary" className="items-center justify-center text-center">
      <div className="flex-1 flex flex-col items-center justify-center text-primary-foreground">
        <div className="relative mb-6" style={{ width: 110, height: 110 }}>
          <div
            className="absolute inset-0 rounded-2xl bg-white/80"
            aria-hidden
          />
          <img
            src={refilloLogo}
            alt="Refillo logo"
            className="relative z-10"
            style={{ width: 110, height: 110, objectFit: "contain" }}
          />
        </div>
        <h2 className="font-extrabold leading-[0.95] tracking-tight" style={{ fontSize: 96 }}>
          Fill it in once.
        </h2>
        <h2 className="font-extrabold leading-[0.95] tracking-tight mt-3" style={{ fontSize: 96 }}>
          Reply to everyone.
        </h2>
        <p className="mt-10 text-primary-foreground/90" style={{ fontSize: 22 }}>
          Stop wasting your employees' time. The moment is now.
        </p>
      </div>

      <footer className="w-full pb-2 flex items-end justify-between text-primary-foreground">
        <div className="flex flex-col">
          <span className="font-extrabold text-3xl">Refillo</span>
          <span className="text-sm opacity-80 mt-1">hello@refillo.it · refillo.it</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="h-24 w-24 rounded-lg bg-white/10 border border-white/30 flex items-center justify-center">
            <QrCode className="h-16 w-16 text-primary-foreground/90" />
          </div>
          <span className="text-xs opacity-80">Scan</span>
        </div>
      </footer>
    </SlideShell>
  );
}