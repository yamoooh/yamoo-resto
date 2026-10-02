import Breadcrumb from "../../components/Breadcrumb";

export const PolitiqueCookies = () => {
  return (
    <>
      <title>Politique de Cookies | YAMOOH Douala</title>
      <meta
        name="description"
        content="Informations sur l'utilisation des cookies et du stockage local sur le site YAMOOH à Douala."
      />
      <link rel="canonical" href="https://yamooh.com/politique-de-cookies" />

      <section className="container-tight py-16 max-w-3xl mx-auto space-y-8">
        <Breadcrumb items={[{ label: "Politique de Cookies" }]} />

        <h1 className="text-3xl sm:text-4xl font-display font-black text-foreground">
          Politique de Cookies
        </h1>

        <div className="bg-card border border-border rounded-3xl p-8 sm:p-10 shadow-card space-y-6 text-xs sm:text-sm text-muted-foreground leading-relaxed">
          <div>
            <h2 className="text-base font-display font-bold text-foreground mb-2">Qu'est-ce qu'un cookie ?</h2>
            <p>
              Un cookie ou traceur local est un petit fichier texte temporaire déposé sur votre terminal lors de la consultation d'un site internet.
            </p>
          </div>

          <div>
            <h2 className="text-base font-display font-bold text-foreground mb-2">Cookies fonctionnels utilisés</h2>
            <p>
              Le site YAMOOH utilise uniquement le stockage local nécessaire à la persistance de votre panier d'achat et à la fluidité de votre navigation. Aucun cookie traceur tiers intrusif n'est activé à votre insu.
            </p>
          </div>

          <div>
            <h2 className="text-base font-display font-bold text-foreground mb-2">Gestion de vos préférences</h2>
            <p>
              Vous pouvez à tout moment configurer votre navigateur pour refuser ou supprimer les cookies stockés.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default PolitiqueCookies;
