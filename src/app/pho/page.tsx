import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { site } from "@/data/site";
import { phoIntro, phoSections, phoTypes, phoHowTo } from "@/data/pho";
import { phoGuideSchema, phoHowToSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Šta je phở — vodič kroz vijetnamsku supu",
  description: `Šta je phở supa, od čega se pravi, vrste i kako se jede. Vodič kroz vijetnamsku phở supu — probaj je za stolom ili na dostavu u ${site.cityLoc}; supa krčkana 6 sati.`,
  alternates: { canonical: "/pho" },
  openGraph: {
    title: `Šta je phở · ${site.name}`,
    description: `Vodič kroz vijetnamsku phở supu — za stolom ili na dostavu u ${site.cityLoc}.`,
    url: `${site.url}/pho`,
  },
};

export default function Pho() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-[var(--section)]">
      <JsonLd data={phoGuideSchema()} />
      <JsonLd data={phoHowToSchema()} />

      <header className="border-b-[3px] border-ink pb-8">
        <h1 className="wordset text-5xl text-ink md:text-7xl">Šta je phở?</h1>
        <p className="mt-5 text-lg leading-relaxed text-ink/85">{phoIntro}</p>
      </header>

      <div className="mt-12 space-y-10">
        {phoSections.map((s) => (
          <section key={s.h}>
            <h2 className="wordset text-2xl text-ink md:text-3xl">{s.h}</h2>
            <p className="mt-3 max-w-[68ch] leading-relaxed text-ink/85">{s.p}</p>
          </section>
        ))}
      </div>

      <section className="mt-14">
        <h2 className="wordset text-2xl text-ink md:text-3xl">Vrste phở-a</h2>
        <dl className="mt-6">
          {phoTypes.map((t) => (
            <div
              key={t.vi}
              className="border-b border-ink/25 py-4 first:border-t first:border-ink/25 sm:flex sm:gap-6"
            >
              <dt className="sm:w-44 sm:shrink-0">
                <span className="font-display text-lg font-extrabold tracking-tightest text-ink">
                  {t.vi}
                </span>
                <span className="stamp mt-1 block text-paprika">{t.sr}</span>
              </dt>
              <dd className="mt-2 text-[0.9375rem] leading-relaxed text-ink/80 sm:mt-0">
                {t.d}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-14 border-[3px] border-ink bg-board p-6 md:p-8">
        <h2 className="wordset text-2xl text-ink md:text-3xl">{phoHowTo.name}</h2>
        <ol className="mt-5 space-y-4">
          {phoHowTo.steps.map((step) => (
            <li key={step.name} className="border-b border-ink/25 pb-4 last:border-0 last:pb-0">
              <p className="stamp text-paprika">{step.name}</p>
              <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink/85">
                {step.text}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-12 border-t-[3px] border-ink pt-5">
        <h2 className="stamp text-inksoft">Dalje čitanje</h2>
        <p className="mt-2 text-[0.9375rem] text-ink/85">
          <Link
            href="/pho/pho-ili-ramen"
            className="font-semibold text-ink underline decoration-paprika decoration-2 underline-offset-4 hover:text-paprika"
          >
            Phở ili ramen — u čemu je razlika
          </Link>{" "}
          — poreklo, čorba, rezanci i dodaci, jedno pored drugog.
        </p>
      </section>

      <div className="mt-12">
        <Link
          href="/poruci"
          className="misreg inline-block bg-paprika px-8 py-4 font-display text-base font-extrabold uppercase tracking-tightest text-paper hover:bg-ink"
        >
          {site.orderingLive ? "Poruči phở" : "Uskoro — upiši se"}
        </Link>
        <p className="stamp mt-4 text-inksoft">Chúc ngon miệng — prijatno</p>
      </div>
    </div>
  );
}
