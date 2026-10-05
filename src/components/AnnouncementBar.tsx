import { Link } from "react-router-dom";
import { Sparkles, ArrowRight, UserPlus } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useData } from "../contexts/DataContext";

export const AnnouncementBar = () => {
  const { user } = useAuth();
  const { siteContent } = useData();

  const announcement = siteContent.announcementBar;
  if (!announcement || !announcement.isActive) {
    return null;
  }

  const messageText = announcement.message;
  const ctaLink = user ? "/account" : (announcement.ctaLink || "/auth?tab=register");
  const ctaText = user ? "MON ESPACE CLIENT" : (announcement.ctaText || "CRÉER MON COMPTE");

  const renderTickerItem = (keyPrefix: string) => (
    <div key={keyPrefix} className="flex items-center gap-6 shrink-0 pr-10">
      <div className="flex items-center gap-2 text-white/95">
        <Sparkles size={13} className="text-[#F2B705] shrink-0" />
        <span className="font-semibold text-[11px] sm:text-xs tracking-normal whitespace-nowrap">
          {messageText}
        </span>
      </div>

      <Link
        to={ctaLink}
        className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white text-[#3B8A49] hover:bg-[#F2B705] hover:text-[#1E3A2B] font-black text-[10px] sm:text-[11px] tracking-wider uppercase transition-all shadow-xs shrink-0 cursor-pointer"
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
      className="fixed top-0 left-0 right-0 z-50 bg-[#3B8A49] text-white h-8 flex items-center overflow-hidden shadow-xs select-none border-b border-white/10"
      role="region"
      aria-label="Annonces et offres YAMOOH"
    >
      {/* Badge d'ancrage visuel sur desktop */}
      <div className="hidden lg:flex items-center gap-2 pl-4 pr-3 py-1 bg-[#2F6F3B] text-white z-10 shrink-0 font-bold text-[10.5px] uppercase tracking-wider shadow-xs">
        <span className="w-2 h-2 rounded-full bg-[#F2B705] animate-pulse" />
        <span>YAMOOH Douala</span>
      </div>

      {/* Zone de défilement horizontal continu et fluide */}
      <div className="flex-1 overflow-hidden relative flex items-center h-full">
        <div className="animate-marquee flex items-center h-full">
          {renderTickerItem("ticker-1")}
          {renderTickerItem("ticker-2")}
          {renderTickerItem("ticker-3")}
          {renderTickerItem("ticker-4")}
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;
