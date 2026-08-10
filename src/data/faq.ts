// FAQ content: single source for the visible section (home) and the FAQPage
// JSON-LD in lib/seo.ts, so the two can't drift. Serbian, informal "ti" voice.
export type Faq = { q: string; a: string };

export const faq: Faq[] = [
  {
    q: "Šta je phở?",
    a: "Vijetnamska supa od bistre goveđe čorbe, pirinčanih rezanaca, tanko sečenog mesa i svežih biljaka. Naša se krčka šest sati na govedoj kosti, sa đumbirom, anisom, cimetom, karanfilićem i kardamomom.",
  },
  {
    q: "Zašto imate samo jedno jelo?",
    a: "Zato što se čorba ne može skratiti. Kuvamo jednu goveđu phở svaki dan i radije je radimo kako treba nego što bismo držali dugačak meni. Uz nju ide hladan Pilsner Urquell i to je ceo izbor.",
  },
  {
    q: "Koliko se kuva vaša supa?",
    a: "Šest sati, svakog dana, bez kocki, bez prečica i bez konzervanasa.",
  },
  {
    q: "Gde se nalazite i mogu li da jedem kod vas?",
    a: "Možeš. Lokal nam je u centru Novog Sada, u Stražilovskoj 10, blizu fakulteta. Imamo nekoliko stolova i ne primamo rezervacije, pa samo dođi i sedni.",
  },
  {
    q: "Da li dostavljate u Novom Sadu?",
    a: "Da, pored stolova u lokalu dostavljamo i po celom gradu: Centar, Liman, Grbavica, Novo Naselje, Detelinara i Podbara.",
  },
  {
    q: "Da li rezanci iz dostave stignu raskuvani?",
    a: "Ne, jer za dostavu pakujemo supu, rezance i biljke odvojeno. Spojiš ih kod kuće za devedeset sekundi i rezanci ostanu kako treba.",
  },
  {
    q: "Kako mogu da platim?",
    a: "Karticom online (Visa, Mastercard, DinaCard) uz 3-D Secure, ili pouzećem kuriru. Fiskalni račun stiže na tvoj imejl odmah po plaćanju.",
  },
];
