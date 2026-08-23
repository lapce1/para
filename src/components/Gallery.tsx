import { photos } from "@/data/photos";

/**
 * Full-bleed photography band. Renders nothing until real photos exist in
 * src/data/photos.ts, so the page never ships a broken or stock image. Images
 * sit in hard 3px chalk frames, high contrast, no rounded corners or shadows,
 * per DESIGN.md. A single photo spans the row; more fall into a 2-up grid.
 */
export default function Gallery() {
  if (photos.length === 0) return null;

  return (
    <section className="border-b-[3px] border-chalk">
      <div className="mx-auto max-w-6xl px-5 py-[var(--section)]">
        <h2 className="stamp text-jade">Iz kuhinje i lokala</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {photos.map((p, i) => (
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
          ))}
        </div>
      </div>
    </section>
  );
}
