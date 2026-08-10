// Phở vs ramen poređenje: jedan izvor za vidljivu stranicu /pho/pho-ili-ramen
// i njen FAQPage JSON-LD (lib/seo.ts), da sadržaj i schema ne mogu da se raziđu.
// Srpski, neformalno "ti", suvo i precizno. Cilja upite "pho ili ramen",
// "razlika pho ramen", "vijetnamska ili japanska supa".

export type PhoRamenRow = { dim: string; pho: string; ramen: string };

export const phoRamenIntro =
  "Phở i ramen su dve najpoznatije azijske supe sa rezancima, a skoro sve ostalo " +
  "im je različito. Phở je vijetnamski: bistra goveđa ili pileća supa, pirinčani " +
  "rezanci i sveže biljke koje dodaješ sam. Ramen je japanski: gušća pšenična " +
  "supa, alkalni rezanci i dodaci koje kuvar složi umesto tebe. Evo razlika, " +
  "jedna po jedna.";

export const phoRamenRows: PhoRamenRow[] = [
  {
    dim: "Poreklo",
    pho: "Vijetnam, početak 20. veka, ulične kuhinje Hanoja. Nacionalno jelo, jede se i za doručak.",
    ramen: "Japan, 20. vek, po kineskim uzorima. Od brze radničke hrane do kulta sa redovima ispred lokala.",
  },
  {
    dim: "Supa",
    pho: "Bistra i lagana. Krčka se satima na kostima, pečenom đumbiru i luku, uz anis, cimet, karanfilić i kardamom. Pije se čista, kašikom.",
    ramen: "Gusta i bogata. Tonkotsu se kuva dok se ne zamuti od kolagena, a ukus vodi tare (soja, miso, so) uz sloj masnoće preko.",
  },
  {
    dim: "Rezanci",
    pho: "Pirinčani, ravni i svilenkasti (bánh phở). Prirodno su bez glutena, upijaju supu i ostaju nežni.",
    ramen: "Pšenični, sa kansui alkalnom vodom, pa su žuti, elastični i žvakavi. Gluten je ovde poenta.",
  },
  {
    dim: "Dodaci",
    pho: "Stižu sa strane: nana, bosiljak, limeta, čili, klice. Činiju začinjavaš sam, zalogaj po zalogaj.",
    ramen: "Slažu se u kuhinji: chashu svinjetina, marinirano jaje, nori, menma. Kuvar odlučuje, ti jedeš.",
  },
  {
    dim: "Posle jela",
    pho: "Lagano, jer bistra supa i pirinčani rezanci ne ostavljaju težinu. Možeš nazad na posao.",
    ramen: "Zasitno, jer bogata supa i masnoća drže satima. Posle ramena se ne trči.",
  },
];

export const phoRamenFaq: { q: string; a: string }[] = [
  {
    q: "Da li su phở i ramen ista supa?",
    a: "Nisu. Phở je vijetnamska supa sa bistrom goveđom ili pilećom osnovom i pirinčanim rezancima; ramen je japanska supa sa pšeničnim rezancima i po pravilu gušćom, masnijom osnovom.",
  },
  {
    q: "Šta je lakše: phở ili ramen?",
    a: "Phở. Supa je bistra, rezanci su pirinčani i bez glutena, i nema sloja masnoće preko, pa phở možeš da jedeš i usred radnog dana.",
  },
  {
    q: "Gde mogu da probam phở u Novom Sadu?",
    a: "U PARA lokalu u centru, u Stražilovskoj 10, blizu fakulteta, gde imamo nekoliko stolova i ne primamo rezervacije. Kuvamo goveđi phở i dostavljamo ga vrelog širom Novog Sada.",
  },
];
