import { Link } from "react-router-dom";
import { UtensilsCrossed, CheckCircle2, ArrowRight } from "lucide-react";
import Breadcrumb from "../../components/Breadcrumb";

export const FormulesEvent = () => {
  return (
    <>
      <title>Formules Événementielles à Douala | Traiteur YAMOOH</title>
      <meta
        name="description"
        content="Découvrez toutes les formules de restauration événementielle YAMOOH à Douala : plateaux repas, cocktails, buffets complets et salades XXL."
      />
      <link rel="canonical" href="https://yamooh.com/services-evenementiels/formules" />

      {/* HERO */}
      <section className="bg-[#1E3A2B] text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="container-tight relative z-10 text-center max-w-3xl mx-auto">
          <div className="mb-4 flex justify-center">
            <Breadcrumb
              items={[
                { label: "Services Événementiels", to: "/services-evenementiels" },
                { label: "Formules" },
              ]}
            />
          </div>

          <h1 className="text-4xl sm:text-5xl font-display font-black tracking-tight mb-4">
            Des formats de restauration pour vos événements.
          </h1>

          <p className="text-white/85 text-base sm:text-lg leading-relaxed font-light mb-8">
            Explorez notre catalogue de formules adaptées aux effectifs de 10 à plus de 150 personnes à Douala.
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

      {/* 3 GRANDS BLOCS DE FORMULES */}
      <section className="container-tight py-16 lg:py-20 space-y-16">
        {/* PLATEAUX REPAS */}
        <div className="space-y-6">
          <div className="border-b border-border pb-4">
            <span className="text-xs font-bold font-mono uppercase tracking-widest text-[#D96B43]">
              Format Individuel
            </span>
            <h2 className="text-3xl font-display font-bold text-[#1E3A2B] mt-1">
              Plateaux Repas
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-3xl p-6 shadow-card">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-[#E3ECE6] text-[#1E3A2B] px-2.5 py-0.5 rounded-full">
                Formule 1
              </span>
              <h3 className="text-xl font-display font-bold text-foreground mt-2 mb-2">Essentiels</h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                Salade fraîche au choix, pain artisanal, jus frais 25cl et dessert fruité. Le format idéal pour des réunions efficaces.
              </p>
              <p className="text-sm font-bold text-[#1E3A2B]">À partir de 6 500 FCFA / pers.</p>
            </div>

            <div className="bg-card border border-border rounded-3xl p-6 shadow-card">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-[#FAF0D8] text-[#D96B43] px-2.5 py-0.5 rounded-full">
                Formule 2
              </span>
              <h3 className="text-xl font-display font-bold text-foreground mt-2 mb-2">Signatures</h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                Recette signature d'exception (crevettes sautées, jambon affiné ou saumon), boisson naturelle et dessert gourmand chocolat/cacahuète.
              </p>
              <p className="text-sm font-bold text-[#1E3A2B]">À partir de 8 500 FCFA / pers.</p>
            </div>
          </div>
        </div>

        {/* COCKTAIL & REPAS DEBOUT */}
        <div className="space-y-6">
          <div className="border-b border-border pb-4">
            <span className="text-xs font-bold font-mono uppercase tracking-widest text-[#D96B43]">
              Finger Food
            </span>
            <h2 className="text-3xl font-display font-bold text-[#1E3A2B] mt-1">
              Cocktail & Repas Debout
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-3xl p-6 shadow-card">
              <h3 className="text-xl font-display font-bold text-foreground mb-2">Pièces Salées</h3>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-green-600" /> Mini-wraps poulet épicé & avocat</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-green-600" /> Brochettes de crudités du matin & sauce yaourt</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-green-600" /> Mini-bouchées végétariennes au hummus</li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-3xl p-6 shadow-card">
              <h3 className="text-xl font-display font-bold text-foreground mb-2">Pièces Sucrées</h3>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-green-600" /> Verrines de fromage blanc & réduction d'hibiscus</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-green-600" /> Mini-parts de cake citron-gingembre</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-green-600" /> Brochettes de fruits tropicaux frais</li>
              </ul>
            </div>
          </div>
        </div>

        {/* BUFFET & REPAS ASSIS */}
        <div className="space-y-6">
          <div className="border-b border-border pb-4">
            <span className="text-xs font-bold font-mono uppercase tracking-widest text-[#D96B43]">
              Grands Formats
            </span>
            <h2 className="text-3xl font-display font-bold text-[#1E3A2B] mt-1">
              Buffet & Repas Assis
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white border border-border rounded-3xl p-6">
              <h4 className="font-display font-bold text-lg text-foreground mb-2">Buffet Fraîcheur Tropique</h4>
              <p className="text-xs text-muted-foreground">Saladiers partagés, bars à vinaigrettes artisanales et fruits découpés.</p>
            </div>
            <div className="bg-white border border-border rounded-3xl p-6">
              <h4 className="font-display font-bold text-lg text-foreground mb-2">Buffet Chaud & Froid Premium</h4>
              <p className="text-xs text-muted-foreground">Association de salades signatures et de plats chauds braisés aux herbes.</p>
            </div>
            <div className="bg-white border border-border rounded-3xl p-6">
              <h4 className="font-display font-bold text-lg text-foreground mb-2">Planches Finger Food</h4>
              <p className="text-xs text-muted-foreground">Grands plateaux de présentation avec sauces et trempettes maison.</p>
            </div>
            <div className="bg-white border border-border rounded-3xl p-6">
              <h4 className="font-display font-bold text-lg text-foreground mb-2">Dégustation Exotic</h4>
              <p className="text-xs text-muted-foreground">Sélection de saveurs camerounaises : papaye, mangue, bissap, gingembre.</p>
            </div>
            <div className="bg-white border border-border rounded-3xl p-6">
              <h4 className="font-display font-bold text-lg text-foreground mb-2">Salades XXL</h4>
              <p className="text-xs text-muted-foreground">Saladiers en verre ou bols géants pour 10 à 25 personnes.</p>
            </div>
            <div className="bg-white border border-border rounded-3xl p-6">
              <h4 className="font-display font-bold text-lg text-foreground mb-2">Desserts XXL</h4>
              <p className="text-xs text-muted-foreground">Grands saladiers de fruits frais et terrines de mousse au chocolat.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#FAF7F2] py-16 border-t border-border text-center">
        <div className="container-tight max-w-xl mx-auto space-y-4">
          <h3 className="text-2xl font-display font-bold text-[#1E3A2B]">Intéressé par l'une de nos formules ?</h3>
          <p className="text-xs text-muted-foreground">
            Demandez une estimation personnalisée en fonction de votre lieu et de vos effectifs.
          </p>
          <div>
            <Link
              to="/devis"
              className="inline-flex items-center gap-2 bg-[#D96B43] hover:bg-[#c45b34] text-white px-8 py-3.5 rounded-full font-bold text-sm transition shadow-soft"
            >
              DEMANDER UN DEVIS <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default FormulesEvent;
