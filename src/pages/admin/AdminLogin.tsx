import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Shield, ArrowRight, Lock, Mail, AlertCircle, Sparkles, Eye, EyeOff, UserPlus, User, CheckCircle2 } from "lucide-react";
import { useAdminAuth } from "../../contexts/AdminAuthContext";
import { useData } from "../../contexts/DataContext";

export const AdminLogin: React.FC = () => {
  const { login, setupFirstAdmin } = useAdminAuth();
  const { admins } = useData();
  const navigate = useNavigate();

  // If no admin exists in the database, allow first-setup mode
  const canCreateFirstAdmin = admins.length === 0;

  // Active form mode: "login" or "setup" (only possible if canCreateFirstAdmin)
  const [mode, setMode] = useState<"login" | "setup">(canCreateFirstAdmin ? "setup" : "login");

  // Login fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Setup fields
  const [setupName, setSetupName] = useState("Direction YAMOOH");
  const [setupEmail, setSetupEmail] = useState("admin@yamooh.com");
  const [setupPassword, setSetupPassword] = useState("");
  const [setupConfirmPassword, setSetupConfirmPassword] = useState("");
  const [showSetupPassword, setShowSetupPassword] = useState(false);
  const [showSetupConfirmPassword, setShowSetupConfirmPassword] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      navigate("/admin");
    } else {
      setError(res.error || "Identifiants administrateur incorrects.");
    }
  };

  const handleSetupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!setupName.trim() || !setupEmail.trim() || !setupPassword) {
      setError("Veuillez renseigner tous les champs obligatoires.");
      return;
    }

    if (setupPassword.length < 6) {
      setError("Le mot de passe doit comporter au moins 6 caractères.");
      return;
    }

    if (setupPassword !== setupConfirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    setLoading(true);
    const res = await setupFirstAdmin(setupName.trim(), setupEmail.trim(), setupPassword);
    setLoading(false);

    if (res.success) {
      navigate("/admin");
    } else {
      setError(res.error || "Erreur lors de l'initialisation du premier administrateur.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAF9] flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-white border border-[#E3ECE6] rounded-3xl p-8 shadow-xl">
        {/* LOGO OFFICIEL & TITRE */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <img
              src="/assets/logo-yamooh-official.png"
              alt="Logo Officiel YAMOOH"
              className="h-16 w-auto object-contain drop-shadow-xs"
            />
          </div>
          <span className="text-[10px] font-mono uppercase px-3 py-1 rounded-full bg-[#EBF4EE] text-[#3B8A49] font-bold">
            Espace Sécurisé
          </span>
          <h1 className="text-2xl font-display font-black text-[#1E3A2B] mt-2">
            Back-Office YAMOOH
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            {mode === "setup" && canCreateFirstAdmin
              ? "Initialisez le premier compte Super Administrateur de la plateforme"
              : "Connectez-vous pour administrer les contenus, produits et médias"}
          </p>
        </div>

        {/* ONGLETS CONDITIONNELS : UNIQUEMENT SI AUCUN ADMIN N'A ENCORE ÉTÉ CRÉÉ */}
        {canCreateFirstAdmin && (
          <div className="flex bg-[#FAF8F5] p-1 rounded-2xl border border-[#E3ECE6] mb-6">
            <button
              type="button"
              onClick={() => {
                setMode("setup");
                setError("");
              }}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                mode === "setup"
                  ? "bg-[#3B8A49] text-white shadow-xs"
                  : "text-muted-foreground hover:text-[#1E3A2B]"
              }`}
            >
              <UserPlus size={14} />
              <span>Créer 1er Admin</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("login");
                setError("");
              }}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                mode === "login"
                  ? "bg-[#3B8A49] text-white shadow-xs"
                  : "text-muted-foreground hover:text-[#1E3A2B]"
              }`}
            >
              <Lock size={14} />
              <span>Connexion</span>
            </button>
          </div>
        )}

        {error && (
          <div className="mb-6 p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-2xl flex items-center gap-2">
            <AlertCircle size={16} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* 1. FORMULAIRE DE CRÉATION DU PREMIER ADMIN (DISPARAÎT DÈS CRÉATION) */}
        {mode === "setup" && canCreateFirstAdmin ? (
          <form onSubmit={handleSetupSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#1E3A2B] uppercase mb-1.5 font-mono">
                Nom complet
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                <input
                  type="text"
                  value={setupName}
                  onChange={(e) => setSetupName(e.target.value)}
                  placeholder="Ex: Direction YAMOOH"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-[#FAF8F5] border border-[#E3ECE6] focus:border-[#3B8A49] focus:bg-white rounded-2xl text-xs font-medium outline-hidden transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1E3A2B] uppercase mb-1.5 font-mono">
                Adresse E-mail
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                <input
                  type="email"
                  value={setupEmail}
                  onChange={(e) => setSetupEmail(e.target.value)}
                  placeholder="admin@yamooh.com"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-[#FAF8F5] border border-[#E3ECE6] focus:border-[#3B8A49] focus:bg-white rounded-2xl text-xs font-medium outline-hidden transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1E3A2B] uppercase mb-1.5 font-mono">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                <input
                  type={showSetupPassword ? "text" : "password"}
                  value={setupPassword}
                  onChange={(e) => setSetupPassword(e.target.value)}
                  placeholder="Minimum 6 caractères"
                  required
                  minLength={6}
                  className="w-full pl-10 pr-11 py-3 bg-[#FAF8F5] border border-[#E3ECE6] focus:border-[#3B8A49] focus:bg-white rounded-2xl text-xs font-medium outline-hidden transition"
                />
                <button
                  type="button"
                  onClick={() => setShowSetupPassword(!showSetupPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-[#1E3A2B] cursor-pointer p-1 transition"
                  title={showSetupPassword ? "Masquer" : "Afficher"}
                >
                  {showSetupPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1E3A2B] uppercase mb-1.5 font-mono">
                Confirmation du mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                <input
                  type={showSetupConfirmPassword ? "text" : "password"}
                  value={setupConfirmPassword}
                  onChange={(e) => setSetupConfirmPassword(e.target.value)}
                  placeholder="Répétez le mot de passe"
                  required
                  minLength={6}
                  className="w-full pl-10 pr-11 py-3 bg-[#FAF8F5] border border-[#E3ECE6] focus:border-[#3B8A49] focus:bg-white rounded-2xl text-xs font-medium outline-hidden transition"
                />
                <button
                  type="button"
                  onClick={() => setShowSetupConfirmPassword(!showSetupConfirmPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-[#1E3A2B] cursor-pointer p-1 transition"
                  title={showSetupConfirmPassword ? "Masquer" : "Afficher"}
                >
                  {showSetupConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#3B8A49] hover:bg-[#2F6F3B] text-white py-3.5 rounded-full font-bold text-xs uppercase tracking-wider transition shadow-soft flex items-center justify-center gap-2 cursor-pointer mt-4"
            >
              <span>{loading ? "Création en cours..." : "Créer le compte Super Admin"}</span>
              <ArrowRight size={14} />
            </button>
          </form>
        ) : (
          /* 2. FORMULAIRE DE CONNEXION PRINCIPAL */
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#1E3A2B] uppercase mb-1.5 font-mono">
                Adresse E-mail
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@yamooh.com"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-[#FAF8F5] border border-[#E3ECE6] focus:border-[#3B8A49] focus:bg-white rounded-2xl text-xs font-medium outline-hidden transition"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-[#1E3A2B] uppercase font-mono">
                  Mot de passe
                </label>
                <Link
                  to="/admin/forgot-password"
                  className="text-[11px] text-[#3B8A49] hover:underline font-semibold"
                >
                  Mot de passe oublié ?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-11 py-3 bg-[#FAF8F5] border border-[#E3ECE6] focus:border-[#3B8A49] focus:bg-white rounded-2xl text-xs font-medium outline-hidden transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-[#1E3A2B] cursor-pointer p-1 transition"
                  title={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#3B8A49] hover:bg-[#2F6F3B] text-white py-3.5 rounded-full font-bold text-xs uppercase tracking-wider transition shadow-soft flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <span>{loading ? "Connexion en cours..." : "Se connecter au Back-Office"}</span>
              <ArrowRight size={14} />
            </button>
          </form>
        )}

        {/* LIEN DE BAS DE PAGE CONDITIONNEL */}
        <div className="mt-8 pt-6 border-t border-[#E3ECE6] flex flex-col items-center gap-2 text-center">
          {canCreateFirstAdmin && mode === "login" && (
            <button
              type="button"
              onClick={() => {
                setMode("setup");
                setError("");
              }}
              className="text-xs text-[#3B8A49] hover:underline font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <UserPlus size={14} />
              <span>Nouveau sur le système ? Créer le premier compte administrateur</span>
            </button>
          )}

          {canCreateFirstAdmin && mode === "setup" && (
            <button
              type="button"
              onClick={() => {
                setMode("login");
                setError("");
              }}
              className="text-xs text-[#3B8A49] hover:underline font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <Lock size={14} />
              <span>Déjà initialisé ? Se connecter</span>
            </button>
          )}

          <Link to="/" className="text-xs text-muted-foreground hover:text-[#3B8A49] transition mt-1">
            ← Retourner sur le site public
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
