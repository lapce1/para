import Link from "next/link";
import StarAnise from "./StarAnise";
import { site } from "@/data/site";

/** What actually goes into the pot, printed the way a label prints contents. */
const spec: { k: string; v: string }[] = [
  { k: "Osnova", v: "Goveđa kost, oxtail i juneći grudni deo" },
  { k: "Aromati", v: "Pečeni đumbir i crni luk" },
  { k: "Začini", v: "Anis, cimet, karanfilić, kardamom i đumbir" },
  { k: "Kuvanje", v: "Šest sati, od jutra, svakog dana" },
  { k: "Bez", v: "Kocki, pojačivača ukusa i konzervanasa" },
];

export default function Hero() {
  return (
    <section className="border-b-[3px] border-chalk">
      <div className="mx-auto grid max-w-6xl items-start gap-x-12 gap-y-12 px-5 pb-[var(--section)] pt-12 md:grid-cols-12 md:pt-16">
        {/* min-w-0: the display face is wide, and a long word like "VIJETNAMSKA"
            would otherwise set a min-content floor that pushes the track past the
            viewport. The base size is fluid for the same reason. */}
        <div className="min-w-0 md:col-span-7">
          <h1 className="wordset text-[clamp(1.75rem,8vw,2.75rem)] text-chalk sm:text-6xl md:text-[4.5rem]">
            Vijetnamska phở supa u centru Novog Sada.
          </h1>
          <p className="mt-7 max-w-[62ch] text-lg leading-relaxed text-chalk/85 md:text-xl">
            Kuvamo jednu stvar i trudimo se da je kuvamo kako treba. Kosti se krčkaju
            šest sati od jutra, dok čorba ne postane bistra. Možeš da sedneš kod nas u{" "}
            {site.addressLoc}, da poneseš, ili da ti pošaljemo na adresu.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href="/poruci"
              className="bg-chili px-7 py-4 font-display text-base font-extrabold uppercase tracking-tightest text-ground hover:bg-gold"
            >
              {site.orderingLive ? "Poruči činiju" : "Javi mi kad otvorite"}
            </Link>
            <Link
              href="/meni"
              className="border-[3px] border-chalk px-7 py-4 font-display text-base font-extrabold uppercase tracking-tightest text-chalk hover:bg-chalk hover:text-ground"
            >
              Pogledaj meni
            </Link>
          </div>
        </div>

        {/* the contents, printed as contents */}
        <div className="min-w-0 md:col-span-5">
          <div className="border-[3px] border-chalk bg-raised px-6 py-5">
            <h2 className="stamp text-jade">Šta je u čorbi</h2>
            <dl className="mt-4">
              {spec.map((s) => (
                <div key={s.k} className="border-b border-chalk/20 py-3 last:border-0">
                  <dt className="stamp flex items-center gap-1.5 text-chalksoft">
                    {s.k === "Začini" && (
                      <StarAnise className="h-3.5 w-3.5 shrink-0 text-gold" />
                    )}
                    {s.k}
                  </dt>
                  <dd className="mt-1.5 text-[0.9375rem] leading-snug text-chalk">{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
