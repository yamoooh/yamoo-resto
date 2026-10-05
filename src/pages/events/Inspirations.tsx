import { useState } from "react";
import { Link } from "react-router-dom";
import { X, ZoomIn, ArrowRight, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import Breadcrumb from "../../components/Breadcrumb";

type GalleryItem = {
  id: number;
  title: string;
  tag: string;
  caption: string;
  image: string;
};

export const Inspirations = () => {
  const [activeModal, setActiveModal] = useState<number | null>(null);

  const gallery: GalleryItem[] = [
    {
      id: 1,
      title: "Buffet Fraîcheur & Réceptions",
      tag: "Buffet",
      caption: "Formule buffet et réceptions : grands saladiers partagés, sauces maison et brochettes de légumes du matin.",
      image: "/assets/IMG-20260510-WA0007-CTHVxWPJ.jpg",
    },
    {
      id: 2,
      title: "Grand Buffet Traiteur Scénographié",
      tag: "Événement",
      caption: "Mise en place haut de gamme pour vos réceptions d'entreprise et événements privés à Douala.",
      image: "/assets/hero-slide-3.jpg",
    },
    {
      id: 3,
      title: "Plateaux Repas Séminaires",
      tag: "Entreprise",
      caption: "Formules pour réunions et événements : coffrets individuels prêts à servir avec jus frais pressés.",
      image: "/assets/formule-plateaux-repas.jpg",
    },
    {
      id: 4,
      title: "Artisanat & Précision du Chef",
      tag: "Savoir-Faire",
      caption: "Découpe méticuleuse, assaisonnement aux poivres rares et dressage soigné pour chaque création.",
      image: "/assets/hero-slide-1.jpg",
    },
    {
      id: 5,
      title: "Cocktail Finger Food & Verrines",
      tag: "Cocktail",
      caption: "Bouchées fraîches et créations : mini-wraps, brochettes maraîchères et verrines à l'hibiscus.",
      image: "/assets/formule-cocktail.jpg",
    },
    {
      id: 6,
      title: "Bar à Jus Pressés à Froid & Vitamines",
      tag: "Boissons",
      caption: "Extraction à froid de fruits et légumes frais locaux : agrumes, gingembre, bissap et ananas du terroir.",
      image: "/assets/fontaine-jus-frais-5l.jpg",
    },
    {
      id: 7,
      title: "Ingrédients & Terroir Local",
      tag: "Ingrédients",
      caption: "Ingrédients et produits sélectionnés : fruits et légumes frais achetés chaque matin sur les marchés de Douala.",
      image: "/assets/IMG-20260510-WA0020-CZT8TmdE.jpg",
    },
    {
      id: 8,
      title: "Grandes Salades Partagées XXL",
      tag: "Partage",
      caption: "Grands saladiers pour événements familiaux et déjeuners d'équipe décontractés.",
      image: "/assets/IMG-20260510-WA0024-Bd8-RO7R.jpg",
    },
  ];

  const currentItem = gallery.find((g) => g.id === activeModal);

  const handleNext = () => {
    if (activeModal === null) return;
    const nextId = activeModal >= gallery.length ? 1 : activeModal + 1;
    setActiveModal(nextId);
  };

  const handlePrev = () => {
    if (activeModal === null) return;
    const prevId = activeModal <= 1 ? gallery.length : activeModal - 1;
    setActiveModal(prevId);
  };

  return (
    <>
      <title>Inspirations Culinaires & Événements à Douala | YAMOOH</title>
      <meta
        name="description"
        content="Découvrez les inspirations, préparations, buffets et événements YAMOOH en images à Douala."
      />
      <link rel="canonical" href="https://yamooh.com/services-evenementiels/inspirations" />

      {/* HERO */}
      <section className="bg-[#1E3A2B] text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="container-tight relative z-10 text-center max-w-3xl mx-auto px-4">
          <div className="mb-4 flex justify-center">
            <Breadcrumb
              items={[
                { label: "Services Événementiels", to: "/services-evenementiels" },
                { label: "Inspirations" },
              ]}
            />
          </div>

          <span className="inline-block bg-white/10 text-[#F2B705] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-white/15 font-mono">
            GALERIE INSPIRATIONS
          </span>

          <h1 className="text-4xl sm:text-5xl font-display font-black tracking-tight mb-4">
            Des inspirations pour vos prochaines occasions.
          </h1>

          <p className="text-white/85 text-base sm:text-lg leading-relaxed font-light mb-8">
            Découvrez nos préparations, buffets et événements en images. Cliquez sur une photo pour l'agrandir.
          </p>
        </div>
      </section>

      {/* GRILLE INSPIRATIONS AVEC LIGHTBOX */}
      <section className="container-tight py-16 lg:py-20 px-4 mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {gallery.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveModal(item.id)}
              className="group relative cursor-pointer bg-card border border-border rounded-3xl overflow-hidden shadow-card hover:shadow-elevated transition-all"
            >
              {/* Visuel Réel */}
              <div className="relative h-64 overflow-hidden bg-gray-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-5 flex flex-col justify-between text-white">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md px-3 py-1 rounded-full self-start">
                    {item.tag}
                  </span>
                  <div>
                    <h3 className="text-lg font-display font-bold mb-1">{item.title}</h3>
                    <p className="text-xs text-white/80 line-clamp-2">{item.caption}</p>
                  </div>
                </div>
                <div className="absolute right-4 bottom-4 w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white">
                  <ZoomIn size={18} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* LIGHTBOX MODAL */}
        {activeModal !== null && currentItem && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-card border border-border rounded-3xl max-w-2xl w-full p-6 sm:p-8 relative shadow-elevated text-foreground overflow-hidden">
              <button
                onClick={() => setActiveModal(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition cursor-pointer"
                aria-label="Fermer"
              >
                <X size={20} />
              </button>

              <div className="h-72 sm:h-80 rounded-2xl overflow-hidden bg-gray-100 mb-6 relative">
                <img
                  src={currentItem.image}
                  alt={currentItem.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  {currentItem.tag}
                </div>
              </div>

              <h3 className="text-2xl font-display font-black mb-2 text-[#1E3A2B]">{currentItem.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                {currentItem.caption}
              </p>

              <div className="flex items-center justify-between border-t border-border pt-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    className="p-2 rounded-full border border-border hover:bg-secondary transition cursor-pointer"
                    aria-label="Précédent"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={handleNext}
                    className="p-2 rounded-full border border-border hover:bg-secondary transition cursor-pointer"
                    aria-label="Suivant"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>

                <Link
                  to="/devis"
                  onClick={() => setActiveModal(null)}
                  className="bg-[#D96B43] hover:bg-[#c45b34] text-white text-xs font-bold px-5 py-2.5 rounded-full transition inline-flex items-center gap-1.5"
                >
                  <span>Demander un devis similaire</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Inspirations;
