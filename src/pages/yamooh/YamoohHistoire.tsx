import { Link } from "react-router-dom";
import { ArrowRight, BookOpen } from "lucide-react";
import Breadcrumb from "../../components/Breadcrumb";

export const YamoohHistoire = () => {
  return (
    <>
      <title>Notre Histoire | YAMOOH Douala</title>
      <meta
        name="description"
        content="Découvrez l'idée derrière YAMOOH à Douala : une vision simple de la restauration alliant choix, fraîcheur et personnalisation."
      />
      <link rel="canonical" href="https://yamooh.com/yamooh/notre-histoire" />

      {/* HERO */}
      <section className="bg-[#1E3A2B] text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="container-tight relative z-10 text-center max-w-3xl mx-auto">
          <div className="mb-4 flex justify-center">
            <Breadcrumb
              items={[
                { label: "YAMOOH", to: "/yamooh" },
                { label: "Notre histoire" },
              ]}
            />
          </div>

          <h1 className="text-4xl sm:text-5xl font-display font-black tracking-tight mb-4">
            L'idée derrière YAMOOH
          </h1>

          <p className="text-white/85 text-base sm:text-lg leading-relaxed font-light mb-8">
            YAMOOH s'inscrit dans une vision simple de la restauration : permettre à chacun de choisir une création qui lui correspond, tout en donnant une place importante à la fraîcheur et à la personnalisation.
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

      {/* CONTENU */}
      <section className="container-tight py-16 lg:py-20 max-w-3xl mx-auto">
        <div className="bg-card border border-border rounded-3xl p-8 sm:p-10 shadow-card space-y-6 text-sm text-muted-foreground leading-relaxed">
          <p>
            Cette vision se traduit par plusieurs expériences : découvrir la carte, choisir une création signature, composer sa propre salade ou solliciter une solution adaptée pour un événement.
          </p>
          <p>
            Chaque jour, notre atelier situé à la Pharmacie Kotto à Douala met en œuvre des processus de préparation soignés pour garantir des repas savoureux et nutritifs.
          </p>
        </div>
      </section>
    </>
  );
};

export default YamoohHistoire;
