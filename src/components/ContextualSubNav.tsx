import { SlidersHorizontal } from "lucide-react";
import { Universe } from "../data/universes";

interface ContextualSubNavProps {
  universe: Universe;
  activeSubSlug?: string;
  onSelectSub: (slug: string) => void;
  onOpenFilter: () => void;
  activeFilterCount: number;
}

export const ContextualSubNav = ({
  universe,
  activeSubSlug,
  onSelectSub,
  onOpenFilter,
  activeFilterCount,
}: ContextualSubNavProps) => {
  return (
    <div className="bg-[#15241C] text-white border-b border-white/10 sticky top-[96px] min-[1200px]:top-[144px] z-30 shadow-md">
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-2.5 flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
        {/* SOUS-RUBRIQUES EN STYLE TOUT&BON */}
        <div className="flex items-center gap-1 sm:gap-2 text-xs font-black uppercase tracking-wider overflow-x-auto no-scrollbar py-1">
          <button
            onClick={() => onSelectSub("all")}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              !activeSubSlug || activeSubSlug === "all"
                ? "text-[#F2B705] bg-white/10 shadow-xs"
                : "text-white/80 hover:text-white hover:bg-white/5"
            }`}
          >
            TOUS LES PRODUITS
          </button>

          {universe.subRubrics.map((sub) => {
            const isActive = activeSubSlug === sub.slug;
            return (
              <div key={sub.id} className="flex items-center gap-1 sm:gap-2">
                <span className="text-white/30 text-xs select-none">|</span>
                <button
                  onClick={() => onSelectSub(sub.slug)}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? "text-[#F2B705] bg-white/10 shadow-xs"
                      : "text-white/80 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {sub.name}
                </button>
              </div>
            );
          })}
        </div>

        {/* BOUTON FILTRER PAR */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenFilter}
            className="inline-flex items-center gap-2 bg-[#D96B43] hover:bg-[#c45b34] text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider transition cursor-pointer shadow-xs"
          >
            <SlidersHorizontal size={13} className="text-white" />
            <span>FILTRER PAR</span>
            {activeFilterCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-white text-[#D96B43] text-[10px] font-black flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContextualSubNav;
