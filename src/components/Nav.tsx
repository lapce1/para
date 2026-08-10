"use client";

import Link from "next/link";
import { useState } from "react";
import Logo from "./Logo";
import { useCart } from "@/lib/cart";
import { site } from "@/data/site";

const links = [
  { href: "/", label: "Početna" },
  { href: "/meni", label: "Meni" },
  { href: "/pho", label: "Šta je phở" },
];

export default function Nav() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b-[3px] border-ink bg-paper">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
        <Link href="/" aria-label="PARA početna" className="shrink-0">
          <Logo />
        </Link>

        {/* the address sits in the masthead, the way a label prints its origin */}
        <p className="stamp hidden text-inksoft lg:block">
          {site.address} · {site.hours}
        </p>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="stamp py-3 text-ink hover:text-paprika">
              {l.label}
            </Link>
          ))}
          <Link
            href="/poruci"
            className="misreg stamp bg-paprika px-4 py-2.5 text-paper hover:bg-ink"
          >
            Poruči{count > 0 ? ` · ${count}` : ""}
          </Link>
        </nav>

        <button
          className="-mr-1 flex h-11 w-11 items-center justify-center text-ink md:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Zatvori meni" : "Otvori meni"}
          aria-expanded={open}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            {open ? (
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M3 7h18M3 12h18M3 17h18"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t-[3px] border-ink bg-board px-5 pb-5 pt-2 md:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="wordset block border-b border-ink/15 py-3 text-2xl text-ink"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/poruci"
            onClick={() => setOpen(false)}
            className="stamp mt-4 inline-block bg-paprika px-5 py-3 text-paper"
          >
            Poruči{count > 0 ? ` · ${count}` : ""}
          </Link>
          <p className="stamp mt-4 text-inksoft">
            {site.address} · {site.hours}
          </p>
        </div>
      )}
    </header>
  );
}
