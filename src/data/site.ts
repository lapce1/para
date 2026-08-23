// Brand + operational config. EDIT the contact/links before going live.
export const site = {
  name: "PARA",
  tagline: "Supa koja se puši.",
  support: "Supa se krčka šest sati svakog jutra. Pojedeš je za stolom kod nas, poneseš ili ti stigne vrela na vrata.",
  city: "Novi Sad",
  cityLoc: "Novom Sadu", // lokativ: "u Novom Sadu" (nikad "u Novi Sadu")

  // Fizički lokal: mali prostor sa nekoliko stolova, centar, blizu fakulteta.
  address: "Stražilovska 10",
  addressLoc: "Stražilovskoj 10", // lokativ: "u Stražilovskoj 10" (nikad "u Stražilovska 10")

  // Canonical origin (no trailing slash). Used for SEO metadata + structured data.
  url: "https://para.rs",
  description:
    "PARA je vijetnamska phở kuhinja u centru Novog Sada, u Stražilovskoj 10. Kuvamo " +
    "jednu stvar: goveđu phở supu koja se krčka šest sati na kosti, đumbiru i anisu. " +
    "Pojedeš je za našim stolom, poneseš ili ti stigne vrela na adresu. Plaćanje " +
    "karticom ili pouzećem.",

  // --- replace these placeholders ---
  phone: "+381 60 1234567",
  viber: "381601234567",      // digits only, country code, no +
  whatsapp: "381601234567",   // digits only, country code, no +
  email: "zdravo@para.rs",
  // -----------------------------------
  instagram: "https://www.instagram.com/para.pho/", // real handle

  // Meta Pixel id. Empty string = analytics fully inert (no script, no calls).
  // GO-LIVE LEVER: set the real pixel id only when ads/tracking should start.
  metaPixelId: "",

  // GO-LIVE LEVER: while false, /poruci shows the waitlist instead of the order
  // form (no payment/Viber/WhatsApp paths) and CTAs advertise the signup.
  orderingLive: false,

  hours: "Svaki dan 11–22h",
  deliveryFee: 200,           // RSD, direktna dostava
  freeDeliveryOver: 1800,     // RSD, prag za besplatnu dostavu
  zones: ["Centar", "Liman", "Grbavica", "Novo Naselje", "Detelinara", "Podbara"],

  aggregators: {
    wolt: "https://wolt.com/sr/srb/novi-sad",
    glovo: "https://glovoapp.com/rs/sr/novi-sad/",
    mrd: "https://mrd.rs/",
  },

  // Machine-readable fields for SEO structured data (JSON-LD). Fill street/postal
  // once the business address is registered; the schema omits anything left empty.
  seo: {
    cuisine: "Vietnamese",
    priceRange: "350-650 RSD",
    openingHours: "Mo-Su 11:00-22:00", // matches `hours` above
    addressRegion: "Vojvodina",
    addressCountry: "RS",
    streetAddress: "Stražilovska 10",
    postalCode: "21000",
  },

  // Legal entity details for /uslovi-koriscenja and /politika-privatnosti.
  // GO-LIVE: fill these from the APR registration before ordering goes live.
  // Empty fields render a visible "dopuniti pre objave" placeholder on the page.
  legal: {
    entity: "",        // pun poslovni naziv, npr. "PARA DOO Novi Sad"
    regNumber: "",     // matični broj
    taxId: "",         // PIB
    seat: "",          // sedište, ako se razlikuje od lokala
    court: "Novi Sad", // stvarno i mesno nadležni sud
    effectiveDate: "", // datum stupanja na snagu, npr. "2026-09-01"
  },
};
