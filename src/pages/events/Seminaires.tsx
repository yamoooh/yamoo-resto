import { Link } from "react-router-dom";
import { Briefcase, CheckCircle2, ArrowRight } from "lucide-react";
import Breadcrumb from "../../components/Breadcrumb";

export const Seminaires = () => {
  return (
    <>
      <title>Traiteur Séminaires & Conférences à Douala | YAMOOH</title>
      <meta
        name="description"
        content="Solutions repas saines et ponctuelles pour vos séminaires d'entreprise, formations et conférences à Douala."
      />
      <link rel="canonical" href="https://yamooh.com/services-evenementiels/seminaires" />

      {/* HERO */}
      <section className="bg-[#1E3A2B] text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="container-tight relative z-10 text-center max-w-3xl mx-auto">
          <div className="mb-4 flex justify-center">
            <Breadcrumb
              items={[
                { label: "Services Événementiels", to: "/services-evenementiels" },
                { label: "Séminaires" },
              ]}
            />
          </div>

          <h1 className="text-4xl sm:text-5xl font-display font-black tracking-tight mb-4">
            Des solutions repas pour vos séminaires et conférences.
          </h1>

          <p className="text-white/85 text-base sm:text-lg leading-relaxed font-light mb-8">
            Pour vos rencontres professionnelles, YAMOOH peut étudier avec vous une solution adaptée au format de votre journée et au nombre de participants.
          </p>

          <Link
            to="/devis"
            className="inline-flex items-center gap-2 bg-[#D96B43] hover:bg-[#c45b34] text-white px-8 py-3.5 rounded-full font-bold text-sm transition shadow-elevated"
          >
            <span>PRÉPARER MON ÉVÉNEMENT</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* CONTENU */}
      <section className="container-tight py-16 lg:py-20 space-y-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <span className="text-xs font-bold font-mono uppercase tracking-widest text-[#D96B43]">
              Efficacité & Énergie
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-[#1E3A2B]">
              Organisation Sans Faille pour vos Équipes
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Nous livrons vos plateaux repas individuels ou mettons en place un buffet froid rapide directement sur votre lieu de conférence à Douala (hôtels, centres d'affaires, salles de formation).
            </p>
            <div className="pt-2">
              <Link
                to="/devis"
                className="inline-flex items-center gap-2 bg-[#1E3A2B] hover:bg-[#162B20] text-white px-6 py-3 rounded-full text-xs font-bold transition"
              >
                <span>Demander un devis séminaire</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden shadow-elevated border border-border group h-72 sm:h-80">
            <img
              src="https://lh3.googleusercontent.com/aida/AEtjO1UssdhVn3KAEOCw_i394LhDHfFVW0ePn4FpW1wyCHVmnTgKMepOPsAyVaBHpXxG9JaQFSjxy9wUt8sk21zAcyADZ5lqPVfjyWdB7c3dHGohHEiDwieQnviZqrzabneiKtPx0zBMPolFrbj2dNfblZJcJqHNNUXlIrrs-Yg12k4WFxnBRhE1Cql1VnUXWWE-8CDblBjdqu-C40nDs0DLox5FDMuFp78tUXu-MpUm7WXsDtspIDwBt0aFwqo"
              alt="Buffet Séminaire Entreprise YAMOOH Douala"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1E3A2B]/80 via-transparent to-transparent flex items-end p-5">
              <span className="text-white text-xs font-bold font-mono uppercase tracking-wider bg-white/20 backdrop-blur-md px-3 py-1 rounded-full">
                Buffets B2B & Séminaires
              </span>
            </div>
          </div>
        </div>

        {/* 3 AVANTAGES B2B */}
        <div className="grid sm:grid-cols-3 gap-6">
          <div className="bg-[#FAF7F2] p-6 rounded-3xl border border-border space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-green-100 text-green-700 flex items-center justify-center font-bold">
              ⏱️
            </div>
            <h3 className="font-display font-bold text-lg text-[#1E3A2B]">Ponctualité Rigoureuse</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Respect strict des horaires de pause café et déjeuner pour ne pas perturber votre agenda.
            </p>
          </div>

          <div className="bg-[#FAF7F2] p-6 rounded-3xl border border-border space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-100 text-orange-700 flex items-center justify-center font-bold">
              📦
            </div>
            <h3 className="font-display font-bold text-lg text-[#1E3A2B]">Coffrets Clés en Main</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Coffrets repas individuels hermétiques, couverts écologiques et assaisonnement séparé.
            </p>
          </div>

          <div className="bg-[#FAF7F2] p-6 rounded-3xl border border-border space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              ⚡
            </div>
            <h3 className="font-display font-bold text-lg text-[#1E3A2B]">Digeste & Revitalisant</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Recettes saines, riches en fibres et vitamines évitant le coup de fatigue de l'après-midi.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Seminaires;
