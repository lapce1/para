import Link from "next/link";
import HerbSprig from "@/components/HerbSprig";

// Branded 404. The Worker serves the export's 404.html for unknown paths, so
// this is what a mistyped URL actually gets in production.
export default function NotFound() {
  return (
    <div className="relative mx-auto max-w-2xl overflow-hidden px-5 py-28 text-center">
      <HerbSprig className="pointer-events-none absolute -right-8 top-6 h-40 w-40 text-herb/[0.1]" />
      <p className="font-display text-7xl font-extrabold text-broth">404</p>
      <h1 className="mt-4 font-display text-3xl font-extrabold text-steam">
        Ova činija ne postoji
      </h1>
      <p className="mt-3 text-bone/70">
        Stranica koju tražiš je ili pojedena ili nikad nije bila na meniju.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded-full bg-emberdark px-7 py-3 font-semibold text-steam transition hover:bg-broth hover:text-char"
        >
          Početna
        </Link>
        <Link
          href="/meni"
          className="rounded-full border border-bone/20 px-7 py-3 font-semibold text-bone transition hover:border-herb hover:text-herb"
        >
          Pogledaj meni
        </Link>
      </div>
    </div>
  );
}
