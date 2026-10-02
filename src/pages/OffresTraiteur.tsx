import { Link } from "react-router-dom";
import { 
  Briefcase, 
  PartyPopper, 
  Users, 
  Utensils, 
  CheckCircle2, 
  ArrowRight, 
  Award,
  Sparkles,
  PhoneCall
} from "lucide-react";
import Breadcrumb from "../components/Breadcrumb";

export const OffresTraiteur = () => {
  return (
    <>
      {/* SEO */}
      <title>Traiteur à Douala | YAMOOH — Réunions, événements et réceptions</title>
      <meta
        name="description"
        content="YAMOOH propose des solutions traiteur à Douala pour entreprises, particuliers et événements : plateaux repas, buffets, cocktails et formats personnalisés."
      />
      <link rel="canonical" href="https://yamooh.com/offres-traiteur" />

      {/* HERO */}
      <section className="bg-[#1E3A2B] text-white py-16 lg:py-24 relative overflow-hidden">
        <div className="container-tight relative z-10 text-center max-w-3xl mx-auto">
          <div className="mb-4 flex justify-center">
            <Breadcrumb items={[{ label: "Offres Traiteur" }]} />
          </div>

          <span className="inline-block bg-white/10 text-[#F2B705] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-white/15 font-mono">
            Restauration Événementielle & B2B
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight mb-6">
            Des solutions traiteur pour vos moments à partager.
          </h1>

          <p className="text-white/85 text-base sm:text-lg leading-relaxed font-light mb-8">
            Réunion professionnelle, séminaire, réception privée ou événement particulier : YAMOOH vous accompagne avec des solutions de restauration à adapter selon votre format, votre nombre de convives et vos besoins.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/devis"
              className="inline-flex items-center gap-2 bg-[#D96B43] hover:bg-[#c45b34] text-white px-8 py-3.5 rounded-full font-bold text-sm transition shadow-elevated"
            >
              <span>DEMANDER UN DEVIS</span>
              <ArrowRight size={16} />
            </Link>
            <a
              href="https://wa.me/237658254509"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/30 px-8 py-3.5 rounded-full font-bold text-sm transition"
            >
              <PhoneCall size={16} />
              <span>Échanger sur WhatsApp</span>
            </a>
          </div>
        </div>

        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#F2B705_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      </section>

      {/* 3 PILIERS D'OFFRES */}
      <section className="container-tight py-16 lg:py-20">
        <div className="grid md:grid-cols-3 gap-8">
          {/* ENTREPRISES */}
          <div className="bg-card border border-border rounded-3xl p-8 shadow-card flex flex-col justify-between hover:shadow-elevated transition">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#E3ECE6] text-[#1E3A2B] flex items-center justify-center mb-6">
                <Briefcase size={24} />
              </div>
              <h2 className="text-2xl font-display font-bold text-foreground mb-3">
                Pour les entreprises
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6">
                Réunions, séminaires, pauses repas ou événements professionnels : présentez-nous votre besoin et échangeons sur une solution adaptée à votre organisation.
              </p>
            </div>
            <Link
              to="/offres-traiteur/entreprises"
              className="w-full bg-[#1E3A2B] hover:bg-[#162B20] text-white text-center py-3 rounded-full text-xs font-bold transition flex items-center justify-center gap-2"
            >
              <span>VOIR L'OFFRE ENTREPRISES</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* PARTICULIERS */}
          <div className="bg-card border border-border rounded-3xl p-8 shadow-card flex flex-col justify-between hover:shadow-elevated transition">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#FAF0D8] text-[#D96B43] flex items-center justify-center mb-6">
                <Users size={24} />
              </div>
              <h2 className="text-2xl font-display font-bold text-foreground mb-3">
                Pour les particuliers
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6">
                Anniversaire, réception privée ou moment convivial : décrivez votre occasion et le nombre de convives afin d'échanger avec YAMOOH sur un format adapté.
              </p>
            </div>
            <Link
              to="/offres-traiteur/particuliers"
              className="w-full bg-[#1E3A2B] hover:bg-[#162B20] text-white text-center py-3 rounded-full text-xs font-bold transition flex items-center justify-center gap-2"
            >
              <span>VOIR L'OFFRE PARTICULIERS</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* ÉVÉNEMENTS */}
          <div className="bg-card border border-border rounded-3xl p-8 shadow-card flex flex-col justify-between hover:shadow-elevated transition">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#E3ECE6] text-[#1E3A2B] flex items-center justify-center mb-6">
                <PartyPopper size={24} />
              </div>
              <h2 className="text-2xl font-display font-bold text-foreground mb-3">
                Pour vos événements
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6">
                Chaque événement possède son propre format. Mariage, anniversaire, séminaire, conférence, soirée privée ou événement professionnel : présentez votre projet et construisons la demande autour de vos besoins.
              </p>
            </div>
            <Link
              to="/offres-traiteur/evenements"
              className="w-full bg-[#D96B43] hover:bg-[#c45b34] text-white text-center py-3 rounded-full text-xs font-bold transition flex items-center justify-center gap-2 shadow-soft"
            >
              <span>PRÉPARER MON ÉVÉNEMENT</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* VITRINE VISUELLE TRAITEUR HAUTE GASTRONOMIE DE STITCH */}
      <section className="container-tight py-12">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 rounded-3xl overflow-hidden shadow-elevated border border-border group relative aspect-16/10">
            <img
              src="https://lh3.googleusercontent.com/aida/AEtjO1UssdhVn3KAEOCw_i394LhDHfFVW0ePn4FpW1wyCHVmnTgKMepOPsAyVaBHpXxG9JaQFSjxy9wUt8sk21zAcyADZ5lqPVfjyWdB7c3dHGohHEiDwieQnviZqrzabneiKtPx0zBMPolFrbj2dNfblZJcJqHNNUXlIrrs-Yg12k4WFxnBRhE1Cql1VnUXWWE-8CDblBjdqu-C40nDs0DLox5FDMuFp78tUXu-MpUm7WXsDtspIDwBt0aFwqo"
              alt="Buffet traiteur événementiel haut de gamme YAMOOH à Douala"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1E3A2B]/90 via-transparent to-transparent flex items-end p-6 sm:p-8">
              <div className="text-white">
                <span className="bg-[#D96B43] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2 inline-block">
                  Événements de Prestige
                </span>
                <h3 className="text-xl sm:text-2xl font-display font-bold">
                  Buffets Fraîcheur & Stations Gourmandes à Douala
                </h3>
                <p className="text-xs sm:text-sm text-white/80 mt-1 max-w-lg">
                  Verrines fraîches, salades composées signatures et finger food artisanal servis avec élégance et ponctualité.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#FAF7F2] border border-border rounded-3xl p-6 sm:p-8 flex items-start gap-4">
              <img
                src="https://lh3.googleusercontent.com/aida/AEtjO1Uy-X5vZF5u4etxeriCwYj5HSmf9yY_ZIS0Yxm0uAGcIQFgVKnGhN1e3aKzKtVESrSAGD4i4u_DA-3fWeNWeo3aILWZpxKJQm6rb5p8p5nrsUavhy70_YYcTdU0EnhvI5UQO5bGzhtt6-MIRYcVQXoLGyKNG0A9mRFYasDRao1GAa17_9TWVEj6HqkyoMBfWdT7Uk70WvP82Vh8K39CBKBfDbe8wVcdf9fB_gFAzUx2PcSDJLcGqZRKHfk"
                alt="Chef cuisinier YAMOOH"
                className="w-20 h-20 rounded-2xl object-cover shadow-sm shrink-0 border-2 border-white"
              />
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#D96B43] block font-mono">
                  Savoir-Faire Culinaire
                </span>
                <h4 className="text-lg font-display font-bold text-[#1E3A2B] mt-0.5">
                  L'Excellence du Fait Maison
                </h4>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  Chaque prestation traiteur est supervisée par notre brigade pour garantir le respect des températures, la fraîcheur des découpes et un dressage impeccable.
                </p>
              </div>
            </div>

            <div className="bg-white border border-border rounded-3xl p-6 sm:p-8 shadow-card flex items-start gap-4">
              <img
                src="https://lh3.googleusercontent.com/aida/AEtjO1U4OvHMdgprjnc0_3sRn250AmWmytzgXvvEQvTcjWxn7iXQCY5n-4EAzH-x1skmBwo_KLsp6Kgl35yxgnEAs6MXf1BtvLWcHYTiBRaqWBZHuSqazIbh1ydJ2-TI9CURy_ffCrnmHfIuajdTluSdJqROQeaykNm3ozWVLjzM2H9fCsuflM98vMgyZgCAp9PQTjQqUKIvEpInw8A0xONcax7zpr6W0hVBPYAnT1WuJWPoNjkRmuPqIyfg4vE"
                alt="Jus pressés à froid et boissons fraîches traiteur"
                className="w-20 h-20 rounded-2xl object-cover shadow-sm shrink-0 border-2 border-white"
              />
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#1E3A2B] block font-mono">
                  Boissons & Douceurs
                </span>
                <h4 className="text-lg font-display font-bold text-foreground mt-0.5">
                  Jus Naturels Pressés Minute
                </h4>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  Bissap mentholé, jus de gingembre tonique et citronnades artisanales conditionnés en carafes ou flacons individuels.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NOS FORMATS TRAITEUR */}
      <section className="bg-[#FAF7F2] py-16 border-y border-border">
        <div className="container-tight">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold font-mono uppercase tracking-widest text-[#D96B43]">
              Modularité & Qualité
            </span>
            <h2 className="text-3xl font-display font-bold text-[#1E3A2B] mt-1">
              Nos Formats Traiteur
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <div className="bg-white p-6 rounded-3xl border border-border shadow-2xs hover:shadow-card transition">
              <h3 className="font-display font-bold text-lg text-[#1E3A2B] mb-2">PLATEAUX REPAS</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Des coffrets complets individuels prêts à déguster en réunion ou comités de direction.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-border shadow-2xs hover:shadow-card transition">
              <h3 className="font-display font-bold text-lg text-[#1E3A2B] mb-2">COCKTAILS & VERRINES</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Pièces salées et sucrées élégantes pour réceptions debout et lancements.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-border shadow-2xs hover:shadow-card transition">
              <h3 className="font-display font-bold text-lg text-[#1E3A2B] mb-2">BUFFETS SALAD BAR</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Bars à salades animés sur-mesure avec chef et serveurs dédiés.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-border shadow-2xs hover:shadow-card transition">
              <h3 className="font-display font-bold text-lg text-[#1E3A2B] mb-2">PAUSES SÉMINAIRES</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Petits-déjeuners d'accueil, viennoiseries, fruits découpés et jus pressés du matin.
              </p>
            </div>
          </div>

          <div className="text-center">
            <Link
              to="/devis"
              className="inline-flex items-center gap-2 bg-[#D96B43] hover:bg-[#c45b34] text-white px-8 py-3.5 rounded-full font-bold text-xs transition shadow-elevated"
            >
              DEMANDER UN DEVIS GRATUIT
            </Link>
          </div>
        </div>
      </section>

      {/* COMMENT ÇA MARCHE */}
      <section className="container-tight py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold font-mono uppercase tracking-widest text-[#D96B43]">
            Processus Simple
          </span>
          <h2 className="text-3xl font-display font-bold text-foreground mt-1">
            Votre demande, simplement.
          </h2>
        </div>

        <div className="grid sm:grid-cols-5 gap-4">
          {[
            { step: "01", text: "Vous nous présentez votre événement." },
            { step: "02", text: "Vous nous indiquez la date, le lieu et le nombre de personnes." },
            { step: "03", text: "Nous échangeons sur votre besoin." },
            { step: "04", text: "Nous précisons les détails de votre demande." },
            { step: "05", text: "Nous avançons vers la confirmation de votre prestation." },
          ].map((s) => (
            <div key={s.step} className="bg-card border border-border rounded-3xl p-6 text-center shadow-card">
              <span className="text-2xl font-black font-display text-[#D96B43] mb-2 block">{s.step}</span>
              <p className="text-xs text-muted-foreground leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default OffresTraiteur;
