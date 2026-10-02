export type MenuItem = {
  id: string;
  slug: string;
  name: string;
  price: number | null; // null for "Sur devis"
  description: string;
  category: 
    | "Salades" 
    | "Sandwichs" 
    | "Plats" 
    | "Petit-déjeuner" 
    | "Brunch" 
    | "Desserts" 
    | "Boissons" 
    | "Sauces" 
    | "Plateaux Repas" 
    | "Cocktails" 
    | "Buffets";
  signature?: boolean;
  image?: string;
  badge?: string;
  slogan?: string;
  subCategory?: string;
  composition?: string[];
  allergens?: string[];
  calories?: string;
  concept?: string;
  benefits?: string[];
  dressing?: string;
  nutrition?: {
    calories: string;
    proteins: string;
    carbs: string;
    fats: string;
    fibers: string;
  };
  chefTip?: string;
  tags?: string[];
  isAvailable?: boolean;
};

export const menu: MenuItem[] = [
  // 8 Signatures réelles avec Fiches Descriptives Complètes
  {
    id: "sig-iberique",
    slug: "l-iberique",
    name: "L'Ibèrique",
    price: 4500,
    description: "Salade gourmande au jambon de dinde, parmesan affiné, tomates cerises et croûtons dorés.",
    category: "Salades",
    signature: true,
    image: "/assets/salade-iberique.jpg",
    badge: "Signature du Chef",
    slogan: "L'élégance méditerranéenne",
    concept: "Inspirée de la haute gastronomie du sud de l'Europe, L'Ibèrique combine la délicatesse du jambon de dinde sélectionné avec le caractère salé et corsé du parmesan affiné 12 mois. Une texture croquante et fondante parfaitement équilibrée.",
    benefits: [
      "Haute teneur en protéines maigres de qualité",
      "Apport naturel en calcium et phosphore",
      "Énergie saine et rassasiante sans coup de fatigue"
    ],
    composition: [
      "Jambon de dinde sélectionné",
      "Copeaux de parmesan affiné 12 mois",
      "Tomates cerises juteuses du matin",
      "Croûtons dorés croustillants",
      "Salade verte croquante et roquette",
      "Vinaigrette balsamique maison"
    ],
    dressing: "Vinaigrette balsamique artisanale à l'huile d'olive extra vierge",
    nutrition: {
      calories: "420 kcal",
      proteins: "28g",
      carbs: "22g",
      fats: "18g",
      fibers: "4g"
    },
    chefTip: "Idéale pour un déjeuner de travail dynamique : légère pour la digestion et suffisamment riche pour tenir tout l'après-midi.",
    allergens: ["Lait / Produits laitiers", "Gluten"],
    calories: "Environ 420 kcal",
    tags: ["Coup de cœur", "Protéiné", "Méditerranéen"],
    isAvailable: true
  },
  {
    id: "sig-yamooh",
    slug: "la-yamooh",
    name: "La Yamooh",
    price: 4500,
    description: "Recette emblématique de la maison : poulet grillé, avocat frais, maïs doux et notre sauce signature.",
    category: "Salades",
    signature: true,
    image: "/assets/yamooh-CkgAPjl6.jpg",
    badge: "Best-seller N°1",
    slogan: "L'incontournable de la maison",
    concept: "La création fondatrice de YAMOOH à Douala. Conçue pour offrir l'équilibre parfait entre l'onctuosité de l'avocat frais de nos terroirs, la générosité du blanc de poulet rôti minute et la texture des pâtes penne al dente.",
    benefits: [
      "Excellente recharge énergétique pour les journées intenses",
      "Acides gras mono-insaturés bénéfiques pour le cœur (Avocat frais)",
      "Index glycémique maîtrisé et digestion optimale"
    ],
    composition: [
      "Blanc de poulet mariné et grillé minute",
      "Avocat frais crémeux coupé à la commande",
      "Maïs doux croquant sélectionné",
      "Tomates cerises fraîches",
      "Pâtes penne al dente",
      "Sauce Signature Yamooh exclusive"
    ],
    dressing: "Sauce Signature Yamooh (émulsion onctueuse aux aromates secrets)",
    nutrition: {
      calories: "460 kcal",
      proteins: "32g",
      carbs: "34g",
      fats: "20g",
      fibers: "6g"
    },
    chefTip: "Notre salade la plus populaire auprès de notre clientèle fidèle à la Pharmacie Kotto.",
    allergens: ["Gluten", "Moutarde"],
    calories: "Environ 460 kcal",
    tags: ["Best-seller", "Équilibré", "Gourmand"],
    isAvailable: true
  },
  {
    id: "sig-oceanne",
    slug: "l-oceanne",
    name: "L'Océanne",
    price: 5000,
    description: "Crevettes sautées, avocat crémeux, concombre croquant et vinaigrette citron-gingembre.",
    category: "Salades",
    signature: true,
    image: "/assets/oceanne-3R_USG60.jpg",
    badge: "Fraîcheur Marine",
    slogan: "La fraîcheur vivifiante du large",
    concept: "Une symphonie iodée et rafraîchissante. Des crevettes entières snackées au citron vert associées à la fraîcheur hydratante du concombre et à la douceur de l'avocat.",
    benefits: [
      "Richesse en iode, zinc et sélénium marins",
      "Action anti-inflammatoire et stimulante du gingembre frais",
      "Profil 'Low Carb' très faible en glucides pour une silhouette affinée"
    ],
    composition: [
      "Crevettes snackées à la minute au citron vert",
      "Demi-avocat frais tranché",
      "Dés de concombre croquant",
      "Mélange de jeunes pousses maraîchères",
      "Graines de sésame torréfiées",
      "Vinaigrette maison citron & gingembre"
    ],
    dressing: "Vinaigrette citron vert pressé & gingembre frais râpé",
    nutrition: {
      calories: "380 kcal",
      proteins: "26g",
      carbs: "12g",
      fats: "16g",
      fibers: "5g"
    },
    chefTip: "Parfaite les jours de forte chaleur à Douala pour s'hydrater tout en profitant d'une source noble de protéines marines.",
    allergens: ["Crustacés", "Graines de sésame"],
    calories: "Environ 380 kcal",
    tags: ["Léger", "Sans Gluten", "Détox"],
    isAvailable: true
  },
  {
    id: "sig-atlas",
    slug: "l-atlas",
    name: "L'Atlas",
    price: 4500,
    description: "Poulet mariné aux épices douces, fêta émiettée, olives noires et oignons rouges.",
    category: "Salades",
    signature: true,
    image: "/assets/atlas-Dmt8KWOx.jpg",
    badge: "Saveurs du Soleil",
    slogan: "Un voyage d'épices et de soleil",
    concept: "Une invitation aux voyages méditerranéens et orientaux. Les épices douces et parfumées du poulet mariné rencontrent l'authenticité de la fêta grecque et l'intensité des olives noires.",
    benefits: [
      "Propriétés antioxydantes remarquables grâce aux épices et aux olives",
      "Équilibre électrolytique et hydratation cellulaire",
      "Sensation de satiété savoureuse sans excès calorique"
    ],
    composition: [
      "Poulet mariné aux 7 épices orientales",
      "Véritable Fêta grecque AOP émiettée",
      "Olives noires parfumées",
      "Concombre frais du jour",
      "Tomates mûres en dés",
      "Oignons rouges émincés",
      "Sauce yaourt aux herbes fraîches"
    ],
    dressing: "Sauce yaourt crémeuse à la menthe fraîche et fines herbes",
    nutrition: {
      calories: "410 kcal",
      proteins: "29g",
      carbs: "18g",
      fats: "17g",
      fibers: "4g"
    },
    chefTip: "Le mariage entre le poulet épicé et la sauce yaourt-menthe offre une fraîcheur immédiate en bouche.",
    allergens: ["Lait / Produits laitiers"],
    calories: "Environ 410 kcal",
    tags: ["Saveurs Épicées", "Méditerranéen", "Protéines"],
    isAvailable: true
  },
  {
    id: "sig-terroire",
    slug: "la-terroire",
    name: "La Terroire",
    price: 4500,
    description: "Bœuf séché traditionnel, œuf dur fermier, carottes râpées et vinaigrette balsamique.",
    category: "Salades",
    signature: true,
    image: "/assets/terroire-BNuswzeV.jpg",
    badge: "Authentique Terroir",
    slogan: "La force des traditions locales",
    concept: "Un hommage vibrant aux saveurs authentiques du terroir. Le bœuf séché artisanalement façon Kilichi tendre apporte une mâche unique et une puissance aromatique incomparable.",
    benefits: [
      "Concentration exceptionnelle en fer bio-disponible et en zinc",
      "Double source de protéines de haute valeur biologique (bœuf + œuf)",
      "Richesse en provitamine A (bêtacarotène) des carottes fraîches"
    ],
    composition: [
      "Bœuf séché artisanal tendre aux épices traditionnelles",
      "Œuf dur de ferme plein air",
      "Carottes fraîches râpées minute",
      "Haricots verts croquants",
      "Salade maraîchère croquante",
      "Vinaigrette balsamique artisanale"
    ],
    dressing: "Vinaigrette balsamique aux herbes aromatiques locales",
    nutrition: {
      calories: "430 kcal",
      proteins: "30g",
      carbs: "16g",
      fats: "19g",
      fibers: "6g"
    },
    chefTip: "Recommandée pour les sportifs et les personnes recherchant un repas fortifiant et revigorant.",
    allergens: ["Œufs"],
    calories: "Environ 430 kcal",
    tags: ["Riche en fer", "Tradition", "Sportif"],
    isAvailable: true
  },
  {
    id: "sig-urbaine",
    slug: "l-urbaine",
    name: "L'Urbaine",
    price: 4000,
    description: "Pâtes penne, dés d'emmental, maïs doux, tomates fraîches et sauce César onctueuse.",
    category: "Salades",
    signature: true,
    image: "/assets/urbaine-DEuWeNrX.jpg",
    badge: "Énergie & Vitalité",
    slogan: "La pause active des citadins",
    concept: "Créée spécialement pour le rythme effréné de la vie urbaine à Douala. Une salade complète, consistante et délicieuse qui apporte rapidement toute l'énergie nécessaire.",
    benefits: [
      "Apport en glucides complexes à libération progressive",
      "Excellente satiété sans lourdeur digestive",
      "Idéale pour les déjeuners express au bureau"
    ],
    composition: [
      "Pâtes penne de blé dur cuites al dente",
      "Dés d'emmental fruité",
      "Maïs doux doré",
      "Tomates fraîches concassées",
      "Croûtons croustillants aillés",
      "Sauce César artisanale onctueuse"
    ],
    dressing: "Sauce César maison crémeuse au parmesan et pointe d'ail doux",
    nutrition: {
      calories: "490 kcal",
      proteins: "22g",
      carbs: "48g",
      fats: "22g",
      fibers: "4g"
    },
    chefTip: "Un classique réconfortant qui fait l'unanimité pour les déjeuners d'équipe au bureau.",
    allergens: ["Lait / Produits laitiers", "Gluten", "Œufs"],
    calories: "Environ 490 kcal",
    tags: ["Énergie", "Pause Déjeuner", "Urbain"],
    isAvailable: true
  },
  {
    id: "sig-bistrot",
    slug: "la-bistrot",
    name: "La Bistrot",
    price: 4500,
    description: "Thon émietté de qualité, pommes de terre fondantes, haricots verts et vinaigrette maison.",
    category: "Salades",
    signature: true,
    image: "/assets/bistrot-C83KBU6s.jpg",
    badge: "Classique Gourmet",
    slogan: "La tradition bistrot revisitée",
    concept: "La grande tradition de la salade composée façon bistrot gourmand. Le thon blanc savoureux s'associe aux pommes de terre fondantes cuites à la vapeur et aux haricots verts fraîchement effilés.",
    benefits: [
      "Teneur élevée en acides gras polyinsaturés Oméga-3 (DHA/EPA)",
      "Glucides doux faciles à digérer grâce aux pommes de terre vapeur",
      "Équilibre parfait entre féculents, légumes verts et protéines"
    ],
    composition: [
      "Thon blanc au naturel sélectionné",
      "Pommes de terre vapeur fondantes",
      "Haricots verts frais du jour",
      "Tomates cerises juteuses",
      "Œuf dur de ferme",
      "Vinaigrette maison à l'échalote"
    ],
    dressing: "Vinaigrette traditionnelle à l'échalote et pointe de moutarde",
    nutrition: {
      calories: "400 kcal",
      proteins: "27g",
      carbs: "24g",
      fats: "15g",
      fibers: "5g"
    },
    chefTip: "Une recette intemporelle qui garantit une sensation de bien-être et de digestion légère.",
    allergens: ["Poisson", "Œufs"],
    calories: "Environ 400 kcal",
    tags: ["Classique", "Protéines marines", "Équilibré"],
    isAvailable: true
  },
  {
    id: "sig-caprece",
    slug: "la-caprece",
    name: "La Caprece",
    price: 4000,
    description: "Mozzarella di bufala, tomates mûres, basilic frais, huile d'olive vierge et crème balsamique.",
    category: "Salades",
    signature: true,
    image: "/assets/caprece-Ba5mao2e.jpg",
    badge: "100% Végétarienne",
    slogan: "La dolce vita en toute fraîcheur",
    concept: "La quintessence de la fraîcheur italienne. Des tranches de mozzarella di bufala fondante au lait crémeux, magnifiées par des tomates mûries à point et des feuilles de basilic cueillies du matin.",
    benefits: [
      "100% Végétarienne, ultra-fraîche et désaltérante",
      "Riche en lycopène antioxydant protecteur (tomates)",
      "Digestion facile et sensation de bien-être immédiat"
    ],
    composition: [
      "Mozzarella di bufala crémeuse",
      "Tomates fraîches juteuses",
      "Feuilles de basilic frais aromatique",
      "Lit de roquette sauvage poivrée",
      "Filet d'huile d'olive extra vierge",
      "Crème de vinaigre balsamique de Modène"
    ],
    dressing: "Réduction de crème balsamique & huile d'olive extra vierge de première pression",
    nutrition: {
      calories: "360 kcal",
      proteins: "18g",
      carbs: "14g",
      fats: "22g",
      fibers: "3g"
    },
    chefTip: "Le choix parfait pour un repas du soir léger ou pour accompagner une pause détente ensoleillée.",
    allergens: ["Lait / Produits laitiers"],
    calories: "Environ 360 kcal",
    tags: ["Végétarien", "Fraîcheur", "Italie"],
    isAvailable: true
  },

  // Salades du catalogue
  {
    id: "sal-poke-tropical",
    slug: "poke-tropical-ananas-mangue",
    name: "Poké Tropical Ananas-Mangue",
    price: 5000,
    description: "Riz parfumé, dés de mangue et ananas frais, saumon ou thon mariné, edamame et graines de courge.",
    category: "Salades",
    image: "/assets/poke-tropical-ananas-mangue.jpg",
    badge: "Exotique",
    composition: ["Riz parfumé", "Dés d'ananas frais", "Mangue mûre", "Poisson mariné", "Edamame", "Graines de courge"],
    allergens: ["Poisson", "Soja", "Sésame"],
    calories: "Environ 450 kcal",
    tags: ["Exotique", "Protéiné"],
    isAvailable: true
  },
  {
    id: "sal-fraicheur-hibiscus",
    slug: "fraicheur-hibiscus",
    name: "Fraîcheur Hibiscus",
    price: 4500,
    description: "Mélange de jeunes pousses, billes de fêta marinées à l'hibiscus, concombres, radis et vinaigrette acidulée.",
    category: "Salades",
    image: "/assets/fraicheur-hibiscus.jpg",
    badge: "Création Florale",
    composition: ["Jeunes pousses", "Billes de fêta marinées à l'hibiscus", "Concombres", "Radis croquants", "Vinaigrette acidulée"],
    allergens: ["Lait / Produits laitiers"],
    calories: "Environ 340 kcal",
    tags: ["Végétarien", "Création"],
    isAvailable: true
  },

  // Petit-déjeuner & Goûter
  {
    id: "pdj-energie",
    slug: "formule-energie-yamooh",
    name: "Formule Énergie YAMOOH",
    price: 3500,
    description: "Jus pressé maison (Bissap ou Gingembre), fromage blanc au coulis d'hibiscus, salade de fruits frais et tranche de banana bread.",
    category: "Petit-déjeuner",
    subCategory: "Formules",
    image: "/assets/formule-energie-yamooh.jpg",
    badge: "Formule Matin",
    composition: ["Jus pressé maison 25cl", "Fromage blanc & coulis hibiscus", "Salade de fruits frais", "Tranche de banana bread aux cacahuètes"],
    allergens: ["Lait / Produits laitiers", "Arachides", "Gluten"],
    calories: "Environ 480 kcal",
    tags: ["Petit-déjeuner", "Énergie"],
    isAvailable: true
  },
  {
    id: "pdj-executive",
    slug: "executive-morning",
    name: "Executive Morning",
    price: 5000,
    description: "Boisson chaude au choix, jus frais 25cl, viennoiserie artisanale, mini-sandwich gourmet dinde & fromage et fruits découpés.",
    category: "Petit-déjeuner",
    subCategory: "Formules",
    image: "/assets/executive-morning.jpg",
    badge: "Business",
    composition: ["Café ou Thé d'Afrique", "Jus de fruits frais 25cl", "Mini-sandwich gourmet", "Viennoiserie", "Fruits de saison découpés"],
    allergens: ["Gluten", "Lait / Produits laitiers"],
    tags: ["Business", "Complet"],
    isAvailable: true
  },
  {
    id: "pdj-team-break",
    slug: "team-break-10-personnes",
    name: "Team Break — 10 personnes",
    price: 30000,
    description: "Assortiment pour 10 personnes : mini cakes citron-gingembre, banana bread, brochettes de fruits frais et thermos de café / thé d'Afrique.",
    category: "Petit-déjeuner",
    subCategory: "Formules",
    image: "/assets/team-break-10-personnes.jpg",
    badge: "Pause Équipe",
    composition: ["10 portions de mini cakes & banana bread", "10 brochettes de fruits frais", "2 thermos de café/thé 1L", "Serviettes et gobelets"],
    allergens: ["Gluten", "Arachides", "Œufs"],
    tags: ["Entreprise", "Pause Café"],
    isAvailable: true
  },
  {
    id: "pdj-banana-bread",
    slug: "banana-bread-cacahuetes",
    name: "Banana Bread aux Cacahuètes",
    price: 1500,
    description: "Moelleux à la banane mûre et éclats de cacahuètes grillées du Cameroun.",
    category: "Petit-déjeuner",
    subCategory: "À la carte",
    image: "/assets/banana-bread-cacahuetes.jpg",
    composition: ["Bananes mûres locales", "Farine de blé", "Cacahuètes grillées", "Sucre roux", "Œufs fermiers"],
    allergens: ["Gluten", "Arachides", "Œufs"],
    tags: ["Gourmand", "Goûter"],
    isAvailable: true
  },
  {
    id: "pdj-cake-citron",
    slug: "cake-citron-gingembre",
    name: "Cake Citron-Gingembre",
    price: 1500,
    description: "Cake moelleux parfumé aux zestes de citrons verts et pointe de gingembre frais.",
    category: "Petit-déjeuner",
    subCategory: "À la carte",
    image: "/assets/cake-citron-gingembre.jpg",
    composition: ["Citrons verts du pays", "Gingembre frais râpé", "Farine de blé", "Beurre", "Œufs"],
    allergens: ["Gluten", "Lait / Produits laitiers", "Œufs"],
    tags: ["Zesté", "Gourmand"],
    isAvailable: true
  },
  {
    id: "pdj-fruits-exotiques",
    slug: "salade-fruits-exotiques",
    name: "Salade de Fruits Exotiques",
    price: 2000,
    description: "Ananas Victoria, mangue, papaye et pastèque fraîchement découpés.",
    category: "Petit-déjeuner",
    subCategory: "À la carte",
    image: "/assets/salade-fruits-exotiques.jpg",
    composition: ["Ananas Victoria", "Mangue mûre", "Papaye douce", "Pastèque", "Feuilles de menthe"],
    allergens: [],
    calories: "Environ 110 kcal",
    tags: ["100% Végétal", "Sans Gluten"],
    isAvailable: true
  },
  {
    id: "pdj-fromage-blanc-hibiscus",
    slug: "fromage-blanc-coulis-hibiscus",
    name: "Fromage Blanc & Coulis Hibiscus",
    price: 2000,
    description: "Fromage blanc onctueux nappé de réduction de fleurs d'hibiscus (bissap) et graines de chia.",
    category: "Petit-déjeuner",
    subCategory: "À la carte",
    image: "/assets/fromage-blanc-coulis-hibiscus.jpg",
    composition: ["Fromage blanc onctueux", "Coulis de bissap maison", "Graines de chia"],
    allergens: ["Lait / Produits laitiers"],
    tags: ["Léger", "Protéiné"],
    isAvailable: true
  },

  // Brunch
  {
    id: "brunch-signature",
    slug: "brunch-yammoh-signature",
    name: "Brunch YAMMOH Signature",
    price: 7500,
    description: "Grande assiette complète : œuf poché, avocat écrasé, lamelles de poulet braisé ou saumon, salade fraîche, pancakes légers, jus frais et boisson chaude.",
    category: "Brunch",
    image: "/assets/brunch-yammoh-signature.jpg",
    badge: "Complet Gourmand",
    composition: ["Œuf poché fermier", "Avocat écrasé assaisonné", "Poulet braisé ou poisson", "Salade verte & tomates cerises", "Pancakes maison", "Jus frais 25cl", "Boisson chaude"],
    allergens: ["Œufs", "Gluten", "Lait / Produits laitiers"],
    tags: ["Brunch", "Complet"],
    isAvailable: true
  },
  {
    id: "brunch-veggie",
    slug: "brunch-veggie-vitalite",
    name: "Brunch Veggie Vitalité",
    price: 6500,
    description: "Assiette végétale riche en énergie : toast à l'avocat et hummus maison, galette de patate douce, salade de pousses croquantes, fruits découpés et jus pressé.",
    category: "Brunch",
    image: "/assets/brunch-veggie-vitalite.jpg",
    badge: "100% Végétarien",
    composition: ["Toast avocat & hummus", "Galette de patate douce", "Salade croquante", "Fruits frais découpés", "Jus pressé maison"],
    allergens: ["Gluten", "Sésame"],
    tags: ["Végétarien", "Énergie"],
    isAvailable: true
  },

  // Sandwichs & Wraps
  {
    id: "sw-wrap-poulet",
    slug: "wrap-poulet-epice-avocat",
    name: "Wrap Poulet Épicé & Avocat",
    price: 3000,
    description: "Tortilla de blé, émincé de poulet grillé aux épices locales, avocat crémeux, salade croquante et sauce yaourt-citron.",
    category: "Sandwichs",
    image: "/assets/wrap-poulet-epice-avocat.jpg",
    composition: ["Tortilla de blé", "Émincé de poulet aux épices", "Avocat crémeux", "Salade croquante", "Sauce yaourt-citron"],
    allergens: ["Gluten", "Lait / Produits laitiers"],
    calories: "Environ 440 kcal",
    tags: ["Sur le pouce", "Épicé"],
    isAvailable: true
  },
  {
    id: "sw-wrap-veggie",
    slug: "wrap-veggie-hummus-lentilles",
    name: "Wrap Veggie Hummus & Lentilles",
    price: 2800,
    description: "Galette de blé roulée, hummus maison onctueux, lentilles assaisonnées, carottes râpées et jeunes pousses.",
    category: "Sandwichs",
    image: "/assets/wrap-veggie-hummus-lentilles.jpg",
    badge: "Vegan",
    composition: ["Galette de blé", "Hummus maison", "Lentilles cuisinées", "Carottes râpées", "Jeunes pousses"],
    allergens: ["Gluten", "Sésame"],
    calories: "Environ 370 kcal",
    tags: ["Vegan", "Fibres"],
    isAvailable: true
  },
  {
    id: "sw-baguette-poulet",
    slug: "baguette-poulet-cacahuetes",
    name: "Baguette Poulet & Cacahuètes",
    price: 3000,
    description: "Pain baguette artisanal croustillant, effiloché de poulet fermier, sauce crémeuse aux cacahuètes grillées et crudités.",
    category: "Sandwichs",
    image: "/assets/baguette-poulet-cacahuetes.jpg",
    composition: ["Pain baguette artisanal", "Effiloché de poulet", "Sauce onctueuse aux cacahuètes", "Concombres & tomates fraîches"],
    allergens: ["Gluten", "Arachides"],
    calories: "Environ 510 kcal",
    tags: ["Gourmand", "Protéiné"],
    isAvailable: true
  },

  // Plats chauds & Bowls
  {
    id: "plt-poulet-braise",
    slug: "poulet-braise-rice-bowl",
    name: "Poulet Braisé & Rice Bowl",
    price: 4500,
    description: "Cuisse de poulet braisée aux épices douces, riz parfumé, bananes plantains mûres et petite salade de crudités.",
    category: "Plats",
    image: "/assets/poulet-braise-rice-bowl.jpg",
    composition: ["Poulet braisé façon maison", "Riz blanc parfumé", "Plantains mûrs dorés", "Crudités & vinaigrette"],
    allergens: [],
    calories: "Environ 580 kcal",
    tags: ["Plat Chaud", "Saveurs Locales"],
    isAvailable: true
  },
  {
    id: "plt-wok-veggie",
    slug: "wok-vegetarien",
    name: "Wok Végétarien",
    price: 4000,
    description: "Nouilles sautées au wok avec julienne de légumes croquants, tofu mariné, graines de sésame et sauce soja douce.",
    category: "Plats",
    image: "/assets/wok-vegetarien.jpg",
    badge: "Vegan",
    composition: ["Nouilles de blé", "Carottes, poivrons, courgettes", "Tofu mariné", "Graines de sésame", "Sauce soja douce"],
    allergens: ["Gluten", "Soja", "Sésame"],
    calories: "Environ 420 kcal",
    tags: ["Vegan", "Plat Chaud"],
    isAvailable: true
  },
  {
    id: "plt-poisson-patates",
    slug: "filet-de-poisson-patates-douces",
    name: "Filet de Poisson & Patates Douces",
    price: 5500,
    description: "Filet de poisson blanc du Littoral poêlé aux herbes fraîches, purée de patates douces maison et légumes glacés.",
    category: "Plats",
    image: "/assets/filet-de-poisson-patates-douces.jpg",
    composition: ["Filet de poisson blanc frais", "Purée de patates douces", "Légumes de saison sautés", "Sauce citronnée aux herbes"],
    allergens: ["Poisson"],
    calories: "Environ 460 kcal",
    tags: ["Poisson Frais", "Sans Gluten"],
    isAvailable: true
  },

  // Desserts
  {
    id: "des-salade-tropiques",
    slug: "salade-de-fruits-tropiques",
    name: "Salade de fruits tropiques",
    price: 2000,
    description: "Morceaux d'ananas Victoria, mangue du pays, papaye et menthe ciselée.",
    category: "Desserts",
    image: "/assets/salade-de-fruits-tropiques.jpg",
    composition: ["Ananas Victoria", "Mangue", "Papaye", "Menthe fraîche"],
    allergens: [],
    calories: "Environ 110 kcal",
    tags: ["Frais", "Léger"],
    isAvailable: true
  },
  {
    id: "des-fromage-hibiscus",
    slug: "fromage-blanc-hibiscus",
    name: "Fromage blanc hibiscus",
    price: 2200,
    description: "Fromage blanc battu, réduction de bissap maison et granola croustillant aux graines.",
    category: "Desserts",
    image: "/assets/fromage-blanc-hibiscus-dessert.jpg",
    composition: ["Fromage blanc doux", "Réduction de fleurs d'hibiscus", "Granola maison"],
    allergens: ["Lait / Produits laitiers", "Gluten"],
    tags: ["Dessert Doux"],
    isAvailable: true
  },
  {
    id: "des-mousse-choco",
    slug: "mousse-chocolat-cacahuetes",
    name: "Mousse chocolat/cacahuètes",
    price: 2500,
    description: "Mousse aérienne au cacao pur, pointe de fleur de sel et éclats de cacahuètes torréfiées.",
    category: "Desserts",
    image: "/assets/mousse-chocolat-cacahuetes.jpg",
    composition: ["Chocolat noir pur", "Blancs d'œufs", "Cacahuètes torréfiées concassées", "Fleur de sel"],
    allergens: ["Œufs", "Arachides"],
    tags: ["Gourmandise", "Chocolat"],
    isAvailable: true
  },
  {
    id: "des-compotee-mangue",
    slug: "compotee-mangue-passion",
    name: "Compotée mangue-passion",
    price: 2200,
    description: "Douceur de mangues caramélisées parfumée au jus de fruit de la passion frais.",
    category: "Desserts",
    image: "/assets/compotee-mangue-passion.jpg",
    composition: ["Mangues mûres du terroir", "Fruit de la passion frais", "Sucre de canne"],
    allergens: [],
    tags: ["Fruitée", "Sans Gluten"],
    isAvailable: true
  },

  // Boissons
  {
    id: "b-bissap-25",
    slug: "jus-de-bissap-25cl",
    name: "Jus de Bissap Maison (25cl)",
    price: 600,
    description: "Fleurs d'hibiscus infusées avec menthe fraîche et touche de vanille naturelle.",
    category: "Boissons",
    image: "/assets/bissap-BM6B9mpW.jpg",
    composition: ["Fleurs d'hibiscus (bissap)", "Feuilles de menthe", "Eau filtrée", "Sucre de canne", "Extrait de vanille"],
    allergens: [],
    tags: ["Boisson Maison", "25 cl"],
    isAvailable: true
  },
  {
    id: "b-gingembre-25",
    slug: "jus-de-gingembre-25cl",
    name: "Jus de Gingembre Pur (25cl)",
    price: 600,
    description: "Gingembre frais pressé avec citron vert et ananas doux.",
    category: "Boissons",
    image: "/assets/jus-gingembre-CH3Giy47.jpg",
    composition: ["Gingembre frais du Cameroun", "Citron vert", "Ananas", "Eau filtrée"],
    allergens: [],
    tags: ["Tonique", "25 cl"],
    isAvailable: true
  },
  {
    id: "b-citronnade-25",
    slug: "citronnade-fraiche-25cl",
    name: "Citronnade Fraîche (25cl)",
    price: 600,
    description: "Citrons pressés du jour avec eau minérale et légère touche de sucre de canne.",
    category: "Boissons",
    image: "/assets/citronnade-BGlYWEWk.jpg",
    composition: ["Jus de citrons pressés", "Eau minérale", "Sucre de canne", "Zestes de citron"],
    allergens: [],
    tags: ["Désaltérant", "25 cl"],
    isAvailable: true
  },
  {
    id: "b-bouteille-1l",
    slug: "bouteille-jus-naturel-1l",
    name: "Bouteilles 1 L (Bissap, Gingembre ou Citronnade)",
    price: 2000,
    description: "Bissap, Gingembre ou Citronnade en bouteille verre 1L prête à servir pour vos tablées et déjeuners.",
    category: "Boissons",
    image: "/assets/eau-xhvsURFf.jpg",
    composition: ["Jus naturel pressé ou infusé au choix"],
    allergens: [],
    tags: ["Format Partage", "1 L"],
    isAvailable: true
  },
  {
    id: "b-fontaine-3l",
    slug: "fontaine-a-jus-frais-3l",
    name: "Fontaines 3 L à Jus Frais",
    price: 6000,
    description: "Fontaine distributrice avec robinet pour réunions, anniversaires et réceptions (serves ~12-15 verres).",
    category: "Boissons",
    image: "/assets/jus-fruit-ZSiyxNq1.jpg",
    composition: ["Jus naturel au choix en bonbonne distributrice"],
    allergens: [],
    tags: ["Événementiel", "Fontaine 3L"],
    isAvailable: true
  },
  {
    id: "b-fontaine-5l",
    slug: "fontaine-a-jus-frais-5l",
    name: "Fontaines 5 L à Jus Frais",
    price: 9500,
    description: "Grand format événementiel pour buffets, séminaires et mariages (serves ~20-25 verres).",
    category: "Boissons",
    image: "/assets/jus-fruit-ZSiyxNq1.jpg",
    composition: ["Jus naturel au choix en grande fontaine distributrice"],
    allergens: [],
    tags: ["Événementiel", "Fontaine 5L"],
    isAvailable: true
  },
  {
    id: "b-chaudes",
    slug: "boissons-chaudes-thermos",
    name: "Boissons Chaudes (Café & Thés d'Afrique)",
    price: 3500,
    description: "Café grand cru d'Afrique de l'Ouest ou thé vert menthe fraîche servi en thermos de 1 Litre.",
    category: "Boissons",
    image: "/assets/jus-gingembre-CH3Giy47.jpg",
    composition: ["Café moulu sélectionné ou feuilles de thé vert et menthe fraîche"],
    allergens: [],
    tags: ["Boisson Chaude", "Thermos 1L"],
    isAvailable: true
  },

  // Sauces artisanales maison
  {
    id: "sc-yamooh",
    slug: "sauce-signature-yamooh-flacon",
    name: "Sauce Signature Yamooh (Flacon 100ml)",
    price: 1000,
    description: "La sauce emblématique aux herbes et épices douces pour sublimer toutes vos salades à domicile.",
    category: "Sauces",
    image: "/assets/sauce-vinaigrette-CYsf44KD.jpg",
    composition: ["Huile végétale", "Herbes aromatiques", "Épices douces de la maison", "Moutarde douce", "Vinaigre de cidre"],
    allergens: ["Moutarde"],
    tags: ["Maison", "Flacon 100ml"],
    isAvailable: true
  },
  {
    id: "sc-passion",
    slug: "vinaigrette-fruit-de-la-passion-flacon",
    name: "Vinaigrette Fruit de la Passion (Flacon 100ml)",
    price: 1000,
    description: "Pulpe fraîche de fruits de la passion du Cameroun et huile d'olive vierge.",
    category: "Sauces",
    image: "/assets/sauce-passion-C8y8wEXP.jpg",
    composition: ["Pulpe de fruit de la passion fraîche", "Huile d'olive extra vierge", "Échalotes hachées", "Sel & poivre blanc"],
    allergens: [],
    tags: ["Fruité", "Sans Gluten"],
    isAvailable: true
  },
  {
    id: "sc-cesar",
    slug: "sauce-cesar-onctueuse-flacon",
    name: "Sauce César Onctueuse (Flacon 100ml)",
    price: 1000,
    description: "Sauce crémeuse au parmesan et pointe d'ail doux.",
    category: "Sauces",
    image: "/assets/sauce-cesar-DxzAeutG.jpg",
    composition: ["Parmesan affiné", "Crème légère", "Ail doux", "Jus de citron", "Huile de tournesol"],
    allergens: ["Lait / Produits laitiers", "Œufs"],
    tags: ["Onctueux"],
    isAvailable: true
  },

  // Plateaux repas
  {
    id: "trt-coffret-essentiel-1",
    slug: "coffret-essentiel-1",
    name: "Coffret Essentiel 1",
    price: 5500,
    description: "Salade fraîche composée du jour, petit pain artisanal, portion de fruits frais découpés et bouteille d'eau minérale 50cl.",
    category: "Plateaux Repas",
    image: "/assets/coffret-essentiel-1.jpg",
    badge: "Coffret B2B",
    composition: ["Salade composée fraîche", "Pain individuel artisanal", "Fruits frais du jour", "Eau minérale 50cl"],
    allergens: ["Gluten"],
    tags: ["Plateau Repas", "Réunion"],
    isAvailable: true
  },
  {
    id: "trt-coffret-essentiel-2",
    slug: "coffret-essentiel-2",
    name: "Coffret Essentiel 2",
    price: 6500,
    description: "Salade au choix (L'Urbaine ou La Caprece), petit pain, jus de fruits frais maison 25cl et dessert gourmand au choix.",
    category: "Plateaux Repas",
    image: "/assets/coffret-essentiel-2.jpg",
    badge: "Coffret B2B",
    composition: ["Salade au choix", "Pain artisanal", "Jus frais maison 25cl", "Dessert du jour (cake ou fromage blanc)"],
    allergens: ["Gluten", "Lait / Produits laitiers"],
    tags: ["Plateau Repas", "Équilibré"],
    isAvailable: true
  },
  {
    id: "trt-coffret-essentiel-3",
    slug: "coffret-essentiel-3",
    name: "Coffret Essentiel 3",
    price: 7500,
    description: "Plat complet (Poulet braisé & rice bowl ou Filet de poisson), salade d'accompagnement, jus frais 25cl et dessert maison.",
    category: "Plateaux Repas",
    image: "/assets/coffret-essentiel-3.jpg",
    badge: "Coffret Chaud",
    composition: ["Plat cuisiné chaud", "Petite salade d'accompagnement", "Jus maison 25cl", "Dessert maison"],
    allergens: ["Poisson (selon option)"],
    tags: ["Plateau Repas", "Plat Chaud"],
    isAvailable: true
  },
  // Formules Petit-Déjeuner
  {
    id: "pdj-formule-continentale",
    slug: "formule-matinale-continentale",
    name: "Formule Matinale Continentale",
    price: 3500,
    description: "Croissant pur beurre, pain artisanal, confiture locale, jus naturel 25cl et café d'Afrique en thermos individuel.",
    category: "Petit-déjeuner",
    subCategory: "Formules",
    image: "/assets/formule-matinale-continentale.jpg",
    badge: "Formule Matin",
    composition: ["Croissant artisanal pur beurre", "Pain frais du jour", "Confiture locale maison", "Jus frais 25cl au choix", "Café ou thé d'Afrique"],
    allergens: ["Gluten", "Lait / Produits laitiers", "Œufs"],
    tags: ["Petit-Déjeuner", "Formule Matin"],
    isAvailable: true
  },
  {
    id: "pdj-formule-equipe",
    slug: "formule-equipe-douala",
    name: "Formule Équipe Douala (Pour 5-10 pers)",
    price: 18000,
    description: "Assortiment de 10 viennoiseries, corbeille de fruits frais découpés, carafe 1L de jus naturel et thermos 1L de café.",
    category: "Petit-déjeuner",
    subCategory: "Formules",
    image: "/assets/formule-equipe-douala.jpg",
    badge: "Pour Équipes & Réunions",
    composition: ["10 Mini-viennoiseries & gâteaux", "Grande salade de fruits frais", "Bouteille 1L de Bissap ou Gingembre", "Thermos 1L de Café Grand Cru"],
    allergens: ["Gluten", "Lait / Produits laitiers", "Œufs"],
    tags: ["Pour Équipes", "Réunion B2B"],
    isAvailable: true
  },
  {
    id: "pdj-formule-vitalite",
    slug: "formule-petit-dej-vitalite",
    name: "Formule Petit-Déj Vitalité & Bien-Être",
    price: 4500,
    description: "Fromage blanc au coulis d'hibiscus, salade de fruits exotiques, tartines avocat-chia et jus vert détox pressé.",
    category: "Petit-déjeuner",
    subCategory: "Formules",
    image: "/assets/formule-petit-dej-vitalite.jpg",
    badge: "Healthy & Énergie",
    composition: ["Fromage blanc & coulis d'hibiscus", "Salade de fruits frais", "Tartine avocat graines de chia", "Jus détox 25cl"],
    allergens: ["Lait / Produits laitiers", "Gluten"],
    tags: ["Healthy", "Vitalité"],
    isAvailable: true
  },

  // Brunch Additionnel
  {
    id: "brunch-oceane",
    slug: "brunch-oceane-saumon-avocat",
    name: "Brunch Océane & Saveurs Marines",
    price: 8500,
    description: "Grande assiette marine : crevettes snackées au citron vert, demi-avocat crémeux, œufs pochés, blinis tièdes, jus frais et thé vert menthe.",
    category: "Brunch",
    image: "/assets/brunch-oceane-marines.jpg",
    badge: "Prestige Marin",
    composition: ["Crevettes snackées", "Demi-avocat tranché", "Œufs pochés fermiers", "Blinis tièdes maison", "Jus frais 25cl", "Thé vert menthe 1L"],
    allergens: ["Crustacés", "Œufs", "Gluten", "Lait / Produits laitiers"],
    tags: ["Brunch", "Marin", "Prestige"],
    isAvailable: true
  },

  // Sandwichs additionnels
  {
    id: "sw-club-thon",
    slug: "club-sandwich-thon-avocat",
    name: "Club Sandwich Thon & Avocat",
    price: 3200,
    description: "Pain de mie complet grillé, thon naturel assaisonné, avocat crémeux, tomates fraîches, œuf dur et mayonnaise légère aux herbes.",
    category: "Sandwichs",
    image: "/assets/club-sandwich-thon-avocat.jpg",
    badge: "Classique Frais",
    composition: ["Pain de mie complet", "Thon émietté assaisonné", "Avocat frais", "Œuf dur fermier", "Tomates cerises", "Mayonnaise légère aux herbes"],
    allergens: ["Poisson", "Gluten", "Œufs", "Moutarde"],
    calories: "Environ 460 kcal",
    tags: ["Club Sandwich", "Protéiné"],
    isAvailable: true
  },

  // Plats chauds additionnels
  {
    id: "plt-boeuf-saute",
    slug: "plat-chaud-boeuf-saute-legumes",
    name: "Bœuf Sauté aux Légumes & Pâtes Sautées",
    price: 5000,
    description: "Émincé de bœuf mariné sauté au wok avec poivrons croquants, oignons rouges, carottes et nouilles aux épices douces.",
    category: "Plats",
    image: "/assets/plat-chaud-boeuf-saute-legumes.jpg",
    composition: ["Émincé de bœuf sélectionné", "Légumes croquants au wok", "Pâtes sautées", "Sauce soja & herbes"],
    allergens: ["Gluten", "Soja"],
    calories: "Environ 540 kcal",
    tags: ["Plat Chaud", "Bœuf Gourmet"],
    isAvailable: true
  },

  // Desserts additionnels
  {
    id: "des-cheesecake-ananas",
    slug: "cheesecake-exotique-ananas-roti",
    name: "Cheesecake Exotique à l'Ananas Rôti",
    price: 2500,
    description: "Biscuit sablé croustillant, crème cheesecake onctueuse parfumée au zeste de citron vert et compotée d'ananas Victoria rôti.",
    category: "Desserts",
    image: "/assets/cheesecake-exotique-ananas-roti.jpg",
    composition: ["Crème cheesecake", "Ananas rôti à la vanille", "Sablé au beurre", "Zestes de combava"],
    allergens: ["Lait / Produits laitiers", "Gluten", "Œufs"],
    tags: ["Gourmandise", "Exotique"],
    isAvailable: true
  },

  // Plateaux Repas Additionnels
  {
    id: "trt-coffret-signature-ocean",
    slug: "coffret-signature-ocean-crevettes",
    name: "Coffret Signature Océan & Crevettes",
    price: 9000,
    description: "Plateau d'affaires d'exception : grande salade L'Océanne aux crevettes fraîches, pain artisanal, bouteille 25cl de jus de fruits frais et cheesecake exotique.",
    category: "Plateaux Repas",
    image: "/assets/coffret-signature-ocean-crevettes.jpg",
    badge: "Coffret VIP Mer",
    composition: ["Salade L'Océanne complète", "Pain artisanal frais", "Jus frais maison 25cl", "Dessert raffiné au choix"],
    allergens: ["Crustacés", "Gluten", "Lait / Produits laitiers"],
    tags: ["VIP", "Prestige", "Plateau Repas"],
    isAvailable: true
  },

  // Cocktails & Réceptions additionnels
  {
    id: "trt-plateau-mini-wraps",
    slug: "plateau-24-mini-wraps-gourmets",
    name: "Plateau 24 Mini-Wraps Gourmets",
    price: 14000,
    description: "24 mini-wraps roulés : 8 au poulet épicé & avocat, 8 au thon frais & crudités, 8 végétariens au hummus maison et graines de courge.",
    category: "Cocktails",
    image: "/assets/wrap-mexicain-B3n0KXUL.jpg",
    badge: "Best-seller Cocktail",
    composition: ["8 Mini-wraps poulet", "8 Mini-wraps thon", "8 Mini-wraps veggie hummus"],
    allergens: ["Gluten", "Lait / Produits laitiers", "Poisson", "Sésame"],
    tags: ["Cocktail Salé", "Finger Food", "24 pièces"],
    isAvailable: true
  },
  {
    id: "trt-plateau-mini-patisseries",
    slug: "plateau-24-mini-patisseries-sucrees",
    name: "Plateau 24 Mini-Pâtisseries & Douceurs",
    price: 13500,
    description: "Assortiment de 24 mignardises sucrées pour cocktail : mini-cakes citron-gingembre tranchés, verrines chocolat-cacahuètes et brochettes de fruits frais.",
    category: "Cocktails",
    image: "/assets/jus-fruit-ZSiyxNq1.jpg",
    badge: "Cocktail Sucré",
    composition: ["8 Mini-cakes citron-gingembre", "8 Verrines mousse chocolat", "8 Brochettes fruits frais"],
    allergens: ["Gluten", "Lait / Produits laitiers", "Œufs", "Arachides"],
    tags: ["Cocktail Sucré", "Mignardises", "24 pièces"],
    isAvailable: true
  },
  {
    id: "trt-vaisselle-eco-pack",
    slug: "pack-vaisselle-eco-responsable-10p",
    name: "Pack Vaisselle Éco-Responsable (10 pers)",
    price: 4500,
    description: "Ensemble complet 10 personnes : 10 assiettes en feuille de palmier ou bambou, 10 sets de couverts en bois naturel, 10 gobelets recyclables et serviettes en papier kraft.",
    category: "Cocktails",
    image: "/assets/hero-salad-DenX4nTx.jpg",
    badge: "Éco-Conçu",
    composition: ["10 Assiettes bambou/palmier", "10 Kits couverts bois", "10 Gobelets kraft 25cl", "20 Serviettes"],
    allergens: [],
    tags: ["Matériel", "Vaisselle"],
    isAvailable: true
  },
  {
    id: "trt-fontaine-distributrice-inox",
    slug: "fontaine-distributrice-inox-5l",
    name: "Location Fontaine Distributrice 5L",
    price: 3000,
    description: "Fontaine professionnelle en verre ou inox avec robinet anti-goutte, idéale pour buffets et réceptions en libre-service.",
    category: "Cocktails",
    image: "/assets/citronnade-BGlYWEWk.jpg",
    badge: "Matériel Événement",
    composition: ["Fontaine 5L nettoyée et stérilisée", "Robinet intégré", "Support surélevé"],
    allergens: [],
    tags: ["Matériel", "Fontaine"],
    isAvailable: true
  },

  // Buffets additionnels
  {
    id: "trt-saladier-xxl-yamooh",
    slug: "grand-saladier-xxl-signature-yamooh",
    name: "Grand Saladier XXL La Yamooh (15-20 pers)",
    price: 35000,
    description: "Le grand saladier signature préparé dans un plat de présentation traiteur avec 2 bouteilles de sauce YAMOOH et pinces de service incluses.",
    category: "Buffets",
    image: "/assets/salade-classic-B-4lDVb2.jpg",
    badge: "Format XXL Traiteur",
    composition: ["Salade verte & penne al dente", "Blanc de poulet grillé", "Avocat frais généreux", "Maïs doux & tomates cerises", "2 Carafes de sauce signature Yamooh"],
    allergens: ["Gluten", "Moutarde"],
    tags: ["Salade XXL", "Buffet", "15-20 personnes"],
    isAvailable: true
  },
  {
    id: "trt-saladier-xxl-iberique",
    slug: "grand-saladier-xxl-iberique",
    name: "Grand Saladier XXL L'Ibèrique (15-20 pers)",
    price: 35000,
    description: "Grand format de notre salade L'Ibèrique avec jambon de dinde, copeaux de parmesan affiné 12 mois, croûtons dorés et carafes de vinaigrette balsamique.",
    category: "Buffets",
    image: "/assets/salade-poulet-YAtUAFQQ.jpg",
    badge: "Format XXL Traiteur",
    composition: ["Salade verte & roquette", "Jambon de dinde sélectionné", "Parmesan affiné", "Croûtons croustillants", "2 Carafes de vinaigrette balsamique"],
    allergens: ["Gluten", "Lait / Produits laitiers"],
    tags: ["Salade XXL", "Buffet", "15-20 personnes"],
    isAvailable: true
  },
  {
    id: "trt-pyramide-mini-desserts",
    slug: "pyramide-gourmande-mini-desserts-30p",
    name: "Pyramide Gourmande Mini-Desserts (30 pièces)",
    price: 22000,
    description: "Présentoir spectaculaire de 30 desserts individuels : 10 verrines mousse chocolat, 10 compotées mangue-passion et 10 mini-cakes citron tranchés.",
    category: "Buffets",
    image: "/assets/hero-salad-DenX4nTx.jpg",
    badge: "Dessert XXL Partagé",
    composition: ["10 Verrines chocolat", "10 Verrines mangue-passion", "10 Tranches de cake citron-gingembre"],
    allergens: ["Gluten", "Lait / Produits laitiers", "Œufs", "Arachides"],
    tags: ["Desserts XXL", "Buffet", "30 pièces"],
    isAvailable: true
  },

  // Boissons additionnelles
  {
    id: "b-eau-tangui-50",
    slug: "eau-minerale-tangui-50cl",
    name: "Eau Minérale Tangui (50cl)",
    price: 500,
    description: "Bouteille individuelle d'eau minérale naturelle fraîche Tangui 50cl.",
    category: "Boissons",
    image: "/assets/eau-xhvsURFf.jpg",
    composition: ["Eau minérale naturelle 50cl"],
    allergens: [],
    tags: ["Eau Minérale", "50 cl"],
    isAvailable: true
  },
  {
    id: "b-cocktail-fruits-prestige",
    slug: "selection-cocktails-fruits-evenements",
    name: "Bar à Cocktails de Fruits Événementiel (Sur devis)",
    price: null, // Sur devis
    description: "Service de bar à cocktails de fruits frais pressés minute et mocktails floraux à l'hibiscus pour vos soirées, mariages et lancements à Douala.",
    category: "Boissons",
    image: "/assets/citronnade-BGlYWEWk.jpg",
    badge: "Animation Bar",
    composition: ["Barman dédié", "Fruits frais du jour", "Verrerie cocktail", "Glaçons & pailles écologiques"],
    allergens: [],
    tags: ["Sur Devis", "Cocktail", "Événementiel"],
    isAvailable: true
  }
];

export function getMenuItemBySlug(slug: string): MenuItem | undefined {
  return menu.find((item) => item.slug === slug || item.id === slug);
}

export function getSimilarMenuItems(item: MenuItem, limit: number = 3): MenuItem[] {
  return menu
    .filter((i) => i.id !== item.id && (i.category === item.category || i.signature === item.signature))
    .slice(0, limit);
}
