import { Link } from "react-router-dom";
import { HelpCircle, ArrowRight, PhoneCall, CheckCircle2 } from "lucide-react";
import Breadcrumb from "../../components/Breadcrumb";

export const Accompagnement = () => {
  return (
    <>
      <title>Accompagnement Traiteur Personnalisé à Douala | YAMOOH</title>
      <meta
        name="description"
        content="Besoin de conseils pour organiser la restauration de votre événement à Douala ? YAMOOH vous guide selon vos contraintes et votre budget."
      />
      <link rel="canonical" href="https://yamooh.com/services-evenementiels/accompagnement" />

      {/* HERO */}
      <section className="bg-[#1E3A2B] text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="container-tight relative z-10 text-center max-w-3xl mx-auto">
          <div className="mb-4 flex justify-center">
            <Breadcrumb
              items={[
                { label: "Services Événementiels", to: "/services-evenementiels" },
                { label: "Accompagnement" },
              ]}
            />
          </div>

          <span className="inline-block bg-white/10 text-[#F2B705] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-white/15 font-mono">
            Conseil & Écoute
          </span>

          <h1 className="text-4xl sm:text-5xl font-display font-black tracking-tight mb-4">
            Vous ne savez pas encore quelle formule choisir ?
          </h1>

          <p className="text-white/85 text-base sm:text-lg leading-relaxed font-light mb-8">
            Ce n'est pas nécessaire de connaître immédiatement le format exact. Indiquez-nous votre événement, le nombre de personnes, le lieu et vos besoins : nous pourrons échanger avec vous sur les possibilités adaptées.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/devis"
              className="inline-flex items-center gap-2 bg-[#D96B43] hover:bg-[#c45b34] text-white px-8 py-3.5 rounded-full font-bold text-sm transition shadow-elevated"
            >
              <span>ÊTRE ACCOMPAGNÉ</span>
              <ArrowRight size={16} />
            </Link>
            <a
              href="https://wa.me/237658254509"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/30 px-8 py-3.5 rounded-full font-bold text-sm transition"
            >
              <PhoneCall size={16} />
              <span>Discussion WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* ÉTAPES CONSEIL */}
      <section className="container-tight py-16 lg:py-20">
        <div className="grid sm:grid-cols-3 gap-6">
          <div className="bg-card border border-border rounded-3xl p-6 shadow-card">
            <h3 className="font-display font-bold text-lg text-foreground mb-2">1. Écoute de vos contraintes</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Horaires, type de lieu, présence ou absence de tables, timing des interventions.
            </p>
          </div>
          <div className="bg-card border border-border rounded-3xl p-6 shadow-card">
            <h3 className="font-display font-bold text-lg text-foreground mb-2">2. Recommandation du bon format</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Plateaux repas, cocktail dînatoire ou buffet partagé selon la dynamique souhaitée.
            </p>
          </div>
          <div className="bg-card border border-border rounded-3xl p-6 shadow-card">
            <h3 className="font-display font-bold text-lg text-foreground mb-2">3. Ajustement du devis</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Proposition détaillée et adaptable jusqu'à la validation définitive.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Accompagnement;
