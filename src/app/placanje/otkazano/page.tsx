import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Plaćanje otkazano",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <div className="mx-auto max-w-xl px-5 py-[var(--section)]">
      <h1 className="wordset text-4xl text-chalk md:text-5xl">Plaćanje otkazano</h1>
      <p className="mt-4 text-lg leading-relaxed text-chalk/85">
        Prekinuo si plaćanje i ništa nije naplaćeno. Korpa ti je sačuvana, pa možeš da
        pokušaš ponovo kad budeš spreman.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/poruci"
          className="bg-chili px-7 py-4 font-display text-base font-extrabold uppercase tracking-tightest text-ground hover:bg-gold"
        >
          Nazad na korpu
        </Link>
        <Link
          href="/meni"
          className="border-[3px] border-chalk px-7 py-4 font-display text-base font-extrabold uppercase tracking-tightest text-chalk hover:bg-chalk hover:text-ground"
        >
          Pogledaj meni
        </Link>
      </div>
    </div>
  );
}
