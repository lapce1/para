"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart";
import { rsd } from "@/lib/format";
import Placeholder from "./Placeholder";
import { site } from "@/data/site";
import type { MenuItem } from "@/data/menu";

/**
 * One line of a printed price list: name, contents, then the price set in
 * tabular figures with a leader rule running out to meet it. The "Dodaj" control
 * only exists while ordering is live: a cart nobody can check out is a dead end.
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
      <div className="flex flex-col gap-5 sm:flex-row sm:gap-6">
        {/* dish photo goes here */}
        {site.showPlaceholders && (
          <Placeholder
            label={`Slika: ${item.vi}`}
            ratio="aspect-[4/3]"
            className="w-full sm:w-44 sm:shrink-0"
          />
        )}

        <div className="min-w-0 flex-1">
          {/* the price always sits on the right edge, on phones too, so a column
              of prices lines up however long the names run */}
          <div className="flex items-baseline gap-x-3">
            <h3 className="wordset min-w-0 text-2xl text-chalk md:text-[1.75rem]">{item.vi}</h3>
            {/* leader rule: runs from the name out to the price */}
            <span
              aria-hidden="true"
              className="mx-1 hidden h-px min-w-6 flex-1 self-center bg-chalk/30 sm:block"
            />
            <span className="ml-auto shrink-0 font-data text-xl font-bold tabular-nums text-gold">
              {rsd(item.price)}
            </span>
          </div>

          <p className="stamp mt-1.5 text-jade">{item.sr}</p>

          <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
            <p className="max-w-[62ch] text-[0.9375rem] leading-relaxed text-chalk/80">
              {item.desc}
            </p>
            {site.orderingLive && (
              <button
                onClick={onAdd}
                aria-live="polite"
                className="shrink-0 border-[3px] border-chalk px-5 py-2.5 font-display text-sm font-extrabold uppercase tracking-tightest text-chalk hover:bg-chalk hover:text-ground"
              >
                {added ? "Dodato" : "Dodaj"}
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
