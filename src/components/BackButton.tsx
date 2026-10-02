import { ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export const BackButton = ({ className = "" }: { className?: string }) => {
  const navigate = useNavigate();
  const location = useLocation();
  if (location.pathname === "/") return null;
  return (
    <button
      onClick={() => (window.history.length > 1 ? navigate(-1) : navigate("/"))}
      aria-label="Retour"
      className={`group inline-flex items-center gap-2 bg-card border border-border text-foreground px-4 py-2 rounded-full text-xs md:text-sm font-semibold shadow-card hover:bg-secondary hover:-translate-x-0.5 transition-all cursor-pointer ${className}`}
    >
      <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-0.5" />
      Retour
    </button>
  );
};

export default BackButton;
