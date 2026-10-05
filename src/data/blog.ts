export type BlogPost = {
  slug: string;
  title: string;
  category: "ACTUALITÉS" | "CONSEILS & ASTUCES" | "RECETTES & INSPIRATIONS" | "ÉVÉNEMENTS" | "COULISSES YAMMOH" | "TERROIR & SAVEURS";
  excerpt: string;
  date: string;
  readTime: string;
  imageAlt: string;
  image: string;
  content: {
    intro: string;
    sections: { heading: string; body: string }[];
    conclusion: string;
  };
};

export const blogPosts: BlogPost[] = [
  {
    slug: "composer-salade-equilibree-douala",
    title: "Comment composer une salade parfaitement équilibrée à Douala ?",
    category: "CONSEILS & ASTUCES",
    excerpt: "Découvrez les principes clés pour marier féculents, légumes croquants, protéines locales et vinaigrettes saines dans votre bol quotidien.",
    date: "14 Septembre 2026",
    readTime: "4 min",
    imageAlt: "Salade composée gastronomique YAMMOH avec légumes frais et protéines à Douala",
    image: "/assets/salade-iberique.jpg",
    content: {
      intro: "Manger équilibré à Douala ne rime pas avec privation. Avec la richesse des marchés locaux maraîchers, composer un bol sain et gourmand est une question de méthode et de proportions harmonieuses.",
      sections: [
        {
          heading: "1. La base : l'énergie durable",
          body: "Une bonne salade commence par une base solide. Alternez entre des jeunes pousses de salade verte pour la légèreté et des pâtes penne al dente ou du riz parfumé pour apporter de l'énergie tout au long de votre journée active."
        },
        {
          heading: "2. Les protéines : force et satiété",
          body: "Intégrez des protéines de qualité : blanc de poulet mariné aux herbes, thon naturel ou encore crevettes snackées du Littoral. Pour les végétariens, l'association d'œufs durs fermiers et de fêta offre un profil d'acides aminés optimal."
        },
        {
          heading: "3. La vinaigrette : le liant aromatique sans excès",
          body: "Privilégiez les sauces élaborées à base d'huile végétale de qualité et d'ingrédients naturels comme la pulpe de fruit de la passion fraîche ou le jus de citron vert pressé plutôt que les sauces industrielles chargées de conservateurs."
        }
      ],
      conclusion: "En appliquant cette règle des 3 tiers (base + protéines + légumes variés), votre repas reste digeste, stimulant et plein de vitalité."
    }
  },
  {
    slug: "solutions-repas-seminaires-entreprises",
    title: "Organiser la restauration d'un séminaire d'entreprise : les clés du succès",
    category: "ÉVÉNEMENTS",
    excerpt: "Plateaux repas individuels ou buffet partagé ? Guide pratique pour réussir vos pauses déjeuners professionnelles à Douala.",
    date: "08 Septembre 2026",
    readTime: "5 min",
    imageAlt: "Buffet traiteur haute gastronomie pour événement d'entreprise à Douala",
    image: "/assets/formule-buffet.jpg",
    content: {
      intro: "Le déjeuner lors d'un séminaire d'entreprise ou d'une réunion stratégique à Douala joue un rôle clé dans le dynamisme des participants et la ponctualité de votre agenda.",
      sections: [
        {
          heading: "Opter pour le format adapté à votre timing",
          body: "Si votre session de travail est dense avec peu de battement, les plateaux repas individuels fermés permettent un service rapide sans interrompre la dynamique. Pour un moment de networking plus informel, le format buffet salades et bouchées fraîches favorise les échanges."
        },
        {
          heading: "Prendre en compte la diversité alimentaire",
          body: "Prévoyez systématiquement des alternatives végétariennes et sans poisson pour que chaque collaborateur et invité trouve un plat correspondant à ses préférences."
        },
        {
          heading: "L'importance des boissons naturelles",
          body: "Complétez votre formule par des fontaines ou carafes de jus maison (Bissap ou Gingembre) pour offrir une alternative saine et désaltérante aux sodas traditionnels."
        }
      ],
      conclusion: "Une restauration fraîche et bien organisée renforce l'image professionnelle de votre entreprise et le bien-être de vos équipes."
    }
  },
  {
    slug: "secrets-fraicheur-salades-croquantes",
    title: "Nos 5 secrets pour préserver le croquant des légumes frais",
    category: "COULISSES YAMMOH",
    excerpt: "De l'achat matinal à la découpe à la commande, découvrez comment l'équipe YAMMOH garantit une fraîcheur absolue à chaque bouchée.",
    date: "01 Septembre 2026",
    readTime: "3 min",
    imageAlt: "Agriculture maraîchère biologique des hauts plateaux de l'Ouest Cameroun pour YAMMOH",
    image: "/assets/hero-slide-1.jpg",
    content: {
      intro: "Chez YAMMOH, aucun bol de salade n'est préparé à l'avance. Découvrez les coulisses de notre engagement fraîcheur à la Pharmacie Kotto.",
      sections: [
        {
          heading: "1. Un approvisionnement quotidien",
          body: "Chaque matin à l'aube, nos équipes sélectionnent concombres, carottes, tomates et herbes fraîches auprès de nos maraîchers partenaires."
        },
        {
          heading: "2. Le lavage et l'essorage minutieux",
          body: "Une salade bien essorée retient parfaitement la vinaigrette sans ramollir les feuilles. C'est l'étape indispensable pour une texture croustillante."
        },
        {
          heading: "3. La vinaigrette toujours séparée ou ajoutée minute",
          body: "Pour les livraisons à Douala, les assaisonnements sont conditionnés séparément afin de préserver l'intégrité de vos crudités jusqu'à la dégustation."
        }
      ],
      conclusion: "Le goût authentique d'un légume commence toujours par le respect de sa fraîcheur d'origine."
    }
  },
  {
    slug: "poivre-penja-terroir-camerounais",
    title: "Le Poivre de Penja & les Épices Nobles du Terroir Camerounais",
    category: "TERROIR & SAVEURS",
    excerpt: "Plongée au cœur du terroir camerounais : comment nous sélectionnons le poivre de Penja IGP et les herbes aromatiques locales pour nos assaisonnements.",
    date: "20 Septembre 2026",
    readTime: "5 min",
    imageAlt: "Séchage artisanal du poivre de Penja et aromates locaux au Cameroun",
    image: "/assets/terroire-BNuswzeV.jpg",
    content: {
      intro: "Premier produit d'Afrique subsaharienne à avoir obtenu une Indication Géographique Protégée (IGP), le poivre de Penja est un trésor botanique qui sublime les créations signatures YAMOOH.",
      sections: [
        {
          heading: "Un sol volcanique d'une richesse unique",
          body: "Cultivé sur les flancs volcaniques fertiles du Mont Koupé, le poivre de Penja développe des arômes boisés, musqués et une délicatesse qui ne brûle pas le palais."
        },
        {
          heading: "Le secret de nos marinades maison",
          body: "Nos viandes et nos sauces artisanales intègrent des moutures fraîches de poivre blanc et noir afin de libérer immédiatement leurs huiles essentielles lors de la dégustation."
        }
      ],
      conclusion: "Valoriser nos producteurs locaux, c'est offrir à nos clients une expérience gastronomique d'une authenticité incomparable."
    }
  },
  {
    slug: "art-jus-presses-a-froid-yamooh",
    title: "L'Art des Jus Tropicaux Pressés à Froid & Infusions Détox",
    category: "RECETTES & INSPIRATIONS",
    excerpt: "Bissap parfumé à la menthe, jus de gingembre tonique et citronnades fraîches : l'hydratation gourmande et naturelle à Douala.",
    date: "25 Septembre 2026",
    readTime: "4 min",
    imageAlt: "Préparation de jus tropicaux frais et bols détox dans la cuisine YAMOOH à Douala",
    image: "/assets/bouteilles-jus-naturel-1l.jpg",
    content: {
      intro: "Rien ne remplace la pureté d'un fruit tropical fraîchement pressé pour accompagner votre repas du midi sous le climat équatorial de Douala.",
      sections: [
        {
          heading: "Zéro conservateur, 100% vitalité",
          body: "Nos jus sont préparés chaque matin sans ajout d'arômes artificiels. Le Bissap est infusé à basse température avec des feuilles de menthe sauvage et une pointe d'ananas frais."
        },
        {
          heading: "Le coup de fouet du gingembre local",
          body: "Notre recette de jus de gingembre pressé apporte un effet vivifiant naturel qui stimule l'organisme et favorise une digestion légère après le repas."
        }
      ],
      conclusion: "Commandez votre bouteille individuelle avec votre salade pour une pause déjeuner saine et revigorante."
    }
  }
];
