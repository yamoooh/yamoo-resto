import Breadcrumb from "../../components/Breadcrumb";

export const PolitiqueConfidentialite = () => {
  return (
    <>
      <title>Politique de Confidentialité | YAMOOH Douala</title>
      <meta
        name="description"
        content="Politique de protection des données personnelles et de confidentialité du site YAMOOH à Douala."
      />
      <link rel="canonical" href="https://yamooh.com/politique-de-confidentialite" />

      <section className="container-tight py-16 max-w-3xl mx-auto space-y-8">
        <Breadcrumb items={[{ label: "Politique de Confidentialité" }]} />

        <h1 className="text-3xl sm:text-4xl font-display font-black text-foreground">
          Politique de Confidentialité
        </h1>

        <div className="bg-card border border-border rounded-3xl p-8 sm:p-10 shadow-card space-y-6 text-xs sm:text-sm text-muted-foreground leading-relaxed">
          <div>
            <h2 className="text-base font-display font-bold text-foreground mb-2">Collecte des données</h2>
            <p>
              Les données personnelles collectées (nom, numéro de téléphone, adresse de livraison et email) sont strictement nécessaires au traitement, à la préparation et à la livraison de vos commandes.
            </p>
          </div>

          <div>
            <h2 className="text-base font-display font-bold text-foreground mb-2">Utilisation des données</h2>
            <p>
              Vos coordonnées ne sont jamais vendues, louées ou cédées à des tiers à des fins publicitaires. Elles servent uniquement aux échanges opérationnels relatifs à vos repas.
            </p>
          </div>

          <div>
            <h2 className="text-base font-display font-bold text-foreground mb-2">Vos droits</h2>
            <p>
              Vous disposez à tout moment d'un droit d'accès, de rectification ou de suppression de vos données en nous contactant à l'adresse tchokonte@gmail.com.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default PolitiqueConfidentialite;
