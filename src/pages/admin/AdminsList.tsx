import React, { useState } from "react";
import { Shield, Plus, Trash2, UserPlus, Save, X, CheckCircle2, Lock } from "lucide-react";
import { useData, AdminUser } from "../../contexts/DataContext";
import { useAdminAuth } from "../../contexts/AdminAuthContext";

export const AdminsList: React.FC = () => {
  const { admins, addAdmin, deleteAdmin } = useData();
  const { currentAdmin } = useAdminAuth();
  const [isCreating, setIsCreating] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<AdminUser["role"]>("editor");

  const handleCreateAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    addAdmin({
      name,
      email,
      role,
    });
    setName("");
    setEmail("");
    setIsCreating(false);
  };

  const isSuperAdmin = currentAdmin?.role === "super_admin";

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#E3ECE6] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-display font-black text-[#1E3A2B]">
              Comptes Administrateurs & Privilèges
            </h1>
            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#EBF4EE] text-[#3B8A49]">
              {admins.length} comptes
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Gérez les accès, rôles et permissions des membres de l'équipe d'administration
          </p>
        </div>

        {isSuperAdmin && (
          <button
            onClick={() => setIsCreating(true)}
            className="inline-flex items-center gap-2 bg-[#3B8A49] hover:bg-[#2F6F3B] text-white px-5 py-3 rounded-full font-bold text-xs uppercase tracking-wider transition shadow-soft cursor-pointer"
          >
            <UserPlus size={15} />
            <span>+ Ajouter un administrateur</span>
          </button>
        )}
      </div>

      {/* FORMULAIRE NOUVEL ADMIN */}
      {isCreating && (
        <div className="bg-white border-2 border-[#3B8A49] rounded-3xl p-6 shadow-card space-y-4 animate-in fade-in">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-[#3B8A49]">
              Créer un nouveau compte administrateur
            </h3>
            <button
              onClick={() => setIsCreating(false)}
              className="p-1 rounded-lg text-muted-foreground hover:bg-gray-100 cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>

          <form onSubmit={handleCreateAdmin} className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-[#1E3A2B] mb-1 font-mono">
                Nom complet *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Chef Traiteur"
                required
                className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#E3ECE6] rounded-xl text-xs font-medium outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[#1E3A2B] mb-1 font-mono">
                Adresse E-mail *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="chef@yamooh.com"
                required
                className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#E3ECE6] rounded-xl text-xs font-medium outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[#1E3A2B] mb-1 font-mono">
                Rôle & Permissions *
              </label>
              <select
                value={role}
                onChange={(e: any) => setRole(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E3ECE6] rounded-xl text-xs font-bold outline-hidden cursor-pointer"
              >
                <option value="admin">Administrateur (Gestion complète)</option>
                <option value="editor">Éditeur Catalogue (Produits & Médias)</option>
                <option value="marketing">Marketing (Promotions & Textes)</option>
              </select>
            </div>

            <div className="sm:col-span-3 flex justify-end pt-2 border-t border-[#E3ECE6]">
              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-[#3B8A49] hover:bg-[#2F6F3B] text-white px-6 py-2 rounded-full font-bold text-xs uppercase tracking-wider transition shadow-xs cursor-pointer"
              >
                <Save size={14} />
                <span>Créer le compte</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* LISTE DES ADMINS */}
      <div className="bg-white border border-[#E3ECE6] rounded-3xl shadow-2xs overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#E3ECE6] bg-[#FAF8F5]/80 text-[10.5px] font-mono uppercase font-bold text-muted-foreground">
              <th className="py-3.5 px-4">Administrateur</th>
              <th className="py-3.5 px-4">E-mail</th>
              <th className="py-3.5 px-4">Rôle</th>
              <th className="py-3.5 px-4">Dernière Connexion</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E3ECE6] text-xs">
            {admins.map((admin) => (
              <tr key={admin.id} className="hover:bg-[#FAF8F5]/50 transition">
                <td className="py-3.5 px-4 font-bold text-[#1E3A2B]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-[#3B8A49] text-white flex items-center justify-center font-bold text-xs">
                      {admin.name.charAt(0)}
                    </div>
                    <span>{admin.name}</span>
                  </div>
                </td>
                <td className="py-3.5 px-4 font-mono text-muted-foreground">{admin.email}</td>
                <td className="py-3.5 px-4">
                  <span
                    className={`inline-block px-2.5 py-1 rounded-full font-mono text-[10px] font-bold uppercase ${
                      admin.role === "super_admin"
                        ? "bg-amber-100 text-amber-800"
                        : admin.role === "admin"
                        ? "bg-green-100 text-green-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {admin.role.replace("_", " ")}
                  </span>
                </td>
                <td className="py-3.5 px-4 font-mono text-muted-foreground text-[11px]">
                  {admin.lastLogin || "Récemment"}
                </td>
                <td className="py-3.5 px-4 text-right">
                  {isSuperAdmin && admin.role !== "super_admin" && (
                    <button
                      onClick={() => {
                        if (window.confirm(`Supprimer l'accès de l'administrateur « ${admin.name} » ?`)) {
                          deleteAdmin(admin.id);
                        }
                      }}
                      className="p-1.5 rounded-lg text-muted-foreground hover:text-red-600 hover:bg-red-50 transition cursor-pointer"
                      title="Supprimer l'administrateur"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminsList;
