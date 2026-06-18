import Link from "next/link";

const values = [
  {
    t: "14 sati, svaki dan",
    d: "Kosti, oxtail i začini krčkaju se preko noći. Bez kocki, bez prečica, bez konzervanasa.",
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
    <div className="mx-auto max-w-3xl px-5 py-16">
      <h1 className="font-display text-4xl font-extrabold text-steam md:text-5xl">
        Para znači para.
      </h1>
      <p className="mt-4 text-lg text-bone/70">
        Na srpskom, para je ono što se diže iznad vrele činije. Za nas je to ceo
        brend: prava phở supa, dostavljena dovoljno vrela da se još puši kad otvoriš
        kutiju.
      </p>

      <div className="mt-10 space-y-6 leading-relaxed text-bone/70">
        <p>
          PARA je počela kao opsesija jednom činijom. Dvojica osnivača, jedna kuhinja,
          nijedan sto. Umesto restorana, napravili smo kuhinju koja radi samo za
          dostavu — i svu pažnju usmerili u ono što je u činiji.
        </p>
        <p>
          Goveđa supa se kuva 14 do 16 sati: juneće kosti, oxtail i grudni deo, pečeni
          đumbir i luk, anis, cimet, karanfilić. Skidamo penu, bistrimo, strpljivo.
          Kad je gotova, ne sipamo je preko rezanaca i ne šaljemo tako — jer bi do
          tebe stigla raskuvana. Pakujemo supu posebno, rezance posebno, začin posebno.
          Ti spajaš sve za 90 sekundi i dobiješ činiju kakva treba da bude.
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
      </div>
    </div>
  );
}
