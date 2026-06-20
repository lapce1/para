import type { Metadata } from "next";
import Link from "next/link";
import StarAnise from "@/components/StarAnise";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Priča",
  description: `Zašto PARA: vijetnamska phở kuhinja samo za dostavu u ${site.city}u. Supa krčkana 6 sati na govedoj kosti i pet začina, pakovana odvojeno da stigne kao iz kuhinje.`,
  alternates: { canonical: "/prica" },
  openGraph: {
    title: `Priča · ${site.name}`,
    description: `Vijetnamska phở kuhinja samo za dostavu u ${site.city}u.`,
    url: `${site.url}/prica`,
  },
};

const values = [
  {
    t: "6 sati, svaki dan",
    d: "Kosti, oxtail i pet začina krčkaju se od jutra. Bez kocki, bez prečica, bez konzervanasa.",
  },
  {
    t: "Samo dostava",
    d: "Nema sale, nema konobara — sav trošak ide u meso i supu, ne u kiriju lokala.",
  },
  {
    t: "Odvojeno pakovanje",
    d: "Supa, rezanci i začin putuju posebno. Zato ti činija stigne kao da je iz kuhinje.",
  },
];

export default function Prica() {
  return (
    <div className="relative mx-auto max-w-3xl px-5 py-16">
      <StarAnise className="pointer-events-none absolute -right-6 top-10 h-40 w-40 text-broth/[0.06] md:-right-16 md:h-52 md:w-52" />

      <h1 className="font-display text-4xl font-extrabold text-steam md:text-5xl">
        Para znači <span className="text-broth">para</span>.
      </h1>
      <p className="mt-4 text-lg text-bone/70">
        Na srpskom, para je ono što se diže iznad vrele činije. Za nas je to ceo
        brend: prava vijetnamska phở supa, dostavljena dovoljno vrela da se još puši
        kad otvoriš kutiju.
      </p>

      <div className="mt-10 space-y-6 leading-relaxed text-bone/70">
        <p>
          PARA je počela kao opsesija jednom činijom — onom iz uličnih kuhinja Hanoja.
          Dvojica osnivača, jedna kuhinja, nijedan sto. Umesto restorana, napravili
          smo kuhinju koja radi samo za dostavu i svu pažnju usmerili u ono što je u
          činiji.
        </p>
        <p>
          Goveđa supa se krčka <span className="font-semibold text-broth">6 sati</span>:
          juneće kosti, oxtail i grudni deo, pečeni đumbir i luk, pa pet začina —{" "}
          <span className="text-bone">anis, cimet, karanfilić, kardamom i đumbir</span>.
          Skidamo penu, bistrimo, strpljivo. Kad je gotova, ne sipamo je preko rezanaca
          i ne šaljemo tako — jer bi do tebe stigla raskuvana. Pakujemo supu posebno,
          pirinčane rezance posebno, <span className="font-semibold text-herb">sveže
          biljke</span> posebno. Ti spajaš sve za 90 sekundi i dobiješ činiju kakva
          treba da bude.
        </p>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-3">
        {values.map((v) => (
          <div key={v.t} className="rounded-2xl border border-white/5 bg-charsoft p-5">
            <h3 className="font-display font-bold text-broth">{v.t}</h3>
            <p className="mt-2 text-sm text-bone/60">{v.d}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/poruci"
          className="inline-block rounded-full bg-ember px-8 py-3 font-semibold text-steam hover:bg-broth hover:text-char"
        >
          Poruči i ti
        </Link>
        <p className="mt-4 text-sm text-bone/45">
          <span className="text-herb">Chúc ngon miệng</span> — prijatno.
        </p>
      </div>
    </div>
  );
}
