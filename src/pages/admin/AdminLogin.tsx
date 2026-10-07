import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Shield, ArrowRight, Lock, Mail, AlertCircle, Eye, EyeOff, Key, CheckCircle } from "lucide-react";
import { useAdminAuth } from "../../contexts/AdminAuthContext";
import { supabase } from "../../lib/supabaseClient";

export const AdminLogin: React.FC = () => {
  const { login, resetPassword, isAuthenticated } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [mode, setMode] = useState<"login" | "forgot" | "sent" | "reset">("login");

  // Champs de connexion
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Champs mot de passe oublié
  const [resetEmail, setResetEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Si déjà authentifié en mode normal, rediriger (sauf si on est en train de reset)
    if (isAuthenticated && mode !== "reset") {
      navigate("/admin");
    }

    // Vérifier si on vient d'un lien de réinitialisation Supabase (présence d'un hash avec type=recovery)
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY") {
        setMode("reset");
        setSuccess("Lien valide. Veuillez définir votre nouveau mot de passe.");
      }
    });

    // Optionnel : vérifier manuellement l'URL
    if (window.location.hash.includes("type=recovery")) {
      setMode("reset");
    }
  }, [isAuthenticated, navigate, mode]);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      navigate("/admin");
    } else {
      setError(res.error || "Identifiants administrateur incorrects.");
    }
  };

  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    // Envoi de l'email via Supabase Auth
    const res = await resetPassword(resetEmail);
    setLoading(false);

    if (res.success) {
      setMode("sent");
    } else {
      setError(res.error || "Erreur lors de l'envoi de l'email.");
    }
  };

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    
    if (newPassword.length < 6) {
      setError("Le nouveau mot de passe doit comporter au moins 6 caractères.");
      return;
    }

    setLoading(true);
    // Mise à jour du mot de passe
    const res = await resetPassword("", newPassword);
    setLoading(false);

    if (res.success) {
      setSuccess("Mot de passe mis à jour avec succès.");
      // Redirection après 2 secondes
      setTimeout(() => {
        navigate("/admin");
      }, 2000);
    } else {
      setError(res.error || "Erreur lors de la mise à jour.");
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
            Espace Sécurisé Supabase
          </span>
          <h1 className="text-2xl font-display font-black text-[#1E3A2B] mt-2">
            Back-Office YAMOOH
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            {mode === "login" && "Connectez-vous pour administrer les contenus"}
            {mode === "forgot" && "Récupération de compte"}
            {mode === "sent" && "E-mail envoyé"}
            {mode === "reset" && "Nouveau mot de passe"}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-2xl flex items-center gap-2">
            <AlertCircle size={16} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}
        
        {success && (
          <div className="mb-6 p-3.5 bg-green-50 border border-green-200 text-green-700 text-xs rounded-2xl flex items-center gap-2">
            <Shield size={16} className="shrink-0" />
            <span>{success}</span>
          </div>
        )}

        {mode === "login" && (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-[#1E3A2B] mb-1.5 font-mono">
                Adresse e-mail admin
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@yamooh.com"
                  className="w-full pl-10 pr-4 py-3 bg-[#FAF8F5] border border-[#E3ECE6] rounded-xl text-sm font-medium outline-hidden"
                  required
                />
                <Mail size={16} className="absolute left-3.5 top-3.5 text-muted-foreground" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[#1E3A2B] mb-1.5 font-mono">
                Mot de passe
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 bg-[#FAF8F5] border border-[#E3ECE6] rounded-xl text-sm font-medium outline-hidden"
                  required
                />
                <Lock size={16} className="absolute left-3.5 top-3.5 text-muted-foreground" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-muted-foreground hover:text-[#1E3A2B] cursor-pointer"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setMode("forgot");
                  setError("");
                  setSuccess("");
                }}
                className="text-[11px] font-bold text-[#3B8A49] hover:underline cursor-pointer"
              >
                Mot de passe oublié ?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1E3A2B] hover:bg-[#162B20] text-white py-3.5 rounded-xl font-bold text-sm uppercase tracking-wider transition shadow-soft flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
            >
              <Shield size={16} />
              <span>{loading ? "Vérification..." : "Accéder au Back-Office"}</span>
            </button>
          </form>
        )}

        {mode === "forgot" && (
          <form onSubmit={handleForgotSubmit} className="space-y-4">
            <p className="text-xs text-muted-foreground mb-4">
              Saisissez votre adresse e-mail. Un lien de réinitialisation sécurisé vous sera envoyé.
            </p>
            <div>
              <label className="block text-xs font-bold uppercase text-[#1E3A2B] mb-1.5 font-mono">
                Adresse e-mail admin
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder="Votre email"
                  className="w-full pl-10 pr-4 py-3 bg-[#FAF8F5] border border-[#E3ECE6] rounded-xl text-sm font-medium outline-hidden"
                  required
                />
                <Mail size={16} className="absolute left-3.5 top-3.5 text-muted-foreground" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#3B8A49] hover:bg-[#2F6F3B] text-white py-3.5 rounded-xl font-bold text-sm uppercase tracking-wider transition shadow-soft flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
            >
              <span>{loading ? "Envoi en cours..." : "Recevoir le lien"}</span>
            </button>

            <div className="text-center mt-4">
              <button
                type="button"
                onClick={() => {
                  setMode("login");
                  setError("");
                  setSuccess("");
                }}
                className="text-xs text-muted-foreground hover:text-[#1E3A2B] flex items-center justify-center gap-1 mx-auto cursor-pointer"
              >
                <ArrowRight size={14} className="rotate-180" />
                <span>Retour à la connexion</span>
              </button>
            </div>
          </form>
        )}

        {mode === "sent" && (
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center">
                <CheckCircle size={32} className="text-[#3B8A49]" />
              </div>
            </div>
            <div>
              <h3 className="font-bold text-[#1E3A2B] mb-2">E-mail envoyé !</h3>
              <p className="text-xs text-muted-foreground">
                Si un compte existe pour <strong>{resetEmail}</strong>, vous allez recevoir un lien de réinitialisation dans quelques instants.
              </p>
            </div>
            
            <button
              onClick={() => setMode("login")}
              className="w-full bg-[#1E3A2B] hover:bg-[#162B20] text-white py-3.5 rounded-xl font-bold text-sm uppercase tracking-wider transition shadow-soft cursor-pointer"
            >
              Retour à la connexion
            </button>
          </div>
        )}

        {mode === "reset" && (
          <form onSubmit={handleResetSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-[#1E3A2B] mb-1.5 font-mono">
                Nouveau mot de passe
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 bg-[#FAF8F5] border border-[#E3ECE6] rounded-xl text-sm font-medium outline-hidden"
                  required
                />
                <Key size={16} className="absolute left-3.5 top-3.5 text-muted-foreground" />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3.5 top-3.5 text-muted-foreground hover:text-[#1E3A2B] cursor-pointer"
                >
                  {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1E3A2B] hover:bg-[#162B20] text-white py-3.5 rounded-xl font-bold text-sm uppercase tracking-wider transition shadow-soft flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
            >
              <span>{loading ? "Mise à jour..." : "Enregistrer le mot de passe"}</span>
            </button>
          </form>
        )}

        <div className="mt-8 pt-6 border-t border-[#E3ECE6] text-center">
          <Link
            to="/"
            className="text-[11px] text-muted-foreground hover:text-[#1E3A2B] font-mono font-bold uppercase tracking-widest inline-flex items-center gap-1 transition"
          >
            <span>← Retour au site public</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
