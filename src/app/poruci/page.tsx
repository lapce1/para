"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useCart } from "@/lib/cart";
import { rsd } from "@/lib/format";
import { site } from "@/data/site";
import { startCardCheckout } from "@/client/checkout";
import { track } from "@/lib/analytics";
import WaitlistForm from "@/components/WaitlistForm";

const PAY_ERRORS: Record<string, string> = {
  missing_fields: "Nedostaju podaci. Proverite korpu i imejl.",
  invalid_email: "Imejl adresa nije ispravna.",
  invalid_cart: "Nešto nije u redu sa korpom. Osvežite stranicu i pokušajte ponovo.",
  too_many_items: "Previše stavki u korpi.",
  payment_init_failed: "Plaćanje trenutno nije moguće. Pokušajte ponovo ili poručite preko Vibera/WhatsApp-a.",
  forbidden: "Zahtev je odbijen. Osvežite stranicu i pokušajte ponovo.",
  rate_limited: "Previše pokušaja. Sačekaj minut, pa pokušaj ponovo.",
};
const payErrorText = (code: string) =>
  PAY_ERRORS[code] ?? "Plaćanje nije uspelo. Pokušajte ponovo ili nas kontaktirajte.";

const field =
  "min-h-[52px] w-full border-[3px] border-ink bg-paper px-4 py-3 text-ink placeholder:text-inksoft/70 focus:border-paprika focus:outline-none";

export default function OrderPage() {
  // Waitlist gate: until ordering is live, /poruci is only the signup — none of
  // the payment paths (card, Viber, WhatsApp, phone) are rendered or reachable.
  if (!site.orderingLive) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-[var(--section)]">
        <h1 className="wordset text-5xl text-ink md:text-7xl">Uskoro krećemo</h1>
        <p className="mt-5 text-lg leading-relaxed text-ink/85">
          Kuhinja se zahuktava. Otvaramo lokal u {site.address} u {site.cityLoc}, uz
          dostavu za ceo grad. Ostavi imejl i javljamo ti prvom čim otvorimo vrata —
          bez spama, samo jedna poruka.
        </p>
        <div className="mt-8">
          <WaitlistForm source="poruci" />
        </div>
        <p className="mt-8 border-t-[3px] border-ink pt-5 text-[0.9375rem] text-ink/80">
          Dotle: pogledaj{" "}
          <Link href="/meni" className="font-semibold text-ink underline decoration-paprika decoration-2 underline-offset-4 hover:text-paprika">
            meni
          </Link>{" "}
          ili pročitaj{" "}
          <Link href="/pho" className="font-semibold text-ink underline decoration-paprika decoration-2 underline-offset-4 hover:text-paprika">
            šta je phở
          </Link>
          .
        </p>
      </div>
    );
  }

  return <OrderForm />;
}

function OrderForm() {
  const { lines, setQty, remove, subtotal, clear, count } = useCart();
  const [name, setName] = useState("");
  const [addr, setAddr] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [paying, setPaying] = useState(false);
  const [payError, setPayError] = useState<string | null>(null);

  const emailValid = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);

  const fee = subtotal >= site.freeDeliveryOver || subtotal === 0 ? 0 : site.deliveryFee;
  const total = subtotal + fee;

  const onPayCard = async () => {
    setPayError(null);
    if (!emailValid) {
      setPayError("Unesite ispravnu imejl adresu — na nju šaljemo fiskalni račun.");
      return;
    }
    setPaying(true);
    track("InitiateCheckout", { value: total, currency: "RSD", num_items: count });
    try {
      const [firstName, ...rest] = name.trim().split(/\s+/).filter(Boolean);
      await startCardCheckout(
        lines.map((l) => ({ id: l.id, qty: l.qty })),
        { email, firstName: firstName || undefined, lastName: rest.join(" ") || undefined },
      );
      // On success startCardCheckout redirects the browser to AllSecure; no code runs after.
    } catch (e) {
      setPaying(false);
      setPayError(payErrorText((e as Error).message));
    }
  };

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
      <div className="mx-auto max-w-2xl px-5 py-[var(--section)]">
        <h1 className="wordset text-4xl text-ink md:text-6xl">Korpa je prazna</h1>
        <p className="mt-4 text-lg text-ink/85">Dodaj činiju i vrati se ovde da poručiš.</p>
        <Link
          href="/meni"
          className="misreg mt-8 inline-block bg-paprika px-8 py-4 font-display text-base font-extrabold uppercase tracking-tightest text-paper hover:bg-ink"
        >
          Pogledaj meni
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-5xl gap-12 px-5 py-[var(--section)] lg:grid-cols-[1.15fr_1fr]">
      <div>
        <h1 className="wordset text-4xl text-ink md:text-5xl">Tvoja porudžbina</h1>

        <ul className="mt-8">
          {lines.map((l) => (
            <li
              key={l.id}
              className="flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-ink/25 py-4 first:border-t first:border-ink/25"
            >
              <div className="min-w-0 flex-1">
                <p className="font-display text-base font-extrabold tracking-tightest text-ink">
                  {l.name}
                </p>
                <p className="font-data text-xs tabular-nums text-inksoft">{rsd(l.price)}</p>
              </div>
              <div className="flex items-center border-[3px] border-ink">
                <button
                  onClick={() => setQty(l.id, l.qty - 1)}
                  className="flex h-11 w-11 items-center justify-center text-lg text-ink hover:bg-lime"
                  aria-label={`Manje: ${l.name}`}
                >
                  –
                </button>
                <span className="w-9 text-center font-data text-sm font-bold tabular-nums text-ink">
                  {l.qty}
                </span>
                <button
                  onClick={() => setQty(l.id, l.qty + 1)}
                  className="flex h-11 w-11 items-center justify-center text-lg text-ink hover:bg-lime"
                  aria-label={`Više: ${l.name}`}
                >
                  +
                </button>
              </div>
              <span className="w-24 text-right font-data text-sm font-bold tabular-nums text-ink">
                {rsd(l.qty * l.price)}
              </span>
              <button
                onClick={() => remove(l.id)}
                className="flex h-11 w-11 items-center justify-center text-inksoft hover:text-paprika"
                aria-label={`Ukloni: ${l.name}`}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M6 6l12 12M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-8 grid gap-3">
          <h2 className="stamp text-paprika">Podaci za dostavu</h2>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ime i prezime"
            autoComplete="name"
            className={field}
          />
          <input
            value={addr}
            onChange={(e) => setAddr(e.target.value)}
            placeholder="Adresa za dostavu"
            autoComplete="street-address"
            className={field}
          />
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Telefon"
            type="tel"
            autoComplete="tel"
            className={field}
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="Imejl (za fiskalni račun)"
            aria-invalid={email !== "" && !emailValid}
            className={`${field} ${email !== "" && !emailValid ? "border-paprikabright" : ""}`}
          />
        </div>
      </div>

      <aside className="h-fit border-[3px] border-ink bg-board">
        <div className="p-6">
          <dl className="space-y-2 text-[0.9375rem]">
            <div className="flex justify-between text-ink/80">
              <dt>Međuzbir</dt>
              <dd className="font-data tabular-nums">{rsd(subtotal)}</dd>
            </div>
            <div className="flex justify-between text-ink/80">
              <dt>Dostava</dt>
              <dd className="font-data tabular-nums">{fee === 0 ? "besplatno" : rsd(fee)}</dd>
            </div>
            {fee > 0 && (
              <p className="stamp !normal-case text-paprika">
                Dodaj još {rsd(site.freeDeliveryOver - subtotal)} za besplatnu dostavu.
              </p>
            )}
            <div className="flex justify-between border-t-[3px] border-ink pt-3">
              <dt className="font-display text-lg font-extrabold uppercase tracking-tightest text-ink">
                Ukupno
              </dt>
              <dd className="font-data text-lg font-bold tabular-nums text-ink">{rsd(total)}</dd>
            </div>
          </dl>

          <div className="mt-6 border-t-[3px] border-ink pt-5">
            <h2 className="stamp text-paprika">Plati karticom</h2>
            <p className="mt-2 text-[0.8125rem] leading-relaxed text-ink/75">
              Visa, Mastercard i DinaCard uz 3-D Secure. Fiskalni račun stiže na imejl
              odmah po uspešnom plaćanju.
            </p>
            <button
              onClick={onPayCard}
              disabled={paying || count === 0}
              className="misreg mt-4 w-full bg-paprika px-5 py-4 font-display text-sm font-extrabold uppercase tracking-tightest text-paper hover:bg-ink disabled:cursor-not-allowed disabled:opacity-55"
            >
              {paying ? "Povezivanje sa bankom…" : `Plati ${rsd(total)}`}
            </button>
            {payError && (
              <p role="alert" className="mt-3 text-[0.8125rem] font-semibold text-paprika">
                {payError}
              </p>
            )}
            <p className="mt-3 text-xs leading-relaxed text-inksoft">
              Bićeš preusmeren na zaštićenu stranicu banke. PARA ne čuva podatke o kartici.
            </p>
          </div>
        </div>

        <div className="border-t-[3px] border-ink bg-paper p-6">
          <h2 className="stamp text-paprika">Direktno — 15% jeftinije</h2>
          <p className="mt-2 text-[0.8125rem] leading-relaxed text-ink/75">
            Preko Vibera ili WhatsApp-a. Plaćanje pouzećem ili karticom kuriru.
          </p>
          <div className="mt-4 grid gap-2">
            <a
              href={wa}
              target="_blank"
              rel="noreferrer"
              className="misreg border-[3px] border-ink px-5 py-3 text-center font-display text-sm font-extrabold uppercase tracking-tightest text-ink hover:bg-lime"
            >
              WhatsApp
            </a>
            <a
              href={viber}
              className="misreg border-[3px] border-ink px-5 py-3 text-center font-display text-sm font-extrabold uppercase tracking-tightest text-ink hover:bg-lime"
            >
              Viber
            </a>
            <a
              href={`tel:${site.phone.replace(/\s/g, "")}`}
              className="misreg border-[3px] border-ink px-5 py-3 text-center font-display text-sm font-extrabold uppercase tracking-tightest text-ink hover:bg-lime"
            >
              {site.phone}
            </a>
          </div>

          <h2 className="stamp mt-6 text-inksoft">Ili preko aplikacije</h2>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
            <a href={site.aggregators.wolt} className="stamp text-ink hover:text-paprika">Wolt</a>
            <a href={site.aggregators.glovo} className="stamp text-ink hover:text-paprika">Glovo</a>
            <a href={site.aggregators.mrd} className="stamp text-ink hover:text-paprika">mr.D</a>
          </div>

          <button
            onClick={clear}
            className="stamp mt-6 min-h-[44px] w-full text-inksoft hover:text-paprika"
          >
            Isprazni korpu
          </button>
        </div>
      </aside>
    </div>
  );
}
