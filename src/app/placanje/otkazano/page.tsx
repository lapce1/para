import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Plaćanje otkazano — PARA",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <div className="mx-auto max-w-xl px-5 py-24 text-center">
      <h1 className="font-display text-3xl font-extrabold text-steam">Plaćanje otkazano</h1>
      <p className="mt-3 text-bone/60">
        Prekinuo si plaćanje i ništa nije naplaćeno. Tvoja korpa je sačuvana — možeš
        pokušati ponovo kad budeš spreman.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link
          href="/poruci"
          className="rounded-full bg-ember px-7 py-3 font-semibold text-steam hover:bg-broth hover:text-char"
        >
          Nazad na korpu
        </Link>
        <Link
          href="/meni"
          className="rounded-full border border-white/10 px-7 py-3 font-semibold text-bone"
        >
          Pogledaj meni
        </Link>
      </div>
    </div>
  );
}
