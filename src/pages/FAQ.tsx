export const FAQ = () => {
  const faqs = [
    { q: "Comment commander chez YAMOOH ?", a: "Composez votre salade ou choisissez une formule signature, ajoutez-la au panier puis validez via WhatsApp." },
    { q: "Quels sont les délais de livraison à Douala ?", a: "En moyenne 30 à 45 minutes selon le quartier. Toutes nos salades sont découpées et assemblées minute." },
    { q: "Quels sont les modes de paiement ?", a: "Paiement en espèces à la livraison ou par Mobile Money (Orange Money / MTN Mobile Money)." },
    { q: "Où se trouve votre point de retrait ?", a: "Notre cuisine centrale et point de retrait sont situés à Pharmacie Kotto, Douala." },
  ];

  return (
    <section className="container-tight py-12 max-w-3xl space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-display font-bold mb-2">Foire aux questions</h1>
        <p className="text-muted-foreground text-sm">Tout ce que vous devez savoir pour commander en toute tranquillité.</p>
      </div>
      <div className="space-y-4">
        {faqs.map((f, i) => (
          <div key={i} className="bg-card border border-border rounded-2xl p-6 shadow-card">
            <h3 className="font-bold text-base mb-2 text-foreground">{f.q}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{f.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
