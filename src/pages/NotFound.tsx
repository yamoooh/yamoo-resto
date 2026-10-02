import { Link } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";

export const NotFound = () => {
  return (
    <section className="container-tight py-24 text-center">
      <div className="max-w-md mx-auto bg-card border border-border rounded-3xl p-10 shadow-card">
        <h1 className="text-6xl font-display font-bold text-primary mb-2">404</h1>
        <h2 className="text-xl font-display font-bold mb-4">Page introuvable</h2>
        <p className="text-muted-foreground text-sm mb-8">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-[#1E3A2B] text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-[#14271d] transition"
        >
          <Home size={16} /> Retour à l'accueil
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
