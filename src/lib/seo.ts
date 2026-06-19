/**
 * JSON-LD structured-data builders. Driven entirely by src/data so the schema
 * can't drift from the site content. Emitted via <JsonLd /> in server components.
 */

import { site } from "@/data/site";
import { menu, addons, type MenuItem } from "@/data/menu";

const abs = (path: string) => `${site.url}${path.startsWith("/") ? path : `/${path}`}`;

/** Restaurant / LocalBusiness — sitewide, lives in the root layout. */
export function restaurantSchema(): Record<string, unknown> {
  const address: Record<string, string> = {
    "@type": "PostalAddress",
    addressLocality: site.city,
    addressRegion: site.seo.addressRegion,
    addressCountry: site.seo.addressCountry,
  };
  if (site.seo.streetAddress) address.streetAddress = site.seo.streetAddress;
  if (site.seo.postalCode) address.postalCode = site.seo.postalCode;

  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${site.url}/#restaurant`,
    name: site.name,
    description: site.description,
    url: site.url,
    image: abs("/icon.svg"),
    servesCuisine: site.seo.cuisine,
    priceRange: site.seo.priceRange,
    currenciesAccepted: "RSD",
    paymentAccepted: "Cash, Credit Card",
    telephone: site.phone,
    email: site.email,
    address,
    areaServed: site.zones.map((z) => ({ "@type": "City", name: `${z}, ${site.city}` })),
    openingHours: site.seo.openingHours,
    sameAs: [site.instagram],
    hasMenu: abs("/meni"),
    acceptsReservations: false,
    potentialAction: {
      "@type": "OrderAction",
      target: abs("/poruci"),
      deliveryMethod: "http://purl.org/goodrelations/v1#DeliveryModeOwnFleet",
    },
  };
}

const sectionFor = (cat: MenuItem["category"]) =>
  ({ supe: "Supe", prilozi: "Prilozi", pice: "Piće" }[cat]);

function menuItemNode(name: string, description: string, price: number): Record<string, unknown> {
  return {
    "@type": "MenuItem",
    name,
    ...(description ? { description } : {}),
    offers: { "@type": "Offer", price: String(price), priceCurrency: "RSD" },
  };
}

/** Menu schema — lives on /meni. */
export function menuSchema(): Record<string, unknown> {
  const cats: MenuItem["category"][] = ["supe", "prilozi", "pice"];
  const sections = cats
    .map((cat) => ({
      cat,
      items: menu.filter((m) => m.category === cat),
    }))
    .filter((s) => s.items.length > 0)
    .map((s) => ({
      "@type": "MenuSection",
      name: sectionFor(s.cat),
      hasMenuItem: s.items.map((m) => menuItemNode(m.vi, m.desc, m.price)),
    }));

  sections.push({
    "@type": "MenuSection",
    name: "Dodaci",
    hasMenuItem: addons.map((a) => menuItemNode(a.name, "", a.price)),
  });

  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    name: `${site.name} meni`,
    inLanguage: "sr-RS",
    hasMenuSection: sections,
  };
}
