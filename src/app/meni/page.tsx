import type { Metadata } from "next";
import MenuCard from "@/components/MenuCard";
import JsonLd from "@/components/JsonLd";
import { menu } from "@/data/menu";
import { site } from "@/data/site";
import { menuSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Meni: phở i pivo",
  description: `Ceo PARA meni: goveđa phở supa krčkana šest sati i hladan Pilsner Urquell uz nju. Za stolom, za poneti ili na dostavu u ${site.cityLoc}.`,
  alternates: { canonical: "/meni" },
  openGraph: {
    title: `Meni · ${site.name}`,
    description: `Goveđa phở supa i pivo uz nju. Za stolom ili na dostavu u ${site.cityLoc}.`,
    url: `${site.url}/meni`,
  },
};

const groups = [
  { key: "supe", title: "Supa", sub: "Phở" },
  { key: "pice", title: "Piće", sub: "Uz činiju" },
] as const;

export default function MenuPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-[var(--section)]">
      <JsonLd data={menuSchema()} />

      <header className="border-b-[3px] border-chalk pb-8">
        <h1 className="wordset text-5xl text-chalk md:text-7xl">Meni</h1>
        <p className="mt-5 max-w-[60ch] text-lg leading-relaxed text-chalk/85">
          Kratak je, i takav treba da bude. Jedna činija koju kuvamo svaki dan i jedno
          pivo uz nju. Iste cene važe u lokalu, za poneti i na dostavi, a rezance
          kuvamo tek kad poručiš.
        </p>
      </header>

      {groups.map((g) => {
        const items = menu.filter((m) => m.category === g.key);
        if (items.length === 0) return null;
        return (
          <section key={g.key} className="mt-14">
            <div className="flex flex-wrap items-baseline gap-x-4">
              <h2 className="wordset text-3xl text-chalk md:text-4xl">{g.title}</h2>
              <span className="stamp text-chalksoft">{g.sub}</span>
            </div>
            <div className="mt-6">
              {items.map((m) => (
                <MenuCard key={m.id} item={m} />
              ))}
            </div>
          </section>
        );
      })}

      <section className="mt-14 border-[3px] border-chalk bg-raised p-6 md:p-8">
        <h2 className="wordset text-2xl text-chalk md:text-3xl">Kako da začiniš</h2>
        <p className="mt-4 max-w-[62ch] text-[0.9375rem] leading-relaxed text-chalk/80">
          Nana, bosiljak, limeta i čili stižu sa strane, a ne u činiji. Tako ti biraš
          koliko ljuto i koliko kiselo hoćeš, zalogaj po zalogaj. Ako nešto od toga ne
          želiš, samo reci kad poručuješ.
        </p>
      </section>
    </div>
  );
}
