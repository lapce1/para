import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Politika privatnosti",
  description:
    "Kako PARA prikuplja, koristi i štiti tvoje podatke o ličnosti pri porudžbini, plaćanju i dostavi. Tvoja prava i kontakt.",
  alternates: { canonical: "/politika-privatnosti" },
};

const fill = (v: string, label: string) => v || `[${label}, dopuniti pre objave]`;

export default function PrivacyPage() {
  const entity = fill(site.legal.entity, "pun poslovni naziv");
  const effective = fill(site.legal.effectiveDate, "datum");
  const draft = !site.legal.entity || !site.legal.effectiveDate;

  return (
    <div className="mx-auto max-w-3xl px-5 py-[var(--section)]">
      <header className="border-b-[3px] border-chalk pb-8">
        <h1 className="wordset text-5xl text-chalk md:text-7xl">Politika privatnosti</h1>
        <p className="stamp mt-4 text-chalksoft">Stupa na snagu: {effective}</p>
      </header>

      {draft && (
        <p className="mt-8 border-[3px] border-gold bg-raised px-5 py-4 text-[0.9375rem] leading-relaxed text-chalk/85">
          Radna verzija. Pre objave treba uneti podatke rukovaoca (pun poslovni naziv,
          matični broj, PIB) i datum stupanja na snagu u{" "}
          <code className="font-data text-gold">site.legal</code>.
        </p>
      )}

      <div className="mt-10 space-y-10">
        <section>
          <h2 className="wordset text-2xl text-chalk md:text-3xl">Rukovalac podacima</h2>
          <p className="mt-3 leading-relaxed text-chalk/85">
            Rukovalac tvojim podacima o ličnosti je {entity}, sa lokalom u{" "}
            {site.addressLoc}, {site.city}. Za sva pitanja o privatnosti piši na{" "}
            <a href={`mailto:${site.email}`} className="text-jade hover:text-chalk">
              {site.email}
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="wordset text-2xl text-chalk md:text-3xl">Koje podatke prikupljamo</h2>
          <p className="mt-3 leading-relaxed text-chalk/85">
            Prikupljamo samo ono što nam treba da bismo ti pripremili i dostavili
            porudžbinu:
          </p>
          <dl className="mt-4 border-t border-chalk/25">
            {[
              {
                k: "Porudžbina",
                v: "Ime, adresa za dostavu, broj telefona i imejl adresa.",
              },
              {
                k: "Plaćanje",
                v: "Iznos i status transakcije. Broj kartice ne vidimo niti čuvamo, njega obrađuje banka preko procesora AllSecure.",
              },
              {
                k: "Lista čekanja",
                v: "Imejl adresa, ako se prijaviš da te obavestimo kada otvorimo.",
              },
              {
                k: "Tehnički podaci",
                v: "IP adresa i osnovni podaci o poseti, koje beleži naš host radi bezbednosti i rada sajta.",
              },
            ].map((r) => (
              <div
                key={r.k}
                className="grid gap-1.5 border-b border-chalk/25 py-4 sm:grid-cols-[11rem_1fr] sm:gap-6"
              >
                <dt className="stamp text-jade">{r.k}</dt>
                <dd className="text-[0.9375rem] leading-relaxed text-chalk/80">{r.v}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section>
          <h2 className="wordset text-2xl text-chalk md:text-3xl">Zašto ih koristimo</h2>
          <p className="mt-3 leading-relaxed text-chalk/85">
            Podatke o porudžbini koristimo da izvršimo ugovor, to jest da ti spremimo i
            dostavimo hranu i izdamo račun. Fiskalni račun izdajemo jer nas na to obavezuje
            zakon. Imejl sa liste čekanja koristimo samo na osnovu tvog pristanka i možeš
            da ga povučeš u svakom trenutku.
          </p>
        </section>

        <section>
          <h2 className="wordset text-2xl text-chalk md:text-3xl">Kome ih prosleđujemo</h2>
          <p className="mt-3 leading-relaxed text-chalk/85">
            Ne prodajemo tvoje podatke. Delimo ih samo sa saradnicima koji su neophodni da
            porudžbina prođe:
          </p>
          <dl className="mt-4 border-t border-chalk/25">
            {[
              { k: "AllSecure", v: "Obrada plaćanja karticom." },
              { k: "Resend", v: "Slanje fiskalnog računa i potvrda na imejl." },
              { k: "Cloudflare", v: "Hosting sajta i baze porudžbina." },
              { k: "Kurirska služba", v: "Dostava na tvoju adresu." },
              { k: "Poreska uprava", v: "Fiskalizacija računa, po zakonu." },
            ].map((r) => (
              <div
                key={r.k}
                className="grid gap-1.5 border-b border-chalk/25 py-4 sm:grid-cols-[11rem_1fr] sm:gap-6"
              >
                <dt className="stamp text-jade">{r.k}</dt>
                <dd className="text-[0.9375rem] leading-relaxed text-chalk/80">{r.v}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section>
          <h2 className="wordset text-2xl text-chalk md:text-3xl">Kolačići i analitika</h2>
          <p className="mt-3 leading-relaxed text-chalk/85">
            Koristimo samo kolačiće neophodne za rad sajta i korpe. Alat za analitiku (Meta
            Pixel) trenutno nije aktivan i ne šalje nikakve podatke. Ako ga jednom
            uključimo, dopunićemo ovu politiku i tražiti pristanak gde je potreban.
          </p>
        </section>

        <section>
          <h2 className="wordset text-2xl text-chalk md:text-3xl">Koliko dugo čuvamo</h2>
          <p className="mt-3 leading-relaxed text-chalk/85">
            Podatke o porudžbini i račune čuvamo onoliko koliko nalažu poreski i
            računovodstveni propisi. Imejl sa liste čekanja čuvamo dok se ne odjaviš ili
            dok ne otvorimo, šta pre dođe.
          </p>
        </section>

        <section>
          <h2 className="wordset text-2xl text-chalk md:text-3xl">Tvoja prava</h2>
          <p className="mt-3 leading-relaxed text-chalk/85">
            Imaš pravo da vidiš koje podatke o tebi imamo, da ih ispraviš ili obrišeš, kao
            i da uložiš prigovor na obradu. Piši nam na{" "}
            <a href={`mailto:${site.email}`} className="text-jade hover:text-chalk">
              {site.email}
            </a>
            . Ako misliš da ne postupamo kako treba, možeš da se obratiš Povereniku za
            informacije od javnog značaja i zaštitu podataka o ličnosti.
          </p>
        </section>

        <section>
          <h2 className="wordset text-2xl text-chalk md:text-3xl">Bezbednost i izmene</h2>
          <p className="mt-3 leading-relaxed text-chalk/85">
            Plaćanje ide preko zaštićene stranice banke, a saobraćaj na sajtu je šifrovan.
            Ovu politiku možemo da menjamo, a nova verzija važi od datuma objave na ovoj
            stranici.
          </p>
        </section>
      </div>

      <p className="mt-12 border-t-[3px] border-chalk pt-5 text-[0.9375rem] text-chalk/80">
        Vidi i{" "}
        <Link
          href="/uslovi-koriscenja"
          className="font-semibold text-chalk underline decoration-jade decoration-2 underline-offset-4 hover:text-jade"
        >
          uslove korišćenja
        </Link>
        .
      </p>
    </div>
  );
}
