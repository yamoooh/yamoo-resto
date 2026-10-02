import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { 
  Trash2, 
  Plus, 
  Minus, 
  MessageCircle, 
  ShoppingBag, 
  ArrowLeft, 
  ChefHat, 
  MapPin, 
  Clock, 
  CheckCircle2,
  AlertCircle
} from "lucide-react";

export const Cart = () => {
  const { items, setQty, remove, total, clear } = useCart();
  const navigate = useNavigate();

  const [deliveryMode, setDeliveryMode] = useState<"delivery" | "pickup">("delivery");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const WHATSAPP_NUMBER = "237658254509";

  const handleCheckout = () => {
    if (items.length === 0) return;

    if (!name.trim() || !phone.trim()) {
      setErrorMsg("Veuillez renseigner votre nom et votre numéro de téléphone.");
      return;
    }

    if (deliveryMode === "delivery" && !address.trim()) {
      setErrorMsg("Veuillez indiquer votre quartier ou adresse de livraison à Douala.");
      return;
    }

    setErrorMsg("");

    // Construction du message WhatsApp
    const articlesLines = items
      .map(
        (item) =>
          `• *${item.qty}x* ${item.name} — ${(item.price * item.qty).toLocaleString("fr-FR")} FCFA${
            item.description ? `\n   _${item.description}_` : ""
          }`
      )
      .join("\n\n");

    const message =
      `🌿 *NOUVELLE COMMANDE — YAMOOH DOUALA*\n` +
      `──────────────────────────\n\n` +
      `👤 *Client :* ${name}\n` +
      `📞 *Téléphone :* ${phone}\n` +
      `📦 *Mode :* ${deliveryMode === "delivery" ? "🚀 Livraison à domicile/bureau" : "🏪 Retrait Click & Collect (Pharmacie Kotto)"}\n` +
      (deliveryMode === "delivery" ? `📍 *Adresse/Quartier :* ${address}\n` : "") +
      (notes.trim() ? `📝 *Précisions :* ${notes}\n` : "") +
      `\n🛒 *DÉTAIL DU PANIER :*\n` +
      `${articlesLines}\n\n` +
      `──────────────────────────\n` +
      `💰 *TOTAL À RÉGLER : ${total.toLocaleString("fr-FR")} FCFA*\n` +
      `──────────────────────────\n` +
      `_Paiement à la réception (Espèces, Orange Money, MTN MoMo)_`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
    clear();
    navigate("/");
  };

  return (
    <>
      {/* SEO */}
      <title>Mon Panier | YAMOOH Douala — Commande Directe WhatsApp</title>
      <meta
        name="description"
        content="Finalisez votre commande de salades fraîches et jus naturels Yamooh. Retrait à la Pharmacie Kotto ou livraison partout à Douala."
      />

      <section className="container-tight py-12 lg:py-16 max-w-5xl">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
          <div>
            <span className="text-xs uppercase font-mono tracking-widest font-bold text-[#D96B43]">
              Récapitulatif
            </span>
            <h1 className="text-3xl sm:text-4xl font-display font-black text-foreground mt-1">
              Mon Panier Gourmand
            </h1>
          </div>
          <Link
            to="/carte"
            className="text-xs font-bold text-muted-foreground hover:text-foreground flex items-center gap-1.5 transition"
          >
            <ArrowLeft size={16} /> Continuer mes achats
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="bg-card border border-border rounded-3xl p-12 text-center shadow-card max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#E3ECE6] text-[#1E3A2B] flex items-center justify-center mx-auto mb-4">
              <ShoppingBag size={32} />
            </div>
            <h2 className="text-xl font-display font-bold text-foreground mb-2">
              Votre panier est actuellement vide
            </h2>
            <p className="text-xs text-muted-foreground mb-6 leading-relaxed">
              Laissez-vous tenter par l'une de nos 8 salades signatures ou composez votre propre bol sur-mesure !
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                to="/signature"
                className="bg-[#1E3A2B] hover:bg-[#162B20] text-white px-6 py-3 rounded-full text-xs font-bold transition"
              >
                Découvrir les Signatures
              </Link>
              <Link
                to="/builder"
                className="bg-[#D96B43] hover:bg-[#c45b34] text-white px-6 py-3 rounded-full text-xs font-bold transition flex items-center gap-1.5"
              >
                <ChefHat size={15} /> Composer ma salade
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* LISTE DES ARTICLES (7 COLS) */}
            <div className="lg:col-span-7 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-card border border-border rounded-3xl p-5 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1 flex-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#D96B43] bg-[#FAF0D8] px-2 py-0.5 rounded-full">
                      {item.category || "Plat"}
                    </span>
                    <h3 className="font-display font-bold text-base text-foreground">
                      {item.name}
                    </h3>
                    {item.description && (
                      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    )}
                    <p className="text-sm font-bold text-[#1E3A2B]">
                      {(item.price * item.qty).toLocaleString("fr-FR")} FCFA
                      <span className="text-xs text-muted-foreground font-normal ml-1">
                        ({item.price.toLocaleString("fr-FR")} FCFA / unité)
                      </span>
                    </p>
                  </div>

                  {/* Contrôles de quantité */}
                  <div className="flex items-center justify-between sm:justify-end gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-border">
                    <div className="flex items-center gap-2 bg-[#FAF7F2] border border-border rounded-full px-3 py-1">
                      <button
                        onClick={() => setQty(item.id, item.qty - 1)}
                        className="text-muted-foreground hover:text-foreground p-0.5 cursor-pointer"
                        title="Diminuer"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-xs font-bold px-1.5 text-foreground">{item.qty}</span>
                      <button
                        onClick={() => setQty(item.id, item.qty + 1)}
                        className="text-muted-foreground hover:text-foreground p-0.5 cursor-pointer"
                        title="Augmenter"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <button
                      onClick={() => remove(item.id)}
                      className="text-muted-foreground hover:text-red-600 p-2 rounded-full hover:bg-red-50 transition cursor-pointer"
                      title="Supprimer"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}

              <div className="pt-2 flex justify-between items-center text-xs text-muted-foreground">
                <button
                  onClick={clear}
                  className="text-red-600 hover:underline flex items-center gap-1 cursor-pointer font-semibold"
                >
                  <Trash2 size={14} /> Vider le panier
                </button>
                <span>{items.reduce((s, i) => s + i.qty, 0)} article(s) au total</span>
              </div>
            </div>

            {/* FORMULAIRE DE COMMANDE WHATSAPP (5 COLS) */}
            <div className="lg:col-span-5 bg-[#FAF7F2] border border-border rounded-3xl p-6 sm:p-8 shadow-card">
              <h2 className="font-display font-bold text-xl text-[#1E3A2B] pb-4 border-b border-border mb-6">
                Validation de Commande
              </h2>

              {errorMsg && (
                <div className="mb-4 p-3 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle size={16} className="shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Mode de réception */}
              <div className="mb-6">
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                  Mode de réception
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setDeliveryMode("delivery")}
                    className={`p-3 rounded-2xl border text-xs font-bold text-left transition cursor-pointer ${
                      deliveryMode === "delivery"
                        ? "border-[#1E3A2B] bg-[#1E3A2B] text-white"
                        : "border-border bg-white text-foreground hover:bg-muted"
                    }`}
                  >
                    🚀 Livraison Douala
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeliveryMode("pickup")}
                    className={`p-3 rounded-2xl border text-xs font-bold text-left transition cursor-pointer ${
                      deliveryMode === "pickup"
                        ? "border-[#1E3A2B] bg-[#1E3A2B] text-white"
                        : "border-border bg-white text-foreground hover:bg-muted"
                    }`}
                  >
                    🏪 Retrait Kotto
                  </button>
                </div>
              </div>

              {/* Coordonnées */}
              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-foreground mb-1">
                    Votre Nom complet *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Paul Mbarga"
                    className="w-full p-3 rounded-2xl border border-border bg-white text-foreground focus:outline-none focus:border-[#1E3A2B]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-foreground mb-1">
                    Numéro de Téléphone (WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Ex: +237 658 254 509"
                    className="w-full p-3 rounded-2xl border border-border bg-white text-foreground focus:outline-none focus:border-[#1E3A2B]"
                  />
                </div>

                {deliveryMode === "delivery" ? (
                  <div>
                    <label className="block font-bold text-foreground mb-1">
                      Quartier & Précision de livraison (Douala) *
                    </label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Ex: Bonapriso, Immeuble Horizon, 2e étage"
                      className="w-full p-3 rounded-2xl border border-border bg-white text-foreground focus:outline-none focus:border-[#1E3A2B]"
                    />
                  </div>
                ) : (
                  <div className="p-3 bg-[#E3ECE6] rounded-2xl text-xs text-[#1E3A2B]">
                    <span className="font-bold block mb-0.5">Point de retrait :</span>
                    Pharmacie Kotto, Douala (Ouvert Lun–Sam 10h00–21h00). Commande prête en ~20 min.
                  </div>
                )}

                <div>
                  <label className="block font-bold text-foreground mb-1">
                    Notes particulières (sauce à part, sans oignon...)
                  </label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Ex: Sauce à part s'il vous plaît"
                    className="w-full p-3 rounded-2xl border border-border bg-white text-foreground focus:outline-none focus:border-[#1E3A2B]"
                  />
                </div>
              </div>

              {/* Total & Bouton WhatsApp */}
              <div className="pt-6 border-t border-border mt-6 space-y-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs uppercase font-bold text-muted-foreground">Sous-total :</span>
                  <span className="text-2xl font-display font-black text-[#1E3A2B]">
                    {total.toLocaleString("fr-FR")} FCFA
                  </span>
                </div>

                <p className="text-[11px] text-muted-foreground">
                  💳 Règlement à réception (Espèces, Orange Money, MTN MoMo).
                </p>

                <button
                  onClick={handleCheckout}
                  className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-4 rounded-full font-bold text-sm flex items-center justify-center gap-2.5 transition-all shadow-elevated hover:scale-[1.02] active:scale-95 cursor-pointer"
                >
                  <MessageCircle size={20} />
                  <span>Envoyer la commande via WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Cart;
