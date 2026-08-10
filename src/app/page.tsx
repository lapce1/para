import type { Metadata } from "next";
import Link from "next/link";
import Hero from "@/components/Hero";
import MenuCard from "@/components/MenuCard";
import JsonLd from "@/components/JsonLd";
import { menu } from "@/data/menu";
import { faq } from "@/data/faq";
import { site } from "@/data/site";
import { faqSchema } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const service: { k: string; v: string }[] = [
  { k: "Za stolom", v: "Nekoliko stolova, bez rezervacije. Sedneš i jedeš dok se puši." },
  { k: "Za poneti", v: "Spakujemo dok čekaš. Reci nam koliko ljutog hoćeš." },
  { k: "Dostava", v: `Ceo ${site.city}. Čorba i rezanci putuju odvojeno da ostanu kako treba.` },
];

export default function Home() {
  const featured = menu.filter((m) => m.category === "supe").slice(0, 3);

  return (
    <>
      <JsonLd data={faqSchema()} />
      <Hero />

      {/* committed field: the one claim worth shouting */}
      <section className="tooth border-b-[3px] border-ink bg-paprika text-paper">
        <div className="mx-auto max-w-6xl px-5 py-[var(--section)]">
          <div className="md:grid md:grid-cols-12 md:gap-10">
            <h2 className="wordset col-span-7 text-[2.75rem] sm:text-6xl md:text-[4.25rem]">
              Čorba je
              <br />
              ceo posao.
            </h2>
            <div className="col-span-5 mt-6 space-y-4 text-[1.0625rem] leading-relaxed md:mt-2">
              <p>
                Kosti se prvo peku, pa se čorba krčka na tihoj vatri i satima joj se
                skida pena. Ne ključa — od ključanja bi se zamutila. Posle šest sati
                je bistra toliko da se vidi dno činije, a gusta od kolagena, ne od
                zgušnjivača.
              </p>
              <p className="text-paper/85">
                Sve ostalo u činiji je tu da tu čorbu ne pokvari: rezanci se kuvaju po
                porudžbini, meso se seče tanko da se skuva u vrelini, biljke idu sveže
                preko.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* the product itself, as a price list */}
      <section className="mx-auto max-w-6xl px-5 py-[var(--section)]">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="wordset text-4xl text-ink md:text-5xl">Iz kuhinje</h2>
          <Link
            href="/meni"
            className="stamp border-b-[3px] border-paprika py-2 text-paprika hover:border-ink hover:text-ink"
          >
            Ceo meni
          </Link>
        </div>
        <div className="mt-10">
          {featured.map((m) => (
            <MenuCard key={m.id} item={m} />
          ))}
        </div>
      </section>

      {/* quiet strip: how you get it. Deliberately small — it is logistics, not the product. */}
      <section className="border-y-[3px] border-ink bg-board">
        <div className="mx-auto max-w-6xl px-5 py-12">
          <dl className="grid gap-x-10 gap-y-6 sm:grid-cols-3">
            {service.map((s) => (
              <div key={s.k}>
                <dt className="stamp text-paprika">{s.k}</dt>
                <dd className="mt-2 text-[0.9375rem] leading-relaxed text-ink/80">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-[var(--section)]">
        <h2 className="wordset text-4xl text-ink md:text-5xl">Često pitate</h2>
        <dl className="mt-10">
          {faq.map((f) => (
            <div key={f.q} className="border-b border-ink/25 py-5 first:border-t first:border-ink/25">
              <dt className="font-display text-lg font-extrabold tracking-tightest text-ink">
                {f.q}
              </dt>
              <dd className="mt-2 max-w-[68ch] text-[0.9375rem] leading-relaxed text-ink/80">
                {f.a}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* the close: where to actually go */}
      <section className="tooth border-t-[3px] border-ink bg-ink text-paper">
        <div className="mx-auto max-w-6xl px-5 py-[var(--section)]">
          <h2 className="wordset text-[2.5rem] leading-[0.95] sm:text-6xl md:text-7xl">
            {site.address}
            <br />
            <span className="text-lime">{site.city}</span>
          </h2>
          <p className="mt-6 max-w-[52ch] text-[1.0625rem] leading-relaxed text-paper/85">
            U centru, blizu fakulteta. Otvoreno {site.hours.toLowerCase()}. Dostava:{" "}
            {site.zones.join(", ")}.
          </p>
          <Link
            href="/poruci"
            className="misreg mt-8 inline-block bg-lime px-8 py-4 font-display text-base font-extrabold uppercase tracking-tightest text-ink hover:bg-paper"
          >
            {site.orderingLive ? "Poruči činiju" : "Uskoro — upiši se"}
          </Link>
        </div>
      </section>
    </>
  );
}
