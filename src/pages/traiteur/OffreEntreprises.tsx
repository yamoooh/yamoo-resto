import { Link } from "react-router-dom";
import { Briefcase, CheckCircle2, ArrowRight, PhoneCall, Users, Clock } from "lucide-react";
import Breadcrumb from "../../components/Breadcrumb";

export const OffreEntreprises = () => {
  return (
    <>
      <title>Traiteur entreprise à Douala | YAMOOH</title>
      <meta
        name="description"
        content="Solutions repas YAMOOH pour entreprises à Douala : réunions, séminaires, pauses repas et événements professionnels. Demandez votre devis."
      />
      <link rel="canonical" href="https://yamooh.com/offres-traiteur/entreprises" />

      {/* HERO */}
      <section className="bg-[#1E3A2B] text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="container-tight relative z-10 text-center max-w-3xl mx-auto">
          <div className="mb-4 flex justify-center">
            <Breadcrumb
              items={[
                { label: "Offres Traiteur", to: "/offres-traiteur" },
                { label: "Entreprises" },
              ]}
            />
          </div>

          <span className="inline-block bg-white/10 text-[#F2B705] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-white/15 font-mono">
            B2B & Solutions Corporate
          </span>

          <h1 className="text-4xl sm:text-5xl font-display font-black tracking-tight mb-4">
            Des solutions repas pour vos journées professionnelles.
          </h1>

          <p className="text-white/85 text-base sm:text-lg leading-relaxed font-light mb-8">
            Une journée professionnelle bien organisée passe aussi par un repas adapté. YAMOOH propose des solutions à découvrir selon le format de votre réunion, séminaire ou événement d'entreprise.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/devis"
              className="inline-flex items-center gap-2 bg-[#D96B43] hover:bg-[#c45b34] text-white px-8 py-3.5 rounded-full font-bold text-sm transition shadow-elevated"
            >
              <span>DEMANDER UN DEVIS ENTREPRISE</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTIONS ENTREPRISE */}
      <section className="container-tight py-16 lg:py-20 space-y-16">
        {/* Réunions */}
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <span className="text-xs font-bold font-mono uppercase tracking-widest text-[#D96B43]">
              Format Individuel
            </span>
            <h2 className="text-3xl font-display font-bold text-[#1E3A2B]">
              Réunions & Comités de Direction
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Pour vos déjeuners de travail en petit ou moyen comité, nos coffrets plateaux repas individuels offrent une solution soignée, silencieuse et prête à déguster.
            </p>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-green-600" />
                <span>Salades signatures au choix pour chaque participant</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-green-600" />
                <span>Jus pressés 25cl et petit pain artisanal inclus</span>
              </li>
            </ul>
          </div>

          <div className="bg-[#FAF7F2] border border-border rounded-3xl p-8 shadow-card">
            <h3 className="font-display font-bold text-lg text-[#1E3A2B] mb-2">Praticité & Ponctualité</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Livraison directement dans vos locaux d'entreprise à Douala (Akwa, Bonanjo, Bonapriso...) à l'heure exacte convenue pour ne pas perturber votre planning.
            </p>
          </div>
        </div>

        {/* Séminaires */}
        <div className="grid md:grid-cols-2 gap-10 items-center border-t border-border pt-12">
          <div className="bg-[#FAF7F2] border border-border rounded-3xl p-8 shadow-card order-2 md:order-1">
            <h3 className="font-display font-bold text-lg text-[#1E3A2B] mb-2">Formules 20 à 100+ Personnes</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Buffets salades partagés ou plateaux numérotés selon la configuration de votre salle de séminaire.
            </p>
          </div>

          <div className="space-y-4 order-1 md:order-2">
            <span className="text-xs font-bold font-mono uppercase tracking-widest text-[#D96B43]">
              Journées d'Étude
            </span>
            <h2 className="text-3xl font-display font-bold text-[#1E3A2B]">
              Séminaires & Formations
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Une alimentation fraîche et digeste maintient la concentration de vos collaborateurs tout au long des sessions de l'après-midi.
            </p>
          </div>
        </div>

        {/* Pauses repas */}
        <div className="grid md:grid-cols-2 gap-10 items-center border-t border-border pt-12">
          <div className="space-y-4">
            <span className="text-xs font-bold font-mono uppercase tracking-widest text-[#D96B43]">
              Énergie Matin & Après-midi
            </span>
            <h2 className="text-3xl font-display font-bold text-[#1E3A2B]">
              Pauses repas & Coffee Breaks
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Des formules de pause gourmandes associant cakes citron-gingembre, banana bread, corbeilles de fruits exotiques et boissons chaudes.
            </p>
          </div>

          <div className="bg-[#FAF7F2] border border-border rounded-3xl p-8 shadow-card">
            <h3 className="font-display font-bold text-lg text-[#1E3A2B] mb-2">Formules Team Break</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Adaptées aux pauses café de 10h ou de 15h pour rebooster vos équipes.
            </p>
          </div>
        </div>

        {/* Événements d'entreprise */}
        <div className="grid md:grid-cols-2 gap-10 items-center border-t border-border pt-12">
          <div className="bg-[#FAF7F2] border border-border rounded-3xl p-8 shadow-card order-2 md:order-1">
            <h3 className="font-display font-bold text-lg text-[#1E3A2B] mb-2">Cocktails & Réceptions Corporate</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Assortiments de pièces salées et sucrées, fontaines de jus frais et animation bar à salades.
            </p>
          </div>

          <div className="space-y-4 order-1 md:order-2">
            <span className="text-xs font-bold font-mono uppercase tracking-widest text-[#D96B43]">
              Célébrations & Milestones
            </span>
            <h2 className="text-3xl font-display font-bold text-[#1E3A2B]">
              Événements d'entreprise
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Fin d'année, lancement de projet ou célébration d'équipe : une restauration soignée et conviviale pour marquer les temps forts de votre entreprise.
            </p>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="bg-[#1E3A2B] text-white py-16 text-center">
        <div className="container-tight max-w-2xl mx-auto space-y-4">
          <h2 className="text-3xl font-display font-bold">Un projet de repas d'entreprise à Douala ?</h2>
          <p className="text-white/80 text-sm">
            Présentez-nous vos effectifs et vos dates souhaitées pour recevoir une proposition détaillée.
          </p>
          <div>
            <Link
              to="/devis"
              className="inline-flex items-center gap-2 bg-[#D96B43] hover:bg-[#c45b34] text-white px-8 py-3.5 rounded-full font-bold text-sm transition shadow-elevated"
            >
              DEMANDER UN DEVIS ENTREPRISE <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default OffreEntreprises;
