import { useState } from "react";
import { Link } from "react-router-dom";
import { menu, MenuItem } from "../data/menu";
import { useCart } from "../contexts/CartContext";
import { 
  Sparkles, 
  ChefHat, 
  Plus, 
  CheckCircle2, 
  ArrowRight, 
  Award, 
  Utensils, 
  Flame, 
  Clock, 
  Heart,
  Droplet
} from "lucide-react";

export const Signature = () => {
  const { add } = useCart();
  const [addedItem, setAddedItem] = useState<string | null>(null);

  const signatures = menu.filter((m) => m.signature);
  const sauces = menu.filter((m) => m.category === "Sauces");

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
      <title>Les 8 Salades Signatures | YAMOOH Douala — Créations d'Exception</title>
      <meta
        name="description"
        content="Découvrez les 8 recettes signatures exclusives de Yamooh à Douala : L'Ibèrique, La Yamooh, L'Océanne, L'Atlas, La Terroire, L'Urbaine, La Bistrot et La Caprece."
      />
      <link rel="canonical" href="https://yamooh.com/signature" />

      {/* HERO SECTION SIGNATURES */}
      <section className="bg-[#1E3A2B] text-white py-16 lg:py-24 relative overflow-hidden">
        <div className="container-tight relative z-10 text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 bg-white/10 text-[#F2B705] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-white/15">
            <Award size={15} /> Savoir-Faire & Créations Étoilées
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight mb-6">
            Nos 8 Salades Signatures
          </h1>
          <p className="text-white/85 text-base sm:text-lg leading-relaxed font-light mb-8">
            Chaque recette signature est une œuvre d'équilibre : protéines nobles, légumes croquants du matin et assaisonnements exclusifs élaborés dans notre atelier à Douala.
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-xs font-semibold text-white/80">
            <span className="flex items-center gap-1.5 bg-white/10 px-3.5 py-1.5 rounded-full">
              <CheckCircle2 size={14} className="text-[#F2B705]" /> Préparées à la minute
            </span>
            <span className="flex items-center gap-1.5 bg-white/10 px-3.5 py-1.5 rounded-full">
              <CheckCircle2 size={14} className="text-[#F2B705]" /> Sauces artisanales maison
            </span>
            <span className="flex items-center gap-1.5 bg-white/10 px-3.5 py-1.5 rounded-full">
              <CheckCircle2 size={14} className="text-[#F2B705]" /> Portions copieuses & généreuses
            </span>
          </div>
        </div>

        {/* Décoration géométrique */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#F2B705_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      </section>

      {/* GRILLE DES 8 SIGNATURES */}
      <section className="container-tight py-16 lg:py-20">
        <div className="grid md:grid-cols-2 gap-8">
          {signatures.map((item, index) => (
            <div
              key={item.id}
              className="bg-card border border-border rounded-3xl overflow-hidden shadow-card hover:shadow-elevated transition-all flex flex-col justify-between group relative"
            >
              {item.image && (
                <div className="relative aspect-16/9 overflow-hidden bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  {item.badge && (
                    <span className="absolute top-3 left-3 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#FAF0D8] text-[#D96B43] border border-[#F2B705]/40 shadow-sm">
                      {item.badge}
                    </span>
                  )}
                  <span className="absolute top-3 right-3 text-xs font-black text-[#1E3A2B] bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
                    {item.price?.toLocaleString("fr-FR")} FCFA
                  </span>
                </div>
              )}
              <div className="p-6 sm:p-8">
                {/* En-tête de carte */}
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-[#1E3A2B] text-[#F2B705] flex items-center justify-center font-display font-bold text-xs">
                      0{index + 1}
                    </span>
                    <span className="text-xs font-bold text-[#1E3A2B] uppercase tracking-wider">
                      Signature Yamooh
                    </span>
                  </div>
                </div>

                {/* Nom & Slogan */}
                <Link to={`/notre-carte/${item.slug}`}>
                  <h3 className="text-2xl sm:text-3xl font-display font-black text-foreground group-hover:text-[#D96B43] transition-colors mb-1">
                    {item.name}
                  </h3>
                </Link>
                {item.slogan && (
                  <p className="text-xs sm:text-sm text-[#D96B43] font-medium italic mb-3">
                    « {item.slogan} »
                  </p>
                )}

                {/* Concept & ce que fait cette salade */}
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-4">
                  {item.concept || item.description}
                </p>

                {/* Bienfaits clés */}
                {item.benefits && item.benefits.length > 0 && (
                  <div className="mb-4 bg-[#FAF8F5] p-3 rounded-2xl border border-border">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#1E3A2B] block mb-1.5 flex items-center gap-1">
                      <Sparkles size={12} className="text-[#D96B43]" /> Ce que fait cette salade :
                    </span>
                    <ul className="space-y-1">
                      {item.benefits.slice(0, 2).map((b, idx) => (
                        <li key={idx} className="text-[11px] text-muted-foreground flex items-center gap-1.5">
                          <CheckCircle2 size={11} className="text-[#D96B43] shrink-0" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Ingrédients badges */}
                {item.composition && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {item.composition.slice(0, 4).map((ing, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-medium bg-white text-gray-700 px-2.5 py-0.5 rounded-full border border-gray-200"
                      >
                        {ing}
                      </span>
                    ))}
                    {item.composition.length > 4 && (
                      <span className="text-[10px] font-bold text-[#D96B43] self-center">
                        +{item.composition.length - 4} autres
                      </span>
                    )}
                  </div>
                )}

                {/* Lien direct vers la Fiche Descriptive Produit */}
                <div className="mb-4">
                  <Link
                    to={`/notre-carte/${item.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1E3A2B] hover:text-[#D96B43] transition group/link"
                  >
                    <span>Consulter la fiche descriptive & nutritionnelle complète</span>
                    <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* Actions : Fiche Produit & Bouton COMPOSER */}
              <div className="pt-6 border-t border-border grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Link
                  to={`/notre-carte/${item.slug}`}
                  className="h-11 px-4 rounded-full border-2 border-[#1E3A2B] text-[#1E3A2B] dark:text-white dark:border-white/20 hover:bg-[#1E3A2B] hover:text-white font-bold text-xs transition flex items-center justify-center gap-2 text-center leading-tight shadow-xs cursor-pointer"
                >
                  <span>Fiche descriptive</span>
                  <ArrowRight size={14} />
                </Link>

                <Link
                  to={`/builder?sig=${item.slug}`}
                  className="h-11 px-4 rounded-full bg-[#D96B43] hover:bg-[#c45b34] text-white border-2 border-[#D96B43] font-black uppercase tracking-wider text-xs transition flex items-center justify-center gap-2 shadow-soft group/btn text-center leading-tight cursor-pointer"
                >
                  <ChefHat size={16} className="group-hover/btn:rotate-12 transition-transform shrink-0" />
                  <span>COMPOSER</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* SECTION LES SAUCES ARTISANALES DU CHEF */}
        <div className="mt-20 pt-16 border-t border-border">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase font-mono tracking-widest font-bold text-[#D96B43]">
              L'Assaisonnement Secret
            </span>
            <h2 className="text-3xl font-display font-bold text-foreground mt-2">
              Nos Sauces Signatures Maison
            </h2>
            <p className="text-sm text-muted-foreground mt-2">
              Disponibles aussi en flacons individuels de 100ml pour prolonger l'expérience gourmande chez vous.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {sauces.map((sauce) => (
              <div
                key={sauce.id}
                className="bg-[#FAF7F2] border border-border rounded-3xl p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-[#E3ECE6] text-[#1E3A2B] flex items-center justify-center mb-4">
                    <Droplet size={20} />
                  </div>
                  <h4 className="text-lg font-display font-bold text-[#1E3A2B] mb-2">{sauce.name}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-4">{sauce.description}</p>
                </div>

                <div className="pt-4 border-t border-border/60 flex items-center justify-between">
                  <span className="text-sm font-bold text-[#1E3A2B]">
                    {sauce.price.toLocaleString("fr-FR")} FCFA
                  </span>
                  <button
                    onClick={() => handleAddToCart(sauce)}
                    className="bg-[#1E3A2B] hover:bg-[#D96B43] text-white text-xs font-bold px-3.5 py-1.5 rounded-full transition"
                  >
                    + Ajouter
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BANNIÈRE DEVIS TRAITEUR */}
        <div className="mt-16 bg-[#1E3A2B] text-white rounded-3xl p-8 sm:p-12 text-center max-w-3xl mx-auto">
          <Sparkles className="text-[#F2B705] mx-auto mb-3" size={32} />
          <h3 className="text-2xl sm:text-3xl font-display font-bold mb-3">
            Vous organisez un cocktail ou un déjeuner d'entreprise ?
          </h3>
          <p className="text-white/80 text-sm mb-6 max-w-xl mx-auto">
            Nous déclinons nos 8 signatures en mini-bols cocktails, plateaux individuels ou bars à salades complets à Douala.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/services-evenementiels"
              className="bg-[#D96B43] hover:bg-[#c45b34] text-white px-7 py-3 rounded-full font-bold text-xs transition shadow-soft"
            >
              Découvrir l'offre Traiteur
            </Link>
            <Link
              to="/devis"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-7 py-3 rounded-full font-bold text-xs transition"
            >
              Demander un devis personnalisé
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signature;
