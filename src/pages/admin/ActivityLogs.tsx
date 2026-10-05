import React, { useState } from "react";
import { History, Search, Filter, Clock, User, ShieldCheck } from "lucide-react";
import { useData } from "../../contexts/DataContext";

export const ActivityLogs: React.FC = () => {
  const { activityLogs } = useData();
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");

  const filtered = activityLogs.filter((log) => {
    const matchSearch =
      log.targetEntity.toLowerCase().includes(search.toLowerCase()) ||
      log.details.toLowerCase().includes(search.toLowerCase()) ||
      log.adminName.toLowerCase().includes(search.toLowerCase());

    const matchType = filterType === "all" || log.actionType === filterType;

    return matchSearch && matchType;
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#E3ECE6] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-display font-black text-[#1E3A2B]">
              Journal d'Activité & Traçabilité (Audit Log)
            </h1>
            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#EBF4EE] text-[#3B8A49]">
              {activityLogs.length} événements
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Historique complet des actions administratives, modifications de prix, remplacements d'images et publications
          </p>
        </div>
      </div>

      <div className="bg-white border border-[#E3ECE6] rounded-3xl p-4 shadow-2xs">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-8 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" size={15} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher par administrateur, produit ou action..."
              className="w-full pl-9 pr-4 py-2.5 bg-[#FAF8F5] border border-[#E3ECE6] focus:border-[#3B8A49] focus:bg-white rounded-2xl text-xs font-medium outline-hidden"
            />
          </div>

          <div className="sm:col-span-4">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E3ECE6] rounded-2xl text-xs font-medium outline-hidden cursor-pointer"
            >
              <option value="all">Tous les types d'actions</option>
              <option value="create">Créations</option>
              <option value="update">Modifications de contenu</option>
              <option value="replace_image">Remplacements d'images</option>
              <option value="delete">Suppressions</option>
              <option value="login">Connexions</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white border border-[#E3ECE6] rounded-3xl shadow-2xs overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#E3ECE6] bg-[#FAF8F5]/80 text-[10.5px] font-mono uppercase font-bold text-muted-foreground">
              <th className="py-3.5 px-4 w-36">Date & Heure</th>
              <th className="py-3.5 px-4 w-40">Administrateur</th>
              <th className="py-3.5 px-4 w-32">Type d'action</th>
              <th className="py-3.5 px-4">Élément concerné</th>
              <th className="py-3.5 px-4">Détails de la modification</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E3ECE6] text-xs">
            {filtered.map((log) => (
              <tr key={log.id} className="hover:bg-[#FAF8F5]/50 transition">
                <td className="py-3.5 px-4 font-mono text-[11px] text-muted-foreground whitespace-nowrap">
                  {log.timestamp}
                </td>
                <td className="py-3.5 px-4 font-bold text-[#1E3A2B]">{log.adminName}</td>
                <td className="py-3.5 px-4">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full font-mono text-[9.5px] font-bold uppercase ${
                      log.actionType === "create"
                        ? "bg-green-100 text-green-800"
                        : log.actionType === "update"
                        ? "bg-blue-100 text-blue-800"
                        : log.actionType === "replace_image"
                        ? "bg-purple-100 text-purple-800"
                        : log.actionType === "delete"
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {log.actionType}
                  </span>
                </td>
                <td className="py-3.5 px-4 font-semibold text-[#1E3A2B]">{log.targetEntity}</td>
                <td className="py-3.5 px-4 text-muted-foreground leading-relaxed">{log.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActivityLogs;
