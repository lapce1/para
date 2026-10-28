import { photos } from "@/data/photos";
import Placeholder from "./Placeholder";

/**
 * Full-bleed photography band. Until real photos exist in src/data/photos.ts it
 * shows placeholder frames marking where the shots go; once photos are listed it
 * renders them. Images sit in hard 3px chalk frames, high contrast, no rounded
 * corners or shadows, per DESIGN.md. First shot spans the row; more fall 2-up.
 */
export default function Gallery() {
  const empty = photos.length === 0;

  return (
    <section className="border-b-[3px] border-chalk">
      <div className="mx-auto max-w-6xl px-5 py-[var(--section)]">
        <h2 className="stamp text-jade">Iz kuhinje i lokala</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {empty ? (
            <>
              <Placeholder
                label="Činija phở, odozgo"
                ratio="aspect-[3/2]"
                note="~1600 x 1067"
                className="sm:col-span-2"
              />
              <Placeholder label="Enterijer lokala" ratio="aspect-[3/2]" note="~1200 x 800" />
              <Placeholder label="Para iznad vrele činije" ratio="aspect-[3/2]" note="~1200 x 800" />
            </>
          ) : (
            photos.map((p, i) => (
              <figure
                key={p.src}
                className={`border-[3px] border-chalk ${
                  photos.length === 1 || i === 0 ? "sm:col-span-2" : ""
                }`}
              >
                <img
                  src={p.src}
                  alt={p.alt}
                  width={p.w}
                  height={p.h}
                  loading="lazy"
                  className="block aspect-[3/2] w-full object-cover"
                />
              </figure>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
