import { Link } from "react-router-dom";
import { MapPin, Navigation, MessageCircle, Phone, Clock, ArrowRight, ShieldCheck, Truck } from "lucide-react";
import Breadcrumb from "../../components/Breadcrumb";
import GoogleMapLocation from "../../components/GoogleMapLocation";

export const PlanAcces = () => {
  return (
    <>
      <title>Plan d'accès | YAMOOH Pharmacie Kotto Douala</title>
      <meta
        name="description"
        content="Plan d'accès interactif et localisation de YAMOOH à la Pharmacie Kotto, Douala, Cameroun. Calculez votre itinéraire et venez récupérer votre commande."
      />
      <link rel="canonical" href="https://yamooh.com/contact/plan-dacces" />

      {/* HERO */}
      <section className="bg-[#1E3A2B] text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="container-tight relative z-10 text-center max-w-3xl mx-auto">
          <div className="mb-4 flex justify-center">
            <Breadcrumb
              items={[
                { label: "Contact", to: "/contact" },
                { label: "Plan d'accès" },
              ]}
            />
          </div>

          <span className="text-[#F2B705] text-xs uppercase tracking-widest font-bold font-mono">
            Localisation & Itinéraire
          </span>
          <h1 className="text-4xl sm:text-5xl font-display font-black tracking-tight mt-2 mb-4">
            Plan d'accès YAMOOH
          </h1>

          <p className="text-white/85 text-base sm:text-lg leading-relaxed font-light">
            Cuisine centrale et point de retrait Click & Collect à la Pharmacie Kotto, Douala.
          </p>
        </div>
      </section>

      {/* CARTE & INFOS */}
      <section className="container-tight py-16 lg:py-20 max-w-5xl mx-auto space-y-10">
        <GoogleMapLocation
          showDetails={true}
          ratio="16/9"
        />

        {/* GUIDAGE & CONSEILS D'ACCÈS */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-card border border-border rounded-3xl p-8 shadow-card space-y-4">
            <h3 className="text-xl font-display font-bold text-[#1E3A2B] flex items-center gap-2">
              <Navigation size={20} className="text-[#D96B43]" />
              <span>Comment nous rejoindre ?</span>
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="font-bold text-[#1E3A2B]">•</span>
                <span><strong>En voiture / moto :</strong> Prenez l'axe principal de Kotto en direction du rond-point. Nous sommes situés exactement à proximité immédiate de la Pharmacie Kotto.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-[#1E3A2B]">•</span>
                <span><strong>Stationnement :</strong> Stationnement aisé et rapide devant le point de retrait pour vos retraits express Click & Collect.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-[#1E3A2B]">•</span>
                <span><strong>En cas de doute :</strong> Appelez directement notre équipe ou envoyez un message WhatsApp pour un guidage instantané.</span>
              </li>
            </ul>
          </div>

          <div className="bg-[#FAF7F2] border border-border rounded-3xl p-8 flex flex-col justify-between space-y-6">
            <div>
              <h3 className="text-xl font-display font-bold text-[#1E3A2B] mb-2 flex items-center gap-2">
                <Truck size={20} className="text-[#1E3A2B]" />
                <span>Vous préférez être livré ?</span>
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Pas le temps de vous déplacer ? Nos coursiers express livrent vos salades, sandwichs et plateaux repas partout à Douala (Akwa, Bonanjo, Bonapriso, Kotto, Makepe, Denver...).
              </p>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                to="/builder"
                className="bg-[#D96B43] hover:bg-[#c45b34] text-white px-6 py-3 rounded-full text-xs font-bold transition shadow-soft"
              >
                Composer & Commander
              </Link>
              <Link
                to="/notre-carte"
                className="bg-[#1E3A2B] hover:bg-[#162B20] text-white px-6 py-3 rounded-full text-xs font-bold transition shadow-soft"
              >
                Voir toute la carte
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PlanAcces;
