import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../integrations/supabase/client";
import { Mail, ArrowRight, ArrowLeft, CheckCircle2, AlertCircle, KeyRound } from "lucide-react";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [step, setStep] = useState<"request" | "verify">("request");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (!email.trim() || !/\S+@\S+\.\S+/.test(email.trim())) {
      setError("Veuillez saisir une adresse e-mail valide.");
      return;
    }

    setIsLoading(true);

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (resetError) {
        setError(resetError.message || "Erreur lors de l'envoi de la demande de réinitialisation.");
      } else {
        setSuccessMsg(
          `Un e-mail contenant les instructions et le lien de récupération a été envoyé à ${email.trim()}.`
        );
        setStep("verify");
      }
    } catch (err: any) {
      setError(err?.message || "Une erreur inattendue est survenue.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!otpCode.trim()) {
      setError("Veuillez saisir le code reçu par e-mail.");
      return;
    }

    setIsLoading(true);

    try {
      const { error: verifyError } = await supabase.auth.verifyOtp({
        email: email.trim(),
        token: otpCode.trim(),
        type: "recovery",
      });

      if (verifyError) {
        setError("Code invalide ou expiré. Veuillez vérifier votre e-mail ou recommencer.");
      } else {
        navigate("/reset-password");
      }
    } catch (err: any) {
      setError(err?.message || "Une erreur est survenue lors de la validation du code.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="container-tight py-12 sm:py-16 max-w-md">
      <div className="bg-white dark:bg-[#15241C] border border-border/80 rounded-3xl p-6 sm:p-10 shadow-card space-y-6">
        {/* En-tête avec icône */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#EBF4EE] dark:bg-white/10 text-[#3B8A49] flex items-center justify-center mx-auto shadow-2xs">
            <KeyRound size={24} />
          </div>
          <h1 className="text-2xl font-display font-black tracking-tight text-foreground">
            Mot de passe oublié
          </h1>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {step === "request"
              ? "Saisissez votre adresse e-mail enregistrée pour recevoir un code ou un lien de réinitialisation sécurisé."
              : "Consultez votre boîte de réception et saisissez le code reçu ou cliquez sur le lien dans l'e-mail."}
          </p>
        </div>

        {/* Message d'erreur */}
        {error && (
          <div className="p-3.5 bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 text-xs rounded-2xl border border-red-200 dark:border-red-800 flex items-center gap-2 animate-in fade-in">
            <AlertCircle size={16} className="shrink-0 text-red-600 dark:text-red-400" />
            <span>{error}</span>
          </div>
        )}

        {/* Message de succès */}
        {successMsg && (
          <div className="p-3.5 bg-[#EBF4EE] dark:bg-green-950/40 text-[#2F6F3B] dark:text-green-300 text-xs rounded-2xl border border-[#3B8A49]/30 flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 size={16} className="shrink-0 text-[#3B8A49]" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Étape 1 : Demande avec e-mail */}
        {step === "request" ? (
          <form onSubmit={handleRequestReset} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-foreground mb-1">
                Votre adresse e-mail <span className="text-[#3B8A49]">*</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre.email@domaine.com"
                  className="w-full pl-10 pr-4 py-3 rounded-2xl border border-border bg-secondary/20 dark:bg-white/5 focus:outline-none focus:border-[#3B8A49] text-xs sm:text-sm text-foreground"
                />
                <Mail size={16} className="absolute left-3.5 top-3.5 text-muted-foreground" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#3B8A49] hover:bg-[#2F6F3B] disabled:opacity-75 text-white py-3.5 rounded-full font-bold text-xs uppercase tracking-wider transition shadow-soft flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <span>{isLoading ? "Envoi en cours..." : "Envoyer le code de récupération"}</span>
              <ArrowRight size={14} />
            </button>
          </form>
        ) : (
          /* Étape 2 : Saisie du code OTP */
          <form onSubmit={handleVerifyOtp} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-foreground mb-1">
                Code de vérification (OTP) reçu <span className="text-[#3B8A49]">*</span>
              </label>
              <input
                type="text"
                required
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                placeholder="Ex : 123456"
                className="w-full px-4 py-3 rounded-2xl border border-border bg-secondary/20 dark:bg-white/5 focus:outline-none focus:border-[#3B8A49] text-xs sm:text-sm text-foreground text-center font-mono tracking-widest text-lg"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#3B8A49] hover:bg-[#2F6F3B] disabled:opacity-75 text-white py-3.5 rounded-full font-bold text-xs uppercase tracking-wider transition shadow-soft flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <span>{isLoading ? "Vérification..." : "Valider le code"}</span>
              <ArrowRight size={14} />
            </button>

            <button
              type="button"
              onClick={() => {
                setStep("request");
                setError(null);
                setSuccessMsg(null);
              }}
              className="w-full text-center text-xs text-muted-foreground hover:text-foreground font-bold pt-2 block"
            >
              Renvoyer un nouveau code
            </button>
          </form>
        )}

        {/* Lien de retour */}
        <div className="text-center pt-2 border-t border-border/70">
          <Link
            to="/auth"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-[#3B8A49] font-bold transition"
          >
            <ArrowLeft size={13} />
            <span>Retour à la page de connexion</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
