import { MessageCircle, ArrowRight } from "lucide-react";

export const WhatsAppFloat = () => {
  const WHATSAPP = "237658254509";
  return (
    <aside aria-label="Assistance WhatsApp">
      <a
        href={`https://wa.me/${WHATSAPP}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Commander directement par WhatsApp (+237 658 254 509)"
        className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2.5 bg-[#1E3A2B] hover:bg-[#15271d] text-white border border-[#25D366]/50 px-4 py-2.5 rounded-full font-bold shadow-2xl transition-all duration-300 hover:scale-105 group text-xs sm:text-sm backdrop-blur-md"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-[#25D366] animate-pulse" />
        <MessageCircle size={17} className="text-[#25D366] shrink-0" />
        <span>Commander sur WhatsApp</span>
        <ArrowRight size={14} className="text-[#F2B705] group-hover:translate-x-1 transition-transform" />
      </a>
    </aside>
  );
};

export default WhatsAppFloat;
