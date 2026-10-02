import { Link } from "react-router-dom";
import { Sparkles, ArrowRight } from "lucide-react";

export const AnnouncementBar = () => (
  <div className="fixed top-0 left-0 right-0 z-50 bg-[#D96B43] text-white text-xs font-medium h-8 flex items-center justify-between px-4 sm:px-8 shadow-xs select-none">
    <div className="hidden md:flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-white/90">
      <span className="w-2 h-2 rounded-full bg-[#F2B705] animate-pulse" />
      <span>Douala & Environs</span>
    </div>

    <div className="flex-1 text-center font-bold text-[11px] sm:text-xs flex items-center justify-center gap-2">
      <Sparkles size={13} className="text-[#F2B705] shrink-0" />
      <span>Traiteur d'entreprise & Bar à salades fraîches • Livraison express dans tout Douala</span>
    </div>

    <div className="hidden sm:flex items-center gap-4 text-[11px]">
      <Link 
        to="/devis" 
        className="font-bold underline hover:text-[#F2B705] transition flex items-center gap-1"
      >
        <span>Demande de devis</span>
        <ArrowRight size={12} />
      </Link>
    </div>
  </div>
);

export default AnnouncementBar;
