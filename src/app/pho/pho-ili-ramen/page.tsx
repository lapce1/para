import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { site } from "@/data/site";
import { phoRamenIntro, phoRamenRows, phoRamenFaq } from "@/data/phoRamen";
import { phoRamenFaqSchema, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Phở ili ramen — u čemu je razlika",
  description:
    "Phở ili ramen? Poreklo, čorba, rezanci i dodaci — jasno poređenje dve najpoznatije azijske supe sa rezancima, plus gde da probaš phở u Novom Sadu.",
  alternates: { canonical: "/pho/pho-ili-ramen" },
  openGraph: {
    title: `Phở ili ramen · ${site.name}`,
    description: "Poreklo, čorba, rezanci, dodaci — u čemu se phở i ramen zapravo razlikuju.",
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

      <nav aria-label="Putanja" className="stamp text-inksoft">
        <Link href="/pho" className="text-paprika hover:text-ink">
          Šta je phở
        </Link>
        <span aria-hidden="true"> / </span>
        Phở ili ramen
      </nav>

      <header className="mt-4 border-b-[3px] border-ink pb-8">
        <h1 className="wordset text-5xl text-ink md:text-7xl">Phở ili ramen?</h1>
        <p className="mt-5 text-lg leading-relaxed text-ink/85">{phoRamenIntro}</p>
      </header>

      {/* the comparison, printed as a ruled table */}
      <div className="mt-12">
        {phoRamenRows.map((r) => (
          <section key={r.dim} className="border-b border-ink/25 py-6 first:border-t first:border-ink/25">
            <h2 className="stamp text-inksoft">{r.dim}</h2>
            <div className="mt-3 grid gap-5 sm:grid-cols-2">
              <div className="border-l-[3px] border-paprika pl-4">
                <p className="font-display text-base font-extrabold uppercase tracking-tightest text-paprika">
                  Phở
                </p>
                <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink/85">{r.pho}</p>
              </div>
              <div className="border-l-[3px] border-ink/30 pl-4">
                <p className="font-display text-base font-extrabold uppercase tracking-tightest text-inksoft">
                  Ramen
                </p>
                <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink/80">{r.ramen}</p>
              </div>
            </div>
          </section>
        ))}
      </div>

      <section className="mt-14">
        <h2 className="wordset text-2xl text-ink md:text-3xl">Česta pitanja</h2>
        <dl className="mt-6">
          {phoRamenFaq.map((f) => (
            <div key={f.q} className="border-b border-ink/25 py-4 first:border-t first:border-ink/25">
              <dt className="font-display text-base font-extrabold tracking-tightest text-ink">
                {f.q}
              </dt>
              <dd className="mt-2 text-[0.9375rem] leading-relaxed text-ink/80">{f.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-12 border-t-[3px] border-ink pt-5">
        <h2 className="stamp text-inksoft">Dalje čitanje</h2>
        <p className="mt-2 text-[0.9375rem] text-ink/85">
          <Link
            href="/pho"
            className="font-semibold text-ink underline decoration-paprika decoration-2 underline-offset-4 hover:text-paprika"
          >
            Šta je phở — vodič kroz vijetnamsku supu
          </Link>{" "}
          — od čega se pravi, vrste i kako se jede.
        </p>
      </section>

      <div className="mt-12">
        <Link
          href="/poruci"
          className="misreg inline-block bg-paprika px-8 py-4 font-display text-base font-extrabold uppercase tracking-tightest text-paper hover:bg-ink"
        >
          {site.orderingLive ? "Poruči phở" : "Uskoro — upiši se"}
        </Link>
      </div>
    </div>
  );
}
