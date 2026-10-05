import React, { useState } from "react";
import { Users, Search, Mail, Phone, MapPin, CheckCircle2, UserPlus, Clock } from "lucide-react";
import { useData } from "../../contexts/DataContext";

export const CustomersList: React.FC = () => {
  const { customers } = useData();
  const [search, setSearch] = useState("");

  const filtered = customers.filter(
    (c) =>
      c.fullName.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search) ||
      c.district.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-display font-black text-[#1E3A2B]">
              Comptes Clients Enregistrés
            </h1>
            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#EBF4EE] text-[#3B8A49]">
              {customers.length} clients
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Gestion des coordonnées, quartiers de livraison et suivi des comptes utilisateurs
          </p>
        </div>
      </div>

      <div className="bg-white border border-[#E3ECE6] rounded-3xl p-4 shadow-2xs">
        <div className="relative max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" size={15} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un client par nom, e-mail, téléphone ou quartier..."
            className="w-full pl-9 pr-4 py-2.5 bg-[#FAF8F5] border border-[#E3ECE6] focus:border-[#3B8A49] focus:bg-white rounded-2xl text-xs font-medium outline-hidden"
          />
        </div>
      </div>

      <div className="bg-white border border-[#E3ECE6] rounded-3xl shadow-2xs overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#E3ECE6] bg-[#FAF8F5]/80 text-[10.5px] font-mono uppercase font-bold text-muted-foreground">
              <th className="py-3.5 px-4">Client</th>
              <th className="py-3.5 px-4">Contact</th>
              <th className="py-3.5 px-4">Localisation</th>
              <th className="py-3.5 px-4">Commandes</th>
              <th className="py-3.5 px-4">Inscrit le</th>
              <th className="py-3.5 px-4">Statut</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E3ECE6] text-xs">
            {filtered.map((c) => (
              <tr key={c.id} className="hover:bg-[#FAF8F5]/50 transition">
                <td className="py-3.5 px-4">
                  <div className="font-bold text-[#1E3A2B]">{c.fullName}</div>
                  <div className="text-[11px] text-muted-foreground">{c.email}</div>
                </td>
                <td className="py-3.5 px-4 font-mono font-medium">{c.phone}</td>
                <td className="py-3.5 px-4">
                  <span className="font-medium text-[#1E3A2B]">{c.district}</span>
                  <span className="text-[10.5px] text-muted-foreground block">{c.city}</span>
                </td>
                <td className="py-3.5 px-4">
                  <span className="px-2.5 py-1 rounded-full bg-[#EBF4EE] text-[#3B8A49] font-bold text-[11px]">
                    {c.ordersCount} commandes
                  </span>
                </td>
                <td className="py-3.5 px-4 font-mono text-muted-foreground">{c.createdAt}</td>
                <td className="py-3.5 px-4">
                  <span className="inline-flex items-center gap-1 text-green-700 font-bold text-[10.5px]">
                    <CheckCircle2 size={12} /> Actif
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomersList;
