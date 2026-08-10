"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart";
import { rsd } from "@/lib/format";
import type { MenuItem } from "@/data/menu";

/**
 * One line of a printed price list: name, contents, then the price set in
 * tabular figures with a leader rule running out to meet it.
 */
export default function MenuCard({ item }: { item: MenuItem }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  const onAdd = () => {
    add({ id: item.id, name: item.vi, price: item.price });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1200);
  };

  return (
    <article className="border-b border-chalk/25 py-6 first:border-t first:border-chalk/25">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
        <h3 className="wordset text-2xl text-chalk md:text-[1.75rem]">{item.vi}</h3>
        {/* leader rule: runs from the name out to the price */}
        <span
          aria-hidden="true"
          className="mx-1 hidden h-px min-w-6 flex-1 self-center bg-chalk/30 sm:block"
        />
        <span className="font-data text-xl font-bold tabular-nums text-gold">
          {rsd(item.price)}
        </span>
      </div>

      <p className="stamp mt-1.5 text-jade">{item.sr}</p>

      <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
        <p className="max-w-[62ch] text-[0.9375rem] leading-relaxed text-chalk/80">
          {item.desc}
        </p>
        <button
          onClick={onAdd}
          aria-live="polite"
          className="shrink-0 border-[3px] border-chalk px-5 py-2.5 font-display text-sm font-extrabold uppercase tracking-tightest text-chalk hover:bg-chalk hover:text-ground"
        >
          {added ? "Dodato" : "Dodaj"}
        </button>
      </div>
    </article>
  );
}
