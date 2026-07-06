"use client";

import { useState } from "react";
import { track } from "@/lib/analytics";

type State = "idle" | "sending" | "done" | "error";

/**
 * Pre-launch email capture. POSTs to the Worker's /api/waitlist (idempotent
 * insert) and fires the Lead event only after the server confirms.
 */
export default function WaitlistForm({ source = "site" }: { source?: string }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>("idle");

  const emailValid = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailValid || state === "sending") return;
    setState("sending");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      if (!res.ok) throw new Error("waitlist_failed");
      setState("done");
      track("Lead", { content_name: source });
    } catch {
      setState("error");
    }
  };

  if (state === "done") {
    return (
      <p role="status" className="rounded-xl border border-herb/30 bg-herb/10 px-4 py-3 text-sm text-herb">
        Upisan si. Javljamo ti čim krene dostava.
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row">
      <label htmlFor="waitlist-email" className="sr-only">
        Imejl adresa
      </label>
      <input
        id="waitlist-email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        inputMode="email"
        autoComplete="email"
        required
        placeholder="tvoj@imejl.rs"
        className="min-h-[48px] flex-1 rounded-full border border-white/10 bg-charsoft px-5 py-3 text-bone placeholder:text-bone/30 focus:border-broth focus:outline-none"
      />
      <button
        type="submit"
        disabled={!emailValid || state === "sending"}
        className="min-h-[48px] rounded-full bg-ember px-7 py-3 font-semibold text-steam transition hover:bg-broth hover:text-char disabled:cursor-not-allowed disabled:opacity-60"
      >
        {state === "sending" ? "Upisivanje…" : "Upiši se"}
      </button>
      {state === "error" && (
        <p role="alert" className="text-sm text-ember sm:self-center">
          Nije prošlo. Pokušaj ponovo.
        </p>
      )}
    </form>
  );
}
