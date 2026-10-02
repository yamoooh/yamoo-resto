import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { User, LogOut } from "lucide-react";

export const Account = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (!user) {
    return (
      <section className="container-tight py-16 text-center">
        <div className="bg-card border border-border rounded-3xl p-10 max-w-md mx-auto shadow-card space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#E3ECE6] text-[#1E3A2B] flex items-center justify-center mx-auto mb-2">
            <User size={32} />
          </div>
          <h1 className="text-2xl font-display font-bold">Connectez-vous</h1>
          <p className="text-xs text-muted-foreground">Accédez à vos informations et à votre compte client YAMOOH.</p>
          <Link to="/auth" className="inline-flex bg-[#1E3A2B] hover:bg-[#162B20] text-white px-6 py-2.5 rounded-full font-bold text-xs transition">
            Se connecter / S'inscrire
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="container-tight py-12 max-w-2xl">
      <div className="bg-card border border-border rounded-3xl p-8 shadow-card space-y-6">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div>
            <h1 className="text-2xl font-display font-bold">Mon Compte</h1>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
          <button onClick={handleSignOut} className="inline-flex items-center gap-1.5 text-xs text-red-600 hover:underline font-bold cursor-pointer">
            <LogOut size={14} /> Déconnexion
          </button>
        </div>
        <p className="text-xs text-muted-foreground">Bienvenue sur votre espace YAMOOH. Vos commandes passées et avantages fidélité sont enregistrés ici.</p>
      </div>
    </section>
  );
};

export default Account;
