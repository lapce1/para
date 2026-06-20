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
      "Bistra goveđa supa, krčkana 6 sati na govedoj kosti, đumbiru i anisu. Tanko sečena junetina koja se skuva u vrelini supe, pirinčani rezanci, mladi luk i sveže biljke — nana i bosiljak.",
    price: 950,
    category: "supe",
    swatch: ["#7A3B12", "#241307"],
  },
  {
    id: "pho-dac-biet",
    vi: "Phở Đặc Biệt",
    sr: "Specijalna PARA phở",
    desc:
      "Naša najbogatija činija: oxtail i juneći grudni deo, dupla porcija mesa i supa krčkana do dubokog, punog ukusa. Pirinčani rezanci, nana, bosiljak i limeta sa strane.",
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
