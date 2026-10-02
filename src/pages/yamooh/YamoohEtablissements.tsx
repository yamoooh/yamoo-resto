import { Link } from "react-router-dom";
import { MapPin, Clock, Phone, Mail, ArrowRight, ShieldCheck, Sparkles, Navigation, MessageCircle } from "lucide-react";
import Breadcrumb from "../../components/Breadcrumb";
import GoogleMapLocation from "../../components/GoogleMapLocation";
import { YAMOOH_ESTABLISHMENTS } from "../../data/establishments";

export const YamoohEtablissements = () => {
  const mainEstablishment = YAMOOH_ESTABLISHMENTS[0];

  return (
    <>
      <title>Nos Établissements | YAMOOH Douala</title>
      <meta
        name="description"
        content="Découvrez l'établissement YAMOOH à Douala : Pharmacie Kotto. Point de retrait, cuisine centrale, carte Google Maps et livraison dans toute la ville."
      />
      <link rel="canonical" href="https://yamooh.com/yamooh/etablissements" />

      {/* HERO */}
      <section className="bg-[#1E3A2B] text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="container-tight relative z-10 text-center max-w-3xl mx-auto">
          <div className="mb-4 flex justify-center">
            <Breadcrumb
              items={[
                { label: "YAMOOH", to: "/yamooh" },
                { label: "Nos établissements" },
              ]}
            />
          </div>

          <span className="text-[#F2B705] text-xs uppercase tracking-widest font-bold font-mono">
            Réseau & Implantation
          </span>
          <h1 className="text-4xl sm:text-5xl font-display font-black tracking-tight mt-2 mb-4">
            Nos établissements
          </h1>

          <p className="text-white/85 text-base sm:text-lg leading-relaxed font-light mb-8">
            Retrouvez notre cuisine centrale et point de retrait à Douala ainsi que nos zones de livraison dans toute la métropole.
          </p>
        </div>
      </section>

      {/* SECTION PRINCIPALE AVEC GOOGLE MAPS INTERACTIVE */}
      <section className="container-tight py-16 lg:py-20 max-w-5xl mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-[#D96B43] text-xs uppercase tracking-widest font-bold font-mono">
            Établissement Principal
          </span>
          <h2 className="text-3xl font-display font-bold text-[#1E3A2B] mt-1">
            YAMOOH — Pharmacie Kotto, Douala
          </h2>
          <p className="text-sm text-muted-foreground mt-2">
            Notre atelier de préparation, cuisine centrale et comptoir de retrait Click & Collect.
          </p>
        </div>

        {/* Intégration Google Maps */}
        <GoogleMapLocation
          establishment={mainEstablishment}
          showDetails={true}
          ratio="16/9"
        />

        {/* PROCHAINES IMPLANTATIONS */}
        <div className="pt-8 border-t border-border">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-[#1E3A2B] text-xs uppercase tracking-widest font-bold font-mono">
              Expansion & Développement
            </span>
            <h3 className="text-2xl font-display font-bold text-[#1E3A2B] mt-1">
              Prochaines Ouvertures à Douala & Yaoundé
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              YAMOOH grandit ! De nouveaux points de collecte et comptoirs ouvriront très prochainement.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-secondary/40 border border-border/70 rounded-3xl p-6 relative overflow-hidden">
              <span className="text-[10px] font-bold uppercase bg-[#D96B43]/15 text-[#D96B43] px-3 py-1 rounded-full">
                À venir • 2026
              </span>
              <h4 className="font-display font-bold text-lg text-foreground mt-3">
                Douala — Bonanjo / Akwa
              </h4>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                Comptoir express dédié aux déjeuners des collaborateurs et plateaux repas d'affaires.
              </p>
            </div>

            <div className="bg-secondary/40 border border-border/70 rounded-3xl p-6 relative overflow-hidden">
              <span className="text-[10px] font-bold uppercase bg-[#1E3A2B]/15 text-[#1E3A2B] px-3 py-1 rounded-full">
                À venir • 2026
              </span>
              <h4 className="font-display font-bold text-lg text-foreground mt-3">
                Douala — Bonapriso
              </h4>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                Bar à salades & salon de dégustation avec terrasse et livraison premium.
              </p>
            </div>

            <div className="bg-secondary/40 border border-border/70 rounded-3xl p-6 relative overflow-hidden sm:col-span-2 lg:col-span-1">
              <span className="text-[10px] font-bold uppercase bg-[#F2B705]/20 text-[#B38300] px-3 py-1 rounded-full">
                En projet
              </span>
              <h4 className="font-display font-bold text-lg text-foreground mt-3">
                Yaoundé — Bastos
              </h4>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                Expansion de l'offre traiteur d'événements et livraison d'entreprise dans la capitale.
              </p>
            </div>
          </div>
        </div>

        {/* BANDEAU CONTACT DEVIS */}
        <div className="bg-[#FAF7F2] border border-border rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-display font-bold text-[#1E3A2B]">
              Vous souhaitez ouvrir un YAMOOH dans votre quartier ?
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Découvrez nos opportunités de partenariat et rejoignez l'aventure YAMOOH.
            </p>
          </div>
          <Link
            to="/yamooh/franchise"
            className="inline-flex items-center gap-2 bg-[#1E3A2B] hover:bg-[#162B20] text-white px-6 py-3 rounded-full text-xs font-bold transition shrink-0"
          >
            <span>Devenir Partenaire</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </>
  );
};

export default YamoohEtablissements;
