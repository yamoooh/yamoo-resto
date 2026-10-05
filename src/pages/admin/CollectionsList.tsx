import React, { useState } from "react";
import { Plus, Edit2, Trash2, Sparkles, Save, X, Calendar, Upload } from "lucide-react";
import { useData, CollectionData } from "../../contexts/DataContext";

export const CollectionsList: React.FC = () => {
  const { collections, products, mediaLibrary, saveCollection, deleteCollection, addMediaItem } = useData();
  const [editingCol, setEditingCol] = useState<CollectionData | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const [formTitle, setFormTitle] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const [formImage, setFormImage] = useState("/assets/formule-collection-moment.jpg");
  const [formStatus, setFormStatus] = useState<CollectionData["status"]>("active");
  const [formStart, setFormStart] = useState("2026-06-01");
  const [formEnd, setFormEnd] = useState("2026-11-30");

  const handleStartEdit = (col: CollectionData) => {
    setEditingCol(col);
    setFormTitle(col.title);
    setFormDesc(col.description);
    setFormImage(col.image);
    setFormStatus(col.status);
    setFormStart(col.startDate || "");
    setFormEnd(col.endDate || "");
    setIsCreating(false);
  };

  const handleStartCreate = () => {
    setEditingCol(null);
    setFormTitle("");
    setFormDesc("");
    setFormImage("/assets/formule-collection-moment.jpg");
    setFormStatus("active");
    setFormStart("");
    setFormEnd("");
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
        usedBy: [formTitle || "Collection"],
      });
      setFormImage(newMedia.url);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const newCol: CollectionData = {
      id: editingCol ? editingCol.id : `col-${Date.now()}`,
      slug: formTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      title: formTitle,
      description: formDesc,
      image: formImage,
      productIds: editingCol ? editingCol.productIds : ["sig-iberique", "sig-oceanne"],
      status: formStatus,
      startDate: formStart,
      endDate: formEnd,
    };
    saveCollection(newCol);
    setEditingCol(null);
    setIsCreating(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-display font-black text-[#1E3A2B]">
              Collections du Moment & Éphémères
            </h1>
            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-pink-50 text-pink-700">
              Campagnes saisonnières
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Mettez en avant des sélections thématiques (Fraîcheur d'Été, Fêtes de fin d'année, etc.)
          </p>
        </div>

        <button
          onClick={handleStartCreate}
          className="inline-flex items-center gap-2 bg-[#3B8A49] hover:bg-[#2F6F3B] text-white px-5 py-3 rounded-full font-bold text-xs uppercase tracking-wider transition shadow-soft cursor-pointer"
        >
          <Plus size={15} />
          <span>+ Nouvelle Collection</span>
        </button>
      </div>

      {/* FORMULAIRE */}
      {(isCreating || editingCol) && (
        <div className="bg-white border-2 border-[#3B8A49] rounded-3xl p-6 shadow-card space-y-4 animate-in fade-in">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-[#3B8A49]">
              {isCreating ? "Créer une collection" : `Modifier : ${editingCol?.title}`}
            </h3>
            <button
              onClick={() => {
                setIsCreating(false);
                setEditingCol(null);
              }}
              className="p-1 rounded-lg text-muted-foreground hover:bg-gray-100 cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>

          <form onSubmit={handleSave} className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-[#1E3A2B] mb-1 font-mono">
                Titre de la collection *
              </label>
              <input
                type="text"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                required
                className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#E3ECE6] rounded-xl text-xs font-bold outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[#1E3A2B] mb-1 font-mono">
                Statut
              </label>
              <select
                value={formStatus}
                onChange={(e: any) => setFormStatus(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E3ECE6] rounded-xl text-xs font-bold outline-hidden cursor-pointer"
              >
                <option value="active">Active (En ligne)</option>
                <option value="draft">Brouillon</option>
                <option value="ended">Terminée</option>
                <option value="archived">Archivée</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[#1E3A2B] mb-1 font-mono">
                Bannière Visuelle
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

            <div className="sm:col-span-3">
              <label className="block text-xs font-bold uppercase text-[#1E3A2B] mb-1 font-mono">
                Description & Storytelling
              </label>
              <textarea
                value={formDesc}
                onChange={(e) => setFormDesc(e.target.value)}
                rows={2}
                className="w-full px-4 py-2 bg-[#FAF8F5] border border-[#E3ECE6] rounded-xl text-xs outline-hidden"
              />
            </div>

            <div className="sm:col-span-3 flex justify-end pt-2 border-t border-[#E3ECE6]">
              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-[#3B8A49] hover:bg-[#2F6F3B] text-white px-6 py-2 rounded-full font-bold text-xs uppercase tracking-wider transition shadow-xs cursor-pointer"
              >
                <Save size={14} />
                <span>Enregistrer la collection</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* GRILLE */}
      <div className="grid sm:grid-cols-2 gap-6">
        {collections.map((col) => (
          <div
            key={col.id}
            className="bg-white border border-[#E3ECE6] rounded-3xl overflow-hidden shadow-2xs hover:shadow-card transition flex flex-col justify-between"
          >
            <div>
              <div className="h-48 w-full bg-gray-100 relative overflow-hidden">
                <img src={col.image} alt={col.title} className="w-full h-full object-cover" />
                <span className="absolute top-3 left-3 bg-[#3B8A49] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-xs">
                  {col.status}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-display font-bold text-lg text-[#1E3A2B] mb-2">{col.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                  {col.description}
                </p>
              </div>
            </div>

            <div className="p-4 bg-[#FAF8F5]/80 border-t border-[#E3ECE6] flex items-center justify-between">
              <span className="text-[11px] font-mono text-muted-foreground flex items-center gap-1">
                <Calendar size={12} />
                {col.startDate || "Permanent"}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleStartEdit(col)}
                  className="p-1.5 rounded-lg text-muted-foreground hover:text-[#3B8A49] hover:bg-white transition cursor-pointer"
                >
                  <Edit2 size={14} />
                </button>
                <button
                  onClick={() => {
                    if (window.confirm(`Supprimer la collection « ${col.title} » ?`)) {
                      deleteCollection(col.id);
                    }
                  }}
                  className="p-1.5 rounded-lg text-muted-foreground hover:text-red-600 hover:bg-white transition cursor-pointer"
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

export default CollectionsList;
