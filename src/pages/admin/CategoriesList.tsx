import React, { useState } from "react";
import { Plus, Edit2, Trash2, CheckCircle2, FolderTree, ArrowRight, Save, X } from "lucide-react";
import { useData, CategoryData } from "../../contexts/DataContext";

export const CategoriesList: React.FC = () => {
  const { categories, products, saveCategory, deleteCategory } = useData();
  const [editingCategory, setEditingCategory] = useState<CategoryData | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const [formName, setFormName] = useState("");
  const [formSlug, setFormSlug] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const [formActive, setFormActive] = useState(true);

  const handleStartEdit = (cat: CategoryData) => {
    setEditingCategory(cat);
    setFormName(cat.name);
    setFormSlug(cat.slug);
    setFormDesc(cat.description || "");
    setFormActive(cat.isActive);
    setIsCreating(false);
  };

  const handleStartCreate = () => {
    setEditingCategory(null);
    setFormName("");
    setFormSlug("");
    setFormDesc("");
    setFormActive(true);
    setIsCreating(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const newCat: CategoryData = {
      id: editingCategory ? editingCategory.id : `cat-${Date.now()}`,
      name: formName,
      slug: formSlug || formName.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      description: formDesc,
      isActive: formActive,
      order: editingCategory ? editingCategory.order : categories.length + 1,
    };
    saveCategory(newCat);
    setEditingCategory(null);
    setIsCreating(false);
  };

  const handleDelete = (id: string, name: string) => {
    const usedCount = products.filter((p) => p.category === name).length;
    if (usedCount > 0) {
      alert(`Impossible de supprimer la catégorie « ${name} » car ${usedCount} produit(s) y sont rattachés.`);
      return;
    }
    if (window.confirm(`Supprimer la catégorie « ${name} » ?`)) {
      deleteCategory(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-display font-black text-[#1E3A2B]">
              Gestion des Catégories & Rayons
            </h1>
            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#EBF4EE] text-[#3B8A49]">
              {categories.length} catégories
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Organisez les rayons du catalogue et les filtres de la carte
          </p>
        </div>

        <button
          onClick={handleStartCreate}
          className="inline-flex items-center gap-2 bg-[#3B8A49] hover:bg-[#2F6F3B] text-white px-5 py-3 rounded-full font-bold text-xs uppercase tracking-wider transition shadow-soft cursor-pointer"
        >
          <Plus size={15} />
          <span>+ Nouvelle Catégorie</span>
        </button>
      </div>

      {/* MODAL / FORMULAIRE D'ÉDITION OU CRÉATION */}
      {(isCreating || editingCategory) && (
        <div className="bg-white border-2 border-[#3B8A49] rounded-3xl p-6 shadow-card space-y-4 animate-in fade-in">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-[#3B8A49]">
              {isCreating ? "Créer une nouvelle catégorie" : `Modifier : ${editingCategory?.name}`}
            </h3>
            <button
              onClick={() => {
                setIsCreating(false);
                setEditingCategory(null);
              }}
              className="p-1 rounded-lg text-muted-foreground hover:bg-gray-100 cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>

          <form onSubmit={handleSave} className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-[#1E3A2B] mb-1 font-mono">
                Nom de la catégorie *
              </label>
              <input
                type="text"
                value={formName}
                onChange={(e) => {
                  setFormName(e.target.value);
                  if (isCreating) {
                    setFormSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-"));
                  }
                }}
                required
                className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#E3ECE6] rounded-xl text-xs font-medium outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[#1E3A2B] mb-1 font-mono">
                Slug URL *
              </label>
              <input
                type="text"
                value={formSlug}
                onChange={(e) => setFormSlug(e.target.value)}
                required
                className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#E3ECE6] rounded-xl text-xs font-mono outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[#1E3A2B] mb-1 font-mono">
                Description courte
              </label>
              <input
                type="text"
                value={formDesc}
                onChange={(e) => setFormDesc(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#E3ECE6] rounded-xl text-xs outline-hidden"
              />
            </div>

            <div className="sm:col-span-3 flex items-center justify-between pt-2 border-t border-[#E3ECE6]">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-[#1E3A2B]">
                <input
                  type="checkbox"
                  checked={formActive}
                  onChange={(e) => setFormActive(e.target.checked)}
                  className="rounded text-[#3B8A49]"
                />
                <span>Catégorie active et visible dans les menus</span>
              </label>

              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-[#3B8A49] hover:bg-[#2F6F3B] text-white px-6 py-2 rounded-full font-bold text-xs uppercase tracking-wider transition shadow-xs cursor-pointer"
              >
                <Save size={14} />
                <span>Enregistrer la catégorie</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* GRILLE DES CATÉGORIES */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => {
          const count = products.filter((p) => p.category === cat.name).length;

          return (
            <div
              key={cat.id}
              className="bg-white border border-[#E3ECE6] rounded-3xl p-5 shadow-2xs hover:shadow-card transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-8 h-8 rounded-xl bg-[#EBF4EE] text-[#3B8A49] flex items-center justify-center font-bold text-xs">
                    {cat.order}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      cat.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {cat.isActive ? "Active" : "Désactivée"}
                  </span>
                </div>

                <h3 className="font-display font-bold text-lg text-[#1E3A2B]">{cat.name}</h3>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                  {cat.description || "Aucune description"}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#E3ECE6] flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#3B8A49]">
                  {count} produit(s)
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleStartEdit(cat)}
                    className="p-1.5 rounded-lg text-muted-foreground hover:text-[#3B8A49] hover:bg-[#EBF4EE] transition cursor-pointer"
                    title="Modifier"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(cat.id, cat.name)}
                    className="p-1.5 rounded-lg text-muted-foreground hover:text-red-600 hover:bg-red-50 transition cursor-pointer"
                    title="Supprimer"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoriesList;
