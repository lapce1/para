"use client";

import Link from "next/link";
import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { pollOrderStatus } from "@/client/checkout";
import { useCart } from "@/lib/cart";

type View = "loading" | "paid" | "pending" | "failed";

function Shell({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-xl px-5 py-24 text-center">{children}</div>;
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
        <h1 className="font-display text-3xl font-extrabold text-steam">Potvrđujemo plaćanje…</h1>
        <p className="mt-3 text-bone/60">Sačekaj trenutak, proveravamo status sa bankom.</p>
        <div className="mx-auto mt-6 h-8 w-8 animate-spin rounded-full border-2 border-broth/30 border-t-broth" />
      </Shell>
    );
  }

  if (view === "paid") {
    return (
      <Shell>
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-herb/20 text-3xl text-herb">
          ✓
        </div>
        <h1 className="font-display text-3xl font-extrabold text-steam">Plaćanje uspešno</h1>
        <p className="mt-3 text-bone/60">
          Hvala! Tvoja porudžbina je primljena i kreće u pripremu. Fiskalni račun stiže na
          tvoj imejl.
        </p>
        {receiptUrl && (
          <a
            href={receiptUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-block rounded-full bg-broth px-7 py-3 font-semibold text-char hover:bg-steam"
          >
            Pogledaj fiskalni račun
          </a>
        )}
        <div className="mt-6">
          <Link href="/meni" className="text-sm text-broth hover:text-steam">
            Nazad na meni →
          </Link>
        </div>
      </Shell>
    );
  }

  if (view === "failed") {
    return (
      <Shell>
        <h1 className="font-display text-3xl font-extrabold text-steam">Plaćanje nije uspelo</h1>
        <p className="mt-3 text-bone/60">
          Transakcija nije odobrena. Tvoja kartica nije zadužena. Pokušaj ponovo ili poruči
          direktno preko Vibera/WhatsApp-a.
        </p>
        <Link
          href="/poruci"
          className="mt-6 inline-block rounded-full bg-ember px-7 py-3 font-semibold text-steam hover:bg-broth hover:text-char"
        >
          Pokušaj ponovo
        </Link>
      </Shell>
    );
  }

  // pending — postback hasn't arrived in time; don't claim success.
  return (
    <Shell>
      <h1 className="font-display text-3xl font-extrabold text-steam">Obrađujemo plaćanje</h1>
      <p className="mt-3 text-bone/60">
        Tvoje plaćanje se još potvrđuje. Ako je prošlo uspešno, fiskalni račun ćeš dobiti na
        imejl u roku od nekoliko minuta. Ne plaćaj ponovo — kontaktiraj nas ako nisi siguran.
      </p>
      <div className="mt-6">
        <Link href="/" className="rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-bone">
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
          <h1 className="font-display text-3xl font-extrabold text-steam">Učitavanje…</h1>
        </Shell>
      }
    >
      <Inner />
    </Suspense>
  );
}
