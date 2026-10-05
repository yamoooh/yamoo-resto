import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Shield, ArrowRight, Lock, Mail, AlertCircle, Sparkles } from "lucide-react";
import { useAdminAuth } from "../../contexts/AdminAuthContext";
import { useData } from "../../contexts/DataContext";

export const AdminLogin: React.FC = () => {
  const { login, needsInitialSetup } = useAdminAuth();
  const { admins } = useData();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (needsInitialSetup) {
      navigate("/admin/setup");
    }
  }, [needsInitialSetup, navigate]);

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
        {/* LOGO & TITRE */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-[#3B8A49] flex items-center justify-center text-white font-black text-2xl mx-auto mb-4 shadow-md">
            Y
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

        {error && (
          <div className="mb-6 p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-2xl flex items-center gap-2">
            <AlertCircle size={16} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* FORMULAIRE */}
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
            <label className="block text-xs font-bold text-[#1E3A2B] uppercase mb-1.5 font-mono">
              Mot de passe
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-10 pr-4 py-3 bg-[#FAF8F5] border border-[#E3ECE6] focus:border-[#3B8A49] focus:bg-white rounded-2xl text-xs font-medium outline-hidden transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#3B8A49] hover:bg-[#2F6F3B] text-white py-3.5 rounded-full font-bold text-xs uppercase tracking-wider transition shadow-soft flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            <span>{loading ? "Connexion..." : "Se connecter au Back-Office"}</span>
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
