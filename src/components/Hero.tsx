import Link from "next/link";
import BowlPlate from "./BowlPlate";
import StarAnise from "./StarAnise";
import { site } from "@/data/site";

/** The contents block, printed the way a label prints what is inside. */
const spec: { k: string; v: string }[] = [
  { k: "Osnova", v: "Goveđa kost, oxtail i juneći grudni deo" },
  { k: "Aromati", v: "Pečeni đumbir i crni luk" },
  { k: "Začini", v: "Anis · cimet · karanfilić · kardamom · đumbir" },
  { k: "Kuvanje", v: "6 sati, od jutra, svakog dana" },
  { k: "Bez", v: "Kocki, pojačivača ukusa i konzervanasa" },
];

export default function Hero() {
  // overflow-hidden: the product panel bleeds off the right edge by design —
  // clip it at the viewport rather than letting it scroll the page sideways.
  return (
    <section className="tooth overflow-hidden border-b-[3px] border-ink">
      <div className="mx-auto grid max-w-6xl gap-x-10 px-5 pt-10 md:grid-cols-12 md:pt-16">
        {/* headline plate */}
        <div className="md:col-span-7">
          <h1 className="wordset text-[3.25rem] text-ink sm:text-7xl md:text-[5.5rem]">
            Šest sati
            <br />
            na kosti.
          </h1>
          <p className="mt-6 max-w-[62ch] text-lg leading-relaxed text-ink/85 md:text-xl">
            Prava vijetnamska <span className="font-semibold">phở</span> — čorba se krčka
            od jutra, bistri se i skida joj se pena dok ne postane providna. Kuvamo je
            u {site.addressLoc}, i služimo je vrelu za stolom, za poneti i na dostavu.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/poruci"
              className="misreg bg-paprika px-7 py-4 font-display text-base font-extrabold uppercase tracking-tightest text-paper hover:bg-ink"
            >
              {site.orderingLive ? "Poruči činiju" : "Uskoro — upiši se"}
            </Link>
            <Link
              href="/meni"
              className="misreg border-[3px] border-ink px-7 py-4 font-display text-base font-extrabold uppercase tracking-tightest text-ink hover:bg-lime"
            >
              Ceo meni
            </Link>
          </div>
        </div>

        {/* product plate — drawn, on its own ink field, bleeding right */}
        <div className="relative mt-10 md:col-span-5 md:mt-0">
          <div className="tooth relative border-[3px] border-ink bg-board px-6 pb-6 pt-5 md:-mr-16">
            <p className="stamp text-inksoft">Phở bò · činija</p>
            <BowlPlate className="mx-auto mt-1 w-full max-w-[19rem]" />
          </div>
        </div>
      </div>

      {/* specification panel — the contents, printed as contents */}
      <div className="mx-auto mt-12 max-w-6xl px-5 md:mt-16">
        <div className="border-t-[3px] border-ink">
          <h2 className="stamp mt-4 text-paprika">Šta je u čorbi</h2>
          <dl className="mt-4 md:grid md:grid-cols-2 md:gap-x-12">
            {spec.map((s) => (
              <div
                key={s.k}
                className="flex flex-wrap items-baseline gap-x-4 border-b border-ink/20 py-3"
              >
                <dt className="stamp flex w-24 shrink-0 items-center gap-1.5 text-inksoft">
                  {s.k === "Začini" && (
                    <StarAnise className="h-3.5 w-3.5 shrink-0 text-paprika" />
                  )}
                  {s.k}
                </dt>
                <dd className="flex-1 text-[0.9375rem] leading-snug text-ink">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
