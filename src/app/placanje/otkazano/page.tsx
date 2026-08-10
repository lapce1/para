import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Plaćanje otkazano",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <div className="mx-auto max-w-xl px-5 py-[var(--section)]">
      <h1 className="wordset text-4xl text-ink md:text-5xl">Plaćanje otkazano</h1>
      <p className="mt-4 text-lg leading-relaxed text-ink/85">
        Prekinuo si plaćanje i ništa nije naplaćeno. Tvoja korpa je sačuvana — možeš
        pokušati ponovo kad budeš spreman.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/poruci"
          className="misreg bg-paprika px-7 py-4 font-display text-base font-extrabold uppercase tracking-tightest text-paper hover:bg-ink"
        >
          Nazad na korpu
        </Link>
        <Link
          href="/meni"
          className="misreg border-[3px] border-ink px-7 py-4 font-display text-base font-extrabold uppercase tracking-tightest text-ink hover:bg-lime"
        >
          Pogledaj meni
        </Link>
      </div>
    </div>
  );
}
