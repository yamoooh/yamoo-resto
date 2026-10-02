import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../integrations/supabase/client";

export const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Veuillez renseigner votre email et mot de passe.");
      return;
    }

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
          setError(error.message);
        } else {
          navigate("/account");
        }
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) {
          setError(error.message);
        } else {
          navigate("/account");
        }
      }
    } catch (err: any) {
      setError(err?.message || "Erreur d'authentification");
    }
  };

  return (
    <section className="container-tight py-16 max-w-md">
      <div className="bg-card border border-border rounded-3xl p-8 shadow-card space-y-6">
        <h1 className="text-2xl font-display font-bold text-center">{isLogin ? "Connexion" : "Créer un compte"}</h1>
        {error && <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">{error}</div>}
        <form onSubmit={handleAuth} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold mb-1">Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 rounded-xl border border-border bg-background" placeholder="votre@email.com" />
          </div>
          <div>
            <label className="block font-bold mb-1">Mot de passe</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 rounded-xl border border-border bg-background" placeholder="••••••••" />
          </div>
          <button type="submit" className="w-full bg-[#1E3A2B] hover:bg-[#14271d] text-white py-3 rounded-full font-bold text-xs transition cursor-pointer">
            {isLogin ? "Se connecter" : "S'inscrire"}
          </button>
        </form>

        <div className="text-center text-xs text-muted-foreground pt-2">
          <button onClick={() => { setIsLogin(!isLogin); setError(""); }} className="hover:underline font-bold text-foreground cursor-pointer">
            {isLogin ? "Pas de compte ? S'inscrire" : "Déjà un compte ? Se connecter"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Auth;
