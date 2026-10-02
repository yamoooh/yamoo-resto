import { Link } from "react-router-dom";
import { ChefHat, Calendar, ConciergeBell, Headphones, ArrowRight } from "lucide-react";
import Breadcrumb from "../../components/Breadcrumb";

export const YamoohEquipe = () => {
  const poles = [
    {
      title: "Préparation",
      desc: "Sélection des légumes frais du matin, découpe précise des ingrédients et confection artisanale des sauces maison.",
      icon: ChefHat,
    },
    {
      title: "Organisation",
      desc: "Gestion des approvisionnements locaux, respect strict des normes d'hygiène et planification des commandes.",
      icon: Calendar,
    },
    {
      title: "Service",
      desc: "Assemblage soigné des bols, conditionnement isotherme et coordination des livraisons rapides à Douala.",
      icon: ConciergeBell,
    },
    {
      title: "Accompagnement",
      desc: "Écoute de vos besoins événementiels, élaboration des devis sur-mesure et suivi client dédié par WhatsApp.",
      icon: Headphones,
    },
  ];

  return (
    <>
      <title>Notre Équipe | YAMOOH Douala</title>
      <meta
        name="description"
        content="Découvrez les pôles opérationnels de YAMOOH à Douala : Préparation, Organisation, Service et Accompagnement."
      />
      <link rel="canonical" href="https://yamooh.com/yamooh/equipe" />

      {/* HERO */}
      <section className="bg-[#1E3A2B] text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="container-tight relative z-10 text-center max-w-3xl mx-auto">
          <div className="mb-4 flex justify-center">
            <Breadcrumb
              items={[
                { label: "YAMOOH", to: "/yamooh" },
                { label: "Notre équipe" },
              ]}
            />
          </div>

          <h1 className="text-4xl sm:text-5xl font-display font-black tracking-tight mb-4">
            Une équipe au service de votre expérience.
          </h1>

          <p className="text-white/85 text-base sm:text-lg leading-relaxed font-light mb-8">
            Derrière chaque expérience YAMOOH se trouvent plusieurs étapes : préparation, organisation, service et accompagnement.
          </p>

          <Link
            to="/notre-carte"
            className="inline-flex items-center gap-2 bg-[#D96B43] hover:bg-[#c45b34] text-white px-8 py-3.5 rounded-full font-bold text-sm transition shadow-elevated"
          >
            <span>DÉCOUVRIR NOS CRÉATIONS</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* PÔLES */}
      <section className="container-tight py-16 lg:py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {poles.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.title} className="bg-card border border-border rounded-3xl p-8 shadow-card flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#E3ECE6] text-[#1E3A2B] flex items-center justify-center mb-6">
                    <Icon size={24} />
                  </div>
                  <h2 className="text-xl font-display font-bold text-foreground mb-3">{p.title}</h2>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default YamoohEquipe;
