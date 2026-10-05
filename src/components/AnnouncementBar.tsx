import { Link } from "react-router-dom";
import { Sparkles, ArrowRight, UserPlus } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export const AnnouncementBar = () => {
  const { user } = useAuth();

  const messageText =
    "Découvrez YAMOOH : restaurant, traiteur, salades, plats, plateaux repas, cocktails, buffets & boissons • Créez votre compte et profitez d’une commande plus rapide et d’une expérience personnalisée";

  const ctaLink = user ? "/account" : "/auth?tab=register";
  const ctaText = user ? "MON ESPACE CLIENT" : "CRÉER MON COMPTE";

  const renderTickerBlock = (keyPrefix: string) => (
    <div key={keyPrefix} className="flex items-center gap-6 shrink-0 pr-24 sm:pr-28">
      <div className="flex items-center gap-2.5 text-white/95">
        <Sparkles size={13} className="text-[#F2B705] shrink-0" />
        <span className="font-semibold text-[11px] sm:text-xs tracking-normal whitespace-nowrap">
          {messageText}
        </span>
      </div>

      <Link
        to={ctaLink}
        className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white text-[#D96B43] hover:bg-[#F2B705] hover:text-[#1E3A2B] font-black text-[10px] sm:text-[11px] tracking-wider uppercase transition-all shadow-xs shrink-0 cursor-pointer"
        title="Créer un compte client YAMOOH"
      >
        <UserPlus size={12} />
        <span>{ctaText}</span>
        <ArrowRight size={11} />
      </Link>
    </div>
  );

  return (
    <div 
      className="fixed top-0 left-0 right-0 z-50 bg-[#D96B43] text-white h-8 flex items-center overflow-hidden shadow-xs select-none border-b border-black/10"
      role="region"
      aria-label="Annonces et offres YAMOOH"
    >
      {/* Badge d'ancrage visuel sur desktop */}
      <div className="hidden lg:flex items-center gap-2 pl-4 pr-3 py-1 bg-[#B8552E] text-white z-10 shrink-0 font-bold text-[10.5px] uppercase tracking-wider shadow-xs">
        <span className="w-2 h-2 rounded-full bg-[#F2B705] animate-pulse" />
        <span>YAMOOH Douala</span>
      </div>

      {/* Zone de défilement horizontal continu ultra-lent (~20px/s, boucle 65s) */}
      <div className="flex-1 overflow-hidden relative flex items-center h-full">
        <div className="animate-marquee-slow flex items-center h-full">
          {renderTickerBlock("block-1")}
          {renderTickerBlock("block-2")}
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;
