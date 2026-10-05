import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle, CheckCircle2, ShieldCheck, ArrowLeft } from "lucide-react";
import { useAdminAuth } from "../../contexts/AdminAuthContext";
import { useData } from "../../contexts/DataContext";

export const AdminForgotPassword: React.FC = () => {
  const { resetPassword } = useAdminAuth();
  const { admins } = useData();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Veuillez saisir votre adresse e-mail administrateur.");
      return;
    }

    if (newPassword.length < 6) {
      setError("Le nouveau mot de passe doit comporter au moins 6 caractères.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Les deux mots de passe ne correspondent pas.");
      return;
    }

    setLoading(true);
    const res = await resetPassword(email.trim(), newPassword);
    setLoading(false);

    if (res.success) {
      setSuccess(true);
    } else {
      setError(res.error || "Impossible de réinitialiser le mot de passe.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAF9] flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-white border border-[#E3ECE6] rounded-3xl p-8 shadow-xl">
        {/* LOGO OFFICIEL */}
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
            Mot de passe oublié
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Réinitialisez en toute sécurité l'accès à votre compte administrateur
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-2xl flex items-center gap-2">
            <AlertCircle size={16} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success ? (
          <div className="text-center py-4 space-y-4">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 size={26} />
            </div>
            <h2 className="text-base font-bold text-[#1E3A2B]">
              Mot de passe mis à jour avec succès !
            </h2>
            <p className="text-xs text-muted-foreground">
              Votre nouveau mot de passe a été enregistré. Vous pouvez maintenant vous connecter au Back-Office YAMOOH.
            </p>
            <div className="pt-2">
              <Link
                to="/admin/login"
                className="w-full bg-[#3B8A49] hover:bg-[#2F6F3B] text-white py-3 rounded-full font-bold text-xs uppercase tracking-wider transition shadow-soft flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Accéder à la connexion</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#1E3A2B] uppercase mb-1.5 font-mono">
                Adresse E-mail Administrateur
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
                Nouveau mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Minimum 6 caractères"
                  required
                  minLength={6}
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

            <div>
              <label className="block text-xs font-bold text-[#1E3A2B] uppercase mb-1.5 font-mono">
                Confirmer le nouveau mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Répétez le nouveau mot de passe"
                  required
                  minLength={6}
                  className="w-full pl-10 pr-11 py-3 bg-[#FAF8F5] border border-[#E3ECE6] focus:border-[#3B8A49] focus:bg-white rounded-2xl text-xs font-medium outline-hidden transition"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-[#1E3A2B] cursor-pointer p-1 transition"
                  title={showConfirmPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#3B8A49] hover:bg-[#2F6F3B] text-white py-3.5 rounded-full font-bold text-xs uppercase tracking-wider transition shadow-soft flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <span>{loading ? "Mise à jour en cours..." : "Enregistrer le nouveau mot de passe"}</span>
              <ArrowRight size={14} />
            </button>
          </form>
        )}

        <div className="mt-8 pt-6 border-t border-[#E3ECE6] flex items-center justify-between text-xs">
          <Link to="/admin/login" className="text-[#3B8A49] hover:underline font-bold flex items-center gap-1">
            <ArrowLeft size={13} />
            <span>Retour à la connexion</span>
          </Link>
          <Link to="/" className="text-muted-foreground hover:text-[#1E3A2B]">
            Site public
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminForgotPassword;
