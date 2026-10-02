import { Link } from "react-router-dom";
import { Rocket, ArrowRight } from "lucide-react";
import Breadcrumb from "../../components/Breadcrumb";

export const Lancements = () => {
  return (
    <>
      <title>Restauration Lancements de Produits à Douala | YAMOOH</title>
      <meta
        name="description"
        content="Accompagnez le lancement de vos nouveaux produits à Douala avec une restauration haut de gamme, fraîche et créative."
      />
      <link rel="canonical" href="https://yamooh.com/services-evenementiels/lancements" />

      {/* HERO */}
      <section className="bg-[#1E3A2B] text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="container-tight relative z-10 text-center max-w-3xl mx-auto">
          <div className="mb-4 flex justify-center">
            <Breadcrumb
              items={[
                { label: "Services Événementiels", to: "/services-evenementiels" },
                { label: "Lancements de Produits" },
              ]}
            />
          </div>

          <h1 className="text-4xl sm:text-5xl font-display font-black tracking-tight mb-4">
            Accompagner votre lancement avec une restauration adaptée.
          </h1>

          <p className="text-white/85 text-base sm:text-lg leading-relaxed font-light mb-8">
            Pour un lancement de produit ou un rendez-vous professionnel, YAMOOH peut étudier avec vous une solution cohérente avec le format de votre événement.
          </p>

          <Link
            to="/devis"
            className="inline-flex items-center gap-2 bg-[#D96B43] hover:bg-[#c45b34] text-white px-8 py-3.5 rounded-full font-bold text-sm transition shadow-elevated"
          >
            <span>PARLER DE MON PROJET</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* CONTENU */}
      <section className="container-tight py-16 lg:py-20">
        <div className="bg-card border border-border rounded-3xl p-8 shadow-card max-w-2xl mx-auto text-center space-y-4">
          <h2 className="text-2xl font-display font-bold text-foreground">Une image de marque soignée</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Mettez vos invités dans les meilleures dispositions avec des pièces bouchées modernes, des couleurs vives et des saveurs authentiques mettant en valeur le dynamisme de votre marque.
          </p>
        </div>
      </section>
    </>
  );
};

export default Lancements;
