export type MenuItem = {
  id: string;
  vi: string;                 // vijetnamski naziv
  sr: string;                 // srpski opis (kratko)
  desc: string;               // srpski opis (puni)
  price: number;              // RSD, direktni kanal
  category: "supe" | "pice";
};

// Ceo meni. Dve stavke, i to je namerno: jedna činija koju kuvamo svaki dan i
// jedno pivo uz nju. Cene su izvor istine i za korpu i za server (worker/menu.ts).
export const menu: MenuItem[] = [
  {
    id: "pho-bo",
    vi: "Phở Bò",
    sr: "Goveđa phở",
    desc:
      "Bistra goveđa supa koja se krčka šest sati na kostima, oxtailu i junećim " +
      "grudima. U činiji su pirinčani rezanci, tanko sečena junetina koja se skuva " +
      "u vrelini supe, mladi luk, nana i bosiljak. Limeta i sveži čili idu sa strane, " +
      "pa činiju začiniš kako ti odgovara.",
    price: 650,
    category: "supe",
  },
  {
    id: "pilsner-urquell",
    vi: "Pilsner Urquell",
    sr: "Češki ležak",
    desc:
      "Hladno pivo uz vrelu supu. Gorčina hmelja preseče masnoću iz čorbe, zbog " +
      "čega ovo dvoje ide zajedno bolje nego što zvuči.",
    price: 350,
    category: "pice",
  },
];
