import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { site } from "@/data/site";
import { phoIntro, phoSections, phoTypes, phoHowTo } from "@/data/pho";
import { phoGuideSchema, phoHowToSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Šta je phở: vodič kroz vijetnamsku supu",
  description: `Šta je phở supa, od čega se pravi, koje vrste postoje i kako se jede. Vodič kroz vijetnamsku phở supu, uz činiju krčkanu šest sati koju možeš da probaš za stolom ili na dostavu u ${site.cityLoc}.`,
  alternates: { canonical: "/pho" },
  openGraph: {
    title: `Šta je phở · ${site.name}`,
    description: `Vodič kroz vijetnamsku phở supu, za stolom ili na dostavu u ${site.cityLoc}.`,
    url: `${site.url}/pho`,
  },
};

export default function Pho() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-[var(--section)]">
      <JsonLd data={phoGuideSchema()} />
      <JsonLd data={phoHowToSchema()} />

      <header className="border-b-[3px] border-chalk pb-8">
        <h1 className="wordset text-5xl text-chalk md:text-7xl">Šta je phở?</h1>
        <p className="mt-5 text-lg leading-relaxed text-chalk/85">{phoIntro}</p>
      </header>

      <div className="mt-12 space-y-10">
        {phoSections.map((s) => (
          <section key={s.h}>
            <h2 className="wordset text-2xl text-chalk md:text-3xl">{s.h}</h2>
            <p className="mt-3 max-w-[68ch] leading-relaxed text-chalk/85">{s.p}</p>
          </section>
        ))}
      </div>

      <section className="mt-14">
        <h2 className="wordset text-2xl text-chalk md:text-3xl">Vrste phở-a</h2>
        <dl className="mt-6">
          {phoTypes.map((t) => (
            <div
              key={t.vi}
              className="border-b border-chalk/25 py-4 first:border-t first:border-chalk/25 sm:flex sm:gap-6"
            >
              <dt className="sm:w-44 sm:shrink-0">
                <span className="font-display text-lg font-extrabold tracking-tightest text-chalk">
                  {t.vi}
                </span>
                <span className="stamp mt-1 block text-jade">{t.sr}</span>
              </dt>
              <dd className="mt-2 text-[0.9375rem] leading-relaxed text-chalk/80 sm:mt-0">
                {t.d}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-14 border-[3px] border-chalk bg-raised p-6 md:p-8">
        <h2 className="wordset text-2xl text-chalk md:text-3xl">{phoHowTo.name}</h2>
        <ol className="mt-5 space-y-4">
          {phoHowTo.steps.map((step) => (
            <li key={step.name} className="border-b border-chalk/25 pb-4 last:border-0 last:pb-0">
              <p className="stamp text-jade">{step.name}</p>
              <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-chalk/85">
                {step.text}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-12 border-t-[3px] border-chalk pt-5">
        <h2 className="stamp text-chalksoft">Dalje čitanje</h2>
        <p className="mt-2 text-[0.9375rem] text-chalk/85">
          <Link
            href="/pho/pho-ili-ramen"
            className="font-semibold text-chalk underline decoration-jade decoration-2 underline-offset-4 hover:text-jade"
          >
            Phở ili ramen, u čemu je razlika
          </Link>{" "}
          i kako se razlikuju po poreklu, čorbi, rezancima i dodacima.
        </p>
      </section>

      <div className="mt-12">
        <Link
          href="/poruci"
          className="inline-block bg-chili px-8 py-4 font-display text-base font-extrabold uppercase tracking-tightest text-ground hover:bg-gold"
        >
          {site.orderingLive ? "Poruči phở" : "Javi mi kad otvorite"}
        </Link>
        <p className="stamp mt-4 text-chalksoft">Chúc ngon miệng · prijatno</p>
      </div>
    </div>
  );
}
