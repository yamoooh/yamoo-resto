import { Link } from "react-router-dom";
import { Leaf, Sliders, ShieldCheck, Zap, ArrowRight } from "lucide-react";
import Breadcrumb from "../../components/Breadcrumb";

export const YamoohMissionValeurs = () => {
  const valeurs = [
    {
      title: "FRAÎCHEUR",
      desc: "Placer la fraîcheur au cœur de l'expérience YAMOOH.",
      icon: Leaf,
    },
    {
      title: "PERSONNALISATION",
      desc: "Donner au client la possibilité de choisir et de composer selon ses envies.",
      icon: Sliders,
    },
    {
      title: "QUALITÉ",
      desc: "Porter une attention particulière à la préparation et à l'expérience proposée.",
      icon: ShieldCheck,
    },
    {
      title: "SIMPLICITÉ",
      desc: "Faciliter le passage de la découverte au choix, puis à la commande.",
      icon: Zap,
    },
  ];

  return (
    <>
      <title>Mission & Valeurs | YAMOOH Douala</title>
      <meta
        name="description"
        content="Découvrez la mission et les 4 valeurs fondamentales de YAMOOH à Douala : Fraîcheur, Personnalisation, Qualité et Simplicité."
      />
      <link rel="canonical" href="https://yamooh.com/yamooh/mission-valeurs" />

      {/* HERO */}
      <section className="bg-[#1E3A2B] text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="container-tight relative z-10 text-center max-w-3xl mx-auto">
          <div className="mb-4 flex justify-center">
            <Breadcrumb
              items={[
                { label: "YAMOOH", to: "/yamooh" },
                { label: "Mission & valeurs" },
              ]}
            />
          </div>

          <h1 className="text-4xl sm:text-5xl font-display font-black tracking-tight mb-4">
            Notre mission et nos valeurs
          </h1>

          <p className="text-white/85 text-base sm:text-lg leading-relaxed font-light mb-8">
            Les quatre principes cardinaux qui guident chaque jour notre travail en cuisine et notre relation avec nos clients à Douala.
          </p>

          <Link
            to="/notre-carte"
            className="inline-flex items-center gap-2 bg-[#D96B43] hover:bg-[#c45b34] text-white px-8 py-3.5 rounded-full font-bold text-sm transition shadow-elevated"
          >
            <span>DÉCOUVRIR NOTRE CARTE</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* 4 VALEURS */}
      <section className="container-tight py-16 lg:py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {valeurs.map((v) => {
            const Icon = v.icon;
            return (
              <div key={v.title} className="bg-card border border-border rounded-3xl p-8 shadow-card text-center flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-[#E3ECE6] text-[#1E3A2B] flex items-center justify-center mx-auto mb-6">
                    <Icon size={26} />
                  </div>
                  <h2 className="text-xl font-display font-black text-foreground mb-3">{v.title}</h2>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default YamoohMissionValeurs;
