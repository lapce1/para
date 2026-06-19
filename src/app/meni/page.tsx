import type { Metadata } from "next";
import MenuCard from "@/components/MenuCard";
import JsonLd from "@/components/JsonLd";
import { menu, addons } from "@/data/menu";
import { rsd } from "@/lib/format";
import { site } from "@/data/site";
import { menuSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Meni — phở, prilozi i piće",
  description: `Ceo PARA meni: goveđa i pileća phở supa, posna (vegan) varijanta, prolećne rolnice i vijetnamska kafa. Dostava u ${site.city}u.`,
  alternates: { canonical: "/meni" },
  openGraph: {
    title: `Meni · ${site.name}`,
    description: `Phở supe, prilozi i piće — dostava u ${site.city}u.`,
    url: `${site.url}/meni`,
  },
};

const groups = [
  { key: "supe", title: "Supe", sub: "Phở — srce svega" },
  { key: "prilozi", title: "Prilozi", sub: "Uz činiju" },
  { key: "pice", title: "Piće", sub: "Da zaokružiš obrok" },
] as const;

export default function MenuPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-14">
      <JsonLd data={menuSchema()} />
      <header className="mb-10">
        <h1 className="font-display text-4xl font-extrabold text-steam md:text-5xl">Meni</h1>
        <p className="mt-2 text-bone/60">
          Sve sveže. Supa i rezanci putuju odvojeno — ti ih spajaš za 90 sekundi.
        </p>
      </header>

      {groups.map((g) => {
        const items = menu.filter((m) => m.category === g.key);
        if (items.length === 0) return null;
        return (
          <section key={g.key} className="mb-14">
            <div className="mb-5 flex items-baseline gap-3">
              <h2 className="font-display text-2xl font-bold text-broth">{g.title}</h2>
              <span className="text-sm text-bone/40">{g.sub}</span>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((m) => (
                <MenuCard key={m.id} item={m} />
              ))}
            </div>
          </section>
        );
      })}

      <section className="rounded-2xl border border-white/5 bg-charsoft p-6">
        <h2 className="font-display text-xl font-bold text-broth">Dodaci</h2>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {addons.map((a) => (
            <li
              key={a.id}
              className="flex justify-between border-b border-white/5 py-2 text-sm text-bone/70"
            >
              <span>{a.name}</span>
              <span className="text-bone">{a.price === 0 ? "gratis" : `+ ${rsd(a.price)}`}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
