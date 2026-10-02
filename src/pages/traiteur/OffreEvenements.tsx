import { Link } from "react-router-dom";
import { ArrowRight, PartyPopper, Heart, Briefcase, Sparkles, Rocket, Building2 } from "lucide-react";
import Breadcrumb from "../../components/Breadcrumb";

export const OffreEvenements = () => {
  const eventCards = [
    {
      title: "Mariages",
      desc: "Une restauration fraîche et raffinée pour accompagner le plus beau jour de votre vie à Douala.",
      link: "/services-evenementiels/mariages",
      icon: Heart,
    },
    {
      title: "Anniversaires",
      desc: "Buffets colorés, salades gourmandes et pièces cocktail pour célébrer votre nouvelle année.",
      link: "/services-evenementiels/anniversaires",
      icon: PartyPopper,
    },
    {
      title: "Séminaires & conférences",
      desc: "Plateaux repas et buffets légers pour maintenir l'énergie et la concentration des participants.",
      link: "/services-evenementiels/seminaires",
      icon: Briefcase,
    },
    {
      title: "Soirées privées",
      desc: "Formules cocktail dînatoire et finger food pour vos réceptions en famille ou entre amis.",
      link: "/services-evenementiels/soirees-privees",
      icon: Sparkles,
    },
    {
      title: "Lancements de produits",
      desc: "Une expérience culinaire contemporaine et élégante pour valoriser votre marque et vos invités.",
      link: "/services-evenementiels/lancements",
      icon: Rocket,
    },
    {
      title: "Événements d'entreprise",
      desc: "Cocktails de fin d'année, team buildings et déjeuners d'équipe sur-mesure.",
      link: "/services-evenementiels/entreprises",
      icon: Building2,
    },
  ];

  return (
    <>
      <title>Offre Événements | Traiteur YAMOOH Douala</title>
      <meta
        name="description"
        content="Solutions de restauration pour tous vos événements à Douala : mariages, anniversaires, séminaires, soirées et lancements de produits."
      />
      <link rel="canonical" href="https://yamooh.com/offres-traiteur/evenements" />

      {/* HERO */}
      <section className="bg-[#1E3A2B] text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="container-tight relative z-10 text-center max-w-3xl mx-auto">
          <div className="mb-4 flex justify-center">
            <Breadcrumb
              items={[
                { label: "Offres Traiteur", to: "/offres-traiteur" },
                { label: "Événements" },
              ]}
            />
          </div>

          <h1 className="text-4xl sm:text-5xl font-display font-black tracking-tight mb-4">
            Des solutions de restauration pour vos événements.
          </h1>

          <p className="text-white/85 text-base sm:text-lg leading-relaxed font-light mb-8">
            Chaque événement possède son rythme et son identité. Découvrez nos prestations adaptées aux réceptions privées et professionnelles à Douala.
          </p>

          <Link
            to="/devis"
            className="inline-flex items-center gap-2 bg-[#D96B43] hover:bg-[#c45b34] text-white px-8 py-3.5 rounded-full font-bold text-sm transition shadow-elevated"
          >
            <span>DEMANDER UN DEVIS ÉVÉNEMENT</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* 6 CARTES ÉVÉNEMENTS */}
      <section className="container-tight py-16 lg:py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {eventCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="bg-card border border-border rounded-3xl p-8 shadow-card flex flex-col justify-between hover:shadow-elevated transition-all group"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#E3ECE6] text-[#1E3A2B] flex items-center justify-center mb-6 group-hover:bg-[#1E3A2B] group-hover:text-[#F2B705] transition-colors">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-foreground mb-2 group-hover:text-[#D96B43] transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6">
                    {card.desc}
                  </p>
                </div>
                <Link
                  to={card.link}
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#1E3A2B] hover:text-[#D96B43] transition"
                >
                  <span>Découvrir cette formule</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default OffreEvenements;
