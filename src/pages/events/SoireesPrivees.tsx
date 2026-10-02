import { Link } from "react-router-dom";
import { Sparkles, ArrowRight } from "lucide-react";
import Breadcrumb from "../../components/Breadcrumb";

export const SoireesPrivees = () => {
  return (
    <>
      <title>Traiteur Soirées Privées à Douala | YAMOOH</title>
      <meta
        name="description"
        content="Cocktails dînatoires et finger food pour vos soirées privées, réceptions entre amis et dîners festifs à Douala."
      />
      <link rel="canonical" href="https://yamooh.com/services-evenementiels/soirees-privees" />

      {/* HERO */}
      <section className="bg-[#1E3A2B] text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="container-tight relative z-10 text-center max-w-3xl mx-auto">
          <div className="mb-4 flex justify-center">
            <Breadcrumb
              items={[
                { label: "Services Événementiels", to: "/services-evenementiels" },
                { label: "Soirées Privées" },
              ]}
            />
          </div>

          <h1 className="text-4xl sm:text-5xl font-display font-black tracking-tight mb-4">
            Une soirée privée se partage aussi autour de la table.
          </h1>

          <p className="text-white/85 text-base sm:text-lg leading-relaxed font-light mb-8">
            Présentez votre soirée, votre nombre de convives et le format souhaité afin d'échanger avec YAMOOH sur les possibilités adaptées à votre événement.
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
        <div className="bg-card border border-border rounded-3xl p-8 shadow-card max-w-2xl mx-auto text-center space-y-4">
          <h2 className="text-2xl font-display font-bold text-foreground">Cocktail & Convivialité</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Profitez pleinement de votre soirée sans vous soucier des préparatifs. Nos pièces cocktail salées et sucrées sont dressées élégamment et prêtes à être partagées dès leur livraison.
          </p>
        </div>
      </section>
    </>
  );
};

export default SoireesPrivees;
