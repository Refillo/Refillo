import { SlideShell, SlideHeader } from "../SlideShell";
import dataQr from "@/assets/refillo-data-qr.png";
import edoardoRivaPhoto from "@/assets/edoardo-riva.jpeg";
import edoardoPolettiPhoto from "@/assets/edoardo-poletti.jpeg";
import riccardoVismaraPhoto from "@/assets/riccardo-vismara.jpeg";
import davideSantanielloPhoto from "@/assets/davide-santaniello.jpeg";
import alessioVaghiPhoto from "@/assets/alessio-vaghi.jpeg";
import pepeRimoldiPhoto from "@/assets/pepe-rimoldi.jpeg";

const ROLE = "Bsc management engineering, Engineering/Industrial Management";
const team = [
  { initials: "RV", name: "Riccardo Vismara", role: ROLE, value: "Software developer", photo: riccardoVismaraPhoto },
  { initials: "DS", name: "Davide Santaniello", role: ROLE, value: "Database and AI algorithm developer", photo: davideSantanielloPhoto },
  { initials: "EP", name: "Edoardo Poletti", role: ROLE, value: "Partnerships and regulations", photo: edoardoPolettiPhoto },
  { initials: "PR", name: "Pepe Rimoldi", role: ROLE, value: "Clients acquisition and digital marketing", photo: pepeRimoldiPhoto },
  { initials: "AV", name: "Alessio Vaghi", role: ROLE, value: "Analysis of the main risks and problems", photo: alessioVaghiPhoto },
  { initials: "ER", name: "Edoardo Riva", role: ROLE, value: "UX and product strategy", photo: edoardoRivaPhoto },
];

export default function Slide10Team() {
  return (
    <SlideShell>
      <SlideHeader eyebrow="The team" title="The people behind REFILLO" />
      <div className="grid grid-cols-3 gap-5">
        {team.map((m) => (
          <article key={m.initials} className="rounded-2xl bg-background border border-border p-5 accent-bar-left flex items-center gap-4">
            {m.photo ? (
              <img
                src={m.photo}
                alt={m.name}
                className="h-20 w-20 shrink-0 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-xl">
                {m.initials}
              </div>
            )}
            <div className="min-w-0 flex-1 text-left">
              <div className="font-bold text-foreground text-base leading-tight">{m.name}</div>
              <div className="text-xs text-muted-foreground font-semibold mt-1">{m.role}</div>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <a
          href="https://bit.ly/4t8aiyC"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-6 rounded-2xl border border-border bg-background px-8 py-5 transition hover:bg-muted"
        >
          <img src={dataQr} alt="QR code" className="h-36 w-36 shrink-0" />
          <div className="flex items-center gap-3 text-lg">
            <span className="font-semibold text-foreground">
              Explore the data behind REFILLO
            </span>
            <span className="text-primary underline underline-offset-4">
              https://bit.ly/4t8aiyC
            </span>
          </div>
        </a>
      </div>
    </SlideShell>
  );
}