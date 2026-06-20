import Link from "next/link";
import BowlArt from "./BowlArt";
import StarAnise from "./StarAnise";
import { site } from "@/data/site";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-broth-ambient">
      {/* Faint star-anise watermark — a subtle nod to Vietnam and the broth's aromatics. */}
      <StarAnise className="pointer-events-none absolute -right-12 -top-10 h-56 w-56 text-broth/[0.06] md:h-72 md:w-72" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:py-24">
        <div>
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-herb/40 bg-herb/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-herb">
            <span className="h-1.5 w-1.5 rounded-full bg-herb" /> Phở kuhinja · {site.city}
          </p>
          <h1 className="font-display text-5xl font-extrabold leading-[0.95] text-steam md:text-7xl">
            Supa koja
            <br />
            <span className="text-broth">putuje.</span>
          </h1>
          <p className="mt-6 max-w-md text-lg text-bone/75">
            Prava vijetnamska phở supa, <span className="font-semibold text-broth">krčkana 6 sati</span>{" "}
            i dostavljena <span className="font-semibold text-herb">vrela</span>. Otvori, sipaj,
            gledaj kako se diže para.
          </p>
          <p className="mt-4 flex items-center gap-2 text-sm text-bone/55">
            <StarAnise className="h-4 w-4 shrink-0 text-broth/70" />
            Goveđa kost · đumbir · anis · cimet · karanfilić · kardamom
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/poruci"
              className="rounded-full bg-ember px-7 py-3 font-semibold text-steam shadow-glow transition hover:bg-broth hover:text-char"
            >
              Poruči odmah
            </Link>
            <Link
              href="/meni"
              className="rounded-full border border-bone/20 px-7 py-3 font-semibold text-bone transition hover:border-herb hover:text-herb"
            >
              Pogledaj meni
            </Link>
          </div>
          <p className="mt-5 text-sm text-bone/50">{site.support}</p>
        </div>

        <div className="relative mx-auto w-full max-w-sm">
          <BowlArt className="w-full" />
        </div>
      </div>
    </section>
  );
}
