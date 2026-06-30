// Phở guide content — single source for the visible /pho page and the Article +
// HowTo JSON-LD in lib/seo.ts, so the prose and the structured data can't drift.
// Serbian, informal "ti" voice. This page targets informational search demand
// ("šta je pho", "vijetnamska supa", "kako se jede pho").

export const phoIntro =
  'Phở (izgovara se otprilike „fə" — bliže „fa" nego „fo") je najpoznatija ' +
  "vijetnamska supa: bistra čorba krčkana satima, svilenkasti pirinčani rezanci, " +
  "tanko sečeno meso i pregršt svežih biljaka. Nastala je početkom 20. veka na " +
  "severu Vijetnama, oko Hanoja, i danas je nacionalno jelo — jede se za doručak, " +
  "ali i u svako doba dana.";

export const phoSections: { h: string; p: string }[] = [
  {
    h: "Od čega se pravi phở supa",
    p:
      "Srce phở-a je čorba. Prava se ne kuva od kocki nego od goveđih kostiju, " +
      "oxtaila i grudi, uz pečeni đumbir i crni luk i pet klasičnih začina — anis, " +
      "cimet, karanfilić, kardamom i đumbir. Kod nas se krčka i bistri 6 sati, svaki " +
      "dan, bez konzervanasa. U činiju onda idu pirinčani rezanci (bánh phở), meso i " +
      "sveže biljke.",
  },
  {
    h: "Kako se jede phở",
    p:
      "Phở se sklapa u činiji i jede dok je vrelo. Prvo srkneš čistu čorbu da osetiš " +
      "začine, pa onda mešaš rezance, meso i biljke. Limeta, nana, bosiljak i čili " +
      "dodaju se po sopstvenom ukusu — zato i putuju odvojeno, da ti odlučiš.",
  },
  {
    h: "Zašto PARA phở stiže savršen",
    p:
      "Na srpskom, para je ono što se diže iznad vrele činije. Zato supu, pirinčane " +
      "rezance i sveže biljke pakujemo odvojeno — da rezanci nikad ne stignu raskuvani. " +
      "Ti ih spojiš kod kuće za 90 sekundi i dobiješ činiju kakva je tek izašla iz kuhinje.",
  },
];

export const phoTypes: { vi: string; sr: string; d: string }[] = [
  {
    vi: "Phở bò",
    sr: "Goveđi",
    d: "Klasik sa severa Vijetnama — bistra goveđa čorba, tanko sečena junetina i rezanci.",
  },
  {
    vi: "Phở gà",
    sr: "Pileći",
    d: "Lakša, blaža varijanta sa pilećom čorbom i mesom — kad želiš nešto nežnije.",
  },
  {
    vi: "Phở chay",
    sr: "Posni · vegan",
    d: "100% biljna: čorba od pečenog đumbira, luka i šitaki pečuraka, sa tofuom i povrćem.",
  },
];

export const phoHowTo = {
  name: "Kako spojiti i jesti PARA phở",
  description:
    "Vrela supa, pirinčani rezanci i sveže biljke stižu odvojeno. Spajaš ih kod kuće " +
    "za 90 sekundi i dobiješ restoransku činiju phở-a.",
  steps: [
    {
      name: "Otvori",
      text: "Vrela supa, pirinčani rezanci i sveže biljke stižu u odvojenim kutijama.",
    },
    {
      name: "Sipaj",
      text: "Presipaš vrelu čorbu preko rezanaca i mesa. Toplota ih za par sekundi dovede do savršene teksture.",
    },
    {
      name: "Začini",
      text: "Dodaš nanu i bosiljak, iscediš limetu i ubaciš sveži čili po želji.",
    },
    {
      name: "Srkni čorbu prvo",
      text: "Prvo probaj čistu čorbu, pa onda mešaj rezance i biljke — tako osetiš svih pet začina.",
    },
  ],
};
