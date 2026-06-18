"use client";

import Link from "next/link";
import { useState } from "react";
import Logo from "./Logo";
import { useCart } from "@/lib/cart";

const links = [
  { href: "/", label: "Početna" },
  { href: "/meni", label: "Meni" },
  { href: "/prica", label: "Priča" },
];

export default function Nav() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-char/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link href="/" aria-label="PARA početna">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-bone/80 transition hover:text-broth"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/poruci"
            className="rounded-full bg-ember px-5 py-2 text-sm font-semibold text-steam transition hover:bg-broth hover:text-char"
          >
            Poruči{count > 0 ? ` · ${count}` : ""}
          </Link>
        </nav>

        <button
          className="text-bone md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Otvori meni"
          aria-expanded={open}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-white/5 px-5 pb-4 md:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-2 text-bone/80"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/poruci"
            onClick={() => setOpen(false)}
            className="mt-2 inline-block rounded-full bg-ember px-5 py-2 text-sm font-semibold text-steam"
          >
            Poruči{count > 0 ? ` · ${count}` : ""}
          </Link>
        </div>
      )}
    </header>
  );
}
