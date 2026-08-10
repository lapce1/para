import Link from "next/link";

// The Worker serves the export's 404.html for unknown paths, so this is what a
// mistyped URL actually gets in production.
export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-[var(--section)]">
      <p className="font-data text-7xl font-bold tabular-nums text-paprika md:text-8xl">404</p>
      <h1 className="wordset mt-4 text-4xl text-ink md:text-6xl">
        Ova činija ne postoji
      </h1>
      <p className="mt-4 max-w-[54ch] text-lg leading-relaxed text-ink/85">
        Stranica koju tražiš je ili pojedena ili nikad nije bila na meniju.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/"
          className="misreg bg-paprika px-7 py-4 font-display text-base font-extrabold uppercase tracking-tightest text-paper hover:bg-ink"
        >
          Početna
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
