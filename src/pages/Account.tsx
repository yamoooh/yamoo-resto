import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  LogOut, 
  ShoppingBag, 
  FileText, 
  ShieldCheck, 
  Save, 
  CheckCircle2, 
  Clock, 
  ChevronRight,
  Sparkles
} from "lucide-react";
import { supabase } from "../integrations/supabase/client";

export const Account = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      const meta = user.user_metadata || {};
      setFullName(meta.full_name || "");
      setPhone(meta.phone || "");
      const savedAddr = localStorage.getItem("yamooh_delivery_address") || meta.address || "";
      setAddress(savedAddr);
    }
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);

    try {
      if (address.trim()) {
        localStorage.setItem("yamooh_delivery_address", address.trim());
      }

      await supabase.auth.updateUser({
        data: {
          full_name: fullName.trim(),
          phone: phone.trim(),
          address: address.trim(),
        },
      });

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    } catch (err) {
      console.error("Error updating profile:", err);
    } finally {
      setIsSaving(false);
    }
  };

  if (!user) {
    return (
      <section className="container-tight py-16 text-center max-w-md">
        <div className="bg-white dark:bg-[#15241C] border border-border/80 rounded-3xl p-8 sm:p-10 shadow-card space-y-6">
          <div className="w-16 h-16 rounded-full bg-[#EBF4EE] dark:bg-white/10 text-[#3B8A49] flex items-center justify-center mx-auto shadow-2xs">
            <User size={32} />
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl font-display font-black tracking-tight text-foreground">
              Espace Client YAMOOH
            </h1>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Connectez-vous pour retrouver vos informations enregistrées, suivre vos devis et passer commande plus rapidement.
            </p>
          </div>
          <div className="space-y-2 pt-2">
            <Link
              to="/auth?tab=login"
              className="w-full bg-[#3B8A49] hover:bg-[#2F6F3B] text-white py-3.5 rounded-full font-bold text-xs uppercase tracking-wider transition shadow-soft flex items-center justify-center gap-2"
            >
              <span>Se connecter</span>
            </Link>
            <Link
              to="/auth?tab=register"
              className="w-full bg-secondary/60 hover:bg-secondary text-foreground py-3 rounded-full font-bold text-xs transition flex items-center justify-center border border-border"
            >
              <span>Créer un nouveau compte</span>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const displayName = fullName || user.email?.split("@")[0] || "Client YAMOOH";
  const memberSince = user.created_at
    ? new Date(user.created_at).toLocaleDateString("fr-FR", { month: "long", year: "numeric" })
    : "Récemment";

  return (
    <section className="container-tight py-10 sm:py-14 max-w-4xl space-y-8">
      {/* 1. Carte En-tête Profil */}
      <div className="bg-white dark:bg-[#15241C] border border-border/80 rounded-3xl p-6 sm:p-8 shadow-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[#3B8A49] text-white font-display font-black text-2xl flex items-center justify-center shadow-soft shrink-0">
            {displayName.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-display font-black text-foreground">
                Bonjour, {displayName}
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold text-[#3B8A49] bg-[#EBF4EE] dark:bg-white/10 px-2 py-0.5 rounded-full uppercase tracking-wider">
                <ShieldCheck size={12} /> Compte Vérifié
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">{user.email}</p>
            <p className="text-[11px] text-muted-foreground/80 mt-1">
              Membre YAMOOH depuis {memberSince}
            </p>
          </div>
        </div>

        <button
          onClick={handleSignOut}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-red-200 dark:border-red-900/40 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 font-bold text-xs transition cursor-pointer self-stretch sm:self-auto justify-center"
        >
          <LogOut size={14} />
          <span>Se déconnecter</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 2. Colonne Formulaire : Informations Personnelles (2 cols) */}
        <div className="lg:col-span-2 bg-white dark:bg-[#15241C] border border-border/80 rounded-3xl p-6 sm:p-8 shadow-card space-y-6">
          <div className="flex items-center justify-between border-b border-border/70 pb-4">
            <div>
              <h2 className="font-display font-black text-lg text-foreground">
                Informations personnelles
              </h2>
              <p className="text-xs text-muted-foreground">
                Ces coordonnées serviront lors de vos commandes et livraisons à Douala.
              </p>
            </div>
          </div>

          {saveSuccess && (
            <div className="p-3.5 bg-[#EBF4EE] dark:bg-green-950/40 text-[#2F6F3B] dark:text-green-300 text-xs rounded-2xl border border-[#3B8A49]/30 flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 size={16} className="shrink-0 text-[#3B8A49]" />
              <span>Vos informations ont été enregistrées avec succès.</span>
            </div>
          )}

          <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-foreground mb-1">
                  Nom complet
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Votre nom et prénom"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-secondary/20 dark:bg-white/5 focus:outline-none focus:border-[#3B8A49] text-xs text-foreground"
                  />
                  <User size={15} className="absolute left-3 top-3 text-muted-foreground" />
                </div>
              </div>

              <div>
                <label className="block font-bold text-foreground mb-1">
                  Téléphone
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+237 6XX XX XX XX"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-secondary/20 dark:bg-white/5 focus:outline-none focus:border-[#3B8A49] text-xs text-foreground"
                  />
                  <Phone size={15} className="absolute left-3 top-3 text-muted-foreground" />
                </div>
              </div>
            </div>

            <div>
              <label className="block font-bold text-foreground mb-1">
                Adresse e-mail (identifiant de connexion)
              </label>
              <div className="relative">
                <input
                  type="email"
                  disabled
                  value={user.email || ""}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border/60 bg-secondary/40 text-muted-foreground text-xs cursor-not-allowed"
                />
                <Mail size={15} className="absolute left-3 top-3 text-muted-foreground" />
              </div>
            </div>

            <div>
              <label className="block font-bold text-foreground mb-1">
                Adresse ou quartier habituel de livraison à Douala
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Ex : Bonanjo, Rue des Cocotiers / Retrait Kotto"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-secondary/20 dark:bg-white/5 focus:outline-none focus:border-[#3B8A49] text-xs text-foreground"
                />
                <MapPin size={15} className="absolute left-3 top-3 text-muted-foreground" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className="bg-[#3B8A49] hover:bg-[#2F6F3B] disabled:opacity-75 text-white px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition shadow-soft inline-flex items-center gap-2 cursor-pointer"
            >
              <Save size={14} />
              <span>{isSaving ? "Enregistrement..." : "Enregistrer les modifications"}</span>
            </button>
          </form>
        </div>

        {/* 3. Colonne Accès Rapides & Avantages (1 col) */}
        <div className="space-y-6">
          {/* Raccourcis de commande */}
          <div className="bg-white dark:bg-[#15241C] border border-border/80 rounded-3xl p-6 shadow-card space-y-4">
            <h3 className="font-display font-black text-sm uppercase tracking-wider text-foreground">
              Services & Commandes
            </h3>
            <div className="space-y-2 text-xs">
              <Link
                to="/builder"
                className="flex items-center justify-between p-3 rounded-2xl bg-[#EBF4EE] dark:bg-white/5 border border-[#3B8A49]/30 hover:border-[#3B8A49] text-[#3B8A49] dark:text-white transition group"
              >
                <div className="flex items-center gap-2.5">
                  <Sparkles size={16} className="text-[#3B8A49]" />
                  <span className="font-bold">Composer ma salade</span>
                </div>
                <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <Link
                to="/notre-carte"
                className="flex items-center justify-between p-3 rounded-2xl bg-secondary/30 hover:bg-secondary border border-border transition group"
              >
                <div className="flex items-center gap-2.5">
                  <ShoppingBag size={16} className="text-muted-foreground" />
                  <span className="font-bold text-foreground">Consulter la carte</span>
                </div>
                <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <Link
                to="/devis"
                className="flex items-center justify-between p-3 rounded-2xl bg-secondary/30 hover:bg-secondary border border-border transition group"
              >
                <div className="flex items-center gap-2.5">
                  <FileText size={16} className="text-[#D96B43]" />
                  <span className="font-bold text-foreground">Demander un devis traiteur</span>
                </div>
                <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Statut des commandes */}
          <div className="bg-white dark:bg-[#15241C] border border-border/80 rounded-3xl p-6 shadow-card space-y-3">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-[#3B8A49]" />
              <h3 className="font-display font-black text-sm uppercase tracking-wider text-foreground">
                Historique des commandes
              </h3>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Vos commandes récentes et devis validés via WhatsApp et en ligne sont associés à votre compte YAMOOH.
            </p>
            <div className="p-3 bg-secondary/30 rounded-2xl border border-border text-[11px] text-muted-foreground text-center">
              Aucune commande en attente. Vos prochaines commandes apparaîtront ici.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Account;
