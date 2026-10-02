export const Realisations = () => (
  <section className="container-tight py-12 max-w-4xl space-y-6">
    <div className="text-center max-w-2xl mx-auto mb-6">
      <h1 className="text-4xl font-display font-bold mb-2">Nos Réalisations</h1>
      <p className="text-muted-foreground text-sm">Découvrez nos compositions et événements partagés à Douala.</p>
    </div>
    <div className="grid sm:grid-cols-3 gap-6">
      <div className="bg-card border border-border rounded-3xl p-6 shadow-card">
        <h3 className="font-bold mb-1">Plateaux Repas Séminaires</h3>
        <p className="text-xs text-muted-foreground">Livraisons entreprises à Akwa et Bonanjo.</p>
      </div>
      <div className="bg-card border border-border rounded-3xl p-6 shadow-card">
        <h3 className="font-bold mb-1">Buffet Salade Bar</h3>
        <p className="text-xs text-muted-foreground">Événements d'équipe et ateliers de travail.</p>
      </div>
      <div className="bg-card border border-border rounded-3xl p-6 shadow-card">
        <h3 className="font-bold mb-1">Cocktails Privés</h3>
        <p className="text-xs text-muted-foreground">Bouchées fraîches et jus naturels pressés.</p>
      </div>
    </div>
  </section>
);

export default Realisations;
