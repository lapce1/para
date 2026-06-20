import type { Metadata } from "next";
import Link from "next/link";
import Hero from "@/components/Hero";
import MenuCard from "@/components/MenuCard";
import StarAnise from "@/components/StarAnise";
import JsonLd from "@/components/JsonLd";
import { menu } from "@/data/menu";
import { faq } from "@/data/faq";
import { site } from "@/data/site";
import { faqSchema } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const accent: Record<string, string> = { broth: "text-broth", herb: "text-herb" };

const trust = [
  { k: "6h", v: "supa se krčka", c: "broth" },
  { k: "0", v: "konzervanasa", c: "herb" },
  { k: "vrelo", v: "na tvoja vrata", c: "broth" },
  { k: "odvojeno", v: "supa i rezanci putuju posebno", c: "herb" },
];

const steps = [
  { n: "01", t: "Otvori", d: "Vrela supa, rezanci i sveže biljke stižu u odvojenim kutijama." },
  { n: "02", t: "Sipaj", d: "Presipaš vrelu supu preko rezanaca. Rezanci ostaju savršeni, nikad raskuvani." },
  { n: "03", t: "Para", d: "Dodaš nanu, bosiljak, limetu i čili. Diže se para — i to je tvoja činija." },
];

const inBowl = [
  {
    t: "Supa",
    d: "Krčkana 6 sati na govedoj kosti, đumbiru, anisu, cimetu, karanfiliću i kardamomu.",
    c: "broth",
    star: true,
  },
  {
    t: "Pirinčani rezanci",
    d: "Svilenkasti pirinčani rezanci, pakovani odvojeno da nikad ne stignu raskuvani.",
    c: "broth",
  },
  {
    t: "Sveže biljke",
    d: "Nana, bosiljak, limeta i sveža čili papričica — sa strane, da ih dodaš po svom.",
    c: "herb",
  },
  {
    t: "Ti spajaš",
    d: "Presipaš, dodaš biljke, udahneš paru. Restoranska činija — sklopljena kod tebe.",
    c: "herb",
  },
];

export default function Home() {
  const featured = menu.filter((m) => m.category === "supe").slice(0, 3);

  return (
    <>
      <JsonLd data={faqSchema()} />
      <Hero />

      <section className="border-y border-white/5 bg-charsoft">
        <div className="mx-auto grid max-w-6xl grid-cols-2 px-5 md:grid-cols-4">
          {trust.map((t, i) => (
            <div key={i} className="py-6 text-center">
              <div className={`font-display text-2xl font-extrabold ${accent[t.c]}`}>{t.k}</div>
              <div className="mt-1 text-xs text-bone/50">{t.v}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <h2 className="font-display text-3xl font-extrabold text-steam md:text-4xl">
          Otvori. Sipaj. <span className="text-herb">Para.</span>
        </h2>
        <p className="mt-2 max-w-lg text-bone/60">
          Phở ne podnosi da rezanci čame u supi. Zato ništa ne mešamo unapred — ti
          spajaš činiju, sveže, kod kuće.
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

      <section className="relative overflow-hidden border-y border-white/5 bg-herb-ambient">
        <StarAnise className="pointer-events-none absolute -left-10 bottom-0 h-52 w-52 text-herb/[0.07]" />
        <div className="relative mx-auto max-w-6xl px-5 py-20">
          <h2 className="font-display text-3xl font-extrabold text-steam md:text-4xl">
            Šta je u <span className="text-broth">činiji</span>
          </h2>
          <p className="mt-2 max-w-xl text-bone/60">
            Bez prečica i bez kocki. Prava goveđa čorba, pirinčani rezanci i sveže
            biljke — svako stiže tačno kako treba.
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {inBowl.map((b) => (
              <div key={b.t} className="rounded-2xl border border-white/5 bg-charsoft p-6">
                <div className="flex items-center gap-2">
                  {b.star && <StarAnise className="h-5 w-5 text-broth" />}
                  <h3 className={`font-display text-lg font-bold ${accent[b.c]}`}>{b.t}</h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-bone/60">{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
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
        <div className="relative overflow-hidden rounded-3xl bg-ember p-8 text-steam md:p-12">
          <StarAnise className="pointer-events-none absolute -bottom-12 -right-8 h-56 w-56 text-black/10" />
          <span className="inline-flex rounded-full bg-herb px-3 py-1 text-xs font-bold uppercase tracking-wider text-char">
            PARA Combo
          </span>
          <h2 className="relative mt-4 font-display text-3xl font-extrabold md:text-4xl">
            Činija + ledena kafa
          </h2>
          <p className="relative mt-2 max-w-md text-steam/85">
            Bilo koja phở činija + vijetnamska ledena kafa,{" "}
            <span className="font-semibold text-herblight">100 din jeftinije</span>. Najbolji
            način da zaokružiš obrok.
          </p>
          <Link
            href="/meni"
            className="relative mt-6 inline-block rounded-full bg-steam px-7 py-3 font-semibold text-ember transition hover:bg-herb hover:text-char"
          >
            Sastavi combo
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-16">
        <h2 className="font-display text-3xl font-extrabold text-steam">Često pitate</h2>
        <dl className="mt-8 space-y-4">
          {faq.map((f) => (
            <div key={f.q} className="rounded-2xl border border-white/5 bg-charsoft p-5">
              <dt className="font-display font-bold text-broth">{f.q}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-bone/70">{f.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-24 text-center">
        <h2 className="font-display text-2xl font-bold text-bone">
          Dostavljamo u <span className="text-herb">{site.city}u</span>
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
