export interface SubRubric {
  id: string;
  slug: string;
  name: string;
  shortDesc: string;
  image: string;
  categoryFilter: string[];
  subCategoryFilter?: string[];
  tagFilter?: string[];
  customPredicate?: (item: any) => boolean;
}

export interface UniverseFAQ {
  question: string;
  answer: string;
}

export interface Universe {
  id: string;
  number: string;
  slug: string;
  aliases?: string[];
  name: string;
  shortTitle: string;
  heroTitle: string;
  heroDescription: string;
  image: string;
  badge: string;
  color: string;
  subRubrics: SubRubric[];
  faqs?: UniverseFAQ[];
}

export const UNIVERSES: Universe[] = [
  {
    id: "pdj",
    number: "01",
    slug: "petit-dejeuner",
    aliases: ["petit-dejeuner-gouter", "pdj"],
    name: "PETIT-DÉJEUNER & GOÛTER",
    shortTitle: "Petit-déjeuner",
    heroTitle: "Petit-déjeuner, Goûters & Pauses Équipe à Douala",
    heroDescription:
      "Des formules complètes, des douceurs artisanales faites maison chaque matin et une gamme brunch généreuse pour bien commencer vos journées ou dynamiser vos pauses d'affaires.",
    image: "/assets/univers-petit-dejeuner-banner.jpg",
    badge: "Matin & Pause Gourmande",
    color: "#E2725B",
    subRubrics: [
      {
        id: "pdj-formules",
        slug: "formules",
        name: "Les Formules",
        shortDesc: "Packs complets matinaux individuels & pour équipes de bureau.",
        image: "/assets/univers-petit-dejeuner-banner.jpg",
        categoryFilter: ["Petit-déjeuner"],
        subCategoryFilter: ["Formules"],
      },
      {
        id: "pdj-a-la-carte",
        slug: "a-la-carte",
        name: "À la carte",
        shortDesc: "Banana bread aux cacahuètes, cakes citronnés, salades de fruits frais et douceurs.",
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
        categoryFilter: ["Petit-déjeuner"],
        subCategoryFilter: ["À la carte"],
      },
      {
        id: "pdj-brunch",
        slug: "brunch",
        name: "Gamme Brunch",
        shortDesc: "Grandes assiettes brunch généreuses : Signature YAMOOH & Veggie Vitalité.",
        image: "/assets/brunch-yammoh-signature.jpg",
        categoryFilter: ["Brunch"],
      },
    ],
    faqs: [
      {
        question: "À quelle heure livrez-vous les petits-déjeuners à Douala ?",
        answer:
          "Nos livraisons débutent dès 7h30 du matin pour que vos collaborateurs profitent de préparations fraîches avant leurs réunions de travail.",
      },
      {
        question: "Les viennoiseries et cakes sont-ils faits maison ?",
        answer:
          "Oui, toutes nos douceurs matinales (cakes citron-gingembre, banana breads, salades de fruits) sont préparées le matin même dans nos ateliers à la Pharmacie Kotto.",
      },
      {
        question: "Peut-on commander des boissons chaudes en grande quantité ?",
        answer:
          "Absolument, nous proposons des thermos et fontaines de café torréfié d'Afrique et de thés parfumés prêts à servir pour vos équipes.",
      },
    ],
  },
  {
    id: "salades-plats",
    number: "02",
    slug: "salades-plats-sandwichs",
    aliases: ["salades", "plats", "sandwichs", "salades-plats"],
    name: "SALADES, PLATS & SANDWICHS",
    shortTitle: "Salades, Plats & Sandwichs",
    heroTitle: "Salades Fraîches, Plats Chauds & Sandwichs Gourmets",
    heroDescription:
      "Nos 8 salades signatures emblématiques, compositions à la carte, wraps croustillants et bowls chauds cuisinés minute avec des ingrédients rigoureusement sourcés.",
    image: "/assets/salade-classic-B-4lDVb2.jpg",
    badge: "Fraîcheur Quotidienne",
    color: "#1E3A2B",
    subRubrics: [
      {
        id: "sps-sandwichs",
        slug: "sandwichs",
        name: "Les Sandwichs",
        shortDesc: "Sandwichs généreux, wraps poulet épicé & avocat, baguettes artisanales.",
        image: "/assets/sandwich-poulet-DfgRC8VZ.jpg",
        categoryFilter: ["Sandwichs"],
      },
      {
        id: "sps-salades",
        slug: "salades",
        name: "Les Salades",
        shortDesc: "Nos 8 Salades Signatures personnalisables et créations fraîches du jour.",
        image: "/assets/salade-classic-B-4lDVb2.jpg",
        categoryFilter: ["Salades"],
      },
      {
        id: "sps-plats",
        slug: "plats",
        name: "Les Plats à réchauffer",
        shortDesc: "Bowls complets, poulet braisé savoureux, wok veggie et poissons frais.",
        image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80",
        categoryFilter: ["Plats"],
      },
      {
        id: "sps-desserts",
        slug: "desserts",
        name: "Les Desserts individuels",
        shortDesc: "Mousses chocolat aux éclats de cacahuètes, compotée mangue-passion, verrines.",
        image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80",
        categoryFilter: ["Desserts"],
      },
    ],
    faqs: [
      {
        question: "Comment personnaliser ma salade ?",
        answer:
          "Sur chaque salade Signature, cliquez sur 'COMPOSER' pour ajuster la base, les protéines, les légumes et choisir votre sauce maison dans notre Builder interactif.",
      },
      {
        question: "Les plats chauds sont-ils livrés prêts à déguster ?",
        answer:
          "Nos plats sont livrés dans des contenants adaptés permettant un réchauffage rapide au micro-ondes tout en préservant le croquant des légumes et la tendreté des viandes.",
      },
      {
        question: "Quels sont les délais de livraison pour le déjeuner ?",
        answer:
          "Pour un déjeuner livré entre 12h et 13h30, nous vous conseillons de passer commande avant 10h30 le matin.",
      },
    ],
  },
  {
    id: "plateaux",
    number: "03",
    slug: "plateaux-repas",
    aliases: ["plateaux"],
    name: "PLATEAUX REPAS",
    shortTitle: "Plateaux Repas",
    heroTitle: "Plateaux Repas d'Entreprise & Coffrets Déjeuners à Douala",
    heroDescription:
      "Des formules prêtes à déguster livrées directement dans vos bureaux pour vos réunions de direction, séminaires ou déjeuners de travail sans interruption.",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80",
    badge: "Business & Entreprises",
    color: "#2C5E43",
    subRubrics: [
      {
        id: "plt-essentiels",
        slug: "essentiels",
        name: "Les Essentiels",
        shortDesc: "Coffrets équilibrés et rapides (Coffrets 1, 2 et 3) avec boisson et dessert inclus.",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
        categoryFilter: ["Plateaux Repas"],
        customPredicate: (item: any) =>
          item.category === "Plateaux Repas" &&
          item.id !== "trt-coffrets-signatures" &&
          item.id !== "trt-coffret-signature-ocean",
      },
      {
        id: "plt-signatures",
        slug: "signatures",
        name: "Les Signatures",
        shortDesc: "Coffrets VIP d'exception avec nos salades signatures prestigieuses et finitions haut de gamme.",
        image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
        categoryFilter: ["Plateaux Repas"],
        customPredicate: (item: any) =>
          item.category === "Plateaux Repas" &&
          (item.id === "trt-coffrets-signatures" || item.id === "trt-coffret-signature-ocean" || item.badge?.includes("VIP")),
      },
    ],
    faqs: [
      {
        question: "Que comprend un plateau repas YAMOOH ?",
        answer:
          "Chaque plateau comprend une entrée fraîche, un plat équilibré ou une salade généreuse, du pain artisanal, un dessert fait maison et une boisson naturelle.",
      },
      {
        question: "Comment sont conditionnés les plateaux repas ?",
        answer:
          "Nos plateaux sont livrés sous cloche individuelle recyclable avec kit couverts, serviette et rince-doigts pour un déjeuner d'affaires zéro contrainte.",
      },
      {
        question: "Quel est le minimum de commande ?",
        answer:
          "Nous livrons les plateaux repas à partir de 2 unités pour les entreprises à Douala (Akwa, Bonanjo, Bonapriso, Kotto, Bali, etc.).",
      },
    ],
  },
  {
    id: "cocktail",
    number: "04",
    slug: "cocktail-repas-debout",
    aliases: ["cocktail", "cocktails", "afterwork"],
    name: "COCKTAIL & REPAS DEBOUT",
    shortTitle: "Cocktail",
    heroTitle: "Cocktails, Bouchées Apéritives & Finger Food",
    heroDescription:
      "Mini-wraps gourmets, bouchées croustillantes, planches conviviales et verrines colorées pour réussir vos afterworks, lancements et réceptions à Douala.",
    image: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=900&q=80",
    badge: "Afterwork & Réceptions",
    color: "#D96B43",
    subRubrics: [
      {
        id: "ckt-salees",
        slug: "pieces-salees",
        name: "Les Pièces salées",
        shortDesc: "Assortiments de mini-wraps, brochettes maraîchères, bouchées au poulet et planches apéritives.",
        image: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800&q=80",
        categoryFilter: ["Cocktails"],
        customPredicate: (item: any) =>
          item.id === "trt-cocktail-pieces" ||
          item.id === "trt-planches-finger-food" ||
          item.id === "trt-degustation-exotic" ||
          item.id === "trt-plateau-mini-wraps",
      },
      {
        id: "ckt-sucrees",
        slug: "pieces-sucrees",
        name: "Les Pièces sucrées",
        shortDesc: "Verrines de mousse chocolat, mini cakes citron-gingembre et brochettes de fruits tropicaux.",
        image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=800&q=80",
        categoryFilter: ["Cocktails", "Desserts", "Petit-déjeuner"],
        customPredicate: (item: any) =>
          item.id === "trt-plateau-mini-patisseries" ||
          item.id === "pdj-cake-citron" ||
          item.id === "des-mousse-choco" ||
          item.id === "des-compotee-mangue" ||
          item.tags?.includes("Cocktail Sucré"),
      },
      {
        id: "ckt-vaisselle",
        slug: "vaisselle",
        name: "Vaisselle & Matériel",
        shortDesc: "Gobelets biodégradables, serviettes, plateaux de présentation et fontaines sur demande.",
        image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80",
        categoryFilter: ["Cocktails", "Boissons"],
        customPredicate: (item: any) =>
          item.id === "trt-vaisselle-eco-pack" ||
          item.id === "trt-fontaine-distributrice-inox" ||
          item.tags?.includes("Matériel") ||
          item.tags?.includes("Vaisselle"),
      },
    ],
    faqs: [
      {
        question: "Combien de pièces prévoir par personne pour un cocktail ?",
        answer:
          "Pour un apéritif court (1h) : 6 à 8 pièces. Pour un cocktail déjeunatoire ou dînatoire complet (2h à 3h) : 12 à 18 pièces salées et sucrées.",
      },
      {
        question: "Proposez-vous du matériel et du personnel de service ?",
        answer:
          "Oui, sur devis personnalisé, nous mettons à votre disposition serveurs qualifiés, tables de buffet, nappage, verrerie et fontaines à boissons.",
      },
    ],
  },
  {
    id: "buffet",
    number: "05",
    slug: "buffet-repas-assis",
    aliases: ["buffet", "buffets", "salades-xxl"],
    name: "BUFFET & REPAS ASSIS",
    shortTitle: "Buffet & Repas Assis",
    heroTitle: "Buffets Conviviaux & Grands Formats Partagés",
    heroDescription:
      "Formules complètes pour réceptions de 10 à 200+ personnes : grands saladiers signatures XXL, bar à sauces maison, plats chauds mijotés et pyramides de desserts.",
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=900&q=80",
    badge: "Grands Événements",
    color: "#1E3A2B",
    subRubrics: [
      {
        id: "buf-formules",
        slug: "formules",
        name: "Les Formules",
        shortDesc: "Buffet Fraîcheur Tropique et Buffet Chaud & Froid Premium clé en main.",
        image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80",
        categoryFilter: ["Buffets"],
        customPredicate: (item: any) => item.id === "trt-buffet-fraicheur" || item.id === "trt-buffet-chaud-froid",
      },
      {
        id: "buf-planches",
        slug: "planches",
        name: "Les Planches",
        shortDesc: "Grandes planches finger food généreuses garnies de dips et crudités fraîches.",
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
        categoryFilter: ["Cocktails", "Buffets"],
        customPredicate: (item: any) => item.id === "trt-planches-finger-food" || item.id.includes("planches"),
      },
      {
        id: "buf-salades-xxl",
        slug: "salades-xxl",
        name: "Les Salades XXL",
        shortDesc: "Grands bacs de nos salades signatures préparés sur mesure pour vos tablées de 15 à 50+ convives.",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
        categoryFilter: ["Buffets"],
        customPredicate: (item: any) =>
          item.id === "trt-salades-xxl" ||
          item.id === "trt-saladier-xxl-yamooh" ||
          item.id === "trt-saladier-xxl-iberique",
      },
      {
        id: "buf-desserts-xxl",
        slug: "desserts-xxl",
        name: "Les Desserts XXL",
        shortDesc: "Planches gourmandes de gâteaux tranchés, mousmes en verrines et corbeilles de fruits exotiques.",
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
        categoryFilter: ["Buffets"],
        customPredicate: (item: any) =>
          item.id === "trt-desserts-xxl" ||
          item.id === "trt-pyramide-mini-desserts",
      },
    ],
    faqs: [
      {
        question: "À partir de combien de convives peut-on réserver un buffet ?",
        answer:
          "Nos formules buffet débutent à partir de 10 personnes et peuvent être dimensionnées jusqu'à plus de 300 personnes.",
      },
      {
        question: "Comment s'organise l'installation sur place ?",
        answer:
          "Notre équipe traiteur arrive 45 minutes à 1h avant le début de votre événement pour installer le buffet, disposer les pinces de service et s'assurer de la température parfaite.",
      },
    ],
  },
  {
    id: "boissons",
    number: "06",
    slug: "boissons",
    aliases: ["jus", "drinks"],
    name: "BOISSONS",
    shortTitle: "Boissons",
    heroTitle: "Jus Naturels Maison, Fontaines à Partager & Boissons Chaudes",
    heroDescription:
      "100% fait maison à Douala sans conservateurs : Bissap mentholé, Gingembre tonique, Citronnade fraîche, fontaines 3L/5L et grands crus de café/thé d'Afrique.",
    image: "/assets/bissap-BM6B9mpW.jpg",
    badge: "100% Naturel Maison",
    color: "#8B1E3F",
    subRubrics: [
      {
        id: "bsn-individuelles",
        slug: "individuelles",
        name: "Boissons individuelles",
        shortDesc: "Bouteilles 25cl de Bissap frais, Gingembre pur, Citronnade du jour et Eau minérale 50cl.",
        image: "/assets/bissap-BM6B9mpW.jpg",
        categoryFilter: ["Boissons"],
        customPredicate: (item: any) =>
          item.id === "b-bissap-25" ||
          item.id === "b-gingembre-25" ||
          item.id === "b-citronnade-25" ||
          item.id === "b-eau-tangui-50",
      },
      {
        id: "bsn-partager",
        slug: "a-partager",
        name: "Boissons à partager",
        shortDesc: "Bouteilles verre 1L de jus naturels pour vos déjeuners d'équipe et réunions.",
        image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=800&q=80",
        categoryFilter: ["Boissons"],
        customPredicate: (item: any) => item.id === "b-bouteille-1l",
      },
      {
        id: "bsn-chaudes",
        slug: "chaudes",
        name: "Boissons chaudes",
        shortDesc: "Thermos 1L de café d'Afrique de l'Ouest et thé vert menthe fraîche.",
        image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80",
        categoryFilter: ["Boissons"],
        customPredicate: (item: any) => item.id === "b-chaudes",
      },
      {
        id: "bsn-alcoolisees",
        slug: "alcoolisees",
        name: "Boissons de réception & Alcools",
        shortDesc: "Fontaines événementielles 3L et 5L, bars à cocktails de fruits pour réceptions sur devis.",
        image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80",
        categoryFilter: ["Boissons"],
        customPredicate: (item: any) =>
          item.id === "b-fontaine-3l" ||
          item.id === "b-fontaine-5l" ||
          item.id === "b-cocktail-fruits-prestige",
      },
    ],
    faqs: [
      {
        question: "Les jus contiennent-ils des sucres ajoutés ou conservateurs ?",
        answer:
          "Non, tous nos jus (Bissap, Gingembre, Citronnade) sont pressés et infusés le jour même à base de produits frais, sans aucun additif ni conservateur.",
      },
      {
        question: "Comment sont livrées les boissons ?",
        answer:
          "Les bouteilles individuelles et carafes sont livrées dans des sacs isothermes avec des accumulateurs de froid pour une fraîcheur optimale.",
      },
    ],
  },
  {
    id: "saison",
    number: "07",
    slug: "collection-du-moment",
    aliases: ["saison", "carte-de-saison", "collection"],
    name: "COLLECTION DU MOMENT",
    shortTitle: "Collection du Moment",
    heroTitle: "La Collection de Saison YAMOOH",
    heroDescription:
      "Nos créations éphémères célébrant les récoltes locales du moment : mangues juteuses, ananas victoria parfumés et mariages floraux à l'hibiscus.",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80",
    badge: "Édition Limitée",
    color: "#F2B705",
    subRubrics: [
      {
        id: "sn-collection",
        slug: "saison",
        name: "Collection de saison",
        shortDesc: "Poké Tropical Ananas-Mangue, Fraîcheur Hibiscus, Vinaigrette passion et compotées.",
        image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
        categoryFilter: ["Salades", "Desserts", "Sauces"],
        customPredicate: (item: any) =>
          item.badge === "Exotique" ||
          item.badge === "Création Florale" ||
          item.id.includes("hibiscus") ||
          item.id.includes("passion") ||
          item.id.includes("tropical"),
      },
    ],
    faqs: [
      {
        question: "Combien de temps ces recettes restent-elles disponibles ?",
        answer:
          "Nos recettes de collection éphémère sont renouvelées tous les 2 à 3 mois selon la disponibilité des fruits et aromates sur les marchés de Douala.",
      },
    ],
  },
];

export function getUniverseBySlug(slug: string): Universe | undefined {
  if (!slug) return undefined;
  const cleanSlug = slug.toLowerCase().trim();
  return UNIVERSES.find(
    (u) =>
      u.slug === cleanSlug ||
      u.id === cleanSlug ||
      (u.aliases && u.aliases.includes(cleanSlug))
  );
}

