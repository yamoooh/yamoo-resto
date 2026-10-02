import { Link } from "react-router-dom";

export const ForgotPassword = () => (
  <section className="container-tight py-16 max-w-md text-center">
    <div className="bg-card border border-border rounded-3xl p-8 shadow-card space-y-4">
      <h1 className="text-2xl font-display font-bold">Mot de passe oublié</h1>
      <p className="text-xs text-muted-foreground">Entrez votre email pour recevoir les instructions de réinitialisation.</p>
      <input type="email" placeholder="votre@email.com" className="w-full p-2.5 rounded-xl border border-border bg-background text-xs" />
      <button className="w-full bg-[#1E3A2B] text-white py-2.5 rounded-full font-bold text-xs">Envoyer le lien</button>
      <Link to="/auth" className="block text-xs text-muted-foreground hover:underline pt-2">Retour à la connexion</Link>
    </div>
  </section>
);

export default ForgotPassword;
