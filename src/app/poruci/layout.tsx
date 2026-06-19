import type { Metadata } from "next";

// /poruci is a client component (the cart), so its metadata lives here in a
// segment layout. Indexable, but the page is mostly interactive.
export const metadata: Metadata = {
  title: "Poruči",
  description: "Tvoja PARA korpa — poruči phở online uz plaćanje karticom, ili direktno preko Vibera/WhatsApp-a.",
  alternates: { canonical: "/poruci" },
};

export default function OrderLayout({ children }: { children: React.ReactNode }) {
  return children;
}
