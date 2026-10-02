import { Link } from "react-router-dom";
import { ShoppingBag, Calendar, ArrowRight, CheckCircle2 } from "lucide-react";
import Breadcrumb from "../../components/Breadcrumb";

export const YamoohFonctionnement = () => {
  const commanderSteps = [
    "Découvrez la carte",
    "Choisissez votre création",
    "Composez votre salade si vous le souhaitez",
    "Ajoutez au panier",
    "Validez votre commande",
    "Finalisez via WhatsApp",
  ];

  const eventSteps = [
    "Présentez votre besoin",
    "Envoyez votre demande",
    "Échangez avec YAMOOH",
    "Précisez les détails",
    "Confirmez votre projet",
  ];

  return (
    <>
      <title>Comment fonctionne YAMOOH ? | Guide de Commande Douala</title>
      <meta
        name="description"
        content="Découvrez le fonctionnement de YAMOOH à Douala : comment commander en ligne et comment organiser un événement traiteur simplement."
      />
      <link rel="canonical" href="https://yamooh.com/yamooh/fonctionnement" />

      {/* HERO */}
      <section className="bg-[#1E3A2B] text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="container-tight relative z-10 text-center max-w-3xl mx-auto">
          <div className="mb-4 flex justify-center">
            <Breadcrumb
              items={[
                { label: "YAMOOH", to: "/yamooh" },
                { label: "Notre fonctionnement" },
              ]}
            />
          </div>

          <h1 className="text-4xl sm:text-5xl font-display font-black tracking-tight mb-4">
            Comment fonctionne YAMOOH ?
          </h1>

          <p className="text-white/85 text-base sm:text-lg leading-relaxed font-light mb-8">
            Deux parcours clairs et rapides pour vous régaler au quotidien ou réussir vos événements à Douala.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/notre-carte"
              className="inline-flex items-center gap-2 bg-[#D96B43] hover:bg-[#c45b34] text-white px-8 py-3.5 rounded-full font-bold text-sm transition shadow-elevated"
            >
              <span>COMMANDER MAINTENANT</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 2 PARCOURS */}
      <section className="container-tight py-16 lg:py-20">
        <div className="grid md:grid-cols-2 gap-10">
          {/* PARCOURS 1 : COMMANDER */}
          <div className="bg-card border border-border rounded-3xl p-8 shadow-card flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#E3ECE6] text-[#1E3A2B] flex items-center justify-center mb-6">
                <ShoppingBag size={24} />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-[#FAF0D8] text-[#D96B43] px-2.5 py-0.5 rounded-full">
                Au Quotidien
              </span>
              <h2 className="text-2xl font-display font-bold text-foreground mt-2 mb-6">
                COMMANDER UN REPAS
              </h2>
              <ol className="space-y-3.5 text-xs sm:text-sm text-muted-foreground">
                {commanderSteps.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#1E3A2B] text-[#F2B705] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="font-semibold text-foreground">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="pt-8 border-t border-border mt-8">
              <Link
                to="/builder"
                className="w-full bg-[#1E3A2B] hover:bg-[#162B20] text-white text-center py-3 rounded-full text-xs font-bold transition block"
              >
                Lancer le Salad Builder
              </Link>
            </div>
          </div>

          {/* PARCOURS 2 : ÉVÉNEMENT */}
          <div className="bg-card border border-border rounded-3xl p-8 shadow-card flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#FAF0D8] text-[#D96B43] flex items-center justify-center mb-6">
                <Calendar size={24} />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-[#E3ECE6] text-[#1E3A2B] px-2.5 py-0.5 rounded-full">
                B2B & Réceptions
              </span>
              <h2 className="text-2xl font-display font-bold text-foreground mt-2 mb-6">
                ORGANISER UN ÉVÉNEMENT
              </h2>
              <ol className="space-y-3.5 text-xs sm:text-sm text-muted-foreground">
                {eventSteps.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#D96B43] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="font-semibold text-foreground">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="pt-8 border-t border-border mt-8">
              <Link
                to="/devis"
                className="w-full bg-[#D96B43] hover:bg-[#c45b34] text-white text-center py-3 rounded-full text-xs font-bold transition block shadow-soft"
              >
                Demander un devis événementiel
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default YamoohFonctionnement;
