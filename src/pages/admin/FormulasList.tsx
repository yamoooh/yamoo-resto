import React, { useState } from "react";
import { Plus, Edit2, Trash2, Layers, Save, X, Image as ImageIcon, Upload } from "lucide-react";
import { useData, FormulaData } from "../../contexts/DataContext";

export const FormulasList: React.FC = () => {
  const { formulas, mediaLibrary, saveFormula, deleteFormula, addMediaItem } = useData();
  const [editingFormula, setEditingFormula] = useState<FormulaData | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const [formName, setFormName] = useState("");
  const [formPrice, setFormPrice] = useState<number | null>(3500);
  const [formDesc, setFormDesc] = useState("");
  const [formImage, setFormImage] = useState("/assets/formule-buffet.jpg");
  const [formCategory, setFormCategory] = useState("Déjeuner");

  const handleStartEdit = (f: FormulaData) => {
    setEditingFormula(f);
    setFormName(f.name);
    setFormPrice(f.price);
    setFormDesc(f.description);
    setFormImage(f.image);
    setFormCategory(f.category);
    setIsCreating(false);
  };

  const handleStartCreate = () => {
    setEditingFormula(null);
    setFormName("");
    setFormPrice(4000);
    setFormDesc("");
    setFormImage("/assets/formule-buffet.jpg");
    setFormCategory("Déjeuner");
    setIsCreating(true);
  };

  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const base64Url = uploadEvent.target?.result as string;
      const newMedia = addMediaItem({
        filename: file.name,
        url: base64Url,
        type: file.type,
        dimensions: "Personnalisé",
        fileSize: `${Math.round(file.size / 1024)} KB`,
        usedBy: [formName || "Nouvelle Formule"],
      });
      setFormImage(newMedia.url);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const newFormula: FormulaData = {
      id: editingFormula ? editingFormula.id : `fml-${Date.now()}`,
      slug: formName.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      name: formName,
      price: formPrice,
      description: formDesc,
      image: formImage,
      category: formCategory,
      status: "published",
      order: editingFormula ? editingFormula.order : formulas.length + 1,
    };
    saveFormula(newFormula);
    setEditingFormula(null);
    setIsCreating(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-display font-black text-[#1E3A2B]">
              Formules & Menus Complets
            </h1>
            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#EBF4EE] text-[#3B8A49]">
              {formulas.length} formules
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Gérez les formules de repas, packs déjeuners, plateaux et buffets clés en main
          </p>
        </div>

        <button
          onClick={handleStartCreate}
          className="inline-flex items-center gap-2 bg-[#3B8A49] hover:bg-[#2F6F3B] text-white px-5 py-3 rounded-full font-bold text-xs uppercase tracking-wider transition shadow-soft cursor-pointer"
        >
          <Plus size={15} />
          <span>+ Nouvelle Formule</span>
        </button>
      </div>

      {/* FORMULAIRE D'ÉDITION */}
      {(isCreating || editingFormula) && (
        <div className="bg-white border-2 border-[#3B8A49] rounded-3xl p-6 shadow-card space-y-4 animate-in fade-in">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-[#3B8A49]">
              {isCreating ? "Créer une formule" : `Modifier : ${editingFormula?.name}`}
            </h3>
            <button
              onClick={() => {
                setIsCreating(false);
                setEditingFormula(null);
              }}
              className="p-1 rounded-lg text-muted-foreground hover:bg-gray-100 cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>

          <form onSubmit={handleSave} className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-[#1E3A2B] mb-1 font-mono">
                Nom de la formule *
              </label>
              <input
                type="text"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                required
                className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#E3ECE6] rounded-xl text-xs font-medium outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[#1E3A2B] mb-1 font-mono">
                Prix (FCFA)
              </label>
              <input
                type="number"
                value={formPrice === null ? "" : formPrice}
                onChange={(e) => setFormPrice(e.target.value === "" ? null : Number(e.target.value))}
                placeholder="Laisser vide pour 'Sur devis'"
                className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#E3ECE6] rounded-xl text-xs font-bold outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[#1E3A2B] mb-1 font-mono">
                Catégorie / Contexte
              </label>
              <input
                type="text"
                value={formCategory}
                onChange={(e) => setFormCategory(e.target.value)}
                placeholder="Ex: Déjeuner, Petit-déjeuner, Traiteur"
                className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#E3ECE6] rounded-xl text-xs outline-hidden"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase text-[#1E3A2B] mb-1 font-mono">
                Description & Contenu de la formule
              </label>
              <textarea
                value={formDesc}
                onChange={(e) => setFormDesc(e.target.value)}
                rows={2}
                className="w-full px-4 py-2 bg-[#FAF8F5] border border-[#E3ECE6] rounded-xl text-xs outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[#1E3A2B] mb-1 font-mono">
                Image de la formule
              </label>
              <div className="space-y-3">
                <div className="flex gap-3">
                  {formImage && (
                    <img src={formImage} alt="Aperçu" className="w-16 h-16 rounded-xl object-cover border border-[#E3ECE6]" />
                  )}
                  <div className="flex-1 space-y-2">
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
                    <label className="w-full py-2 px-3 rounded-xl bg-[#EBF4EE] hover:bg-[#d8eadd] text-[#3B8A49] font-bold text-xs transition flex items-center justify-center gap-2 cursor-pointer">
                      <Upload size={14} />
                      <span>Téléverser une image</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="sm:col-span-3 flex justify-end pt-2 border-t border-[#E3ECE6]">
              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-[#3B8A49] hover:bg-[#2F6F3B] text-white px-6 py-2 rounded-full font-bold text-xs uppercase tracking-wider transition shadow-xs cursor-pointer"
              >
                <Save size={14} />
                <span>Enregistrer la formule</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* GRILLE DES FORMULES */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {formulas.map((formula) => (
          <div
            key={formula.id}
            className="bg-white border border-[#E3ECE6] rounded-3xl overflow-hidden shadow-2xs hover:shadow-card transition flex flex-col justify-between"
          >
            <div>
              <div className="h-44 w-full bg-gray-100 relative overflow-hidden">
                <img src={formula.image} alt={formula.name} className="w-full h-full object-cover" />
                <span className="absolute top-3 left-3 bg-[#3B8A49] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-xs">
                  {formula.category}
                </span>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-display font-bold text-base text-[#1E3A2B]">{formula.name}</h3>
                  <span className="font-display font-black text-sm text-[#3B8A49]">
                    {formula.price ? `${formula.price.toLocaleString("fr-FR")} FCFA` : "Sur devis"}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">{formula.description}</p>
              </div>
            </div>

            <div className="p-4 bg-[#FAF8F5]/80 border-t border-[#E3ECE6] flex items-center justify-between">
              <span className="text-[10px] font-mono text-muted-foreground uppercase">
                {formula.itemsCount || "Formule complète"}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleStartEdit(formula)}
                  className="p-1.5 rounded-lg text-muted-foreground hover:text-[#3B8A49] hover:bg-white transition cursor-pointer"
                  title="Modifier"
                >
                  <Edit2 size={14} />
                </button>
                <button
                  onClick={() => {
                    if (window.confirm(`Supprimer la formule « ${formula.name} » ?`)) {
                      deleteFormula(formula.id);
                    }
                  }}
                  className="p-1.5 rounded-lg text-muted-foreground hover:text-red-600 hover:bg-white transition cursor-pointer"
                  title="Supprimer"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormulasList;
