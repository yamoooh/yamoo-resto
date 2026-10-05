import { Link } from "react-router-dom";
import { 
  Heart, 
  PartyPopper, 
  Briefcase, 
  Sparkles, 
  Rocket, 
  Building2, 
  HelpCircle, 
  UtensilsCrossed, 
  Image as ImageIcon,
  ArrowRight,
  PhoneCall
} from "lucide-react";
import Breadcrumb from "../components/Breadcrumb";

export const EventServices = () => {
  const servicesGrid = [
    {
      title: "Mariages",
      desc: "Une réception pensée autour de votre journée avec fraîcheur et élégance.",
      link: "/services-evenementiels/mariages",
      icon: Heart,
    },
    {
      title: "Anniversaires",
      desc: "Un anniversaire à partager autour d'une belle table colorée et généreuse.",
      link: "/services-evenementiels/anniversaires",
      icon: PartyPopper,
    },
    {
      title: "Séminaires & conférences",
      desc: "Des solutions repas énergisantes et pratiques pour vos rencontres professionnelles.",
      link: "/services-evenementiels/seminaires",
      icon: Briefcase,
    },
    {
      title: "Soirées privées",
      desc: "Cocktails dînatoires, finger food et bouchées fraîches entre convives.",
      link: "/services-evenementiels/soirees-privees",
      icon: Sparkles,
    },
    {
      title: "Lancements de produits",
      desc: "Accompagner votre lancement avec une prestation moderne et valorisante.",
      link: "/services-evenementiels/lancements",
      icon: Rocket,
    },
    {
      title: "Événements d'entreprise",
      desc: "Team buildings, réunions de fin d'année et déjeuners d'affaires à Douala.",
      link: "/services-evenementiels/entreprises",
      icon: Building2,
    },
    {
      title: "Accompagnement personnalisé",
      desc: "Vous ne savez pas quelle formule choisir ? Nous vous guidons pas à pas.",
      link: "/services-evenementiels/accompagnement",
      icon: HelpCircle,
    },
    {
      title: "Formules événementielles",
      desc: "Plateaux repas, buffets chauds & froids, salades XXL et fontaines de jus.",
      link: "/services-evenementiels/formules",
      icon: UtensilsCrossed,
    },
    {
      title: "Inspirations culinaires",
      desc: "Découvrez en images nos compositions, buffets et événements récents.",
      link: "/services-evenementiels/inspirations",
      icon: ImageIcon,
    },
  ];

  return (
    <>
      <title>Services événementiels à Douala | YAMOOH</title>
      <meta
        name="description"
        content="Découvrez les services événementiels YAMOOH pour mariages, anniversaires, séminaires, soirées privées et événements professionnels à Douala."
      />
      <link rel="canonical" href="https://yamooh.com/services-evenementiels" />

      {/* HERO */}
      <section className="bg-[#1E3A2B] text-white py-16 lg:py-24 relative overflow-hidden">
        <div className="container-tight relative z-10 text-center max-w-3xl mx-auto">
          <div className="mb-4 flex justify-center">
            <Breadcrumb items={[{ label: "Services Événementiels" }]} />
          </div>

          <span className="inline-block bg-white/10 text-[#F2B705] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-white/15 font-mono">
            Événements Privés & Professionnels
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight mb-6">
            Votre événement, votre format, votre expérience YAMOOH.
          </h1>

          <p className="text-white/85 text-base sm:text-lg leading-relaxed font-light mb-8">
            De la réception privée au rendez-vous professionnel, YAMOOH propose des solutions de restauration à adapter selon votre événement, votre nombre de convives et vos besoins.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/devis"
              className="inline-flex items-center gap-2 bg-[#D96B43] hover:bg-[#c45b34] text-white px-8 py-3.5 rounded-full font-bold text-sm transition shadow-elevated"
            >
              <span>DEMANDER UN DEVIS</span>
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/services-evenementiels/accompagnement"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/30 px-8 py-3.5 rounded-full font-bold text-sm transition"
            >
              <span>ÊTRE ACCOMPAGNÉ</span>
            </Link>
          </div>
        </div>

        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#F2B705_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      </section>

      {/* GRILLE DES 9 SERVICES */}
      <section className="container-tight py-16 lg:py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold font-mono uppercase tracking-widest text-[#D96B43]">
            Nos Prestations Culinaires
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-[#1E3A2B] mt-2">
            Des formats pensés pour chaque occasion
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesGrid.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="bg-card border border-border rounded-3xl p-8 shadow-card flex flex-col justify-between hover:shadow-elevated transition-all group hover:-translate-y-1"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#E3ECE6] text-[#1E3A2B] flex items-center justify-center mb-6 group-hover:bg-[#1E3A2B] group-hover:text-[#F2B705] transition-colors">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-foreground mb-2 group-hover:text-[#D96B43] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6">
                    {item.desc}
                  </p>
                </div>
                <Link
                  to={item.link}
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#1E3A2B] group-hover:text-[#D96B43] transition"
                >
                  <span>En savoir plus</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            );
          })}
        </div>

        {/* BANNIÈRE VISUELLE STITCH */}
        <div className="mt-16 bg-[#1E3A2B] text-white rounded-3xl overflow-hidden shadow-elevated border border-white/10 grid md:grid-cols-2">
          <div className="p-8 sm:p-12 flex flex-col justify-between space-y-6">
            <div>
              <span className="text-[#F2B705] font-mono text-xs uppercase tracking-wider font-bold">
                Expérience Visuelle & Gastronomique
              </span>
              <h3 className="text-3xl sm:text-4xl font-display font-black mt-2 mb-4">
                Des buffets généreux qui marquent les esprits.
              </h3>
              <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
                Des créations vivantes composées à base de produits ultra-frais du terroir camerounais : salades composées signatures, brochettes maraîchères, sauces maison et jus naturels pressés.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                to="/devis"
                className="inline-flex items-center gap-2 bg-[#D96B43] hover:bg-[#c45b34] text-white px-7 py-3 rounded-full text-xs font-bold transition shadow-elevated"
              >
                <span>DEMANDER MON DEVIS ÉVÉNEMENT</span>
                <ArrowRight size={14} />
              </Link>
              <Link
                to="/services-evenementiels/inspirations"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3 rounded-full text-xs font-bold transition"
              >
                <span>VOIR LA GALERIE PHOTOS</span>
              </Link>
            </div>
          </div>

          <div className="relative min-h-[300px] md:min-h-full">
            <img
              src="/assets/hero-slide-3.jpg"
              alt="Buffet Traiteur Événementiel YAMOOH Douala"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default EventServices;
