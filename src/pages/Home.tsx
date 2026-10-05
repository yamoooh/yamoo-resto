import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Leaf, 
  Truck, 
  Sparkles, 
  ChevronDown, 
  ChevronUp,
  MapPin, 
  ChefHat, 
  Utensils, 
  Phone, 
  Clock, 
  ShieldCheck, 
  FileText, 
  MessageCircle, 
  Mail, 
  Compass, 
  CheckCircle2, 
  Coffee, 
  Award,
  Search
} from "lucide-react";
import GoogleMapLocation from "../components/GoogleMapLocation";
import HeroSlider from "../components/HeroSlider";

// Composant Petit Drapeau Cameroun (Vert / Rouge avec Étoile / Jaune)
const CameroonFlag = () => (
  <div className="inline-flex items-center gap-1 my-2" title="Cameroun">
    <span className="w-4 h-2.5 rounded-xs bg-[#007A5E] shadow-xs" />
    <span className="w-4 h-2.5 rounded-xs bg-[#CE1126] flex items-center justify-center text-[7px] text-[#FCD116] shadow-xs font-bold leading-none">
      ★
    </span>
    <span className="w-4 h-2.5 rounded-xs bg-[#FCD116] shadow-xs" />
  </div>
);

export const Home = () => {
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const [addressInput, setAddressInput] = useState("");
  const [addressChecked, setAddressChecked] = useState(false);

  const toggleFaq = (index: number) => {
    setFaqOpen(faqOpen === index ? null : index);
  };

  const handleCheckAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (addressInput.trim()) {
      setAddressChecked(true);
    }
  };

  return (
    <>
      {/* SEO */}
      <title>YAMOOH | Restaurant, Bar à Salades Fraîches & Traiteur d'Affaires à Douala</title>
      <meta
        name="description"
        content="YAMOOH Douala (Pharmacie Kotto) : cuisine fraîche, bar à salades, plateaux repas d'entreprise, cocktails et buffets sur-mesure. Livraison rapide partout à Douala."
      />
      <link rel="canonical" href="https://yamooh.com/" />

      {/* ==================================================================== */}
      {/* HERO SLIDER PREMIUM CINÉMATOGRAPHIQUE (3 SLIDES ÉDITORIAUX)           */}
      {/* ==================================================================== */}
      <HeroSlider />

      {/* ==================================================================== */}
      {/* 4. BLOC COMMANDE / DEVIS (Panneau de Service Horizontal) */}
      {/* ==================================================================== */}
      <section className="relative z-20 -mt-6 sm:-mt-10 mb-12">
        <div className="container-tight">
          <div className="bg-white border border-border/80 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-elevated backdrop-blur-md">
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              {/* Message de Présentation à gauche */}
              <div className="lg:col-span-5 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-widest font-mono text-[#D96B43]">
                  Service Express & Événements
                </span>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#1E3A2B] leading-tight">
                  Commandes fraîches & Devis traiteur pour Douala
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Click & Collect à la <strong>Pharmacie Kotto</strong> ou livraison directe dans vos bureaux (Akwa, Bonanjo, Bonapriso, Makepe, etc.).
                </p>
              </div>

              {/* Actions & Adresse à droite */}
              <div className="lg:col-span-7 space-y-4">
                <div className="grid sm:grid-cols-2 gap-3">
                  <Link
                    to="/notre-carte"
                    className="inline-flex items-center justify-center gap-2 bg-[#1E3A2B] hover:bg-[#162a1f] text-white py-3.5 px-5 rounded-full text-xs font-bold uppercase tracking-wider transition shadow-soft text-center"
                  >
                    <Utensils size={15} className="text-[#F2B705]" />
                    <span>Commander en ligne</span>
                  </Link>
                  <Link
                    to="/devis"
                    className="inline-flex items-center justify-center gap-2 bg-[#D96B43] hover:bg-[#c45b34] text-white py-3.5 px-5 rounded-full text-xs font-bold uppercase tracking-wider transition shadow-soft text-center"
                  >
                    <FileText size={15} />
                    <span>Demander un devis</span>
                  </Link>
                </div>

                {/* Champ Adresse de livraison */}
                <form onSubmit={handleCheckAddress} className="relative flex items-center">
                  <div className="absolute left-4 text-[#D96B43]">
                    <MapPin size={18} />
                  </div>
                  <input
                    type="text"
                    value={addressInput}
                    onChange={(e) => setAddressInput(e.target.value)}
                    placeholder="Entrez votre quartier ou adresse de livraison à Douala..."
                    className="w-full pl-11 pr-28 py-3 rounded-full border border-border bg-[#FAF8F5] text-xs font-medium text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[#1E3A2B] transition"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 bg-[#1E3A2B] hover:bg-[#162a1f] text-white px-4 py-2 rounded-full text-[11px] font-bold transition cursor-pointer"
                  >
                    Vérifier
                  </button>
                </form>
                {addressChecked && (
                  <p className="text-[11px] text-green-700 font-medium flex items-center gap-1.5 pl-3">
                    <CheckCircle2 size={13} />
                    <span>Zone desservie en livraison express par les coursiers YAMOOH Douala.</span>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 5. BLOC « LE SENS DU SERVICE » */}
      {/* ==================================================================== */}
      <section className="py-20 lg:py-24 bg-[#FAF8F5] border-y border-border/60">
        <div className="container-tight">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Bloc Éditorial à gauche */}
            <div className="lg:col-span-4 space-y-4">
              <span className="text-[#D96B43] text-xs uppercase tracking-widest font-bold font-mono">
                Excellence & Engagement
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-black text-[#1E3A2B] uppercase tracking-tight leading-tight">
                Le sens du service
              </h2>
              <p className="text-sm font-bold text-[#D96B43] uppercase tracking-wider">
                Chez YAMOOH
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed pt-2">
                Nous combinons la rigueur de la restauration moderne avec la fraîcheur des récoltes maraîchères camerounaises pour sublimer chaque pause déjeuner et chaque réception.
              </p>
              <div className="pt-2">
                <Link
                  to="/yamooh"
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#1E3A2B] hover:text-[#D96B43] uppercase tracking-wider transition group"
                >
                  <span>En savoir plus sur notre histoire</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* 4 Colonnes à droite avec généreux espacement */}
            <div className="lg:col-span-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Colonne 1 */}
              <div className="bg-white border border-border/70 rounded-3xl p-6 shadow-2xs hover:shadow-card transition-all duration-300 flex flex-col justify-between group">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#E3ECE6] text-[#1E3A2B] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                    <ChefHat size={22} />
                  </div>
                  <h3 className="font-display font-bold text-sm uppercase text-[#1E3A2B] mb-2 leading-snug">
                    Fait sur place
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Des préparations réalisées avec soin chaque matin dans notre univers gastronomique de Kotto.
                  </p>
                </div>
              </div>

              {/* Colonne 2 */}
              <div className="bg-white border border-border/70 rounded-3xl p-6 shadow-2xs hover:shadow-card transition-all duration-300 flex flex-col justify-between group">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#FAF0D8] text-[#D96B43] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                    <Leaf size={22} />
                  </div>
                  <h3 className="font-display font-bold text-sm uppercase text-[#1E3A2B] mb-2 leading-snug">
                    Cuisine fraîche
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Des recettes pensées autour de produits frais, de sauces maison et d'ingrédients gourmands.
                  </p>
                </div>
              </div>

              {/* Colonne 3 */}
              <div className="bg-white border border-border/70 rounded-3xl p-6 shadow-2xs hover:shadow-card transition-all duration-300 flex flex-col justify-between group">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#E3ECE6] text-[#1E3A2B] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                    <Sparkles size={22} />
                  </div>
                  <h3 className="font-display font-bold text-sm uppercase text-[#1E3A2B] mb-2 leading-snug">
                    Vos événements sur mesure
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Des prestations adaptées à vos réunions, réceptions d'entreprise et événements privés.
                  </p>
                </div>
              </div>

              {/* Colonne 4 */}
              <div className="bg-white border border-border/70 rounded-3xl p-6 shadow-2xs hover:shadow-card transition-all duration-300 flex flex-col justify-between group">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#FAF0D8] text-[#D96B43] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                    <Utensils size={22} />
                  </div>
                  <h3 className="font-display font-bold text-sm uppercase text-[#1E3A2B] mb-2 leading-snug">
                    Service traiteur
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Une offre pensée pour les entreprises et tous les moments conviviaux à partager à Douala.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 6. COLLECTION / OFFRE DU MOMENT (Composition Asymétrique Éditoriale) */}
      {/* ==================================================================== */}
      <section className="py-20 lg:py-28 overflow-hidden bg-white">
        <div className="container-tight">
          <div className="relative flex flex-col lg:flex-row items-center">
            {/* Partie Gauche : Grande Photographie Saisonnière */}
            <div className="w-full lg:w-3/5 rounded-3xl overflow-hidden shadow-elevated bg-[#FAF8F5] relative aspect-4/3 sm:aspect-16/10 lg:aspect-4/3">
              <img
                src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=85"
                alt="Création gastronomique de saison YAMOOH Douala"
                className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Partie Droite : Grand Rectangle Coloré Chevauchant */}
            <div className="w-full lg:w-1/2 lg:-ml-16 mt-6 lg:mt-0 z-10">
              <div className="bg-[#1E3A2B] text-white p-8 sm:p-12 lg:p-14 rounded-3xl shadow-elevated space-y-6">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black uppercase tracking-tight leading-tight">
                  Collection du moment
                </h2>

                <p className="text-white/85 text-xs sm:text-sm leading-relaxed font-light">
                  Chaque mois, notre chef imagine des recettes exclusives inspirées des récoltes maraîchères locales et des tendances culinaires du moment. Salades signature, créations finger food et desserts gourmands à durée limitée.
                </p>

                <div className="space-y-3 pt-2 text-xs sm:text-sm text-white/90 border-t border-white/10">
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#F2B705]" />
                    <span>Recettes inédites renouvelées régulièrement</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#F2B705]" />
                    <span>Disponibles en commande individuelle ou formule buffet traiteur</span>
                  </p>
                </div>

                <div className="pt-4">
                  <Link
                    to="/collection-du-moment"
                    className="inline-flex items-center gap-2 bg-[#D96B43] hover:bg-[#c45b34] text-white text-xs sm:text-sm font-bold uppercase tracking-wider px-8 py-3.5 rounded-full transition shadow-soft cursor-pointer"
                  >
                    <span>Découvrir la collection</span>
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 7. « BIEN MANGER AU BUREAU » (Focus Pleine Largeur - Centré) */}
      {/* ==================================================================== */}
      <section className="relative w-full min-h-[520px] sm:min-h-[620px] flex items-center justify-center overflow-hidden bg-[#1E3A2B] text-white text-center">
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/bien-manger-au-bureau.jpg"
            alt="Cadre d'entreprise déjeunant avec un repas frais YAMOOH au bureau"
            className="w-full h-full object-cover object-center filter brightness-[0.62] contrast-[1.05]"
          />
          {/* Overlay dégradé sombre et équilibré pour un contraste parfait */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/65" />
        </div>

        <div className="container-tight relative z-10 max-w-3xl mx-auto px-4 py-16 sm:py-24 space-y-6 flex flex-col items-center justify-center">
          <span className="text-[#F2B705] text-xs uppercase tracking-widest font-bold font-mono">
            Restauration d'Affaires & Équipes
          </span>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black uppercase tracking-tight leading-tight text-white drop-shadow-md">
            Bien manger au bureau
          </h2>

          <div className="flex justify-center">
            <CameroonFlag />
          </div>

          <p className="text-base sm:text-lg lg:text-xl text-white/90 font-light leading-relaxed max-w-2xl mx-auto drop-shadow-sm">
            Une cuisine pensée pour vos équipes, vos journées et vos moments professionnels. Des déjeuners sains, équilibrés et livrés à l'heure exacte de vos pauses.
          </p>

          <div className="pt-2 flex justify-center">
            <Link
              to="/yamooh/engagements"
              className="inline-flex items-center gap-2 bg-[#D96B43] hover:bg-[#c45b34] text-white text-xs sm:text-sm font-bold uppercase tracking-wider px-8 py-3.5 rounded-full transition shadow-soft hover:scale-[1.02] cursor-pointer"
            >
              <span>Découvrir nos engagements</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 8. « NOS FORMULES TRAITEUR POUR TOUS VOS MOMENTS EN ENTREPRISE » */}
      {/* ==================================================================== */}
      <section className="py-20 lg:py-28 bg-[#FAF8F5]">
        <div className="container-tight">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-[#D96B43] text-xs uppercase tracking-widest font-bold font-mono">
              Univers & Prestations B2B
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-[#1E3A2B] uppercase tracking-tight leading-tight">
              Nos formules traiteur pour tous vos moments en entreprise
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-xl mx-auto">
              Des solutions culinaires clé en main pour rythmer vos journées de travail, réceptions et événements corporate à Douala.
            </p>
          </div>

          {/* Grille de 6 cartes (3x2) */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* CARTE 1 : PETIT-DÉJEUNER D'ENTREPRISE */}
            <Link
              to="/petit-dejeuner"
              className="group relative rounded-3xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 aspect-4/5 flex flex-col justify-end p-6 bg-[#1E3A2B]"
            >
              <img
                src="/assets/formule-petit-dejeuner.jpg"
                alt="Petit-déjeuner d'entreprise YAMOOH Douala"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-[0.78]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="relative z-10 flex items-end justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#F2B705]">01 • Matinées</span>
                  <h3 className="text-lg sm:text-xl font-display font-bold text-white uppercase leading-snug mt-1">
                    Petit-déjeuner d'entreprise
                  </h3>
                  <p className="text-xs text-white/80 line-clamp-2 mt-1 font-light">
                    Viennoiseries, fruits frais coupés, café & jus pressés maison pour vos réunions matinales.
                  </p>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-white/90 group-hover:bg-[#D96B43] text-[#1E3A2B] group-hover:text-white flex items-center justify-center shrink-0 ml-3 transition-colors shadow-sm">
                  <ArrowRight size={18} />
                </div>
              </div>
            </Link>

            {/* CARTE 2 : PLATEAUX REPAS D'ENTREPRISE */}
            <Link
              to="/plateaux-repas"
              className="group relative rounded-3xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 aspect-4/5 flex flex-col justify-end p-6 bg-[#1E3A2B]"
            >
              <img
                src="/assets/formule-plateaux-repas.jpg"
                alt="Plateaux repas d'entreprise individuels YAMOOH"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-[0.78]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="relative z-10 flex items-end justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#F2B705]">02 • Déjeuner Réunion</span>
                  <h3 className="text-lg sm:text-xl font-display font-bold text-white uppercase leading-snug mt-1">
                    Plateaux repas d'entreprise
                  </h3>
                  <p className="text-xs text-white/80 line-clamp-2 mt-1 font-light">
                    Formules complètes individuelles avec entrée, plat signature, dessert et boisson.
                  </p>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-white/90 group-hover:bg-[#D96B43] text-[#1E3A2B] group-hover:text-white flex items-center justify-center shrink-0 ml-3 transition-colors shadow-sm">
                  <ArrowRight size={18} />
                </div>
              </div>
            </Link>

            {/* CARTE 3 : COCKTAILS SALÉS ET SUCRÉS */}
            <Link
              to="/cocktail"
              className="group relative rounded-3xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 aspect-4/5 flex flex-col justify-end p-6 bg-[#1E3A2B]"
            >
              <img
                src="/assets/formule-cocktail.jpg"
                alt="Cocktail salé et sucré pour événements professionnels"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-[0.78]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="relative z-10 flex items-end justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#F2B705]">03 • Finger Food</span>
                  <h3 className="text-lg sm:text-xl font-display font-bold text-white uppercase leading-snug mt-1">
                    Cocktails salés et sucrés
                  </h3>
                  <p className="text-xs text-white/80 line-clamp-2 mt-1 font-light">
                    Verrines, canapés gourmets, mini-brochettes et bouchées cocktail pour vos réceptions.
                  </p>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-white/90 group-hover:bg-[#D96B43] text-[#1E3A2B] group-hover:text-white flex items-center justify-center shrink-0 ml-3 transition-colors shadow-sm">
                  <ArrowRight size={18} />
                </div>
              </div>
            </Link>

            {/* CARTE 4 : BUFFET D'ENTREPRISE */}
            <Link
              to="/buffet"
              className="group relative rounded-3xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 aspect-4/5 flex flex-col justify-end p-6 bg-[#1E3A2B]"
            >
              <img
                src="/assets/formule-buffet.jpg"
                alt="Buffet d'entreprise et salades XXL YAMOOH Douala"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-[0.78]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="relative z-10 flex items-end justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#F2B705]">04 • Partage & Convivialité</span>
                  <h3 className="text-lg sm:text-xl font-display font-bold text-white uppercase leading-snug mt-1">
                    Buffet d'entreprise
                  </h3>
                  <p className="text-xs text-white/80 line-clamp-2 mt-1 font-light">
                    Salades XXL en saladiers de présentation, plats chauds généreux et buffets complets.
                  </p>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-white/90 group-hover:bg-[#D96B43] text-[#1E3A2B] group-hover:text-white flex items-center justify-center shrink-0 ml-3 transition-colors shadow-sm">
                  <ArrowRight size={18} />
                </div>
              </div>
            </Link>

            {/* CARTE 5 : SANDWICHS, PLATS À RÉCHAUFFER ET DESSERTS */}
            <Link
              to="/salades-plats-sandwichs"
              className="group relative rounded-3xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 aspect-4/5 flex flex-col justify-end p-6 bg-[#1E3A2B]"
            >
              <img
                src="/assets/formule-sandwichs-plats.jpg"
                alt="Sandwichs gourmets et plats préparés sains"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-[0.78]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="relative z-10 flex items-end justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#F2B705]">05 • Déjeuner Express</span>
                  <h3 className="text-lg sm:text-xl font-display font-bold text-white uppercase leading-snug mt-1">
                    Sandwichs, plats & desserts
                  </h3>
                  <p className="text-xs text-white/80 line-clamp-2 mt-1 font-light">
                    Pains artisanaux garnis, plats chauds prêts à déguster et douceurs sucrées faites maison.
                  </p>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-white/90 group-hover:bg-[#D96B43] text-[#1E3A2B] group-hover:text-white flex items-center justify-center shrink-0 ml-3 transition-colors shadow-sm">
                  <ArrowRight size={18} />
                </div>
              </div>
            </Link>

            {/* CARTE 6 : COLLECTION DU MOMENT */}
            <Link
              to="/collection-du-moment"
              className="group relative rounded-3xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 aspect-4/5 flex flex-col justify-end p-6 bg-[#1E3A2B]"
            >
              <img
                src="/assets/formule-collection-moment.jpg"
                alt="Collection du moment YAMOOH"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-[0.78]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="relative z-10 flex items-end justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#F2B705]">06 • Éphémère</span>
                  <h3 className="text-lg sm:text-xl font-display font-bold text-white uppercase leading-snug mt-1">
                    Collection du moment
                  </h3>
                  <p className="text-xs text-white/80 line-clamp-2 mt-1 font-light">
                    Les créations saisonnières de notre chef cuisinier au gré des arrivages maraîchers.
                  </p>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-white/90 group-hover:bg-[#D96B43] text-[#1E3A2B] group-hover:text-white flex items-center justify-center shrink-0 ml-3 transition-colors shadow-sm">
                  <ArrowRight size={18} />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 9. « NOS SERVICES ÉVÉNEMENTIELS SUR MESURE » (Collage Mosaïque) */}
      {/* ==================================================================== */}
      <section className="py-20 lg:py-28 bg-white overflow-hidden">
        <div className="container-tight">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Gauche : Présentation et Titre Multi-lignes */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-[#D96B43] text-xs uppercase tracking-widest font-bold font-mono">
                Prestations Haut de Gamme
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-[#1E3A2B] uppercase tracking-tight leading-[1.1]">
                Nos services
                <br />
                événementiels
                <br />
                sur mesure
              </h2>

              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                YAMOOH vous accompagne dans la conception globale de vos événements professionnels et privés à Douala : séminaires d'entreprise, déjeuners de direction, réceptions diplomatiques, lancements de produits, mariages et célébrations familiales.
              </p>

              <div className="space-y-3 text-xs sm:text-sm text-foreground">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#E3ECE6] text-[#1E3A2B] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 size={14} />
                  </div>
                  <span>Conseil culinaire & personnalisation de votre menu traiteur</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#E3ECE6] text-[#1E3A2B] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 size={14} />
                  </div>
                  <span>Équipe de service dédiée et dressage soigné de vos buffets</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#E3ECE6] text-[#1E3A2B] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 size={14} />
                  </div>
                  <span>Ponctualité garantie et logistique isotherme professionnelle</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <Link
                  to="/services-evenementiels"
                  className="inline-flex items-center gap-2 bg-[#1E3A2B] hover:bg-[#162a1f] text-white text-xs sm:text-sm font-bold uppercase tracking-wider px-8 py-3.5 rounded-full transition shadow-soft cursor-pointer"
                >
                  <span>En savoir plus</span>
                  <ArrowRight size={15} />
                </Link>
                <Link
                  to="/devis"
                  className="inline-flex items-center gap-2 bg-[#D96B43] hover:bg-[#c45b34] text-white text-xs sm:text-sm font-bold uppercase tracking-wider px-8 py-3.5 rounded-full transition shadow-soft cursor-pointer"
                >
                  <span>Demande de devis</span>
                </Link>
              </div>
            </div>

            {/* Droite : Collage Photographique Mosaïque */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-2 gap-4">
                {/* Photo Principale Verticale */}
                <div className="row-span-2 rounded-3xl overflow-hidden shadow-elevated bg-[#1E3A2B] relative aspect-3/4 sm:aspect-auto">
                  <img
                    src="/assets/services-evenementiels.jpg"
                    alt="Équipe traiteur YAMOOH dressant un banquet gastronomique à Douala"
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700 filter brightness-95"
                  />
                  <div className="absolute bottom-4 left-4 right-4 bg-[#1E3A2B]/85 backdrop-blur-md p-3.5 rounded-2xl text-white text-xs">
                    <p className="font-bold">Dressage gastronomique</p>
                    <p className="text-[10px] text-white/80">Équipe traiteur YAMOOH Douala</p>
                  </div>
                </div>

                {/* Photo Secondaire 1 : Installation Buffet */}
                <div className="rounded-3xl overflow-hidden shadow-card bg-[#FAF8F5] relative aspect-4/3">
                  <img
                    src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80"
                    alt="Mise en place de buffet d'événement"
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 text-[#1E3A2B] text-[9px] font-bold uppercase px-2.5 py-1 rounded-full shadow-xs">
                    Buffets VIP
                  </div>
                </div>

                {/* Photo Secondaire 2 : Table Événementielle Élégante */}
                <div className="rounded-3xl overflow-hidden shadow-card bg-[#FAF8F5] relative aspect-4/3">
                  <img
                    src="https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=800&q=80"
                    alt="Table événementielle et ambiance de réception"
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 text-[#1E3A2B] text-[9px] font-bold uppercase px-2.5 py-1 rounded-full shadow-xs">
                    Réceptions
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 10. « DÉCOUVREZ NOS RÉALISATIONS » */}
      {/* ==================================================================== */}
      <section className="py-20 lg:py-28 bg-[#1E3A2B] text-white">
        <div className="container-tight">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div className="space-y-3 max-w-xl">
              <span className="text-[#F2B705] text-xs uppercase tracking-widest font-bold font-mono">
                Portfolio & Événements
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black uppercase tracking-tight leading-tight">
                Découvrez nos réalisations
              </h2>
              <p className="text-white/80 text-xs sm:text-sm font-light leading-relaxed">
                Des dizaines d'entreprises et d'organisations de Douala nous confient leurs cocktails, buffets et déjeuners d'affaires.
              </p>
            </div>

            <Link
              to="/services-evenementiels/inspirations"
              className="inline-flex items-center gap-2 bg-white hover:bg-white/90 text-[#1E3A2B] text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-full transition shrink-0 shadow-soft"
            >
              <span>Voir nos réalisations</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          {/* 3 Grandes Cartes Verticales */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* RÉALISATION 1 */}
            <div className="group relative rounded-3xl overflow-hidden shadow-elevated aspect-3/4 bg-black/40 flex flex-col justify-end p-6">
              <img
                src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80"
                alt="Cocktail d'entreprise à Douala"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-[0.75]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="relative z-10 flex items-end justify-between">
                <div>
                  <span className="bg-[#D96B43] text-white text-[9px] font-bold uppercase px-2.5 py-1 rounded-full">
                    Cocktail B2B
                  </span>
                  <h3 className="text-lg font-display font-bold text-white uppercase mt-2">
                    Cocktail d'entreprise • 150 convives
                  </h3>
                  <p className="text-xs text-white/80 font-light mt-1">
                    Bouchées salées signatures, verrines fraîches & service en salle à Bonanjo.
                  </p>
                </div>
                <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md text-white flex items-center justify-center shrink-0 ml-3">
                  <ArrowRight size={16} />
                </div>
              </div>
            </div>

            {/* RÉALISATION 2 */}
            <div className="group relative rounded-3xl overflow-hidden shadow-elevated aspect-3/4 bg-black/40 flex flex-col justify-end p-6">
              <img
                src="https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80"
                alt="Réception buffet d'entreprise"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-[0.75]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="relative z-10 flex items-end justify-between">
                <div>
                  <span className="bg-[#1E3A2B] text-white text-[9px] font-bold uppercase px-2.5 py-1 rounded-full border border-white/20">
                    Séminaire Annuel
                  </span>
                  <h3 className="text-lg font-display font-bold text-white uppercase mt-2">
                    Buffet déjeunatoire • 80 collaborateurs
                  </h3>
                  <p className="text-xs text-white/80 font-light mt-1">
                    Salades XXL, plateaux gourmets & fontaines de jus naturels d'hibiscus et ananas.
                  </p>
                </div>
                <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md text-white flex items-center justify-center shrink-0 ml-3">
                  <ArrowRight size={16} />
                </div>
              </div>
            </div>

            {/* RÉALISATION 3 */}
            <div className="group relative rounded-3xl overflow-hidden shadow-elevated aspect-3/4 bg-black/40 flex flex-col justify-end p-6 sm:col-span-2 lg:col-span-1">
              <img
                src="https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=800&q=80"
                alt="Événement avec service traiteur VIP"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-[0.75]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="relative z-10 flex items-end justify-between">
                <div>
                  <span className="bg-[#F2B705] text-[#1E3A2B] text-[9px] font-bold uppercase px-2.5 py-1 rounded-full">
                    Soirée Privée
                  </span>
                  <h3 className="text-lg font-display font-bold text-white uppercase mt-2">
                    Lancement & Célébration • Douala
                  </h3>
                  <p className="text-xs text-white/80 font-light mt-1">
                    Prestation complète avec maître d'hôtel, animation culinaire et mise en scène soignée.
                  </p>
                </div>
                <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md text-white flex items-center justify-center shrink-0 ml-3">
                  <ArrowRight size={16} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 11. BLOC DE RÉASSURANCE (5 Colonnes Aérées) */}
      {/* ==================================================================== */}
      <section className="py-20 lg:py-24 bg-white border-b border-border">
        <div className="container-tight">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-10">
            {/* Colonne 1 */}
            <div className="space-y-3 text-center sm:text-left">
              <div className="w-12 h-12 rounded-2xl bg-[#E3ECE6] text-[#1E3A2B] flex items-center justify-center mx-auto sm:mx-0 shadow-2xs">
                <Truck size={22} />
              </div>
              <h3 className="font-display font-bold text-xs uppercase tracking-wider text-[#1E3A2B]">
                Livraison
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Une organisation pensée pour vos commandes rapides partout à Douala.
              </p>
            </div>

            {/* Colonne 2 */}
            <div className="space-y-3 text-center sm:text-left">
              <div className="w-12 h-12 rounded-2xl bg-[#FAF0D8] text-[#D96B43] flex items-center justify-center mx-auto sm:mx-0 shadow-2xs">
                <FileText size={22} />
              </div>
              <h3 className="font-display font-bold text-xs uppercase tracking-wider text-[#1E3A2B]">
                Devis sur mesure
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Des solutions adaptées à vos effectifs et exigences budgétaires.
              </p>
            </div>

            {/* Colonne 3 */}
            <div className="space-y-3 text-center sm:text-left">
              <div className="w-12 h-12 rounded-2xl bg-[#E3ECE6] text-[#1E3A2B] flex items-center justify-center mx-auto sm:mx-0 shadow-2xs">
                <Sparkles size={22} />
              </div>
              <h3 className="font-display font-bold text-xs uppercase tracking-wider text-[#1E3A2B]">
                Vos événements sur mesure
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Une prestation conçue selon le rythme de votre événement.
              </p>
            </div>

            {/* Colonne 4 */}
            <div className="space-y-3 text-center sm:text-left">
              <div className="w-12 h-12 rounded-2xl bg-[#FAF0D8] text-[#D96B43] flex items-center justify-center mx-auto sm:mx-0 shadow-2xs">
                <Leaf size={22} />
              </div>
              <h3 className="font-display font-bold text-xs uppercase tracking-wider text-[#1E3A2B]">
                Frais, local, fait sur place
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Une cuisine pensée autour de produits maraîchers frais de la région.
              </p>
            </div>

            {/* Colonne 5 */}
            <div className="space-y-3 text-center sm:text-left col-span-2 md:col-span-1">
              <div className="w-12 h-12 rounded-2xl bg-[#E3ECE6] text-[#1E3A2B] flex items-center justify-center mx-auto sm:mx-0 shadow-2xs">
                <ShieldCheck size={22} />
              </div>
              <h3 className="font-display font-bold text-xs uppercase tracking-wider text-[#1E3A2B]">
                Paiement sécurisé
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Un parcours de commande simple : Cash, Orange Money, MTN MoMo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 12. BLOC FAQ (Questions Fréquentes) */}
      {/* ==================================================================== */}
      <section className="py-20 lg:py-28 bg-[#FAF8F5]">
        <div className="container-tight">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Gauche : Grande Photographie Verticale */}
            <div className="lg:col-span-5 rounded-3xl overflow-hidden shadow-elevated bg-[#1E3A2B] relative aspect-3/4 sm:aspect-4/5 lg:aspect-3/4">
              <img
                src="/assets/faq-cuisine-yamooh.jpg"
                alt="Chef cuisinier YAMOOH préparant des produits frais dans notre cuisine à Douala"
                className="w-full h-full object-cover object-center filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1E3A2B]/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <p className="font-display font-bold text-lg uppercase">Une question sur nos services ?</p>
                <p className="text-xs text-white/80 font-light">Notre équipe est disponible 6j/7 pour vous guider.</p>
              </div>
            </div>

            {/* Droite : Questions & Accordéons */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-[#D96B43] text-xs uppercase tracking-widest font-bold font-mono">
                  Aide & Informations
                </span>
                <h2 className="text-3xl sm:text-4xl font-display font-black text-[#1E3A2B] uppercase tracking-tight mt-1">
                  Questions fréquentes
                </h2>
                <Link
                  to="/faq"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D96B43] hover:underline mt-2 uppercase tracking-wider"
                >
                  <span>Consulter la FAQ complète</span>
                  <ArrowRight size={13} />
                </Link>
              </div>

              {/* Accordéons */}
              <div className="space-y-3 pt-2">
                {/* Question 1 */}
                <div className="bg-white border border-border/80 rounded-2xl p-5 shadow-2xs transition-all">
                  <button
                    onClick={() => toggleFaq(0)}
                    className="w-full flex items-center justify-between text-left font-bold text-xs sm:text-sm text-[#1E3A2B] cursor-pointer gap-4"
                  >
                    <span>En combien de temps pouvez-vous préparer et livrer nos commandes traiteur ?</span>
                    <div className="w-7 h-7 rounded-full bg-[#FAF8F5] flex items-center justify-center shrink-0 text-[#1E3A2B]">
                      {faqOpen === 0 ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                  </button>
                  {faqOpen === 0 && (
                    <div className="pt-3.5 mt-2 border-t border-border/60 text-xs text-muted-foreground leading-relaxed animate-fade-up">
                      Pour les commandes individuelles et déjeuners de bureau (salades, sandwichs, formules du jour), la livraison est effectuée en 30 à 45 minutes à Douala. Pour les plateaux repas de groupe et cocktails traiteur, nous recommandons de commander la veille ou 48h à l'avance pour une personnalisation optimale.
                    </div>
                  )}
                </div>

                {/* Question 2 */}
                <div className="bg-white border border-border/80 rounded-2xl p-5 shadow-2xs transition-all">
                  <button
                    onClick={() => toggleFaq(1)}
                    className="w-full flex items-center justify-between text-left font-bold text-xs sm:text-sm text-[#1E3A2B] cursor-pointer gap-4"
                  >
                    <span>Où sont préparés vos produits ?</span>
                    <div className="w-7 h-7 rounded-full bg-[#FAF8F5] flex items-center justify-center shrink-0 text-[#1E3A2B]">
                      {faqOpen === 1 ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                  </button>
                  {faqOpen === 1 && (
                    <div className="pt-3.5 mt-2 border-t border-border/60 text-xs text-muted-foreground leading-relaxed animate-fade-up">
                      Toutes nos recettes sont cuisinées et dressées chaque matin dans notre cuisine centrale située à la Pharmacie Kotto à Douala. Nous sélectionnons nos fruits, légumes et aromates auprès de producteurs locaux partenaires.
                    </div>
                  )}
                </div>

                {/* Question 3 */}
                <div className="bg-white border border-border/80 rounded-2xl p-5 shadow-2xs transition-all">
                  <button
                    onClick={() => toggleFaq(2)}
                    className="w-full flex items-center justify-between text-left font-bold text-xs sm:text-sm text-[#1E3A2B] cursor-pointer gap-4"
                  >
                    <span>Puis-je commander directement en ligne et demander un devis ?</span>
                    <div className="w-7 h-7 rounded-full bg-[#FAF8F5] flex items-center justify-center shrink-0 text-[#1E3A2B]">
                      {faqOpen === 2 ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                  </button>
                  {faqOpen === 2 && (
                    <div className="pt-3.5 mt-2 border-t border-border/60 text-xs text-muted-foreground leading-relaxed animate-fade-up">
                      Absolument ! Vous pouvez commander directement en quelques clics via notre carte en ligne ou composer votre salade sur-mesure dans notre Salad Builder. Pour les réceptions d'entreprise ou événements, utilisez notre formulaire de devis en ligne pour recevoir une proposition sous 2 heures.
                    </div>
                  )}
                </div>

                {/* Question 4 */}
                <div className="bg-white border border-border/80 rounded-2xl p-5 shadow-2xs transition-all">
                  <button
                    onClick={() => toggleFaq(3)}
                    className="w-full flex items-center justify-between text-left font-bold text-xs sm:text-sm text-[#1E3A2B] cursor-pointer gap-4"
                  >
                    <span>Proposez-vous des options adaptées à différents régimes alimentaires ?</span>
                    <div className="w-7 h-7 rounded-full bg-[#FAF8F5] flex items-center justify-center shrink-0 text-[#1E3A2B]">
                      {faqOpen === 3 ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                  </button>
                  {faqOpen === 3 && (
                    <div className="pt-3.5 mt-2 border-t border-border/60 text-xs text-muted-foreground leading-relaxed animate-fade-up">
                      Oui, nous proposons une large gamme végétarienne, végane, sans gluten et sans lactose, ainsi que des viandes blanches sélectionnées (poulet braisé, jambon de dinde). Notre Salad Builder vous permet d'adapter précisément chaque ingrédient.
                    </div>
                  )}
                </div>

                {/* Question 5 */}
                <div className="bg-white border border-border/80 rounded-2xl p-5 shadow-2xs transition-all">
                  <button
                    onClick={() => toggleFaq(4)}
                    className="w-full flex items-center justify-between text-left font-bold text-xs sm:text-sm text-[#1E3A2B] cursor-pointer gap-4"
                  >
                    <span>Livrez-vous dans les bureaux, salles de réunion ou lieux d'événements ?</span>
                    <div className="w-7 h-7 rounded-full bg-[#FAF8F5] flex items-center justify-center shrink-0 text-[#1E3A2B]">
                      {faqOpen === 4 ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                  </button>
                  {faqOpen === 4 && (
                    <div className="pt-3.5 mt-2 border-t border-border/60 text-xs text-muted-foreground leading-relaxed animate-fade-up">
                      Oui, notre flotte de coursiers dessert l'ensemble de la métropole de Douala : Akwa, Bonanjo, Bonapriso, Kotto, Makepe, Bali, Denver, Deido, etc. Nous livrons directement à l'accueil de votre société ou sur le lieu de votre réception.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 13. BLOC « BESOIN DE CONSEILS ? » (Contact Fort) */}
      {/* ==================================================================== */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="container-tight">
          <div className="relative rounded-3xl overflow-hidden shadow-elevated bg-[#1E3A2B] text-white">
            <div className="grid lg:grid-cols-12 items-center">
              {/* Image à Gauche */}
              <div className="lg:col-span-6 relative aspect-4/3 sm:aspect-16/10 lg:aspect-auto lg:h-full min-h-[320px]">
                <img
                  src="/assets/conseil-traiteur-yamooh.jpg"
                  alt="Équipe traiteur YAMOOH prête à vous conseiller à Douala"
                  className="w-full h-full object-cover object-center filter brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#1E3A2B]/40 to-[#1E3A2B] hidden lg:block" />
              </div>

              {/* Bloc de Contact à Droite */}
              <div className="lg:col-span-6 p-8 sm:p-12 lg:p-14 space-y-6">
                <span className="text-[#F2B705] text-xs uppercase tracking-widest font-bold font-mono">
                  Conseil & Accompagnement
                </span>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black uppercase tracking-tight leading-tight">
                  Besoin de conseils ?
                  <br />
                  Contactez-nous
                </h2>

                <p className="text-white/85 text-xs sm:text-sm font-light leading-relaxed">
                  Notre équipe commerciale et notre chef sont à votre disposition pour imaginer ensemble la formule idéale pour votre événement ou vos déjeuners réguliers d'équipe.
                </p>

                <div className="space-y-3 pt-2 text-xs sm:text-sm">
                  <a
                    href="https://wa.me/237658254509"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-white/10 hover:bg-[#25D366] text-white p-3 rounded-2xl transition border border-white/15"
                  >
                    <MessageCircle size={18} className="text-[#F2B705]" />
                    <span className="font-bold">WhatsApp direct : +237 658 254 509</span>
                  </a>

                  <a
                    href="mailto:tchokonte@gmail.com"
                    className="flex items-center gap-3 bg-white/10 hover:bg-white/20 text-white p-3 rounded-2xl transition border border-white/15"
                  >
                    <Mail size={18} className="text-[#F2B705]" />
                    <span className="font-bold">Email : tchokonte@gmail.com</span>
                  </a>
                </div>

                <div className="pt-2 flex flex-wrap gap-4">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 bg-[#D96B43] hover:bg-[#c45b34] text-white text-xs sm:text-sm font-bold uppercase tracking-wider px-8 py-3.5 rounded-full transition shadow-soft cursor-pointer"
                  >
                    <span>Nous contacter</span>
                    <ArrowRight size={15} />
                  </Link>
                  <Link
                    to="/devis"
                    className="inline-flex items-center gap-2 bg-white text-[#1E3A2B] hover:bg-white/90 text-xs sm:text-sm font-bold uppercase tracking-wider px-8 py-3.5 rounded-full transition shadow-soft cursor-pointer"
                  >
                    <span>Faire un devis</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 14. LOCALISATION (Google Maps Interactive Pharmacie Kotto) */}
      {/* ==================================================================== */}
      <section className="py-20 lg:py-28 bg-[#FAF8F5] border-t border-border">
        <div className="container-tight">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-[#D96B43] text-xs uppercase tracking-widest font-bold font-mono">
              Implantation & Retrait
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-[#1E3A2B] uppercase tracking-tight">
              Nous trouver
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Pharmacie Kotto, Douala • Point de retrait Click & Collect & Cuisine Centrale
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-10 items-start">
            {/* Infos Pratiques à Gauche */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white border border-border/80 rounded-3xl p-8 shadow-card space-y-6">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-[#E3ECE6] text-[#1E3A2B] px-3 py-1 rounded-full">
                    Établissement Principal
                  </span>
                  <h3 className="text-2xl font-display font-bold text-[#1E3A2B] mt-2">
                    YAMOOH Douala
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Pharmacie Kotto, Arrondissement de Douala 5ème, Cameroun
                  </p>
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-muted-foreground border-t border-border/60 pt-4">
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-[#E3ECE6] text-[#1E3A2B] flex items-center justify-center shrink-0 mt-0.5">
                      <Clock size={18} />
                    </div>
                    <div>
                      <strong className="block font-bold text-foreground">Horaires d'ouverture :</strong>
                      <span>Lundi au Samedi : 10h00 – 21h00 sans interruption</span>
                      <p className="text-[11px] text-[#D96B43] mt-0.5 font-medium">Dimanche sur réservation traiteur</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-[#FAF0D8] text-[#D96B43] flex items-center justify-center shrink-0 mt-0.5">
                      <Phone size={18} />
                    </div>
                    <div>
                      <strong className="block font-bold text-foreground">Téléphone & WhatsApp :</strong>
                      <span>+237 658 254 509</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-[#E3ECE6] text-[#1E3A2B] flex items-center justify-center shrink-0 mt-0.5">
                      <Truck size={18} />
                    </div>
                    <div>
                      <strong className="block font-bold text-foreground">Zones Livrées :</strong>
                      <span>Akwa, Bonanjo, Bonapriso, Kotto, Makepe, Bali, Denver et tout Douala.</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap gap-3">
                  <Link
                    to="/contact/plan-dacces"
                    className="inline-flex items-center gap-1.5 bg-[#1E3A2B] hover:bg-[#162a1f] text-white px-5 py-2.5 rounded-full text-xs font-bold transition"
                  >
                    <span>Plan d'accès détaillé</span>
                    <ArrowRight size={13} />
                  </Link>
                  <a
                    href="https://wa.me/237658254509"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20bd5a] text-white px-5 py-2.5 rounded-full text-xs font-bold transition"
                  >
                    <MessageCircle size={14} />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Carte Google Maps Interactive à Droite */}
            <div className="lg:col-span-7">
              <GoogleMapLocation showDetails={false} ratio="16/10" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
