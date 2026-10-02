import { Link } from "react-router-dom";
import { Leaf, Clock, Truck, ArrowRight } from "lucide-react";
import Breadcrumb from "../../components/Breadcrumb";

export const YamoohEngagements = () => {
  return (
    <>
      <title>Nos Engagements | YAMOOH Douala</title>
      <meta
        name="description"
        content="Découvrez les engagements de YAMOOH à Douala : Ingrédients frais du matin, préparation minute à la commande et livraison express par WhatsApp."
      />
      <link rel="canonical" href="https://yamooh.com/yamooh/engagements" />

      {/* HERO */}
      <section className="bg-[#1E3A2B] text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="container-tight relative z-10 text-center max-w-3xl mx-auto">
          <div className="mb-4 flex justify-center">
            <Breadcrumb
              items={[
                { label: "YAMOOH", to: "/yamooh" },
                { label: "Nos engagements" },
              ]}
            />
          </div>

          <h1 className="text-4xl sm:text-5xl font-display font-black tracking-tight mb-4">
            Des engagements simples, au cœur de l'expérience YAMOOH.
          </h1>

          <p className="text-white/85 text-base sm:text-lg leading-relaxed font-light mb-8">
            Une charte de qualité appliquée sans compromis pour chacune de nos préparations servies à Douala.
          </p>

          <Link
            to="/notre-carte"
            className="inline-flex items-center gap-2 bg-[#D96B43] hover:bg-[#c45b34] text-white px-8 py-3.5 rounded-full font-bold text-sm transition shadow-elevated"
          >
            <span>DÉCOUVRIR LA CARTE</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* 3 ENGAGEMENTS */}
      <section className="container-tight py-16 lg:py-20">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-card border border-border rounded-3xl p-8 shadow-card flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#E3ECE6] text-[#1E3A2B] flex items-center justify-center mb-6">
                <Leaf size={28} />
              </div>
              <h2 className="text-xl font-display font-black text-foreground mb-3">INGRÉDIENTS FRAIS</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Légumes locaux sélectionnés chaque matin pour garantir saveur et fraîcheur.
              </p>
            </div>
          </div>

          <div className="bg-card border border-border rounded-3xl p-8 shadow-card flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#FAF0D8] text-[#D96B43] flex items-center justify-center mb-6">
                <Clock size={28} />
              </div>
              <h2 className="text-xl font-display font-black text-foreground mb-3">PRÉPARÉ À LA COMMANDE</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Aucune salade préparée à l'avance pour vous offrir le meilleur croquant.
              </p>
            </div>
          </div>

          <div className="bg-card border border-border rounded-3xl p-8 shadow-card flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#E3ECE6] text-[#1E3A2B] flex items-center justify-center mb-6">
                <Truck size={28} />
              </div>
              <h2 className="text-xl font-display font-black text-foreground mb-3">LIVRAISON RAPIDE</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Commande simple via WhatsApp et livraison express dans vos quartiers à Douala.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default YamoohEngagements;
