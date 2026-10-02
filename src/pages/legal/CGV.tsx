import Breadcrumb from "../../components/Breadcrumb";

export const CGV = () => {
  return (
    <>
      <title>Conditions Générales de Vente | YAMOOH Douala</title>
      <meta
        name="description"
        content="Consultez les conditions générales de vente de YAMOOH à Douala concernant les commandes de repas et prestations traiteur."
      />
      <link rel="canonical" href="https://yamooh.com/cgv" />

      <section className="container-tight py-16 max-w-3xl mx-auto space-y-8">
        <Breadcrumb items={[{ label: "Conditions Générales de Vente" }]} />

        <h1 className="text-3xl sm:text-4xl font-display font-black text-foreground">
          Conditions Générales de Vente
        </h1>

        <div className="bg-card border border-border rounded-3xl p-8 sm:p-10 shadow-card space-y-6 text-xs sm:text-sm text-muted-foreground leading-relaxed">
          <div>
            <h2 className="text-base font-display font-bold text-foreground mb-2">1. Objet</h2>
            <p>
              Les présentes Conditions Générales de Vente régissent les commandes de produits alimentaires (salades, plats, boissons) et les prestations de service traiteur effectuées auprès de YAMOOH à Douala.
            </p>
          </div>

          <div>
            <h2 className="text-base font-display font-bold text-foreground mb-2">2. Commandes & Validation</h2>
            <p>
              Les commandes individuelles s'effectuent via le site web et sont confirmées par message WhatsApp. Les commandes traiteur font l'objet d'un devis préalable validé entre les parties.
            </p>
          </div>

          <div>
            <h2 className="text-base font-display font-bold text-foreground mb-2">3. Tarifs & Règlement</h2>
            <p>
              Les prix sont indiqués en Francs CFA (FCFA). Le règlement s'effectue à la livraison en espèces ou par Mobile Money (Orange Money / MTN MoMo).
            </p>
          </div>

          <div>
            <h2 className="text-base font-display font-bold text-foreground mb-2">4. Livraison & Retrait</h2>
            <p>
              La livraison s'effectue dans les quartiers desservis de Douala. Le retrait sans frais est possible au point de retrait situé à la Pharmacie Kotto.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default CGV;
