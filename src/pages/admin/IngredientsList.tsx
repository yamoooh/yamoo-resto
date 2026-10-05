import React, { useState } from "react";
import { Plus, Edit2, Trash2, Sliders, Save, X, CheckCircle2, AlertCircle } from "lucide-react";
import { useData, IngredientData } from "../../contexts/DataContext";

export const IngredientsList: React.FC = () => {
  const { ingredients, mediaLibrary, saveIngredient, deleteIngredient } = useData();
  const [selectedType, setSelectedType] = useState<"all" | "base" | "protein" | "topping" | "sauce">("all");
  const [editingItem, setEditingItem] = useState<IngredientData | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const [formType, setFormType] = useState<IngredientData["type"]>("base");
  const [formName, setFormName] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const [formExtra, setFormExtra] = useState(0);
  const [formImage, setFormImage] = useState("");
  const [formAvailable, setFormAvailable] = useState(true);

  const filtered = selectedType === "all" ? ingredients : ingredients.filter((i) => i.type === selectedType);

  const handleStartEdit = (item: IngredientData) => {
    setEditingItem(item);
    setFormType(item.type);
    setFormName(item.name);
    setFormDesc(item.desc || "");
    setFormExtra(item.extraPrice);
    setFormImage(item.image);
    setFormAvailable(item.isAvailable);
    setIsCreating(false);
  };

  const handleStartCreate = () => {
    setEditingItem(null);
    setFormType("topping");
    setFormName("");
    setFormDesc("");
    setFormExtra(0);
    setFormImage("/assets/tomate-cerise-CzCzaKM0.webp");
    setFormAvailable(true);
    setIsCreating(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const newIngredient: IngredientData = {
      id: editingItem ? editingItem.id : `${formType.charAt(0)}-${Date.now()}`,
      type: formType,
      name: formName,
      desc: formDesc,
      extraPrice: formExtra,
      image: formImage,
      isAvailable: formAvailable,
      order: editingItem ? editingItem.order : ingredients.length + 1,
    };
    saveIngredient(newIngredient);
    setEditingItem(null);
    setIsCreating(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-display font-black text-[#1E3A2B]">
              Ingrédients & Suppléments (Builder)
            </h1>
            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#EBF4EE] text-[#3B8A49]">
              {ingredients.length} ingrédients
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Gérez les bases, protéines, toppings et sauces du configurateur de salade sur-mesure
          </p>
        </div>

        <button
          onClick={handleStartCreate}
          className="inline-flex items-center gap-2 bg-[#3B8A49] hover:bg-[#2F6F3B] text-white px-5 py-3 rounded-full font-bold text-xs uppercase tracking-wider transition shadow-soft cursor-pointer"
        >
          <Plus size={15} />
          <span>+ Ajouter un ingrédient</span>
        </button>
      </div>

      {/* FILTRES PAR TYPE D'INGRÉDIENT */}
      <div className="flex flex-wrap items-center gap-2">
        {[
          { label: "Tous", value: "all" },
          { label: "🥗 Bases (Salades, Pâtes, Riz)", value: "base" },
          { label: "🍗 Protéines (Poulet, Thon, Crevettes)", value: "protein" },
          { label: "🥑 Toppings & Légumes", value: "topping" },
          { label: "🍯 Sauces & Vinaigrettes", value: "sauce" },
        ].map((tab) => (
          <button
            key={tab.value}
            onClick={() => setSelectedType(tab.value as any)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition cursor-pointer ${
              selectedType === tab.value
                ? "bg-[#3B8A49] text-white shadow-xs"
                : "bg-white border border-[#E3ECE6] text-[#1E3A2B] hover:bg-[#EBF4EE]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* FORMULAIRE D'ÉDITION */}
      {(isCreating || editingItem) && (
        <div className="bg-white border-2 border-[#3B8A49] rounded-3xl p-6 shadow-card space-y-4 animate-in fade-in">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-[#3B8A49]">
              {isCreating ? "Ajouter un ingrédient" : `Modifier : ${editingItem?.name}`}
            </h3>
            <button
              onClick={() => {
                setIsCreating(false);
                setEditingItem(null);
              }}
              className="p-1 rounded-lg text-muted-foreground hover:bg-gray-100 cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>

          <form onSubmit={handleSave} className="grid sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-[#1E3A2B] mb-1 font-mono">
                Type d'ingrédient *
              </label>
              <select
                value={formType}
                onChange={(e: any) => setFormType(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E3ECE6] rounded-xl text-xs font-bold outline-hidden cursor-pointer"
              >
                <option value="base">Base (Salade, Pâtes, Riz)</option>
                <option value="protein">Protéine</option>
                <option value="topping">Topping / Légume</option>
                <option value="sauce">Sauce / Vinaigrette</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[#1E3A2B] mb-1 font-mono">
                Nom de l'ingrédient *
              </label>
              <input
                type="text"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                required
                className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#E3ECE6] rounded-xl text-xs font-bold outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[#1E3A2B] mb-1 font-mono">
                Supplément Prix (FCFA)
              </label>
              <input
                type="number"
                value={formExtra}
                onChange={(e) => setFormExtra(Number(e.target.value))}
                placeholder="0 si inclus"
                className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#E3ECE6] rounded-xl text-xs font-bold outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[#1E3A2B] mb-1 font-mono">
                Image de l'ingrédient
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

            <div className="sm:col-span-4 flex items-center justify-between pt-2 border-t border-[#E3ECE6]">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-[#1E3A2B]">
                <input
                  type="checkbox"
                  checked={formAvailable}
                  onChange={(e) => setFormAvailable(e.target.checked)}
                  className="rounded text-[#3B8A49]"
                />
                <span>Ingrédient en stock et sélectionnable dans le Builder</span>
              </label>

              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-[#3B8A49] hover:bg-[#2F6F3B] text-white px-6 py-2 rounded-full font-bold text-xs uppercase tracking-wider transition shadow-xs cursor-pointer"
              >
                <Save size={14} />
                <span>Enregistrer l'ingrédient</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TABLE DES INGRÉDIENTS */}
      <div className="bg-white border border-[#E3ECE6] rounded-3xl shadow-2xs overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#E3ECE6] bg-[#FAF8F5]/80 text-[10.5px] font-mono uppercase font-bold text-muted-foreground">
              <th className="py-3 px-4 w-14">Visuel</th>
              <th className="py-3 px-4">Nom</th>
              <th className="py-3 px-4">Type</th>
              <th className="py-3 px-4">Supplément</th>
              <th className="py-3 px-4">Disponibilité</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E3ECE6] text-xs">
            {filtered.map((item) => (
              <tr key={item.id} className="hover:bg-[#FAF8F5]/50 transition">
                <td className="py-2.5 px-4">
                  <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-50 border border-[#E3ECE6]">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                </td>
                <td className="py-2.5 px-4 font-bold text-[#1E3A2B]">{item.name}</td>
                <td className="py-2.5 px-4">
                  <span className="capitalize px-2.5 py-0.5 rounded-full bg-[#EBF4EE] text-[#3B8A49] font-bold text-[10px]">
                    {item.type}
                  </span>
                </td>
                <td className="py-2.5 px-4 font-mono font-bold">
                  {item.extraPrice > 0 ? `+${item.extraPrice} FCFA` : "Inclus"}
                </td>
                <td className="py-2.5 px-4">
                  <span
                    className={`inline-flex items-center gap-1 text-[10.5px] font-bold ${
                      item.isAvailable ? "text-green-700" : "text-red-600"
                    }`}
                  >
                    <CheckCircle2 size={12} />
                    {item.isAvailable ? "Disponible" : "Épuisé"}
                  </span>
                </td>
                <td className="py-2.5 px-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => handleStartEdit(item)}
                      className="p-1.5 rounded-lg text-muted-foreground hover:text-[#3B8A49] hover:bg-[#EBF4EE] transition cursor-pointer"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`Supprimer l'ingrédient « ${item.name} » ?`)) {
                          deleteIngredient(item.id);
                        }
                      }}
                      className="p-1.5 rounded-lg text-muted-foreground hover:text-red-600 hover:bg-red-50 transition cursor-pointer"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IngredientsList;
