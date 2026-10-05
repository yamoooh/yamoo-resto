import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight, FileText, Utensils } from "lucide-react";

interface SlideData {
  id: number;
  number: string;
  image: string;
  position: "left" | "right";
  imageStyle: {
    objectPosition?: string;
    animationClass: string;
  };
  title: string;
  description: string;
  ctaPrimary: {
    label: string;
    to: string;
  };
  ctaSecondary?: {
    label: string;
    to: string;
  };
}

const SLIDES: SlideData[] = [
  {
    id: 0,
    number: "01",
    image: "/assets/hero-slide-1.jpg",
    position: "left",
    imageStyle: {
      objectPosition: "center 25%",
      animationClass: "animate-hero-zoom-in",
    },
    title: "Et si chaque repas était préparé avec autant de soin que pour vous ?",
    description:
      "Chez YAMOOH, notre cuisine repose sur des produits frais, des recettes généreuses et une équipe qui met le goût au cœur de chaque préparation.",
    ctaPrimary: {
      label: "DÉCOUVRIR YAMOOH",
      to: "/yamooh/a-propos",
    },
  },
  {
    id: 1,
    number: "02",
    image: "/assets/hero-slide-2.jpg",
    position: "right",
    imageStyle: {
      objectPosition: "center 30%",
      animationClass: "animate-hero-pan-h",
    },
    title: "Bien manger au bureau, sans perdre votre temps.",
    description:
      "Salades, plats, sandwichs, plateaux repas et boissons : YAMOOH vous accompagne au quotidien avec des repas frais et gourmands.",
    ctaPrimary: {
      label: "VOIR NOS OFFRES",
      to: "/notre-carte",
    },
    ctaSecondary: {
      label: "COMMANDER EN LIGNE",
      to: "/builder",
    },
  },
  {
    id: 2,
    number: "03",
    image: "/assets/hero-slide-3.jpg",
    position: "left",
    imageStyle: {
      objectPosition: "center 35%",
      animationClass: "animate-hero-zoom-out",
    },
    title: "Votre événement mérite une cuisine à sa hauteur.",
    description:
      "Petits-déjeuners, cocktails, buffets, plateaux repas et prestations traiteur : YAMOOH s'occupe de vos moments professionnels et privés.",
    ctaPrimary: {
      label: "DEMANDER UN DEVIS",
      to: "/devis",
    },
    ctaSecondary: {
      label: "DÉCOUVRIR LE TRAITEUR",
      to: "/offres-traiteur",
    },
  },
];

const SLIDE_DURATION = 7000; // 7 secondes par slide

export const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  const elapsedBeforePauseRef = useRef<number>(0);
  const animationFrameRef = useRef<number | null>(null);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
    setProgress(0);
    elapsedBeforePauseRef.current = 0;
    startTimeRef.current = Date.now();
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    setProgress(0);
    elapsedBeforePauseRef.current = 0;
    startTimeRef.current = Date.now();
  }, []);

  // Gestion du cycle automatique de 7 secondes
  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      return;
    }

    const remainingTime = SLIDE_DURATION - elapsedBeforePauseRef.current;
    startTimeRef.current = Date.now() - elapsedBeforePauseRef.current;

    timerRef.current = setTimeout(() => {
      nextSlide();
    }, remainingTime);

    const updateProgress = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const currentPct = Math.min(100, (elapsed / SLIDE_DURATION) * 100);
      setProgress(currentPct);

      if (elapsed < SLIDE_DURATION) {
        animationFrameRef.current = requestAnimationFrame(updateProgress);
      }
    };

    animationFrameRef.current = requestAnimationFrame(updateProgress);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [currentSlide, isPaused, nextSlide]);

  const handleMouseEnter = () => {
    setIsPaused(true);
    elapsedBeforePauseRef.current = Date.now() - startTimeRef.current;
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  return (
    <section
      className="relative w-full overflow-hidden bg-[#FAF8F5] dark:bg-[#121E17] select-none"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-roledescription="carousel"
      aria-label="Campagne gastronomique YAMOOH"
    >
      {/* Conteneur principal plein écran proportionnel */}
      <div className="relative w-full h-[580px] sm:h-[640px] md:h-[700px] lg:h-[740px] xl:h-[780px] max-h-[860px]">
        {SLIDES.map((slide, index) => {
          const isActive = index === currentSlide;

          return (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-800 ease-in-out ${
                isActive
                  ? "opacity-100 z-10 pointer-events-auto"
                  : "opacity-0 z-0 pointer-events-none"
              }`}
              aria-hidden={!isActive}
            >
              {/* Image d'arrière-plan avec animation cinématographique propre */}
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className={`w-full h-full object-cover will-change-transform ${
                    isActive ? slide.imageStyle.animationClass : "scale-100"
                  }`}
                  style={{
                    objectPosition: slide.imageStyle.objectPosition || "center center",
                  }}
                  loading={index === 0 ? "eager" : "lazy"}
                />
              </div>

              {/* Contenu Texte positionné avec élégance sur surface unie translucide */}
              <div className="container-tight relative z-20 h-full flex items-center px-4 sm:px-6 lg:px-8 py-12">
                <div
                  className={`w-full flex ${
                    slide.position === "right" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div className="w-full max-w-[540px] sm:max-w-[560px] lg:max-w-[580px] bg-[#FAF8F5]/92 dark:bg-[#15241C]/92 backdrop-blur-md rounded-3xl p-6 sm:p-8 lg:p-9 shadow-2xl border border-white/80 dark:border-white/10 space-y-5 animate-in fade-in zoom-in-98 duration-500">
                    {/* Titre Principal (Grand & Électrisant, Sans Badge) */}
                    <h1
                      className={`font-display font-black text-2xl sm:text-3xl md:text-4xl lg:text-[40px] leading-[1.08] tracking-tight text-[#1E3A2B] dark:text-white transition-all duration-600 ${
                        slide.position === "right"
                          ? "translate-x-0"
                          : "translate-x-0"
                      }`}
                    >
                      {slide.title}
                    </h1>

                    {/* Description Éditoriale */}
                    <p className="text-xs sm:text-sm md:text-[15px] text-[#2F4F3E] dark:text-white/80 font-medium leading-relaxed">
                      {slide.description}
                    </p>

                    {/* Boutons d'Action CTA */}
                    <div className="flex flex-wrap items-center gap-3 pt-1">
                      {/* CTA Principal */}
                      <Link
                        to={slide.ctaPrimary.to}
                        className="inline-flex items-center justify-center gap-2 bg-[#3B8A49] hover:bg-[#2F6F3B] text-white px-6 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-soft hover:scale-102 cursor-pointer"
                      >
                        <span>{slide.ctaPrimary.label}</span>
                        <ArrowRight size={14} />
                      </Link>

                      {/* CTA Secondaire si présent */}
                      {slide.ctaSecondary && (
                        <Link
                          to={slide.ctaSecondary.to}
                          className="inline-flex items-center justify-center gap-2 bg-white/80 dark:bg-white/10 hover:bg-white text-[#1E3A2B] dark:text-white border border-[#3B8A49]/30 hover:border-[#3B8A49] px-5 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-xs hover:scale-102 cursor-pointer"
                        >
                          <span>{slide.ctaSecondary.label}</span>
                          <ChevronRight size={14} className="text-[#3B8A49]" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* ===================================================================== */}
        {/* INDICATEUR DE NAVIGATION MINIMALISTE 01 | 02 | 03 EN BAS DU HERO     */}
        {/* ===================================================================== */}
        <div className="absolute bottom-6 left-0 right-0 z-30 pointer-events-none">
          <div className="container-tight flex items-center justify-between">
            <div className="inline-flex items-center gap-4 sm:gap-6 bg-[#FAF8F5]/90 dark:bg-[#121E17]/90 backdrop-blur-md px-4 py-2 rounded-full border border-white/60 dark:border-white/10 shadow-lg pointer-events-auto">
              {SLIDES.map((slide, index) => {
                const isCurrent = index === currentSlide;

                return (
                  <button
                    key={slide.id}
                    onClick={() => goToSlide(index)}
                    className={`group flex flex-col items-center gap-1 cursor-pointer transition-all ${
                      isCurrent
                        ? "text-[#3B8A49] font-black scale-105"
                        : "text-muted-foreground hover:text-foreground font-semibold"
                    }`}
                    aria-label={`Aller au slide ${slide.number}`}
                    title={`Slide ${slide.number} : ${slide.title}`}
                  >
                    <span className="font-mono text-xs sm:text-sm tracking-wider">
                      {slide.number}
                    </span>

                    {/* Fine ligne de progression pour le slide actif */}
                    <div className="w-8 sm:w-10 h-1 bg-black/10 dark:bg-white/15 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#3B8A49] transition-all"
                        style={{
                          width: isCurrent
                            ? `${progress}%`
                            : index < currentSlide
                            ? "100%"
                            : "0%",
                          transitionDuration: isCurrent ? "50ms" : "300ms",
                        }}
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Légende discrète à droite sur desktop */}
            <div className="hidden md:flex items-center gap-2 text-[11px] font-mono font-bold text-white/90 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#3B8A49] animate-pulse" />
              <span>Cuisine Fraîche • Traiteur Douala</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;
