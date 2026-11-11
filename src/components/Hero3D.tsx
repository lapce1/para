import Link from "next/link";
import PhoCanvas from "./PhoCanvas";
import { site } from "@/data/site";

/**
 * The homepage hero: a live 3D bowl and the headline, kept out of each other's
 * way. On phones the bowl gets its own band on top and the copy sits below it on
 * plain ground. From md up the stage fills the hero and the scene pushes the bowl
 * into the right-hand column, so type never runs across it.
 *
 * The headline, deck and CTAs are server-rendered DOM, so SEO and first paint do
 * not depend on WebGL. The steam mark under the canvas is what shows while the
 * scene loads, and what stays if it cannot.
 */
export default function Hero3D() {
  return (
    <section className="relative overflow-hidden border-b-[3px] border-chalk bg-ground">
      <div className="stage absolute inset-x-0 top-0 h-[46svh] md:inset-0 md:h-auto">
        {/* static fallback: the brand's steam wisps, where the bowl will stand */}
        <svg
          aria-hidden="true"
          viewBox="0 0 22 30"
          fill="none"
          className="stage-fallback absolute left-1/2 top-1/2 h-28 -translate-x-1/2 -translate-y-1/2 text-chili md:left-[74.5%] md:h-40"
        >
          <path d="M5 28 C2 22 8 20 5 14 C3 10 7 8 5 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M11 28 C8 21 14 19 11 12 C9 8 13 6 11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M17 28 C14 22 20 20 17 14 C15 10 19 8 17 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.65" />
        </svg>

        <PhoCanvas />

        {/* phones: melt the bottom of the stage into the ground the copy sits on */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-ground md:hidden"
        />
        {/* md up: keep the copy column clean if steam or a spice drifts behind it */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 hidden w-[62%] bg-gradient-to-r from-ground from-55% to-transparent md:block"
        />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col px-5 pb-14 pt-[41svh] md:min-h-[86svh] md:justify-center md:py-24">
        {/* min-w-0: the display face is wide, so a long word like "VIJETNAMSKA"
            would otherwise push the track past the viewport. Base size is fluid. */}
        <div className="min-w-0 md:max-w-[56%]">
          <h1 className="wordset text-[clamp(1.75rem,8vw,2.75rem)] text-chalk sm:text-6xl md:text-[clamp(3rem,5.4vw,4.5rem)]">
            Vijetnamska phở supa u centru Novog Sada.
          </h1>
          <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-chalk/85 md:text-xl">
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
      </div>
    </section>
  );
}
