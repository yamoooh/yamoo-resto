import { Link } from "react-router-dom";
import { ArrowRight, Leaf, ShieldCheck, Sparkles } from "lucide-react";
import Breadcrumb from "../../components/Breadcrumb";

export const YamoohAPropos = () => {
  return (
    <>
      <title>À Propos | YAMOOH Douala</title>
      <meta
        name="description"
        content="YAMOOH associe restauration, personnalisation et services traiteur autour d'une approche centrée sur la fraîcheur et l'expérience client à Douala."
      />
      <link rel="canonical" href="https://yamooh.com/yamooh/a-propos" />

      {/* HERO */}
      <section className="bg-[#1E3A2B] text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="container-tight relative z-10 text-center max-w-3xl mx-auto">
          <div className="mb-4 flex justify-center">
            <Breadcrumb
              items={[
                { label: "YAMOOH", to: "/yamooh" },
                { label: "À propos" },
              ]}
            />
          </div>

          <h1 className="text-4xl sm:text-5xl font-display font-black tracking-tight mb-4">
            YAMOOH, une restauration pensée autour du choix et de la fraîcheur.
          </h1>

          <p className="text-white/85 text-base sm:text-lg leading-relaxed font-light mb-8">
            YAMOOH associe restauration, personnalisation et services traiteur autour d'une approche centrée sur la fraîcheur et l'expérience client.
          </p>

          <Link
            to="/services-evenementiels"
            className="inline-flex items-center gap-2 bg-[#D96B43] hover:bg-[#c45b34] text-white px-8 py-3.5 rounded-full font-bold text-sm transition shadow-elevated"
          >
            <span>DÉCOUVRIR NOS SERVICES</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* CONTENU */}
      <section className="container-tight py-16 lg:py-20 max-w-3xl mx-auto">
        <div className="bg-card border border-border rounded-3xl p-8 sm:p-10 shadow-card space-y-6 text-sm text-muted-foreground leading-relaxed">
          <p>
            Sur le site, chacun peut découvrir les créations proposées, choisir une recette ou composer sa salade selon ses envies. Les besoins professionnels et événementiels disposent également d'un parcours dédié.
          </p>
          <p>
            En combinant une sélection rigoureuse d'ingrédients locaux frais du matin et un service de commande direct par WhatsApp, YAMOOH apporte une réponse concrète aux attentes des consommateurs urbains à Douala.
          </p>
        </div>
      </section>
    </>
  );
};

export default YamoohAPropos;
