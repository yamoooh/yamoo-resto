import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, Truck, CreditCard, MessageCircle, ArrowRight } from "lucide-react";
import Breadcrumb from "../../components/Breadcrumb";

export const InformationsPratiques = () => {
  return (
    <>
      <title>Informations Pratiques | YAMOOH Douala</title>
      <meta
        name="description"
        content="Retrouvez toutes les informations pratiques de YAMOOH à Douala : adresse, horaires, livraison, commande WhatsApp et modes de règlement."
      />
      <link rel="canonical" href="https://yamooh.com/contact/informations-pratiques" />

      {/* HERO */}
      <section className="bg-[#1E3A2B] text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="container-tight relative z-10 text-center max-w-3xl mx-auto">
          <div className="mb-4 flex justify-center">
            <Breadcrumb
              items={[
                { label: "Contact", to: "/contact" },
                { label: "Informations pratiques" },
              ]}
            />
          </div>

          <h1 className="text-4xl sm:text-5xl font-display font-black tracking-tight mb-4">
            Informations pratiques
          </h1>

          <p className="text-white/85 text-base sm:text-lg leading-relaxed font-light">
            Tout ce que vous devez savoir pour nous contacter, venir retirer votre repas ou vous faire livrer à Douala.
          </p>
        </div>
      </section>

      {/* BLOCS D'INFOS */}
      <section className="container-tight py-16 lg:py-20 max-w-3xl mx-auto space-y-6">
        <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-card flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#E3ECE6] text-[#1E3A2B] flex items-center justify-center shrink-0">
            <MapPin size={24} />
          </div>
          <div>
            <h2 className="text-xl font-display font-bold text-foreground mb-1">OÙ NOUS TROUVER</h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Pharmacie Kotto, Douala, Cameroun. Point de retrait Click & Collect disponible.
            </p>
            <Link to="/contact/plan-dacces" className="text-xs font-bold text-[#D96B43] hover:underline inline-flex items-center gap-1 mt-2">
              Voir le plan d'accès <ArrowRight size={12} />
            </Link>
          </div>
        </div>

        <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-card flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#E3ECE6] text-[#1E3A2B] flex items-center justify-center shrink-0">
            <Phone size={24} />
          </div>
          <div>
            <h2 className="text-xl font-display font-bold text-foreground mb-1">NOUS CONTACTER</h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Téléphone : +237 658 254 509<br />
              Email : tchokonte@gmail.com<br />
              Horaires d'ouverture : Lundi au Samedi de 10h00 à 21h00.
            </p>
          </div>
        </div>

        <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-card flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#FAF0D8] text-[#D96B43] flex items-center justify-center shrink-0">
            <MessageCircle size={24} />
          </div>
          <div>
            <h2 className="text-xl font-display font-bold text-foreground mb-1">COMMANDER</h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Commandez simplement via WhatsApp. Ajoutez vos articles sur le site et transmettez votre panier en un clic.
            </p>
          </div>
        </div>

        <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-card flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#E3ECE6] text-[#1E3A2B] flex items-center justify-center shrink-0">
            <Truck size={24} />
          </div>
          <div>
            <h2 className="text-xl font-display font-bold text-foreground mb-1">LIVRAISON</h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Nous livrons en moyenne sous 30 à 60 minutes à Douala selon le quartier. Toutes nos salades sont préparées à la commande.
            </p>
          </div>
        </div>

        <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-card flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#FAF0D8] text-[#D96B43] flex items-center justify-center shrink-0">
            <CreditCard size={24} />
          </div>
          <div>
            <h2 className="text-xl font-display font-bold text-foreground mb-1">RÈGLEMENT</h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Espèces à la livraison ou Mobile Money : Orange Money et MTN Mobile Money.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default InformationsPratiques;
