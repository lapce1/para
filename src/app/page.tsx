import type { Metadata } from "next";
import Link from "next/link";
import Hero from "@/components/Hero";
import MenuCard from "@/components/MenuCard";
import { menu } from "@/data/menu";
import { site } from "@/data/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const trust = [
  { k: "14h", v: "supa se kuva" },
  { k: "0", v: "konzervanasa" },
  { k: "~25 min", v: "do tvojih vrata" },
  { k: "odvojeno", v: "supa i rezanci putuju posebno" },
];

const steps = [
  { n: "01", t: "Otvori", d: "Vrela supa, rezanci i svež začin stižu u odvojenim kutijama." },
  { n: "02", t: "Sipaj", d: "Presipaš vrelu supu preko rezanaca. Rezanci ostaju savršeni, nikad raskuvani." },
  { n: "03", t: "Para", d: "Dodaš biljke, limetu i čili. Diže se para — i to je tvoja činija." },
];

export default function Home() {
  const featured = menu.filter((m) => m.category === "supe").slice(0, 3);

  return (
    <>
      <Hero />

      <section className="border-y border-white/5 bg-charsoft">
        <div className="mx-auto grid max-w-6xl grid-cols-2 px-5 md:grid-cols-4">
          {trust.map((t, i) => (
            <div key={i} className="py-6 text-center">
              <div className="font-display text-2xl font-extrabold text-broth">{t.k}</div>
              <div className="mt-1 text-xs text-bone/50">{t.v}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <h2 className="font-display text-3xl font-extrabold text-steam md:text-4xl">
          Otvori. Sipaj. Para.
        </h2>
        <p className="mt-2 max-w-lg text-bone/60">
          Phở ne podnosi da rezanci stoje u supi 25 minuta. Zato ništa ne mešamo
          unapred — ti spajaš činiju, sveže, kod kuće.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="rounded-2xl border border-white/5 bg-charsoft p-6">
              <div className="font-display text-sm font-bold text-ember">{s.n}</div>
              <h3 className="mt-2 font-display text-xl font-bold text-bone">{s.t}</h3>
              <p className="mt-2 text-sm text-bone/60">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-8">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="font-display text-3xl font-extrabold text-steam">Iz kuhinje</h2>
          <Link href="/meni" className="text-sm text-broth hover:text-steam">
            Ceo meni →
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((m) => (
            <MenuCard key={m.id} item={m} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="rounded-3xl border border-broth/20 bg-broth-ambient p-8 md:p-12">
          <h2 className="font-display text-3xl font-extrabold text-steam">PARA Combo</h2>
          <p className="mt-2 max-w-md text-bone/70">
            Bilo koja činija + vijetnamska ledena kafa, 100 din jeftinije. Najbolji
            način da završiš obrok.
          </p>
          <Link
            href="/meni"
            className="mt-6 inline-block rounded-full bg-ember px-7 py-3 font-semibold text-steam hover:bg-broth hover:text-char"
          >
            Sastavi combo
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-24 text-center">
        <h2 className="font-display text-2xl font-bold text-bone">
          Dostavljamo u {site.city}u
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-bone/60">{site.zones.join(" · ")}</p>
        <Link
          href="/poruci"
          className="mt-6 inline-block rounded-full bg-broth px-8 py-3 font-semibold text-char hover:bg-steam"
        >
          Poruči činiju
        </Link>
      </section>
    </>
  );
}
