import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  Save,
  Eye,
  Image as ImageIcon,
  Upload,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  Sparkles,
  ExternalLink
} from "lucide-react";
import { useData, ExtendedProduct, ProductStatus } from "../../contexts/DataContext";

export const ProductEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isNew = !id || id === "new";
  const navigate = useNavigate();
  const { products, categories, mediaLibrary, saveProduct, addMediaItem } = useData();

  const [product, setProduct] = useState<ExtendedProduct>({
    id: `prod-${Date.now()}`,
    slug: "",
    name: "",
    price: 4000,
    oldPrice: null,
    description: "",
    category: "Salades",
    subCategory: "Composées",
    image: "/assets/salade-iberique.jpg",
    gallery: ["/assets/salade-iberique.jpg"],
    badge: "",
    concept: "",
    benefits: [],
    composition: [],
    allergens: [],
    calories: "450 kcal",
    order: products.length + 1,
    status: "published",
    signature: false,
  });

  const [mediaPickerOpen, setMediaPickerOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [previewActive, setPreviewActive] = useState(false);

  // Ingrédients et Bénéfices en chaînes de texte éditables
  const [compositionText, setCompositionText] = useState("");
  const [benefitsText, setBenefitsText] = useState("");
  const [allergensText, setAllergensText] = useState("");

  useEffect(() => {
    if (!isNew && id) {
      const found = products.find((p) => p.id === id);
      if (found) {
        setProduct(found);
        setCompositionText((found.composition || []).join("\n"));
        setBenefitsText((found.benefits || []).join("\n"));
        setAllergensText((found.allergens || []).join(", "));
      }
    }
  }, [id, isNew, products]);

  // Auto-slug generator
  const handleNameChange = (name: string) => {
    setProduct((prev) => ({
      ...prev,
      name,
      slug: isNew
        ? name
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "")
        : prev.slug,
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const compositionArray = compositionText
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    const benefitsArray = benefitsText
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    const allergensArray = allergensText
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const updated: ExtendedProduct = {
      ...product,
      composition: compositionArray,
      benefits: benefitsArray,
      allergens: allergensArray,
    };

    saveProduct(updated);
    setSuccessMessage("Produit enregistré avec succès et synchronisé sur le site public !");
    setTimeout(() => {
      setSuccessMessage("");
    }, 4000);
  };

  // Upload d'image localement dans la médiathèque
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
        usedBy: [product.name],
      });
      setProduct((prev) => ({
        ...prev,
        image: newMedia.url,
        gallery: [newMedia.url, ...(prev.gallery || [])],
      }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* NAVIGATION RETOUR & ACTIONS */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#E3ECE6] pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/admin/products")}
            className="p-2 rounded-xl bg-white border border-[#E3ECE6] hover:bg-[#EBF4EE] text-[#1E3A2B] transition cursor-pointer"
            title="Retourner à la liste des produits"
          >
            <ArrowLeft size={16} />
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-display font-black text-[#1E3A2B]">
              {isNew ? "Ajouter un nouveau produit" : `Modifier : ${product.name}`}
            </h1>
            <span className="text-xs text-muted-foreground font-mono">
              Slug : /{product.slug || "nouveau-produit"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {!isNew && (
            <Link
              to={`/notre-carte/${product.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white border border-[#E3ECE6] text-[#1E3A2B] hover:bg-[#EBF4EE] text-xs font-bold transition shadow-2xs"
            >
              <span>Aperçu Public</span>
              <ExternalLink size={13} />
            </Link>
          )}

          <button
            onClick={handleSave}
            className="inline-flex items-center gap-2 bg-[#3B8A49] hover:bg-[#2F6F3B] text-white px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition shadow-soft cursor-pointer"
          >
            <Save size={14} />
            <span>Enregistrer & Publier</span>
          </button>
        </div>
      </div>

      {successMessage && (
        <div className="p-4 bg-green-50 border border-green-200 text-green-800 text-xs rounded-2xl flex items-center gap-2 shadow-xs animate-in fade-in">
          <CheckCircle2 size={16} className="text-green-600 shrink-0" />
          <span className="font-bold">{successMessage}</span>
        </div>
      )}

      {/* FORMULAIRE PRINCIPAL */}
      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* COLONNE GAUCHE (INFOS PRINCIPALES) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white border border-[#E3ECE6] rounded-3xl p-6 sm:p-8 shadow-2xs space-y-5">
            <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-[#3B8A49] flex items-center gap-2">
              <span>Informations Produit</span>
            </h2>

            {/* NOM DU PRODUIT */}
            <div>
              <label className="block text-xs font-bold uppercase text-[#1E3A2B] mb-1.5 font-mono">
                Nom du produit *
              </label>
              <input
                type="text"
                value={product.name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="Ex: L'Ibèrique"
                required
                className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#E3ECE6] focus:border-[#3B8A49] focus:bg-white rounded-2xl text-xs font-semibold outline-hidden transition"
              />
            </div>

            {/* SLUG URL */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-[#1E3A2B] mb-1.5 font-mono">
                  Slug URL (Identifiant de route) *
                </label>
                <input
                  type="text"
                  value={product.slug}
                  onChange={(e) => setProduct({ ...product, slug: e.target.value })}
                  placeholder="l-iberique"
                  required
                  className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#E3ECE6] focus:border-[#3B8A49] focus:bg-white rounded-2xl text-xs font-mono outline-hidden transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#1E3A2B] mb-1.5 font-mono">
                  Badge / Label spécial
                </label>
                <input
                  type="text"
                  value={product.badge || ""}
                  onChange={(e) => setProduct({ ...product, badge: e.target.value })}
                  placeholder="Ex: Signature du Chef, Coup de Cœur"
                  className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#E3ECE6] focus:border-[#3B8A49] focus:bg-white rounded-2xl text-xs outline-hidden transition"
                />
              </div>
            </div>

            {/* DESCRIPTION COURTE */}
            <div>
              <label className="block text-xs font-bold uppercase text-[#1E3A2B] mb-1.5 font-mono">
                Description courte (Liste & Cartes) *
              </label>
              <textarea
                value={product.description}
                onChange={(e) => setProduct({ ...product, description: e.target.value })}
                rows={3}
                placeholder="Courte description percutante du produit..."
                required
                className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#E3ECE6] focus:border-[#3B8A49] focus:bg-white rounded-2xl text-xs leading-relaxed outline-hidden transition"
              />
            </div>

            {/* CONCEPT & HISTOIRE CULINAIRE */}
            <div>
              <label className="block text-xs font-bold uppercase text-[#1E3A2B] mb-1.5 font-mono">
                Concept & Description complète (Fiche détaillée)
              </label>
              <textarea
                value={product.concept || ""}
                onChange={(e) => setProduct({ ...product, concept: e.target.value })}
                rows={4}
                placeholder="L'histoire culinaire, le choix des ingrédients et l'inspiration du chef..."
                className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#E3ECE6] focus:border-[#3B8A49] focus:bg-white rounded-2xl text-xs leading-relaxed outline-hidden transition"
              />
            </div>
          </div>

          {/* COMPOSITION & BIENFAITS */}
          <div className="bg-white border border-[#E3ECE6] rounded-3xl p-6 sm:p-8 shadow-2xs space-y-5">
            <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-[#3B8A49]">
              Ingrédients & Nutrition
            </h2>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase text-[#1E3A2B] mb-1.5 font-mono">
                  Ingrédients (1 par ligne)
                </label>
                <textarea
                  value={compositionText}
                  onChange={(e) => setCompositionText(e.target.value)}
                  rows={5}
                  placeholder="Salade Verte&#10;Jambon de dinde&#10;Parmesan affiné&#10;Tomates cerises"
                  className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#E3ECE6] focus:border-[#3B8A49] focus:bg-white rounded-2xl text-xs leading-relaxed font-mono outline-hidden transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#1E3A2B] mb-1.5 font-mono">
                  Bénéfices santé (1 par ligne)
                </label>
                <textarea
                  value={benefitsText}
                  onChange={(e) => setBenefitsText(e.target.value)}
                  rows={5}
                  placeholder="Riche en protéines maigres&#10;Apport naturel en calcium&#10;Énergie saine et rassasiante"
                  className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#E3ECE6] focus:border-[#3B8A49] focus:bg-white rounded-2xl text-xs leading-relaxed font-mono outline-hidden transition"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-bold uppercase text-[#1E3A2B] mb-1.5 font-mono">
                  Calories
                </label>
                <input
                  type="text"
                  value={product.calories || ""}
                  onChange={(e) => setProduct({ ...product, calories: e.target.value })}
                  placeholder="Ex: 480 kcal"
                  className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#E3ECE6] focus:border-[#3B8A49] focus:bg-white rounded-2xl text-xs outline-hidden transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#1E3A2B] mb-1.5 font-mono">
                  Allergènes (séparés par une virgule)
                </label>
                <input
                  type="text"
                  value={allergensText}
                  onChange={(e) => setAllergensText(e.target.value)}
                  placeholder="Lait, Gluten, Œuf"
                  className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#E3ECE6] focus:border-[#3B8A49] focus:bg-white rounded-2xl text-xs outline-hidden transition"
                />
              </div>
            </div>
          </div>
        </div>

        {/* COLONNE DROITE (PRIX, STATUT, VISUELS) */}
        <div className="lg:col-span-4 space-y-6">
          {/* PRIX ET TARIFICATION */}
          <div className="bg-white border border-[#E3ECE6] rounded-3xl p-6 shadow-2xs space-y-4">
            <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-[#3B8A49]">
              Tarification & Statut
            </h2>

            <div>
              <label className="block text-xs font-bold uppercase text-[#1E3A2B] mb-1.5 font-mono">
                Prix de vente (FCFA)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={product.price === null ? "" : product.price}
                  onChange={(e) =>
                    setProduct({
                      ...product,
                      price: e.target.value === "" ? null : Number(e.target.value),
                    })
                  }
                  placeholder="Laisser vide pour 'Sur devis'"
                  className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#E3ECE6] focus:border-[#3B8A49] focus:bg-white rounded-2xl text-base font-black text-[#1E3A2B] outline-hidden transition"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">
                  FCFA
                </span>
              </div>
              <span className="text-[10px] text-muted-foreground mt-1 block">
                Ex: 4000 ou 4500 (Laisser vide pour les formules sur devis)
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[#1E3A2B] mb-1.5 font-mono">
                Ancien prix (Promo)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={product.oldPrice || ""}
                  onChange={(e) =>
                    setProduct({
                      ...product,
                      oldPrice: e.target.value ? Number(e.target.value) : null,
                    })
                  }
                  placeholder="Optionnel"
                  className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#E3ECE6] focus:border-[#3B8A49] focus:bg-white rounded-2xl text-xs outline-hidden transition"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">
                  FCFA
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[#1E3A2B] mb-1.5 font-mono">
                Catégorie
              </label>
              <select
                value={product.category}
                onChange={(e: any) => setProduct({ ...product, category: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E3ECE6] focus:border-[#3B8A49] focus:bg-white rounded-2xl text-xs font-semibold outline-hidden transition cursor-pointer"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[#1E3A2B] mb-1.5 font-mono">
                Statut de publication
              </label>
              <select
                value={product.status || "published"}
                onChange={(e: any) => setProduct({ ...product, status: e.target.value as ProductStatus })}
                className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E3ECE6] focus:border-[#3B8A49] focus:bg-white rounded-2xl text-xs font-semibold outline-hidden transition cursor-pointer"
              >
                <option value="published">🟢 Publié (Visible sur le site)</option>
                <option value="draft">🟡 Brouillon (En préparation)</option>
                <option value="hidden">🟠 Masqué (Temporairement indisponible)</option>
                <option value="archived">⚪ Archivé</option>
              </select>
            </div>

            <div className="pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={!!product.signature}
                  onChange={(e) => setProduct({ ...product, signature: e.target.checked })}
                  className="rounded text-[#3B8A49] focus:ring-[#3B8A49]"
                />
                <span className="text-xs font-bold text-[#1E3A2B]">
                  Activer en Signature Officielle Chef
                </span>
              </label>
            </div>
          </div>

          {/* GESTION VISUELLE DE L'IMAGE */}
          <div className="bg-white border border-[#E3ECE6] rounded-3xl p-6 shadow-2xs space-y-4">
            <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-[#3B8A49] flex items-center justify-between">
              <span>Image Principale</span>
            </h2>

            {/* APERÇU DE L'IMAGE ACTUELLE */}
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#FAF8F5] border-2 border-dashed border-[#E3ECE6] flex items-center justify-center group">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center p-4 text-muted-foreground">
                  <ImageIcon size={32} className="mx-auto mb-2 text-muted-foreground/50" />
                  <span className="text-xs font-medium">Aucune image sélectionnée</span>
                </div>
              )}
            </div>

            {/* ACTIONS IMAGES */}
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setMediaPickerOpen(!mediaPickerOpen)}
                className="w-full py-2.5 px-4 rounded-xl bg-[#EBF4EE] hover:bg-[#d8eadd] text-[#3B8A49] font-bold text-xs transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <ImageIcon size={14} />
                <span>Choisir dans la Médiathèque</span>
              </button>

              <label className="w-full py-2.5 px-4 rounded-xl bg-[#FAF8F5] hover:bg-white border border-[#E3ECE6] text-[#1E3A2B] font-bold text-xs transition flex items-center justify-center gap-2 cursor-pointer">
                <Upload size={14} />
                <span>Téléverser depuis l'ordinateur</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* SÉLECTEUR DE MÉDIAS DE LA MÉDIATHÈQUE */}
            {mediaPickerOpen && (
              <div className="mt-4 p-3 bg-[#FAF8F5] border border-[#E3ECE6] rounded-2xl space-y-2 max-h-60 overflow-y-auto custom-scrollbar">
                <span className="text-[10px] font-mono font-bold text-muted-foreground uppercase block">
                  Sélectionnez un visuel ({mediaLibrary.length} dispo) :
                </span>
                <div className="grid grid-cols-4 gap-2">
                  {mediaLibrary.map((med) => (
                    <button
                      key={med.id}
                      type="button"
                      onClick={() => {
                        setProduct((prev) => ({ ...prev, image: med.url }));
                        setMediaPickerOpen(false);
                      }}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition cursor-pointer ${
                        product.image === med.url ? "border-[#3B8A49] ring-2 ring-[#3B8A49]/30" : "border-transparent"
                      }`}
                      title={med.filename}
                    >
                      <img src={med.url} alt={med.filename} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductEdit;
