import React, { useState } from "react";
import { Megaphone, Plus, Save, Tag, Sparkles, CheckCircle2, Trash2 } from "lucide-react";
import { useData } from "../../contexts/DataContext";

export const Marketing: React.FC = () => {
  const { products, saveProduct } = useData();
  const [selectedProductId, setSelectedProductId] = useState(products[0]?.id || "");
  const [promoBadge, setPromoBadge] = useState("Offre Découverte");
  const [promoPrice, setPromoPrice] = useState<number>(3500);
  const [success, setSuccess] = useState(false);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const target = products.find((p) => p.id === selectedProductId);
    if (!target) return;

    saveProduct({
      ...target,
      badge: promoBadge,
      oldPrice: target.price,
      price: promoPrice,
    });

    setSuccess(true);
    setTimeout(() => setSuccess(false), 4000);
  };

  const handleRemovePromo = (productId: string) => {
    const target = products.find((p) => p.id === productId);
    if (!target) return;

    saveProduct({
      ...target,
      badge: "",
      price: target.oldPrice || target.price,
      oldPrice: null,
    });
  };

  const activePromos = products.filter((p) => p.badge || p.oldPrice);

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      <div className="flex justify-between items-center border-b border-[#E3ECE6] pb-4">
        <div>
          <h1 className="text-2xl font-display font-black text-[#1E3A2B]">
            Marketing, Promotions & Badges
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Appliquez des prix promotionnels, des badges attractifs et des opérations spéciales
          </p>
        </div>
      </div>

      {success && (
        <div className="p-4 bg-green-50 border border-green-200 text-green-800 text-xs rounded-2xl flex items-center gap-2 shadow-xs animate-in fade-in">
          <CheckCircle2 size={16} className="text-green-600 shrink-0" />
          <span className="font-bold">Promotion appliquée avec succès au produit sélectionné !</span>
        </div>
      )}

      {/* CRÉER UNE PROMO RAPIDE */}
      <div className="bg-white border border-[#E3ECE6] rounded-3xl p-6 sm:p-8 shadow-2xs space-y-5">
        <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-[#3B8A49] flex items-center gap-2">
          <Tag size={16} />
          <span>Créer une Promotion sur un Produit</span>
        </h2>

        <form onSubmit={handleApplyPromo} className="grid sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase text-[#1E3A2B] mb-1 font-mono">
              Produit à promouvoir *
            </label>
            <select
              value={selectedProductId}
              onChange={(e) => {
                setSelectedProductId(e.target.value);
                const p = products.find((prod) => prod.id === e.target.value);
                if (p && p.price) {
                  setPromoPrice(p.price - 500);
                }
              }}
              className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E3ECE6] rounded-xl text-xs font-bold outline-hidden cursor-pointer"
            >
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.price ? `${p.price} FCFA` : "Devis"})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-[#1E3A2B] mb-1 font-mono">
              Badge promotionnel
            </label>
            <input
              type="text"
              value={promoBadge}
              onChange={(e) => setPromoBadge(e.target.value)}
              placeholder="Ex: -15%, Promo Déjeuner, Coup de Cœur"
              required
              className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#E3ECE6] rounded-xl text-xs outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-[#1E3A2B] mb-1 font-mono">
              Nouveau Prix Promo (FCFA)
            </label>
            <input
              type="number"
              value={promoPrice}
              onChange={(e) => setPromoPrice(Number(e.target.value))}
              required
              className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#E3ECE6] rounded-xl text-xs font-black text-[#1E3A2B] outline-hidden"
            />
          </div>

          <div className="sm:col-span-3 flex justify-end pt-2 border-t border-[#E3ECE6]">
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-[#3B8A49] hover:bg-[#2F6F3B] text-white px-6 py-2 rounded-full font-bold text-xs uppercase tracking-wider transition shadow-xs cursor-pointer"
            >
              <Save size={14} />
              <span>Appliquer la promotion</span>
            </button>
          </div>
        </form>
      </div>

      {/* LISTE DES PROMOTIONS ET BADGES ACTIFS */}
      <div className="bg-white border border-[#E3ECE6] rounded-3xl p-6 shadow-2xs space-y-4">
        <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-[#3B8A49]">
          Promotions & Badges Actifs ({activePromos.length})
        </h2>

        {activePromos.length === 0 ? (
          <p className="text-xs text-muted-foreground py-4 text-center">
            Aucune promotion spéciale n'est active actuellement.
          </p>
        ) : (
          <div className="divide-y divide-[#E3ECE6]">
            {activePromos.map((p) => (
              <div key={p.id} className="py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl overflow-hidden bg-gray-50 border border-[#E3ECE6] shrink-0">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="font-bold text-xs text-[#1E3A2B]">{p.name}</div>
                    {p.badge && (
                      <span className="inline-block px-2 py-0.2 rounded-full bg-orange-100 text-[#D96B43] font-bold text-[9.5px]">
                        {p.badge}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right font-display text-xs">
                    <span className="font-black text-[#3B8A49]">{p.price} FCFA</span>
                    {p.oldPrice && (
                      <span className="ml-2 text-[10px] text-muted-foreground line-through">
                        {p.oldPrice} FCFA
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => handleRemovePromo(p.id)}
                    className="p-1.5 rounded-lg text-muted-foreground hover:text-red-600 hover:bg-red-50 transition cursor-pointer"
                    title="Retirer la promotion"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketing;
