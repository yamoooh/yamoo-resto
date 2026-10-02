import React from "react";

interface LogoProps {
  variant?: "light" | "dark";
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ variant = "dark", className = "" }) => {
  const isLight = variant === "light";

  return (
    <div className={`flex items-center gap-2 select-none shrink-0 ${className}`}>
      {/* Vrai Logo Officiel YAMOOH du code source */}
      <img
        src="/assets/yammoh-logo-white-BRxbhv_6.png"
        alt="YAMOOH Logo"
        className={`h-8 sm:h-9 md:h-10 w-auto object-contain shrink-0 ${
          !isLight ? "filter drop-shadow-xs" : ""
        }`}
        onError={(e) => {
          const target = e.currentTarget;
          target.style.display = "none";
        }}
      />
      <div className="flex flex-col justify-center leading-tight">
        <span className={`font-display font-black text-lg sm:text-xl tracking-tight leading-none ${
          isLight ? "text-white" : "text-[#1E3A2B] dark:text-white"
        }`}>
          YAMOOH
        </span>
        <span className={`text-[8px] sm:text-[8.5px] uppercase tracking-wider font-bold mt-0.5 whitespace-nowrap ${
          isLight ? "text-[#F2B705]" : "text-[#D96B43]"
        }`}>
          Restaurant & Traiteur
        </span>
      </div>
    </div>
  );
};

export default Logo;
