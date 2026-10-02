import { useState } from "react";
import { Link } from "react-router-dom";
import { X, ZoomIn, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Breadcrumb from "../../components/Breadcrumb";

type RealisationItem = {
  id: number;
  title: string;
  category: string;
  desc: string;
  image: string;
};

export const YamoohRealisations = () => {
  const [activeId, setActiveId] = useState<number | null>(null);

  const items: RealisationItem[] = [
    {
      id: 1,
      title: "Formule buffet et réceptions",
      category: "Buffets",
      desc: "Grands saladiers partagés et présentation soignée pour cocktails déjeunatoires et séminaires à Douala.",
      image: "/assets/IMG-20260510-WA0007-CTHVxWPJ.jpg",
    },
    {
      id: 2,
      title: "Formules pour réunions et événements",
      category: "B2B",
      desc: "Plateaux repas individuels complets livrés en entreprise à Akwa et Bonanjo.",
      image: "/assets/IMG-20260510-WA0011-CAWz3amK.jpg",
    },
    {
      id: 3,
      title: "Assemblage soigné à la commande",
      category: "Cuisine",
      desc: "Découpe minute et dressage de précision pour garantir le croquant de chaque salade.",
      image: "/assets/IMG-20260510-WA0016-DOUrg6YQ.jpg",
    },
    {
      id: 4,
      title: "Bouchées fraîches et créations",
      category: "Cocktails",
      desc: "Mini-wraps, brochettes maraîchères et verrines gourmandes pour événements privés.",
      image: "/assets/IMG-20260510-WA0018-ChxYQYK6.jpg",
    },
    {
      id: 5,
      title: "Ingrédients et produits sélectionnés",
      category: "Approvisionnement",
      desc: "Légumes et fruits de saison sélectionnés chaque matin sur les marchés locaux.",
      image: "/assets/IMG-20260510-WA0020-CZT8TmdE.jpg",
    },
  ];

  const current = items.find((i) => i.id === activeId);

  const handleNext = () => {
    if (activeId === null) return;
    const next = activeId >= items.length ? 1 : activeId + 1;
    setActiveId(next);
  };

  const handlePrev = () => {
    if (activeId === null) return;
    const prev = activeId <= 1 ? items.length : activeId - 1;
    setActiveId(prev);
  };

  return (
    <>
      <title>Nos Réalisations | YAMOOH Douala</title>
      <meta
        name="description"
        content="Découvrez les réalisations de YAMOOH en images à Douala : buffets, cocktails, plateaux repas et découpes de légumes frais."
      />
      <link rel="canonical" href="https://yamooh.com/yamooh/realisations" />

      {/* HERO */}
      <section className="bg-[#1E3A2B] text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="container-tight relative z-10 text-center max-w-3xl mx-auto px-4">
          <div className="mb-4 flex justify-center">
            <Breadcrumb
              items={[
                { label: "YAMOOH", to: "/yamooh" },
                { label: "Réalisations" },
              ]}
            />
          </div>

          <span className="inline-block bg-white/10 text-[#F2B705] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-white/15 font-mono">
            PORTFOLIO YAMOOH
          </span>

          <h1 className="text-4xl sm:text-5xl font-display font-black tracking-tight mb-4">
            Nos réalisations en images.
          </h1>

          <p className="text-white/85 text-base sm:text-lg leading-relaxed font-light mb-8">
            Découvrez nos préparations, buffets et événements. Cliquez sur une photo pour l'agrandir.
          </p>
        </div>
      </section>

      {/* GRILLE RÉALISATIONS AVEC LIGHTBOX */}
      <section className="container-tight py-16 lg:py-20 px-4 mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveId(item.id)}
              className="group relative cursor-pointer bg-card border border-border rounded-3xl overflow-hidden shadow-card hover:shadow-elevated transition-all"
            >
              {/* Image Réelle */}
              <div className="relative h-64 overflow-hidden bg-gray-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-5 flex flex-col justify-between text-white">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md px-3 py-1 rounded-full self-start">
                    {item.category}
                  </span>
                  <div>
                    <h3 className="text-lg font-display font-bold mb-1">{item.title}</h3>
                    <p className="text-xs text-white/80 line-clamp-2">{item.desc}</p>
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
        {activeId !== null && current && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-card border border-border rounded-3xl max-w-2xl w-full p-6 sm:p-8 relative shadow-elevated text-foreground overflow-hidden">
              <button
                onClick={() => setActiveId(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition cursor-pointer"
                aria-label="Fermer"
              >
                <X size={20} />
              </button>

              <div className="h-72 sm:h-80 rounded-2xl overflow-hidden bg-gray-100 mb-6 relative">
                <img
                  src={current.image}
                  alt={current.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  {current.category}
                </div>
              </div>

              <h3 className="text-2xl font-display font-black mb-2 text-[#1E3A2B]">{current.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                {current.desc}
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
                  onClick={() => setActiveId(null)}
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

export default YamoohRealisations;
