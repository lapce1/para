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
      <p role="status" className="border-[3px] border-chalk bg-jade px-5 py-4 text-ground">
        <span className="stamp block">Upisano</span>
        <span className="mt-1 block text-[0.9375rem]">
          Javljamo ti se čim otvorimo.
        </span>
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
        aria-invalid={email !== "" && !emailValid}
        placeholder="tvoj@imejl.rs"
        className={`min-h-[52px] flex-1 border-[3px] bg-raised px-4 py-3 text-chalk placeholder:text-chalksoft/70 focus:outline-none ${
          email !== "" && !emailValid ? "border-chili" : "border-chalk"
        }`}
      />
      <button
        type="submit"
        disabled={!emailValid || state === "sending"}
        className="min-h-[52px] bg-chili px-7 font-display text-base font-extrabold uppercase tracking-tightest text-ground hover:bg-gold disabled:cursor-not-allowed disabled:opacity-55"
      >
        {state === "sending" ? "Šaljem…" : "Upiši se"}
      </button>
      {state === "error" && (
        <p role="alert" className="stamp text-chili sm:self-center">
          Nije prošlo, probaj ponovo
        </p>
      )}
    </form>
  );
}
