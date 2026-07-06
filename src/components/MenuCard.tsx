"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart";
import { rsd } from "@/lib/format";
import Photo from "./Photo";
import type { MenuItem } from "@/data/menu";

const tagLabel: Record<string, string> = {
  signature: "Specijalitet",
  push: "Omiljeno",
  vegan: "Vegan",
  spicy: "Ljuto",
};

// Each tag gets its own accent so the menu reads colourful at a glance.
const tagColor: Record<string, string> = {
  signature: "text-broth",
  push: "text-ember",
  vegan: "text-herb",
  spicy: "text-chili",
};

export default function MenuCard({ item }: { item: MenuItem }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  const onAdd = () => {
    add({ id: item.id, name: item.vi, price: item.price });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1100);
  };

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-white/5 bg-charsoft transition duration-300 hover:-translate-y-1 hover:border-broth/40 hover:shadow-lift">
      <Photo src={item.image} alt={item.vi} colors={item.swatch} ratio="4 / 3">
        {item.tag && (
          <span
            className={`absolute left-3 top-3 rounded-full bg-char/70 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${tagColor[item.tag] ?? "text-broth"}`}
          >
            {tagLabel[item.tag]}
          </span>
        )}
      </Photo>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-xl font-bold text-steam">{item.vi}</h3>
        <p className="text-sm text-broth/90">{item.sr}</p>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-bone/60">{item.desc}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="font-display text-lg font-bold text-bone">{rsd(item.price)}</span>
          <button
            onClick={onAdd}
            className="min-h-[44px] rounded-full bg-broth px-5 py-2.5 text-sm font-semibold text-char transition hover:bg-steam"
          >
            {added ? "Dodato ✓" : "Dodaj"}
          </button>
        </div>
      </div>
    </article>
  );
}
