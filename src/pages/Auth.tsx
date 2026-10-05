import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "../integrations/supabase/client";
import { useAuth } from "../contexts/AuthContext";
import { User, Lock, Mail, UserPlus, LogIn, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";

export const Auth = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get("tab") === "register" ? "register" : "login";
  
  const [isLogin, setIsLogin] = useState(initialTab === "login");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/account", { replace: true });
    }
  }, [user, navigate]);

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab === "register") {
      setIsLogin(false);
    } else if (tab === "login") {
      setIsLogin(true);
    }
  }, [searchParams]);

  const switchTab = (toLogin: boolean) => {
    setIsLogin(toLogin);
    setError(null);
    setSuccessMsg(null);
    setSearchParams({ tab: toLogin ? "login" : "register" });
  };

  const validateEmail = (emailStr: string) => {
    return /\S+@\S+\.\S+/.test(emailStr);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    // Validation côté client
    if (!email.trim()) {
      setError("Veuillez saisir votre adresse e-mail.");
      return;
    }

    if (!validateEmail(email.trim())) {
      setError("Veuillez saisir une adresse e-mail valide.");
      return;
    }

    if (!password) {
      setError("Veuillez saisir votre mot de passe.");
      return;
    }

    if (!isLogin) {
      if (!fullName.trim()) {
        setError("Veuillez renseigner votre nom complet.");
        return;
      }
      if (password.length < 6) {
        setError("Le mot de passe doit contenir au moins 6 caractères.");
      }
      if (password !== confirmPassword) {
        setError("Les mots de passe ne correspondent pas.");
        return;
      }
    }

    setIsLoading(true);

    try {
      if (isLogin) {
        // Connexion
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

        if (signInError) {
          if (
            signInError.message.toLowerCase().includes("invalid login credentials") ||
            signInError.message.toLowerCase().includes("invalid_credentials")
          ) {
            setError("Adresse e-mail ou mot de passe incorrect.");
          } else if (signInError.message.toLowerCase().includes("email not confirmed")) {
            setError("Veuillez confirmer votre adresse e-mail via le lien reçu.");
          } else {
            setError(signInError.message || "Impossible de se connecter pour le moment.");
          }
        } else {
          navigate("/account");
        }
      } else {
        // Création de compte
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            data: {
              full_name: fullName.trim(),
              phone: phone.trim(),
            },
          },
        });

        if (signUpError) {
          if (signUpError.message.toLowerCase().includes("user already registered")) {
            setError("Un compte existe déjà avec cette adresse e-mail. Veuillez vous connecter.");
          } else {
            setError(signUpError.message || "Erreur lors de la création du compte.");
          }
        } else {
          if (signUpData.session) {
            navigate("/account");
          } else {
            setSuccessMsg(
              "Compte créé avec succès ! Un e-mail de confirmation vous a été envoyé si requis."
            );
          }
        }
      }
    } catch (err: any) {
      setError(err?.message || "Une erreur inattendue est survenue.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="container-tight py-12 sm:py-16 max-w-lg">
      <div className="bg-white dark:bg-[#15241C] border border-border/80 rounded-3xl p-6 sm:p-10 shadow-card space-y-6">
        {/* Onglets de sélection Connexion / Inscription */}
        <div className="flex rounded-full bg-secondary/50 p-1 border border-border/80">
          <button
            type="button"
            onClick={() => switchTab(true)}
            className={`flex-1 py-2.5 rounded-full text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
              isLogin
                ? "bg-[#3B8A49] text-white shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <LogIn size={14} />
            <span>Se connecter</span>
          </button>
          <button
            type="button"
            onClick={() => switchTab(false)}
            className={`flex-1 py-2.5 rounded-full text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
              !isLogin
                ? "bg-[#3B8A49] text-white shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <UserPlus size={14} />
            <span>Créer un compte</span>
          </button>
        </div>

        {/* Titre & sous-titre */}
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-display font-black tracking-tight text-foreground">
            {isLogin ? "Heureux de vous revoir" : "Rejoignez la maison YAMOOH"}
          </h1>
          <p className="text-xs text-muted-foreground">
            {isLogin
              ? "Accédez à vos informations, commandes et suivis de devis."
              : "Créez votre compte pour commander plus rapidement et suivre vos devis."}
          </p>
        </div>

        {/* Messages d'erreur & succès */}
        {error && (
          <div className="p-3.5 bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 text-xs rounded-2xl border border-red-200 dark:border-red-800 flex items-center gap-2 animate-in fade-in">
            <AlertCircle size={16} className="shrink-0 text-red-600 dark:text-red-400" />
            <span>{error}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-3.5 bg-[#EBF4EE] dark:bg-green-950/40 text-[#2F6F3B] dark:text-green-300 text-xs rounded-2xl border border-[#3B8A49]/30 flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 size={16} className="shrink-0 text-[#3B8A49]" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Formulaire interactif */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {!isLogin && (
            <div>
              <label className="block font-bold text-foreground mb-1">
                Nom complet <span className="text-[#3B8A49]">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Ex : Jean Dupont"
                  className="w-full pl-10 pr-4 py-3 rounded-2xl border border-border bg-secondary/20 dark:bg-white/5 focus:outline-none focus:border-[#3B8A49] text-xs sm:text-sm text-foreground"
                />
                <User size={16} className="absolute left-3.5 top-3.5 text-muted-foreground" />
              </div>
            </div>
          )}

          <div>
            <label className="block font-bold text-foreground mb-1">
              Adresse e-mail <span className="text-[#3B8A49]">*</span>
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

          {!isLogin && (
            <div>
              <label className="block font-bold text-foreground mb-1">
                Numéro de téléphone (optionnel)
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+237 6XX XX XX XX"
                className="w-full px-4 py-3 rounded-2xl border border-border bg-secondary/20 dark:bg-white/5 focus:outline-none focus:border-[#3B8A49] text-xs sm:text-sm text-foreground"
              />
            </div>
          )}

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block font-bold text-foreground">
                Mot de passe <span className="text-[#3B8A49]">*</span>
              </label>
              {isLogin && (
                <Link
                  to="/forgot-password"
                  className="text-[11px] font-bold text-[#3B8A49] hover:underline"
                >
                  Mot de passe oublié ?
                </Link>
              )}
            </div>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-2xl border border-border bg-secondary/20 dark:bg-white/5 focus:outline-none focus:border-[#3B8A49] text-xs sm:text-sm text-foreground"
              />
              <Lock size={16} className="absolute left-3.5 top-3.5 text-muted-foreground" />
            </div>
            {!isLogin && (
              <p className="text-[10px] text-muted-foreground mt-1">
                Minimum 6 caractères.
              </p>
            )}
          </div>

          {!isLogin && (
            <div>
              <label className="block font-bold text-foreground mb-1">
                Confirmer le mot de passe <span className="text-[#3B8A49]">*</span>
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
          )}

          {/* Bouton de soumission principal en vert officiel YAMOOH #3B8A49 */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#3B8A49] hover:bg-[#2F6F3B] disabled:opacity-75 text-white py-3.5 rounded-full font-bold text-xs uppercase tracking-wider transition shadow-soft flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            <span>{isLoading ? "Traitement en cours..." : isLogin ? "Se connecter" : "Créer mon compte"}</span>
            <ArrowRight size={14} />
          </button>
        </form>

        {/* Avantages réels du compte client */}
        <div className="pt-4 border-t border-border/70 space-y-2">
          <span className="block text-[11px] font-mono font-bold text-muted-foreground uppercase tracking-wider">
            Avantages de votre espace YAMOOH :
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3B8A49]" />
              <span>Commande plus rapide</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3B8A49]" />
              <span>Adresses enregistrées</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3B8A49]" />
              <span>Suivi facilité des devis</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3B8A49]" />
              <span>Historique personnel</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Auth;
