import { Link } from "react-router-dom";
import { Sparkles, Leaf, ArrowRight, ChefHat, Download, FileText } from "lucide-react";
import Breadcrumb from "../components/Breadcrumb";

export const SeasonalMenu = () => {
  const handleDownloadPDF = () => {
    // Génère un fichier texte / imprimable structuré de la carte de saison
    const content = `YAMOOH DOUALA — CARTE DE SAISON\n` +
      `----------------------------------------\n` +
      `• La Tropicale Mangue & Crevettes — 5 000 FCFA\n` +
      `  (Crevettes marinées, mangue fraîche, avocat, coriandre, vinaigrette passion)\n\n` +
      `• Le Quinoa & Papaye Caramélisée — 4 500 FCFA\n` +
      `  (Quinoa, papaye snackée, fêta affinée, graines de courge, sauce miel-moutarde)\n\n` +
      `Ingrédients du moment : Avocat, Ananas Victoria, Mangue du Littoral, Légumes de saison.\n` +
      `Sauces du moment : Sauce fruit de la passion, Vinaigrettes maison.\n` +
      `----------------------------------------\n` +
      `Commandes : +237 658 254 509 | Pharmacie Kotto, Douala`;

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "YAMOOH-Carte-de-Saison.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <title>Carte de saison YAMMOH | Sélection du moment</title>
      <meta
        name="description"
        content="Découvrez la carte de saison YAMMOH : sélection du moment, ingrédients de saison et inspirations actuelles. Téléchargez la carte PDF."
      />
      <link rel="canonical" href="https://yamooh.com/carte-de-saison" />

      {/* HERO */}
      <section className="bg-[#1E3A2B] text-white py-16 lg:py-24 relative overflow-hidden">
        <div className="container-tight relative z-10 text-center max-w-3xl mx-auto">
          <div className="mb-4 flex justify-center">
            <Breadcrumb items={[{ label: "Carte de Saison" }]} />
          </div>

          <span className="inline-block bg-white/10 text-[#F2B705] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-white/15 font-mono">
            Sélection Éphémère
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight mb-4">
            La carte du moment
          </h1>

          <p className="text-white/85 text-base sm:text-lg leading-relaxed font-light mb-8">
            Découvrez les saveurs et inspirations du moment proposées par YAMOOH, avec une sélection évolutive autour des produits de saison.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={handleDownloadPDF}
              className="inline-flex items-center gap-2 bg-[#D96B43] hover:bg-[#c45b34] text-white px-8 py-3.5 rounded-full font-bold text-sm transition shadow-elevated cursor-pointer"
            >
              <Download size={16} />
              <span>TÉLÉCHARGER LA CARTE</span>
            </button>
            <Link
              to="/builder"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/30 px-8 py-3.5 rounded-full font-bold text-sm transition"
            >
              <ChefHat size={16} />
              <span>COMPOSER MA SALADE</span>
            </Link>
          </div>
        </div>

        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#F2B705_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      </section>

      {/* 3 BLOCS CARTE DE SAISON */}
      <section className="container-tight py-16 lg:py-20 space-y-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-card border border-border rounded-3xl p-8 shadow-card">
            <h2 className="text-xl font-display font-bold text-[#1E3A2B] mb-3">SÉLECTION DU MOMENT</h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Une sélection pensée autour des produits disponibles et des envies du moment.
            </p>
          </div>

          <div className="bg-card border border-border rounded-3xl p-8 shadow-card">
            <h2 className="text-xl font-display font-bold text-[#1E3A2B] mb-3">INGRÉDIENTS</h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Avocat, ananas, mangue et légumes de saison.
            </p>
          </div>

          <div className="bg-card border border-border rounded-3xl p-8 shadow-card">
            <h2 className="text-xl font-display font-bold text-[#1E3A2B] mb-3">SAUCES</h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Sauce fruit de la passion et nos vinaigrettes maison.
            </p>
          </div>
        </div>

        {/* RECETTES DE SAISON */}
        <div className="grid sm:grid-cols-2 gap-8">
          <div className="bg-[#FAF7F2] border border-border rounded-3xl p-8 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-[#E3ECE6] text-[#1E3A2B] px-3 py-1 rounded-full">
                Recette Éphémère
              </span>
              <h3 className="text-2xl font-display font-bold text-foreground mt-3 mb-2">
                La Tropicale Mangue & Crevettes
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6">
                Crevettes sautées, dés de mangue mûre, avocat crémeux, coriandre et vinaigrette acidulée fruit de la passion.
              </p>
            </div>
            <div className="pt-4 border-t border-border flex items-center justify-between">
              <span className="text-lg font-bold text-[#1E3A2B]">5 000 FCFA</span>
              <Link
                to="/cart"
                className="bg-[#1E3A2B] hover:bg-[#D96B43] text-white px-5 py-2.5 rounded-full text-xs font-bold transition"
              >
                Commander
              </Link>
            </div>
          </div>

          <div className="bg-[#FAF7F2] border border-border rounded-3xl p-8 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-[#FAF0D8] text-[#D96B43] px-3 py-1 rounded-full">
                Recette Éphémère
              </span>
              <h3 className="text-2xl font-display font-bold text-foreground mt-3 mb-2">
                Le Quinoa & Papaye Caramélisée
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6">
                Quinoa aux herbes fraîches, lamelles de papaye snackée, fêta affinée, graines de courge et vinaigrette miel-moutarde.
              </p>
            </div>
            <div className="pt-4 border-t border-border flex items-center justify-between">
              <span className="text-lg font-bold text-[#1E3A2B]">4 500 FCFA</span>
              <Link
                to="/cart"
                className="bg-[#1E3A2B] hover:bg-[#D96B43] text-white px-5 py-2.5 rounded-full text-xs font-bold transition"
              >
                Commander
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SeasonalMenu;
