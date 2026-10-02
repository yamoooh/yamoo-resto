import { useState, useMemo, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { 
  ChefHat, 
  ShoppingBag, 
  ArrowRight, 
  Check, 
  Sparkles, 
  Plus, 
  Minus, 
  Leaf, 
  Flame, 
  Droplets,
  CheckCircle2,
  RotateCcw,
  Utensils
} from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { menu } from "../data/menu";

// Ingrédients disponibles avec vraies images du code source
const BASES = [
  { id: "b-verte", name: "Salade Verte / Jeunes Pousses", desc: "Mélange croquant et rafraîchissant du matin", image: "/assets/laitue-ygyRIKjn.jpg", extraPrice: 0 },
  { id: "b-pennes", name: "Pâtes Penne Al Dente", desc: "Pour un bol gourmand et énergétique", image: "/assets/pate-Col6eF1X.jpg", extraPrice: 0 },
  { id: "b-riz", name: "Riz Parfumé & Quinoa", desc: "Riche en fibres et digeste", image: "/assets/riz-CVNADP4F.jpg", extraPrice: 0 },
  { id: "b-mixte", name: "Duo Salade Verte + Penne", desc: "Le meilleur des deux mondes", image: "/assets/salade-classic-B-4lDVb2.jpg", extraPrice: 500 },
];

const PROTEINES = [
  { id: "p-poulet", name: "Poulet Grillé Épicé", desc: "Blanc de poulet mariné aux herbes", image: "/assets/poulet-CA-PERh0.webp", extraPrice: 0 },
  { id: "p-thon", name: "Thon Émietté", desc: "Thon naturel savoureux", image: "/assets/thon-Cx3gHb5H.webp", extraPrice: 0 },
  { id: "p-dinde", name: "Jambon de Dinde Fumé", desc: "Découpé en fines lamelles", image: "/assets/jambon-cuit-C2UJnnTP.webp", extraPrice: 0 },
  { id: "p-crevettes", name: "Crevettes Sautées", desc: "Crevettes fraîches snackées au citron vert", image: "/assets/crevette-wwoX80NC.webp", extraPrice: 1000 },
  { id: "p-boeuf", name: "Bœuf Séché Traditionnel", desc: "Saveur intense et authentique", image: "/assets/boeuf-effiloche-B2OHPJHk.webp", extraPrice: 500 },
  { id: "p-veggie", name: "Œufs Durs Fermiers", desc: "Option 100% végétarienne gourmande", image: "/assets/egg-C5NNviHX.webp", extraPrice: 0 },
];

const TOPPINGS = [
  { id: "t-avocat", name: "Avocat Frais de Saison", image: "/assets/white-Ys_1KX4t.webp", extraPrice: 500 },
  { id: "t-tomates", name: "Tomates Cerises", image: "/assets/tomate-cerise-CzCzaKM0.webp", extraPrice: 0 },
  { id: "t-concombre", name: "Concombre Croquant", image: "/assets/courgette-M4oVbBx0.webp", extraPrice: 0 },
  { id: "t-mais", name: "Maïs Doux", image: "/assets/corn-r1PnANWf.webp", extraPrice: 0 },
  { id: "t-carottes", name: "Carottes Râpées", image: "/assets/beetroot-B9SWQa2_.webp", extraPrice: 0 },
  { id: "t-croutons", name: "Croûtons Dorés à l'Ail", image: "/assets/croutons-DfEfR94J.webp", extraPrice: 0 },
  { id: "t-parmesan", name: "Copeaux de Parmesan Affiné", image: "/assets/parmesan-BJf9Q78B.webp", extraPrice: 500 },
  { id: "t-olives", name: "Olives Noires Dénoyautées", image: "/assets/olives-noires-Dzj3rXir.webp", extraPrice: 0 },
  { id: "t-radis", name: "Radis Croquants", image: "/assets/radis-kU71-Esr.webp", extraPrice: 0 },
  { id: "t-oignons", name: "Oignons Rouges", image: "/assets/onion-hOActqk_.webp", extraPrice: 0 },
  { id: "t-poivrons", name: "Poivrons Doux", image: "/assets/poivron-WNzJT9hS.webp", extraPrice: 0 },
  { id: "t-mozzarella", name: "Mozzarella Fraîche", image: "/assets/mozzarella-BQ6A8EDG.webp", extraPrice: 500 },
  { id: "t-mangue", name: "Dés de Mangue Fraîche", image: "/assets/mangue-ltauBJ9J.webp", extraPrice: 500 },
  { id: "t-noix", name: "Noix de Grenoble Croquantes", image: "/assets/noix-grenoble-Di-CN1Qe.webp", extraPrice: 500 },
];

const SAUCES = [
  { id: "s-yamooh", name: "Sauce Signature Yamooh", desc: "L'originale crémeuse aux épices douces", image: "/assets/sauce-vinaigrette-CYsf44KD.jpg", extraPrice: 0 },
  { id: "s-passion", name: "Vinaigrette Fruit de la Passion", desc: "Acidulée et exotique", image: "/assets/sauce-passion-C8y8wEXP.jpg", extraPrice: 0 },
  { id: "s-cesar", name: "Sauce César Onctueuse", desc: "Parmesan, ail doux et crème fraîche", image: "/assets/sauce-cesar-DxzAeutG.jpg", extraPrice: 0 },
  { id: "s-balsamique", name: "Vinaigrette Balsamique & Huile d'Olive", desc: "Légère et classique", image: "/assets/sauce-vinaigrette-DKIlEP5g.webp", extraPrice: 0 },
  { id: "s-citron", name: "Vinaigrette Citron-Gingembre", desc: "Tonique et fraîche", image: "/assets/citronnade-BGlYWEWk.jpg", extraPrice: 0 },
  { id: "s-miel", name: "Sauce Miel & Moutarde Douce", desc: "Douceur gourmande", image: "/assets/sauce-miel-BjhOxYNZ.jpg", extraPrice: 0 },
];

export const Builder = () => {
  const { add } = useCart();
  const [searchParams] = useSearchParams();
  const sigParam = searchParams.get("sig") || searchParams.get("signature");

  // Sélections multiples illimitées
  const [selectedBases, setSelectedBases] = useState<string[]>(["b-verte"]);
  const [selectedProteins, setSelectedProteins] = useState<string[]>(["p-poulet"]);
  const [selectedToppings, setSelectedToppings] = useState<string[]>(["t-tomates", "t-mais", "t-concombre"]);
  const [selectedSauces, setSelectedSauces] = useState<string[]>(["s-yamooh"]);
  const [breadOption, setBreadOption] = useState<boolean>(true);
  const [quantity, setQuantity] = useState<number>(1);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [customizedSignatureName, setCustomizedSignatureName] = useState<string | null>(null);

  // Pré-chargement automatique si l'utilisateur arrive depuis une salade signature
  useEffect(() => {
    if (!sigParam) return;
    const targetSig = menu.find((m) => m.slug === sigParam || m.id === sigParam);
    if (targetSig) {
      setCustomizedSignatureName(targetSig.name);
      // Pré-sélection selon la recette
      if (targetSig.id === "sig-iberique") {
        setSelectedBases(["b-verte"]);
        setSelectedProteins(["p-dinde"]);
        setSelectedToppings(["t-tomates", "t-croutons", "t-parmesan", "t-avocat"]);
        setSelectedSauces(["s-balsamique"]);
      } else if (targetSig.id === "sig-yamooh") {
        setSelectedBases(["b-pennes"]);
        setSelectedProteins(["p-poulet"]);
        setSelectedToppings(["t-avocat", "t-mais", "t-tomates"]);
        setSelectedSauces(["s-yamooh"]);
      } else if (targetSig.id === "sig-oceanne") {
        setSelectedBases(["b-verte"]);
        setSelectedProteins(["p-crevettes"]);
        setSelectedToppings(["t-avocat", "t-concombre", "t-radis"]);
        setSelectedSauces(["s-citron"]);
      } else if (targetSig.id === "sig-atlas") {
        setSelectedBases(["b-verte"]);
        setSelectedProteins(["p-poulet"]);
        setSelectedToppings(["t-olives", "t-oignons", "t-tomates"]);
        setSelectedSauces(["s-yamooh"]);
      } else if (targetSig.id === "sig-terroire") {
        setSelectedBases(["b-verte"]);
        setSelectedProteins(["p-boeuf", "p-veggie"]);
        setSelectedToppings(["t-carottes", "t-tomates"]);
        setSelectedSauces(["s-balsamique"]);
      } else if (targetSig.id === "sig-urbaine") {
        setSelectedBases(["b-pennes"]);
        setSelectedProteins(["p-poulet"]);
        setSelectedToppings(["t-mais", "t-tomates", "t-croutons"]);
        setSelectedSauces(["s-cesar"]);
      } else if (targetSig.id === "sig-bistrot") {
        setSelectedBases(["b-verte"]);
        setSelectedProteins(["p-thon", "p-veggie"]);
        setSelectedToppings(["t-tomates", "t-concombre"]);
        setSelectedSauces(["s-balsamique"]);
      } else if (targetSig.id === "sig-caprece") {
        setSelectedBases(["b-verte"]);
        setSelectedProteins(["p-veggie"]);
        setSelectedToppings(["t-mozzarella", "t-tomates", "t-olives"]);
        setSelectedSauces(["s-balsamique"]);
      }
    }
  }, [sigParam]);

  // Gestion des sélections (Toggle multi-choix illimité)
  const toggleBase = (id: string) => {
    if (selectedBases.includes(id)) {
      if (selectedBases.length > 1) setSelectedBases(selectedBases.filter((b) => b !== id));
    } else {
      setSelectedBases([...selectedBases, id]);
    }
  };

  const toggleProtein = (id: string) => {
    if (selectedProteins.includes(id)) {
      if (selectedProteins.length > 1) setSelectedProteins(selectedProteins.filter((p) => p !== id));
    } else {
      setSelectedProteins([...selectedProteins, id]);
    }
  };

  const toggleTopping = (id: string) => {
    if (selectedToppings.includes(id)) {
      setSelectedToppings(selectedToppings.filter((t) => t !== id));
    } else {
      setSelectedToppings([...selectedToppings, id]); // Illimité
    }
  };

  const toggleSauce = (id: string) => {
    if (selectedSauces.includes(id)) {
      if (selectedSauces.length > 1) setSelectedSauces(selectedSauces.filter((s) => s !== id));
    } else {
      setSelectedSauces([...selectedSauces, id]);
    }
  };

  // Calcul du prix unitaire dynamique
  const unitPrice = useMemo(() => {
    let basePrice = 3500; // Formule de base standard

    // Bases supplémentaires (+500 FCFA par base additionnelle au-delà de la 1ère)
    if (selectedBases.length > 1) {
      basePrice += (selectedBases.length - 1) * 500;
    }
    selectedBases.forEach((bId) => {
      const bObj = BASES.find((b) => b.id === bId);
      if (bObj) basePrice += bObj.extraPrice;
    });

    // Protéines (+1 000 FCFA par protéine additionnelle au-delà de la 1ère)
    if (selectedProteins.length > 1) {
      basePrice += (selectedProteins.length - 1) * 1000;
    }
    selectedProteins.forEach((pId) => {
      const pObj = PROTEINES.find((p) => p.id === pId);
      if (pObj) basePrice += pObj.extraPrice;
    });

    // Toppings illimités (+ supplément éventuel de l'ingrédient)
    selectedToppings.forEach((tId) => {
      const topObj = TOPPINGS.find((t) => t.id === tId);
      if (topObj) basePrice += topObj.extraPrice;
    });
    // Si plus de 4 toppings, chaque topping supplémentaire est à +300 FCFA
    if (selectedToppings.length > 4) {
      basePrice += (selectedToppings.length - 4) * 300;
    }

    // Sauces supplémentaires (+300 FCFA par sauce au-delà de la 1ère)
    if (selectedSauces.length > 1) {
      basePrice += (selectedSauces.length - 1) * 300;
    }

    return basePrice;
  }, [selectedBases, selectedProteins, selectedToppings, selectedSauces]);

  const totalPrice = unitPrice * quantity;

  // Noms pour le récapitulatif
  const basesNames = selectedBases.map((id) => BASES.find((b) => b.id === id)?.name).filter(Boolean).join(" + ");
  const proteinsNames = selectedProteins.map((id) => PROTEINES.find((p) => p.id === id)?.name).filter(Boolean).join(" + ");
  const toppingsNames = selectedToppings.map((id) => TOPPINGS.find((t) => t.id === id)?.name).filter(Boolean).join(", ");
  const saucesNames = selectedSauces.map((id) => SAUCES.find((s) => s.id === id)?.name).filter(Boolean).join(" & ");

  const handleAddToCart = () => {
    const customId = `salad-custom-${Date.now()}`;
    const title = customizedSignatureName 
      ? `Salade ${customizedSignatureName} Personnalisée` 
      : `Salade Sur-Mesure (${proteinsNames})`;

    add({
      id: customId,
      name: title,
      price: unitPrice,
      quantity,
      category: "Salades",
      image: "/assets/salade-classic-B-4lDVb2.jpg",
      description: `Bases : ${basesNames} | Protéines : ${proteinsNames} | Ingrédients (${selectedToppings.length}) : ${toppingsNames} | Sauces : ${saucesNames}${breadOption ? " | Pain inclus" : ""}`,
    });

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
    }, 2500);
  };

  const handleReset = () => {
    setSelectedBases(["b-verte"]);
    setSelectedProteins(["p-poulet"]);
    setSelectedToppings(["t-tomates", "t-mais", "t-concombre"]);
    setSelectedSauces(["s-yamooh"]);
    setBreadOption(true);
    setQuantity(1);
    setCustomizedSignatureName(null);
  };

  return (
    <>
      {/* SEO */}
      <title>Salad Builder | Composez votre salade sur-mesure — YAMOOH Douala</title>
      <meta
        name="description"
        content="Composez votre salade fraîche personnalisée à Douala : sélectionnez vos ingrédients en illimité, calculez le prix en temps réel et commandez en ligne."
      />
      <link rel="canonical" href="https://yamooh.com/builder" />

      {/* HEADER BUILDER */}
      <section className="bg-[#1E3A2B] text-white py-12 lg:py-16 relative overflow-hidden">
        <div className="container-tight relative z-10 text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 bg-[#D96B43] text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
            <ChefHat size={16} /> Configurateur Illimité Sur-Mesure
          </span>
          <h1 className="text-3xl sm:text-5xl font-display font-black tracking-tight mb-3">
            {customizedSignatureName ? `Personnaliser : ${customizedSignatureName}` : "Composez votre Salade Idéale"}
          </h1>
          <p className="text-white/85 text-sm sm:text-base font-light">
            Ajoutez autant d'ingrédients que vous souhaitez. Le prix s'ajuste automatiquement en temps réel et votre bol est assemblé minute à la Pharmacie Kotto.
          </p>
        </div>
      </section>

      {/* ZONE DE CONFIGURATION EN 2 COLONNES */}
      <section className="container-tight py-12 lg:py-16">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* COLONNE GAUCHE : LES ÉTAPES DE CHOIX (8 COLS) */}
          <div className="lg:col-span-8 space-y-10">
            {/* ÉTAPE 1 : LES BASES (MULTI-CHOIX) */}
            <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-card">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-[#1E3A2B] text-[#F2B705] flex items-center justify-center font-display font-bold text-sm">
                    1
                  </span>
                  <h3 className="text-xl font-display font-bold text-foreground">
                    Choisissez votre / vos Base(s)
                  </h3>
                </div>
                <span className="text-xs text-[#D96B43] font-bold">
                  {selectedBases.length} sélectionnée(s)
                </span>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {BASES.map((b) => {
                  const isSelected = selectedBases.includes(b.id);
                  return (
                    <button
                      key={b.id}
                      onClick={() => toggleBase(b.id)}
                      className={`p-3.5 rounded-2xl border text-left transition-all flex items-center gap-3.5 cursor-pointer ${
                        isSelected
                          ? "border-[#1E3A2B] bg-[#E3ECE6]/50 ring-2 ring-[#1E3A2B]"
                          : "border-border bg-card hover:bg-muted"
                      }`}
                    >
                      <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-gray-100 border border-border/50">
                        <img src={b.image} alt={b.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-bold text-sm text-foreground truncate">{b.name}</span>
                          {isSelected && <Check size={16} className="text-[#1E3A2B] shrink-0" />}
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{b.desc}</p>
                        {b.extraPrice > 0 && (
                          <span className="text-[11px] font-bold text-[#D96B43] mt-1 block">
                            +{b.extraPrice} FCFA
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ÉTAPE 2 : LES PROTÉINES (MULTI-CHOIX) */}
            <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-card">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-[#1E3A2B] text-[#F2B705] flex items-center justify-center font-display font-bold text-sm">
                    2
                  </span>
                  <h3 className="text-xl font-display font-bold text-foreground">
                    Choisissez votre / vos Protéine(s)
                  </h3>
                </div>
                <span className="text-xs text-[#D96B43] font-bold">
                  {selectedProteins.length} sélectionnée(s)
                </span>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {PROTEINES.map((p) => {
                  const isSelected = selectedProteins.includes(p.id);
                  return (
                    <button
                      key={p.id}
                      onClick={() => toggleProtein(p.id)}
                      className={`p-3.5 rounded-2xl border text-left transition-all flex items-center gap-3.5 cursor-pointer ${
                        isSelected
                          ? "border-[#1E3A2B] bg-[#E3ECE6]/50 ring-2 ring-[#1E3A2B]"
                          : "border-border bg-card hover:bg-muted"
                      }`}
                    >
                      <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-gray-100 border border-border/50">
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-bold text-sm text-foreground truncate">{p.name}</span>
                          {isSelected && <Check size={16} className="text-[#1E3A2B] shrink-0" />}
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{p.desc}</p>
                        {p.extraPrice > 0 ? (
                          <span className="text-[11px] font-bold text-[#D96B43] mt-1 block">
                            +{p.extraPrice} FCFA
                          </span>
                        ) : (
                          <span className="text-[10px] font-semibold text-green-700 mt-1 block">
                            Inclus dans la formule
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ÉTAPE 3 : LES TOPPINGS & GARNITURES (ILLIMITÉS) */}
            <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-card">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-[#1E3A2B] text-[#F2B705] flex items-center justify-center font-display font-bold text-sm">
                    3
                  </span>
                  <h3 className="text-xl font-display font-bold text-foreground">
                    Ajoutez vos Ingrédients Frais (Toppings Illimités)
                  </h3>
                </div>
                <span className="text-xs font-bold text-[#D96B43] bg-[#FAF0D8] px-3 py-1 rounded-full border border-[#F2B705]/40">
                  {selectedToppings.length} ingrédient(s)
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5">
                {TOPPINGS.map((t) => {
                  const isChecked = selectedToppings.includes(t.id);
                  return (
                    <button
                      key={t.id}
                      onClick={() => toggleTopping(t.id)}
                      className={`p-3 rounded-2xl border text-left transition-all flex flex-col items-center text-center cursor-pointer group ${
                        isChecked
                          ? "border-[#1E3A2B] bg-[#E3ECE6]/60 text-[#1E3A2B] ring-2 ring-[#1E3A2B]"
                          : "border-border bg-card hover:bg-muted text-foreground"
                      }`}
                    >
                      <div className="w-16 h-16 rounded-xl overflow-hidden mb-2 bg-gray-100 border border-border/40 shrink-0">
                        <img src={t.image} alt={t.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      </div>
                      <div className="flex items-center justify-center gap-1 w-full">
                        <span className="text-xs font-bold truncate">{t.name}</span>
                        {isChecked && <Check size={13} className="text-[#1E3A2B] shrink-0" />}
                      </div>
                      {t.extraPrice > 0 ? (
                        <span className="text-[10px] font-bold text-[#D96B43] mt-1 block">
                          +{t.extraPrice} FCFA
                        </span>
                      ) : (
                        <span className="text-[9px] text-green-700 font-semibold mt-1 block">Inclus</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ÉTAPE 4 : LA / LES SAUCE(S) ARTISANALE(S) */}
            <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-card">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-[#1E3A2B] text-[#F2B705] flex items-center justify-center font-display font-bold text-sm">
                    4
                  </span>
                  <h3 className="text-xl font-display font-bold text-foreground">
                    Sélectionnez votre / vos Sauce(s) Maison
                  </h3>
                </div>
                <span className="text-xs text-[#D96B43] font-bold">
                  {selectedSauces.length} sauce(s)
                </span>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {SAUCES.map((s) => {
                  const isSelected = selectedSauces.includes(s.id);
                  return (
                    <button
                      key={s.id}
                      onClick={() => toggleSauce(s.id)}
                      className={`p-3.5 rounded-2xl border text-left transition-all flex items-center gap-3.5 cursor-pointer ${
                        isSelected
                          ? "border-[#1E3A2B] bg-[#E3ECE6]/50 ring-2 ring-[#1E3A2B]"
                          : "border-border bg-card hover:bg-muted"
                      }`}
                    >
                      <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-gray-100 border border-border/50">
                        <img src={s.image} alt={s.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-bold text-sm text-foreground truncate">{s.name}</span>
                          {isSelected && <Check size={16} className="text-[#1E3A2B] shrink-0" />}
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{s.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* COLONNE DROITE : RÉSUMÉ DU BOL & COMMANDE EN TEMPS RÉEL (STICKY) */}
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <div className="bg-[#FAF7F2] border border-border rounded-3xl p-6 sm:p-8 shadow-card">
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <div>
                  <h4 className="font-display font-bold text-lg text-[#1E3A2B]">
                    {customizedSignatureName ? `Recette : ${customizedSignatureName}` : "Votre Création"}
                  </h4>
                  <span className="text-[10px] text-[#D96B43] font-bold">Récapitulatif en temps réel</span>
                </div>
                <button
                  onClick={handleReset}
                  title="Réinitialiser"
                  className="text-xs text-muted-foreground hover:text-[#D96B43] flex items-center gap-1 transition"
                >
                  <RotateCcw size={12} /> Réinitialiser
                </button>
              </div>

              {/* Détails de composition en direct */}
              <div className="py-5 space-y-3.5 text-xs">
                <div>
                  <span className="font-bold text-muted-foreground uppercase text-[10px] block">Base(s) ({selectedBases.length})</span>
                  <span className="font-semibold text-foreground text-sm">{basesNames}</span>
                </div>

                <div>
                  <span className="font-bold text-muted-foreground uppercase text-[10px] block">Protéine(s) ({selectedProteins.length})</span>
                  <span className="font-semibold text-foreground text-sm">{proteinsNames}</span>
                </div>

                <div>
                  <span className="font-bold text-muted-foreground uppercase text-[10px] block">Ingrédients & Toppings ({selectedToppings.length})</span>
                  <span className="font-semibold text-foreground text-xs leading-relaxed">
                    {toppingsNames || "Aucun topping sélectionné"}
                  </span>
                </div>

                <div>
                  <span className="font-bold text-muted-foreground uppercase text-[10px] block">Sauce(s) ({selectedSauces.length})</span>
                  <span className="font-semibold text-[#D96B43] text-sm">{saucesNames}</span>
                </div>

                {/* Option pain */}
                <div className="pt-3 border-t border-border flex items-center justify-between">
                  <div>
                    <span className="font-bold text-foreground">Petit pain artisanal</span>
                    <p className="text-[10px] text-muted-foreground">Inclus gratuitement</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={breadOption}
                    onChange={(e) => setBreadOption(e.target.checked)}
                    className="w-4 h-4 accent-[#1E3A2B] rounded cursor-pointer"
                  />
                </div>
              </div>

              {/* Quantité & Total calculé automatiquement */}
              <div className="pt-4 border-t border-border space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-foreground">Quantité</span>
                  <div className="flex items-center gap-2 bg-white border border-border rounded-full p-1 shadow-2xs">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-6 h-6 rounded-full bg-muted flex items-center justify-center hover:bg-border transition text-foreground"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="font-bold text-xs px-2 text-foreground">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-6 h-6 rounded-full bg-[#1E3A2B] text-white flex items-center justify-center hover:bg-[#162B20] transition"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs uppercase font-bold text-muted-foreground">Total à payer</span>
                  <span className="text-2xl font-black text-[#D96B43] font-display">
                    {totalPrice.toLocaleString("fr-FR")} FCFA
                  </span>
                </div>

                <button
                  onClick={handleAddToCart}
                  className={`w-full py-3.5 rounded-full font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-soft cursor-pointer ${
                    isSuccess
                      ? "bg-green-600 text-white"
                      : "bg-[#1E3A2B] hover:bg-[#D96B43] text-white"
                  }`}
                >
                  {isSuccess ? (
                    <>
                      <CheckCircle2 size={16} /> Ajouté au panier !
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={16} /> Ajouter ma création au panier
                    </>
                  )}
                </button>

                <p className="text-[10px] text-center text-muted-foreground leading-tight">
                  Préparé avec soin à la Pharmacie Kotto • Retrait sans attente ou livraison express
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Builder;
