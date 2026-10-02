import { Link } from "react-router-dom";

export const ResetPassword = () => (
  <section className="container-tight py-16 max-w-md text-center">
    <div className="bg-card border border-border rounded-3xl p-8 shadow-card space-y-4">
      <h1 className="text-2xl font-display font-bold">Nouveau mot de passe</h1>
      <p className="text-xs text-muted-foreground">Définissez votre nouveau mot de passe sécurisé.</p>
      <input type="password" placeholder="Nouveau mot de passe" className="w-full p-2.5 rounded-xl border border-border bg-background text-xs" />
      <button className="w-full bg-[#1E3A2B] text-white py-2.5 rounded-full font-bold text-xs">Mettre à jour</button>
    </div>
  </section>
);

export default ResetPassword;
