import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { menu, MenuItem } from "../data/menu";
import { useCart } from "../contexts/CartContext";
import { 
  Search, 
  ChefHat, 
  Plus, 
  CheckCircle2, 
  Sparkles, 
  Utensils, 
  Leaf, 
  Coffee, 
  SlidersHorizontal,
  ArrowRight,
  Info
} from "lucide-react";

export const Carte = () => {
  const { add } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>("Tous");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [addedItem, setAddedItem] = useState<string | null>(null);

  const categories = ["Tous", "Salades", "Sandwichs", "Boissons", "Sauces"];

  const filteredItems = useMemo(() => {
    return menu.filter((item) => {
      const matchCategory =
        selectedCategory === "Tous" || item.category === selectedCategory;
      const matchSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.slogan && item.slogan.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleAddToCart = (item: MenuItem) => {
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

  return (
    <>
      {/* SEO */}
      <title>Notre Carte | YAMOOH Douala — Salades, Sandwichs & Boissons Fraîches</title>
      <meta
        name="description"
        content="Consultez le menu complet de Yamooh à Douala. 8 salades signatures, sandwichs gourmands, jus de fruits naturels (Bissap, Gingembre) et sauces artisanales maison."
      />
      <link rel="canonical" href="https://yamooh.com/carte" />

      {/* HEADER SECTION */}
      <section className="bg-[#1E3A2B] text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="container-tight relative z-10 text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 bg-white/10 text-[#F2B705] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-white/15">
            <Utensils size={14} /> Menu Fraîcheur & Fait Maison
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight mb-4">
            Notre Carte Gourmande
          </h1>
          <p className="text-white/85 text-base sm:text-lg leading-relaxed font-light">
            Préparé avec des produits frais du terroir camerounais, chaque plat allie équilibre nutritionnel, fraîcheur absolue et générosité.
          </p>
        </div>

        {/* Décoration de fond */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#F2B705_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      </section>

      {/* BANNIÈRE COMPOSITION SUR-MESURE */}
      <div className="bg-[#D96B43] text-white py-3.5 px-4 shadow-sm">
        <div className="container-tight flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2.5">
            <ChefHat size={20} className="shrink-0 text-[#F2B705]" />
            <span className="text-sm font-semibold">
              Envie de créer votre propre bol sur-mesure ?
            </span>
          </div>
          <Link
            to="/builder"
            className="bg-white text-[#D96B43] hover:bg-white/90 text-xs font-bold px-5 py-2 rounded-full transition shrink-0 flex items-center gap-1.5 shadow-sm"
          >
            <span>Accéder au Salad Builder</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* CONTENU PRINCIPAL & FILTRES */}
      <section className="container-tight py-12 lg:py-16">
        {/* BARRE DE RECHERCHE & CATÉGORIES */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-10">
          {/* Onglets Catégories */}
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? "bg-[#1E3A2B] text-white shadow-soft"
                    : "bg-card text-muted-foreground border border-border hover:bg-muted"
                }`}
              >
                {cat === "Tous" && "🍽️ Tous"}
                {cat === "Salades" && "🥗 Salades"}
                {cat === "Sandwichs" && "🥪 Sandwichs"}
                {cat === "Boissons" && "🍹 Boissons"}
                {cat === "Sauces" && "🥣 Sauces"}
              </button>
            ))}
          </div>

          {/* Recherche */}
          <div className="relative w-full md:w-72">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Rechercher un plat..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-card border border-border rounded-full pl-10 pr-4 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[#1E3A2B] transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* LISTE DES PRODUITS */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-card border border-border rounded-3xl p-8">
            <Utensils size={40} className="mx-auto text-muted-foreground mb-3 opacity-50" />
            <h3 className="text-lg font-bold text-foreground mb-1">Aucun produit trouvé</h3>
            <p className="text-xs text-muted-foreground mb-4">
              Aucun élément ne correspond à votre recherche "{searchQuery}".
            </p>
            <button
              onClick={() => {
                setSelectedCategory("Tous");
                setSearchQuery("");
              }}
              className="bg-[#1E3A2B] text-white text-xs font-bold px-5 py-2.5 rounded-full hover:bg-[#162B20] transition"
            >
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-card border border-border rounded-3xl p-5 shadow-card hover:shadow-elevated transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Image du produit avec badges */}
                  {item.image && (
                    <div className="relative aspect-4/3 w-full rounded-2xl overflow-hidden bg-[#FAF7F2] mb-4 flex items-center justify-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
                        <span className="text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#1E3A2B] text-white shadow-xs">
                          {item.badge || item.category}
                        </span>
                        {item.signature && (
                          <span className="text-[9px] font-bold px-2.5 py-1 rounded-full bg-[#D96B43] text-white shadow-xs flex items-center gap-1">
                            <Sparkles size={10} /> Signature
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Nom du plat */}
                  <h3 className="text-xl font-display font-bold text-foreground group-hover:text-[#D96B43] transition-colors mb-1">
                    {item.name}
                  </h3>

                  {/* Slogan */}
                  {item.slogan && (
                    <p className="text-xs text-[#D96B43] font-medium italic mb-2">
                      « {item.slogan} »
                    </p>
                  )}

                  {/* Description */}
                  <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                {/* Pied de la fiche : Prix & Actions */}
                <div className="pt-4 border-t border-border mt-auto">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] uppercase font-bold text-muted-foreground block">Prix</span>
                    <span className="text-lg font-black text-[#D96B43]">
                      {item.price.toLocaleString("fr-FR")} FCFA
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {item.signature ? (
                      <Link
                        to={`/builder?sig=${item.slug}`}
                        className="h-10 px-2 rounded-full bg-[#1E3A2B] hover:bg-[#D96B43] text-white border border-[#1E3A2B] hover:border-[#D96B43] font-bold text-xs transition flex items-center justify-center gap-1.5 text-center leading-tight shadow-xs group/btn cursor-pointer"
                      >
                        <ChefHat size={14} className="group-hover/btn:rotate-12 transition-transform shrink-0" />
                        <span className="truncate">Personnaliser ma salade</span>
                      </Link>
                    ) : (
                      <div />
                    )}

                    <button
                      onClick={() => handleAddToCart(item)}
                      className={`h-10 px-2 rounded-full font-bold text-xs transition shadow-xs flex items-center justify-center gap-1.5 text-center leading-tight cursor-pointer ${
                        !item.signature ? "col-span-2" : ""
                      } ${
                        addedItem === item.id
                          ? "bg-green-600 text-white border border-green-600"
                          : "bg-[#1E3A2B] hover:bg-[#D96B43] text-white border border-[#1E3A2B] hover:border-[#D96B43]"
                      }`}
                    >
                      {addedItem === item.id ? (
                        <>
                          <CheckCircle2 size={14} className="shrink-0" /> <span className="truncate">Ajouté !</span>
                        </>
                      ) : (
                        <>
                          <Plus size={14} className="shrink-0" /> <span className="truncate">Ajouter au panier</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* SECTION INFORMATIVE TRAITEUR & ALLERGÈNES */}
        <div className="grid md:grid-cols-2 gap-6 mt-16 pt-12 border-t border-border">
          <div className="bg-[#FAF7F2] border border-border rounded-3xl p-6 sm:p-8">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#D96B43] font-mono">
              Événements & Grands Groupes
            </span>
            <h4 className="text-xl font-display font-bold text-[#1E3A2B] mt-1 mb-2">
              Besoin de quantités pour votre entreprise ?
            </h4>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-4">
              Yamooh prépare des formules plateaux, salades box et buffets froids pour vos séminaires, déjeuners d'affaires ou fêtes privées.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/services-evenementiels"
                className="bg-[#1E3A2B] hover:bg-[#162B20] text-white text-xs font-bold px-5 py-2.5 rounded-full transition"
              >
                Offre Traiteur
              </Link>
              <Link
                to="/devis"
                className="border border-[#1E3A2B] text-[#1E3A2B] hover:bg-[#1E3A2B] hover:text-white text-xs font-bold px-5 py-2.5 rounded-full transition"
              >
                Devis sous 24h
              </Link>
            </div>
          </div>

          <div className="bg-card border border-border rounded-3xl p-6 sm:p-8">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#1E3A2B] font-mono">
              Santé & Transparence
            </span>
            <h4 className="text-xl font-display font-bold text-foreground mt-1 mb-2">
              Allergènes & Régimes Spéciaux
            </h4>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-4">
              Tous nos plats indiquent clairement les ingrédients. Vous pouvez consulter notre guide complet des allergènes ou composer sans restriction.
            </p>
            <Link
              to="/allergenes"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D96B43] hover:underline"
            >
              Consulter le tableau des allergènes <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Carte;
