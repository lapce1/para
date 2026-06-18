"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart";
import { rsd } from "@/lib/format";
import type { MenuItem } from "@/data/menu";

const tagLabel: Record<string, string> = {
  signature: "Specijalitet",
  push: "Omiljeno",
  vegan: "Vegan",
  spicy: "Ljuto",
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
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-white/5 bg-charsoft transition hover:border-broth/30">
      <div
        className="relative aspect-[4/3] overflow-hidden"
        style={{
          background: `radial-gradient(70% 70% at 50% 40%, ${item.swatch[0]}, ${item.swatch[1]})`,
        }}
      >
        <div
          className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-black/10 transition group-hover:scale-105"
          style={{
            background: `radial-gradient(circle at 50% 35%, #F0C26B, ${item.swatch[0]})`,
            boxShadow: "inset 0 -8px 20px rgba(0,0,0,0.25)",
          }}
        />
        {item.tag && (
          <span className="absolute left-3 top-3 rounded-full bg-char/70 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-broth">
            {tagLabel[item.tag]}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-xl font-bold text-steam">{item.vi}</h3>
        <p className="text-sm text-broth/90">{item.sr}</p>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-bone/60">{item.desc}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="font-display text-lg font-bold text-bone">{rsd(item.price)}</span>
          <button
            onClick={onAdd}
            className="rounded-full bg-broth px-4 py-2 text-sm font-semibold text-char transition hover:bg-steam"
          >
            {added ? "Dodato ✓" : "Dodaj"}
          </button>
        </div>
      </div>
    </article>
  );
}
