#!/usr/bin/env bash
# =============================================================================
# generate-para-site.sh
# Scaffolds the full PARA phở-delivery website:
#   Next.js 14 (App Router) + TypeScript + Tailwind CSS
#   Pages: / (landing)  /meni  /poruci (ordering)  /prica (story)
#   Client cart (localStorage), Viber/WhatsApp/phone checkout, aggregator links.
#   All copy + menu data baked in (Serbian, dish names in Vietnamese).
#
# Usage:
#   bash generate-para-site.sh [target-dir]      # default: para-web
#   cd para-web && npm install && npm run dev
#
# After generating, edit src/data/site.ts to drop in real phone/Viber/WhatsApp
# numbers and the real Wolt/Glovo/mr.D listing URLs.
# =============================================================================
set -euo pipefail

DIR="${1:-para-web}"
if [ -e "$DIR" ]; then
  echo "✗ '$DIR' already exists. Pass a different target dir or remove it." >&2
  exit 1
fi

echo "→ Creating PARA site in ./$DIR"
mkdir -p "$DIR/src/app/meni" "$DIR/src/app/poruci" "$DIR/src/app/prica" \
         "$DIR/src/components" "$DIR/src/data" "$DIR/src/lib" "$DIR/public"

# ------------------------------------------------------------------ package.json
cat > "$DIR/package.json" <<'PARA_EOF'
{
  "name": "para-web",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "14.2.35",
    "react": "18.3.1",
    "react-dom": "18.3.1"
  },
  "devDependencies": {
    "@types/node": "20.14.10",
    "@types/react": "18.3.3",
    "@types/react-dom": "18.3.0",
    "autoprefixer": "10.4.19",
    "postcss": "8.4.39",
    "tailwindcss": "3.4.6",
    "typescript": "5.5.3"
  }
}
PARA_EOF

# --------------------------------------------------------------- next.config.mjs
cat > "$DIR/next.config.mjs" <<'PARA_EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {};
export default nextConfig;
PARA_EOF

# ---------------------------------------------------------------- tsconfig.json
cat > "$DIR/tsconfig.json" <<'PARA_EOF'
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
PARA_EOF

# ------------------------------------------------------------ postcss.config.mjs
cat > "$DIR/postcss.config.mjs" <<'PARA_EOF'
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
PARA_EOF

# ------------------------------------------------------------- tailwind.config.ts
cat > "$DIR/tailwind.config.ts" <<'PARA_EOF'
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        char: "#14100C",
        charsoft: "#1E1813",
        broth: "#E0A43B",
        ember: "#B5471F",
        herb: "#8CB33A",
        bone: "#F3E9D6",
        steam: "#FCF8F0",
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 60px -12px rgba(224,164,59,0.5)",
      },
    },
  },
  plugins: [],
};

export default config;
PARA_EOF

# -------------------------------------------------------------------- .gitignore
cat > "$DIR/.gitignore" <<'PARA_EOF'
/node_modules
/.next
/out
/build
.DS_Store
*.pem
.env*
next-env.d.ts
PARA_EOF

# ----------------------------------------------------------------------- README
cat > "$DIR/README.md" <<'PARA_EOF'
# PARA — phở kuhinja (web)

Next.js 14 + TypeScript + Tailwind. Landing, menu, ordering and story pages,
fully populated with copy and menu data.

## Run
```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start   # production
```

## Make it real (edit `src/data/site.ts`)
- `phone`, `viber`, `whatsapp` — your real numbers (Viber/WhatsApp = digits only, no +).
- `aggregators.wolt/glovo/mrd` — your real listing URLs.
- `deliveryFee`, `freeDeliveryOver`, `zones`, `hours` — match operations.

## Add photos (optional)
Cards and the hero render with styled CSS/SVG so the site looks complete with
zero images. To use real photography, drop files in `public/images/` and swap the
`<BowlArt/>` / swatch blocks for `<img>` — see Appendix B of the business plan for
ready-to-use image-generation prompts.

## Ordering
Direct orders open a pre-filled WhatsApp/Viber message or a phone call (no backend).
Aggregator buttons link out to Wolt/Glovo/mr.D. To take card payments online later,
wire the `/poruci` checkout to a payment provider + a small order API.
PARA_EOF

# ============================================================== src/data/site.ts
cat > "$DIR/src/data/site.ts" <<'PARA_EOF'
// Brand + operational config. EDIT the contact/links before going live.
export const site = {
  name: "PARA",
  tagline: "Supa koja putuje.",
  support: "14 sati ključanja. 25 minuta do tebe.",
  city: "Novi Sad",

  // --- replace these placeholders ---
  phone: "+381 60 1234567",
  viber: "381601234567",      // digits only, country code, no +
  whatsapp: "381601234567",   // digits only, country code, no +
  email: "zdravo@para.rs",
  instagram: "https://instagram.com/para.phokuhinja",
  // -----------------------------------

  hours: "Svaki dan 11–22h",
  deliveryFee: 200,           // RSD, direktna dostava
  freeDeliveryOver: 1800,     // RSD, prag za besplatnu dostavu
  zones: ["Centar", "Liman", "Grbavica", "Novo Naselje", "Detelinara", "Podbara"],

  aggregators: {
    wolt: "https://wolt.com/sr/srb/novi-sad",
    glovo: "https://glovoapp.com/rs/sr/novi-sad/",
    mrd: "https://mrd.rs/",
  },
};
PARA_EOF

# ============================================================== src/data/menu.ts
cat > "$DIR/src/data/menu.ts" <<'PARA_EOF'
export type MenuItem = {
  id: string;
  vi: string;                 // vijetnamski naziv
  sr: string;                 // srpski opis (kratko)
  desc: string;               // srpski opis (puni)
  price: number;              // RSD, direktni kanal
  category: "supe" | "prilozi" | "pice";
  tag?: "signature" | "push" | "vegan" | "spicy";
  swatch: [string, string];   // gradijent za vizuelni prikaz (bez fotografije)
};

export const menu: MenuItem[] = [
  {
    id: "pho-bo-tai",
    vi: "Phở Bò Tái",
    sr: "Phở sa sirovom govedinom",
    desc:
      "Bistra goveđa supa kuvana 14 sati. Tanko sečena junetina koja se skuva u vrelini supe, pirinčani rezanci, mladi luk i svež začin.",
    price: 950,
    category: "supe",
    swatch: ["#7A3B12", "#241307"],
  },
  {
    id: "pho-dac-biet",
    vi: "Phở Đặc Biệt",
    sr: "Specijalna PARA phở",
    desc:
      "Naša najbogatija činija: oxtail i juneći grudni deo, dupla porcija mesa i supa kuvana do dubokog, punog ukusa.",
    price: 1090,
    category: "supe",
    tag: "signature",
    swatch: ["#8A2D12", "#1E0E06"],
  },
  {
    id: "pho-ga",
    vi: "Phở Gà",
    sr: "Pileća phở",
    desc:
      "Lagana i mirisna pileća supa sa pečenim đumbirom i karanfilićem, sočno pileće meso i pirinčani rezanci.",
    price: 790,
    category: "supe",
    tag: "push",
    swatch: ["#B8862A", "#2A1E08"],
  },
  {
    id: "pho-chay",
    vi: "Phở Chay",
    sr: "Posna phở (vegan)",
    desc:
      "Supa od pečenog đumbira, luka i šitaki pečuraka. Tofu, sezonsko povrće i svež začin. 100% biljna.",
    price: 750,
    category: "supe",
    tag: "vegan",
    swatch: ["#5C7A1E", "#1A2208"],
  },
  {
    id: "goi-cuon",
    vi: "Gỏi cuốn",
    sr: "Sveže prolećne rolnice (2 kom)",
    desc:
      "Pirinčani papir, rezanci, svež začin i salata. Stiže uz domaći kikiriki umak.",
    price: 390,
    category: "prilozi",
    swatch: ["#5E7A2A", "#1C2410"],
  },
  {
    id: "cha-gio",
    vi: "Chả giò",
    sr: "Pržene rolnice (3 kom)",
    desc:
      "Hrskave pržene rolnice sa mlevenim mesom i povrćem. Putuju hrskave, jedu se umočene u nuoc cham.",
    price: 420,
    category: "prilozi",
    swatch: ["#A8601E", "#2A1808"],
  },
  {
    id: "ca-phe-sua-da",
    vi: "Cà phê sữa đá",
    sr: "Vijetnamska ledena kafa",
    desc:
      "Jaka kafa sa kondenzovanim mlekom, preko leda. Najbolji kraj svake činije.",
    price: 350,
    category: "pice",
    tag: "push",
    swatch: ["#5A3A22", "#1A0F08"],
  },
];

export type Addon = { id: string; name: string; price: number };
export const addons: Addon[] = [
  { id: "extra-meso", name: "Dodatna junetina", price: 200 },
  { id: "extra-rezanci", name: "Dodatni rezanci", price: 120 },
  { id: "extra-zacin", name: "Dupli svež začin i biljke", price: 90 },
  { id: "ljuto", name: "Sveža čili papričica", price: 60 },
  { id: "sosevi", name: "Hoisin + Sriracha kesice", price: 0 },
];
PARA_EOF

# ============================================================= src/lib/format.ts
cat > "$DIR/src/lib/format.ts" <<'PARA_EOF'
export const rsd = (n: number): string => `${n.toLocaleString("sr-RS")} din`;
PARA_EOF

# ============================================================== src/lib/cart.tsx
cat > "$DIR/src/lib/cart.tsx" <<'PARA_EOF'
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type CartLine = { id: string; name: string; price: number; qty: number };

type CartCtx = {
  lines: CartLine[];
  add: (line: Omit<CartLine, "qty">) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  count: number;
  subtotal: number;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "para-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setLines(JSON.parse(raw) as CartLine[]);
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem(KEY, JSON.stringify(lines));
  }, [lines, ready]);

  const add: CartCtx["add"] = (line) =>
    setLines((prev) => {
      const i = prev.findIndex((l) => l.id === line.id);
      if (i >= 0) {
        const next = [...prev];
        next[i] = { ...next[i], qty: next[i].qty + 1 };
        return next;
      }
      return [...prev, { ...line, qty: 1 }];
    });

  const setQty: CartCtx["setQty"] = (id, qty) =>
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => l.id !== id)
        : prev.map((l) => (l.id === id ? { ...l, qty } : l))
    );

  const remove: CartCtx["remove"] = (id) =>
    setLines((prev) => prev.filter((l) => l.id !== id));

  const clear = () => setLines([]);

  const count = lines.reduce((n, l) => n + l.qty, 0);
  const subtotal = lines.reduce((n, l) => n + l.qty * l.price, 0);

  return (
    <Ctx.Provider value={{ lines, add, setQty, remove, clear, count, subtotal }}>
      {children}
    </Ctx.Provider>
  );
}

export function useCart(): CartCtx {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used within CartProvider");
  return c;
}
PARA_EOF

# ========================================================== src/components/Logo.tsx
cat > "$DIR/src/components/Logo.tsx" <<'PARA_EOF'
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-end gap-2 ${className}`}>
      <svg
        width="22"
        height="30"
        viewBox="0 0 22 30"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M5 28 C2 22 8 20 5 14 C3 10 7 8 5 3"
          stroke="#E0A43B"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M11 28 C8 21 14 19 11 12 C9 8 13 6 11 1"
          stroke="#E0A43B"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.8"
        />
        <path
          d="M17 28 C14 22 20 20 17 14 C15 10 19 8 17 4"
          stroke="#E0A43B"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.55"
        />
      </svg>
      <span className="font-display text-2xl font-extrabold leading-none tracking-tight text-bone">
        PARA
      </span>
    </span>
  );
}
PARA_EOF

# ======================================================= src/components/BowlArt.tsx
cat > "$DIR/src/components/BowlArt.tsx" <<'PARA_EOF'
export default function BowlArt({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 320"
      className={className}
      role="img"
      aria-label="Činija phở supe iz koje se diže para"
    >
      <defs>
        <radialGradient id="brothG" cx="50%" cy="42%" r="58%">
          <stop offset="0%" stopColor="#F4CE78" />
          <stop offset="55%" stopColor="#E0A43B" />
          <stop offset="100%" stopColor="#A8651C" />
        </radialGradient>
        <linearGradient id="bowlG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#272019" />
          <stop offset="100%" stopColor="#0E0B07" />
        </linearGradient>
      </defs>

      <g stroke="#FCF8F0" strokeWidth="5" strokeLinecap="round" fill="none" opacity="0.8">
        <path className="wisp w1" d="M120 96 C108 76 132 70 120 50 C112 36 128 30 120 14" />
        <path className="wisp w2" d="M160 96 C148 72 172 66 160 44 C152 30 168 24 160 8" />
        <path className="wisp w3" d="M200 96 C188 76 212 70 200 50 C192 36 208 30 200 16" />
      </g>

      <path
        d="M44 150 H276 C272 226 224 268 160 268 C96 268 48 226 44 150 Z"
        fill="url(#bowlG)"
      />
      <ellipse cx="160" cy="150" rx="116" ry="34" fill="url(#brothG)" />
      <ellipse cx="160" cy="150" rx="116" ry="34" fill="none" stroke="#3A2E22" strokeWidth="4" />

      <g opacity="0.95">
        <ellipse cx="120" cy="146" rx="20" ry="6" fill="#7A3B1E" />
        <ellipse cx="160" cy="156" rx="22" ry="6" fill="#8A4322" />
        <ellipse cx="196" cy="146" rx="18" ry="5" fill="#6E3318" />
        <circle cx="138" cy="140" r="3" fill="#8CB33A" />
        <circle cx="178" cy="142" r="3" fill="#8CB33A" />
        <circle cx="150" cy="160" r="3" fill="#9CC246" />
        <circle cx="200" cy="158" r="2.5" fill="#F3E9D6" />
        <circle cx="124" cy="158" r="2.5" fill="#F3E9D6" />
      </g>

      <ellipse cx="160" cy="276" rx="54" ry="9" fill="#0A0806" />
    </svg>
  );
}
PARA_EOF

# =========================================================== src/components/Nav.tsx
cat > "$DIR/src/components/Nav.tsx" <<'PARA_EOF'
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
PARA_EOF

# ======================================================== src/components/Footer.tsx
cat > "$DIR/src/components/Footer.tsx" <<'PARA_EOF'
import { site } from "@/data/site";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-charsoft">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-bone/60">
            {site.tagline} {site.support}
          </p>
        </div>

        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-wider text-broth">
            Kontakt
          </h4>
          <ul className="mt-3 space-y-1 text-sm text-bone/70">
            <li>
              <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hover:text-broth">
                {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-broth">
                {site.email}
              </a>
            </li>
            <li>{site.hours}</li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-wider text-broth">
            Dostava
          </h4>
          <p className="mt-3 text-sm text-bone/70">{site.zones.join(" · ")}</p>
          <div className="mt-3 flex gap-3 text-sm">
            <a href={site.aggregators.wolt} className="text-bone/70 hover:text-broth">Wolt</a>
            <a href={site.aggregators.glovo} className="text-bone/70 hover:text-broth">Glovo</a>
            <a href={site.aggregators.mrd} className="text-bone/70 hover:text-broth">mr.D</a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5 px-5 py-5 text-center text-xs text-bone/40">
        © {new Date().getFullYear()} {site.name} · {site.city} · Demo sajt — zameni
        placeholder kontakte i linkove u src/data/site.ts pre objave.
      </div>
    </footer>
  );
}
PARA_EOF

# ======================================================= src/components/MenuCard.tsx
cat > "$DIR/src/components/MenuCard.tsx" <<'PARA_EOF'
"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart";
import { rsd } from "@/lib/format";
import type { MenuItem } from "@/data/menu";

const tagLabel: Record<string, string> = {
  signature: "Specijalitet",
  push: "Omiljeno",
  vegan: "Vegan",
  spicy: "Ljuto",
};

export default function MenuCard({ item }: { item: MenuItem }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  const onAdd = () => {
    add({ id: item.id, name: item.vi, price: item.price });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1100);
  };

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-white/5 bg-charsoft transition hover:border-broth/30">
      <div
        className="relative aspect-[4/3] overflow-hidden"
        style={{
          background: `radial-gradient(70% 70% at 50% 40%, ${item.swatch[0]}, ${item.swatch[1]})`,
        }}
      >
        <div
          className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-black/10 transition group-hover:scale-105"
          style={{
            background: `radial-gradient(circle at 50% 35%, #F0C26B, ${item.swatch[0]})`,
            boxShadow: "inset 0 -8px 20px rgba(0,0,0,0.25)",
          }}
        />
        {item.tag && (
          <span className="absolute left-3 top-3 rounded-full bg-char/70 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-broth">
            {tagLabel[item.tag]}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-xl font-bold text-steam">{item.vi}</h3>
        <p className="text-sm text-broth/90">{item.sr}</p>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-bone/60">{item.desc}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="font-display text-lg font-bold text-bone">{rsd(item.price)}</span>
          <button
            onClick={onAdd}
            className="rounded-full bg-broth px-4 py-2 text-sm font-semibold text-char transition hover:bg-steam"
          >
            {added ? "Dodato ✓" : "Dodaj"}
          </button>
        </div>
      </div>
    </article>
  );
}
PARA_EOF

# ========================================================== src/components/Hero.tsx
cat > "$DIR/src/components/Hero.tsx" <<'PARA_EOF'
import Link from "next/link";
import BowlArt from "./BowlArt";
import { site } from "@/data/site";

export default function Hero() {
  return (
    <section className="bg-broth-ambient">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:py-24">
        <div>
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-broth/30 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-broth">
            <span className="h-1.5 w-1.5 rounded-full bg-herb" /> Phở kuhinja · {site.city}
          </p>
          <h1 className="font-display text-5xl font-extrabold leading-[0.95] text-steam md:text-7xl">
            Supa koja
            <br />
            <span className="text-broth">putuje.</span>
          </h1>
          <p className="mt-6 max-w-md text-lg text-bone/75">
            Prava vijetnamska phở supa, kuvana 14 sati i dostavljena vrela. Otvori,
            sipaj, gledaj kako se diže para.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/poruci"
              className="rounded-full bg-ember px-7 py-3 font-semibold text-steam shadow-glow transition hover:bg-broth hover:text-char"
            >
              Poruči odmah
            </Link>
            <Link
              href="/meni"
              className="rounded-full border border-bone/20 px-7 py-3 font-semibold text-bone transition hover:border-broth hover:text-broth"
            >
              Pogledaj meni
            </Link>
          </div>
          <p className="mt-5 text-sm text-bone/50">{site.support}</p>
        </div>

        <div className="relative mx-auto w-full max-w-sm">
          <BowlArt className="w-full" />
        </div>
      </div>
    </section>
  );
}
PARA_EOF

# ============================================================== src/app/globals.css
cat > "$DIR/src/app/globals.css" <<'PARA_EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  color-scheme: dark;
}

* {
  -webkit-tap-highlight-color: transparent;
}

html {
  scroll-behavior: smooth;
}

body {
  background: #14100c;
  color: #f3e9d6;
  font-family: Inter, system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
}

.bg-broth-ambient {
  background:
    radial-gradient(55% 45% at 75% 0%, rgba(224, 164, 59, 0.16), transparent 70%),
    radial-gradient(40% 40% at 8% 12%, rgba(181, 71, 31, 0.14), transparent 70%),
    #14100c;
}

@keyframes wisp {
  0% {
    opacity: 0;
    transform: translateY(8px);
  }
  25% {
    opacity: 0.75;
  }
  100% {
    opacity: 0;
    transform: translateY(-26px);
  }
}

.wisp {
  transform-box: fill-box;
  transform-origin: center;
  animation: wisp 3.6s ease-in-out infinite;
}
.wisp.w2 {
  animation-delay: 1.2s;
}
.wisp.w3 {
  animation-delay: 2.4s;
}

a:focus-visible,
button:focus-visible,
input:focus-visible {
  outline: 2px solid #e0a43b;
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  .wisp {
    animation: none;
    opacity: 0.4;
  }
  html {
    scroll-behavior: auto;
  }
}
PARA_EOF

# =============================================================== src/app/layout.tsx
cat > "$DIR/src/app/layout.tsx" <<'PARA_EOF'
import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/lib/cart";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: `${site.name} — Phở kuhinja · ${site.city}`,
  description: `${site.tagline} ${site.support}`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,800&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <CartProvider>
          <Nav />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
PARA_EOF

# ================================================================= src/app/page.tsx
cat > "$DIR/src/app/page.tsx" <<'PARA_EOF'
import Link from "next/link";
import Hero from "@/components/Hero";
import MenuCard from "@/components/MenuCard";
import { menu } from "@/data/menu";
import { site } from "@/data/site";

const trust = [
  { k: "14h", v: "supa se kuva" },
  { k: "0", v: "konzervanasa" },
  { k: "~25 min", v: "do tvojih vrata" },
  { k: "odvojeno", v: "supa i rezanci putuju posebno" },
];

const steps = [
  { n: "01", t: "Otvori", d: "Vrela supa, rezanci i svež začin stižu u odvojenim kutijama." },
  { n: "02", t: "Sipaj", d: "Presipaš vrelu supu preko rezanaca. Rezanci ostaju savršeni, nikad raskuvani." },
  { n: "03", t: "Para", d: "Dodaš biljke, limetu i čili. Diže se para — i to je tvoja činija." },
];

export default function Home() {
  const featured = menu.filter((m) => m.category === "supe").slice(0, 3);

  return (
    <>
      <Hero />

      <section className="border-y border-white/5 bg-charsoft">
        <div className="mx-auto grid max-w-6xl grid-cols-2 px-5 md:grid-cols-4">
          {trust.map((t, i) => (
            <div key={i} className="py-6 text-center">
              <div className="font-display text-2xl font-extrabold text-broth">{t.k}</div>
              <div className="mt-1 text-xs text-bone/50">{t.v}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <h2 className="font-display text-3xl font-extrabold text-steam md:text-4xl">
          Otvori. Sipaj. Para.
        </h2>
        <p className="mt-2 max-w-lg text-bone/60">
          Phở ne podnosi da rezanci stoje u supi 25 minuta. Zato ništa ne mešamo
          unapred — ti spajaš činiju, sveže, kod kuće.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="rounded-2xl border border-white/5 bg-charsoft p-6">
              <div className="font-display text-sm font-bold text-ember">{s.n}</div>
              <h3 className="mt-2 font-display text-xl font-bold text-bone">{s.t}</h3>
              <p className="mt-2 text-sm text-bone/60">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-8">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="font-display text-3xl font-extrabold text-steam">Iz kuhinje</h2>
          <Link href="/meni" className="text-sm text-broth hover:text-steam">
            Ceo meni →
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((m) => (
            <MenuCard key={m.id} item={m} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="rounded-3xl border border-broth/20 bg-broth-ambient p-8 md:p-12">
          <h2 className="font-display text-3xl font-extrabold text-steam">PARA Combo</h2>
          <p className="mt-2 max-w-md text-bone/70">
            Bilo koja činija + vijetnamska ledena kafa, 100 din jeftinije. Najbolji
            način da završiš obrok.
          </p>
          <Link
            href="/meni"
            className="mt-6 inline-block rounded-full bg-ember px-7 py-3 font-semibold text-steam hover:bg-broth hover:text-char"
          >
            Sastavi combo
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-24 text-center">
        <h2 className="font-display text-2xl font-bold text-bone">
          Dostavljamo u {site.city}u
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-bone/60">{site.zones.join(" · ")}</p>
        <Link
          href="/poruci"
          className="mt-6 inline-block rounded-full bg-broth px-8 py-3 font-semibold text-char hover:bg-steam"
        >
          Poruči činiju
        </Link>
      </section>
    </>
  );
}
PARA_EOF

# ============================================================ src/app/meni/page.tsx
cat > "$DIR/src/app/meni/page.tsx" <<'PARA_EOF'
import MenuCard from "@/components/MenuCard";
import { menu, addons } from "@/data/menu";
import { rsd } from "@/lib/format";

const groups = [
  { key: "supe", title: "Supe", sub: "Phở — srce svega" },
  { key: "prilozi", title: "Prilozi", sub: "Uz činiju" },
  { key: "pice", title: "Piće", sub: "Da zaokružiš obrok" },
] as const;

export default function MenuPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-14">
      <header className="mb-10">
        <h1 className="font-display text-4xl font-extrabold text-steam md:text-5xl">Meni</h1>
        <p className="mt-2 text-bone/60">
          Sve sveže. Supa i rezanci putuju odvojeno — ti ih spajaš za 90 sekundi.
        </p>
      </header>

      {groups.map((g) => {
        const items = menu.filter((m) => m.category === g.key);
        if (items.length === 0) return null;
        return (
          <section key={g.key} className="mb-14">
            <div className="mb-5 flex items-baseline gap-3">
              <h2 className="font-display text-2xl font-bold text-broth">{g.title}</h2>
              <span className="text-sm text-bone/40">{g.sub}</span>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((m) => (
                <MenuCard key={m.id} item={m} />
              ))}
            </div>
          </section>
        );
      })}

      <section className="rounded-2xl border border-white/5 bg-charsoft p-6">
        <h2 className="font-display text-xl font-bold text-broth">Dodaci</h2>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {addons.map((a) => (
            <li
              key={a.id}
              className="flex justify-between border-b border-white/5 py-2 text-sm text-bone/70"
            >
              <span>{a.name}</span>
              <span className="text-bone">{a.price === 0 ? "gratis" : `+ ${rsd(a.price)}`}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
PARA_EOF

# ========================================================== src/app/poruci/page.tsx
cat > "$DIR/src/app/poruci/page.tsx" <<'PARA_EOF'
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
PARA_EOF

# =========================================================== src/app/prica/page.tsx
cat > "$DIR/src/app/prica/page.tsx" <<'PARA_EOF'
import Link from "next/link";

const values = [
  {
    t: "14 sati, svaki dan",
    d: "Kosti, oxtail i začini krčkaju se preko noći. Bez kocki, bez prečica, bez konzervanasa.",
  },
  {
    t: "Samo dostava",
    d: "Nema sale, nema konobara — sav trošak ide u meso i supu, ne u kiriju lokala.",
  },
  {
    t: "Odvojeno pakovanje",
    d: "Supa, rezanci i začin putuju posebno. Zato ti činija stigne kao da je iz kuhinje.",
  },
];

export default function Prica() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <h1 className="font-display text-4xl font-extrabold text-steam md:text-5xl">
        Para znači para.
      </h1>
      <p className="mt-4 text-lg text-bone/70">
        Na srpskom, para je ono što se diže iznad vrele činije. Za nas je to ceo
        brend: prava phở supa, dostavljena dovoljno vrela da se još puši kad otvoriš
        kutiju.
      </p>

      <div className="mt-10 space-y-6 leading-relaxed text-bone/70">
        <p>
          PARA je počela kao opsesija jednom činijom. Dvojica osnivača, jedna kuhinja,
          nijedan sto. Umesto restorana, napravili smo kuhinju koja radi samo za
          dostavu — i svu pažnju usmerili u ono što je u činiji.
        </p>
        <p>
          Goveđa supa se kuva 14 do 16 sati: juneće kosti, oxtail i grudni deo, pečeni
          đumbir i luk, anis, cimet, karanfilić. Skidamo penu, bistrimo, strpljivo.
          Kad je gotova, ne sipamo je preko rezanaca i ne šaljemo tako — jer bi do
          tebe stigla raskuvana. Pakujemo supu posebno, rezance posebno, začin posebno.
          Ti spajaš sve za 90 sekundi i dobiješ činiju kakva treba da bude.
        </p>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-3">
        {values.map((v) => (
          <div key={v.t} className="rounded-2xl border border-white/5 bg-charsoft p-5">
            <h3 className="font-display font-bold text-broth">{v.t}</h3>
            <p className="mt-2 text-sm text-bone/60">{v.d}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/poruci"
          className="inline-block rounded-full bg-ember px-8 py-3 font-semibold text-steam hover:bg-broth hover:text-char"
        >
          Poruči i ti
        </Link>
      </div>
    </div>
  );
}
PARA_EOF

echo "✓ Files written."
echo ""
echo "Next steps:"
echo "  cd $DIR"
echo "  npm install"
echo "  npm run dev      # http://localhost:3000"
echo ""
echo "Then edit src/data/site.ts with your real phone / Viber / WhatsApp / aggregator links."
