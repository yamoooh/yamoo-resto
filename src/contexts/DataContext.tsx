import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { MenuItem, menu as initialMenu } from "../data/menu";

export type ProductStatus = "published" | "draft" | "hidden" | "archived";

export interface ExtendedProduct extends MenuItem {
  status: ProductStatus;
  order: number;
  oldPrice?: number | null;
  gallery?: string[];
  updatedAt?: string;
  createdAt?: string;
}

export interface CategoryData {
  id: string;
  slug: string;
  name: string;
  description?: string;
  image?: string;
  order: number;
  isActive: boolean;
}

export interface FormulaData {
  id: string;
  slug: string;
  name: string;
  price: number | null;
  description: string;
  image: string;
  itemsCount?: string;
  category: string;
  status: ProductStatus;
  order: number;
}

export interface SignatureData {
  id: string;
  slug: string;
  name: string;
  price: number;
  calories: string;
  description: string;
  concept: string;
  benefits: string[];
  ingredients: string[];
  image: string;
  status: ProductStatus;
  order: number;
}

export interface IngredientData {
  id: string;
  type: "base" | "protein" | "topping" | "sauce";
  name: string;
  desc?: string;
  image: string;
  extraPrice: number;
  isAvailable: boolean;
  order: number;
}

export interface CollectionData {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  productIds: string[];
  startDate?: string;
  endDate?: string;
  status: "draft" | "active" | "ended" | "archived";
}

export interface AnnouncementBarContent {
  isActive: boolean;
  message: string;
  ctaText: string;
  ctaLink: string;
}

export interface HeroSlideContent {
  id: number;
  number: string;
  title: string;
  description: string;
  image: string;
  position: "left" | "right";
  ctaPrimaryText: string;
  ctaPrimaryLink: string;
  ctaSecondaryText?: string;
  ctaSecondaryLink?: string;
}

export interface SiteContentData {
  announcementBar: AnnouncementBarContent;
  heroSlides: HeroSlideContent[];
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  whatsappNumber: string;
}

export interface MediaItem {
  id: string;
  filename: string;
  url: string;
  type: string;
  dimensions?: string;
  fileSize?: string;
  uploadedAt: string;
  usedBy?: string[];
}

export interface CustomerData {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  district: string;
  createdAt: string;
  ordersCount: number;
  status: "active" | "inactive";
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: "super_admin" | "admin" | "editor" | "marketing";
  createdAt: string;
  lastLogin?: string;
}

export interface ActivityLogItem {
  id: string;
  timestamp: string;
  adminName: string;
  actionType: "create" | "update" | "delete" | "replace_image" | "publish" | "hide" | "login";
  targetEntity: string;
  details: string;
}

interface DataContextType {
  products: ExtendedProduct[];
  categories: CategoryData[];
  formulas: FormulaData[];
  signatures: SignatureData[];
  ingredients: IngredientData[];
  collections: CollectionData[];
  siteContent: SiteContentData;
  mediaLibrary: MediaItem[];
  customers: CustomerData[];
  admins: AdminUser[];
  activityLogs: ActivityLogItem[];
  
  // Product actions
  saveProduct: (product: ExtendedProduct) => void;
  deleteProduct: (id: string) => void;
  reorderProducts: (orderedIds: string[]) => void;
  
  // Category actions
  saveCategory: (category: CategoryData) => void;
  deleteCategory: (id: string) => void;
  
  // Formula & Signature actions
  saveFormula: (formula: FormulaData) => void;
  deleteFormula: (id: string) => void;
  saveSignature: (signature: SignatureData) => void;
  
  // Ingredient actions
  saveIngredient: (ingredient: IngredientData) => void;
  deleteIngredient: (id: string) => void;
  
  // Collection actions
  saveCollection: (collection: CollectionData) => void;
  deleteCollection: (id: string) => void;
  
  // Site Content
  updateSiteContent: (content: Partial<SiteContentData>) => void;
  
  // Media actions
  addMediaItem: (item: Omit<MediaItem, "id" | "uploadedAt">) => MediaItem;
  replaceMediaItem: (id: string, newUrl: string, newFilename?: string) => void;
  deleteMediaItem: (id: string) => { success: boolean; error?: string };
  
  // Admin & Activity
  addAdmin: (admin: Omit<AdminUser, "id" | "createdAt">) => void;
  updateAdminPassword: (email: string, newPassword: string) => boolean;
  deleteAdmin: (id: string) => void;
  logActivity: (actionType: ActivityLogItem["actionType"], targetEntity: string, details: string) => void;
  
  // Helpers
  getPublicProducts: () => ExtendedProduct[];
  getProductBySlug: (slug: string) => ExtendedProduct | undefined;
}

const STORAGE_KEYS = {
  PRODUCTS: "yamooh_cms_products_v1",
  CATEGORIES: "yamooh_cms_categories_v1",
  FORMULAS: "yamooh_cms_formulas_v1",
  SIGNATURES: "yamooh_cms_signatures_v1",
  INGREDIENTS: "yamooh_cms_ingredients_v1",
  COLLECTIONS: "yamooh_cms_collections_v1",
  SITE_CONTENT: "yamooh_cms_site_content_v1",
  MEDIA: "yamooh_cms_media_v1",
  CUSTOMERS: "yamooh_cms_customers_v1",
  ADMINS: "yamooh_cms_admins_v1",
  LOGS: "yamooh_cms_logs_v1",
};

// Initial Seed Builders
const getInitialProducts = (): ExtendedProduct[] => {
  return initialMenu.map((item, index) => ({
    ...item,
    status: (item.isAvailable === false ? "hidden" : "published") as ProductStatus,
    order: index + 1,
    gallery: item.image ? [item.image] : [],
    createdAt: "2026-09-01",
    updatedAt: "2026-10-01",
  }));
};

const getInitialCategories = (): CategoryData[] => [
  { id: "cat-salades", slug: "salades", name: "Salades", description: "Salades fraîches composées minute", order: 1, isActive: true },
  { id: "cat-sandwichs", slug: "sandwichs", name: "Sandwichs & Wraps", description: "Baguettes croustillantes et wraps gourmets", order: 2, isActive: true },
  { id: "cat-plats", slug: "plats", name: "Plats Chauds", description: "Woks, bowls et plats cuisinés équilibrés", order: 3, isActive: true },
  { id: "cat-petit-dej", slug: "petit-dejeuner", name: "Petit-déjeuner", description: "Viennoiseries, cakes et boissons matinales", order: 4, isActive: true },
  { id: "cat-brunch", slug: "brunch", name: "Brunch", description: "Formules complètes et généreuses", order: 5, isActive: true },
  { id: "cat-plateaux", slug: "plateaux-repas", name: "Plateaux Repas", description: "Coffrets déjeuners individuels pour réunions B2B", order: 6, isActive: true },
  { id: "cat-cocktails", slug: "cocktails", name: "Cocktails & Finger Food", description: "Mini-wraps et pièces apéritives", order: 7, isActive: true },
  { id: "cat-buffets", slug: "buffets", name: "Buffets Traiteur", description: "Grands formats partagés et réceptions", order: 8, isActive: true },
  { id: "cat-desserts", slug: "desserts", name: "Desserts & Fruits", description: "Douceurs sucrées et salades de fruits frais", order: 9, isActive: true },
  { id: "cat-boissons", slug: "boissons", name: "Boissons & Jus Pressés", description: "Jus 100% naturels sans sucres ajoutés", order: 10, isActive: true },
];

const getInitialFormules = (): FormulaData[] => [
  {
    id: "fml-express",
    slug: "formule-express",
    name: "Formule Express Déjeuner",
    price: 3500,
    description: "1 Salade ou Plat du jour + 1 Boisson 25cl au choix.",
    image: "/assets/formule-sandwichs-plats.jpg",
    itemsCount: "2 éléments",
    category: "Déjeuner",
    status: "published",
    order: 1,
  },
  {
    id: "fml-gourmande",
    slug: "formule-gourmande",
    name: "Formule Gourmande Complète",
    price: 4900,
    description: "1 Salade Signature + 1 Dessert maison + 1 Jus naturel 33cl.",
    image: "/assets/salade-iberique.jpg",
    itemsCount: "3 éléments",
    category: "Déjeuner",
    status: "published",
    order: 2,
  },
  {
    id: "fml-matinale",
    slug: "formule-matinale",
    name: "Formule Matinale Vitalité",
    price: 3000,
    description: "1 Boisson chaude + 1 Jus pressé + 1 Part de cake ou fromage blanc coulis hibiscus.",
    image: "/assets/formule-matinale-continentale.jpg",
    itemsCount: "3 éléments",
    category: "Petit-déjeuner",
    status: "published",
    order: 3,
  },
  {
    id: "fml-plateau-b2b",
    slug: "formule-plateau-repas",
    name: "Coffret Plateau Repas Affaires",
    price: 7500,
    description: "Entrée fraîcheur + Plat signature + Fromage/Pain + Dessert gourmand + Jus pressé.",
    image: "/assets/formule-plateaux-repas.jpg",
    itemsCount: "Coffret complet",
    category: "Plateaux Repas",
    status: "published",
    order: 4,
  },
  {
    id: "fml-cocktail-24",
    slug: "plateau-24-mini-wraps",
    name: "Plateau 24 Mini-Wraps Gourmets",
    price: 18000,
    description: "Assortiment de 24 mini-wraps : Poulet épicé avocat, Thon crudités et Végétarien houmous.",
    image: "/assets/plateau-24-mini-wraps-gourmets.jpg",
    itemsCount: "24 pièces",
    category: "Cocktails",
    status: "published",
    order: 5,
  },
  {
    id: "fml-buffet-saladbar",
    slug: "buffet-salad-bar-xxl",
    name: "Buffet Salad Bar Partagé (15 pers)",
    price: 65000,
    description: "Grands saladiers XXL au choix, bar à sauces artisanales, pain frais et couverts éco.",
    image: "/assets/formule-buffet.jpg",
    itemsCount: "15 personnes",
    category: "Buffets",
    status: "published",
    order: 6,
  }
];

const getInitialSignatures = (): SignatureData[] => [
  {
    id: "sig-iberique",
    slug: "l-iberique",
    name: "L'Ibèrique",
    price: 4500,
    calories: "480 kcal",
    description: "Salade gourmande au jambon de dinde, parmesan affiné, tomates cerises et croûtons dorés.",
    concept: "Inspirée de la gastronomie méditerranéenne, L'Ibèrique combine le jambon de dinde sélectionné avec le caractère du parmesan affiné 12 mois.",
    benefits: ["Protéines maigres de haute qualité", "Apport naturel en calcium", "Énergie saine et rassasiante"],
    ingredients: ["Salade Verte", "Jambon de dinde fumé", "Parmesan affiné", "Tomates cerises", "Croûtons dorés", "Sauce Vinaigrette Maison"],
    image: "/assets/salade-iberique.jpg",
    status: "published",
    order: 1,
  },
  {
    id: "sig-yamooh",
    slug: "la-yamooh",
    name: "La Yamooh",
    price: 4000,
    calories: "520 kcal",
    description: "La salade emblématique de la maison : poulet grillé aux herbes, maïs doux, œufs durs fermiers et sauce signature.",
    concept: "La création iconique de YAMOOH à Douala : un équilibre parfait de fraîcheur, générosité et gourmandise.",
    benefits: ["Riche en fibres et vitamines", "Protéines complètes", "Sans gluten"],
    ingredients: ["Salade Verte & Penne", "Poulet grillé mariné", "Œufs fermiers", "Maïs doux", "Concombre", "Sauce Signature Yamooh"],
    image: "/assets/yamooh-CkgAPjl6.jpg",
    status: "published",
    order: 2,
  },
  {
    id: "sig-oceanne",
    slug: "l-oceanne",
    name: "L'Océanne",
    price: 4500,
    calories: "440 kcal",
    description: "Fraîcheur marine avec thon émietté, maïs croquant, tomates cerises, œufs durs et vinaigrette au citron vert.",
    concept: "Une invitation au grand large avec des notes acidulées et iodées, digeste et stimulante.",
    benefits: ["Riche en Oméga-3", "Légère et très digeste", "Vitamines C et E"],
    ingredients: ["Salade Verte", "Thon naturel", "Œufs durs", "Maïs doux", "Tomates cerises", "Vinaigrette Citron-Gingembre"],
    image: "/assets/oceanne-3R_USG60.jpg",
    status: "published",
    order: 3,
  },
  {
    id: "sig-atlas",
    slug: "l-atlas",
    name: "L'Atlas",
    price: 4000,
    calories: "490 kcal",
    description: "Saveurs orientales douces : poulet mariné, carottes râpées, maïs, olives noires et sauce tahini passion.",
    concept: "Un voyage aux confins des épices douces et de la fraîcheur maraîchère.",
    benefits: ["Antioxydants puissants", "Bon pour la peau", "Richesse en minéraux"],
    ingredients: ["Salade Verte", "Poulet mariné", "Carottes râpées", "Olives noires", "Maïs", "Sauce Vinaigrette Passion"],
    image: "/assets/atlas-Dmt8KWOx.jpg",
    status: "published",
    order: 4,
  },
  {
    id: "sig-terroire",
    slug: "le-terroire",
    name: "Le Terroire",
    price: 4000,
    calories: "460 kcal",
    description: "Hommage au terroir avec bœuf séché artisanal effiloché, oignons rouges, radis et poivre de Penja.",
    concept: "La force aromatique des produits du terroir camerounais valorisée dans une salade fraîche.",
    benefits: ["Fer et minéraux", "Épices digestives IGP Penja", "Zéro sucre ajouté"],
    ingredients: ["Salade Verte & Riz", "Bœuf séché traditionnel", "Oignons rouges", "Tomates", "Radis", "Vinaigrette Balsamique"],
    image: "/assets/terroire-BNuswzeV.jpg",
    status: "published",
    order: 5,
  },
  {
    id: "sig-urbaine",
    slug: "l-urbaine",
    name: "L'Urbaine",
    price: 4000,
    calories: "510 kcal",
    description: "Moderne et dynamique : pâtes al dente, poulet grillé, mozzarella fraîche et sauce César légère.",
    concept: "Conçue pour les journées actives des professionnels de Douala qui recherchent énergie et rapidité.",
    benefits: ["Énergie longue durée", "Calcium & protéines", "Texture gourmande"],
    ingredients: ["Pâtes Penne", "Poulet grillé", "Mozzarella", "Tomates cerises", "Croûtons", "Sauce César Onctueuse"],
    image: "/assets/urbaine-DEuWeNrX.jpg",
    status: "published",
    order: 6,
  },
  {
    id: "sig-bistrot",
    slug: "la-bistrot",
    name: "La Bistrot",
    price: 4000,
    calories: "470 kcal",
    description: "Authentique esprit brasserie : dés de jambon de dinde, œufs fermiers, concombres et sauce moutarde douce.",
    concept: "La simplicité réconfortante des recettes traditionnelles revisitées avec des produits maraîchers frais.",
    benefits: ["Classique indémodable", "Équilibre nutritionnel parfait", "Facile à emporter"],
    ingredients: ["Salade Verte", "Jambon de dinde", "Œufs fermiers", "Concombre", "Croûtons", "Sauce Miel & Moutarde"],
    image: "/assets/bistrot-C83KBU6s.jpg",
    status: "published",
    order: 7,
  },
  {
    id: "sig-caprece",
    slug: "la-caprece",
    name: "La Caprèce",
    price: 4000,
    calories: "430 kcal",
    description: "Douceur 100% végétarienne : mozzarella di bufala fondante, tomates cerises juteuses, basilic et huile d'olive vierge.",
    concept: "L'harmonie pure de la tomate et du fromage frais sublimée par notre vinaigrette balsamique.",
    benefits: ["100% Végétarien", "Légèreté absolue", "Riche en antioxydants"],
    ingredients: ["Salade Verte", "Mozzarella fraîche", "Tomates cerises", "Olives noires", "Croûtons dorés", "Vinaigrette Balsamique & Olive"],
    image: "/assets/caprece-Ba5mao2e.jpg",
    status: "published",
    order: 8,
  }
];

const getInitialIngredients = (): IngredientData[] => [
  // Bases
  { id: "b-verte", type: "base", name: "Salade Verte / Jeunes Pousses", desc: "Mélange croquant et rafraîchissant du matin", image: "/assets/laitue-ygyRIKjn.jpg", extraPrice: 0, isAvailable: true, order: 1 },
  { id: "b-pennes", type: "base", name: "Pâtes Penne Al Dente", desc: "Pour un bol gourmand et énergétique", image: "/assets/pate-Col6eF1X.jpg", extraPrice: 0, isAvailable: true, order: 2 },
  { id: "b-riz", type: "base", name: "Riz Parfumé & Quinoa", desc: "Riche en fibres et digeste", image: "/assets/riz-CVNADP4F.jpg", extraPrice: 0, isAvailable: true, order: 3 },
  { id: "b-mixte", type: "base", name: "Duo Salade Verte + Penne", desc: "Le meilleur des deux mondes", image: "/assets/salade-classic-B-4lDVb2.jpg", extraPrice: 500, isAvailable: true, order: 4 },
  
  // Protéines
  { id: "p-poulet", type: "protein", name: "Poulet Grillé Épicé", desc: "Blanc de poulet mariné aux herbes", image: "/assets/poulet-CA-PERh0.webp", extraPrice: 0, isAvailable: true, order: 1 },
  { id: "p-thon", type: "protein", name: "Thon Émietté", desc: "Thon naturel savoureux", image: "/assets/thon-Cx3gHb5H.webp", extraPrice: 0, isAvailable: true, order: 2 },
  { id: "p-dinde", type: "protein", name: "Jambon de Dinde Fumé", desc: "Découpé en fines lamelles", image: "/assets/jambon-cuit-C2UJnnTP.webp", extraPrice: 0, isAvailable: true, order: 3 },
  { id: "p-crevettes", type: "protein", name: "Crevettes Sautées", desc: "Crevettes fraîches snackées au citron vert", image: "/assets/crevette-wwoX80NC.webp", extraPrice: 1000, isAvailable: true, order: 4 },
  { id: "p-boeuf", type: "protein", name: "Bœuf Séché Traditionnel", desc: "Saveur intense et authentique", image: "/assets/boeuf-effiloche-B2OHPJHk.webp", extraPrice: 500, isAvailable: true, order: 5 },
  { id: "p-veggie", type: "protein", name: "Œufs Durs Fermiers", desc: "Option 100% végétarienne gourmande", image: "/assets/egg-C5NNviHX.webp", extraPrice: 0, isAvailable: true, order: 6 },
  
  // Toppings
  { id: "t-avocat", type: "topping", name: "Avocat Frais de Saison", image: "/assets/white-Ys_1KX4t.webp", extraPrice: 500, isAvailable: true, order: 1 },
  { id: "t-tomates", type: "topping", name: "Tomates Cerises", image: "/assets/tomate-cerise-CzCzaKM0.webp", extraPrice: 0, isAvailable: true, order: 2 },
  { id: "t-concombre", type: "topping", name: "Concombre Croquant", image: "/assets/courgette-M4oVbBx0.webp", extraPrice: 0, isAvailable: true, order: 3 },
  { id: "t-mais", type: "topping", name: "Maïs Doux", image: "/assets/corn-r1PnANWf.webp", extraPrice: 0, isAvailable: true, order: 4 },
  { id: "t-carottes", type: "topping", name: "Carottes Râpées", image: "/assets/beetroot-B9SWQa2_.webp", extraPrice: 0, isAvailable: true, order: 5 },
  { id: "t-croutons", type: "topping", name: "Croûtons Dorés à l'Ail", image: "/assets/croutons-DfEfR94J.webp", extraPrice: 0, isAvailable: true, order: 6 },
  { id: "t-parmesan", type: "topping", name: "Copeaux de Parmesan Affiné", image: "/assets/parmesan-BJf9Q78B.webp", extraPrice: 500, isAvailable: true, order: 7 },
  { id: "t-olives", type: "topping", name: "Olives Noires Dénoyautées", image: "/assets/olives-noires-Dzj3rXir.webp", extraPrice: 0, isAvailable: true, order: 8 },
  { id: "t-radis", type: "topping", name: "Radis Croquants", image: "/assets/radis-kU71-Esr.webp", extraPrice: 0, isAvailable: true, order: 9 },
  { id: "t-oignons", type: "topping", name: "Oignons Rouges", image: "/assets/onion-hOActqk_.webp", extraPrice: 0, isAvailable: true, order: 10 },
  { id: "t-poivrons", type: "topping", name: "Poivrons Doux", image: "/assets/poivron-WNzJT9hS.webp", extraPrice: 0, isAvailable: true, order: 11 },
  { id: "t-mozzarella", type: "topping", name: "Mozzarella Fraîche", image: "/assets/mozzarella-BQ6A8EDG.webp", extraPrice: 500, isAvailable: true, order: 12 },
  { id: "t-mangue", type: "topping", name: "Dés de Mangue Fraîche", image: "/assets/mangue-ltauBJ9J.webp", extraPrice: 500, isAvailable: true, order: 13 },
  { id: "t-noix", type: "topping", name: "Noix de Grenoble Croquantes", image: "/assets/noix-grenoble-Di-CN1Qe.webp", extraPrice: 500, isAvailable: true, order: 14 },

  // Sauces
  { id: "s-yamooh", type: "sauce", name: "Sauce Signature Yamooh", desc: "L'originale crémeuse aux épices douces", image: "/assets/sauce-vinaigrette-CYsf44KD.jpg", extraPrice: 0, isAvailable: true, order: 1 },
  { id: "s-passion", type: "sauce", name: "Vinaigrette Fruit de la Passion", desc: "Acidulée et exotique", image: "/assets/sauce-passion-C8y8wEXP.jpg", extraPrice: 0, isAvailable: true, order: 2 },
  { id: "s-cesar", type: "sauce", name: "Sauce César Onctueuse", desc: "Parmesan, ail doux et crème fraîche", image: "/assets/sauce-cesar-DxzAeutG.jpg", extraPrice: 0, isAvailable: true, order: 3 },
  { id: "s-balsamique", type: "sauce", name: "Vinaigrette Balsamique & Huile d'Olive", desc: "Légère et classique", image: "/assets/sauce-vinaigrette-DKIlEP5g.webp", extraPrice: 0, isAvailable: true, order: 4 },
  { id: "s-citron", type: "sauce", name: "Vinaigrette Citron-Gingembre", desc: "Tonique et fraîche", image: "/assets/citronnade-BGlYWEWk.jpg", extraPrice: 0, isAvailable: true, order: 5 },
  { id: "s-miel", type: "sauce", name: "Sauce Miel & Moutarde Douce", desc: "Douceur gourmande", image: "/assets/sauce-miel-BjhOxYNZ.jpg", extraPrice: 0, isAvailable: true, order: 6 },
];

const getInitialCollections = (): CollectionData[] => [
  {
    id: "col-saison-ete",
    slug: "fraicheur-tropicale",
    title: "Collection Fraîcheur Tropicale",
    description: "Sélection estivale autour des fruits exotiques, mangues mûres, ananas victoria et vinaigrettes passion.",
    image: "/assets/formule-collection-moment.jpg",
    productIds: ["sig-iberique", "sig-oceanne", "des-salade-fruits"],
    startDate: "2026-06-01",
    endDate: "2026-11-30",
    status: "active",
  }
];

const getInitialSiteContent = (): SiteContentData => ({
  announcementBar: {
    isActive: true,
    message: "Découvrez les offres YAMOOH : restaurant, traiteur, salades, plats, sandwichs, plateaux repas, cocktails, buffets et boissons. Créez votre compte et profitez d’une commande plus rapide, de vos informations enregistrées et d’un suivi facilité.",
    ctaText: "CRÉER MON COMPTE",
    ctaLink: "/auth?tab=register",
  },
  heroSlides: [
    {
      id: 0,
      number: "01",
      title: "Et si chaque repas était préparé avec autant de soin que pour vous ?",
      description: "Chez YAMOOH, notre cuisine repose sur des produits frais, des recettes généreuses et une équipe qui met le goût au cœur de chaque préparation.",
      image: "/assets/hero-slide-1.jpg",
      position: "left",
      ctaPrimaryText: "DÉCOUVRIR YAMOOH",
      ctaPrimaryLink: "/yamooh/a-propos",
    },
    {
      id: 1,
      number: "02",
      title: "Bien manger au bureau, sans perdre votre temps.",
      description: "Salades, plats, sandwichs, plateaux repas et boissons : YAMOOH vous accompagne au quotidien avec des repas frais et gourmands.",
      image: "/assets/hero-slide-2.jpg",
      position: "right",
      ctaPrimaryText: "VOIR NOS OFFRES",
      ctaPrimaryLink: "/notre-carte",
      ctaSecondaryText: "COMMANDER EN LIGNE",
      ctaSecondaryLink: "/builder",
    },
    {
      id: 2,
      number: "03",
      title: "Votre événement mérite une cuisine à sa hauteur.",
      description: "Petits-déjeuners, cocktails, buffets, plateaux repas et prestations traiteur : YAMOOH s'occupe de vos moments professionnels et privés.",
      image: "/assets/hero-slide-3.jpg",
      position: "left",
      ctaPrimaryText: "DEMANDER UN DEVIS",
      ctaPrimaryLink: "/devis",
      ctaSecondaryText: "DÉCOUVRIR LE TRAITEUR",
      ctaSecondaryLink: "/offres-traiteur",
    }
  ],
  contactEmail: "contact@yamooh.com",
  contactPhone: "+237 658 254 509",
  contactAddress: "Pharmacie Kotto, Douala, Cameroun",
  whatsappNumber: "+237658254509",
});

const getInitialMediaLibrary = (): MediaItem[] => [
  { id: "med-1", filename: "hero-slide-1.jpg", url: "/assets/hero-slide-1.jpg", type: "image/jpeg", dimensions: "1920x1080", fileSize: "349 KB", uploadedAt: "2026-10-05", usedBy: ["Hero Slide 1", "Blog Secret Fraîcheur", "Offres Traiteur Chef"] },
  { id: "med-2", filename: "hero-slide-2.jpg", url: "/assets/hero-slide-2.jpg", type: "image/jpeg", dimensions: "1920x1080", fileSize: "311 KB", uploadedAt: "2026-10-05", usedBy: ["Hero Slide 2", "Séminaires Traiteur"] },
  { id: "med-3", filename: "hero-slide-3.jpg", url: "/assets/hero-slide-3.jpg", type: "image/jpeg", dimensions: "1920x1080", fileSize: "432 KB", uploadedAt: "2026-10-05", usedBy: ["Hero Slide 3", "Offres Traiteur Buffet", "Mariages Traiteur"] },
  { id: "med-4", filename: "salade-iberique.jpg", url: "/assets/salade-iberique.jpg", type: "image/jpeg", dimensions: "800x800", fileSize: "83 KB", uploadedAt: "2026-09-15", usedBy: ["L'Ibèrique", "Blog Composer Salade"] },
  { id: "med-5", filename: "yamooh-CkgAPjl6.jpg", url: "/assets/yamooh-CkgAPjl6.jpg", type: "image/jpeg", dimensions: "800x800", fileSize: "41 KB", uploadedAt: "2026-09-15", usedBy: ["La Yamooh"] },
  { id: "med-6", filename: "oceanne-3R_USG60.jpg", url: "/assets/oceanne-3R_USG60.jpg", type: "image/jpeg", dimensions: "800x800", fileSize: "38 KB", uploadedAt: "2026-09-15", usedBy: ["L'Océanne"] },
  { id: "med-7", filename: "atlas-Dmt8KWOx.jpg", url: "/assets/atlas-Dmt8KWOx.jpg", type: "image/jpeg", dimensions: "800x800", fileSize: "41 KB", uploadedAt: "2026-09-15", usedBy: ["L'Atlas"] },
  { id: "med-8", filename: "terroire-BNuswzeV.jpg", url: "/assets/terroire-BNuswzeV.jpg", type: "image/jpeg", dimensions: "800x800", fileSize: "35 KB", uploadedAt: "2026-09-15", usedBy: ["Le Terroire", "Blog Poivre Penja"] },
  { id: "med-9", filename: "urbaine-DEuWeNrX.jpg", url: "/assets/urbaine-DEuWeNrX.jpg", type: "image/jpeg", dimensions: "800x800", fileSize: "37 KB", uploadedAt: "2026-09-15", usedBy: ["L'Urbaine"] },
  { id: "med-10", filename: "bistrot-C83KBU6s.jpg", url: "/assets/bistrot-C83KBU6s.jpg", type: "image/jpeg", dimensions: "800x800", fileSize: "41 KB", uploadedAt: "2026-09-15", usedBy: ["La Bistrot"] },
  { id: "med-11", filename: "caprece-Ba5mao2e.jpg", url: "/assets/caprece-Ba5mao2e.jpg", type: "image/jpeg", dimensions: "800x800", fileSize: "34 KB", uploadedAt: "2026-09-15", usedBy: ["La Caprèce"] },
  { id: "med-12", filename: "formule-buffet.jpg", url: "/assets/formule-buffet.jpg", type: "image/jpeg", dimensions: "1200x800", fileSize: "228 KB", uploadedAt: "2026-09-15", usedBy: ["Formule Buffet Traiteur", "Blog Séminaires"] },
  { id: "med-13", filename: "formule-cocktail.jpg", url: "/assets/formule-cocktail.jpg", type: "image/jpeg", dimensions: "1200x800", fileSize: "216 KB", uploadedAt: "2026-09-15", usedBy: ["Cocktail Univers", "Inspirations"] },
  { id: "med-14", filename: "formule-plateaux-repas.jpg", url: "/assets/formule-plateaux-repas.jpg", type: "image/jpeg", dimensions: "1200x800", fileSize: "206 KB", uploadedAt: "2026-09-15", usedBy: ["Formule Plateaux Repas", "Inspirations"] },
  { id: "med-15", filename: "bouteilles-jus-naturel-1l.jpg", url: "/assets/bouteilles-jus-naturel-1l.jpg", type: "image/jpeg", dimensions: "1000x1000", fileSize: "256 KB", uploadedAt: "2026-09-15", usedBy: ["Offres Traiteur Boissons", "Blog Jus Pressés"] },
  { id: "med-16", filename: "fontaine-jus-frais-5l.jpg", url: "/assets/fontaine-jus-frais-5l.jpg", type: "image/jpeg", dimensions: "1000x1000", fileSize: "216 KB", uploadedAt: "2026-09-15", usedBy: ["Fontaine 5L Inox", "Inspirations"] },
  { id: "med-17", filename: "plateau-24-mini-wraps-gourmets.jpg", url: "/assets/plateau-24-mini-wraps-gourmets.jpg", type: "image/jpeg", dimensions: "1000x1000", fileSize: "221 KB", uploadedAt: "2026-09-15", usedBy: ["Plateau 24 Mini-Wraps"] },
  { id: "med-18", filename: "poulet-braise-rice-bowl.jpg", url: "/assets/poulet-braise-rice-bowl.jpg", type: "image/jpeg", dimensions: "800x800", fileSize: "160 KB", uploadedAt: "2026-09-15", usedBy: ["Rice Bowl Poulet Braisé"] },
  { id: "med-19", filename: "wok-vegetarien.jpg", url: "/assets/wok-vegetarien.jpg", type: "image/jpeg", dimensions: "800x800", fileSize: "187 KB", uploadedAt: "2026-09-15", usedBy: ["Wok Végétarien du Terroir"] },
  { id: "med-20", filename: "filet-de-poisson-patates-douces.jpg", url: "/assets/filet-de-poisson-patates-douces.jpg", type: "image/jpeg", dimensions: "800x800", fileSize: "148 KB", uploadedAt: "2026-09-15", usedBy: ["Filet de Capitaine Snacké"] },
  { id: "med-21", filename: "cheesecake-exotique-ananas-roti.jpg", url: "/assets/cheesecake-exotique-ananas-roti.jpg", type: "image/jpeg", dimensions: "800x800", fileSize: "89 KB", uploadedAt: "2026-09-15", usedBy: ["Cheesecake Exotique"] },
  { id: "med-22", filename: "mousse-chocolat-cacahuetes.jpg", url: "/assets/mousse-chocolat-cacahuetes.jpg", type: "image/jpeg", dimensions: "800x800", fileSize: "119 KB", uploadedAt: "2026-09-15", usedBy: ["Mousse Chocolat Noir"] },
  { id: "med-23", filename: "compotee-mangue-passion.jpg", url: "/assets/compotee-mangue-passion.jpg", type: "image/jpeg", dimensions: "800x800", fileSize: "116 KB", uploadedAt: "2026-09-15", usedBy: ["Compotée Mangue Passion"] },
  { id: "med-24", filename: "bissap-BM6B9mpW.jpg", url: "/assets/bissap-BM6B9mpW.jpg", type: "image/jpeg", dimensions: "800x800", fileSize: "43 KB", uploadedAt: "2026-09-15", usedBy: ["Jus de Bissap Maison"] },
  { id: "med-25", filename: "citronnade-BGlYWEWk.jpg", url: "/assets/citronnade-BGlYWEWk.jpg", type: "image/jpeg", dimensions: "800x800", fileSize: "42 KB", uploadedAt: "2026-09-15", usedBy: ["Citronnade Menthe Fraîche"] },
  { id: "med-26", filename: "jus-gingembre-CH3Giy47.jpg", url: "/assets/jus-gingembre-CH3Giy47.jpg", type: "image/jpeg", dimensions: "800x800", fileSize: "45 KB", uploadedAt: "2026-09-15", usedBy: ["Jus de Gingembre Tonique"] },
];

const getInitialCustomers = (): CustomerData[] => [
  { id: "c-1", fullName: "Arnaud Mbarga", email: "arnaud.mbarga@gmail.com", phone: "+237 699 12 34 56", city: "Douala", district: "Bonanjo", createdAt: "2026-09-10", ordersCount: 7, status: "active" },
  { id: "c-2", fullName: "Valérie Ekotto", email: "valerie.ekotto@orange.cm", phone: "+237 677 88 99 00", city: "Douala", district: "Akwa", createdAt: "2026-09-14", ordersCount: 4, status: "active" },
  { id: "c-3", fullName: "Jean-Paul Tchakounte", email: "jp.tchakounte@total.cm", phone: "+237 655 44 33 22", city: "Douala", district: "Bonapriso", createdAt: "2026-09-20", ordersCount: 12, status: "active" },
  { id: "c-4", fullName: "Christelle Ngono", email: "christelle.ngono@yahoo.fr", phone: "+237 694 55 66 77", city: "Douala", district: "Kotto", createdAt: "2026-09-28", ordersCount: 3, status: "active" },
];

const getInitialAdmins = (): AdminUser[] => [];

const getInitialLogs = (): ActivityLogItem[] => [
  { id: "log-1", timestamp: "2026-10-05 14:30", adminName: "Direction YAMOOH", actionType: "login", targetEntity: "Système", details: "Connexion réussie au Back-Office YAMOOH" },
  { id: "log-2", timestamp: "2026-10-05 14:15", adminName: "Direction YAMOOH", actionType: "update", targetEntity: "Slider Hero", details: "Mise à jour du tempo à 5 secondes et zoom renforcé" },
  { id: "log-3", timestamp: "2026-10-05 12:00", adminName: "Direction YAMOOH", actionType: "update", targetEntity: "Catalogue", details: "Vérification et normalisation des 8 Signatures" },
];

const DataContext = createContext<DataContextType | null>(null);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<ExtendedProduct[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      return saved ? JSON.parse(saved) : getInitialProducts();
    } catch {
      return getInitialProducts();
    }
  });

  const [categories, setCategories] = useState<CategoryData[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
      return saved ? JSON.parse(saved) : getInitialCategories();
    } catch {
      return getInitialCategories();
    }
  });

  const [formulas, setFormulas] = useState<FormulaData[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FORMULAS);
      return saved ? JSON.parse(saved) : getInitialFormules();
    } catch {
      return getInitialFormules();
    }
  });

  const [signatures, setSignatures] = useState<SignatureData[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SIGNATURES);
      return saved ? JSON.parse(saved) : getInitialSignatures();
    } catch {
      return getInitialSignatures();
    }
  });

  const [ingredients, setIngredients] = useState<IngredientData[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.INGREDIENTS);
      return saved ? JSON.parse(saved) : getInitialIngredients();
    } catch {
      return getInitialIngredients();
    }
  });

  const [collections, setCollections] = useState<CollectionData[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COLLECTIONS);
      return saved ? JSON.parse(saved) : getInitialCollections();
    } catch {
      return getInitialCollections();
    }
  });

  const [siteContent, setSiteContent] = useState<SiteContentData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SITE_CONTENT);
      return saved ? JSON.parse(saved) : getInitialSiteContent();
    } catch {
      return getInitialSiteContent();
    }
  });

  const [mediaLibrary, setMediaLibrary] = useState<MediaItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MEDIA);
      return saved ? JSON.parse(saved) : getInitialMediaLibrary();
    } catch {
      return getInitialMediaLibrary();
    }
  });

  const [customers, setCustomers] = useState<CustomerData[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CUSTOMERS);
      return saved ? JSON.parse(saved) : getInitialCustomers();
    } catch {
      return getInitialCustomers();
    }
  });

  const [admins, setAdmins] = useState<AdminUser[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ADMINS);
      if (saved) {
        const parsed: AdminUser[] = JSON.parse(saved);
        return parsed.filter((a) => !(a.id === "adm-1" && !a.password));
      }
      return getInitialAdmins();
    } catch {
      return getInitialAdmins();
    }
  });

  const [activityLogs, setActivityLogs] = useState<ActivityLogItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LOGS);
      return saved ? JSON.parse(saved) : getInitialLogs();
    } catch {
      return getInitialLogs();
    }
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    window.dispatchEvent(new Event("yamooh_data_updated"));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
    window.dispatchEvent(new Event("yamooh_data_updated"));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FORMULAS, JSON.stringify(formulas));
    window.dispatchEvent(new Event("yamooh_data_updated"));
  }, [formulas]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SIGNATURES, JSON.stringify(signatures));
    window.dispatchEvent(new Event("yamooh_data_updated"));
  }, [signatures]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.INGREDIENTS, JSON.stringify(ingredients));
    window.dispatchEvent(new Event("yamooh_data_updated"));
  }, [ingredients]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COLLECTIONS, JSON.stringify(collections));
    window.dispatchEvent(new Event("yamooh_data_updated"));
  }, [collections]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SITE_CONTENT, JSON.stringify(siteContent));
    window.dispatchEvent(new Event("yamooh_data_updated"));
  }, [siteContent]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MEDIA, JSON.stringify(mediaLibrary));
  }, [mediaLibrary]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ADMINS, JSON.stringify(admins));
  }, [admins]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(activityLogs));
  }, [activityLogs]);

  // Log Activity Helper
  const logActivity = useCallback((actionType: ActivityLogItem["actionType"], targetEntity: string, details: string) => {
    const currentAdminName = localStorage.getItem("yamooh_current_admin_name") || "Administrateur";
    const newLog: ActivityLogItem = {
      id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: new Date().toLocaleString("fr-FR", { dateStyle: "short", timeStyle: "short" }),
      adminName: currentAdminName,
      actionType,
      targetEntity,
      details,
    };
    setActivityLogs((prev) => [newLog, ...prev.slice(0, 199)]); // Keep last 200 logs
  }, []);

  // Product Actions
  const saveProduct = useCallback((product: ExtendedProduct) => {
    setProducts((prev) => {
      const existsIndex = prev.findIndex((p) => p.id === product.id);
      const isNew = existsIndex === -1;
      const updatedProduct: ExtendedProduct = {
        ...product,
        updatedAt: new Date().toISOString().split("T")[0],
      };

      if (isNew) {
        logActivity("create", `Produit ${product.name}`, `Création du produit ${product.name} (${product.price || "Sur devis"} FCFA)`);
        return [...prev, updatedProduct];
      } else {
        const old = prev[existsIndex];
        let diffDetails = `Mise à jour du produit ${product.name}`;
        if (old.price !== product.price) {
          diffDetails += ` - Prix passé de ${old.price} FCFA à ${product.price} FCFA`;
        }
        if (old.image !== product.image) {
          diffDetails += ` - Image modifiée`;
        }
        logActivity("update", `Produit ${product.name}`, diffDetails);
        const copy = [...prev];
        copy[existsIndex] = updatedProduct;
        return copy;
      }
    });
  }, [logActivity]);

  const deleteProduct = useCallback((id: string) => {
    setProducts((prev) => {
      const item = prev.find((p) => p.id === id);
      if (item) {
        logActivity("delete", `Produit ${item.name}`, `Suppression du produit ${item.name}`);
      }
      return prev.filter((p) => p.id !== id);
    });
  }, [logActivity]);

  const reorderProducts = useCallback((orderedIds: string[]) => {
    setProducts((prev) => {
      const map = new Map(prev.map((p) => [p.id, p]));
      const reordered: ExtendedProduct[] = [];
      orderedIds.forEach((id, index) => {
        const p = map.get(id);
        if (p) {
          reordered.push({ ...p, order: index + 1 });
          map.delete(id);
        }
      });
      // Append any remaining
      map.forEach((p) => reordered.push(p));
      logActivity("update", "Catalogue", "Réorganisation de l'ordre des produits");
      return reordered;
    });
  }, [logActivity]);

  // Category Actions
  const saveCategory = useCallback((category: CategoryData) => {
    setCategories((prev) => {
      const index = prev.findIndex((c) => c.id === category.id);
      if (index === -1) {
        logActivity("create", `Catégorie ${category.name}`, `Création de la catégorie ${category.name}`);
        return [...prev, category];
      } else {
        logActivity("update", `Catégorie ${category.name}`, `Modification de la catégorie ${category.name}`);
        const copy = [...prev];
        copy[index] = category;
        return copy;
      }
    });
  }, [logActivity]);

  const deleteCategory = useCallback((id: string) => {
    setCategories((prev) => {
      const item = prev.find((c) => c.id === id);
      if (item) {
        logActivity("delete", `Catégorie ${item.name}`, `Suppression de la catégorie ${item.name}`);
      }
      return prev.filter((c) => c.id !== id);
    });
  }, [logActivity]);

  // Formulas & Signatures
  const saveFormula = useCallback((formula: FormulaData) => {
    setFormulas((prev) => {
      const index = prev.findIndex((f) => f.id === formula.id);
      if (index === -1) {
        logActivity("create", `Formule ${formula.name}`, `Création de la formule ${formula.name}`);
        return [...prev, formula];
      } else {
        logActivity("update", `Formule ${formula.name}`, `Mise à jour de la formule ${formula.name} (${formula.price} FCFA)`);
        const copy = [...prev];
        copy[index] = formula;
        return copy;
      }
    });
  }, [logActivity]);

  const deleteFormula = useCallback((id: string) => {
    setFormulas((prev) => prev.filter((f) => f.id !== id));
  }, []);

  const saveSignature = useCallback((signature: SignatureData) => {
    setSignatures((prev) => {
      const index = prev.findIndex((s) => s.id === signature.id);
      logActivity("update", `Signature ${signature.name}`, `Mise à jour de la signature ${signature.name} (${signature.price} FCFA)`);
      if (index === -1) return [...prev, signature];
      const copy = [...prev];
      copy[index] = signature;
      return copy;
    });
    // Also update matching product in products
    setProducts((prev) => {
      const pIndex = prev.findIndex((p) => p.id === signature.id || p.slug === signature.slug);
      if (pIndex !== -1) {
        const copy = [...prev];
        copy[pIndex] = {
          ...copy[pIndex],
          name: signature.name,
          price: signature.price,
          description: signature.description,
          concept: signature.concept,
          benefits: signature.benefits,
          composition: signature.ingredients,
          image: signature.image,
          status: signature.status,
        };
        return copy;
      }
      return prev;
    });
  }, [logActivity]);

  // Ingredients
  const saveIngredient = useCallback((ingredient: IngredientData) => {
    setIngredients((prev) => {
      const index = prev.findIndex((i) => i.id === ingredient.id);
      if (index === -1) {
        logActivity("create", `Ingrédient ${ingredient.name}`, `Ajout d'ingrédient au Builder`);
        return [...prev, ingredient];
      } else {
        logActivity("update", `Ingrédient ${ingredient.name}`, `Mise à jour prix/disponibilité (+${ingredient.extraPrice} FCFA)`);
        const copy = [...prev];
        copy[index] = ingredient;
        return copy;
      }
    });
  }, [logActivity]);

  const deleteIngredient = useCallback((id: string) => {
    setIngredients((prev) => prev.filter((i) => i.id !== id));
  }, []);

  // Collections
  const saveCollection = useCallback((collection: CollectionData) => {
    setCollections((prev) => {
      const index = prev.findIndex((c) => c.id === collection.id);
      logActivity("update", `Collection ${collection.title}`, `Mise à jour de la collection du moment`);
      if (index === -1) return [...prev, collection];
      const copy = [...prev];
      copy[index] = collection;
      return copy;
    });
  }, [logActivity]);

  const deleteCollection = useCallback((id: string) => {
    setCollections((prev) => prev.filter((c) => c.id !== id));
  }, []);

  // Site Content
  const updateSiteContent = useCallback((content: Partial<SiteContentData>) => {
    setSiteContent((prev) => {
      const updated = { ...prev, ...content };
      logActivity("update", "Contenu du Site", "Mise à jour des textes / bandeau / hero");
      return updated;
    });
  }, [logActivity]);

  // Media Actions
  const addMediaItem = useCallback((item: Omit<MediaItem, "id" | "uploadedAt">): MediaItem => {
    const newMedia: MediaItem = {
      ...item,
      id: `med-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      uploadedAt: new Date().toISOString().split("T")[0],
    };
    setMediaLibrary((prev) => [newMedia, ...prev]);
    logActivity("create", `Média ${item.filename}`, `Import d'une nouvelle image dans la médiathèque`);
    return newMedia;
  }, [logActivity]);

  const replaceMediaItem = useCallback((id: string, newUrl: string, newFilename?: string) => {
    setMediaLibrary((prev) => {
      const index = prev.findIndex((m) => m.id === id);
      if (index === -1) return prev;
      const old = prev[index];
      const updated: MediaItem = {
        ...old,
        url: newUrl,
        filename: newFilename || old.filename,
        uploadedAt: new Date().toISOString().split("T")[0],
      };
      logActivity("replace_image", `Image ${old.filename}`, `Remplacement de l'image (nouveau fichier)`);
      const copy = [...prev];
      copy[index] = updated;
      return copy;
    });
    // Auto-update any product or signature using this old URL
    setProducts((prev) =>
      prev.map((p) => (p.image === mediaLibrary.find((m) => m.id === id)?.url ? { ...p, image: newUrl } : p))
    );
  }, [mediaLibrary, logActivity]);

  const deleteMediaItem = useCallback((id: string): { success: boolean; error?: string } => {
    const item = mediaLibrary.find((m) => m.id === id);
    if (!item) return { success: false, error: "Image introuvable" };
    if (item.usedBy && item.usedBy.length > 0) {
      return {
        success: false,
        error: `Cette image est actuellement utilisée par : ${item.usedBy.join(", ")}. Vous devez la dissocier avant de pouvoir la supprimer.`,
      };
    }
    setMediaLibrary((prev) => prev.filter((m) => m.id !== id));
    logActivity("delete", `Média ${item.filename}`, `Suppression de l'image`);
    return { success: true };
  }, [mediaLibrary, logActivity]);

  // Admin Actions
  const addAdmin = useCallback((admin: Omit<AdminUser, "id" | "createdAt">) => {
    const newAdmin: AdminUser = {
      ...admin,
      id: `adm-${Date.now()}`,
      createdAt: new Date().toISOString().split("T")[0],
    };
    setAdmins((prev) => [...prev, newAdmin]);
    logActivity("create", `Admin ${admin.name}`, `Création du compte administrateur (${admin.role})`);
  }, [logActivity]);

  const updateAdminPassword = useCallback((email: string, newPassword: string): boolean => {
    let updated = false;
    setAdmins((prev) =>
      prev.map((a) => {
        if (a.email.toLowerCase() === email.toLowerCase()) {
          updated = true;
          return { ...a, password: newPassword };
        }
        return a;
      })
    );
    if (updated) {
      logActivity("update", "Sécurité Administrateur", `Réinitialisation du mot de passe pour ${email}`);
    }
    return updated;
  }, [logActivity]);

  const deleteAdmin = useCallback((id: string) => {
    setAdmins((prev) => prev.filter((a) => a.id !== id));
  }, []);

  // Public Query Helpers
  const getPublicProducts = useCallback(() => {
    return products
      .filter((p) => p.status === "published" || !p.status)
      .sort((a, b) => (a.order || 0) - (b.order || 0));
  }, [products]);

  const getProductBySlug = useCallback((slug: string) => {
    return products.find((p) => p.slug === slug);
  }, [products]);

  return (
    <DataContext.Provider
      value={{
        products,
        categories,
        formulas,
        signatures,
        ingredients,
        collections,
        siteContent,
        mediaLibrary,
        customers,
        admins,
        activityLogs,
        saveProduct,
        deleteProduct,
        reorderProducts,
        saveCategory,
        deleteCategory,
        saveFormula,
        deleteFormula,
        saveSignature,
        saveIngredient,
        deleteIngredient,
        saveCollection,
        deleteCollection,
        updateSiteContent,
        addMediaItem,
        replaceMediaItem,
        deleteMediaItem,
        addAdmin,
        updateAdminPassword,
        deleteAdmin,
        logActivity,
        getPublicProducts,
        getProductBySlug,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
