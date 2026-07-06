import type { Metadata } from "next";
import Link from "next/link";
import HerbSprig from "@/components/HerbSprig";
import JsonLd from "@/components/JsonLd";
import { site } from "@/data/site";
import { phoRamenIntro, phoRamenRows, phoRamenFaq } from "@/data/phoRamen";
import { phoRamenFaqSchema, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Phở ili ramen — u čemu je razlika",
  description:
    "Phở ili ramen? Poreklo, supa, rezanci i dodaci — jasno poređenje dve najpoznatije azijske supe sa rezancima, plus gde da probaš phở u Novom Sadu.",
  alternates: { canonical: "/pho/pho-ili-ramen" },
  openGraph: {
    title: `Phở ili ramen · ${site.name}`,
    description: "Poreklo, supa, rezanci, dodaci — u čemu se phở i ramen zapravo razlikuju.",
    url: `${site.url}/pho/pho-ili-ramen`,
  },
};

const crumbs = [
  { name: "Početna", path: "/" },
  { name: "Šta je phở", path: "/pho" },
  { name: "Phở ili ramen", path: "/pho/pho-ili-ramen" },
];

export default function PhoIliRamen() {
  return (
    <div className="relative mx-auto max-w-3xl px-5 py-16">
      <JsonLd data={phoRamenFaqSchema()} />
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <HerbSprig className="pointer-events-none absolute -right-6 top-10 h-40 w-40 text-herb/[0.1] md:-right-16 md:h-52 md:w-52" />

      <nav aria-label="Putanja" className="text-sm text-bone/50">
        <Link href="/pho" className="text-broth hover:text-steam">
          Šta je phở
        </Link>{" "}
        / Phở ili ramen
      </nav>

      <h1 className="mt-4 font-display text-4xl font-extrabold text-steam md:text-5xl">
        Phở ili <span className="text-broth">ramen</span>?
      </h1>
      <p className="mt-4 text-lg text-bone/70">{phoRamenIntro}</p>

      <div className="mt-12 space-y-6">
        {phoRamenRows.map((r) => (
          <section key={r.dim}>
            <h2 className="font-display text-2xl font-bold text-broth">{r.dim}</h2>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-herb/20 bg-charsoft p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-herb">Phở</p>
                <p className="mt-2 text-sm leading-relaxed text-bone/70">{r.pho}</p>
              </div>
              <div className="rounded-2xl border border-white/5 bg-charsoft p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-bone/50">Ramen</p>
                <p className="mt-2 text-sm leading-relaxed text-bone/70">{r.ramen}</p>
              </div>
            </div>
          </section>
        ))}
      </div>

      <section className="mt-14">
        <h2 className="font-display text-2xl font-bold text-broth">Česta pitanja</h2>
        <dl className="mt-5 space-y-4">
          {phoRamenFaq.map((f) => (
            <div key={f.q} className="rounded-2xl border border-white/5 bg-charsoft p-5">
              <dt className="font-display font-bold text-bone">{f.q}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-bone/70">{f.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-12 rounded-2xl border border-white/5 bg-charsoft p-5">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-bone/50">
          Dalje čitanje
        </h2>
        <p className="mt-2 text-sm text-bone/70">
          <Link href="/pho" className="text-broth hover:text-steam">
            Šta je phở — vodič kroz vijetnamsku supu
          </Link>{" "}
          — od čega se pravi, vrste i kako se jede.
        </p>
      </section>

      <div className="mt-14 text-center">
        <Link
          href="/poruci"
          className="inline-block rounded-full bg-emberdark px-8 py-3 font-semibold text-steam hover:bg-broth hover:text-char"
        >
          {site.orderingLive ? "Poruči phở" : "Uskoro — upiši se"}
        </Link>
      </div>
    </div>
  );
}
