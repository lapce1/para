"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useCart } from "@/lib/cart";
import { rsd } from "@/lib/format";
import { site } from "@/data/site";

export default function OrderPage() {
  const { lines, setQty, remove, subtotal, clear, count } = useCart();
  const [name, setName] = useState("");
  const [addr, setAddr] = useState("");
  const [phone, setPhone] = useState("");

  const fee = subtotal >= site.freeDeliveryOver || subtotal === 0 ? 0 : site.deliveryFee;
  const total = subtotal + fee;

  const message = useMemo(() => {
    const items = lines.map((l) => `- ${l.qty}x ${l.name} — ${rsd(l.qty * l.price)}`).join("\n");
    return [
      "PARA porudžbina:",
      items,
      "",
      `Međuzbir: ${rsd(subtotal)}`,
      `Dostava: ${fee === 0 ? "besplatno" : rsd(fee)}`,
      `UKUPNO: ${rsd(total)}`,
      "",
      `Ime: ${name}`,
      `Adresa: ${addr}`,
      `Telefon: ${phone}`,
    ].join("\n");
  }, [lines, subtotal, fee, total, name, addr, phone]);

  const wa = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
  const viber = `viber://chat?number=%2B${site.viber}`;

  if (count === 0) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-24 text-center">
        <h1 className="font-display text-3xl font-extrabold text-steam">Korpa je prazna</h1>
        <p className="mt-3 text-bone/60">Dodaj činiju i vrati se ovde da poručiš.</p>
        <Link
          href="/meni"
          className="mt-6 inline-block rounded-full bg-broth px-7 py-3 font-semibold text-char"
        >
          Pogledaj meni
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-5xl gap-10 px-5 py-14 lg:grid-cols-[1.2fr_1fr]">
      <div>
        <h1 className="font-display text-3xl font-extrabold text-steam">Tvoja porudžbina</h1>
        <ul className="mt-6 divide-y divide-white/5">
          {lines.map((l) => (
            <li key={l.id} className="flex items-center gap-3 py-4">
              <div className="flex-1">
                <p className="font-display font-semibold text-bone">{l.name}</p>
                <p className="text-sm text-bone/50">{rsd(l.price)}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQty(l.id, l.qty - 1)}
                  className="h-8 w-8 rounded-full border border-white/10 text-bone"
                  aria-label="Manje"
                >
                  –
                </button>
                <span className="w-6 text-center text-bone">{l.qty}</span>
                <button
                  onClick={() => setQty(l.id, l.qty + 1)}
                  className="h-8 w-8 rounded-full border border-white/10 text-bone"
                  aria-label="Više"
                >
                  +
                </button>
              </div>
              <span className="w-24 text-right font-semibold text-bone">
                {rsd(l.qty * l.price)}
              </span>
              <button
                onClick={() => remove(l.id)}
                className="text-bone/40 hover:text-ember"
                aria-label="Ukloni stavku"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-6 grid gap-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ime i prezime"
            className="rounded-xl border border-white/10 bg-charsoft px-4 py-3 text-bone placeholder:text-bone/30 focus:border-broth focus:outline-none"
          />
          <input
            value={addr}
            onChange={(e) => setAddr(e.target.value)}
            placeholder="Adresa za dostavu"
            className="rounded-xl border border-white/10 bg-charsoft px-4 py-3 text-bone placeholder:text-bone/30 focus:border-broth focus:outline-none"
          />
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Telefon"
            className="rounded-xl border border-white/10 bg-charsoft px-4 py-3 text-bone placeholder:text-bone/30 focus:border-broth focus:outline-none"
          />
        </div>
      </div>

      <aside className="h-fit rounded-2xl border border-white/5 bg-charsoft p-6">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-bone/70">
            <span>Međuzbir</span>
            <span>{rsd(subtotal)}</span>
          </div>
          <div className="flex justify-between text-bone/70">
            <span>Dostava</span>
            <span>{fee === 0 ? "besplatno" : rsd(fee)}</span>
          </div>
          {fee > 0 && (
            <p className="text-xs text-herb">
              Dodaj još {rsd(site.freeDeliveryOver - subtotal)} za besplatnu dostavu.
            </p>
          )}
          <div className="flex justify-between border-t border-white/10 pt-3 font-display text-lg font-bold text-bone">
            <span>Ukupno</span>
            <span>{rsd(total)}</span>
          </div>
        </div>

        <div className="mt-5 rounded-xl bg-char p-4">
          <p className="text-sm font-semibold text-broth">Poruči direktno — 15% jeftinije</p>
          <p className="mt-1 text-xs text-bone/50">
            Direktna porudžbina ide preko Vibera ili WhatsApp-a. Plaćanje pouzećem ili
            karticom kuriru.
          </p>
          <div className="mt-3 grid gap-2">
            <a
              href={wa}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-herb px-5 py-3 text-center font-semibold text-char"
            >
              Pošalji preko WhatsApp
            </a>
            <a
              href={viber}
              className="rounded-full bg-broth px-5 py-3 text-center font-semibold text-char"
            >
              Pošalji preko Viber
            </a>
            <a
              href={`tel:${site.phone.replace(/\s/g, "")}`}
              className="rounded-full border border-white/10 px-5 py-3 text-center font-semibold text-bone"
            >
              Pozovi {site.phone}
            </a>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-xs uppercase tracking-wider text-bone/40">Ili preko aplikacije</p>
          <div className="mt-2 flex gap-2">
            <a href={site.aggregators.wolt} className="flex-1 rounded-full border border-white/10 py-2 text-center text-sm text-bone/80 hover:border-broth">Wolt</a>
            <a href={site.aggregators.glovo} className="flex-1 rounded-full border border-white/10 py-2 text-center text-sm text-bone/80 hover:border-broth">Glovo</a>
            <a href={site.aggregators.mrd} className="flex-1 rounded-full border border-white/10 py-2 text-center text-sm text-bone/80 hover:border-broth">mr.D</a>
          </div>
        </div>

        <button
          onClick={clear}
          className="mt-4 w-full text-center text-xs text-bone/40 hover:text-ember"
        >
          Isprazni korpu
        </button>
      </aside>
    </div>
  );
}
