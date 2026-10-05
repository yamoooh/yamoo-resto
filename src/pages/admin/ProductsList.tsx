import React, { useState, useMemo } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  Plus,
  Search,
  Filter,
  ArrowUpDown,
  Edit,
  Eye,
  EyeOff,
  Trash2,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Archive,
  ArrowUp,
  ArrowDown
} from "lucide-react";
import { useData, ExtendedProduct } from "../../contexts/DataContext";

export const ProductsList: React.FC = () => {
  const { products, saveProduct, deleteProduct, reorderProducts } = useData();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>(searchParams.get("status") || "all");
  const [sortBy, setSortBy] = useState<"order" | "name" | "price-asc" | "price-desc">("order");

  // Liste unique des catégories
  const categories = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return Array.from(set);
  }, [products]);

  // Filtrage et Tri
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.slug.toLowerCase().includes(searchQuery.toLowerCase());

      const matchCategory = selectedCategory === "all" || product.category === selectedCategory;

      const currentStatus = product.status || "published";
      const matchStatus =
        selectedStatus === "all" ||
        (selectedStatus === "published" && currentStatus === "published") ||
        (selectedStatus === "draft" && (currentStatus === "draft" || currentStatus === "hidden")) ||
        (selectedStatus === "archived" && currentStatus === "archived");

      return matchSearch && matchCategory && matchStatus;
    }).sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "price-asc") return (a.price || 0) - (b.price || 0);
      if (sortBy === "price-desc") return (b.price || 0) - (a.price || 0);
      return (a.order || 0) - (b.order || 0);
    });
  }, [products, searchQuery, selectedCategory, selectedStatus, sortBy]);

  // Toggle Publish / Hide
  const handleToggleStatus = (product: ExtendedProduct) => {
    const newStatus = product.status === "published" ? "hidden" : "published";
    saveProduct({ ...product, status: newStatus });
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer définitivement le produit « ${name} » ?`)) {
      deleteProduct(id);
    }
  };

  // Reorder Item Up / Down
  const handleMove = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= filteredProducts.length) return;

    const newOrder = [...products];
    const itemA = filteredProducts[index];
    const itemB = filteredProducts[targetIndex];

    const idxA = newOrder.findIndex((p) => p.id === itemA.id);
    const idxB = newOrder.findIndex((p) => p.id === itemB.id);

    if (idxA !== -1 && idxB !== -1) {
      const tempOrder = newOrder[idxA].order;
      newOrder[idxA].order = newOrder[idxB].order;
      newOrder[idxB].order = tempOrder;
      reorderProducts(newOrder.sort((a, b) => a.order - b.order).map((p) => p.id));
    }
  };

  return (
    <div className="space-y-6">
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-display font-black text-[#1E3A2B]">
              Catalogue des Produits
            </h1>
            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#EBF4EE] text-[#3B8A49]">
              {products.length} articles
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Gérez tous les produits visibles sur la carte, les formules et les univers
          </p>
        </div>

        <Link
          to="/admin/products/new"
          className="inline-flex items-center gap-2 bg-[#3B8A49] hover:bg-[#2F6F3B] text-white px-5 py-3 rounded-full font-bold text-xs uppercase tracking-wider transition shadow-soft cursor-pointer"
        >
          <Plus size={15} />
          <span>+ AJOUTER UN PRODUIT</span>
        </Link>
      </div>

      {/* BARRE DE RECHERCHE ET FILTRES */}
      <div className="bg-white border border-[#E3ECE6] rounded-3xl p-4 sm:p-5 shadow-2xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          {/* RECHERCHE */}
          <div className="sm:col-span-5 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" size={15} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher par nom, ingrédient ou slug..."
              className="w-full pl-9 pr-4 py-2.5 bg-[#FAF8F5] border border-[#E3ECE6] focus:border-[#3B8A49] focus:bg-white rounded-2xl text-xs font-medium outline-hidden transition"
            />
          </div>

          {/* FILTRE CATÉGORIE */}
          <div className="sm:col-span-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E3ECE6] focus:border-[#3B8A49] focus:bg-white rounded-2xl text-xs font-medium outline-hidden transition cursor-pointer"
            >
              <option value="all">Toutes les catégories ({categories.length})</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* FILTRE STATUT */}
          <div className="sm:col-span-2">
            <select
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value);
                setSearchParams(e.target.value === "all" ? {} : { status: e.target.value });
              }}
              className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E3ECE6] focus:border-[#3B8A49] focus:bg-white rounded-2xl text-xs font-medium outline-hidden transition cursor-pointer"
            >
              <option value="all">Tous les statuts</option>
              <option value="published">Publiés</option>
              <option value="draft">Brouillons / Masqués</option>
              <option value="archived">Archivés</option>
            </select>
          </div>

          {/* TRI */}
          <div className="sm:col-span-2">
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E3ECE6] focus:border-[#3B8A49] focus:bg-white rounded-2xl text-xs font-medium outline-hidden transition cursor-pointer"
            >
              <option value="order">Ordre d'affichage</option>
              <option value="name">Nom (A-Z)</option>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
            </select>
          </div>
        </div>
      </div>

      {/* TABLE DES PRODUITS */}
      <div className="bg-white border border-[#E3ECE6] rounded-3xl shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E3ECE6] bg-[#FAF8F5]/80 text-[10.5px] font-mono uppercase font-bold text-muted-foreground">
                <th className="py-3.5 px-4 w-12 text-center">Ordre</th>
                <th className="py-3.5 px-4 w-16">Visuel</th>
                <th className="py-3.5 px-4">Produit</th>
                <th className="py-3.5 px-4">Catégorie</th>
                <th className="py-3.5 px-4">Prix</th>
                <th className="py-3.5 px-4">Statut</th>
                <th className="py-3.5 px-4">Modifié le</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E3ECE6] text-xs">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-muted-foreground">
                    Aucun produit ne correspond à votre recherche.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product, index) => {
                  const isPub = product.status === "published" || !product.status;

                  return (
                    <tr key={product.id} className="hover:bg-[#FAF8F5]/60 transition">
                      {/* REORDER BUTTONS */}
                      <td className="py-3 px-2 text-center">
                        <div className="flex flex-col items-center gap-0.5">
                          <button
                            onClick={() => handleMove(index, "up")}
                            disabled={index === 0}
                            className="p-1 text-muted-foreground hover:text-[#3B8A49] disabled:opacity-20 cursor-pointer"
                            title="Monter"
                          >
                            <ArrowUp size={12} />
                          </button>
                          <span className="font-mono text-[10px] font-bold text-muted-foreground">
                            {product.order || index + 1}
                          </span>
                          <button
                            onClick={() => handleMove(index, "down")}
                            disabled={index === filteredProducts.length - 1}
                            className="p-1 text-muted-foreground hover:text-[#3B8A49] disabled:opacity-20 cursor-pointer"
                            title="Descendre"
                          >
                            <ArrowDown size={12} />
                          </button>
                        </div>
                      </td>

                      {/* IMAGE */}
                      <td className="py-3 px-4">
                        <div className="w-12 h-12 rounded-xl bg-[#FAF8F5] border border-[#E3ECE6] overflow-hidden flex items-center justify-center shrink-0">
                          {product.image ? (
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-[10px] text-muted-foreground">Sans img</span>
                          )}
                        </div>
                      </td>

                      {/* NOM & DESCRIPTION COURTE */}
                      <td className="py-3 px-4">
                        <div className="font-bold text-[#1E3A2B] hover:text-[#3B8A49] transition">
                          <Link to={`/admin/products/${product.id}`}>
                            {product.name}
                          </Link>
                        </div>
                        <div className="text-[11px] text-muted-foreground line-clamp-1 max-w-xs mt-0.5">
                          {product.description}
                        </div>
                        {product.signature && (
                          <span className="inline-flex items-center gap-1 text-[9px] font-mono px-2 py-0.2 rounded-full bg-amber-50 text-amber-700 font-bold uppercase mt-1">
                            <Sparkles size={10} /> Signature
                          </span>
                        )}
                      </td>

                      {/* CATÉGORIE */}
                      <td className="py-3 px-4">
                        <span className="inline-block px-2.5 py-1 rounded-full bg-[#EBF4EE] text-[#2F6F3B] font-bold text-[10.5px]">
                          {product.category}
                        </span>
                      </td>

                      {/* PRIX */}
                      <td className="py-3 px-4">
                        <div className="font-display font-black text-[#1E3A2B]">
                          {product.price !== null && product.price !== undefined
                            ? `${product.price.toLocaleString("fr-FR")} FCFA`
                            : "Sur devis"}
                        </div>
                        {product.oldPrice && (
                          <span className="text-[10px] text-muted-foreground line-through">
                            {product.oldPrice.toLocaleString("fr-FR")} FCFA
                          </span>
                        )}
                      </td>

                      {/* STATUT */}
                      <td className="py-3 px-4">
                        <button
                          onClick={() => handleToggleStatus(product)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10.5px] font-bold cursor-pointer transition ${
                            isPub
                              ? "bg-green-100 text-green-800 hover:bg-green-200"
                              : "bg-orange-100 text-orange-800 hover:bg-orange-200"
                          }`}
                          title="Cliquez pour changer le statut"
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isPub ? "bg-green-600" : "bg-orange-600"
                            }`}
                          />
                          <span>{isPub ? "Publié" : "Masqué"}</span>
                        </button>
                      </td>

                      {/* DATE */}
                      <td className="py-3 px-4 font-mono text-[10.5px] text-muted-foreground">
                        {product.updatedAt || "2026-10-01"}
                      </td>

                      {/* ACTIONS */}
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Link
                            to={`/admin/products/${product.id}`}
                            className="p-1.5 rounded-lg text-muted-foreground hover:text-[#3B8A49] hover:bg-[#EBF4EE] transition"
                            title="Modifier la fiche produit"
                          >
                            <Edit size={15} />
                          </Link>

                          <Link
                            to={`/notre-carte/${product.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg text-muted-foreground hover:text-[#3B8A49] hover:bg-[#EBF4EE] transition"
                            title="Voir sur le site public"
                          >
                            <ExternalLink size={14} />
                          </Link>

                          <button
                            onClick={() => handleDelete(product.id, product.name)}
                            className="p-1.5 rounded-lg text-muted-foreground hover:text-red-600 hover:bg-red-50 transition cursor-pointer"
                            title="Supprimer définitivement"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductsList;
