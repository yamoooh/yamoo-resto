import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  ChefHat, 
  Sparkles, 
  Coffee, 
  Utensils, 
  Briefcase, 
  PartyPopper, 
  Users, 
  GlassWater, 
  Plus, 
  Minus,
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Truck,
  Leaf,
  Clock,
  HelpCircle,
  PhoneCall,
  CalendarCheck,
  FileText
} from "lucide-react";
import { MenuItem } from "../data/menu";
import { UNIVERSES } from "../data/universes";
import { useCart } from "../contexts/CartContext";
import { useData } from "../contexts/DataContext";
import Breadcrumb from "../components/Breadcrumb";

export const NotreCarte = () => {
  const { add } = useCart();
  const { getPublicProducts } = useData();
  const products = getPublicProducts();
  const [addedItem, setAddedItem] = useState<string | null>(null);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);

  const handleAddToCart = (e: React.MouseEvent, item: MenuItem) => {
    e.preventDefault();
    e.stopPropagation();

    if (item.price === null) {
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

  const signatures = products.filter((item) => item.signature);

  return (
    <>
      {/* SEO META */}
      <title>La Carte Complète YAMOOH | 7 Univers Restauration & Traiteur Douala</title>
      <meta
        name="description"
        content="Explorez l'ensemble des 7 univers YAMOOH à Douala : Petit-déjeuner & brunch, salades fraîches, plats chauds, plateaux repas d'entreprise, cocktails, buffets XXL et boissons maison."
      />
      <link rel="canonical" href="https://www.yamooh.com/notre-carte" />

      {/* 1. HERO SECTION */}
      <section className="bg-[#1E3A2B] text-white py-16 lg:py-24 relative overflow-hidden">
        <div className="container-tight relative z-10 text-center max-w-4xl mx-auto px-4">
          <div className="mb-4 flex justify-center">
            <Breadcrumb items={[{ label: "Carte & Univers" }]} />
          </div>

          <span className="inline-block bg-white/10 text-[#F2B705] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-white/15 font-mono">
            LE CATALOGUE COMPLET YAMOOH DOUALA
          </span>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight mb-6 leading-tight">
            Explorez nos 7 grands univers de restauration & traiteur
          </h1>

          <div className="text-white/85 text-base sm:text-lg leading-relaxed font-light mb-8 space-y-4 max-w-3xl mx-auto text-left sm:text-center">
            <p>
              Bienvenue sur le catalogue officiel YAMOOH. Du petit-déjeuner énergisant pour vos équipes aux buffets de réception d'exception, découvrez nos univers gastronomiques pensés pour répondre à tous vos besoins quotidiens et professionnels à Douala.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#univers-grid"
              className="inline-flex items-center gap-2 bg-[#D96B43] hover:bg-[#c45b34] text-white px-8 py-3.5 rounded-full font-bold text-sm transition shadow-elevated"
            >
              <Utensils size={18} />
              <span>PARCOURIR LES 7 UNIVERS</span>
            </a>
            <Link
              to="/builder"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/30 px-8 py-3.5 rounded-full font-bold text-sm transition backdrop-blur-sm"
            >
              <ChefHat size={18} />
              <span>COMPOSER MA SALADE SUR-MESURE</span>
            </Link>
          </div>
        </div>

        {/* Décoration géométrique */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#F2B705_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      </section>

      {/* 2. GRILLE PRINCIPALE DES 7 UNIVERS COMMERCIAUX */}
      <section className="py-20 bg-background border-b border-border" id="univers-grid">
        <div className="container-tight">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#D96B43]">
              LES 7 GRANDES FAMILLES DE PRODUITS
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-foreground">
              Choisissez votre univers de dégustation
            </h2>
            <p className="text-sm text-muted-foreground">
              Cliquez sur un univers pour ouvrir son catalogue complet avec filtres interactifs, sous-catégories et commande directe.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {UNIVERSES.map((univ) => (
              <div
                key={univ.id}
                className="bg-card text-card-foreground border border-border/80 hover:border-[#1E3A2B]/40 rounded-3xl overflow-hidden shadow-card hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group"
              >
                <div>
                  {/* Visuel Haute Définition */}
                  <div className="relative aspect-16/10 overflow-hidden bg-secondary">
                    <img
                      src={univ.image}
                      alt={univ.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                    
                    <span className="absolute top-3 left-3 bg-[#1E3A2B] text-white text-[10px] font-mono font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md">
                      {univ.number} • {univ.badge}
                    </span>
                  </div>

                  {/* Contenu de la carte Univers */}
                  <div className="p-6 space-y-3">
                    <h3 className="font-display font-black text-lg text-foreground group-hover:text-[#D96B43] transition leading-snug">
                      <Link to={`/${univ.slug}`}>{univ.name}</Link>
                    </h3>
                    
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {univ.heroDescription}
                    </p>

                    {/* Sous-rubriques badges */}
                    <div className="pt-3 border-t border-border/60 space-y-1.5">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground font-bold block">
                        Au menu dans cet univers :
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {univ.subRubrics.map((sub) => (
                          <Link
                            key={sub.id}
                            to={`/${univ.slug}/${sub.slug}`}
                            className="text-[11px] bg-secondary hover:bg-[#1E3A2B] hover:text-white text-secondary-foreground px-2.5 py-1 rounded-md font-medium transition"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bouton d'accès au catalogue */}
                <div className="p-6 pt-0">
                  <Link
                    to={`/${univ.slug}`}
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#1E3A2B] hover:bg-[#162a1f] text-white py-3 px-4 rounded-full text-xs font-bold transition shadow-soft group-hover:bg-[#D96B43]"
                  >
                    <span>Ouvrir le catalogue</span>
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SECTION COMPOSER MA SALADE SUR-MESURE (LE BUILDER) */}
      <section className="container-tight py-20">
        <div className="bg-[#1E3A2B] rounded-3xl p-8 sm:p-12 lg:p-16 text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-2xl">
            <span className="text-[#F2B705] text-xs uppercase tracking-widest font-bold font-mono">
              Sur-Mesure & Créatif
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black mt-2 mb-6 leading-tight">
              Composez votre salade en 3 étapes simples
            </h2>
            <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-8">
              Vous avez le contrôle total : sélectionnez vos bases fraîches, combinez vos protéines favorites et couronnez le tout d'une sauce artisanale maison faite le matin même à la Pharmacie Kotto.
            </p>

            <div className="space-y-4 mb-10">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#F2B705] text-[#1E3A2B] flex items-center justify-center font-bold text-sm shrink-0">
                  1
                </div>
                <div>
                  <h4 className="font-bold text-white text-base">Choisissez votre base</h4>
                  <p className="text-white/70 text-xs sm:text-sm">Pâtes penne al dente, roquette sauvage, mix de jeunes pousses croquantes.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#F2B705] text-[#1E3A2B] flex items-center justify-center font-bold text-sm shrink-0">
                  2
                </div>
                <div>
                  <h4 className="font-bold text-white text-base">Ajoutez vos protéines & toppings</h4>
                  <p className="text-white/70 text-xs sm:text-sm">Poulet grillé, crevettes marinées, avocat frais, fêta, tomates cerises, maïs doux, œufs fermiers.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#F2B705] text-[#1E3A2B] flex items-center justify-center font-bold text-sm shrink-0">
                  3
                </div>
                <div>
                  <h4 className="font-bold text-white text-base">Sélectionnez votre sauce artisanale</h4>
                  <p className="text-white/70 text-xs sm:text-sm">Sauce Signature YAMOOH, Vinaigrette Fruit de la Passion ou César onctueuse.</p>
                </div>
              </div>
            </div>

            <Link
              to="/builder"
              className="inline-flex items-center gap-3 bg-[#D96B43] hover:bg-[#c45b34] text-white px-8 py-4 rounded-full font-bold text-sm sm:text-base transition shadow-elevated hover:scale-105"
            >
              <ChefHat size={20} />
              Lancer le Salad Builder maintenant
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-10 bg-[radial-gradient(#F2B705_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none hidden lg:block" />
        </div>
      </section>

      {/* 4. SECTION DES 8 SIGNATURES EN VEDETTE */}
      <section className="bg-[#FAF7F2] py-20 border-y border-border">
        <div className="container-tight">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-[#D96B43] text-xs uppercase tracking-widest font-bold font-mono">
                Créations Étoilées
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-black text-[#1E3A2B] mt-1">
                Nos 8 Recettes Signatures
              </h2>
              <p className="text-muted-foreground text-sm mt-2 max-w-xl">
                Conçues avec passion par notre chef pour un équilibre parfait entre nutrition, fraîcheur et générosité.
              </p>
            </div>
            <Link
              to="/signature"
              className="inline-flex items-center gap-2 text-[#1E3A2B] font-bold text-sm hover:text-[#D96B43] transition shrink-0 group"
            >
              <span>Voir les 8 Signatures</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {signatures.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-border/80 rounded-3xl p-4 shadow-card hover:shadow-elevated transition flex flex-col justify-between group"
              >
                <div>
                  <div className="relative aspect-4/3 w-full rounded-2xl overflow-hidden bg-[#FAF7F2] mb-3.5 flex items-center justify-center">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    )}
                    <div className="absolute top-2 left-2 right-2 flex items-center justify-between pointer-events-none">
                      {item.badge ? (
                        <span className="bg-[#1E3A2B] text-white text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs">
                          {item.badge}
                        </span>
                      ) : <span />}
                      <span className="bg-[#D96B43] text-white text-[9px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-xs">
                        <Sparkles size={10} /> Signature
                      </span>
                    </div>
                  </div>

                  <h3 className="text-lg font-display font-bold text-[#1E3A2B] group-hover:text-[#D96B43] transition-colors leading-snug">
                    <Link to={`/notre-carte/${item.slug}`}>{item.name}</Link>
                  </h3>
                  {item.slogan && (
                    <p className="text-xs text-[#D96B43] font-medium italic mt-0.5 mb-1.5">
                      « {item.slogan} »
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-3">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-border mt-auto">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs uppercase font-bold text-muted-foreground">Prix</span>
                    <span className="text-lg font-black text-[#D96B43]">
                      {item.price ? `${item.price.toLocaleString("fr-FR")} FCFA` : "Sur devis"}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      to={`/notre-carte/${item.slug}`}
                      className="h-10 px-2 rounded-full border border-[#1E3A2B] text-[#1E3A2B] hover:bg-[#1E3A2B] hover:text-white font-bold text-xs transition flex items-center justify-center gap-1 text-center leading-tight shadow-xs"
                    >
                      <FileText size={13} />
                      <span>Fiche</span>
                    </Link>

                    <Link
                      to={`/builder?sig=${item.slug}`}
                      className="h-10 px-2 rounded-full bg-[#D96B43] hover:bg-[#c45b34] text-white border border-[#D96B43] font-black uppercase tracking-wider text-xs transition flex items-center justify-center gap-1.5 text-center leading-tight shadow-soft group/btn"
                    >
                      <ChefHat size={14} className="group-hover/btn:rotate-12 transition-transform shrink-0" />
                      <span>COMPOSER</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SERVICE TRAITEUR B2B & ÉVÉNEMENTS */}
      <section className="bg-secondary/40 py-20 border-b border-border">
        <div className="container-tight grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-[#D96B43] text-xs uppercase tracking-widest font-bold font-mono">
              Prestations Entreprises & Célébrations
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-[#1E3A2B] leading-tight">
              Une solution traiteur clé en main pour vos réceptions à Douala
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Séminaires, déjeuners de direction, afterworks ou événements privés : notre équipe dimensionne des buffets, des coffrets plateaux repas et des cocktails adaptés à votre nombre d'invités et à vos exigences.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-background border border-border">
                <h4 className="font-bold text-sm text-[#1E3A2B] mb-1">Plateaux Repas VIP</h4>
                <p className="text-xs text-muted-foreground">Coffrets individuels soignés prêts à déguster en réunion.</p>
              </div>
              <div className="p-4 rounded-2xl bg-background border border-border">
                <h4 className="font-bold text-sm text-[#1E3A2B] mb-1">Buffets & Cocktails</h4>
                <p className="text-xs text-muted-foreground">Saladiers XXL partagés et bouchées finger food raffinées.</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                to="/services-evenementiels"
                className="bg-[#1E3A2B] hover:bg-[#162a1f] text-white px-7 py-3.5 rounded-full font-bold text-sm transition shadow-soft"
              >
                Découvrir les services traiteur
              </Link>
              <Link
                to="/devis"
                className="border-2 border-[#1E3A2B] text-[#1E3A2B] hover:bg-[#1E3A2B] hover:text-white px-7 py-3.5 rounded-full font-bold text-sm transition"
              >
                Demander un devis sous 2h
              </Link>
            </div>
          </div>

          <div className="bg-card border border-border rounded-3xl p-8 shadow-card space-y-6">
            <h3 className="font-display font-bold text-xl text-foreground">
              Pourquoi choisir le service traiteur YAMOOH ?
            </h3>
            
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#1E3A2B]/10 text-[#1E3A2B] flex items-center justify-center shrink-0 mt-0.5">
                  <Leaf size={16} />
                </div>
                <div>
                  <strong className="text-foreground block">Fraîcheur Absolue</strong>
                  <span>Tous les plats et salades sont préparés le matin même de la livraison.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#1E3A2B]/10 text-[#1E3A2B] flex items-center justify-center shrink-0 mt-0.5">
                  <Truck size={16} />
                </div>
                <div>
                  <strong className="text-foreground block">Livraison Ponctuelle à Douala</strong>
                  <span>À Bonanjo, Akwa, Bonapriso, Kotto, Makepe et dans toute la métropole.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#1E3A2B]/10 text-[#1E3A2B] flex items-center justify-center shrink-0 mt-0.5">
                  <CalendarCheck size={16} />
                </div>
                <div>
                  <strong className="text-foreground block">Devis Rapide & Personnalisé</strong>
                  <span>Étude personnalisée de votre cahier des charges en moins de 24h.</span>
                </div>
              </li>
            </ul>

            <div className="pt-4 border-t border-border flex items-center justify-between">
              <div>
                <span className="text-xs text-muted-foreground block">Ligne directe Traiteur :</span>
                <span className="font-bold text-[#1E3A2B] text-sm">+237 658 254 509</span>
              </div>
              <a
                href="https://wa.me/237658254509?text=Bonjour%20Yamooh%20je%20souhaite%20un%20devis%20traiteur"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#20b858] text-white px-5 py-2.5 rounded-full text-xs font-bold transition shadow-xs"
              >
                WhatsApp Direct
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ DE LA CARTE */}
      <section className="py-20 bg-background border-b border-border">
        <div className="container-tight max-w-4xl">
          <div className="text-center space-y-3 mb-12">
            <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#D96B43]">
              <HelpCircle size={15} />
              <span>Questions Fréquentes</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-foreground">
              Questions courantes sur la carte & les commandes
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Comment naviguer entre les différents univers ?",
                a: "Vous pouvez cliquer sur chaque carte d'univers ci-dessus ou utiliser le Header et son Mega-Menu pour explorer directement les catalogues dédiés avec sous-catégories et filtres avancés."
              },
              {
                q: "Puis-je commander des produits de plusieurs univers dans le même panier ?",
                a: "Oui, vous pouvez ajouter dans votre panier des petits-déjeuners, des salades, des sandwichs, des boissons et des desserts, et tout valider en une seule livraison."
              },
              {
                q: "Comment personnaliser ma salade ?",
                a: "Rendez-vous dans notre module Salad Builder (/builder) pour concevoir une recette 100% sur-mesure ou cliquez sur 'COMPOSER' sur n'importe quelle Salade Signature."
              },
              {
                q: "Quelles sont les zones et horaires de livraison à Douala ?",
                a: "Nous livrons du lundi au samedi de 10h00 à 21h00 dans tous les quartiers de Douala (Akwa, Bonanjo, Bonapriso, Kotto, Makepe, Bali, Deido, etc.)."
              }
            ].map((faq, index) => {
              const isOpen = faqOpen === index;
              return (
                <div
                  key={index}
                  className="border border-border rounded-2xl overflow-hidden bg-card transition-colors"
                >
                  <button
                    onClick={() => setFaqOpen(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-5 text-left font-display font-bold text-sm sm:text-base text-foreground hover:text-[#D96B43] transition cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <span className="p-1 rounded-full bg-secondary shrink-0 ml-4">
                      {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-muted-foreground leading-relaxed border-t border-border/50 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default NotreCarte;
