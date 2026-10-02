export const HowItWorks = () => (
  <section className="container-tight py-12 max-w-4xl space-y-8">
    <div className="text-center max-w-2xl mx-auto">
      <h1 className="text-4xl font-display font-bold mb-2">Comment ça marche ?</h1>
      <p className="text-muted-foreground text-sm">De votre sélection en ligne à la réception de votre repas à Douala.</p>
    </div>
    <div className="grid sm:grid-cols-4 gap-4">
      <div className="bg-card border border-border rounded-3xl p-6 shadow-card">
        <span className="text-2xl font-display font-bold text-[#D96B43]">01</span>
        <h3 className="font-bold text-sm mt-2 mb-1">Choisissez</h3>
        <p className="text-xs text-muted-foreground">Une recette signature ou personnalisée.</p>
      </div>
      <div className="bg-card border border-border rounded-3xl p-6 shadow-card">
        <span className="text-2xl font-display font-bold text-[#D96B43]">02</span>
        <h3 className="font-bold text-sm mt-2 mb-1">Personnalisez</h3>
        <p className="text-xs text-muted-foreground">Vos bases, protéines, légumes et sauces.</p>
      </div>
      <div className="bg-card border border-border rounded-3xl p-6 shadow-card">
        <span className="text-2xl font-display font-bold text-[#D96B43]">03</span>
        <h3 className="font-bold text-sm mt-2 mb-1">Validez</h3>
        <p className="text-xs text-muted-foreground">Votre panier avec vos coordonnées.</p>
      </div>
      <div className="bg-card border border-border rounded-3xl p-6 shadow-card">
        <span className="text-2xl font-display font-bold text-[#D96B43]">04</span>
        <h3 className="font-bold text-sm mt-2 mb-1">Régalez-vous</h3>
        <p className="text-xs text-muted-foreground">Livraison express ou retrait sur place.</p>
      </div>
    </div>
  </section>
);

export default HowItWorks;
