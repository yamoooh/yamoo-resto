import { Link } from "react-router-dom";
import { Building2, ArrowRight } from "lucide-react";
import Breadcrumb from "../../components/Breadcrumb";

export const EntreprisesEvents = () => {
  return (
    <>
      <title>Événements Professionnels à Douala | Traiteur YAMOOH</title>
      <meta
        name="description"
        content="Solutions traiteur complètes pour vos événements professionnels, réunions d'équipes et comités d'entreprise à Douala."
      />
      <link rel="canonical" href="https://yamooh.com/services-evenementiels/entreprises" />

      {/* HERO */}
      <section className="bg-[#1E3A2B] text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="container-tight relative z-10 text-center max-w-3xl mx-auto">
          <div className="mb-4 flex justify-center">
            <Breadcrumb
              items={[
                { label: "Services Événementiels", to: "/services-evenementiels" },
                { label: "Événements d'Entreprise" },
              ]}
            />
          </div>

          <h1 className="text-4xl sm:text-5xl font-display font-black tracking-tight mb-4">
            Des solutions pour vos événements professionnels.
          </h1>

          <p className="text-white/85 text-base sm:text-lg leading-relaxed font-light mb-8">
            Réunions, séminaires, rencontres professionnelles ou moments d'équipe : présentez-nous votre projet et ses principales contraintes afin d'échanger sur une solution adaptée.
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
        <div className="grid sm:grid-cols-2 gap-8">
          <div className="bg-card border border-border rounded-3xl p-8 shadow-card">
            <h2 className="text-xl font-display font-bold text-foreground mb-2">Déjeuners d'équipe</h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Formules régulières ou ponctuelles livrées directement au bureau à Akwa, Bonanjo, Bonapriso ou Kotto.
            </p>
          </div>
          <div className="bg-card border border-border rounded-3xl p-8 shadow-card">
            <h2 className="text-xl font-display font-bold text-foreground mb-2">Soirées & Célébrations Corporate</h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Buffets chauds & froids, planches de dégustation et service boissons pour fêter les réussites de votre entreprise.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default EntreprisesEvents;
