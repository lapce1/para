import type { Metadata } from "next";
import Link from "next/link";
import HerbSprig from "@/components/HerbSprig";
import JsonLd from "@/components/JsonLd";
import { site } from "@/data/site";
import { phoIntro, phoSections, phoTypes, phoHowTo } from "@/data/pho";
import { phoGuideSchema, phoHowToSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Šta je phở — vodič kroz vijetnamsku supu",
  description: `Šta je phở supa, od čega se pravi, vrste i kako se jede. Vodič kroz vijetnamsku phở supu i dostava sveže u ${site.city}u — supa krčkana 6 sati.`,
  alternates: { canonical: "/pho" },
  openGraph: {
    title: `Šta je phở · ${site.name}`,
    description: `Vodič kroz vijetnamsku phở supu — i dostava sveže u ${site.city}u.`,
    url: `${site.url}/pho`,
  },
};

export default function Pho() {
  return (
    <div className="relative mx-auto max-w-3xl px-5 py-16">
      <JsonLd data={phoGuideSchema()} />
      <JsonLd data={phoHowToSchema()} />
      <HerbSprig className="pointer-events-none absolute -right-6 top-10 h-40 w-40 text-herb/[0.1] md:-right-16 md:h-52 md:w-52" />

      <h1 className="font-display text-4xl font-extrabold text-steam md:text-5xl">
        Šta je <span className="text-broth">phở</span>?
      </h1>
      <p className="mt-4 text-lg text-bone/70">{phoIntro}</p>

      <div className="mt-12 space-y-10">
        {phoSections.map((s) => (
          <section key={s.h}>
            <h2 className="font-display text-2xl font-bold text-broth">{s.h}</h2>
            <p className="mt-3 leading-relaxed text-bone/70">{s.p}</p>
          </section>
        ))}
      </div>

      <section className="mt-12">
        <h2 className="font-display text-2xl font-bold text-broth">Vrste phở-a</h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-3">
          {phoTypes.map((t) => (
            <div key={t.vi} className="rounded-2xl border border-white/5 bg-charsoft p-5">
              <h3 className="font-display font-bold text-bone">{t.vi}</h3>
              <p className="text-xs uppercase tracking-wider text-herb">{t.sr}</p>
              <p className="mt-2 text-sm text-bone/60">{t.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl font-bold text-broth">{phoHowTo.name}</h2>
        <ol className="mt-5 space-y-4">
          {phoHowTo.steps.map((step, i) => (
            <li
              key={step.name}
              className="flex gap-4 rounded-2xl border border-white/5 bg-charsoft p-5"
            >
              <span className="font-display text-lg font-extrabold text-ember">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-display font-bold text-bone">{step.name}</h3>
                <p className="mt-1 text-sm text-bone/60">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <div className="mt-14 text-center">
        <Link
          href="/poruci"
          className="inline-block rounded-full bg-ember px-8 py-3 font-semibold text-steam hover:bg-broth hover:text-char"
        >
          Poruči phở
        </Link>
        <p className="mt-4 text-sm text-bone/45">
          <span className="text-herb">Chúc ngon miệng</span> — prijatno.
        </p>
      </div>
    </div>
  );
}
