import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { 
  ShoppingBag, 
  CheckCircle2, 
  ChefHat, 
  ArrowLeft, 
  Phone, 
  Flame, 
  Leaf, 
  ShieldCheck, 
  Info, 
  Plus, 
  Minus,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { MenuItem } from "../data/menu";
import { useCart } from "../contexts/CartContext";
import { useData } from "../contexts/DataContext";
import Breadcrumb from "../components/Breadcrumb";

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { add } = useCart();
  const { getProductBySlug, getPublicProducts } = useData();
  const [quantity, setQuantity] = useState<number>(1);
  const [addedNotification, setAddedNotification] = useState<boolean>(false);

  const product = slug ? getProductBySlug(slug) : undefined;

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center py-20 px-4 text-center">
        <h1 className="text-3xl font-display font-bold text-[#1E3A2B] mb-4">Produit non trouvé</h1>
        <p className="text-gray-600 mb-8 max-w-md">
          Ce produit n'est pas disponible ou l'adresse demandée est incorrecte.
        </p>
        <Link
          to="/notre-carte"
          className="inline-flex items-center gap-2 bg-[#1E3A2B] text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-[#2b513d] transition"
        >
          <ArrowLeft size={16} />
          <span>Retour à notre carte</span>
        </Link>
      </div>
    );
  }

  const allPublic = getPublicProducts();
  const similarProducts = allPublic
    .filter((item) => item.category === product.category && item.id !== product.id)
    .slice(0, 3);

  const handleAddToCart = () => {
    if (product.price === null) {
      // Pour les produits sur devis, rediriger vers devis
      navigate(`/devis?prestation=${encodeURIComponent(product.name)}`);
      return;
    }

    add({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.image,
      category: product.category,
      description: product.description,
    });
    setAddedNotification(true);
    setTimeout(() => setAddedNotification(false), 2500);
  };

  const whatsappMessage = encodeURIComponent(
    `Bonjour YAMOOH, je souhaite commander : ${quantity}x ${product.name} (${product.price ? `${(product.price * quantity).toLocaleString()} FCFA` : "Sur devis"}). Est-ce disponible ?`
  );

  // Données structurées JSON-LD
  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "image": product.image || "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    "brand": {
      "@type": "Brand",
      "name": "YAMOOH"
    },
    ...(product.price && {
      "offers": {
        "@type": "Offer",
        "url": `https://www.yamooh.com/notre-carte/${product.slug}`,
        "priceCurrency": "XAF",
        "price": product.price,
        "availability": "https://schema.org/InStock",
        "itemCondition": "https://schema.org/NewCondition"
      }
    })
  };

  return (
    <>
      {/* Balises SEO uniques */}
      <title>{`${product.name} | Notre Carte YAMOOH Douala`}</title>
      <meta
        name="description"
        content={`${product.name} chez YAMOOH à Douala : ${product.description} Préparé à la commande à Kotto. Commandez en ligne ou via WhatsApp.`}
      />
      <link rel="canonical" href={`https://www.yamooh.com/notre-carte/${product.slug}`} />

      {/* JSON-LD Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-[#FAF8F5] min-h-screen py-10 lg:py-16">
        <div className="container-tight mx-auto px-4">
          {/* Fil d'ariane */}
          <div className="mb-6">
            <Breadcrumb
              items={[
                { label: "Notre Carte", path: "/notre-carte" },
                { label: product.category, path: `/notre-carte#${product.category.toLowerCase().replace(/\s+/g, "-")}` },
                { label: product.name }
              ]}
            />
          </div>

          {/* Grille Principale Produit */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 p-6 lg:p-12">
              {/* Visuel Produit */}
              <div className="space-y-4">
                <div className="relative aspect-square sm:aspect-4/3 lg:aspect-square rounded-2xl overflow-hidden bg-gray-100 shadow-inner">
                  <img
                    src={product.image || "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=900&q=80"}
                    alt={`${product.name} — Préparation fraîche YAMOOH à Douala`}
                    className="w-full h-full object-cover"
                  />
                  {product.badge && (
                    <span className="absolute top-4 left-4 bg-[#1E3A2B] text-white text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow">
                      {product.badge}
                    </span>
                  )}
                  {product.signature && (
                    <span className="absolute top-4 right-4 bg-[#D96B43] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow flex items-center gap-1">
                      <Sparkles size={13} />
                      Signature
                    </span>
                  )}
                </div>

                {/* Badge fraîcheur & Lieu de préparation */}
                <div className="flex items-center gap-3 bg-[#E3ECE6]/60 p-4 rounded-2xl text-xs text-[#1E3A2B] border border-[#1E3A2B]/10">
                  <ShieldCheck size={22} className="text-[#1E3A2B] shrink-0" />
                  <div>
                    <strong className="block font-bold">Fraîcheur & Traçabilité Garantie YAMOOH</strong>
                    <span className="text-muted-foreground text-[11px]">
                      Préparé à la minute dans notre atelier de Douala (Pharmacie Kotto) avec des ingrédients maraîchers frais réceptionnés chaque matin.
                    </span>
                  </div>
                </div>

                {/* Conseil du Chef si disponible */}
                {product.chefTip && (
                  <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#D96B43]/20 text-xs text-foreground flex items-start gap-3">
                    <ChefHat size={20} className="text-[#D96B43] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-bold text-[#D96B43] uppercase tracking-wider text-[10px]">
                        Le Conseil du Chef Yamooh
                      </strong>
                      <p className="text-muted-foreground mt-0.5 leading-relaxed">{product.chefTip}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Détails, Fiche Produit & Commande */}
              <div className="flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#D96B43] bg-[#D96B43]/10 px-3 py-1 rounded-full">
                      {product.category}
                    </span>
                    {product.badge && (
                      <span className="text-xs font-bold uppercase tracking-wider text-[#1E3A2B] bg-[#E3ECE6] px-3 py-1 rounded-full">
                        {product.badge}
                      </span>
                    )}
                  </div>

                  <h1 className="text-3xl sm:text-4xl font-display font-black text-[#1E3A2B] tracking-tight mb-2">
                    {product.name}
                  </h1>

                  {product.slogan && (
                    <p className="text-sm italic font-serif text-[#D96B43] font-medium mb-4">
                      « {product.slogan} »
                    </p>
                  )}

                  {/* Prix */}
                  <div className="flex items-baseline gap-3 mb-6 pb-4 border-b border-gray-100">
                    {product.price !== null ? (
                      <>
                        <span className="text-3xl sm:text-4xl font-black text-[#D96B43]">
                          {product.price.toLocaleString()} FCFA
                        </span>
                        <span className="text-xs text-muted-foreground font-medium">TTC / portion copieuse</span>
                      </>
                    ) : (
                      <span className="text-2xl font-bold text-[#1E3A2B] bg-[#E3ECE6] px-4 py-2 rounded-xl">
                        Sur devis personnalisé
                      </span>
                    )}
                  </div>

                  {/* Concept & Ce que fait cette salade */}
                  <div className="mb-6 space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                      <Sparkles size={14} className="text-[#D96B43]" />
                      L'Esprit & Le Concept de la Recette
                    </h3>
                    <p className="text-foreground leading-relaxed text-sm">
                      {product.concept || product.description}
                    </p>
                  </div>

                  {/* Bienfaits clés & Nutrition */}
                  {product.benefits && product.benefits.length > 0 && (
                    <div className="mb-6 bg-[#FAF7F2] p-4 rounded-2xl border border-border">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-[#1E3A2B] mb-2.5 flex items-center gap-1.5">
                        <Flame size={14} className="text-[#D96B43]" />
                        Ce que cette salade vous apporte :
                      </h3>
                      <ul className="space-y-1.5">
                        {product.benefits.map((b, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-xs text-foreground">
                            <CheckCircle2 size={13} className="text-[#D96B43] shrink-0" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Tableau des macros nutritionnelles */}
                  {product.nutrition && (
                    <div className="mb-6 p-4 bg-white rounded-2xl border border-gray-200">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                        Repères Nutritionnels Moyens (par portion)
                      </h3>
                      <div className="grid grid-cols-5 gap-2 text-center">
                        <div className="bg-[#FAF8F5] p-2 rounded-xl border border-gray-100">
                          <span className="text-[10px] uppercase font-bold text-muted-foreground block">Énergie</span>
                          <span className="text-xs sm:text-sm font-black text-[#D96B43]">{product.nutrition.calories}</span>
                        </div>
                        <div className="bg-[#FAF8F5] p-2 rounded-xl border border-gray-100">
                          <span className="text-[10px] uppercase font-bold text-muted-foreground block">Protéines</span>
                          <span className="text-xs sm:text-sm font-bold text-[#1E3A2B]">{product.nutrition.proteins}</span>
                        </div>
                        <div className="bg-[#FAF8F5] p-2 rounded-xl border border-gray-100">
                          <span className="text-[10px] uppercase font-bold text-muted-foreground block">Glucides</span>
                          <span className="text-xs sm:text-sm font-bold text-[#1E3A2B]">{product.nutrition.carbs}</span>
                        </div>
                        <div className="bg-[#FAF8F5] p-2 rounded-xl border border-gray-100">
                          <span className="text-[10px] uppercase font-bold text-muted-foreground block">Lipides</span>
                          <span className="text-xs sm:text-sm font-bold text-[#1E3A2B]">{product.nutrition.fats}</span>
                        </div>
                        <div className="bg-[#FAF8F5] p-2 rounded-xl border border-gray-100">
                          <span className="text-[10px] uppercase font-bold text-muted-foreground block">Fibres</span>
                          <span className="text-xs sm:text-sm font-bold text-[#1E3A2B]">{product.nutrition.fibers}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Composition & Ingrédients */}
                  {product.composition && product.composition.length > 0 && (
                    <div className="mb-6 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-[#1E3A2B] mb-2.5 flex items-center gap-1.5">
                        <Leaf size={14} className="text-[#1E3A2B]" />
                        Ingrédients & Composition
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {product.composition.map((ing, idx) => (
                          <span
                            key={idx}
                            className="bg-white text-gray-700 text-xs font-medium px-3 py-1.5 rounded-full border border-gray-200 shadow-2xs"
                          >
                            {ing}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Sauce recommandée */}
                  {product.dressing && (
                    <div className="mb-6 text-xs text-foreground bg-[#E3ECE6]/30 p-3.5 rounded-xl border border-[#1E3A2B]/10">
                      <strong>Assaisonnement recommandé :</strong> {product.dressing}
                    </div>
                  )}

                  {/* Allergènes & Régimes */}
                  <div className="mb-6 text-xs text-muted-foreground space-y-2">
                    {product.allergens && product.allergens.length > 0 && (
                      <p className="flex items-start gap-1.5">
                        <Info size={14} className="text-amber-600 shrink-0 mt-0.5" />
                        <span>
                          <strong>Allergènes signalés :</strong> {product.allergens.join(", ")}. Consultez notre{" "}
                          <Link to="/allergenes" className="text-[#1E3A2B] font-bold underline">
                            tableau des allergènes
                          </Link>.
                        </span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Actions : Quantité + Panier + Personnaliser + WhatsApp */}
                <div className="pt-6 border-t border-gray-100 space-y-4">
                  {product.price !== null ? (
                    <>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center border border-gray-200 rounded-full bg-gray-50 p-1">
                          <button
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-gray-600 hover:text-[#1E3A2B] shadow-xs transition"
                            aria-label="Diminuer la quantité"
                          >
                            <Minus size={15} />
                          </button>
                          <span className="w-12 text-center font-bold text-gray-800 text-sm">
                            {quantity}
                          </span>
                          <button
                            onClick={() => setQuantity(quantity + 1)}
                            className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-gray-600 hover:text-[#1E3A2B] shadow-xs transition"
                            aria-label="Augmenter la quantité"
                          >
                            <Plus size={15} />
                          </button>
                        </div>

                        <button
                          onClick={handleAddToCart}
                          className={`flex-1 h-12 px-6 rounded-full font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition shadow-elevated cursor-pointer ${
                            addedNotification
                              ? "bg-green-600 text-white border border-green-600"
                              : "bg-[#1E3A2B] hover:bg-[#D96B43] text-white border border-[#1E3A2B] hover:border-[#D96B43]"
                          }`}
                        >
                          {addedNotification ? (
                            <>
                              <CheckCircle2 size={18} />
                              <span>Ajouté au panier !</span>
                            </>
                          ) : (
                            <>
                              <ShoppingBag size={18} />
                              <span>Ajouter au panier • {(product.price * quantity).toLocaleString()} FCFA</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* Bouton de personnalisation dans le Builder si Salade */}
                      {product.category === "Salades" && (
                        <Link
                          to={`/builder?sig=${product.slug}`}
                          className="w-full h-12 px-6 rounded-full font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 bg-[#1E3A2B] hover:bg-[#D96B43] text-white border border-[#1E3A2B] hover:border-[#D96B43] transition shadow-xs group/btn cursor-pointer"
                        >
                          <ChefHat size={16} className="group-hover/btn:rotate-12 transition-transform" />
                          <span>Personnaliser ma salade dans le Builder</span>
                        </Link>
                      )}

                      {/* Bouton WhatsApp direct */}
                      <a
                        href={`https://wa.me/237658254509?text=${whatsappMessage}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3.5 px-6 rounded-full font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 bg-[#25D366]/10 text-[#1E3A2B] border border-[#25D366]/30 hover:bg-[#25D366]/20 transition"
                      >
                        <Phone size={15} className="text-[#25D366]" />
                        <span>Commander directement sur WhatsApp (+237 658 254 509)</span>
                      </a>
                    </>
                  ) : (
                    <div className="space-y-3">
                      <Link
                        to={`/devis?prestation=${encodeURIComponent(product.name)}`}
                        className="w-full py-4 px-6 rounded-full font-bold text-sm flex items-center justify-center gap-2 bg-[#D96B43] hover:bg-[#c45b34] text-white shadow-elevated transition"
                      >
                        <ArrowRight size={18} />
                        <span>Demander un devis pour ce format</span>
                      </Link>
                      <a
                        href={`https://wa.me/237658254509?text=${encodeURIComponent(`Bonjour YAMOOH, je souhaite des renseignements sur la formule : ${product.name}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3.5 px-6 rounded-full font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 bg-[#25D366]/10 text-[#1E3A2B] border border-[#25D366]/30 hover:bg-[#25D366]/20 transition"
                      >
                        <Phone size={15} className="text-[#25D366]" />
                        <span>Échanger sur WhatsApp (+237 658 254 509)</span>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Produits Similaires */}
          {similarProducts.length > 0 && (
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-display font-bold text-[#1E3A2B]">
                    Vous pourriez également aimer
                  </h2>
                  <p className="text-gray-500 text-xs sm:text-sm">
                    D'autres suggestions gourmandes de notre sélection {product.category.toLowerCase()}.
                  </p>
                </div>
                <Link
                  to="/notre-carte"
                  className="text-xs font-bold text-[#1E3A2B] hover:text-[#D96B43] flex items-center gap-1 transition"
                >
                  <span>Toute la carte</span>
                  <ArrowRight size={14} />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {similarProducts.map((item) => (
                  <Link
                    key={item.id}
                    to={`/notre-carte/${item.slug}`}
                    className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-2xs hover:shadow-md transition flex flex-col"
                  >
                    <div className="relative aspect-4/3 bg-gray-100 overflow-hidden">
                      <img
                        src={item.image || "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80"}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                      {item.badge && (
                        <span className="absolute top-3 left-3 bg-[#1E3A2B]/90 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold text-[#1E3A2B] group-hover:text-[#D96B43] transition mb-1 text-base">
                          {item.name}
                        </h3>
                        <p className="text-xs text-gray-500 line-clamp-2 mb-3">
                          {item.description}
                        </p>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                        <span className="font-black text-[#D96B43] text-sm">
                          {item.price ? `${item.price.toLocaleString()} FCFA` : "Sur devis"}
                        </span>
                        <span className="text-xs font-bold text-[#1E3A2B] group-hover:translate-x-1 transition flex items-center gap-1">
                          Découvrir <ArrowRight size={12} />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
