import { useState } from "react";
import { Filter, X, Check, RotateCcw, SlidersHorizontal } from "lucide-react";

export interface FilterState {
  diet: string[];
  maxPrice: number | null;
  excludedAllergens: string[];
  sortBy: "default" | "price-asc" | "price-desc" | "name";
  onlyAvailable: boolean;
}

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  totalResults: number;
}

const DIET_OPTIONS = [
  { id: "veggie", label: "Végétarien / 100% Végétal", matchTag: ["Végétarien", "100% Végétarien", "100% Végétal"] },
  { id: "vegan", label: "Vegan / Végétalien", matchTag: ["Vegan"] },
  { id: "gluten-free", label: "Sans Gluten", matchTag: ["Sans Gluten"] },
  { id: "protein", label: "Riche en Protéines", matchTag: ["Protéiné", "Protéines", "Sportif"] },
  { id: "marine", label: "Poisson & Saveurs Marines", matchTag: ["Protéines marines", "Poisson Frais", "Détox"] },
  { id: "bestseller", label: "Best-sellers & Coup de cœur", matchTag: ["Best-seller", "Coup de cœur", "Signature du Chef"] },
];

const ALLERGEN_OPTIONS = [
  "Gluten",
  "Lait / Produits laitiers",
  "Arachides",
  "Œufs",
  "Poisson",
  "Crustacés",
  "Graines de sésame",
  "Moutarde",
  "Soja",
];

export const FilterDrawer = ({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  totalResults,
}: FilterDrawerProps) => {
  const [localFilters, setLocalFilters] = useState<FilterState>(filters);

  const handleDietToggle = (dietId: string) => {
    const next = localFilters.diet.includes(dietId)
      ? localFilters.diet.filter((d) => d !== dietId)
      : [...localFilters.diet, dietId];
    const updated = { ...localFilters, diet: next };
    setLocalFilters(updated);
    onFilterChange(updated);
  };

  const handleAllergenToggle = (allergen: string) => {
    const next = localFilters.excludedAllergens.includes(allergen)
      ? localFilters.excludedAllergens.filter((a) => a !== allergen)
      : [...localFilters.excludedAllergens, allergen];
    const updated = { ...localFilters, excludedAllergens: next };
    setLocalFilters(updated);
    onFilterChange(updated);
  };

  const handlePriceChange = (max: number | null) => {
    const updated = { ...localFilters, maxPrice: max };
    setLocalFilters(updated);
    onFilterChange(updated);
  };

  const handleSortChange = (sort: FilterState["sortBy"]) => {
    const updated = { ...localFilters, sortBy: sort };
    setLocalFilters(updated);
    onFilterChange(updated);
  };

  const handleReset = () => {
    const resetState: FilterState = {
      diet: [],
      maxPrice: null,
      excludedAllergens: [],
      sortBy: "default",
      onlyAvailable: false,
    };
    setLocalFilters(resetState);
    onFilterChange(resetState);
  };

  const activeFiltersCount =
    localFilters.diet.length +
    localFilters.excludedAllergens.length +
    (localFilters.maxPrice !== null ? 1 : 0) +
    (localFilters.sortBy !== "default" ? 1 : 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#15241C] text-foreground w-full max-w-md h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300">
        {/* HEADER DU VOLET */}
        <div className="p-6 border-b border-border flex items-center justify-between bg-secondary/30">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#3B8A49] text-white flex items-center justify-center">
              <SlidersHorizontal size={18} />
            </div>
            <div>
              <h2 className="font-display font-black text-lg tracking-tight">FILTRER LA SÉLECTION</h2>
              <p className="text-xs text-muted-foreground">
                {totalResults} {totalResults > 1 ? "produits correspondent" : "produit correspond"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground transition cursor-pointer"
            aria-label="Fermer les filtres"
          >
            <X size={20} />
          </button>
        </div>

        {/* CONTENU SCROLLABLE */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 divide-y divide-border/60">
          {/* 1. TRI */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-muted-foreground mb-3 font-mono">
              Trier par
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: "default", label: "Ordre par défaut" },
                { id: "price-asc", label: "Prix croissant" },
                { id: "price-desc", label: "Prix décroissant" },
                { id: "name", label: "Nom A-Z" },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handleSortChange(opt.id as any)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition text-left flex items-center justify-between cursor-pointer border ${
                    localFilters.sortBy === opt.id
                      ? "bg-[#3B8A49] text-white border-[#3B8A49] shadow-xs"
                      : "bg-background hover:bg-secondary border-border text-foreground"
                  }`}
                >
                  <span>{opt.label}</span>
                  {localFilters.sortBy === opt.id && <Check size={14} className="shrink-0 ml-1" />}
                </button>
              ))}
            </div>
          </div>

          {/* 2. RÉGIMES ET PRÉFÉRENCES */}
          <div className="pt-6">
            <h3 className="text-xs font-black uppercase tracking-wider text-muted-foreground mb-3 font-mono">
              Régimes & Préférences
            </h3>
            <div className="flex flex-wrap gap-2">
              {DIET_OPTIONS.map((diet) => {
                const isChecked = localFilters.diet.includes(diet.id);
                return (
                  <button
                    key={diet.id}
                    onClick={() => handleDietToggle(diet.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition border flex items-center gap-1.5 cursor-pointer ${
                      isChecked
                        ? "bg-[#3B8A49] text-white border-[#3B8A49]"
                        : "bg-background hover:bg-secondary text-foreground border-border"
                    }`}
                  >
                    {isChecked && <Check size={12} />}
                    <span>{diet.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. BUDGET MAXIMAL */}
          <div className="pt-6">
            <h3 className="text-xs font-black uppercase tracking-wider text-muted-foreground mb-3 font-mono">
              Budget par portion
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {[
                { max: null, label: "Tous" },
                { max: 3000, label: "< 3 000 FCFA" },
                { max: 5000, label: "≤ 5 000 FCFA" },
                { max: 8000, label: "≤ 8 000 FCFA" },
              ].map((b, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePriceChange(b.max)}
                  className={`px-2.5 py-2 rounded-xl text-xs font-bold transition text-center border cursor-pointer ${
                    localFilters.maxPrice === b.max
                      ? "bg-[#D96B43] text-white border-[#D96B43] shadow-xs"
                      : "bg-background hover:bg-secondary border-border text-foreground"
                  }`}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>

          {/* 4. ALLERGÈNES À EXCLURE */}
          <div className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-black uppercase tracking-wider text-muted-foreground font-mono">
                Sans ces allergènes
              </h3>
              <span className="text-[11px] text-muted-foreground">Exclure les produits contenant :</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {ALLERGEN_OPTIONS.map((allergen) => {
                const isExcluded = localFilters.excludedAllergens.includes(allergen);
                return (
                  <button
                    key={allergen}
                    onClick={() => handleAllergenToggle(allergen)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition border cursor-pointer ${
                      isExcluded
                        ? "bg-red-500/15 border-red-500 text-red-700 dark:text-red-300 font-bold"
                        : "bg-background border-border hover:bg-secondary text-muted-foreground"
                    }`}
                  >
                    {isExcluded ? `✕ Sans ${allergen}` : `Sans ${allergen}`}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* PIED DU VOLET */}
        <div className="p-6 border-t border-border bg-secondary/20 flex items-center gap-3">
          <button
            onClick={handleReset}
            disabled={activeFiltersCount === 0}
            className="px-4 py-3 rounded-full border border-border text-xs font-bold hover:bg-secondary transition flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <RotateCcw size={14} />
            <span>Réinitialiser</span>
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-[#3B8A49] hover:bg-[#2F6F3B] text-white py-3 px-6 rounded-full text-xs font-bold transition shadow-soft flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>VOIR LES {totalResults} PRODUITS</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterDrawer;
