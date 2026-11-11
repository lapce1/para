import Link from "next/link";
import StarAnise from "./StarAnise";
import PhoCanvas from "./PhoCanvas";
import { site } from "@/data/site";

/** What actually goes into the pot, printed the way a label prints contents. */
const spec: { k: string; v: string }[] = [
  { k: "Osnova", v: "Goveđa kost, oxtail i juneći grudni deo" },
  { k: "Aromati", v: "Pečeni đumbir i crni luk" },
  { k: "Začini", v: "Anis, cimet, karanfilić, kardamom i đumbir" },
  { k: "Kuvanje", v: "Šest sati, od jutra, svakog dana" },
  { k: "Bez", v: "Kocki, pojačivača ukusa i konzervanasa" },
];

/**
 * The homepage hero, rebuilt around a live 3D bowl. The headline, deck and CTAs
 * are real server-rendered DOM (SEO and first paint are unaffected); PhoCanvas
 * paints the animated bowl behind them and parks once you scroll past the hero.
 * The ingredient list below hands off from the 3D scene into the flat page.
 */
export default function Hero3D() {
  return (
    <>
      <section className="relative overflow-hidden border-b-[3px] border-chalk bg-ground">
        <PhoCanvas />
        {/* legibility scrim: darken the top and, more, the bottom where copy sits */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0) 30%, rgba(10,10,10,0) 54%, rgba(10,10,10,0.84) 100%)",
          }}
        />
        <div className="relative mx-auto flex min-h-[88svh] max-w-6xl flex-col justify-end px-5 pb-14 pt-28">
          {/* min-w-0: the display face is wide, so a long word like "VIJETNAMSKA"
              would otherwise push the track past the viewport. Base size is fluid. */}
          <div className="min-w-0 max-w-2xl">
            <h1 className="wordset text-[clamp(1.75rem,8vw,2.75rem)] text-chalk sm:text-6xl md:text-[4.5rem]">
              Vijetnamska phở supa u centru Novog Sada.
            </h1>
            <p className="mt-6 max-w-[54ch] text-lg leading-relaxed text-chalk/85 md:text-xl">
              Kuvamo jednu stvar i trudimo se da je kuvamo kako treba. Kosti se krčkaju
              šest sati od jutra, dok čorba ne postane bistra. Možeš da sedneš kod nas u{" "}
              {site.addressLoc}, da poneseš, ili da ti pošaljemo na adresu.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
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
          <p className="stamp mt-10 text-chalksoft">Skroluj</p>
        </div>
      </section>

      {/* the contents, as a ruled list, bridging the 3D hero into the flat page */}
      <section className="mx-auto max-w-6xl px-5 py-[var(--section)]">
        <h2 className="stamp text-jade">Šta je u čorbi</h2>
        <dl className="mt-6 border-t border-chalk/25">
          {spec.map((s) => (
            <div
              key={s.k}
              className="grid gap-1.5 border-b border-chalk/25 py-4 sm:grid-cols-[13rem_1fr] sm:gap-8"
            >
              <dt className="stamp flex items-center gap-1.5 text-chalksoft">
                {s.k === "Začini" && <StarAnise className="h-3.5 w-3.5 shrink-0 text-gold" />}
                {s.k}
              </dt>
              <dd className="text-[0.9375rem] leading-relaxed text-chalk">{s.v}</dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}
