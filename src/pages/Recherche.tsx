import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { 
  Search, 
  Utensils, 
  Briefcase, 
  BookOpen, 
  ArrowRight, 
  X, 
  Building2, 
  HelpCircle,
  Sparkles,
  MapPin
} from "lucide-react";
import { useData } from "../contexts/DataContext";
import { blogPosts } from "../data/blog";
import Breadcrumb from "../components/Breadcrumb";

export const Recherche = () => {
  const [query, setQuery] = useState("");
  const { getPublicProducts } = useData();
  const products = getPublicProducts();

  const services = [
    { title: "Plateaux Repas d'Entreprise", desc: "Formules repas individuelles pour réunions, comités et séminaires à Douala.", link: "/offres-traiteur/entreprises" },
    { title: "Traiteur pour Particuliers", desc: "Brunchs, anniversaires, réceptions à domicile et célébrations familiales.", link: "/offres-traiteur/particuliers" },
    { title: "Service Traiteur Mariages", desc: "Buffets raffinés, vin d'honneur et cocktails frais pour réceptions de mariage.", link: "/services-evenementiels/mariages" },
    { title: "Séminaires & Conférences", desc: "Petits-déjeuners d'accueil, pauses-café et déjeuners professionnels.", link: "/services-evenementiels/seminaires" },
    { title: "Formules Cocktails & Finger Food", desc: "Bouchées salées et sucrées, planches à partager pour soirées et lancements.", link: "/services-evenementiels/soirees-privees" },
    { title: "Lancements de Produits", desc: "Cocktails prestige et animations fraîches pour vos présentations de marque.", link: "/services-evenementiels/lancements" },
    { title: "Buffets & Saladiers XXL", desc: "Grands saladiers partagés et buffets complets chauds/froids.", link: "/services-evenementiels/formules" },
    { title: "Accompagnement Événementiel", desc: "Conseils, devis personnalisés et coordination pour vos réceptions.", link: "/services-evenementiels/accompagnement" },
    { title: "Galerie Inspirations Événements", desc: "Découvrez en images nos préparations, buffets et créations.", link: "/services-evenementiels/inspirations" },
    { title: "Composer ma salade (Salad Builder)", desc: "Créez votre salade 100% sur-mesure : base, légumes, protéines, toppings et sauces.", link: "/builder" },
    { title: "Demande de Devis Traiteur", desc: "Formulaire de devis personnalisé gratuit et rapide pour vos événements.", link: "/devis" },
  ];

  const staticPages = [
    { title: "L'Univers YAMOOH — Hub de marque", desc: "Découvrez l'histoire, la vision et les engagements de YAMOOH à Douala.", link: "/yamooh" },
    { title: "À propos de YAMOOH", desc: "Notre philosophie culinaire et nos standards de fraîcheur au quotidien.", link: "/yamooh/a-propos" },
    { title: "Notre Histoire & Évolution", desc: "L'évolution du concept YAMOOH autour du bien manger et du partage.", link: "/yamooh/notre-histoire" },
    { title: "Mission & Valeurs", desc: "Fraîcheur, simplicité, convivialité, personnalisation et professionnalisme.", link: "/yamooh/mission-valeurs" },
    { title: "Nos Engagements Fraîcheur", desc: "Légumes sélectionnés chaque matin, préparation minute et livraison rapide.", link: "/yamooh/engagements" },
    { title: "Nos Établissements & Localisation", desc: "Retrouvez YAMOOH à Douala : Pharmacie Kotto, Cameroun.", link: "/yamooh/etablissements" },
    { title: "Nos Réalisations & Portfolio", desc: "Visualisez les buffets, coffrets et salades fraîches réalisés par l'équipe.", link: "/yamooh/realisations" },
    { title: "Rejoindre YAMOOH — Franchise", desc: "Informations pour entreprendre et développer la marque YAMOOH.", link: "/yamooh/franchise" },
    { title: "Allergènes & Informations Alimentaires", desc: "Tableau de transparence des allergènes et conseils diététiques.", link: "/allergenes" },
    { title: "FAQ Traiteur & Commandes", desc: "Réponses à vos questions sur les commandes de groupe et la livraison.", link: "/faq-traiteur" },
    { title: "Plan d'accès & Itinéraire", desc: "Comment se rendre à YAMOOH à Kotto, Douala (carte et contact).", link: "/contact/plan-dacces" },
    { title: "Informations Pratiques", desc: "Coordonnées, horaires, WhatsApp et modes de commande.", link: "/contact/informations-pratiques" },
  ];

  const results = useMemo(() => {
    if (!query.trim()) {
      return { products: [], services: [], pages: [], articles: [] };
    }

    const q = query.toLowerCase().trim();

    const matchedProducts = products.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q) ||
        m.category.toLowerCase().includes(q) ||
        (m.composition && m.composition.some((c) => c.toLowerCase().includes(q))) ||
        (m.tags && m.tags.some((t) => t.toLowerCase().includes(q)))
    );

    const matchedServices = services.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.desc.toLowerCase().includes(q)
    );

    const matchedPages = staticPages.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.desc.toLowerCase().includes(q)
    );

    const matchedArticles = blogPosts.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q)
    );

    return {
      products: matchedProducts,
      services: matchedServices,
      pages: matchedPages,
      articles: matchedArticles,
    };
  }, [query]);

  const totalResults =
    results.products.length +
    results.services.length +
    results.pages.length +
    results.articles.length;

  return (
    <>
      <title>Recherche | YAMOOH Douala</title>
      <meta
        name="description"
        content="Recherchez un plat, une formule traiteur, un service événementiel ou un article sur le site officiel YAMOOH à Douala."
      />
      <link rel="canonical" href="https://www.yamooh.com/recherche" />

      {/* HERO */}
      <section className="bg-[#1E3A2B] text-white py-14 lg:py-20 relative overflow-hidden">
        <div className="container-tight relative z-10 text-center max-w-3xl mx-auto px-4">
          <div className="mb-4 flex justify-center">
            <Breadcrumb items={[{ label: "Recherche" }]} />
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight mb-4">
            Recherche YAMOOH
          </h1>
          <p className="text-white/80 text-sm sm:text-base max-w-lg mx-auto mb-8">
            Explorez notre carte, nos formules traiteur, nos guides de réception ou nos informations pratiques à Douala.
          </p>

          {/* BARRE DE RECHERCHE */}
          <div className="relative max-w-xl mx-auto">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ex : salade, poulet, traiteur, séminaire, jus, Kotto, devis..."
              className="w-full bg-white text-gray-900 rounded-full pl-12 pr-12 py-4 text-sm shadow-xl focus:outline-none focus:ring-2 focus:ring-[#D96B43] border border-gray-200"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 cursor-pointer p-1"
                aria-label="Effacer la recherche"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* RÉSULTATS */}
      <section className="container-tight py-12 lg:py-16 max-w-5xl mx-auto px-4">
        {query.trim() === "" ? (
          <div className="space-y-8">
            <div className="text-center py-6">
              <h2 className="text-xl font-bold text-[#1E3A2B] mb-2">Suggestions de recherche populaire</h2>
              <p className="text-gray-500 text-xs sm:text-sm">Cliquez sur une thématique pour démarrer la recherche :</p>
            </div>
            <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
              {["Salade", "Poulet", "Traiteur Entreprise", "Séminaire", "Brunch", "Jus de Bissap", "Allergènes", "Devis", "Kotto Douala"].map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="bg-white border border-gray-200 hover:border-[#1E3A2B] text-gray-700 hover:text-[#1E3A2B] text-xs font-semibold px-4 py-2 rounded-full transition shadow-2xs"
                >
                  {term}
                </button>
              ))}
            </div>

            <div className="grid sm:grid-cols-3 gap-6 pt-8 border-t border-gray-200">
              <Link to="/notre-carte" className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-md transition text-center group">
                <Utensils className="mx-auto text-[#D96B43] mb-3 group-hover:scale-110 transition" size={28} />
                <h3 className="font-bold text-[#1E3A2B] text-base mb-1">Notre Carte</h3>
                <p className="text-xs text-gray-500">Salades, bowls, sandwichs, brunchs et boissons fraîches.</p>
              </Link>
              <Link to="/offres-traiteur" className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-md transition text-center group">
                <Briefcase className="mx-auto text-[#1E3A2B] mb-3 group-hover:scale-110 transition" size={28} />
                <h3 className="font-bold text-[#1E3A2B] text-base mb-1">Offres Traiteur</h3>
                <p className="text-xs text-gray-500">Solutions pour entreprises, réunions et réceptions privées.</p>
              </Link>
              <Link to="/devis" className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-md transition text-center group">
                <Sparkles className="mx-auto text-[#D96B43] mb-3 group-hover:scale-110 transition" size={28} />
                <h3 className="font-bold text-[#1E3A2B] text-base mb-1">Demande de Devis</h3>
                <p className="text-xs text-gray-500">Obtenez une proposition personnalisée pour votre événement.</p>
              </Link>
            </div>
          </div>
        ) : totalResults === 0 ? (
          <div className="text-center py-16 bg-white border border-gray-200 rounded-3xl p-8 max-w-lg mx-auto shadow-sm space-y-4">
            <HelpCircle size={40} className="mx-auto text-gray-400" />
            <h3 className="text-lg text-[#1E3A2B] font-bold">
              Aucun résultat trouvé pour « {query} »
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Vérifiez l'orthographe ou essayez des termes plus généraux comme « salade », « brunch », « plateau repas » ou « entreprise ».
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-3">
              <Link to="/notre-carte" className="bg-[#1E3A2B] text-white text-xs font-bold px-5 py-2.5 rounded-full transition hover:bg-[#2b513d]">
                Consulter la carte
              </Link>
              <Link to="/contact" className="bg-gray-100 text-gray-700 text-xs font-bold px-5 py-2.5 rounded-full transition hover:bg-gray-200">
                Nous contacter
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-12">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
              {totalResults} résultat{totalResults > 1 ? "s" : ""} trouvé{totalResults > 1 ? "s" : ""}
            </p>

            {/* PRODUITS DU CATALOGUE */}
            {results.products.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-base font-display font-bold text-[#1E3A2B] border-b border-gray-200 pb-2">
                  <Utensils size={18} className="text-[#D96B43]" />
                  <span>PRODUITS & PLATS ({results.products.length})</span>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {results.products.map((item) => (
                    <Link
                      key={item.id}
                      to={`/notre-carte/${item.slug}`}
                      className="bg-white border border-gray-100 hover:border-[#1E3A2B] rounded-2xl p-4 flex flex-col justify-between shadow-2xs hover:shadow-md transition group"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-bold text-sm text-[#1E3A2B] group-hover:text-[#D96B43] transition">
                            {item.name}
                          </h4>
                          <span className="text-xs font-black text-[#D96B43]">
                            {item.price ? `${item.price.toLocaleString("fr-FR")} FCFA` : "Sur devis"}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 line-clamp-2 mb-3">{item.description}</p>
                      </div>
                      <div className="pt-2 border-t border-gray-100 flex justify-between items-center text-xs">
                        <span className="text-gray-400 text-[10px] uppercase font-bold">{item.category}</span>
                        <span className="font-bold text-[#1E3A2B] group-hover:translate-x-1 transition flex items-center gap-1">
                          Voir la fiche produit →
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* SERVICES TRAITEUR & ÉVÉNEMENTS */}
            {results.services.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-base font-display font-bold text-[#1E3A2B] border-b border-gray-200 pb-2">
                  <Briefcase size={18} className="text-[#1E3A2B]" />
                  <span>SERVICES & FORMULES TRAITEUR ({results.services.length})</span>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {results.services.map((srv, idx) => (
                    <Link
                      key={idx}
                      to={srv.link}
                      className="bg-white border border-gray-100 hover:border-[#1E3A2B] rounded-2xl p-4 flex flex-col justify-between shadow-2xs hover:shadow-md transition group"
                    >
                      <div>
                        <h4 className="font-bold text-sm text-[#1E3A2B] group-hover:text-[#D96B43] transition mb-1">
                          {srv.title}
                        </h4>
                        <p className="text-xs text-gray-500">{srv.desc}</p>
                      </div>
                      <div className="pt-2 border-t border-gray-100 mt-3 text-right">
                        <span className="text-xs font-bold text-[#1E3A2B] group-hover:translate-x-1 transition inline-flex items-center gap-1">
                          Découvrir la formule <ArrowRight size={12} />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* PAGES INSTITUTIONNELLES & PRATIQUES */}
            {results.pages.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-base font-display font-bold text-[#1E3A2B] border-b border-gray-200 pb-2">
                  <Building2 size={18} className="text-emerald-700" />
                  <span>UNIVERS YAMMOH & INFORMATIONS ({results.pages.length})</span>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {results.pages.map((p, idx) => (
                    <Link
                      key={idx}
                      to={p.link}
                      className="bg-white border border-gray-100 hover:border-[#1E3A2B] rounded-2xl p-4 flex flex-col justify-between shadow-2xs hover:shadow-md transition group"
                    >
                      <div>
                        <h4 className="font-bold text-sm text-[#1E3A2B] group-hover:text-[#D96B43] transition mb-1">
                          {p.title}
                        </h4>
                        <p className="text-xs text-gray-500">{p.desc}</p>
                      </div>
                      <div className="pt-2 border-t border-gray-100 mt-3 text-right">
                        <span className="text-xs font-bold text-[#1E3A2B] group-hover:translate-x-1 transition inline-flex items-center gap-1">
                          Consulter la page <ArrowRight size={12} />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* ARTICLES DE BLOG */}
            {results.articles.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-base font-display font-bold text-[#1E3A2B] border-b border-gray-200 pb-2">
                  <BookOpen size={18} className="text-amber-600" />
                  <span>ARTICLES DU JOURNAL YAMMOH ({results.articles.length})</span>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {results.articles.map((art) => (
                    <Link
                      key={art.slug}
                      to={`/blog/${art.slug}`}
                      className="bg-white border border-gray-100 hover:border-[#1E3A2B] rounded-2xl p-4 flex flex-col justify-between shadow-2xs hover:shadow-md transition group"
                    >
                      <div>
                        <span className="text-[10px] font-bold uppercase text-[#D96B43]">{art.category}</span>
                        <h4 className="font-bold text-sm text-[#1E3A2B] group-hover:text-[#D96B43] transition my-1">
                          {art.title}
                        </h4>
                        <p className="text-xs text-gray-500 line-clamp-2">{art.excerpt}</p>
                      </div>
                      <div className="pt-2 border-t border-gray-100 mt-3 text-right">
                        <span className="text-xs font-bold text-[#1E3A2B] group-hover:translate-x-1 transition inline-flex items-center gap-1">
                          Lire l'article <ArrowRight size={12} />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </section>
    </>
  );
};

export default Recherche;
