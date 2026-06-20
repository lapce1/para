// FAQ content — single source for the visible section (home) and the FAQPage
// JSON-LD in lib/seo.ts, so the two can't drift. Serbian, informal "ti" voice.
export type Faq = { q: string; a: string };

export const faq: Faq[] = [
  {
    q: "Šta je phở?",
    a: "Phở je vijetnamska supa od bistre goveđe ili pileće čorbe, pirinčanih rezanaca, mesa i svežih biljaka. Naša se krčka 6 sati na govedoj kosti, đumbiru, anisu, cimetu, karanfiliću i kardamomu.",
  },
  {
    q: "Koliko se kuva vaša supa?",
    a: "Goveđa supa se krčka 6 sati, svaki dan — bez kocki, bez prečica i bez konzervanasa.",
  },
  {
    q: "Da li dostavljate u Novom Sadu?",
    a: "Da. Dostavljamo vrelo i sveže širom Novog Sada: Centar, Liman, Grbavica, Novo Naselje, Detelinara i Podbara.",
  },
  {
    q: "Da li rezanci stignu raskuvani?",
    a: "Ne. Supu, pirinčane rezance i sveže biljke pakujemo odvojeno. Ti ih spojiš kod kuće za 90 sekundi, pa rezanci ostaju savršeni.",
  },
  {
    q: "Kako mogu da platim?",
    a: "Karticom online (Visa, Mastercard, DinaCard) uz 3-D Secure, ili pouzećem kuriru. Fiskalni račun stiže na tvoj imejl odmah po plaćanju.",
  },
  {
    q: "Imate li posnu (vegan) opciju?",
    a: "Imamo. Phở Chay je 100% biljna — supa od pečenog đumbira, luka i šitaki pečuraka, sa tofuom i sezonskim povrćem.",
  },
];
