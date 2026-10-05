import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Shield, ArrowRight, Lock, Mail, AlertCircle, Sparkles, Eye, EyeOff, UserPlus } from "lucide-react";
import { useAdminAuth } from "../../contexts/AdminAuthContext";
import { useData } from "../../contexts/DataContext";

export const AdminLogin: React.FC = () => {
  const { login, needsInitialSetup } = useAdminAuth();
  const { admins } = useData();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const isFirstSetupNeeded = needsInitialSetup || admins.length === 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      navigate("/admin");
    } else {
      setError(res.error || "Échec de connexion.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAF9] flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-white border border-[#E3ECE6] rounded-3xl p-8 shadow-xl">
        {/* LOGO OFFICIEL & TITRE */}
        <div className="text-center mb-8">
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
            Connectez-vous pour administrer les contenus, produits et médias
          </p>
        </div>

        {/* SI PREMIER DÉMARRAGE REQUIS UNIQUEMENT : DISPARAÎT DÈS CRÉATION */}
        {isFirstSetupNeeded && (
          <div className="mb-6 p-4 rounded-2xl bg-[#EBF4EE] border border-[#3B8A49]/30 text-center animate-fade-in">
            <div className="flex items-center justify-center gap-1.5 text-[#3B8A49] font-bold text-xs mb-1">
              <Sparkles size={16} />
              <span>Configuration Initiale Requise</span>
            </div>
            <p className="text-[11px] text-muted-foreground mb-3">
              Aucun compte administrateur n'a encore été initialisé sur la plateforme.
            </p>
            <Link
              to="/admin/setup"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#3B8A49] hover:bg-[#2F6F3B] text-white rounded-xl text-xs font-bold transition shadow-xs w-full"
            >
              <UserPlus size={14} />
              <span>Créer le premier administrateur</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        )}

        {error && (
          <div className="mb-6 p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-2xl flex items-center gap-2">
            <AlertCircle size={16} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* FORMULAIRE DE CONNEXION */}
        <form onSubmit={handleSubmit} className="space-y-4">
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

        <div className="mt-8 pt-6 border-t border-[#E3ECE6] text-center">
          <Link to="/" className="text-xs text-[#3B8A49] hover:underline font-bold">
            ← Retourner sur le site public
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
