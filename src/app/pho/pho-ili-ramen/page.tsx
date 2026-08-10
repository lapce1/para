import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { site } from "@/data/site";
import { phoRamenIntro, phoRamenRows, phoRamenFaq } from "@/data/phoRamen";
import { phoRamenFaqSchema, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Phở ili ramen, u čemu je razlika",
  description:
    "Phở ili ramen? Poreklo, čorba, rezanci i dodaci, pa jasno poređenje dve najpoznatije azijske supe sa rezancima, i gde da probaš phở u Novom Sadu.",
  alternates: { canonical: "/pho/pho-ili-ramen" },
  openGraph: {
    title: `Phở ili ramen · ${site.name}`,
    description: "Poreklo, čorba, rezanci i dodaci: u čemu se phở i ramen zapravo razlikuju.",
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
    <div className="mx-auto max-w-3xl px-5 py-[var(--section)]">
      <JsonLd data={phoRamenFaqSchema()} />
      <JsonLd data={breadcrumbSchema(crumbs)} />

      <nav aria-label="Putanja" className="stamp text-chalksoft">
        <Link href="/pho" className="text-jade hover:text-chalk">
          Šta je phở
        </Link>
        <span aria-hidden="true"> / </span>
        Phở ili ramen
      </nav>

      <header className="mt-4 border-b-[3px] border-chalk pb-8">
        <h1 className="wordset text-5xl text-chalk md:text-7xl">Phở ili ramen?</h1>
        <p className="mt-5 text-lg leading-relaxed text-chalk/85">{phoRamenIntro}</p>
      </header>

      {/* the comparison, printed as a ruled table */}
      <div className="mt-12">
        {phoRamenRows.map((r) => (
          <section
            key={r.dim}
            className="border-b border-chalk/25 py-6 first:border-t first:border-chalk/25"
          >
            <h2 className="stamp text-chalksoft">{r.dim}</h2>
            <div className="mt-3 grid gap-5 sm:grid-cols-2">
              <div className="border-l-[3px] border-jade pl-4">
                <p className="font-display text-base font-extrabold uppercase tracking-tightest text-jade">
                  Phở
                </p>
                <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-chalk/85">{r.pho}</p>
              </div>
              <div className="border-l-[3px] border-chalk/30 pl-4">
                <p className="font-display text-base font-extrabold uppercase tracking-tightest text-chalksoft">
                  Ramen
                </p>
                <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-chalk/80">{r.ramen}</p>
              </div>
            </div>
          </section>
        ))}
      </div>

      <section className="mt-14">
        <h2 className="wordset text-2xl text-chalk md:text-3xl">Česta pitanja</h2>
        <dl className="mt-6">
          {phoRamenFaq.map((f) => (
            <div
              key={f.q}
              className="border-b border-chalk/25 py-4 first:border-t first:border-chalk/25"
            >
              <dt className="font-display text-base font-extrabold tracking-tightest text-chalk">
                {f.q}
              </dt>
              <dd className="mt-2 text-[0.9375rem] leading-relaxed text-chalk/80">{f.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-12 border-t-[3px] border-chalk pt-5">
        <h2 className="stamp text-chalksoft">Dalje čitanje</h2>
        <p className="mt-2 text-[0.9375rem] text-chalk/85">
          <Link
            href="/pho"
            className="font-semibold text-chalk underline decoration-jade decoration-2 underline-offset-4 hover:text-jade"
          >
            Šta je phở, vodič kroz vijetnamsku supu
          </Link>{" "}
          i od čega se pravi, koje vrste postoje i kako se jede.
        </p>
      </section>

      <div className="mt-12">
        <Link
          href="/poruci"
          className="inline-block bg-chili px-8 py-4 font-display text-base font-extrabold uppercase tracking-tightest text-ground hover:bg-gold"
        >
          {site.orderingLive ? "Poruči phở" : "Javi mi kad otvorite"}
        </Link>
      </div>
    </div>
  );
}
