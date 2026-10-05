import { Link } from "react-router-dom";
import { Heart, CheckCircle2, ArrowRight, PhoneCall } from "lucide-react";
import Breadcrumb from "../../components/Breadcrumb";

export const Mariages = () => {
  return (
    <>
      <title>Traiteur Mariage à Douala | YAMOOH</title>
      <meta
        name="description"
        content="Service traiteur pour mariages à Douala : buffets raffinés, bars à salades fraîcheur, cocktails et accompagnement sur-mesure pour votre grand jour."
      />
      <link rel="canonical" href="https://yamooh.com/services-evenementiels/mariages" />

      {/* HERO */}
      <section className="bg-[#1E3A2B] text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="container-tight relative z-10 text-center max-w-3xl mx-auto">
          <div className="mb-4 flex justify-center">
            <Breadcrumb
              items={[
                { label: "Services Événementiels", to: "/services-evenementiels" },
                { label: "Mariages" },
              ]}
            />
          </div>

          <span className="inline-block bg-white/10 text-[#F2B705] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-white/15 font-mono">
            Réceptions de Mariage
          </span>

          <h1 className="text-4xl sm:text-5xl font-display font-black tracking-tight mb-4">
            Une réception pensée autour de votre journée.
          </h1>

          <p className="text-white/85 text-base sm:text-lg leading-relaxed font-light mb-8">
            Pour votre mariage, la restauration doit s'intégrer naturellement au rythme de votre réception. Présentez-nous votre format, votre nombre de convives et vos besoins afin d'échanger sur une solution adaptée.
          </p>

          <Link
            to="/devis"
            className="inline-flex items-center gap-2 bg-[#D96B43] hover:bg-[#c45b34] text-white px-8 py-3.5 rounded-full font-bold text-sm transition shadow-elevated"
          >
            <span>DEMANDER UN DEVIS MARIAGE</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* SECTIONS MARIAGE */}
      <section className="container-tight py-16 lg:py-20 space-y-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-5">
            <span className="text-xs font-bold font-mono uppercase tracking-widest text-[#D96B43]">
              Votre Jour J d'Exception
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-[#1E3A2B]">
              Une Réception Fraîcheur & Élégante
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Cocktail dînatoire d'accueil, bar à salades participatif ou buffet froid gastronomique : nous créons une scénographie culinaire colorée et vivante qui sublime votre réception à Douala.
            </p>
            <div className="pt-2">
              <Link
                to="/devis"
                className="inline-flex items-center gap-2 bg-[#D96B43] hover:bg-[#c45b34] text-white px-6 py-3 rounded-full text-xs font-bold transition shadow-md"
              >
                <span>Demander une étude personnalisée</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden shadow-elevated border border-border group h-80 sm:h-96">
            <img
              src="/assets/hero-slide-3.jpg"
              alt="Buffet Traiteur Mariage YAMOOH Douala"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1E3A2B]/80 via-transparent to-transparent flex items-end p-6">
              <span className="text-white text-xs font-bold font-mono uppercase tracking-wider bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full">
                Scénographie & Buffets YAMOOH
              </span>
            </div>
          </div>
        </div>

        {/* FORMATS CARDS */}
        <div className="grid sm:grid-cols-3 gap-6 pt-4">
          <div className="bg-[#FAF7F2] border border-border rounded-3xl p-6 shadow-card hover:shadow-elevated transition">
            <div className="w-10 h-10 rounded-2xl bg-[#E3ECE6] text-[#1E3A2B] flex items-center justify-center mb-4 font-bold text-lg">
              1
            </div>
            <h3 className="font-display font-bold text-lg text-[#1E3A2B] mb-2">Bar à Salades XXL</h3>
            <p className="text-xs text-muted-foreground leading-relaxed mb-4">
              Saladiers signatures géants, sauces artisanales et toppings croquants en libre-service.
            </p>
            <span className="text-[11px] font-bold text-[#D96B43] flex items-center gap-1">
              <CheckCircle2 size={14} className="text-green-600" /> Formule conviviale
            </span>
          </div>

          <div className="bg-[#FAF7F2] border border-border rounded-3xl p-6 shadow-card hover:shadow-elevated transition">
            <div className="w-10 h-10 rounded-2xl bg-[#E3ECE6] text-[#1E3A2B] flex items-center justify-center mb-4 font-bold text-lg">
              2
            </div>
            <h3 className="font-display font-bold text-lg text-[#1E3A2B] mb-2">Finger Food & Verrines</h3>
            <p className="text-xs text-muted-foreground leading-relaxed mb-4">
              Mini-wraps, brochettes maraîchères fraîches, toasts avocat et verrines parfumées.
            </p>
            <span className="text-[11px] font-bold text-[#D96B43] flex items-center gap-1">
              <CheckCircle2 size={14} className="text-green-600" /> Idéal cocktail d'accueil
            </span>
          </div>

          <div className="bg-[#FAF7F2] border border-border rounded-3xl p-6 shadow-card hover:shadow-elevated transition">
            <div className="w-10 h-10 rounded-2xl bg-[#E3ECE6] text-[#1E3A2B] flex items-center justify-center mb-4 font-bold text-lg">
              3
            </div>
            <h3 className="font-display font-bold text-lg text-[#1E3A2B] mb-2">Bar à Jus Pressés</h3>
            <p className="text-xs text-muted-foreground leading-relaxed mb-4">
              Fontaines de jus 100% naturels : Bissap mentholé, Gingembre ananas et citronnade fraîche.
            </p>
            <span className="text-[11px] font-bold text-[#D96B43] flex items-center gap-1">
              <CheckCircle2 size={14} className="text-green-600" /> Sans sucres ajoutés
            </span>
          </div>
        </div>

        {/* CHEF CRAFT CARD */}
        <div className="bg-[#1E3A2B] text-white rounded-3xl p-8 sm:p-10 relative overflow-hidden flex flex-col md:flex-row gap-8 items-center">
          <div className="w-full md:w-1/3 h-56 rounded-2xl overflow-hidden relative shadow-lg">
            <img
              src="/assets/hero-slide-1.jpg"
              alt="Chef Traiteur YAMOOH"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-full md:w-2/3 space-y-4">
            <span className="text-[#F2B705] font-mono text-xs uppercase tracking-wider font-bold">
              Service Sur-Mesure & Conseil
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-bold">
              Un interlocuteur dédié pour orchestrer votre service
            </h3>
            <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
              Nous coordonnons les livraisons, l'installation sur site, le réapprovisionnement en direct et le service avec votre wedding planner pour garantir une fluidité totale le jour J.
            </p>
            <div className="pt-2">
              <Link
                to="/devis"
                className="inline-flex items-center gap-2 bg-[#D96B43] hover:bg-[#c45b34] text-white px-6 py-3 rounded-full text-xs font-bold transition shadow-elevated"
              >
                <span>Contacter l'équipe mariage</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Mariages;
