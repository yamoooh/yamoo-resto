import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ArrowRight, MessageCircle } from "lucide-react";
import Breadcrumb from "../components/Breadcrumb";

export const FAQTraiteur = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const questions = [
    {
      q: "Quels types d'événements accompagnez-vous ?",
      a: "YAMOOH accompagne à la fois les événements professionnels (séminaires, réunions, comités, déjeuners d'équipe, lancements de produits) et les événements privés (mariages, anniversaires, réceptions familiales, soirées privées) à Douala.",
    },
    {
      q: "Proposez-vous des solutions pour les entreprises ?",
      a: "Oui, nous proposons des formules de plateaux repas individuels complets, des buffets de salades fraîches et plats chauds, ainsi que des pauses café / morning breaks avec jus naturels pressés du jour.",
    },
    {
      q: "Comment demander un devis ?",
      a: "Vous pouvez remplir directement notre formulaire en ligne sur la page Devis ou nous contacter par message WhatsApp au +237 658 254 509.",
    },
    {
      q: "Quelles informations dois-je fournir ?",
      a: "Il vous suffit d'indiquer la date souhaitée, le lieu ou quartier à Douala, le nombre estimé de convives et le type de format envisagé (plateaux repas, buffet, cocktail).",
    },
    {
      q: "Proposez-vous des plateaux repas ?",
      a: "Oui, nos plateaux repas individuels (formules Essentiels ou Signatures) sont conditionnés dans des coffrets soignés et prêts à déguster sans nécessiter de dressage complexe.",
    },
    {
      q: "Proposez-vous des buffets ?",
      a: "Oui, nous préparons des buffets froids (grands saladiers XXL, bars à sauces, carpaccios de fruits) ainsi que des buffets combinés chauds & froids pour les réceptions de plus grande envergure.",
    },
    {
      q: "Peut-on demander une solution adaptée à notre événement ?",
      a: "Absolument. Nous prenons en compte vos contraintes horaires, les préférences alimentaires (options végétariennes, sans gluten) et l'agencement de votre salle.",
    },
    {
      q: "Comment se passe l'échange après une demande ?",
      a: "Dès réception de votre demande, notre équipe prend contact avec vous pour préciser les détails logistiques et vous transmettre une proposition personnalisée.",
    },
  ];

  return (
    <>
      <title>FAQ Traiteur | Questions Fréquentes Restauration Événementielle Douala</title>
      <meta
        name="description"
        content="Consultez les réponses aux questions fréquentes sur le service traiteur YAMOOH à Douala : devis, plateaux repas, buffets et organisation."
      />
      <link rel="canonical" href="https://yamooh.com/faq-traiteur" />

      {/* HERO */}
      <section className="bg-[#1E3A2B] text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="container-tight relative z-10 text-center max-w-3xl mx-auto">
          <div className="mb-4 flex justify-center">
            <Breadcrumb items={[{ label: "FAQ Traiteur" }]} />
          </div>

          <span className="inline-block bg-white/10 text-[#F2B705] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-white/15 font-mono">
            Aide & Questions Traiteur
          </span>

          <h1 className="text-4xl sm:text-5xl font-display font-black tracking-tight mb-4">
            Foire aux questions Traiteur
          </h1>

          <p className="text-white/85 text-base sm:text-lg leading-relaxed font-light mb-8">
            Tout ce que vous devez savoir pour organiser sereinement la restauration de votre prochain événement à Douala.
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

      {/* FAQ ACCORDION */}
      <section className="container-tight py-16 lg:py-20 max-w-3xl mx-auto space-y-4">
        {questions.map((item, idx) => (
          <div
            key={idx}
            className="bg-card border border-border rounded-3xl overflow-hidden shadow-card transition-all"
          >
            <button
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full p-6 text-left flex items-center justify-between gap-4 font-display font-bold text-base sm:text-lg text-foreground cursor-pointer"
            >
              <span>{item.q}</span>
              <ChevronDown
                size={20}
                className={`text-[#D96B43] transition-transform duration-200 shrink-0 ${
                  openIndex === idx ? "rotate-180" : ""
                }`}
              />
            </button>
            {openIndex === idx && (
              <div className="px-6 pb-6 text-xs sm:text-sm text-muted-foreground leading-relaxed border-t border-border pt-4">
                {item.a}
              </div>
            )}
          </div>
        ))}

        <div className="pt-8 text-center">
          <p className="text-xs text-muted-foreground mb-4">
            Une question spécifique qui ne figure pas ici ?
          </p>
          <a
            href="https://wa.me/237658254509"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-full text-xs font-bold hover:bg-[#20bd5a] transition"
          >
            <MessageCircle size={16} /> Échanger directement sur WhatsApp
          </a>
        </div>
      </section>
    </>
  );
};

export default FAQTraiteur;
