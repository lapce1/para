import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Greška pri plaćanju",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <div className="mx-auto max-w-xl px-5 py-[var(--section)]">
      <h1 className="wordset text-4xl text-ink md:text-5xl">Došlo je do greške</h1>
      <p className="mt-4 text-lg leading-relaxed text-ink/85">
        Plaćanje nije moglo da se obradi. Ako je iznos rezervisan na tvojoj kartici, biće
        vraćen. Pokušaj ponovo ili nas kontaktiraj i rado ćemo pomoći.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/poruci"
          className="misreg bg-paprika px-7 py-4 font-display text-base font-extrabold uppercase tracking-tightest text-paper hover:bg-ink"
        >
          Pokušaj ponovo
        </Link>
        <a
          href={`tel:${site.phone.replace(/\s/g, "")}`}
          className="misreg border-[3px] border-ink px-7 py-4 font-display text-base font-extrabold uppercase tracking-tightest text-ink hover:bg-lime"
        >
          Pozovi {site.phone}
        </a>
      </div>
    </div>
  );
}
