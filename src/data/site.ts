// Brand + operational config. EDIT the contact/links before going live.
export const site = {
  name: "PARA",
  tagline: "Supa koja putuje.",
  support: "Supa se krčka 6 sati. Stiže vrela, na tvoja vrata.",
  city: "Novi Sad",

  // Canonical origin (no trailing slash). Used for SEO metadata + structured data.
  url: "https://para.rs",
  description:
    "PARA — vijetnamska phở kuhinja u Novom Sadu. Prava goveđa i pileća phở supa, " +
    "krčkana 6 sati na govedoj kosti, đumbiru i anisu, dostavljena vrela. Supa, " +
    "pirinčani rezanci i sveže biljke putuju odvojeno. Plaćanje karticom ili pouzećem.",

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

  // Machine-readable fields for SEO structured data (JSON-LD). Fill street/postal
  // once the business address is registered; the schema omits anything left empty.
  seo: {
    cuisine: "Vietnamese",
    priceRange: "800–1100 RSD",
    openingHours: "Mo-Su 11:00-22:00", // matches `hours` above
    addressRegion: "Vojvodina",
    addressCountry: "RS",
    streetAddress: "", // e.g. "Bulevar oslobođenja 1" — leave empty until registered
    postalCode: "", // e.g. "21000"
  },
};
