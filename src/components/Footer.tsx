import { Link } from "react-router-dom";
import { Mail, MapPin, Phone, Clock, MessageCircle, ExternalLink } from "lucide-react";
import Logo from "./Logo";

export const Footer = () => {
  return (
    <footer className="bg-[#2F6F3B] text-white mt-24 border-t border-white/10">
      {/* 5 COLONNES */}
      <div className="container-tight py-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-5 text-sm">
        {/* Colonne 1 : Identité & Localisation */}
        <div className="lg:col-span-1 space-y-4">
          <Logo variant="light" />
          <p className="text-xs text-white/70 leading-relaxed">
            Freshness in every bite. Bar à salades fraîches, compositions à la commande et service traiteur d'affaires à Douala.
          </p>
          <div className="pt-2 space-y-2 text-xs text-white/80">
            <p className="flex items-start gap-2">
              <MapPin size={15} className="mt-0.5 text-[#F2B705] shrink-0" />
              <span>Pharmacie Kotto, Douala</span>
            </p>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Pharmacie+Kotto,+Douala,+Cameroon"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#F2B705] hover:text-white transition pl-6"
            >
              <span>Voir sur Google Maps</span>
              <ExternalLink size={11} />
            </a>
            <p className="flex items-start gap-2">
              <Clock size={15} className="mt-0.5 text-[#F2B705] shrink-0" />
              <span>Lun – Sam : 10h00 – 21h00</span>
            </p>
            <p className="flex items-start gap-2">
              <Phone size={15} className="mt-0.5 text-[#F2B705] shrink-0" />
              <span>+237 658 254 509</span>
            </p>
          </div>
        </div>

        {/* Colonne 2 : Les 7 Univers & La Carte */}
        <div>
          <h3 className="font-display font-bold text-sm uppercase tracking-wider text-[#F2B705] mb-4">
            Nos Univers & Carte
          </h3>
          <ul className="space-y-2 text-xs text-white/80">
            <li><Link to="/petit-dejeuner" className="hover:text-white transition">Petit-déjeuner & Goûter</Link></li>
            <li><Link to="/salades-plats-sandwichs" className="hover:text-white transition">Salades, Plats & Sandwichs</Link></li>
            <li><Link to="/plateaux-repas" className="hover:text-white transition">Plateaux Repas d'Entreprise</Link></li>
            <li><Link to="/cocktail" className="hover:text-white transition">Cocktail & Repas debout</Link></li>
            <li><Link to="/buffet" className="hover:text-white transition">Buffet & Salades XXL</Link></li>
            <li><Link to="/boissons" className="hover:text-white transition">Boissons Maison & Fontaines</Link></li>
            <li><Link to="/collection-du-moment" className="hover:text-white transition">Collection du Moment</Link></li>
            <li className="pt-1"><Link to="/builder" className="hover:text-white transition font-bold text-[#F2B705]">Composer ma salade →</Link></li>
          </ul>
        </div>

        {/* Colonne 3 : Traiteur & Événements */}
        <div>
          <h3 className="font-display font-bold text-sm uppercase tracking-wider text-[#F2B705] mb-4">
            Traiteur & B2B
          </h3>
          <ul className="space-y-2 text-xs text-white/80">
            <li><Link to="/offres-traiteur" className="hover:text-white transition">Offres Traiteur</Link></li>
            <li><Link to="/offres-traiteur/entreprises" className="hover:text-white transition">Pour les entreprises</Link></li>
            <li><Link to="/offres-traiteur/particuliers" className="hover:text-white transition">Pour les particuliers</Link></li>
            <li><Link to="/services-evenementiels" className="hover:text-white transition">Services événementiels</Link></li>
            <li><Link to="/services-evenementiels/formules" className="hover:text-white transition">Formules traiteur</Link></li>
            <li><Link to="/services-evenementiels/inspirations" className="hover:text-white transition">Inspirations en images</Link></li>
            <li><Link to="/devis" className="hover:text-white transition font-semibold text-[#F2B705]">Demande de devis</Link></li>
          </ul>
        </div>

        {/* Colonne 4 : YAMOOH */}
        <div>
          <h3 className="font-display font-bold text-sm uppercase tracking-wider text-[#F2B705] mb-4">
            L'Univers YAMOOH
          </h3>
          <ul className="space-y-2 text-xs text-white/80">
            <li><Link to="/yamooh" className="hover:text-white transition">Découvrir YAMOOH</Link></li>
            <li><Link to="/yamooh/a-propos" className="hover:text-white transition">À propos</Link></li>
            <li><Link to="/yamooh/notre-histoire" className="hover:text-white transition">Notre histoire</Link></li>
            <li><Link to="/yamooh/mission-valeurs" className="hover:text-white transition">Mission & Valeurs</Link></li>
            <li><Link to="/yamooh/engagements" className="hover:text-white transition">Nos engagements</Link></li>
            <li><Link to="/yamooh/equipe" className="hover:text-white transition">Notre équipe</Link></li>
            <li><Link to="/yamooh/fonctionnement" className="hover:text-white transition">Comment ça marche</Link></li>
            <li><Link to="/yamooh/franchise" className="hover:text-white transition">Devenir franchisé</Link></li>
            <li><Link to="/blog" className="hover:text-white transition">Le Blog / Journal</Link></li>
          </ul>
        </div>

        {/* Colonne 5 : Support & Légal */}
        <div>
          <h3 className="font-display font-bold text-sm uppercase tracking-wider text-[#F2B705] mb-4">
            Aide & Légal
          </h3>
          <ul className="space-y-2 text-xs text-white/80">
            <li><Link to="/contact" className="hover:text-white transition">Contact & Commande</Link></li>
            <li><Link to="/contact/informations-pratiques" className="hover:text-white transition">Informations pratiques</Link></li>
            <li><Link to="/contact/plan-dacces" className="hover:text-white transition">Plan d'accès</Link></li>
            <li><Link to="/faq" className="hover:text-white transition">FAQ Commande</Link></li>
            <li><Link to="/faq-traiteur" className="hover:text-white transition">FAQ Traiteur</Link></li>
            <li><Link to="/allergenes" className="hover:text-white transition">Guide des allergènes</Link></li>
            <li><Link to="/recherche" className="hover:text-white transition">Recherche</Link></li>
            <li className="pt-2"><Link to="/cgv" className="hover:text-white transition text-white/60">CGV</Link></li>
            <li><Link to="/mentions-legales" className="hover:text-white transition text-white/60">Mentions légales</Link></li>
            <li><Link to="/politique-de-confidentialite" className="hover:text-white transition text-white/60">Confidentialité</Link></li>
            <li><Link to="/politique-de-cookies" className="hover:text-white transition text-white/60">Cookies</Link></li>
          </ul>
        </div>
      </div>

      {/* BANDEAU BAS */}
      <div className="border-t border-white/10 bg-black/20">
        <div className="container-tight py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs text-white/70 font-semibold">Suivez-nous :</span>
            <a
              href="https://wa.me/237658254509"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#25D366] flex items-center justify-center transition text-white"
              aria-label="WhatsApp"
            >
              <MessageCircle size={18} />
            </a>
            <a
              href="https://www.facebook.com/share/18SujWfGVz/?mibextid=wwXIfr"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#1877F2] flex items-center justify-center transition text-white"
              aria-label="Facebook"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.412c0-3.017 1.792-4.683 4.533-4.683 1.312 0 2.686.235 2.686.235v2.962h-1.514c-1.491 0-1.956.93-1.956 1.886v2.27h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
              </svg>
            </a>
            <a
              href="https://www.tiktok.com/@yamooh_"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-black flex items-center justify-center transition text-white"
              aria-label="TikTok"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.71a8.16 8.16 0 0 0 4.77 1.52V6.78a4.85 4.85 0 0 1-1.84-.09z"/>
              </svg>
            </a>
          </div>

          <div className="text-xs text-white/60 text-center md:text-right">
            <p>© {new Date().getFullYear()} YAMOOH Douala. Tous droits réservés.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
