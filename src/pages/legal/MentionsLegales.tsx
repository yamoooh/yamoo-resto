import Breadcrumb from "../../components/Breadcrumb";

export const MentionsLegales = () => {
  return (
    <>
      <title>Mentions Légales | YAMOOH Douala</title>
      <meta
        name="description"
        content="Informations légales et éditeur du site YAMOOH à Douala, Cameroun."
      />
      <link rel="canonical" href="https://yamooh.com/mentions-legales" />

      <section className="container-tight py-16 max-w-3xl mx-auto space-y-8">
        <Breadcrumb items={[{ label: "Mentions Légales" }]} />

        <h1 className="text-3xl sm:text-4xl font-display font-black text-foreground">
          Mentions Légales
        </h1>

        <div className="bg-card border border-border rounded-3xl p-8 sm:p-10 shadow-card space-y-6 text-xs sm:text-sm text-muted-foreground leading-relaxed">
          <div>
            <h2 className="text-base font-display font-bold text-foreground mb-2">Éditeur du service</h2>
            <p><strong>Enseigne :</strong> YAMOOH</p>
            <p><strong>Activité :</strong> Restauration, bar à salades & service traiteur événementiel</p>
            <p><strong>Localisation :</strong> Pharmacie Kotto, Douala, Cameroun</p>
            <p><strong>Contact :</strong> +237 658 254 509 / tchokonte@gmail.com</p>
          </div>

          <div>
            <h2 className="text-base font-display font-bold text-foreground mb-2">Propriété intellectuelle</h2>
            <p>
              L'ensemble des contenus (textes, visuels, marques, logos et photographies) présents sur le site sont la propriété exclusive de YAMOOH ou font l'objet d'une autorisation d'utilisation.
            </p>
          </div>

          <div>
            <h2 className="text-base font-display font-bold text-foreground mb-2">Hébergement</h2>
            <p>
              Le site web est hébergé sur des infrastructures sécurisées avec certificat de chiffrement SSL.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default MentionsLegales;
