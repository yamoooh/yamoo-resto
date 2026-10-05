import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../integrations/supabase/client";
import { Lock, ArrowRight, CheckCircle2, AlertCircle, ShieldCheck } from "lucide-react";

export const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (newPassword.length < 6) {
      setError("Le nouveau mot de passe doit contenir au moins 6 caractères.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    setIsLoading(true);

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (updateError) {
        setError(updateError.message || "Impossible de mettre à jour le mot de passe.");
      } else {
        setSuccess(true);
        setTimeout(() => {
          navigate("/account");
        }, 2500);
      }
    } catch (err: any) {
      setError(err?.message || "Une erreur inattendue est survenue.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="container-tight py-12 sm:py-16 max-w-md">
      <div className="bg-white dark:bg-[#15241C] border border-border/80 rounded-3xl p-6 sm:p-10 shadow-card space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#EBF4EE] dark:bg-white/10 text-[#3B8A49] flex items-center justify-center mx-auto shadow-2xs">
            <ShieldCheck size={24} />
          </div>
          <h1 className="text-2xl font-display font-black tracking-tight text-foreground">
            Nouveau mot de passe
          </h1>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Définissez votre nouveau mot de passe sécurisé pour votre compte YAMOOH.
          </p>
        </div>

        {error && (
          <div className="p-3.5 bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 text-xs rounded-2xl border border-red-200 dark:border-red-800 flex items-center gap-2 animate-in fade-in">
            <AlertCircle size={16} className="shrink-0 text-red-600 dark:text-red-400" />
            <span>{error}</span>
          </div>
        )}

        {success ? (
          <div className="p-4 bg-[#EBF4EE] dark:bg-green-950/40 text-[#2F6F3B] dark:text-green-300 text-xs rounded-2xl border border-[#3B8A49]/30 space-y-2 text-center animate-in fade-in">
            <CheckCircle2 size={24} className="mx-auto text-[#3B8A49]" />
            <p className="font-bold text-sm">Mot de passe réinitialisé avec succès !</p>
            <p className="text-muted-foreground">Redirection vers votre espace client en cours...</p>
          </div>
        ) : (
          <form onSubmit={handleUpdatePassword} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-foreground mb-1">
                Nouveau mot de passe <span className="text-[#3B8A49]">*</span>
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-2xl border border-border bg-secondary/20 dark:bg-white/5 focus:outline-none focus:border-[#3B8A49] text-xs sm:text-sm text-foreground"
                />
                <Lock size={16} className="absolute left-3.5 top-3.5 text-muted-foreground" />
              </div>
              <p className="text-[10px] text-muted-foreground mt-1">Minimum 6 caractères.</p>
            </div>

            <div>
              <label className="block font-bold text-foreground mb-1">
                Confirmer le nouveau mot de passe <span className="text-[#3B8A49]">*</span>
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-2xl border border-border bg-secondary/20 dark:bg-white/5 focus:outline-none focus:border-[#3B8A49] text-xs sm:text-sm text-foreground"
                />
                <Lock size={16} className="absolute left-3.5 top-3.5 text-muted-foreground" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#3B8A49] hover:bg-[#2F6F3B] disabled:opacity-75 text-white py-3.5 rounded-full font-bold text-xs uppercase tracking-wider transition shadow-soft flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <span>{isLoading ? "Mise à jour..." : "RÉINITIALISER MON MOT DE PASSE"}</span>
              <ArrowRight size={14} />
            </button>
          </form>
        )}

        <div className="text-center pt-2 border-t border-border/70">
          <Link
            to="/auth"
            className="text-xs text-muted-foreground hover:text-[#3B8A49] font-bold transition"
          >
            Annuler et retourner à la connexion
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
