import { Leaf, ShieldCheck, Heart } from "lucide-react";

export const Engagements = () => (
  <section className="container-tight py-12 max-w-4xl space-y-8">
    <div className="text-center max-w-2xl mx-auto">
      <h1 className="text-4xl font-display font-bold mb-2">Nos Engagements</h1>
      <p className="text-muted-foreground text-sm">Fraîcheur absolue, découpe minute et respect des producteurs locaux.</p>
    </div>
    <div className="grid sm:grid-cols-3 gap-6">
      <div className="bg-card border border-border rounded-3xl p-6 shadow-card">
        <Leaf size={24} className="text-[#1E3A2B] mb-2" />
        <h3 className="font-bold mb-1">Approvisionnement local</h3>
        <p className="text-xs text-muted-foreground">Légumes frais issus de l'agriculture camerounaise.</p>
      </div>
      <div className="bg-card border border-border rounded-3xl p-6 shadow-card">
        <ShieldCheck size={24} className="text-[#1E3A2B] mb-2" />
        <h3 className="font-bold mb-1">Hygiène rigoureuse</h3>
        <p className="text-xs text-muted-foreground">Protocoles sanitaires stricts en cuisine centrale.</p>
      </div>
      <div className="bg-card border border-border rounded-3xl p-6 shadow-card">
        <Heart size={24} className="text-[#1E3A2B] mb-2" />
        <h3 className="font-bold mb-1">Emballages responsables</h3>
        <p className="text-xs text-muted-foreground">Contenants recyclables préservant la fraîcheur.</p>
      </div>
    </div>
  </section>
);

export default Engagements;
