import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import Layout from "./components/Layout";

// Pages Principales & Existantes
import Home from "./pages/Home";
import NotreCarte from "./pages/NotreCarte";
import UniverseCatalogue from "./pages/UniverseCatalogue";
import ProductDetail from "./pages/ProductDetail";
import Signature from "./pages/Signature";
import Builder from "./pages/Builder";
import Cart from "./pages/Cart";
import SeasonalMenu from "./pages/SeasonalMenu";
import Devis from "./pages/Devis";
import Contact from "./pages/Contact";
import ContactAide from "./pages/ContactAide";
import FAQ from "./pages/FAQ";
import FAQTraiteur from "./pages/FAQTraiteur";
import Allergenes from "./pages/Allergenes";
import Recherche from "./pages/Recherche";
import Auth from "./pages/Auth";
import Account from "./pages/Account";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";

// Traiteur & Événements
import OffresTraiteur from "./pages/OffresTraiteur";
import OffreEntreprises from "./pages/traiteur/OffreEntreprises";
import OffreParticuliers from "./pages/traiteur/OffreParticuliers";
import OffreEvenements from "./pages/traiteur/OffreEvenements";
import EventServices from "./pages/EventServices";
import Mariages from "./pages/events/Mariages";
import Anniversaires from "./pages/events/Anniversaires";
import Seminaires from "./pages/events/Seminaires";
import SoireesPrivees from "./pages/events/SoireesPrivees";
import Lancements from "./pages/events/Lancements";
import EntreprisesEvents from "./pages/events/EntreprisesEvents";
import Accompagnement from "./pages/events/Accompagnement";
import FormulesEvent from "./pages/events/FormulesEvent";
import Inspirations from "./pages/events/Inspirations";

// YAMMOH Institutionnel
import YamoohHub from "./pages/yamooh/YamoohHub";
import YamoohAPropos from "./pages/yamooh/YamoohAPropos";
import YamoohHistoire from "./pages/yamooh/YamoohHistoire";
import YamoohMissionValeurs from "./pages/yamooh/YamoohMissionValeurs";
import YamoohEngagements from "./pages/yamooh/YamoohEngagements";
import YamoohEquipe from "./pages/yamooh/YamoohEquipe";
import YamoohFonctionnement from "./pages/yamooh/YamoohFonctionnement";
import YamoohFranchise from "./pages/yamooh/YamoohFranchise";
import YamoohEtablissements from "./pages/yamooh/YamoohEtablissements";
import YamoohRealisations from "./pages/yamooh/YamoohRealisations";

// Blog
import BlogHub from "./pages/blog/BlogHub";
import BlogCategory from "./pages/blog/BlogCategory";
import BlogPostDetail from "./pages/blog/BlogPostDetail";

// Contact & Infos
import InformationsPratiques from "./pages/contact/InformationsPratiques";
import PlanAcces from "./pages/contact/PlanAcces";

// Légal
import CGV from "./pages/legal/CGV";
import MentionsLegales from "./pages/legal/MentionsLegales";
import PolitiqueConfidentialite from "./pages/legal/PolitiqueConfidentialite";
import PolitiqueCookies from "./pages/legal/PolitiqueCookies";

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              {/* ACCUEIL & CATALOGUE */}
              <Route path="/" element={<Home />} />
              <Route path="/notre-carte" element={<NotreCarte />} />
              <Route path="/notre-carte/:slug" element={<ProductDetail />} />
              <Route path="/carte" element={<Navigate to="/notre-carte" replace />} />
              <Route path="/signature" element={<Signature />} />
              <Route path="/builder" element={<Builder />} />
              <Route path="/carte-de-saison" element={<SeasonalMenu />} />
              <Route path="/cart" element={<Cart />} />

              {/* 7 GRANDS UNIVERS COMMERCIAUX TOUT&BON */}
              <Route path="/petit-dejeuner" element={<UniverseCatalogue />} />
              <Route path="/petit-dejeuner/:subSlug" element={<UniverseCatalogue />} />
              <Route path="/salades-plats-sandwichs" element={<UniverseCatalogue />} />
              <Route path="/salades-plats-sandwichs/:subSlug" element={<UniverseCatalogue />} />
              <Route path="/plateaux-repas" element={<UniverseCatalogue />} />
              <Route path="/plateaux-repas/:subSlug" element={<UniverseCatalogue />} />
              <Route path="/cocktail" element={<UniverseCatalogue />} />
              <Route path="/cocktail/:subSlug" element={<UniverseCatalogue />} />
              <Route path="/cocktail-repas-debout" element={<UniverseCatalogue />} />
              <Route path="/cocktail-repas-debout/:subSlug" element={<UniverseCatalogue />} />
              <Route path="/buffet" element={<UniverseCatalogue />} />
              <Route path="/buffet/:subSlug" element={<UniverseCatalogue />} />
              <Route path="/buffet-repas-assis" element={<UniverseCatalogue />} />
              <Route path="/buffet-repas-assis/:subSlug" element={<UniverseCatalogue />} />
              <Route path="/boissons" element={<UniverseCatalogue />} />
              <Route path="/boissons/:subSlug" element={<UniverseCatalogue />} />
              <Route path="/collection-du-moment" element={<UniverseCatalogue />} />
              <Route path="/collection-du-moment/:subSlug" element={<UniverseCatalogue />} />

              {/* OFFRES TRAITEUR */}
              <Route path="/offres-traiteur" element={<OffresTraiteur />} />
              <Route path="/offres-traiteur/entreprises" element={<OffreEntreprises />} />
              <Route path="/offres-traiteur/particuliers" element={<OffreParticuliers />} />
              <Route path="/offres-traiteur/evenements" element={<OffreEvenements />} />
              <Route path="/offres-traiteur/informations-pratiques" element={<InformationsPratiques />} />
              <Route path="/offres-traiteur/faq" element={<FAQTraiteur />} />

              {/* SERVICES ÉVÉNEMENTIELS */}
              <Route path="/services-evenementiels" element={<EventServices />} />
              <Route path="/services-evenementiels/mariages" element={<Mariages />} />
              <Route path="/services-evenementiels/anniversaires" element={<Anniversaires />} />
              <Route path="/services-evenementiels/seminaires" element={<Seminaires />} />
              <Route path="/services-evenementiels/soirees-privees" element={<SoireesPrivees />} />
              <Route path="/services-evenementiels/lancements" element={<Lancements />} />
              <Route path="/services-evenementiels/lancements-produits" element={<Lancements />} />
              <Route path="/services-evenementiels/entreprises" element={<EntreprisesEvents />} />
              <Route path="/services-evenementiels/evenements-entreprise" element={<EntreprisesEvents />} />
              <Route path="/services-evenementiels/accompagnement" element={<Accompagnement />} />
              <Route path="/services-evenementiels/formules" element={<FormulesEvent />} />
              <Route path="/services-evenementiels/inspirations" element={<Inspirations />} />
              <Route path="/services-evenementiels/galerie" element={<Inspirations />} />

              {/* UNIVERS YAMMOH */}
              <Route path="/yamooh" element={<YamoohHub />} />
              <Route path="/yamooh/a-propos" element={<YamoohAPropos />} />
              <Route path="/yamooh/notre-histoire" element={<YamoohHistoire />} />
              <Route path="/yamooh/histoire" element={<Navigate to="/yamooh/notre-histoire" replace />} />
              <Route path="/yamooh/mission-valeurs" element={<YamoohMissionValeurs />} />
              <Route path="/yamooh/engagements" element={<YamoohEngagements />} />
              <Route path="/yamooh/equipe" element={<YamoohEquipe />} />
              <Route path="/yamooh/fonctionnement" element={<YamoohFonctionnement />} />
              <Route path="/yamooh/franchise" element={<YamoohFranchise />} />
              <Route path="/yamooh/etablissements" element={<YamoohEtablissements />} />
              <Route path="/yamooh/realisations" element={<YamoohRealisations />} />

              {/* Anciennes routes d'accès direct vers Yamooh */}
              <Route path="/a-propos" element={<Navigate to="/yamooh/a-propos" replace />} />
              <Route path="/engagements" element={<Navigate to="/yamooh/engagements" replace />} />
              <Route path="/comment-ca-marche" element={<Navigate to="/yamooh/fonctionnement" replace />} />
              <Route path="/realisations" element={<Navigate to="/yamooh/realisations" replace />} />
              <Route path="/franchise" element={<Navigate to="/yamooh/franchise" replace />} />
              <Route path="/etablissements" element={<Navigate to="/yamooh/etablissements" replace />} />

              {/* BLOG */}
              <Route path="/blog" element={<BlogHub />} />
              <Route path="/blog/actualites" element={<BlogCategory />} />
              <Route path="/blog/conseils-astuces" element={<BlogCategory />} />
              <Route path="/blog/recettes-inspirations" element={<BlogCategory />} />
              <Route path="/blog/evenements" element={<BlogCategory />} />
              <Route path="/blog/:slug" element={<BlogPostDetail />} />

              {/* CONTACT, INFOS & SUPPORT */}
              <Route path="/contact" element={<Contact />} />
              <Route path="/contact-aide" element={<ContactAide />} />
              <Route path="/contact/informations-pratiques" element={<InformationsPratiques />} />
              <Route path="/contact/plan-dacces" element={<PlanAcces />} />
              <Route path="/plan-acces" element={<Navigate to="/contact/plan-dacces" replace />} />
              <Route path="/plan-dacces" element={<Navigate to="/contact/plan-dacces" replace />} />
              <Route path="/devis" element={<Devis />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/faq-traiteur" element={<FAQTraiteur />} />
              <Route path="/allergenes" element={<Allergenes />} />
              <Route path="/recherche" element={<Recherche />} />

              {/* AUTH & COMPTE */}
              <Route path="/auth" element={<Auth />} />
              <Route path="/account" element={<Account />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />

              {/* PAGES LÉGALES */}
              <Route path="/cgv" element={<CGV />} />
              <Route path="/mentions-legales" element={<MentionsLegales />} />
              <Route path="/politique-de-confidentialite" element={<PolitiqueConfidentialite />} />
              <Route path="/politique-confidentialite" element={<Navigate to="/politique-de-confidentialite" replace />} />
              <Route path="/confidentialite" element={<Navigate to="/politique-de-confidentialite" replace />} />
              <Route path="/politique-de-cookies" element={<PolitiqueCookies />} />
              <Route path="/cookies" element={<Navigate to="/politique-de-cookies" replace />} />
            </Route>

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}
