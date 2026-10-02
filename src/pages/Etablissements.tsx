import { MapPin, Clock, Phone, Mail } from "lucide-react";

export const Etablissements = () => (
  <section className="container-tight py-12 max-w-4xl space-y-8">
    <div className="text-center max-w-2xl mx-auto">
      <h1 className="text-4xl font-display font-bold mb-2">Notre Établissement</h1>
      <p className="text-muted-foreground text-sm">Cuisine centrale et point de retrait à Douala.</p>
    </div>

    <div className="bg-card border border-border rounded-3xl p-8 shadow-card space-y-4 text-xs text-muted-foreground">
      <p className="flex items-start gap-3"><MapPin size={18} className="text-[#1E3A2B] shrink-0 mt-0.5" /> <span><strong>Adresse :</strong> Pharmacie Kotto, Douala, Cameroun</span></p>
      <p className="flex items-start gap-3"><Clock size={18} className="text-[#1E3A2B] shrink-0 mt-0.5" /> <span><strong>Horaires :</strong> Lundi au Samedi · 10h00 – 21h00</span></p>
      <p className="flex items-start gap-3"><Phone size={18} className="text-[#1E3A2B] shrink-0 mt-0.5" /> <span><strong>Téléphone & WhatsApp :</strong> +237 658 254 509</span></p>
      <p className="flex items-start gap-3"><Mail size={18} className="text-[#1E3A2B] shrink-0 mt-0.5" /> <span><strong>Email :</strong> tchokonte@gmail.com</span></p>
    </div>
  </section>
);

export default Etablissements;
