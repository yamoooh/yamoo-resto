import { Link } from "react-router-dom";

export const LegalNotice = () => (
  <section className="container-tight py-12 max-w-3xl space-y-6">
    <h1 className="text-3xl font-display font-bold">Mentions Légales</h1>
    <div className="bg-card border border-border rounded-3xl p-8 shadow-card space-y-4 text-xs text-muted-foreground leading-relaxed">
      <p><strong>Éditeur du service :</strong> YAMOOH Douala</p>
      <p><strong>Implantation :</strong> Pharmacie Kotto, Douala, Cameroun</p>
      <p><strong>Contact :</strong> +237 658 254 509 / tchokonte@gmail.com</p>
      <p><strong>Activité :</strong> Restauration saine, bar à salades, traiteur d'entreprise.</p>
    </div>
  </section>
);

export default LegalNotice;
