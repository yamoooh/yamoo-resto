import { useState, useMemo, useEffect } from "react";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import { 
  Plus, 
  Minus,
  Check, 
  UtensilsCrossed, 
  Sparkles, 
  ArrowRight, 
  Info, 
  ShieldCheck, 
  Clock, 
  Truck,
  Leaf,
  SlidersHorizontal,
  FileText,
  ChefHat,
  HelpCircle,
  PhoneCall,
  CalendarCheck
} from "lucide-react";
import { getUniverseBySlug, UNIVERSES, Universe } from "../data/universes";
import { MenuItem } from "../data/menu";
import { useCart } from "../contexts/CartContext";
import { useData } from "../contexts/DataContext";
import Breadcrumb from "../components/Breadcrumb";
import ContextualSubNav from "../components/ContextualSubNav";
import FilterDrawer, { FilterState } from "../components/FilterDrawer";
import NotFound from "./NotFound";

export const UniverseCatalogue = () => {
  const { universeSlug, subSlug } = useParams<{ universeSlug: string; subSlug?: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { add } = useCart();
  const { getPublicProducts } = useData();
  const products = getPublicProducts();

  const [addedItem, setAddedItem] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [filters, setFilters] = useState<FilterState>({
    diet: [],
    maxPrice: null,
    excludedAllergens: [],
    sortBy: "default",
    onlyAvailable: false,
  });

  const pathUniverseSlug = location.pathname.split("/").filter(Boolean)[0] || "";
  const universe = getUniverseBySlug(universeSlug || pathUniverseSlug);

  // Scroll to top when universe or subSlug changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [universeSlug, subSlug, location.pathname]);

  // Handle Sub-category tab click
  const handleSelectSub = (slug: string) => {
    if (slug === "all") {
      navigate(`/${universe?.slug}`);
    } else {
      navigate(`/${universe?.slug}/${slug}`);
    }
  };

  // Add to cart handler
  const handleAddToCart = (e: React.MouseEvent, item: MenuItem) => {
    e.preventDefault();
    e.stopPropagation();

    if (item.price === null) {
      navigate("/devis");
      return;
    }

    add({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.image,
      category: item.category,
      description: item.description,
    });
    setAddedItem(item.id);
    setTimeout(() => setAddedItem(null), 1800);
  };

  // Filter products strictly based on Universe and Sub-rubric predicates
  const baseItems = useMemo(() => {
    if (!universe) return [];

    // If a specific sub-rubric is selected
    if (subSlug && subSlug !== "all") {
      const targetSub = universe.subRubrics.find((s) => s.slug === subSlug);
      if (targetSub) {
        return products.filter((item) => {
          if (targetSub.customPredicate) {
            return targetSub.customPredicate(item);
          }
          const matchCat = targetSub.categoryFilter.includes(item.category);
          if (!matchCat) return false;
          if (targetSub.subCategoryFilter && item.subCategory) {
            return targetSub.subCategoryFilter.includes(item.subCategory);
          }
          if (targetSub.tagFilter && item.tags) {
            return targetSub.tagFilter.some((t) => item.tags?.includes(t));
          }
          return true;
        });
      }
    }

    // Otherwise, collect all items belonging to any sub-rubric of this universe
    const allMatching = new Map<string, MenuItem>();

    universe.subRubrics.forEach((sub) => {
      products.forEach((item) => {
        let isMatch = false;
        if (sub.customPredicate) {
          isMatch = sub.customPredicate(item);
        } else {
          const matchCat = sub.categoryFilter.includes(item.category);
          if (matchCat) {
            if (sub.subCategoryFilter && item.subCategory) {
              isMatch = sub.subCategoryFilter.includes(item.subCategory);
            } else if (sub.tagFilter && item.tags) {
              isMatch = sub.tagFilter.some((t) => item.tags?.includes(t));
            } else {
              isMatch = true;
            }
          }
        }
        if (isMatch) {
          allMatching.set(item.id, item);
        }
      });
    });

    return Array.from(allMatching.values());
  }, [universe, subSlug, products]);

  // Apply secondary interactive filters
  const filteredItems = useMemo(() => {
    return baseItems
      .filter((item) => {
        // Price Filter
        if (filters.maxPrice !== null && item.price !== null && item.price > filters.maxPrice) {
          return false;
        }

        // Allergens Filter
        if (filters.excludedAllergens.length > 0 && item.allergens) {
          const hasExcluded = item.allergens.some((a) =>
            filters.excludedAllergens.some((ex) => a.toLowerCase().includes(ex.toLowerCase()))
          );
          if (hasExcluded) return false;
        }

        // Diet / Preferences Filter
        if (filters.diet.length > 0) {
          const matchesDiet = filters.diet.some((d) => {
            if (d === "veggie") {
              return item.tags?.some((t) => t.toLowerCase().includes("végé")) || item.badge?.includes("Végé");
            }
            if (d === "vegan") {
              return item.tags?.some((t) => t.toLowerCase().includes("vegan")) || item.badge?.includes("Vegan");
            }
            if (d === "gluten-free") {
              return (
                item.tags?.some((t) => t.toLowerCase().includes("sans gluten")) ||
                !item.allergens?.some((a) => a.toLowerCase().includes("gluten"))
              );
            }
            if (d === "protein") {
              return item.tags?.some((t) => t.toLowerCase().includes("protéin") || t.toLowerCase().includes("sport"));
            }
            if (d === "marine") {
              return (
                item.tags?.some((t) => t.toLowerCase().includes("marin") || t.toLowerCase().includes("poisson")) ||
                item.allergens?.some((a) => a.toLowerCase().includes("poisson") || a.toLowerCase().includes("crustacé"))
              );
            }
            if (d === "bestseller") {
              return item.signature || item.badge?.includes("Best-seller") || item.tags?.includes("Coup de cœur");
            }
            return true;
          });
          if (!matchesDiet) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === "price-asc") {
          return (a.price || 0) - (b.price || 0);
        }
        if (filters.sortBy === "price-desc") {
          return (b.price || 0) - (a.price || 0);
        }
        if (filters.sortBy === "name") {
          return a.name.localeCompare(b.name);
        }
        return 0;
      });
  }, [baseItems, filters]);

  const activeFilterCount =
    filters.diet.length +
    filters.excludedAllergens.length +
    (filters.maxPrice !== null ? 1 : 0) +
    (filters.sortBy !== "default" ? 1 : 0);

  if (!universe) {
    return <NotFound />;
  }

  const currentSub = universe.subRubrics.find((s) => s.slug === subSlug);

  return (
    <>
      {/* SEO META */}
      <title>{`${currentSub ? currentSub.name : universe.name} | YAMOOH Douala`}</title>
      <meta name="description" content={currentSub ? currentSub.shortDesc : universe.heroDescription} />
      <link rel="canonical" href={`https://www.yamooh.com/${universe.slug}${subSlug ? `/${subSlug}` : ""}`} />

      {/* 1. HERO SECTION DE L'UNIVERS */}
      <section className="relative text-white py-14 lg:py-24 overflow-hidden">
        {/* Background Image sans filtre ni opacité (100% visible) */}
        <img
          src={currentSub?.image || universe.image}
          alt={currentSub ? currentSub.name : universe.name}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        <div className="container-tight relative z-10">
          <div className="mb-4">
            <Breadcrumb
              items={[
                { label: "Carte & Univers", to: "/notre-carte" },
                { label: universe.shortTitle, to: subSlug ? `/${universe.slug}` : undefined },
                ...(currentSub ? [{ label: currentSub.name }] : []),
              ]}
            />
          </div>

          <div className="max-w-2xl bg-[#1E3A2B]/80 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-white/15 shadow-2xl space-y-4">
            <div className="flex items-center gap-2">
              <span className="inline-block bg-[#F2B705] text-[#1E3A2B] px-3.5 py-1 rounded-full text-xs font-mono font-black uppercase tracking-wider shadow-sm">
                {universe.badge}
              </span>
              <span className="text-xs font-mono text-white/90 font-bold">
                UNIVERS {universe.number}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight leading-tight">
              {currentSub ? currentSub.name : universe.name}
            </h1>
            <p className="text-white/95 text-base sm:text-lg leading-relaxed font-normal">
              {currentSub ? currentSub.shortDesc : universe.heroDescription}
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-bold text-[#F2B705]">
              <span>📍 Fait maison chaque matin — Douala, Pharmacie Kotto</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BARRE CONTEXTUELLE DE NAVIGATION & FILTRES (STICKY) */}
      <ContextualSubNav
        universe={universe}
        activeSubSlug={subSlug}
        onSelectSub={handleSelectSub}
        onOpenFilter={() => setIsFilterOpen(true)}
        activeFilterCount={activeFilterCount}
      />

      {/* 3. GRILLE DE PRODUITS CATALOGUE */}
      <section className="py-12 lg:py-16 bg-background">
        <div className="container-tight">
          {/* Entête du catalogue avec compteur */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-border">
            <div>
              <h2 className="font-display font-black text-2xl tracking-tight text-foreground">
                {currentSub ? currentSub.name : `Tous les produits (${universe.shortTitle})`}
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                {filteredItems.length} {filteredItems.length > 1 ? "références disponibles" : "référence disponible"}
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsFilterOpen(true)}
                className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary/80 text-foreground px-4 py-2 rounded-full text-xs font-bold transition border border-border cursor-pointer shadow-xs"
              >
                <SlidersHorizontal size={14} className="text-[#D96B43]" />
                <span>Affiner ({activeFilterCount})</span>
              </button>
            </div>
          </div>

          {/* Grille de produits */}
          {filteredItems.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map((item) => {
                const isSignature = item.signature === true;
                const isAdded = addedItem === item.id;

                return (
                  <div
                    key={item.id}
                    className="bg-card text-card-foreground rounded-3xl overflow-hidden border border-border/70 hover:border-[#1E3A2B]/40 hover:shadow-xl transition-all duration-300 flex flex-col group"
                  >
                    {/* Image & Badges */}
                    <div className="relative aspect-4/3 overflow-hidden bg-secondary/30">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                          <UtensilsCrossed size={32} />
                        </div>
                      )}

                      {/* Badge Flottant */}
                      {item.badge && (
                        <span className="absolute top-3 left-3 bg-[#1E3A2B] text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md">
                          {item.badge}
                        </span>
                      )}

                      {/* Calories ou Nutri Info */}
                      {item.calories && (
                        <span className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-xs text-white text-[10px] font-mono px-2 py-0.5 rounded-md">
                          {item.calories}
                        </span>
                      )}
                    </div>

                    {/* Contenu */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-display font-bold text-base text-foreground leading-snug group-hover:text-[#D96B43] transition">
                            <Link to={`/notre-carte/${item.slug || item.id}`}>
                              {item.name}
                            </Link>
                          </h3>
                        </div>

                        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                          {item.description}
                        </p>

                        {/* Composition Chips */}
                        {item.composition && item.composition.length > 0 && (
                          <div className="flex flex-wrap gap-1 pt-1">
                            {item.composition.slice(0, 3).map((ing, idx) => (
                              <span
                                key={idx}
                                className="text-[10px] bg-secondary text-secondary-foreground px-2 py-0.5 rounded-md font-medium"
                              >
                                {ing}
                              </span>
                            ))}
                            {item.composition.length > 3 && (
                              <span className="text-[10px] text-muted-foreground self-center">
                                +{item.composition.length - 3}
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Prix & Boutons d'action harmonisés */}
                      <div className="pt-3 border-t border-border/60 space-y-3">
                        <div className="flex items-baseline justify-between">
                          <span className="text-xs text-muted-foreground font-mono">Prix unitaire</span>
                          <span className="font-display font-black text-lg text-[#1E3A2B] dark:text-[#F2B705]">
                            {item.price !== null ? `${item.price.toLocaleString("fr-FR")} FCFA` : "Sur devis"}
                          </span>
                        </div>

                        {/* BOUTONS SELON LE TYPE DE PRODUIT */}
                        {isSignature ? (
                          <div className="grid grid-cols-2 gap-2">
                            {/* Bouton 1 : Fiche descriptive produit */}
                            <Link
                              to={`/notre-carte/${item.slug || item.id}`}
                              className="w-full inline-flex items-center justify-center gap-1.5 border-2 border-[#1E3A2B] text-[#1E3A2B] dark:text-white dark:border-white/20 hover:bg-[#1E3A2B] hover:text-white text-xs font-bold py-2.5 px-3 rounded-full transition text-center shadow-xs"
                            >
                              <FileText size={13} />
                              <span>Fiche</span>
                            </Link>

                            {/* Bouton 2 : COMPOSER (Builder direct avec recette préchargée) */}
                            <Link
                              to={`/builder?sig=${item.slug || item.id}`}
                              className="w-full inline-flex items-center justify-center gap-1.5 bg-[#D96B43] hover:bg-[#c45b34] text-white text-xs font-black uppercase tracking-wider py-2.5 px-3 rounded-full transition text-center shadow-soft border-2 border-[#D96B43]"
                            >
                              <ChefHat size={14} />
                              <span>COMPOSER</span>
                            </Link>
                          </div>
                        ) : item.price !== null ? (
                          <div className="grid grid-cols-2 gap-2">
                            <Link
                              to={`/notre-carte/${item.slug || item.id}`}
                              className="w-full inline-flex items-center justify-center gap-1 border-2 border-border hover:border-foreground text-foreground text-xs font-bold py-2.5 px-3 rounded-full transition text-center"
                            >
                              <span>Détails</span>
                            </Link>
                            <button
                              onClick={(e) => handleAddToCart(e, item)}
                              className={`w-full inline-flex items-center justify-center gap-1.5 text-xs font-bold py-2.5 px-3 rounded-full transition text-center border-2 cursor-pointer ${
                                isAdded
                                  ? "bg-green-600 border-green-600 text-white"
                                  : "bg-[#1E3A2B] hover:bg-[#162a1f] border-[#1E3A2B] text-white shadow-soft"
                              }`}
                            >
                              {isAdded ? (
                                <>
                                  <Check size={14} />
                                  <span>Ajouté !</span>
                                </>
                              ) : (
                                <>
                                  <Plus size={14} />
                                  <span>Ajouter</span>
                                </>
                              )}
                            </button>
                          </div>
                        ) : (
                          <Link
                            to="/devis"
                            className="w-full inline-flex items-center justify-center gap-2 bg-[#D96B43] hover:bg-[#c45b34] text-white text-xs font-bold py-2.5 px-4 rounded-full transition text-center shadow-soft"
                          >
                            <span>Demander un devis sur mesure</span>
                            <ArrowRight size={14} />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : baseItems.length === 0 ? (
            /* EMPTY STATE POUR CATÉGORIES EN COURS D'ARRIVAGE OU SUR DEVIS */
            <div className="bg-gradient-to-br from-secondary/40 to-secondary/10 border border-border rounded-3xl p-10 sm:p-14 text-center max-w-xl mx-auto space-y-6 shadow-sm">
              <div className="w-16 h-16 rounded-full bg-[#1E3A2B]/10 text-[#1E3A2B] dark:text-[#F2B705] mx-auto flex items-center justify-center shadow-inner">
                <Sparkles size={32} />
              </div>
              <div className="space-y-2">
                <h3 className="font-display font-black text-xl sm:text-2xl text-foreground">
                  Cette sélection arrive très bientôt chez YAMOOH
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
                  Nous peaufinons actuellement cette gamme pour vos réceptions à Douala. Besoin d'une prestation traiteur personnalisée dès maintenant ?
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <Link
                  to="/devis"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#1E3A2B] hover:bg-[#162a1f] text-white px-6 py-3 rounded-full text-xs font-bold transition shadow-soft"
                >
                  <CalendarCheck size={16} />
                  <span>Demander un devis sur mesure</span>
                </Link>
                <Link
                  to="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-background hover:bg-secondary text-foreground border border-border px-6 py-3 rounded-full text-xs font-bold transition"
                >
                  <PhoneCall size={16} />
                  <span>Nous contacter</span>
                </Link>
              </div>
            </div>
          ) : (
            /* EMPTY STATE FILTRE AUCUN RÉSULTAT */
            <div className="bg-secondary/40 border border-border rounded-3xl p-12 text-center max-w-lg mx-auto space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#1E3A2B]/10 text-[#1E3A2B] mx-auto flex items-center justify-center">
                <SlidersHorizontal size={24} />
              </div>
              <h3 className="font-display font-bold text-lg text-foreground">
                Aucun produit ne correspond à vos filtres
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Essayez d'élargir vos critères de recherche ou réinitialisez les filtres pour découvrir toutes nos propositions.
              </p>
              <button
                onClick={() =>
                  setFilters({
                    diet: [],
                    maxPrice: null,
                    excludedAllergens: [],
                    sortBy: "default",
                    onlyAvailable: false,
                  })
                }
                className="bg-[#1E3A2B] text-white px-6 py-2.5 rounded-full text-xs font-bold hover:bg-[#162a1f] transition cursor-pointer"
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 4. DÉCOUVREZ ÉGALEMENT (NAVIGATION CROISÉE ENTRE SOUS-RUBRIQUES DE L'UNIVERS) */}
      {universe.subRubrics.length > 1 && (
        <section className="py-12 bg-secondary/30 border-t border-border">
          <div className="container-tight">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#D96B43]">
                  EXPLORATION
                </span>
                <h3 className="font-display font-black text-xl sm:text-2xl text-foreground mt-0.5">
                  Découvrez également dans {universe.shortTitle}
                </h3>
              </div>
            </div>

            <div
              className={`grid gap-6 ${
                universe.subRubrics.length === 2
                  ? "grid-cols-1 sm:grid-cols-2"
                  : universe.subRubrics.length === 3
                  ? "grid-cols-1 sm:grid-cols-3"
                  : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
              }`}
            >
              {universe.subRubrics
                .filter((sub) => sub.slug !== subSlug)
                .map((sub) => (
                  <Link
                    key={sub.id}
                    to={`/${universe.slug}/${sub.slug}`}
                    className="group bg-card text-card-foreground rounded-2xl overflow-hidden border border-border hover:border-[#1E3A2B]/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="relative aspect-16/10 overflow-hidden bg-secondary">
                      <img
                        src={sub.image}
                        alt={sub.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70" />
                      <span className="absolute bottom-3 left-3 text-xs font-display font-black text-white uppercase tracking-tight">
                        {sub.name}
                      </span>
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                        {sub.shortDesc}
                      </p>
                      <div className="pt-2 flex items-center justify-between text-xs font-bold text-[#1E3A2B] dark:text-[#F2B705] group-hover:text-[#D96B43] transition-colors">
                        <span className="text-[11px] font-mono uppercase tracking-wider">Explorer la gamme</span>
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. BANDEAU RÉASSURANCE & ENGAGEMENTS YAMOOH */}
      <section className="bg-secondary/50 border-t border-border py-12">
        <div className="container-tight grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center sm:text-left">
          <div className="flex items-start gap-4 p-4 rounded-2xl bg-background border border-border">
            <div className="w-10 h-10 rounded-xl bg-[#1E3A2B]/10 text-[#1E3A2B] dark:text-[#F2B705] flex items-center justify-center shrink-0">
              <Leaf size={20} />
            </div>
            <div>
              <h4 className="font-display font-bold text-sm text-foreground">Fraîcheur Quotidienne</h4>
              <p className="text-xs text-muted-foreground mt-1">
                Ingrédients coupés et cuisinés chaque matin à la commande.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-2xl bg-background border border-border">
            <div className="w-10 h-10 rounded-xl bg-[#1E3A2B]/10 text-[#1E3A2B] dark:text-[#F2B705] flex items-center justify-center shrink-0">
              <Truck size={20} />
            </div>
            <div>
              <h4 className="font-display font-bold text-sm text-foreground">Livraison Douala Express</h4>
              <p className="text-xs text-muted-foreground mt-1">
                Directement à votre bureau ou à domicile à Akwa, Bonanjo, Kotto, etc.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-2xl bg-background border border-border">
            <div className="w-10 h-10 rounded-xl bg-[#1E3A2B]/10 text-[#1E3A2B] dark:text-[#F2B705] flex items-center justify-center shrink-0">
              <Clock size={20} />
            </div>
            <div>
              <h4 className="font-display font-bold text-sm text-foreground">Devis Rapide sous 2h</h4>
              <p className="text-xs text-muted-foreground mt-1">
                Pour vos buffets, réceptions et événements d'entreprise.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-2xl bg-background border border-border">
            <div className="w-10 h-10 rounded-xl bg-[#1E3A2B]/10 text-[#1E3A2B] dark:text-[#F2B705] flex items-center justify-center shrink-0">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h4 className="font-display font-bold text-sm text-foreground">100% Personnalisable</h4>
              <p className="text-xs text-muted-foreground mt-1">
                Composez vos salades et formules selon vos envies et régimes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ CONTEXTUELLE DE L'UNIVERS */}
      {universe.faqs && universe.faqs.length > 0 && (
        <section className="py-14 bg-background border-t border-border">
          <div className="container-tight max-w-4xl">
            <div className="text-center space-y-3 mb-10">
              <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#D96B43]">
                <HelpCircle size={15} />
                <span>Questions Fréquentes</span>
              </span>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-foreground">
                Tout savoir sur notre offre {universe.shortTitle}
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Retrouvez les réponses aux questions les plus courantes pour cet univers.
              </p>
            </div>

            <div className="space-y-4">
              {universe.faqs.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={index}
                    className="border border-border rounded-2xl overflow-hidden bg-card transition-colors"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      className="w-full flex items-center justify-between p-5 text-left font-display font-bold text-sm sm:text-base text-foreground hover:text-[#D96B43] transition cursor-pointer"
                    >
                      <span>{faq.question}</span>
                      <span className="p-1 rounded-full bg-secondary shrink-0 ml-4">
                        {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 text-xs sm:text-sm text-muted-foreground leading-relaxed border-t border-border/50 pt-3">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 7. CONTACT, CONSEILS & DEVIS TRAITEUR SUR-MESURE */}
      <section className="py-12 bg-gradient-to-r from-[#1E3A2B] to-[#2C5E43] text-white">
        <div className="container-tight flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#F2B705]">
              BESOIN D'ACCOMPAGNEMENT OU D'UN CONSEIL ?
            </span>
            <h3 className="font-display font-black text-xl sm:text-2xl">
              Une commande importante ou un événement à Douala ?
            </h3>
            <p className="text-xs sm:text-sm text-white/80 max-w-xl">
              Notre équipe vous oriente sur les quantités idéales et conçoit des propositions adaptées à vos séminaires, pauses déjeuners et réceptions.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-5 py-3.5 rounded-full text-xs sm:text-sm font-bold transition"
            >
              <PhoneCall size={16} />
              <span>Nous contacter</span>
            </Link>
            <Link
              to="/devis"
              className="inline-flex items-center gap-2 bg-[#D96B43] hover:bg-[#c45b34] text-white px-6 py-3.5 rounded-full text-xs sm:text-sm font-black uppercase tracking-wider transition shadow-lg"
            >
              <span>Demander un devis traiteur</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* VOLET DE FILTRES LATÉRAL */}
      <FilterDrawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        onFilterChange={setFilters}
        totalResults={filteredItems.length}
      />
    </>
  );
};

export default UniverseCatalogue;

