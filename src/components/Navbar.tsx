import { Link, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { 
  Menu, 
  X, 
  ShoppingBag, 
  User, 
  Search, 
  ChevronDown, 
  ArrowRight,
  MapPin,
  Plus,
  Building2,
  FileText,
  Check
} from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import Logo from "./Logo";
import { UNIVERSES } from "../data/universes";

const POPULAR_QUARTERS = [
  "Pharmacie Kotto (Point de retrait)",
  "Akwa",
  "Bonanjo",
  "Bonapriso",
  "Kotto",
  "Makepe",
  "Bali",
  "Deido",
  "Denver / Bonamoussadi",
  "Logpom",
  "Yassa / Japoma"
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  
  // État d'ouverture exclusive du Mega-Menu (CLIC UNIQUEMENT SUR LA FLÈCHE)
  const [openMegaUniverse, setOpenMegaUniverse] = useState<string | null>(null);
  const [expandedMobileUniv, setExpandedMobileUniv] = useState<string | null>(null);
  
  // Localisation / Adresse client
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<string>(() => {
    return localStorage.getItem("yamooh_delivery_address") || "";
  });
  const [customAddressInput, setCustomAddressInput] = useState("");

  const headerRef = useRef<HTMLElement | null>(null);
  const location = useLocation();
  const { count } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fermer les menus lors d'un changement d'URL
  useEffect(() => {
    setMobileOpen(false);
    setOpenMegaUniverse(null);
    setAddressModalOpen(false);
  }, [location.pathname]);

  // Fermer les menus par touche Échap
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenMegaUniverse(null);
        setMobileOpen(false);
        setAddressModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Fermer les menus lors d'un clic en dehors du Header
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpenMegaUniverse(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Bascule de l'ouverture du Mega-Menu (CLIC FLÈCHE UNIQUEMENT)
  const toggleMegaMenu = (univId: string) => {
    setOpenMegaUniverse((prev) => (prev === univId ? null : univId));
  };

  const toggleMobileUniv = (id: string) => {
    setExpandedMobileUniv((prev) => (prev === id ? null : id));
  };

  const handleSaveAddress = (addr: string) => {
    setSelectedAddress(addr);
    localStorage.setItem("yamooh_delivery_address", addr);
    setAddressModalOpen(false);
  };

  const currentOpenUniverse = UNIVERSES.find((u) => u.id === openMegaUniverse);

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-8 left-0 right-0 z-40 transition-all duration-200 bg-white dark:bg-[#121E17] shadow-xs ${
          scrolled ? "shadow-md" : ""
        }`}
      >
        {/* ========================================================================= */}
        {/* LIGNE 1 — HEADER UTILITAIRE (H ≈ 64–70px)                                 */}
        {/* Organisation : Logo + Adresse | espace | Établissements + Devis + Recherche + Compte + Panier */}
        {/* ========================================================================= */}
        <div className="w-full border-b border-border/70">
          <div className="w-full max-w-[1920px] mx-auto px-3 sm:px-5 lg:px-8 flex items-center justify-between h-16 sm:h-[68px]">
            {/* 1.1 GAUCHE : LOGO YAMOOH + LOCALISATION */}
            <div className="flex items-center gap-3 sm:gap-5 min-w-0">
              {/* Logo */}
              <Link to="/" className="flex items-center shrink-0 group" aria-label="YAMOOH accueil">
                <Logo variant="dark" />
              </Link>

              {/* Barre de séparation discrète */}
              <span className="hidden md:inline-block w-px h-7 bg-border/80" />

              {/* Adresse / Zone de Livraison (Visible dès sm) */}
              <button
                onClick={() => setAddressModalOpen(true)}
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FAF8F5] dark:bg-white/5 hover:bg-[#E3ECE6]/50 dark:hover:bg-white/10 border border-border/80 text-left transition-colors cursor-pointer group max-w-[260px] lg:max-w-[340px]"
                title="Choisir votre adresse de livraison ou point de retrait"
              >
                <div className="w-6 h-6 rounded-full bg-[#D96B43]/10 text-[#D96B43] flex items-center justify-center shrink-0">
                  <MapPin size={13} />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="block text-[11px] font-bold text-[#1E3A2B] dark:text-white truncate">
                    {selectedAddress || "Entrez votre adresse pour commander"}
                  </span>
                  <span className="block text-[9.5px] text-muted-foreground truncate">
                    Douala • Pharmacie Kotto & Livraison
                  </span>
                </div>
                <div className="w-5 h-5 rounded-full bg-black/5 dark:bg-white/10 text-muted-foreground group-hover:text-[#D96B43] flex items-center justify-center shrink-0">
                  <Plus size={11} />
                </div>
              </button>
            </div>

            {/* 1.2 DROITE : ÉTABLISSEMENTS + BOUTON DEVIS + RECHERCHE + COMPTE + PANIER */}
            <div className="flex items-center gap-1 sm:gap-2 lg:gap-3 shrink-0">
              {/* Nos Établissements (Lien discret avec icône) */}
              <Link
                to="/yamooh/etablissements"
                className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold text-[#1E3A2B] dark:text-white/90 hover:text-[#D96B43] hover:bg-black/5 dark:hover:bg-white/5 transition"
              >
                <Building2 size={15} className="text-[#D96B43]" />
                <span>Nos établissements</span>
              </Link>

              {/* Bouton FAIRE UN DEVIS */}
              <Link
                to="/devis"
                className="hidden sm:inline-flex items-center gap-1.5 bg-[#D96B43] hover:bg-[#c45b34] text-white px-4 py-2 rounded-full font-bold text-xs uppercase tracking-wider shadow-xs transition hover:scale-102"
              >
                <FileText size={13} />
                <span>Faire un devis</span>
              </Link>

              {/* Séparateur */}
              <span className="hidden sm:inline-block w-px h-6 bg-border/80 mx-0.5" />

              {/* ICÔNE RECHERCHE */}
              <Link
                to="/recherche"
                aria-label="Rechercher sur la carte"
                className="p-2 sm:p-2.5 rounded-full hover:bg-secondary/80 text-[#1E3A2B] dark:text-white/90 hover:text-[#D96B43] transition flex items-center justify-center"
                title="Rechercher un plat, un univers ou un service"
              >
                <Search size={19} />
              </Link>

              {/* ICÔNE COMPTE */}
              <Link
                to={user ? "/account" : "/auth"}
                aria-label="Mon compte YAMOOH"
                className="p-2 sm:p-2.5 rounded-full hover:bg-secondary/80 text-[#1E3A2B] dark:text-white/90 hover:text-[#D96B43] transition flex items-center justify-center"
                title={user ? "Accéder à mon compte client" : "Se connecter / S'inscrire"}
              >
                <User size={19} />
              </Link>

              {/* ICÔNE PANIER */}
              <Link
                to="/cart"
                aria-label="Mon panier"
                className="relative p-2 sm:p-2.5 rounded-full hover:bg-secondary/80 text-[#1E3A2B] dark:text-white/90 hover:text-[#D96B43] transition flex items-center justify-center"
                title="Voir mon panier de commande"
              >
                <ShoppingBag size={19} />
                {count > 0 && (
                  <span className="absolute top-0.5 right-0.5 bg-[#D96B43] text-white text-[10px] font-black rounded-full min-w-4 h-4 px-1 flex items-center justify-center shadow-xs animate-scale-in">
                    {count}
                  </span>
                )}
              </Link>

              {/* Bouton Hamburger Mobile (< 1200px) */}
              <button
                className="min-[1200px]:hidden p-2 rounded-xl bg-secondary hover:bg-secondary/80 text-[#1E3A2B] dark:text-white cursor-pointer ml-1"
                onClick={() => setMobileOpen((o) => !o)}
                aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* LIGNE 2 — NAVIGATION PRINCIPALE (H ≈ 48–54px)                             */}
        {/* Exclusivement réservée aux 7 grandes catégories/univers                    */}
        {/* Clic sur le NOM = Navigation directe                                     */}
        {/* Clic sur la FLÈCHE = Ouverture / Fermeture exclusive du sous-menu          */}
        {/* ========================================================================= */}
        <div className="hidden min-[1200px]:block w-full bg-white dark:bg-[#15241C] border-b border-border/80">
          <div className="w-full max-w-[1920px] mx-auto px-4 lg:px-8">
            <nav className="flex items-center justify-center h-12" aria-label="Navigation principale">
              <ul className="flex items-center justify-between w-full max-w-6xl list-none m-0 p-0">
                {UNIVERSES.map((univ) => {
                  const isActive = location.pathname.startsWith(`/${univ.slug}`);
                  const isOpen = openMegaUniverse === univ.id;

                  // Libellés concis pour la ligne 2
                  let displayLabel = univ.name;
                  if (univ.id === "cocktail") displayLabel = "COCKTAIL DEBOUT";
                  if (univ.id === "buffet") displayLabel = "BUFFET ASSIS";

                  return (
                    <li
                      key={univ.id}
                      className="relative h-12 flex items-center"
                    >
                      <div
                        className={`flex items-center rounded-full transition-all border ${
                          isOpen
                            ? "bg-[#1E3A2B] text-white border-[#1E3A2B] shadow-xs"
                            : isActive
                            ? "bg-[#1E3A2B]/10 dark:bg-white/10 text-[#1E3A2B] dark:text-white border-[#1E3A2B]/20 dark:border-white/20"
                            : "bg-transparent text-[#1E3A2B] dark:text-white/90 border-transparent hover:bg-black/5 dark:hover:bg-white/5"
                        }`}
                      >
                        {/* ZONE 1 : CLIC SUR LE NOM → NAVIGATION VERS LA CATÉGORIE */}
                        <Link
                          to={`/${univ.slug}`}
                          className={`pl-3.5 pr-1.5 py-1.5 text-[12px] 2xl:text-[13px] font-bold tracking-tight uppercase whitespace-nowrap transition-colors cursor-pointer ${
                            isOpen
                              ? "text-white"
                              : "text-[#1E3A2B] dark:text-white/90 hover:text-[#D96B43]"
                          }`}
                        >
                          {displayLabel}
                        </Link>

                        {/* ZONE 2 : CLIC SUR LA PETITE FLÈCHE → OUVERTURE DU SOUS-MENU EXCLUSIVE */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleMegaMenu(univ.id);
                          }}
                          aria-expanded={isOpen}
                          aria-controls={`mega-menu-${univ.id}`}
                          aria-label={
                            isOpen
                              ? `Fermer les sous-rubriques de ${univ.name}`
                              : `Afficher les sous-rubriques de ${univ.name}`
                          }
                          className={`pl-1 pr-2.5 py-1.5 flex items-center justify-center rounded-r-full transition-colors cursor-pointer ${
                            isOpen
                              ? "text-[#F2B705] hover:bg-white/10"
                              : "text-[#1E3A2B] dark:text-white/70 hover:text-[#D96B43] hover:bg-black/5 dark:hover:bg-white/10"
                          }`}
                        >
                          <ChevronDown
                            size={14}
                            className={`transition-transform duration-200 shrink-0 ${
                              isOpen ? "rotate-180 text-[#F2B705]" : "opacity-75"
                            }`}
                          />
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MEGA-MENU VISUEL À GRANDES CARTES SOUS LA LIGNE 2 (OUVERT AU CLIC SEUL)   */}
        {/* ========================================================================= */}
        {currentOpenUniverse && (
          <div
            id={`mega-menu-${currentOpenUniverse.id}`}
            className="hidden min-[1200px]:block absolute top-full left-0 right-0 bg-white dark:bg-[#121E17] border-b border-border shadow-2xl z-50 transition-all duration-200 animate-in fade-in slide-in-from-top-1"
          >
            <div className="w-full max-w-[1920px] mx-auto px-6 lg:px-10 py-7 space-y-6">
              {/* Barre de titre de l'univers avec bouton fermeture discret */}
              <div className="flex items-center justify-between border-b border-border/80 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-mono font-black text-[#D96B43] bg-[#D96B43]/10 px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                    Univers {currentOpenUniverse.number}
                  </span>
                  <h3 className="font-display font-black text-xl text-[#1E3A2B] dark:text-white uppercase tracking-tight">
                    {currentOpenUniverse.name}
                  </h3>
                </div>
                
                <div className="flex items-center gap-4">
                  <Link
                    to={`/${currentOpenUniverse.slug}`}
                    className="text-xs font-black text-[#1E3A2B] dark:text-[#F2B705] hover:text-[#D96B43] transition-colors flex items-center gap-1.5 uppercase tracking-wider"
                  >
                    <span>Voir tout l'univers ({currentOpenUniverse.shortTitle})</span>
                    <ArrowRight size={14} />
                  </Link>
                  <button
                    onClick={() => setOpenMegaUniverse(null)}
                    className="p-1.5 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground transition cursor-pointer"
                    aria-label="Fermer le sous-menu"
                    title="Fermer (Échap)"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Grille des Grandes Cartes Illustratives des Sous-Rubriques */}
              <div
                className={`grid gap-6 ${
                  currentOpenUniverse.subRubrics.length <= 3
                    ? "grid-cols-3"
                    : "grid-cols-4"
                }`}
              >
                {currentOpenUniverse.subRubrics.map((sub) => (
                  <Link
                    key={sub.id}
                    to={`/${currentOpenUniverse.slug}/${sub.slug}`}
                    className="bg-secondary/30 hover:bg-secondary/60 dark:bg-card dark:hover:bg-card/80 border border-border/80 hover:border-[#1E3A2B]/40 dark:hover:border-white/20 rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
                  >
                    {/* Grande Image Photographique Fidèle */}
                    <div className="relative aspect-16/10 w-full overflow-hidden bg-secondary">
                      <img
                        src={sub.image}
                        alt={sub.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-104"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                    </div>

                    {/* Contenu Texte & Lien */}
                    <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-2">
                      <div>
                        <h4 className="font-display font-black text-sm text-[#1E3A2B] dark:text-white group-hover:text-[#D96B43] transition-colors uppercase tracking-tight">
                          {sub.name}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
                          {sub.shortDesc}
                        </p>
                      </div>

                      <div className="pt-2 flex items-center justify-between text-xs font-bold text-[#1E3A2B] dark:text-[#F2B705] group-hover:text-[#D96B43] transition-colors">
                        <span className="text-[11px] font-mono uppercase tracking-wider">Explorer la gamme</span>
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TIROIR MOBILE (DRAWER ACCORDÉONS SUR MOBILES & TABLETTES < 1200px)        */}
        {/* ========================================================================= */}
        {mobileOpen && (
          <div className="min-[1200px]:hidden bg-background border-t border-border shadow-2xl max-h-[80vh] overflow-y-auto">
            <div className="w-full px-4 sm:px-6 py-4 space-y-4">
              {/* Adresse sur mobile */}
              <div className="p-3 bg-secondary/40 rounded-2xl border border-border flex items-center justify-between">
                <div className="flex items-center gap-2 min-w-0">
                  <MapPin size={16} className="text-[#D96B43] shrink-0" />
                  <span className="text-xs font-bold truncate">
                    {selectedAddress || "Douala • Pharmacie Kotto"}
                  </span>
                </div>
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    setAddressModalOpen(true);
                  }}
                  className="text-xs font-bold text-[#D96B43] underline shrink-0 ml-2 cursor-pointer"
                >
                  Modifier
                </button>
              </div>

              {/* Bouton Devis Mobile */}
              <Link
                to="/devis"
                className="w-full py-2.5 bg-[#D96B43] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs"
              >
                <FileText size={15} />
                <span>Demander un devis traiteur</span>
              </Link>

              {/* En-tête Mobile */}
              <div className="px-1 pt-1">
                <span className="text-[11px] font-mono font-black text-muted-foreground uppercase tracking-wider">
                  Les 7 Univers YAMOOH
                </span>
              </div>

              {/* Accordéons des 7 Univers */}
              <div className="space-y-1.5">
                {UNIVERSES.map((univ) => {
                  const isExpanded = expandedMobileUniv === univ.id;
                  const isActive = location.pathname.startsWith(`/${univ.slug}`);

                  return (
                    <div key={univ.id} className="border border-border/80 rounded-2xl overflow-hidden">
                      <div
                        className={`w-full flex items-center justify-between transition-colors ${
                          isActive ? "bg-[#1E3A2B] text-white" : "bg-secondary/30 text-foreground"
                        }`}
                      >
                        {/* Clic sur le NOM -> Navigation vers l'univers */}
                        <Link
                          to={`/${univ.slug}`}
                          className="flex-1 px-4 py-3 text-left font-display font-bold text-xs uppercase tracking-tight flex items-center gap-2"
                        >
                          <span className="font-mono text-[10px] opacity-75">{univ.number}</span>
                          <span>{univ.name}</span>
                        </Link>

                        {/* Clic sur la FLÈCHE -> Dépliage des sous-rubriques */}
                        <button
                          type="button"
                          onClick={() => toggleMobileUniv(univ.id)}
                          className="p-3 text-current hover:bg-black/10 transition-colors cursor-pointer"
                          aria-expanded={isExpanded}
                          aria-label={`Déplier les sous-rubriques de ${univ.name}`}
                        >
                          <ChevronDown
                            size={16}
                            className={`transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                          />
                        </button>
                      </div>

                      {isExpanded && (
                        <div className="bg-background p-3 space-y-2 border-t border-border/40 animate-in fade-in duration-150">
                          <Link
                            to={`/${univ.slug}`}
                            className="block px-3 py-2 rounded-xl text-xs font-bold text-[#D96B43] bg-secondary/30 hover:bg-secondary"
                          >
                            → Voir tous les produits ({univ.shortTitle})
                          </Link>
                          {univ.subRubrics.map((sub) => (
                            <Link
                              key={sub.id}
                              to={`/${univ.slug}/${sub.slug}`}
                              className="flex items-center gap-3 p-2 rounded-xl text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-secondary"
                            >
                              <img
                                src={sub.image}
                                alt={sub.name}
                                className="w-10 h-8 rounded-lg object-cover"
                              />
                              <span className="font-bold text-foreground">{sub.name}</span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Rubriques secondaires */}
              <div className="pt-2 border-t border-border space-y-1">
                <span className="text-[11px] font-mono font-bold text-muted-foreground uppercase px-1 tracking-wider">
                  Services & Informations
                </span>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <Link
                    to="/signature"
                    className="px-3 py-2 rounded-xl text-xs font-bold bg-secondary/30 hover:bg-secondary block"
                  >
                    🥗 8 Signatures
                  </Link>
                  <Link
                    to="/builder"
                    className="px-3 py-2 rounded-xl text-xs font-bold bg-secondary/30 hover:bg-secondary block text-[#D96B43]"
                  >
                    🥣 Composer ma salade
                  </Link>
                  <Link
                    to="/yamooh/etablissements"
                    className="px-3 py-2 rounded-xl text-xs font-bold bg-secondary/30 hover:bg-secondary block"
                  >
                    🏛️ Établissements
                  </Link>
                  <Link
                    to="/offres-traiteur"
                    className="px-3 py-2 rounded-xl text-xs font-bold bg-secondary/30 hover:bg-secondary block"
                  >
                    💼 Traiteur B2B
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ========================================================================= */}
      {/* MODALE INTERACTIVE : SÉLECTION D'ADRESSE / QUARTIER À DOUALA              */}
      {/* ========================================================================= */}
      {addressModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#15241C] text-foreground w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl border border-border space-y-6 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-border/80 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#D96B43]/10 text-[#D96B43] flex items-center justify-center">
                  <MapPin size={20} />
                </div>
                <div>
                  <h3 className="font-display font-black text-lg">Votre adresse à Douala</h3>
                  <p className="text-xs text-muted-foreground">
                    Pour la livraison express ou le retrait à la Pharmacie Kotto
                  </p>
                </div>
              </div>
              <button
                onClick={() => setAddressModalOpen(false)}
                className="p-2 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground transition cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Saisie manuelle */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Saisir un quartier ou une adresse précise :
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Ex : Bonapriso, Rue des Palmiers..."
                  value={customAddressInput}
                  onChange={(e) => setCustomAddressInput(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-secondary/40 border border-border text-xs sm:text-sm focus:outline-none focus:border-[#1E3A2B]"
                />
                <button
                  onClick={() => {
                    if (customAddressInput.trim()) {
                      handleSaveAddress(customAddressInput.trim());
                    }
                  }}
                  className="bg-[#1E3A2B] hover:bg-[#162a1f] text-white px-5 py-2.5 rounded-xl font-bold text-xs transition cursor-pointer"
                >
                  Valider
                </button>
              </div>
            </div>

            {/* Quartiers populaires rapides */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Ou sélectionnez un quartier fréquent :
              </label>
              <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto p-1">
                {POPULAR_QUARTERS.map((quarter) => (
                  <button
                    key={quarter}
                    onClick={() => handleSaveAddress(quarter)}
                    className={`px-3 py-2 rounded-xl text-xs text-left font-medium border transition cursor-pointer flex items-center justify-between ${
                      selectedAddress === quarter
                        ? "bg-[#1E3A2B] text-white border-[#1E3A2B]"
                        : "bg-secondary/30 hover:bg-secondary border-border/80 text-foreground"
                    }`}
                  >
                    <span className="truncate">{quarter}</span>
                    {selectedAddress === quarter && <Check size={14} className="shrink-0 ml-1 text-[#F2B705]" />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
