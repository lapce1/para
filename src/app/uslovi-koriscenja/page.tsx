import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/data/site";
import { rsd } from "@/lib/format";

export const metadata: Metadata = {
  title: "Uslovi korišćenja",
  description:
    "Uslovi korišćenja sajta i uslovi porudžbine, plaćanja i dostave za PARA, vijetnamsku phở kuhinju u Novom Sadu.",
  alternates: { canonical: "/uslovi-koriscenja" },
};

// Empty legal fields render a visible note so a draft is never mistaken for
// finalized text. Fill site.legal from the APR registration before launch.
const fill = (v: string, label: string) => v || `[${label}, dopuniti pre objave]`;

export default function TermsPage() {
  const entity = fill(site.legal.entity, "pun poslovni naziv");
  const effective = fill(site.legal.effectiveDate, "datum");
  const draft = !site.legal.entity || !site.legal.effectiveDate;

  return (
    <div className="mx-auto max-w-3xl px-5 py-[var(--section)]">
      <header className="border-b-[3px] border-chalk pb-8">
        <h1 className="wordset text-5xl text-chalk md:text-7xl">Uslovi korišćenja</h1>
        <p className="stamp mt-4 text-chalksoft">Stupa na snagu: {effective}</p>
      </header>

      {draft && (
        <p className="mt-8 border-[3px] border-gold bg-raised px-5 py-4 text-[0.9375rem] leading-relaxed text-chalk/85">
          Radna verzija. Pre objave treba uneti pun poslovni naziv, matični broj, PIB i
          datum stupanja na snagu u <code className="font-data text-gold">site.legal</code>.
        </p>
      )}

      <div className="mt-10 space-y-10">
        <section>
          <h2 className="wordset text-2xl text-chalk md:text-3xl">Ko smo mi</h2>
          <p className="mt-3 leading-relaxed text-chalk/85">
            Sajt {site.url.replace("https://", "")} vodi {entity} (u nastavku „PARA“),
            vijetnamska phở kuhinja sa lokalom u {site.addressLoc}, {site.city}. Za sve
            što ti nije jasno piši nam na{" "}
            <a href={`mailto:${site.email}`} className="text-jade hover:text-chalk">
              {site.email}
            </a>{" "}
            ili pozovi {site.phone}.
          </p>
        </section>

        <section>
          <h2 className="wordset text-2xl text-chalk md:text-3xl">Šta nudimo</h2>
          <p className="mt-3 leading-relaxed text-chalk/85">
            Pripremamo i prodajemo hranu i piće. Isto jelo možeš da pojedeš za stolom u
            lokalu, da poneseš, ili da ti ga dostavimo. Meni i cene su objavljeni na
            stranici{" "}
            <Link href="/meni" className="text-jade hover:text-chalk">
              meni
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="wordset text-2xl text-chalk md:text-3xl">Cene</h2>
          <p className="mt-3 leading-relaxed text-chalk/85">
            Sve cene su u dinarima (RSD) i sa uračunatim PDV-om. Važi cena prikazana u
            trenutku porudžbine. Trudimo se da meni i cene budu tačni, ali zadržavamo
            pravo da ih menjamo. Ako se cena neke stavke promeni posle tvoje porudžbine, a
            pre nego što je potvrdimo, javićemo ti pre naplate.
          </p>
        </section>

        <section>
          <h2 className="wordset text-2xl text-chalk md:text-3xl">Porudžbina i plaćanje</h2>
          <p className="mt-3 leading-relaxed text-chalk/85">
            Porudžbina je potvrđena tek kada je mi prihvatimo. Platiti možeš karticom
            onlajn (Visa, Mastercard, DinaCard) uz 3-D Secure, ili pouzećem kuriru.
            Plaćanje karticom obrađuje pružalac platnih usluga AllSecure preko zaštićene
            stranice banke, a PARA ne vidi ni ne čuva broj tvoje kartice. Fiskalni račun
            stiže na tvoj imejl odmah po uspešnom plaćanju.
          </p>
        </section>

        <section>
          <h2 className="wordset text-2xl text-chalk md:text-3xl">Dostava</h2>
          <p className="mt-3 leading-relaxed text-chalk/85">
            Dostavljamo u sledeće delove grada: {site.zones.join(", ")}. Naknada za
            dostavu je {rsd(site.deliveryFee)}, a besplatna je za porudžbine preko{" "}
            {rsd(site.freeDeliveryOver)}. Vreme dostave zavisi od gužve i udaljenosti, pa
            ga ne obećavamo u minut. Supu, rezance i biljke pakujemo odvojeno da rezanci ne
            stignu raskuvani.
          </p>
        </section>

        <section>
          <h2 className="wordset text-2xl text-chalk md:text-3xl">Otkazivanje i reklamacije</h2>
          <p className="mt-3 leading-relaxed text-chalk/85">
            Pošto je hrana kvarljiva i pravi se po porudžbini, ne može da se vrati nakon
            preuzimanja, pa pravo na odustanak od ugovora na daljinu ovde ne važi na način
            na koji važi za trajnu robu. To ne dira tvoja prava po Zakonu o zaštiti
            potrošača. Ako sa porudžbinom nešto nije u redu, javi nam odmah na{" "}
            <a href={`mailto:${site.email}`} className="text-jade hover:text-chalk">
              {site.email}
            </a>{" "}
            ili na {site.phone} i rešićemo to. Reklamaciju čuvamo i odgovaramo u zakonskom
            roku.
          </p>
        </section>

        <section>
          <h2 className="wordset text-2xl text-chalk md:text-3xl">Alergeni</h2>
          <p className="mt-3 leading-relaxed text-chalk/85">
            Čorba se kuva na govedini i začinima. Ako imaš alergiju ili poseban zahtev,
            reci nam pre porudžbine pa ćemo ti tačno reći šta jelo sadrži.
          </p>
        </section>

        <section>
          <h2 className="wordset text-2xl text-chalk md:text-3xl">Izmene uslova</h2>
          <p className="mt-3 leading-relaxed text-chalk/85">
            Ove uslove možemo da menjamo. Nova verzija važi od trenutka objave na ovoj
            stranici, sa novim datumom stupanja na snagu.
          </p>
        </section>

        <section>
          <h2 className="wordset text-2xl text-chalk md:text-3xl">Merodavno pravo</h2>
          <p className="mt-3 leading-relaxed text-chalk/85">
            Na ove uslove primenjuje se pravo Republike Srbije. Za sve sporove nadležan je
            sud u {fill(site.legal.court, "grad")}.
          </p>
        </section>
      </div>

      <p className="mt-12 border-t-[3px] border-chalk pt-5 text-[0.9375rem] text-chalk/80">
        Vidi i{" "}
        <Link
          href="/politika-privatnosti"
          className="font-semibold text-chalk underline decoration-jade decoration-2 underline-offset-4 hover:text-jade"
        >
          politiku privatnosti
        </Link>
        .
      </p>
    </div>
  );
}
