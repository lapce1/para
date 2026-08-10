import type { Metadata } from "next";
import MenuCard from "@/components/MenuCard";
import JsonLd from "@/components/JsonLd";
import { menu, addons } from "@/data/menu";
import { rsd } from "@/lib/format";
import { site } from "@/data/site";
import { menuSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Meni — phở, prilozi i piće",
  description: `Ceo PARA meni: goveđa i pileća phở supa, posna (vegan) varijanta, prolećne rolnice i vijetnamska kafa. Za stolom ili na dostavu u ${site.cityLoc}.`,
  alternates: { canonical: "/meni" },
  openGraph: {
    title: `Meni · ${site.name}`,
    description: `Phở supe, prilozi i piće — za stolom ili na dostavu u ${site.cityLoc}.`,
    url: `${site.url}/meni`,
  },
};

const groups = [
  { key: "supe", title: "Supe", sub: "Phở" },
  { key: "prilozi", title: "Prilozi", sub: "Uz činiju" },
  { key: "pice", title: "Piće", sub: "Da zaokružiš obrok" },
] as const;

export default function MenuPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-[var(--section)]">
      <JsonLd data={menuSchema()} />

      <header className="border-b-[3px] border-ink pb-8">
        <h1 className="wordset text-5xl text-ink md:text-7xl">Meni</h1>
        <p className="mt-4 max-w-[60ch] text-lg leading-relaxed text-ink/85">
          Cene važe u lokalu, za poneti i na dostavi. Rezanci se kuvaju po porudžbini.
        </p>
      </header>

      {groups.map((g) => {
        const items = menu.filter((m) => m.category === g.key);
        if (items.length === 0) return null;
        return (
          <section key={g.key} className="mt-14">
            <div className="flex flex-wrap items-baseline gap-x-4">
              <h2 className="wordset text-3xl text-ink md:text-4xl">{g.title}</h2>
              <span className="stamp text-inksoft">{g.sub}</span>
            </div>
            <div className="mt-6">
              {items.map((m) => (
                <MenuCard key={m.id} item={m} />
              ))}
            </div>
          </section>
        );
      })}

      <section className="mt-14 border-[3px] border-ink bg-board p-6 md:p-8">
        <h2 className="wordset text-2xl text-ink md:text-3xl">Dodaci</h2>
        <ul className="mt-5">
          {addons.map((a) => (
            <li
              key={a.id}
              className="flex items-baseline gap-3 border-b border-ink/25 py-2.5 last:border-0"
            >
              <span className="text-[0.9375rem] text-ink">{a.name}</span>
              <span aria-hidden="true" className="h-px min-w-4 flex-1 self-center bg-ink/30" />
              <span className="font-data text-sm font-bold tabular-nums text-ink">
                {a.price === 0 ? "gratis" : `+ ${rsd(a.price)}`}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
