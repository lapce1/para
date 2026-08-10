import Link from "next/link";

// The Worker serves the export's 404.html for unknown paths, so this is what a
// mistyped URL actually gets in production.
export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-[var(--section)]">
      <p className="font-data text-7xl font-bold tabular-nums text-chili md:text-8xl">404</p>
      <h1 className="wordset mt-4 text-4xl text-chalk md:text-6xl">
        Ove stranice nema
      </h1>
      <p className="mt-4 max-w-[54ch] text-lg leading-relaxed text-chalk/85">
        Ono što tražiš je ili premešteno ili nikad nije ni postojalo. Probaj odavde.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/"
          className="bg-chili px-7 py-4 font-display text-base font-extrabold uppercase tracking-tightest text-ground hover:bg-gold"
        >
          Početna
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
