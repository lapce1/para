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
      <h1 className="wordset text-4xl text-chalk md:text-5xl">Došlo je do greške</h1>
      <p className="mt-4 text-lg leading-relaxed text-chalk/85">
        Plaćanje nije moglo da se obradi. Ako je iznos rezervisan na tvojoj kartici, biće
        vraćen. Pokušaj ponovo ili nas pozovi pa ćemo rešiti.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/poruci"
          className="bg-chili px-7 py-4 font-display text-base font-extrabold uppercase tracking-tightest text-ground hover:bg-gold"
        >
          Pokušaj ponovo
        </Link>
        <a
          href={`tel:${site.phone.replace(/\s/g, "")}`}
          className="border-[3px] border-chalk px-7 py-4 font-display text-base font-extrabold uppercase tracking-tightest text-chalk hover:bg-chalk hover:text-ground"
        >
          Pozovi {site.phone}
        </a>
      </div>
    </div>
  );
}
