import type { Metadata } from "next";
import { site } from "@/data/site";

// /poruci is a client component (the cart), so its metadata lives here in a
// segment layout. The description follows site.orderingLive so the search
// snippet never advertises card/Viber ordering while the page is a waitlist.
export const metadata: Metadata = {
  title: site.orderingLive ? "Poruči" : "Uskoro krećemo",
  description: site.orderingLive
    ? "Tvoja PARA korpa. Poruči phở online uz plaćanje karticom, ili direktno preko Vibera i WhatsApp-a."
    : `PARA otvara vijetnamsku phở kuhinju u ${site.addressLoc}, ${site.cityLoc}. Ostavi imejl pa ti javimo čim otvorimo.`,
  alternates: { canonical: "/poruci" },
};

export default function OrderLayout({ children }: { children: React.ReactNode }) {
  return children;
}
