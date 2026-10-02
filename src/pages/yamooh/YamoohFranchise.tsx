import { Link } from "react-router-dom";
import { Building, ArrowRight, PhoneCall, Mail } from "lucide-react";
import Breadcrumb from "../../components/Breadcrumb";

export const YamoohFranchise = () => {
  return (
    <>
      <title>Devenir Franchisé | YAMOOH Douala</title>
      <meta
        name="description"
        content="Rejoignez l'univers YAMOOH et échangez sur les opportunités de développement de notre concept de bar à salades."
      />
      <link rel="canonical" href="https://yamooh.com/yamooh/franchise" />

      {/* HERO */}
      <section className="bg-[#1E3A2B] text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="container-tight relative z-10 text-center max-w-3xl mx-auto">
          <div className="mb-4 flex justify-center">
            <Breadcrumb
              items={[
                { label: "YAMOOH", to: "/yamooh" },
                { label: "Devenir franchisé" },
              ]}
            />
          </div>

          <h1 className="text-4xl sm:text-5xl font-display font-black tracking-tight mb-4">
            Rejoindre l'univers YAMOOH
          </h1>

          <p className="text-white/85 text-base sm:text-lg leading-relaxed font-light mb-8">
            Vous souhaitez découvrir le concept YAMOOH et échanger sur une éventuelle implantation ? Prenez contact avec nous pour présenter votre projet et en savoir plus sur le concept.
          </p>

          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-[#D96B43] hover:bg-[#c45b34] text-white px-8 py-3.5 rounded-full font-bold text-sm transition shadow-elevated"
          >
            <span>PRENDRE CONTACT</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* CONTACT PARTENARIAT */}
      <section className="container-tight py-16 lg:py-20 max-w-2xl mx-auto">
        <div className="bg-card border border-border rounded-3xl p-8 shadow-card space-y-4 text-xs sm:text-sm text-muted-foreground leading-relaxed">
          <h2 className="text-xl font-display font-bold text-foreground mb-3">Échange préliminaire</h2>
          <p>
            Nous étudions avec attention les candidatures sérieuses pour le déploiement de notre offre de bar à salades et service traiteur.
          </p>
          <div className="pt-4 border-t border-border space-y-2">
            <p><strong>Téléphone & WhatsApp :</strong> +237 658 254 509</p>
            <p><strong>Email :</strong> tchokonte@gmail.com</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default YamoohFranchise;
