"use client";

import Link from "next/link";
import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { pollOrderStatus } from "@/client/checkout";
import { useCart } from "@/lib/cart";
import { track } from "@/lib/analytics";

type View = "loading" | "paid" | "pending" | "failed";

function Shell({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-xl px-5 py-[var(--section)]">{children}</div>;
}

function Inner() {
  const params = useSearchParams();
  const mtx = params.get("mtx");
  const { clear } = useCart();
  const [view, setView] = useState<View>("loading");
  const [receiptUrl, setReceiptUrl] = useState<string | null>(null);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    if (!mtx) {
      setView("pending");
      return;
    }
    let active = true;
    (async () => {
      const res = await pollOrderStatus(mtx, { timeoutMs: 40000 });
      if (!active) return;
      setReceiptUrl(res.receiptUrl);
      if (res.status === "PAID") {
        setView("paid");
        clear(); // order is settled server-side; empty the local cart
        // Purchase fires only on the verified (postback-confirmed) PAID status —
        // the bank redirect alone is never treated as a conversion.
        track("Purchase", { value: res.amountRsd ?? 0, currency: "RSD" });
      } else if (res.status === "FAILED") {
        setView("failed");
      } else {
        setView("pending");
      }
    })();
    return () => {
      active = false;
    };
  }, [mtx, clear]);

  if (view === "loading") {
    return (
      <Shell>
        <h1 className="wordset text-4xl text-ink md:text-5xl">Potvrđujemo plaćanje…</h1>
        <p className="mt-4 text-lg leading-relaxed text-ink/85">Sačekaj trenutak, proveravamo status sa bankom.</p>
        <div className="mt-8 h-9 w-9 animate-spin border-[3px] border-ink/25 border-t-paprika motion-reduce:animate-none" />
      </Shell>
    );
  }

  if (view === "paid") {
    return (
      <Shell>
        <div className="mb-5 flex h-16 w-16 items-center justify-center border-[3px] border-ink bg-lime text-3xl text-ink">
          ✓
        </div>
        <h1 className="wordset text-4xl text-ink md:text-5xl">Plaćanje uspešno</h1>
        <p className="mt-4 text-lg leading-relaxed text-ink/85">
          Hvala! Tvoja porudžbina je primljena i kreće u pripremu. Fiskalni račun stiže na
          tvoj imejl.
        </p>
        {receiptUrl && (
          <a
            href={receiptUrl}
            target="_blank"
            rel="noreferrer"
            className="misreg mt-8 inline-block bg-lime px-7 py-4 font-display text-base font-extrabold uppercase tracking-tightest text-ink hover:bg-paper"
          >
            Pogledaj fiskalni račun
          </a>
        )}
        <div className="mt-6">
          <Link href="/meni" className="stamp text-paprika hover:text-ink">
            Nazad na meni →
          </Link>
        </div>
      </Shell>
    );
  }

  if (view === "failed") {
    return (
      <Shell>
        <h1 className="wordset text-4xl text-ink md:text-5xl">Plaćanje nije uspelo</h1>
        <p className="mt-4 text-lg leading-relaxed text-ink/85">
          Transakcija nije odobrena. Tvoja kartica nije zadužena. Pokušaj ponovo ili poruči
          direktno preko Vibera/WhatsApp-a.
        </p>
        <Link
          href="/poruci"
          className="mt-6 inline-block misreg bg-paprika px-7 py-4 font-display text-base font-extrabold uppercase tracking-tightest text-paper hover:bg-ink"
        >
          Pokušaj ponovo
        </Link>
      </Shell>
    );
  }

  // pending — postback hasn't arrived in time; don't claim success.
  return (
    <Shell>
      <h1 className="wordset text-4xl text-ink md:text-5xl">Obrađujemo plaćanje</h1>
      <p className="mt-4 text-lg leading-relaxed text-ink/85">
        Tvoje plaćanje se još potvrđuje. Ako je prošlo uspešno, fiskalni račun ćeš dobiti na
        imejl u roku od nekoliko minuta. Ne plaćaj ponovo — kontaktiraj nas ako nisi siguran.
      </p>
      <div className="mt-6">
        <Link href="/" className="misreg border-[3px] border-ink px-6 py-3 font-display text-sm font-extrabold uppercase tracking-tightest text-ink hover:bg-lime">
          Početna
        </Link>
      </div>
    </Shell>
  );
}

export default function SuccessClient() {
  return (
    <Suspense
      fallback={
        <Shell>
          <h1 className="wordset text-4xl text-ink md:text-5xl">Učitavanje…</h1>
        </Shell>
      }
    >
      <Inner />
    </Suspense>
  );
}
