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

// Keyless embed: no Google Cloud project or API key needed. Query includes the
// name so a claimed Google Business Profile resolves to the real pin, not just
// a geocoded street address.
const mapQuery = encodeURIComponent(`${site.name}, ${site.address}, ${site.city}`);
const mapEmbedSrc = `https://www.google.com/maps?q=${mapQuery}&output=embed`;
const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

const service: { k: string; v: string }[] = [
  {
    k: "Za stolom",
    v: "Imamo nekoliko stolova i ne primamo rezervacije. Dođeš, sedneš i jedeš dok je vrelo.",
  },
  {
    k: "Za poneti",
    v: "Spakujemo ti dok čekaš. Reci samo koliko ljutog hoćeš.",
  },
  {
    k: "Dostava",
    v: `Vozimo po celom ${site.cityLoc}. Čorbu i rezance pakujemo odvojeno, da rezanci ne stignu raskuvani.`,
  },
];

export default function Home() {
  return (
    <>
      <JsonLd data={faqSchema()} />
      <Hero />

      {/* the one thing worth explaining at length */}
      <section className="border-b-[3px] border-chalk bg-chili text-ground">
        <div className="mx-auto max-w-6xl px-5 py-[var(--section)]">
          <div className="md:grid md:grid-cols-12 md:gap-12">
            <h2 className="wordset col-span-6 text-[2.5rem] sm:text-5xl md:text-[3.5rem]">
              Zašto kuvamo samo jedno jelo
            </h2>
            <div className="col-span-6 mt-6 space-y-4 text-[1.0625rem] leading-relaxed md:mt-2">
              <p>
                Zato što čorba pojede ceo dan. Kosti se prvo peku, pa se krčkaju na
                tihoj vatri i satima im se skida pena. Ne puštamo da proključa, jer bi
                se čorba zamutila. Posle šest sati je bistra toliko da se vidi dno
                činije, a gusta je od kolagena, a ne od zgušnjivača.
              </p>
              <p>
                Ostalo je jednostavno. Rezance kuvamo tek kad poručiš, meso sečemo
                tanko da se skuva u vrelini čorbe, a nana i bosiljak idu sveži preko.
                Ako uz to hoćeš pivo, imamo hladan Pilsner i to je ceo izbor.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* the menu, printed as a price list */}
      <section className="mx-auto max-w-6xl px-5 py-[var(--section)]">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="wordset text-4xl text-chalk md:text-5xl">Meni, ceo</h2>
          <Link
            href="/meni"
            className="stamp border-b-[3px] border-jade py-2 text-jade hover:border-chalk hover:text-chalk"
          >
            Detaljnije
          </Link>
        </div>
        <div className="mt-10">
          {menu.map((m) => (
            <MenuCard key={m.id} item={m} />
          ))}
        </div>
      </section>

      {/* how you get it. Small on purpose: it is logistics, not the product. */}
      <section className="border-y-[3px] border-chalk bg-raised">
        <div className="mx-auto max-w-6xl px-5 py-12">
          <dl className="grid gap-x-10 gap-y-6 sm:grid-cols-3">
            {service.map((s) => (
              <div key={s.k}>
                <dt className="stamp text-jade">{s.k}</dt>
                <dd className="mt-2 text-[0.9375rem] leading-relaxed text-chalk/80">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-[var(--section)]">
        <h2 className="wordset text-4xl text-chalk md:text-5xl">Često pitate</h2>
        <dl className="mt-10">
          {faq.map((f) => (
            <div
              key={f.q}
              className="border-b border-chalk/25 py-5 first:border-t first:border-chalk/25"
            >
              <dt className="font-display text-lg font-extrabold tracking-tightest text-chalk">
                {f.q}
              </dt>
              <dd className="mt-2 max-w-[68ch] text-[0.9375rem] leading-relaxed text-chalk/80">
                {f.a}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* the close: where to actually go */}
      <section className="border-t-[3px] border-chalk bg-jade text-ground">
        <div className="mx-auto max-w-6xl px-5 py-[var(--section)] md:grid md:grid-cols-12 md:items-start md:gap-12">
          <div className="min-w-0 md:col-span-7">
            {/* fluid base: "STRAŽILOVSKA" is long and the display face is wide, so a
                fixed mobile size overflows narrow viewports. */}
            <h2 className="wordset text-[clamp(1.75rem,7.5vw,2.5rem)] leading-[0.95] sm:text-6xl md:text-7xl">
              {site.address}
              <br />
              {site.city}
            </h2>
            <p className="mt-6 max-w-[54ch] text-[1.0625rem] leading-relaxed">
              U centru smo, blizu fakulteta, i otvoreni smo {site.hours.toLowerCase()}.
              Dostavljamo u: {site.zones.join(", ")}.
            </p>
            <Link
              href="/poruci"
              className="mt-8 inline-block bg-ground px-8 py-4 font-display text-base font-extrabold uppercase tracking-tightest text-chalk hover:bg-chili hover:text-ground"
            >
              {site.orderingLive ? "Poruči činiju" : "Javi mi kad otvorite"}
            </Link>
          </div>

          {/* the map, boxed like every other panel on the site rather than
              floated as a card: a flat window, not a widget. */}
          <div className="min-w-0 mt-10 md:col-span-5 md:mt-0">
            <p className="stamp">Kako do nas</p>
            <div className="mt-3 h-64 border-[3px] border-ground sm:h-80 md:h-96">
              <iframe
                src={mapEmbedSrc}
                title={`Mapa: ${site.name}, ${site.address}, ${site.city}`}
                loading="lazy"
                className="h-full w-full border-0"
              />
            </div>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="stamp mt-3 inline-block border-b-[3px] border-ground py-1 hover:border-chalk"
            >
              Otvori u Google mapama
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
