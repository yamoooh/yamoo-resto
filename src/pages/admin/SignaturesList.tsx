import React, { useState } from "react";
import { Edit2, Sparkles, ChefHat, Save, X, Eye, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { useData, SignatureData } from "../../contexts/DataContext";

export const SignaturesList: React.FC = () => {
  const { signatures, mediaLibrary, saveSignature } = useData();
  const [editingSig, setEditingSig] = useState<SignatureData | null>(null);

  const [formName, setFormName] = useState("");
  const [formPrice, setFormPrice] = useState(4000);
  const [formCalories, setFormCalories] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const [formConcept, setFormConcept] = useState("");
  const [formImage, setFormImage] = useState("");
  const [formIngredients, setFormIngredients] = useState("");
  const [formBenefits, setFormBenefits] = useState("");

  const handleStartEdit = (sig: SignatureData) => {
    setEditingSig(sig);
    setFormName(sig.name);
    setFormPrice(sig.price);
    setFormCalories(sig.calories);
    setFormDesc(sig.description);
    setFormConcept(sig.concept);
    setFormImage(sig.image);
    setFormIngredients(sig.ingredients.join("\n"));
    setFormBenefits(sig.benefits.join("\n"));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSig) return;

    const updated: SignatureData = {
      ...editingSig,
      name: formName,
      price: formPrice,
      calories: formCalories,
      description: formDesc,
      concept: formConcept,
      image: formImage,
      ingredients: formIngredients.split("\n").map((s) => s.trim()).filter(Boolean),
      benefits: formBenefits.split("\n").map((s) => s.trim()).filter(Boolean),
    };

    saveSignature(updated);
    setEditingSig(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-display font-black text-[#1E3A2B]">
              Les 8 Signatures Officielles YAMOOH
            </h1>
            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-[#F2B705]">
              Recettes du Chef
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Modifier les prix, ingrédients et descriptions des signatures tout en préservant le lien direct avec le Builder
          </p>
        </div>

        <Link
          to="/signature"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white border border-[#E3ECE6] text-[#1E3A2B] hover:bg-[#EBF4EE] text-xs font-bold transition shadow-2xs"
        >
          <span>Voir page Signatures public</span>
          <ExternalLink size={13} />
        </Link>
      </div>

      {/* FORMULAIRE D'ÉDITION D'UNE SIGNATURE */}
      {editingSig && (
        <div className="bg-white border-2 border-[#3B8A49] rounded-3xl p-6 sm:p-8 shadow-card space-y-5 animate-in fade-in">
          <div className="flex justify-between items-center border-b border-[#E3ECE6] pb-3">
            <div className="flex items-center gap-2">
              <ChefHat size={18} className="text-[#3B8A49]" />
              <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-[#3B8A49]">
                Modifier la Signature : {editingSig.name}
              </h3>
            </div>
            <button
              onClick={() => setEditingSig(null)}
              className="p-1.5 rounded-lg text-muted-foreground hover:bg-gray-100 cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>

          <form onSubmit={handleSave} className="grid sm:grid-cols-12 gap-5">
            <div className="sm:col-span-4">
              <label className="block text-xs font-bold uppercase text-[#1E3A2B] mb-1 font-mono">
                Nom officiel *
              </label>
              <input
                type="text"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                required
                className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#E3ECE6] rounded-xl text-xs font-bold outline-hidden"
              />
            </div>

            <div className="sm:col-span-4">
              <label className="block text-xs font-bold uppercase text-[#1E3A2B] mb-1 font-mono">
                Prix (FCFA) *
              </label>
              <input
                type="number"
                value={formPrice}
                onChange={(e) => setFormPrice(Number(e.target.value))}
                required
                className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#E3ECE6] rounded-xl text-xs font-black text-[#1E3A2B] outline-hidden"
              />
            </div>

            <div className="sm:col-span-4">
              <label className="block text-xs font-bold uppercase text-[#1E3A2B] mb-1 font-mono">
                Calories estimées
              </label>
              <input
                type="text"
                value={formCalories}
                onChange={(e) => setFormCalories(e.target.value)}
                placeholder="Ex: 480 kcal"
                className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#E3ECE6] rounded-xl text-xs outline-hidden"
              />
            </div>

            <div className="sm:col-span-12">
              <label className="block text-xs font-bold uppercase text-[#1E3A2B] mb-1 font-mono">
                Description courte
              </label>
              <textarea
                value={formDesc}
                onChange={(e) => setFormDesc(e.target.value)}
                rows={2}
                required
                className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#E3ECE6] rounded-xl text-xs outline-hidden leading-relaxed"
              />
            </div>

            <div className="sm:col-span-12">
              <label className="block text-xs font-bold uppercase text-[#1E3A2B] mb-1 font-mono">
                Concept & Histoire gastronomique
              </label>
              <textarea
                value={formConcept}
                onChange={(e) => setFormConcept(e.target.value)}
                rows={3}
                className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#E3ECE6] rounded-xl text-xs outline-hidden leading-relaxed"
              />
            </div>

            <div className="sm:col-span-6">
              <label className="block text-xs font-bold uppercase text-[#1E3A2B] mb-1 font-mono">
                Ingrédients affichés (1 par ligne)
              </label>
              <textarea
                value={formIngredients}
                onChange={(e) => setFormIngredients(e.target.value)}
                rows={4}
                className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#E3ECE6] rounded-xl text-xs font-mono outline-hidden leading-relaxed"
              />
            </div>

            <div className="sm:col-span-6">
              <label className="block text-xs font-bold uppercase text-[#1E3A2B] mb-1 font-mono">
                Bénéfices santé (1 par ligne)
              </label>
              <textarea
                value={formBenefits}
                onChange={(e) => setFormBenefits(e.target.value)}
                rows={4}
                className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#E3ECE6] rounded-xl text-xs font-mono outline-hidden leading-relaxed"
              />
            </div>

            <div className="sm:col-span-12">
              <label className="block text-xs font-bold uppercase text-[#1E3A2B] mb-1 font-mono">
                Visuel de la Signature
              </label>
              <select
                value={formImage}
                onChange={(e) => setFormImage(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E3ECE6] rounded-xl text-xs font-mono outline-hidden cursor-pointer"
              >
                {mediaLibrary.map((m) => (
                  <option key={m.id} value={m.url}>
                    {m.filename}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-12 flex justify-end gap-3 pt-3 border-t border-[#E3ECE6]">
              <button
                type="button"
                onClick={() => setEditingSig(null)}
                className="px-5 py-2 rounded-full border border-[#E3ECE6] text-xs font-bold text-muted-foreground hover:bg-gray-50 cursor-pointer"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-[#3B8A49] hover:bg-[#2F6F3B] text-white px-6 py-2 rounded-full font-bold text-xs uppercase tracking-wider transition shadow-xs cursor-pointer"
              >
                <Save size={14} />
                <span>Enregistrer la signature</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* LISTE DES 8 SIGNATURES */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {signatures.map((sig) => (
          <div
            key={sig.id}
            className="bg-white border border-[#E3ECE6] rounded-3xl overflow-hidden shadow-2xs hover:shadow-card transition flex flex-col justify-between"
          >
            <div>
              <div className="h-44 w-full bg-gray-100 relative overflow-hidden">
                <img src={sig.image} alt={sig.name} className="w-full h-full object-cover" />
                <span className="absolute top-3 left-3 bg-amber-500 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-xs">
                  {sig.calories}
                </span>
              </div>
              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-base text-[#1E3A2B]">{sig.name}</h3>
                  <span className="font-display font-black text-sm text-[#3B8A49]">
                    {sig.price.toLocaleString("fr-FR")} FCFA
                  </span>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">{sig.description}</p>
              </div>
            </div>

            <div className="p-3 bg-[#FAF8F5] border-t border-[#E3ECE6] flex items-center justify-between">
              <Link
                to={`/builder?sig=${sig.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-[#3B8A49] hover:underline font-bold flex items-center gap-1"
              >
                <span>Tester Builder</span>
                <ExternalLink size={11} />
              </Link>

              <button
                onClick={() => handleStartEdit(sig)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#3B8A49] hover:bg-[#2F6F3B] text-white text-[11px] font-bold transition cursor-pointer"
              >
                <Edit2 size={12} />
                <span>Modifier</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SignaturesList;
