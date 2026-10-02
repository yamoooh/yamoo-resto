import { Link } from "react-router-dom";
import { PartyPopper, CheckCircle2, ArrowRight } from "lucide-react";
import Breadcrumb from "../../components/Breadcrumb";

export const Anniversaires = () => {
  return (
    <>
      <title>Traiteur Anniversaire à Douala | YAMOOH</title>
      <meta
        name="description"
        content="Célébrez votre anniversaire à Douala avec les formules fraîches et généreuses de YAMOOH : buffets, salades signatures et cocktails."
      />
      <link rel="canonical" href="https://yamooh.com/services-evenementiels/anniversaires" />

      {/* HERO */}
      <section className="bg-[#1E3A2B] text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="container-tight relative z-10 text-center max-w-3xl mx-auto">
          <div className="mb-4 flex justify-center">
            <Breadcrumb
              items={[
                { label: "Services Événementiels", to: "/services-evenementiels" },
                { label: "Anniversaires" },
              ]}
            />
          </div>

          <h1 className="text-4xl sm:text-5xl font-display font-black tracking-tight mb-4">
            Un anniversaire à partager autour d'une belle table.
          </h1>

          <p className="text-white/85 text-base sm:text-lg leading-relaxed font-light mb-8">
            Que votre événement soit intime ou réunisse davantage de convives, présentez votre besoin à YAMOOH afin de définir un format adapté à votre occasion.
          </p>

          <Link
            to="/devis"
            className="inline-flex items-center gap-2 bg-[#D96B43] hover:bg-[#c45b34] text-white px-8 py-3.5 rounded-full font-bold text-sm transition shadow-elevated"
          >
            <span>DEMANDER UN DEVIS</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* CONTENU */}
      <section className="container-tight py-16 lg:py-20">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-card border border-border rounded-3xl p-6 shadow-card">
            <h3 className="font-display font-bold text-lg text-foreground mb-2">Formule Cocktail Finger Food</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Bouchées salées, mini-wraps et coupelles fraîches pour trinquer debout en toute liberté.
            </p>
          </div>
          <div className="bg-card border border-border rounded-3xl p-6 shadow-card">
            <h3 className="font-display font-bold text-lg text-foreground mb-2">Grand Buffet Salades & Plats</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Saladiers généreux, bowls colorés et viandes marinées braisées pour un repas chaleureux.
            </p>
          </div>
          <div className="bg-card border border-border rounded-3xl p-6 shadow-card">
            <h3 className="font-display font-bold text-lg text-foreground mb-2">Douceurs & Desserts Partagés</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Mousses au chocolat, coupes de fruits tropicaux et fontaines à jus de fruits frais.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Anniversaires;
