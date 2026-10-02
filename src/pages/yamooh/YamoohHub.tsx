import { Link } from "react-router-dom";
import { 
  Heart, 
  BookOpen, 
  Target, 
  ShieldCheck, 
  Users, 
  Cog, 
  Building, 
  MapPin, 
  Image as ImageIcon,
  ArrowRight
} from "lucide-react";
import Breadcrumb from "../../components/Breadcrumb";

export const YamoohHub = () => {
  const cards = [
    {
      title: "À propos",
      desc: "Une restauration pensée autour du choix, de la fraîcheur et du sur-mesure.",
      link: "/yamooh/a-propos",
      icon: Heart,
    },
    {
      title: "Notre histoire",
      desc: "L'idée derrière YAMOOH et notre vision d'une alimentation moderne à Douala.",
      link: "/yamooh/notre-histoire",
      icon: BookOpen,
    },
    {
      title: "Mission & valeurs",
      desc: "Fraîcheur, personnalisation, qualité et simplicité au service du client.",
      link: "/yamooh/mission-valeurs",
      icon: Target,
    },
    {
      title: "Nos engagements",
      desc: "Légumes locaux du matin, préparation à la commande et livraison rapide.",
      link: "/yamooh/engagements",
      icon: ShieldCheck,
    },
    {
      title: "Notre équipe",
      desc: "Préparation, organisation, service et accompagnement pour chaque repas.",
      link: "/yamooh/equipe",
      icon: Users,
    },
    {
      title: "Notre fonctionnement",
      desc: "Les parcours simples pour commander votre salade ou organiser un événement.",
      link: "/yamooh/fonctionnement",
      icon: Cog,
    },
    {
      title: "Devenir franchisé",
      desc: "Rejoindre l'univers YAMOOH et échanger sur une opportunité d'implantation.",
      link: "/yamooh/franchise",
      icon: Building,
    },
    {
      title: "Nos établissements",
      desc: "Découvrez notre cuisine et point de retrait à la Pharmacie Kotto.",
      link: "/yamooh/etablissements",
      icon: MapPin,
    },
    {
      title: "Nos réalisations",
      desc: "Nos compositions, buffets et événements en images.",
      link: "/yamooh/realisations",
      icon: ImageIcon,
    },
  ];

  return (
    <>
      <title>YAMMOH | Notre univers, nos engagements et notre approche</title>
      <meta
        name="description"
        content="Découvrez YAMMOH : notre univers, notre approche, nos engagements, nos établissements, nos réalisations et notre vision de la restauration."
      />
      <link rel="canonical" href="https://yamooh.com/yamooh" />

      {/* HERO */}
      <section className="bg-[#1E3A2B] text-white py-16 lg:py-24 relative overflow-hidden">
        <div className="container-tight relative z-10 text-center max-w-3xl mx-auto">
          <div className="mb-4 flex justify-center">
            <Breadcrumb items={[{ label: "L'Univers YAMOOH" }]} />
          </div>

          <span className="inline-block bg-white/10 text-[#F2B705] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-white/15 font-mono">
            Vision & Engagements
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight mb-6">
            Bienvenue dans l'univers YAMMOH.
          </h1>

          <p className="text-white/85 text-base sm:text-lg leading-relaxed font-light mb-8">
            YAMMOH est une marque de restauration et de traiteur orientée fraîcheur, personnalisation et qualité. Découvrez notre approche, notre fonctionnement, nos engagements et les différentes façons dont YAMMOH accompagne ses clients.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/notre-carte"
              className="inline-flex items-center gap-2 bg-[#D96B43] hover:bg-[#c45b34] text-white px-8 py-3.5 rounded-full font-bold text-sm transition shadow-elevated"
            >
              <span>DÉCOUVRIR LA CARTE</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#F2B705_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      </section>

      {/* GRILLE DES 9 CARTES */}
      <section className="container-tight py-16 lg:py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((c) => {
            const Icon = c.icon;
            return (
              <div
                key={c.title}
                className="bg-card border border-border rounded-3xl p-8 shadow-card flex flex-col justify-between hover:shadow-elevated transition-all group"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#E3ECE6] text-[#1E3A2B] flex items-center justify-center mb-6 group-hover:bg-[#1E3A2B] group-hover:text-[#F2B705] transition-colors">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-foreground mb-2 group-hover:text-[#D96B43] transition-colors">
                    {c.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6">
                    {c.desc}
                  </p>
                </div>
                <Link
                  to={c.link}
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#1E3A2B] hover:text-[#D96B43] transition"
                >
                  <span>En savoir plus</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default YamoohHub;
