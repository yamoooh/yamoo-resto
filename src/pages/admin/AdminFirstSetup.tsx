import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, ArrowRight, User, Mail, Lock, AlertCircle } from "lucide-react";
import { useAdminAuth } from "../../contexts/AdminAuthContext";

export const AdminFirstSetup: React.FC = () => {
  const { setupFirstAdmin, needsInitialSetup } = useAdminAuth();
  const [name, setName] = useState("Direction YAMOOH");
  const [email, setEmail] = useState("admin@yamooh.com");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password && password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    setLoading(true);
    const res = await setupFirstAdmin(name, email, password);
    setLoading(false);

    if (res.success) {
      navigate("/admin");
    } else {
      setError(res.error || "Erreur lors de l'initialisation.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAF9] flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-white border border-[#E3ECE6] rounded-3xl p-8 shadow-xl">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-[#3B8A49] flex items-center justify-center text-white mx-auto mb-4 shadow-md">
            <ShieldCheck size={28} />
          </div>
          <span className="text-[10px] font-mono uppercase px-3 py-1 rounded-full bg-[#EBF4EE] text-[#3B8A49] font-bold">
            Configuration Initiale
          </span>
          <h1 className="text-2xl font-display font-black text-[#1E3A2B] mt-2">
            Créer le premier administrateur
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Ce premier compte disposera automatiquement des privilèges de Super Administrateur
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-2xl flex items-center gap-2">
            <AlertCircle size={16} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#1E3A2B] uppercase mb-1.5 font-mono">
              Nom complet
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
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

          <div>
            <label className="block text-xs font-bold text-[#1E3A2B] uppercase mb-1.5 font-mono">
              Confirmation du mot de passe
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-10 pr-4 py-3 bg-[#FAF8F5] border border-[#E3ECE6] focus:border-[#3B8A49] focus:bg-white rounded-2xl text-xs font-medium outline-hidden transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#3B8A49] hover:bg-[#2F6F3B] text-white py-3.5 rounded-full font-bold text-xs uppercase tracking-wider transition shadow-soft flex items-center justify-center gap-2 cursor-pointer mt-4"
          >
            <span>{loading ? "Création..." : "Initialiser le Super Administrateur"}</span>
            <ArrowRight size={14} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminFirstSetup;
