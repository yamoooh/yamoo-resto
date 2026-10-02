import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Send, PhoneCall, AlertCircle } from "lucide-react";
import Breadcrumb from "../components/Breadcrumb";

export const Devis = () => {
  const WHATSAPP = "237658254509";

  const [form, setForm] = useState({
    nom: "",
    entreprise: "",
    telephone: "",
    email: "",
    typeEvenement: "Séminaire d'entreprise",
    nombrePersonnes: "15-30 personnes",
    date: "",
    heure: "",
    lieu: "",
    budget: "",
    besoins: "Plateaux repas individuels",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nom.trim() || !form.telephone.trim() || !form.date.trim()) {
      setError("Veuillez renseigner au minimum votre nom, téléphone et la date souhaitée.");
      return;
    }

    setError("");

    const text =
      `🌿 *DEMANDE DE DEVIS TRAITEUR — YAMOOH DOUALA*\n` +
      `──────────────────────────\n\n` +
      `👤 *Nom :* ${form.nom}\n` +
      (form.entreprise ? `🏢 *Entreprise :* ${form.entreprise}\n` : "") +
      `📞 *Téléphone :* ${form.telephone}\n` +
      (form.email ? `✉️ *Email :* ${form.email}\n` : "") +
      `🎉 *Type d'événement :* ${form.typeEvenement}\n` +
      `👥 *Nombre de personnes :* ${form.nombrePersonnes}\n` +
      `📅 *Date souhaitée :* ${form.date}\n` +
      (form.heure ? `⏰ *Heure :* ${form.heure}\n` : "") +
      (form.lieu ? `📍 *Lieu / Quartier :* ${form.lieu}\n` : "") +
      (form.budget ? `💰 *Budget indicatif :* ${form.budget}\n` : "") +
      `🍽️ *Format souhaité :* ${form.besoins}\n` +
      (form.message ? `📝 *Précisions :* ${form.message}\n` : "");

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${WHATSAPP}?text=${encoded}`, "_blank");
    setIsSubmitted(true);
  };

  return (
    <>
      <title>Demander un devis traiteur à Douala | YAMMOH</title>
      <meta
        name="description"
        content="Besoin d'une prestation traiteur à Douala ? Décrivez votre événement, votre nombre de personnes et vos besoins et échangez avec YAMMOH."
      />
      <link rel="canonical" href="https://yamooh.com/devis" />

      {/* HERO */}
      <section className="bg-[#1E3A2B] text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="container-tight relative z-10 text-center max-w-3xl mx-auto">
          <div className="mb-4 flex justify-center">
            <Breadcrumb items={[{ label: "Demander un devis" }]} />
          </div>

          <span className="inline-block bg-white/10 text-[#F2B705] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-white/15 font-mono">
            Devis Traiteur & Événements
          </span>

          <h1 className="text-4xl sm:text-5xl font-display font-black tracking-tight mb-4">
            Parlez-nous de votre événement.
          </h1>

          <p className="text-white/85 text-base sm:text-lg leading-relaxed font-light mb-8">
            Chaque événement est différent. Donnez-nous les informations essentielles afin que nous puissions comprendre votre besoin et échanger avec vous sur une solution adaptée.
          </p>
        </div>
      </section>

      {/* FORMULAIRE */}
      <section className="container-tight py-12 lg:py-16 max-w-3xl mx-auto">
        {isSubmitted ? (
          <div className="bg-card border border-border rounded-3xl p-8 sm:p-12 text-center shadow-card space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#E3ECE6] text-[#1E3A2B] flex items-center justify-center mx-auto mb-2">
              <CheckCircle2 size={36} />
            </div>
            <h2 className="text-2xl font-display font-bold text-foreground">
              Merci pour votre demande.
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-lg mx-auto">
              Votre demande a bien été transmise à YAMOOH. Nous pourrons échanger avec vous afin de préciser les détails de votre projet.
            </p>
            <div className="pt-4 flex justify-center gap-3">
              <button
                onClick={() => setIsSubmitted(false)}
                className="bg-[#1E3A2B] text-white text-xs font-bold px-6 py-3 rounded-full hover:bg-[#162B20] transition"
              >
                Envoyer une autre demande
              </button>
              <Link
                to="/"
                className="border border-border text-foreground text-xs font-bold px-6 py-3 rounded-full hover:bg-muted transition"
              >
                Retour à l'accueil
              </Link>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-card border border-border rounded-3xl p-6 sm:p-10 shadow-card space-y-6 text-xs text-foreground"
          >
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-2">
                <AlertCircle size={16} className="shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Coordonnées */}
            <div className="space-y-4">
              <h3 className="text-base font-display font-bold text-[#1E3A2B] border-b border-border pb-2">
                Vos Coordonnées
              </h3>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold mb-1">Nom & Prénom *</label>
                  <input
                    type="text"
                    required
                    value={form.nom}
                    onChange={(e) => setForm({ ...form, nom: e.target.value })}
                    placeholder="Ex: Jean Paul"
                    className="w-full p-3 rounded-xl border border-border bg-background focus:outline-none focus:border-[#1E3A2B]"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Entreprise / Organisation</label>
                  <input
                    type="text"
                    value={form.entreprise}
                    onChange={(e) => setForm({ ...form, entreprise: e.target.value })}
                    placeholder="Ex: Société S.A. (facultatif)"
                    className="w-full p-3 rounded-xl border border-border bg-background focus:outline-none focus:border-[#1E3A2B]"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold mb-1">Téléphone (WhatsApp) *</label>
                  <input
                    type="tel"
                    required
                    value={form.telephone}
                    onChange={(e) => setForm({ ...form, telephone: e.target.value })}
                    placeholder="Ex: +237 6xx xx xx xx"
                    className="w-full p-3 rounded-xl border border-border bg-background focus:outline-none focus:border-[#1E3A2B]"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="Ex: contact@entreprise.com"
                    className="w-full p-3 rounded-xl border border-border bg-background focus:outline-none focus:border-[#1E3A2B]"
                  />
                </div>
              </div>
            </div>

            {/* Détails Événement */}
            <div className="space-y-4 pt-2">
              <h3 className="text-base font-display font-bold text-[#1E3A2B] border-b border-border pb-2">
                Détails de l'Événement
              </h3>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold mb-1">Type d'événement</label>
                  <select
                    value={form.typeEvenement}
                    onChange={(e) => setForm({ ...form, typeEvenement: e.target.value })}
                    className="w-full p-3 rounded-xl border border-border bg-background focus:outline-none focus:border-[#1E3A2B]"
                  >
                    <option value="Séminaire d'entreprise">Séminaire / Formation</option>
                    <option value="Réunion de direction">Réunion de travail / Comité</option>
                    <option value="Cocktail / Soirée privée">Cocktail / Soirée privée</option>
                    <option value="Mariage">Mariage</option>
                    <option value="Anniversaire">Anniversaire</option>
                    <option value="Lancement de produit">Lancement de produit</option>
                    <option value="Autre événement">Autre besoin</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold mb-1">Nombre de personnes</label>
                  <input
                    type="text"
                    value={form.nombrePersonnes}
                    onChange={(e) => setForm({ ...form, nombrePersonnes: e.target.value })}
                    placeholder="Ex: 25 personnes"
                    className="w-full p-3 rounded-xl border border-border bg-background focus:outline-none focus:border-[#1E3A2B]"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold mb-1">Date souhaitée *</label>
                  <input
                    type="date"
                    required
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full p-3 rounded-xl border border-border bg-background focus:outline-none focus:border-[#1E3A2B]"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Heure de service</label>
                  <input
                    type="text"
                    value={form.heure}
                    onChange={(e) => setForm({ ...form, heure: e.target.value })}
                    placeholder="Ex: 12h30"
                    className="w-full p-3 rounded-xl border border-border bg-background focus:outline-none focus:border-[#1E3A2B]"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Lieu / Quartier à Douala</label>
                  <input
                    type="text"
                    value={form.lieu}
                    onChange={(e) => setForm({ ...form, lieu: e.target.value })}
                    placeholder="Ex: Bonanjo, Akwa..."
                    className="w-full p-3 rounded-xl border border-border bg-background focus:outline-none focus:border-[#1E3A2B]"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold mb-1">Besoins / Format principal</label>
                  <select
                    value={form.besoins}
                    onChange={(e) => setForm({ ...form, besoins: e.target.value })}
                    className="w-full p-3 rounded-xl border border-border bg-background focus:outline-none focus:border-[#1E3A2B]"
                  >
                    <option value="Plateaux repas individuels">Plateaux repas individuels</option>
                    <option value="Buffet salades & plats partagés">Buffet salades & plats partagés</option>
                    <option value="Cocktail finger food & bouchées">Cocktail finger food & bouchées</option>
                    <option value="Pause café / Petit-déjeuner">Pause café / Petit-déjeuner</option>
                    <option value="Formule sur-mesure">Formule sur-mesure / À définir</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold mb-1">Budget indicatif (facultatif)</label>
                  <input
                    type="text"
                    value={form.budget}
                    onChange={(e) => setForm({ ...form, budget: e.target.value })}
                    placeholder="Ex: 150 000 FCFA"
                    className="w-full p-3 rounded-xl border border-border bg-background focus:outline-none focus:border-[#1E3A2B]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1">Précisions ou Message</label>
                <textarea
                  rows={3}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Régimes alimentaires particuliers, contraintes d'accès, besoins en matériel..."
                  className="w-full p-3 rounded-xl border border-border bg-background focus:outline-none focus:border-[#1E3A2B]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#D96B43] hover:bg-[#c45b34] text-white py-4 rounded-full font-bold text-sm transition shadow-soft flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <Send size={16} />
              <span>ENVOYER MA DEMANDE</span>
            </button>
          </form>
        )}
      </section>
    </>
  );
};

export default Devis;
