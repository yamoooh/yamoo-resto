import React, { useState, useMemo } from "react";
import {
  Upload,
  Search,
  Image as ImageIcon,
  Trash2,
  RefreshCw,
  Eye,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  X,
  ExternalLink
} from "lucide-react";
import { useData, MediaItem } from "../../contexts/DataContext";

export const MediaLibrary: React.FC = () => {
  const { mediaLibrary, products, addMediaItem, replaceMediaItem, deleteMediaItem } = useData();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [replaceModalOpen, setReplaceModalOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Compute dynamic usage by cross-referencing products
  const mediaWithDynamicUsage = useMemo(() => {
    return mediaLibrary.map((item) => {
      const usingProducts = products.filter((p) => p.image === item.url || p.gallery?.includes(item.url));
      const usedBy = usingProducts.map((p) => p.name);
      return {
        ...item,
        usedBy: usedBy.length > 0 ? usedBy : item.usedBy || [],
      };
    });
  }, [mediaLibrary, products]);

  const filteredMedia = useMemo(() => {
    return mediaWithDynamicUsage.filter((item) =>
      item.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.usedBy?.some((u) => u.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [mediaWithDynamicUsage, searchQuery]);

  // Upload New Media
  const handleUploadNew = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const base64 = uploadEvent.target?.result as string;
      const img = new Image();
      img.onload = () => {
        addMediaItem({
          filename: file.name,
          url: base64,
          type: file.type,
          dimensions: `${img.width}x${img.height}`,
          fileSize: `${Math.round(file.size / 1024)} KB`,
          usedBy: [],
        });
        setAlertMessage({ type: "success", text: `Image « ${file.name} » importée avec succès dans la médiathèque.` });
        setTimeout(() => setAlertMessage(null), 4000);
      };
      img.src = base64;
    };
    reader.readAsDataURL(file);
  };

  // Replace Existing Media
  const handleReplaceMedia = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedMedia) return;
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const base64 = uploadEvent.target?.result as string;
      replaceMediaItem(selectedMedia.id, base64, file.name);
      setReplaceModalOpen(false);
      setSelectedMedia(null);
      setAlertMessage({
        type: "success",
        text: `Image remplacée avec succès. Tous les produits associés affichent désormais le nouveau visuel.`,
      });
      setTimeout(() => setAlertMessage(null), 4000);
    };
    reader.readAsDataURL(file);
  };

  // Delete Media with safeguard
  const handleDelete = (item: MediaItem) => {
    const res = deleteMediaItem(item.id);
    if (!res.success) {
      setAlertMessage({ type: "error", text: res.error || "Impossible de supprimer cette image." });
      setTimeout(() => setAlertMessage(null), 6000);
    } else {
      if (selectedMedia?.id === item.id) setSelectedMedia(null);
      setAlertMessage({ type: "success", text: `Image « ${item.filename} » supprimée de la médiathèque.` });
      setTimeout(() => setAlertMessage(null), 4000);
    }
  };

  return (
    <div className="space-y-6">
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-display font-black text-[#1E3A2B]">
              Médiathèque Officielle YAMOOH
            </h1>
            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#EBF4EE] text-[#3B8A49]">
              {mediaLibrary.length} images HD
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Toutes les images utilisées par le catalogue, les menus, les formules et les bannières
          </p>
        </div>

        <label className="inline-flex items-center gap-2 bg-[#3B8A49] hover:bg-[#2F6F3B] text-white px-5 py-3 rounded-full font-bold text-xs uppercase tracking-wider transition shadow-soft cursor-pointer">
          <Upload size={15} />
          <span>+ Importer une image</span>
          <input type="file" accept="image/*" onChange={handleUploadNew} className="hidden" />
        </label>
      </div>

      {alertMessage && (
        <div
          className={`p-4 rounded-2xl flex items-center gap-3 text-xs font-bold shadow-xs animate-in fade-in ${
            alertMessage.type === "success"
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          {alertMessage.type === "success" ? (
            <CheckCircle2 size={16} className="text-green-600 shrink-0" />
          ) : (
            <AlertTriangle size={16} className="text-red-600 shrink-0" />
          )}
          <span>{alertMessage.text}</span>
        </div>
      )}

      {/* RECHERCHE */}
      <div className="bg-white border border-[#E3ECE6] rounded-3xl p-4 shadow-2xs">
        <div className="relative max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" size={15} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher par nom de fichier ou produit associé..."
            className="w-full pl-9 pr-4 py-2.5 bg-[#FAF8F5] border border-[#E3ECE6] focus:border-[#3B8A49] focus:bg-white rounded-2xl text-xs font-medium outline-hidden transition"
          />
        </div>
      </div>

      {/* GRILLE DES IMAGES ET PANNEAU DE DÉTAILS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* GRILLE PRINCIPALE */}
        <div className={`${selectedMedia ? "lg:col-span-8" : "lg:col-span-12"} space-y-4`}>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {filteredMedia.map((item) => {
              const isSelected = selectedMedia?.id === item.id;
              const isUsed = item.usedBy && item.usedBy.length > 0;

              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedMedia(item)}
                  className={`group relative bg-white border rounded-3xl overflow-hidden shadow-2xs hover:shadow-card transition cursor-pointer flex flex-col justify-between ${
                    isSelected ? "border-[#3B8A49] ring-2 ring-[#3B8A49]/30" : "border-[#E3ECE6]"
                  }`}
                >
                  <div className="aspect-square w-full bg-gray-50 overflow-hidden relative">
                    <img
                      src={item.url}
                      alt={item.filename}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      loading="lazy"
                    />
                    {isUsed && (
                      <span className="absolute top-2 left-2 bg-[#3B8A49] text-white text-[9px] font-mono font-bold px-2 py-0.5 rounded-full shadow-xs">
                        Utilisée ({item.usedBy?.length})
                      </span>
                    )}
                  </div>

                  <div className="p-3">
                    <div className="font-mono text-xs font-bold text-[#1E3A2B] truncate" title={item.filename}>
                      {item.filename}
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-muted-foreground mt-1">
                      <span>{item.dimensions || "HD"}</span>
                      <span>{item.fileSize || "Web"}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* PANNEAU DE DÉTAILS LATÉRAL */}
        {selectedMedia && (
          <div className="lg:col-span-4 bg-white border border-[#E3ECE6] rounded-3xl p-6 shadow-card space-y-5 sticky top-20 h-fit animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-[#E3ECE6]">
              <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-[#3B8A49]">
                Détails du Média
              </h3>
              <button
                onClick={() => setSelectedMedia(null)}
                className="p-1 rounded-lg text-muted-foreground hover:bg-gray-100 cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* GRANDE IMAGE D'APERÇU */}
            <div className="aspect-video w-full rounded-2xl overflow-hidden bg-[#FAF8F5] border border-[#E3ECE6] relative">
              <img src={selectedMedia.url} alt={selectedMedia.filename} className="w-full h-full object-cover" />
            </div>

            {/* MÉTADONNÉES */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-[#E3ECE6]">
                <span className="text-muted-foreground">Fichier :</span>
                <span className="font-mono font-bold text-[#1E3A2B] truncate max-w-[180px]">
                  {selectedMedia.filename}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#E3ECE6]">
                <span className="text-muted-foreground">Dimensions :</span>
                <span className="font-mono font-bold">{selectedMedia.dimensions || "Inconnues"}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#E3ECE6]">
                <span className="text-muted-foreground">Poids :</span>
                <span className="font-mono font-bold">{selectedMedia.fileSize || "Optimisé"}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#E3ECE6]">
                <span className="text-muted-foreground">Date d'import :</span>
                <span className="font-mono">{selectedMedia.uploadedAt}</span>
              </div>
            </div>

            {/* UTILISATION PAR PRODUITS */}
            <div className="space-y-2">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-muted-foreground block">
                Utilisée actuellement par :
              </span>
              {selectedMedia.usedBy && selectedMedia.usedBy.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {selectedMedia.usedBy.map((prod) => (
                    <span
                      key={prod}
                      className="px-2.5 py-1 rounded-full bg-[#EBF4EE] text-[#3B8A49] font-bold text-[11px]"
                    >
                      {prod}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="text-xs text-muted-foreground italic">
                  Non utilisée directement par un produit
                </span>
              )}
            </div>

            {/* ACTIONS */}
            <div className="space-y-2 pt-3 border-t border-[#E3ECE6]">
              <label className="w-full py-2.5 px-4 rounded-xl bg-[#3B8A49] hover:bg-[#2F6F3B] text-white font-bold text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-soft">
                <RefreshCw size={14} />
                <span>Remplacer ce fichier</span>
                <input type="file" accept="image/*" onChange={handleReplaceMedia} className="hidden" />
              </label>

              <button
                onClick={() => handleDelete(selectedMedia)}
                className="w-full py-2.5 px-4 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 font-bold text-xs transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Trash2 size={14} />
                <span>Supprimer de la médiathèque</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaLibrary;
