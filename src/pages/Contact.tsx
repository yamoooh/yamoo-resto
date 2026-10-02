import { useState } from "react";
import { Link } from "react-router-dom";
import { MessageCircle, Phone, Mail, MapPin, Clock, ChefHat, HelpCircle, FileText, CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react";
import Breadcrumb from "../components/Breadcrumb";
import GoogleMapLocation from "../components/GoogleMapLocation";

export const Contact = () => {
  const WHATSAPP = "237658254509";
  const [form, setForm] = useState({ name: "", phone: "", subject: "Information Générale", message: "" });
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.message.trim()) {
      setError("Veuillez remplir tous les champs obligatoires.");
      return;
    }
    setError("");
    const text = `🌿 *CONTACT / MESSAGE CLIENT — YAMOOH DOUALA*\n──────────────────────────\n\n👤 *Nom :* ${form.name}\n📞 *Téléphone :* ${form.phone}\n📌 *Objet :* ${form.subject}\n💬 *Message :*\n${form.message}`;
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <>
      <title>Contact & Service Client | YAMOOH Douala — Pharmacie Kotto</title>
      <meta
        name="description"
        content="Contactez YAMOOH à Douala. Commande WhatsApp, retrait à la Pharmacie Kotto, devis traiteur événementiel et assistance client."
      />
      <link rel="canonical" href="https://yamooh.com/contact" />

      {/* HERO */}
      <section className="bg-[#1E3A2B] text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="container-tight relative z-10 text-center max-w-3xl mx-auto">
          <div className="mb-4 flex justify-center">
            <Breadcrumb items={[{ label: "Contact & Aide" }]} />
          </div>

          <span className="inline-block bg-white/10 text-[#F2B705] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-white/15 font-mono">
            À Votre Écoute
          </span>

          <h1 className="text-4xl sm:text-5xl font-display font-black tracking-tight mb-4">
            Contact & Service Client YAMOOH
          </h1>

          <p className="text-white/85 text-base sm:text-lg leading-relaxed font-light">
            Une question sur notre carte, une commande en cours ou un besoin spécifique à Douala ? Échangez directement avec notre équipe.
          </p>
        </div>

        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#F2B705_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      </section>

      {/* CONTENU PRINCIPAL */}
      <section className="container-tight py-12 lg:py-16">
        {/* RACCOURCIS RAPIDES */}
        <div className="grid sm:grid-cols-3 gap-6 mb-12">
          <Link
            to="/devis"
            className="bg-white border border-border rounded-3xl p-6 shadow-2xs hover:shadow-card transition flex items-center gap-4 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#FAF0D8] text-[#D96B43] flex items-center justify-center shrink-0">
              <FileText size={22} />
            </div>
            <div>
              <h3 className="font-display font-bold text-foreground group-hover:text-[#D96B43] transition text-base">
                Devis Traiteur
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">Demandez une estimation pour vos événements</p>
            </div>
          </Link>

          <Link
            to="/faq"
            className="bg-white border border-border rounded-3xl p-6 shadow-2xs hover:shadow-card transition flex items-center gap-4 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#E3ECE6] text-[#1E3A2B] flex items-center justify-center shrink-0">
              <HelpCircle size={22} />
            </div>
            <div>
              <h3 className="font-display font-bold text-foreground group-hover:text-[#1E3A2B] transition text-base">
                Foire Aux Questions
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">Réponses rapides sur la livraison et le retrait</p>
            </div>
          </Link>

          <Link
            to="/builder"
            className="bg-white border border-border rounded-3xl p-6 shadow-2xs hover:shadow-card transition flex items-center gap-4 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#FAF7F2] text-[#D96B43] flex items-center justify-center shrink-0">
              <ChefHat size={22} />
            </div>
            <div>
              <h3 className="font-display font-bold text-foreground group-hover:text-[#D96B43] transition text-base">
                Salad Builder
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">Créez votre propre salade sur-mesure</p>
            </div>
          </Link>
        </div>

        {/* COORDONNÉES + FORMULAIRE */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* COORDONNÉES */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-card border border-border rounded-3xl p-8 shadow-card space-y-5 text-sm">
              <h2 className="text-2xl font-display font-bold text-[#1E3A2B]">
                Nos Coordonnées
              </h2>
              
              <div className="space-y-4 text-xs sm:text-sm text-foreground">
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-xl bg-[#E3ECE6] text-[#1E3A2B] flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <strong className="block font-bold">Adresse & Retrait :</strong>
                    <span className="text-muted-foreground">Pharmacie Kotto, Douala, Cameroun</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-xl bg-[#FAF0D8] text-[#D96B43] flex items-center justify-center shrink-0 mt-0.5">
                    <Phone size={16} />
                  </div>
                  <div>
                    <strong className="block font-bold">Téléphone & WhatsApp :</strong>
                    <span className="text-muted-foreground">+237 658 254 509</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-xl bg-[#E3ECE6] text-[#1E3A2B] flex items-center justify-center shrink-0 mt-0.5">
                    <Clock size={16} />
                  </div>
                  <div>
                    <strong className="block font-bold">Horaires d'ouverture :</strong>
                    <span className="text-muted-foreground">Du Lundi au Samedi : 10h00 – 21h00</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border space-y-3">
                <a
                  href={`https://wa.me/${WHATSAPP}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white px-6 py-3.5 rounded-full font-bold text-xs shadow-soft transition"
                >
                  <MessageCircle size={18} />
                  <span>Discussion WhatsApp instantanée</span>
                </a>
              </div>
            </div>

            {/* ENCART GARANTIE */}
            <div className="bg-[#FAF8F5] border border-border p-6 rounded-3xl flex items-center gap-4">
              <ShieldCheck size={28} className="text-[#1E3A2B] shrink-0" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                <strong>Réponse garantie sous 15 minutes</strong> pendant les heures de service pour toute commande ou demande urgente.
              </p>
            </div>
          </div>

          {/* FORMULAIRE DIRECT */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="bg-card border border-border rounded-3xl p-8 sm:p-10 shadow-card space-y-5 text-xs">
              <div>
                <span className="text-[10px] font-bold font-mono uppercase tracking-widest text-[#D96B43]">
                  Formulaire Rapide
                </span>
                <h2 className="text-2xl font-display font-bold text-[#1E3A2B] mt-0.5">
                  Envoyez-nous un message
                </h2>
                <p className="text-muted-foreground text-xs mt-1">
                  Remplissez ce formulaire pour être mis en relation directement sur notre canal officiel.
                </p>
              </div>

              {error && <div className="p-3 bg-red-50 text-red-700 rounded-xl border border-red-200">{error}</div>}

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold mb-1.5 text-foreground">Votre Nom complet *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Ex: Paul M."
                    className="w-full p-3.5 rounded-2xl border border-border bg-background focus:outline-none focus:border-[#1E3A2B] transition text-xs"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1.5 text-foreground">Votre Numéro de Téléphone *</label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="Ex: +237 6xx xx xx xx"
                    className="w-full p-3.5 rounded-2xl border border-border bg-background focus:outline-none focus:border-[#1E3A2B] transition text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1.5 text-foreground">Objet de votre demande</label>
                <select
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full p-3.5 rounded-2xl border border-border bg-background focus:outline-none focus:border-[#1E3A2B] transition text-xs font-medium"
                >
                  <option value="Information Générale">Information Générale sur la carte</option>
                  <option value="Suivi de commande">Suivi de commande du jour</option>
                  <option value="Devis Traiteur / Événement">Devis Traiteur / Événement professionnel</option>
                  <option value="Partenariat / Fournisseur">Partenariat maraîcher / Fournisseur</option>
                  <option value="Autre demande">Autre demande spécifique</option>
                </select>
              </div>

              <div>
                <label className="block font-bold mb-1.5 text-foreground">Votre Message *</label>
                <textarea
                  rows={5}
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Écrivez votre message ou vos précisions ici..."
                  className="w-full p-3.5 rounded-2xl border border-border bg-background focus:outline-none focus:border-[#1E3A2B] transition text-xs leading-relaxed"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#1E3A2B] hover:bg-[#D96B43] text-white py-4 rounded-full font-bold text-xs uppercase tracking-wider transition shadow-elevated cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Envoyer directement sur WhatsApp</span>
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>

        {/* SECTION GOOGLE MAPS INTERACTIVE */}
        <div className="pt-16 border-t border-border">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[#D96B43] text-xs uppercase tracking-widest font-bold font-mono">
              Localisation & Retrait
            </span>
            <h2 className="text-3xl font-display font-bold text-[#1E3A2B] mt-1">
              Plan d'Accès Google Maps
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Pharmacie Kotto, Douala • Point de retrait Click & Collect & Cuisine Centrale.
            </p>
          </div>

          <GoogleMapLocation showDetails={true} ratio="16/9" />
        </div>
      </section>
    </>
  );
};

export default Contact;
