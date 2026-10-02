import { Link } from "react-router-dom";
import { Users, PartyPopper, Heart, CheckCircle2, ArrowRight } from "lucide-react";
import Breadcrumb from "../../components/Breadcrumb";

export const OffreParticuliers = () => {
  return (
    <>
      <title>Traiteur pour particuliers à Douala | YAMOOH</title>
      <meta
        name="description"
        content="YAMOOH vous accompagne pour vos anniversaires, réceptions privées et moments conviviaux à Douala avec des solutions de restauration adaptées."
      />
      <link rel="canonical" href="https://yamooh.com/offres-traiteur/particuliers" />

      {/* HERO */}
      <section className="bg-[#1E3A2B] text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="container-tight relative z-10 text-center max-w-3xl mx-auto">
          <div className="mb-4 flex justify-center">
            <Breadcrumb
              items={[
                { label: "Offres Traiteur", to: "/offres-traiteur" },
                { label: "Particuliers" },
              ]}
            />
          </div>

          <span className="inline-block bg-white/10 text-[#F2B705] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-white/15 font-mono">
            Moments Privés & Fêtes
          </span>

          <h1 className="text-4xl sm:text-5xl font-display font-black tracking-tight mb-4">
            Vos moments privés, une table à partager.
          </h1>

          <p className="text-white/85 text-base sm:text-lg leading-relaxed font-light mb-8">
            Pour une réception privée, un anniversaire ou un moment convivial, présentez-nous votre occasion et vos besoins afin de définir un format de restauration adapté.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/devis"
              className="inline-flex items-center gap-2 bg-[#D96B43] hover:bg-[#c45b34] text-white px-8 py-3.5 rounded-full font-bold text-sm transition shadow-elevated"
            >
              <span>DEMANDER UN DEVIS</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTIONS PARTICULIERS */}
      <section className="container-tight py-16 lg:py-20 space-y-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-card border border-border rounded-3xl p-6 shadow-card">
            <div className="w-10 h-10 rounded-2xl bg-[#FAF0D8] text-[#D96B43] flex items-center justify-center mb-4 font-bold">
              🎂
            </div>
            <h3 className="text-xl font-display font-bold text-foreground mb-2">Anniversaires</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Buffets salades généreux, planches apéritives et douceurs sucrées pour fêter votre journée entouré de vos proches.
            </p>
          </div>

          <div className="bg-card border border-border rounded-3xl p-6 shadow-card">
            <div className="w-10 h-10 rounded-2xl bg-[#E3ECE6] text-[#1E3A2B] flex items-center justify-center mb-4 font-bold">
              🏡
            </div>
            <h3 className="text-xl font-display font-bold text-foreground mb-2">Réceptions privées</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Baptêmes, fiançailles ou réunions de famille avec des formules personnalisées selon vos goûts.
            </p>
          </div>

          <div className="bg-card border border-border rounded-3xl p-6 shadow-card">
            <div className="w-10 h-10 rounded-2xl bg-[#FAF0D8] text-[#D96B43] flex items-center justify-center mb-4 font-bold">
              🥂
            </div>
            <h3 className="text-xl font-display font-bold text-foreground mb-2">Moments entre proches</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Brunchs du dimanche, garden parties ou déjeuners décontractés sans avoir à passer des heures en cuisine.
            </p>
          </div>

          <div className="bg-card border border-border rounded-3xl p-6 shadow-card">
            <div className="w-10 h-10 rounded-2xl bg-[#E3ECE6] text-[#1E3A2B] flex items-center justify-center mb-4 font-bold">
              ✨
            </div>
            <h3 className="text-xl font-display font-bold text-foreground mb-2">Autres demandes</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Formats spécifiques, régimes végétariens stricts ou demandes sur-mesure pour vos rassemblements.
            </p>
          </div>
        </div>
      </section>

      {/* BANNIÈRE DEVIS */}
      <section className="bg-[#FAF7F2] py-16 border-t border-border text-center">
        <div className="container-tight max-w-2xl mx-auto space-y-4">
          <h2 className="text-3xl font-display font-bold text-[#1E3A2B]">Un projet de réception à Douala ?</h2>
          <p className="text-muted-foreground text-sm">
            Faites-nous part de vos envies et recevez une proposition clé en main.
          </p>
          <div>
            <Link
              to="/devis"
              className="inline-flex items-center gap-2 bg-[#1E3A2B] hover:bg-[#162B20] text-white px-8 py-3.5 rounded-full font-bold text-sm transition shadow-soft"
            >
              DEMANDER UN DEVIS <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default OffreParticuliers;
