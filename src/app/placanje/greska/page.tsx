import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Greška pri plaćanju — PARA",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <div className="mx-auto max-w-xl px-5 py-24 text-center">
      <h1 className="font-display text-3xl font-extrabold text-steam">Došlo je do greške</h1>
      <p className="mt-3 text-bone/60">
        Plaćanje nije moglo da se obradi. Ako je iznos rezervisan na tvojoj kartici, biće
        vraćen. Pokušaj ponovo ili nas kontaktiraj i rado ćemo pomoći.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link
          href="/poruci"
          className="rounded-full bg-ember px-7 py-3 font-semibold text-steam hover:bg-broth hover:text-char"
        >
          Pokušaj ponovo
        </Link>
        <a
          href={`tel:${site.phone.replace(/\s/g, "")}`}
          className="rounded-full border border-white/10 px-7 py-3 font-semibold text-bone"
        >
          Pozovi {site.phone}
        </a>
      </div>
    </div>
  );
}
