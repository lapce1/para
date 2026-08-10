// Phở guide content: single source for the visible /pho page and the Article +
// HowTo JSON-LD in lib/seo.ts, so the prose and the structured data can't drift.
// Serbian, informal "ti" voice. This page targets informational search demand
// ("šta je pho", "vijetnamska supa", "kako se jede pho").

export const phoIntro =
  'Phở (izgovara se otprilike „fə", bliže „fa" nego „fo") je najpoznatija ' +
  "vijetnamska supa: bistra čorba koja se krčka satima, svilenkasti pirinčani " +
  "rezanci, tanko sečeno meso i pregršt svežih biljaka. Nastala je početkom 20. " +
  "veka na severu Vijetnama, oko Hanoja, i danas je nacionalno jelo. Tamo se jede " +
  "za doručak, ali i u svako drugo doba dana.";

export const phoSections: { h: string; p: string }[] = [
  {
    h: "Od čega se pravi phở supa",
    p:
      "Sve počinje i završava se čorbom. Prava se ne kuva od kocki nego od goveđih " +
      "kostiju, oxtaila i grudi, uz pečeni đumbir i crni luk i pet klasičnih začina: " +
      "anis, cimet, karanfilić, kardamom i đumbir. Kod nas se krčka i bistri šest " +
      "sati svakog dana, bez konzervanasa. Tek onda u činiju idu pirinčani rezanci " +
      "(bánh phở), meso i sveže biljke.",
  },
  {
    h: "Kako se jede phở",
    p:
      "Phở se sklapa u činiji i jede dok je vrelo. Prvo srkneš čistu čorbu da osetiš " +
      "začine, pa tek onda mešaš rezance, meso i biljke. Limetu, nanu, bosiljak i čili " +
      "dodaješ sam, po sopstvenom ukusu, i zato uvek stižu sa strane.",
  },
  {
    h: "Gde se jede PARA phở",
    p:
      "Na srpskom, para je ono što se diže iznad vrele činije, pa nam se ime činilo " +
      "kao logičan izbor. Najbolje je da to vidiš uživo: lokal nam je u centru Novog " +
      "Sada, u Stražilovskoj 10, nekoliko stolova blizu fakulteta. Kad naručiš dostavu, " +
      "supu, rezance i biljke pakujemo odvojeno, pa ih spojiš kod kuće za devedeset " +
      "sekundi i činija je kao da je tek izašla iz kuhinje.",
  },
];

// Vrste phở-a koje postoje u Vijetnamu. Mi kuvamo samo goveđi, i to je jasno
// rečeno na stranici, da lista ne bi zvučala kao naš meni.
export const phoTypes: { vi: string; sr: string; d: string }[] = [
  {
    vi: "Phở bò",
    sr: "Goveđi",
    d: "Klasik sa severa Vijetnama: bistra goveđa čorba, tanko sečena junetina i rezanci. To je ono što mi kuvamo.",
  },
  {
    vi: "Phở gà",
    sr: "Pileći",
    d: "Lakša i blaža varijanta, sa pilećom čorbom i mesom. Kod nas je nema.",
  },
  {
    vi: "Phở chay",
    sr: "Posni · vegan",
    d: "Potpuno biljna: čorba od pečenog đumbira, luka i šitaki pečuraka, sa tofuom i povrćem. Ni nju za sada ne kuvamo.",
  },
];

export const phoHowTo = {
  name: "Kako spojiti PARA phở iz dostave",
  description:
    "Za stolom činija stiže sklopljena. Iz dostave vrela supa, pirinčani rezanci i " +
    "sveže biljke stižu odvojeno, pa ih spajaš kod kuće za devedeset sekundi.",
  steps: [
    {
      name: "Otvori",
      text: "Vrela supa, pirinčani rezanci i sveže biljke stižu u odvojenim kutijama.",
    },
    {
      name: "Sipaj",
      text: "Presipaš vrelu čorbu preko rezanaca i mesa. Toplota ih za par sekundi dovede do prave teksture.",
    },
    {
      name: "Začini",
      text: "Dodaš nanu i bosiljak, iscediš limetu i ubaciš sveži čili po želji.",
    },
    {
      name: "Srkni čorbu prvo",
      text: "Probaj prvo čistu čorbu, pa tek onda mešaj rezance i biljke. Tako osetiš svih pet začina.",
    },
  ],
};
