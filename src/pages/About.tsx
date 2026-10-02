import { Link } from "react-router-dom";
import { 
  Leaf, 
  ShieldCheck, 
  Sparkles, 
  ChefHat, 
  MapPin, 
  Heart, 
  Users, 
  Award, 
  ArrowRight,
  PhoneCall
} from "lucide-react";

export const About = () => {
  return (
    <>
      {/* SEO */}
      <title>À Propos de YAMOOH | Notre Histoire, Valeurs & Équipe à Douala</title>
      <meta
        name="description"
        content="Découvrez l'histoire de YAMOOH à Douala, notre vision d'une alimentation saine et locale, notre cuisine basée à la Pharmacie Kotto et nos engagements qualité."
      />
      <link rel="canonical" href="https://yamooh.com/a-propos" />

      {/* HEADER ABOUT */}
      <section className="bg-[#1E3A2B] text-white py-16 lg:py-24 relative overflow-hidden">
        <div className="container-tight relative z-10 text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 bg-white/10 text-[#F2B705] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-white/15">
            <Heart size={14} className="text-[#D96B43]" /> Notre Histoire & Passion
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight mb-6">
            La Révolution Fraîcheur à Douala
          </h1>
          <p className="text-white/85 text-base sm:text-lg leading-relaxed font-light">
            Née d'une volonté simple mais exigeante : offrir aux habitants et professionnels de Douala des repas sains, savoureux, généreux et préparés à partir des meilleurs produits locaux.
          </p>
        </div>
      </section>

      {/* HISTOIRE & MISSION */}
      <section className="container-tight py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs uppercase font-mono tracking-widest font-bold text-[#D96B43]">
              Notre Genèse
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-[#1E3A2B] mt-2 mb-6">
              Manger sainement, avec plaisir et sans compromis
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
              <p>
                Installé au cœur de Douala, au niveau de la <strong>Pharmacie Kotto</strong>, YAMOOH est bien plus qu'un simple bar à salades : c'est un engagement quotidien envers le bien-manger et le bien-vivre au Cameroun.
              </p>
              <p>
                Constatant le manque d'alternatives fraîches, saines et rapides pour les déjeuners des actifs à Douala, nous avons imaginé un concept où chaque client peut soit savourer l'une de nos <strong>8 créations signatures</strong> équilibrées, soit composer en toute liberté sa propre salade grâce à notre bar d'ingrédients frais du matin.
              </p>
              <p>
                Toutes nos sauces sont élaborées artisanalement dans notre atelier, sans conservateurs chimiques, pour révéler la pleine saveur des produits du terroir camerounais.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/carte"
                className="bg-[#1E3A2B] hover:bg-[#162B20] text-white px-7 py-3 rounded-full font-bold text-xs transition"
              >
                Découvrir la carte
              </Link>
              <Link
                to="/builder"
                className="bg-[#D96B43] hover:bg-[#c45b34] text-white px-7 py-3 rounded-full font-bold text-xs transition flex items-center gap-1.5"
              >
                <ChefHat size={15} /> Composer ma salade
              </Link>
            </div>
          </div>

          <div className="bg-[#FAF7F2] border border-border rounded-3xl p-8 lg:p-10 shadow-card">
            <h3 className="text-2xl font-display font-bold text-[#1E3A2B] mb-6">
              Nos 4 Engagements Fondamentaux
            </h3>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-[#E3ECE6] text-[#1E3A2B] flex items-center justify-center shrink-0">
                  <Leaf size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-sm">Fraîcheur Absolue</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Sélection matinale rigoureuse auprès de producteurs et marchés maraîchers locaux.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-[#E3ECE6] text-[#1E3A2B] flex items-center justify-center shrink-0">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-sm">Préparation Minute</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Aucune salade préparée en avance : chaque commande est assemblée à la minute.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-[#E3ECE6] text-[#1E3A2B] flex items-center justify-center shrink-0">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-sm">Sauces Artisanales Maison</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Recettes exclusives Yamooh (Fruit de la passion, Signature, César) concoctées sans conservateurs.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-[#E3ECE6] text-[#1E3A2B] flex items-center justify-center shrink-0">
                  <Users size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-sm">Service & Proximité Douala</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Retrait express à la Pharmacie Kotto et livraison soignée dans tous les quartiers de la ville.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CHIFFRES CLÉS */}
      <section className="bg-[#FAF7F2] py-16 border-y border-border">
        <div className="container-tight">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="bg-white p-6 rounded-3xl border border-border">
              <span className="text-3xl sm:text-4xl font-display font-black text-[#1E3A2B] block mb-1">
                8
              </span>
              <span className="text-xs font-bold text-muted-foreground uppercase">
                Salades Signatures
              </span>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-border">
              <span className="text-3xl sm:text-4xl font-display font-black text-[#D96B43] block mb-1">
                +15
              </span>
              <span className="text-xs font-bold text-muted-foreground uppercase">
                Ingrédients Frais du Jour
              </span>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-border">
              <span className="text-3xl sm:text-4xl font-display font-black text-[#1E3A2B] block mb-1">
                100%
              </span>
              <span className="text-xs font-bold text-muted-foreground uppercase">
                Fait Maison à Douala
              </span>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-border">
              <span className="text-3xl sm:text-4xl font-display font-black text-[#D96B43] block mb-1">
                20 min
              </span>
              <span className="text-xs font-bold text-muted-foreground uppercase">
                Préparation Moyenne
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* BANNIÈRE CONTACT */}
      <section className="container-tight py-16 text-center">
        <div className="bg-[#1E3A2B] text-white rounded-3xl p-8 sm:p-12 max-w-3xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-display font-bold mb-3">
            Venez nous rencontrer à Douala
          </h3>
          <p className="text-white/80 text-sm mb-6 max-w-lg mx-auto">
            Nous sommes installés à la Pharmacie Kotto. Passez nous voir ou commandez directement en ligne et par WhatsApp.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contact-aide"
              className="bg-white text-[#1E3A2B] hover:bg-white/90 px-6 py-3 rounded-full font-bold text-xs transition"
            >
              Voir nos coordonnées
            </Link>
            <a
              href="https://wa.me/237658254509"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] text-white px-6 py-3 rounded-full font-bold text-xs hover:bg-[#20bd5a] transition flex items-center gap-1.5"
            >
              <PhoneCall size={14} /> WhatsApp : +237 658 254 509
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
