import { Link } from "react-router-dom";
import { Send, FileText, HelpCircle, AlertTriangle, Phone, Mail, MapPin } from "lucide-react";

export const ContactAide = () => {
  const WHATSAPP = "237658254509";
  return (
    <section className="container-tight py-12 max-w-4xl space-y-10">
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold text-[#D96B43] uppercase tracking-widest">SUPPORT & CONTACT</span>
        <h1 className="text-4xl font-display font-bold mt-2 mb-4">Centre d'aide & Contact</h1>
        <p className="text-muted-foreground text-sm">Une question, un devis ou une commande spéciale ? Nous sommes à votre écoute.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <Link to="/contact" className="bg-card border border-border rounded-3xl p-6 shadow-card hover:border-[#1E3A2B] transition">
          <Send size={24} className="text-[#1E3A2B] mb-3" />
          <h3 className="font-bold text-lg mb-1">Commander & Nous contacter</h3>
          <p className="text-xs text-muted-foreground">Commander directement sur WhatsApp ou poser une question.</p>
        </Link>
        <Link to="/devis" className="bg-card border border-border rounded-3xl p-6 shadow-card hover:border-[#1E3A2B] transition">
          <FileText size={24} className="text-[#D96B43] mb-3" />
          <h3 className="font-bold text-lg mb-1">Demande de devis traiteur</h3>
          <p className="text-xs text-muted-foreground">Plateaux repas d'affaires, réunions et buffets à Douala.</p>
        </Link>
        <Link to="/faq" className="bg-card border border-border rounded-3xl p-6 shadow-card hover:border-[#1E3A2B] transition">
          <HelpCircle size={24} className="text-[#1E3A2B] mb-3" />
          <h3 className="font-bold text-lg mb-1">Foire aux questions (FAQ)</h3>
          <p className="text-xs text-muted-foreground">Horaires, modes de paiement et zones de livraison.</p>
        </Link>
        <Link to="/allergenes" className="bg-card border border-border rounded-3xl p-6 shadow-card hover:border-[#1E3A2B] transition">
          <AlertTriangle size={24} className="text-[#D96B43] mb-3" />
          <h3 className="font-bold text-lg mb-1">Guide des allergènes</h3>
          <p className="text-xs text-muted-foreground">Détail des ingrédients et informations nutritionnelles.</p>
        </Link>
      </div>
    </section>
  );
};

export default ContactAide;
