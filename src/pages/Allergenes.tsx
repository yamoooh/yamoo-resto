import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search, AlertTriangle, CheckCircle2, PhoneCall, Info } from "lucide-react";
import Breadcrumb from "../components/Breadcrumb";

type AllergenItem = {
  ingredient: string;
  category: "Bases" | "Protéines" | "Fromages" | "Toppings" | "Sauces" | "Desserts";
  allergens: string[];
  notes?: string;
};

export const Allergenes = () => {
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState<string>("Tous");

  const allergenData: AllergenItem[] = [
    { ingredient: "Pâtes Penne", category: "Bases", allergens: ["Gluten (Blé)"] },
    { ingredient: "Salade Verte / Jeunes Pousses", category: "Bases", allergens: ["Aucun allergène majeur"] },
    { ingredient: "Riz Parfumé", category: "Bases", allergens: ["Aucun allergène majeur"] },
    { ingredient: "Poulet Grillé", category: "Protéines", allergens: ["Aucun allergène majeur"] },
    { ingredient: "Crevettes Sautées", category: "Protéines", allergens: ["Crustacés"] },
    { ingredient: "Thon Émietté", category: "Protéines", allergens: ["Poissons"] },
    { ingredient: "Jambon de Dinde", category: "Protéines", allergens: ["Aucun allergène majeur"] },
    { ingredient: "Bœuf Séché", category: "Protéines", allergens: ["Aucun allergène majeur"] },
    { ingredient: "Œufs Durs Fermiers", category: "Protéines", allergens: ["Œufs"] },
    { ingredient: "Mozzarella di Bufala", category: "Fromages", allergens: ["Lait / Lactose"] },
    { ingredient: "Parmesan Affiné", category: "Fromages", allergens: ["Lait / Lactose"] },
    { ingredient: "Fêta AOP", category: "Fromages", allergens: ["Lait / Lactose"] },
    { ingredient: "Dés d'Emmental", category: "Fromages", allergens: ["Lait / Lactose"] },
    { ingredient: "Croûtons Dorés", category: "Toppings", allergens: ["Gluten (Blé)"] },
    { ingredient: "Avocat Frais", category: "Toppings", allergens: ["Aucun allergène majeur"] },
    { ingredient: "Graines de Sésame / Courge", category: "Toppings", allergens: ["Graines de sésame"] },
    { ingredient: "Sauce Signature YAMOOH", category: "Sauces", allergens: ["Moutarde", "Œufs"] },
    { ingredient: "Sauce César", category: "Sauces", allergens: ["Œufs", "Lait", "Poissons", "Moutarde"] },
    { ingredient: "Vinaigrette Fruit de la Passion", category: "Sauces", allergens: ["Moutarde"] },
    { ingredient: "Vinaigrette Balsamique", category: "Sauces", allergens: ["Sulfites"] },
    { ingredient: "Banana Bread aux Cacahuètes", category: "Desserts", allergens: ["Arachides (Cacahuètes)", "Gluten", "Œufs"] },
    { ingredient: "Mousse Chocolat & Cacahuètes", category: "Desserts", allergens: ["Arachides (Cacahuètes)", "Lait", "Œufs"] },
    { ingredient: "Cake Citron-Gingembre", category: "Desserts", allergens: ["Gluten", "Œufs", "Lait"] },
    { ingredient: "Fromage Blanc & Coulis Hibiscus", category: "Desserts", allergens: ["Lait / Lactose"] },
  ];

  const categories = ["Tous", "Bases", "Protéines", "Fromages", "Toppings", "Sauces", "Desserts"];

  const filtered = useMemo(() => {
    return allergenData.filter((item) => {
      const matchCat = selectedCat === "Tous" || item.category === selectedCat;
      const matchSearch =
        item.ingredient.toLowerCase().includes(search.toLowerCase()) ||
        item.allergens.some((a) => a.toLowerCase().includes(search.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [selectedCat, search]);

  return (
    <>
      <title>Allergènes | Informations produits YAMOOH</title>
      <meta
        name="description"
        content="Consultez les informations disponibles sur les allergènes associés aux produits et ingrédients YAMMOH. En cas de doute, contactez-nous avant votre commande."
      />
      <link rel="canonical" href="https://yamooh.com/allergenes" />

      {/* HERO */}
      <section className="bg-[#1E3A2B] text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="container-tight relative z-10 text-center max-w-3xl mx-auto">
          <div className="mb-4 flex justify-center">
            <Breadcrumb items={[{ label: "Allergènes" }]} />
          </div>

          <span className="inline-block bg-white/10 text-[#F2B705] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-white/15 font-mono">
            Transparence & Nutrition
          </span>

          <h1 className="text-4xl sm:text-5xl font-display font-black tracking-tight mb-4">
            Informations sur les allergènes
          </h1>

          <p className="text-white/85 text-base sm:text-lg leading-relaxed font-light mb-6">
            Cette page rassemble les informations disponibles concernant les allergènes associés aux produits et ingrédients proposés par YAMOOH.
          </p>

          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-xs sm:text-sm text-left flex items-start gap-3 max-w-2xl mx-auto">
            <AlertTriangle size={20} className="text-[#F2B705] shrink-0 mt-0.5" />
            <p>
              <strong>Important :</strong> En cas d'allergie ou d'intolérance, contactez YAMOOH avant votre commande afin de vérifier les informations disponibles pour votre sélection.
            </p>
          </div>
        </div>
      </section>

      {/* CONTENU TABLEAU */}
      <section className="container-tight py-12 lg:py-16">
        {/* RECHERCHE & FILTRES */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition cursor-pointer ${
                  selectedCat === cat
                    ? "bg-[#1E3A2B] text-white shadow-soft"
                    : "bg-card text-muted-foreground border border-border hover:bg-muted"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Rechercher un allergène ou ingrédient..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-card border border-border rounded-full pl-10 pr-4 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[#1E3A2B]"
            />
          </div>
        </div>

        {/* TABLEAU */}
        <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-card">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-[#FAF7F2] text-[#1E3A2B] uppercase font-bold text-[11px] border-b border-border">
              <tr>
                <th className="px-6 py-4">Ingrédient / Produit</th>
                <th className="px-6 py-4">Catégorie</th>
                <th className="px-6 py-4">Allergène(s) identifié(s)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((item, idx) => (
                <tr key={idx} className="hover:bg-secondary/20 transition-colors">
                  <td className="px-6 py-3.5 font-bold text-foreground">
                    {item.ingredient}
                  </td>
                  <td className="px-6 py-3.5 text-muted-foreground">
                    <span className="bg-[#E3ECE6] text-[#1E3A2B] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-3.5">
                    <div className="flex flex-wrap gap-1.5">
                      {item.allergens.map((alg, aIdx) => (
                        <span
                          key={aIdx}
                          className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                            alg === "Aucun allergène majeur"
                              ? "bg-green-50 text-green-700 border border-green-200"
                              : "bg-red-50 text-red-700 border border-red-200"
                          }`}
                        >
                          {alg}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* CONTACT RAPIDE */}
        <div className="mt-12 bg-[#FAF7F2] border border-border rounded-3xl p-6 sm:p-8 text-center max-w-xl mx-auto space-y-3">
          <h3 className="font-display font-bold text-lg text-[#1E3A2B]">Besoin d'une précision pour votre commande ?</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Notre équipe en cuisine peut vous conseiller sur les alternatives disponibles.
          </p>
          <a
            href="https://wa.me/237658254509?text=Bonjour%20Yamooh%2C%20j%27ai%20une%20question%20sur%20les%20allerg%C3%A8nes"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-2.5 rounded-full text-xs font-bold hover:bg-[#20bd5a] transition"
          >
            <PhoneCall size={14} /> Poser ma question par WhatsApp
          </a>
        </div>
      </section>
    </>
  );
};

export default Allergenes;
