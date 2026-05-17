import { SlideShell, SlideHeader } from "../SlideShell";
import { CheckCircle2, Circle, FileBarChart, Users, FolderOpen, FileCheck, User } from "lucide-react";

export default function Slide05Demo() {
  const menu = [
    { Icon: FileBarChart, label: "VSME Profile", active: true },
    { Icon: Users, label: "My clients" },
    { Icon: FileCheck, label: "Output" },
    { Icon: FolderOpen, label: "Archive" },
  ];
  const clients = [
    { name: "Enel", status: "ok" as const, sub: "Form ready" },
    { name: "Unicredit", status: "ok" as const, sub: "Form ready" },
    { name: "Generali", status: "wip" as const, sub: "In progress" },
  ];

  return (
    <SlideShell>
      <SlideHeader eyebrow="Demo" title="The product" />

      <div className="flex-1 flex flex-col items-center">
        {/* browser frame */}
        <div className="w-full max-w-5xl rounded-2xl border border-border bg-background overflow-hidden shadow-sm">
          {/* chrome */}
          <div className="flex items-center gap-2 px-4 py-3 bg-muted border-b border-border">
            <span className="h-3 w-3 rounded-full bg-warn/70" />
            <span className="h-3 w-3 rounded-full bg-yellow-400/70" />
            <span className="h-3 w-3 rounded-full bg-primary/70" />
              <div className="ml-4 flex-1 max-w-md rounded-md bg-background border border-border px-3 py-1 text-xs text-muted-foreground">
                app.refillo.it/dashboard
              </div>
          </div>

          <div className="grid grid-cols-[220px_1fr] min-h-[420px]">
            {/* sidebar */}
            <aside className="bg-muted/60 border-r border-border p-4">
              <div className="text-foreground font-extrabold text-lg mb-5 uppercase tracking-tighter">Refill<span className="text-primary">o</span></div>
              <ul className="space-y-1">
                {menu.map(({ Icon, label, active }) => (
                  <li key={label}
                    className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${active ? "bg-primary text-primary-foreground font-semibold" : "text-foreground/80 hover:bg-background"}`}>
                    <Icon className="h-4 w-4" />
                    {label}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex items-center gap-2 text-xs text-muted-foreground">
                <User className="h-4 w-4" /> Acme Ltd.
              </div>
            </aside>

            {/* main */}
            <div className="p-6">
              <div className="text-xs uppercase tracking-widest text-primary font-semibold">VSME Profile</div>
              <h3 className="mt-1 text-xl font-bold text-foreground">Profile 80% complete</h3>
              <div className="mt-3 h-2.5 w-full rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: "80%" }} />
              </div>

              <div className="mt-7 text-sm font-semibold text-foreground/80">Your clients</div>
              <div className="mt-3 grid grid-cols-3 gap-3">
                {clients.map((c) => (
                  <div key={c.name} className="rounded-xl border border-border p-4 bg-background">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-foreground">{c.name}</span>
                      {c.status === "ok"
                        ? <CheckCircle2 className="h-5 w-5 text-primary" />
                        : <Circle className="h-5 w-5 text-warn" />}
                    </div>
                    <div className="mt-2 text-xs text-muted-foreground">{c.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <p className="mt-6 text-muted-foreground text-[15px]">
          Web app — no installation, works on any device.
        </p>
      </div>
    </SlideShell>
  );
}