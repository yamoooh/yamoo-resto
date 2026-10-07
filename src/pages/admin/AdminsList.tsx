import React, { useState, useEffect } from "react";
import { Shield, Plus, Trash2, UserPlus, Save, X, CheckCircle2, Lock, Eye, EyeOff, Edit2, Upload, AlertCircle } from "lucide-react";
import { useAdminAuth } from "../../contexts/AdminAuthContext";
import { supabase } from "../../integrations/supabase/client";

export const AdminsList: React.FC = () => {
  const { currentAdmin } = useAdminAuth();
  
  // States
  const [admins, setAdmins] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // My Profile Edition
  const [myProfileName, setMyProfileName] = useState(currentAdmin?.name || "");
  const [myNewPassword, setMyNewPassword] = useState("");
  const [showMyPassword, setShowMyPassword] = useState(false);

  // New Admin Creation
  const [isCreating, setIsCreating] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newRole, setNewRole] = useState("editor");
  const [showNewPassword, setShowNewPassword] = useState(false);

  const isSuperAdmin = currentAdmin?.role === "super_admin";

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const { data, error } = await supabase.from("admins").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      setAdmins(data || []);
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateMyProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    
    try {
      if (myNewPassword) {
        if (myNewPassword.length < 6) {
          throw new Error("Le mot de passe doit contenir au moins 6 caractères.");
        }
        const { error: authErr } = await supabase.auth.updateUser({ password: myNewPassword });
        if (authErr) throw authErr;
      }

      if (myProfileName !== currentAdmin?.name) {
        const { error: dbErr } = await supabase.from("admins").update({ name: myProfileName }).eq("id", currentAdmin?.id);
        if (dbErr) throw dbErr;
      }

      setSuccess("Votre profil a été mis à jour avec succès.");
      setMyNewPassword("");
      fetchAdmins();
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!isSuperAdmin) {
      setError("Seul un super administrateur peut créer d'autres comptes.");
      return;
    }

    if (newPassword.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }

    try {
      // Use the custom RPC deployed via MCP to securely create a new Auth user + Admin record
      const { error: rpcErr } = await supabase.rpc("create_admin_user", {
        new_email: newEmail.trim(),
        new_password: newPassword,
        new_name: newName.trim(),
        new_role: newRole
      });

      if (rpcErr) throw rpcErr;

      setSuccess(`L'administrateur ${newName} a été créé avec succès ! Il peut se connecter immédiatement.`);
      setIsCreating(false);
      setNewName("");
      setNewEmail("");
      setNewPassword("");
      fetchAdmins();
      setTimeout(() => setSuccess(null), 4000);
    } catch (err: any) {
      setError(err.message || "Erreur lors de la création de l'administrateur.");
    }
  };

  const handleDeleteAdmin = async (id: string) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cet administrateur ? Il perdra définitivement l'accès.")) return;
    try {
      // Pour une vraie suppression, il faudrait supprimer de auth.users (necessite backend). 
      // Ici, on le supprime de "admins" pour lui bloquer l'accès applicatif.
      const { error } = await supabase.from("admins").delete().eq("id", id);
      if (error) throw error;
      setSuccess("Administrateur supprimé avec succès.");
      fetchAdmins();
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-black tracking-tight text-[#1E3A2B]">Profil & Équipe</h1>
          <p className="text-sm text-muted-foreground mt-1">Gérez votre profil et les accès au back-office</p>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-xl border border-red-200 flex items-center gap-2">
          <AlertCircle size={16} />
          <span className="text-sm">{error}</span>
        </div>
      )}
      {success && (
        <div className="p-4 bg-[#EBF4EE] text-[#2F6F3B] rounded-xl border border-[#3B8A49]/30 flex items-center gap-2">
          <CheckCircle2 size={16} />
          <span className="text-sm">{success}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* MON PROFIL */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl border border-[#E3ECE6] shadow-sm overflow-hidden p-5">
            <h2 className="font-bold text-[#1E3A2B] mb-4 flex items-center gap-2">
              <Shield size={18} className="text-[#3B8A49]" />
              Mon Profil
            </h2>
            <form onSubmit={handleUpdateMyProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#1E3A2B] mb-1.5">Nom complet</label>
                <input
                  type="text"
                  required
                  value={myProfileName}
                  onChange={(e) => setMyProfileName(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-[#E3ECE6] focus:border-[#3B8A49] focus:ring-1 focus:ring-[#3B8A49] transition outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#1E3A2B] mb-1.5">Email (Lecture seule)</label>
                <input
                  type="email"
                  disabled
                  value={currentAdmin?.email || ""}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-[#E3ECE6] bg-gray-50 text-gray-500 cursor-not-allowed outline-none"
                />
              </div>
              <div className="pt-2 border-t border-[#E3ECE6]">
                <label className="block text-xs font-bold text-[#1E3A2B] mb-1.5">Nouveau mot de passe</label>
                <div className="relative">
                  <Lock size={14} className="absolute left-3 top-2.5 text-muted-foreground" />
                  <input
                    type={showMyPassword ? "text" : "password"}
                    value={myNewPassword}
                    onChange={(e) => setMyNewPassword(e.target.value)}
                    placeholder="Laisser vide pour ne pas modifier"
                    className="w-full pl-9 pr-10 py-2 text-sm rounded-xl border border-[#E3ECE6] focus:border-[#3B8A49] focus:ring-1 focus:ring-[#3B8A49] transition outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowMyPassword(!showMyPassword)}
                    className="absolute right-3 top-2.5 text-muted-foreground hover:text-[#1E3A2B]"
                  >
                    {showMyPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-[#3B8A49] hover:bg-[#2F6F3B] text-white py-2 rounded-xl text-sm font-bold shadow-xs transition flex items-center justify-center gap-2 mt-4"
              >
                <Save size={16} /> Mettre à jour mon profil
              </button>
            </form>
          </div>
        </div>

        {/* LISTE DES ADMINISTRATEURS */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-[#E3ECE6] shadow-sm overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-[#E3ECE6] flex items-center justify-between">
              <h2 className="font-bold text-[#1E3A2B] flex items-center gap-2">
                <Shield size={18} className="text-[#3B8A49]" />
                Équipe Administrateurs
              </h2>
              {isSuperAdmin && !isCreating && (
                <button
                  onClick={() => setIsCreating(true)}
                  className="bg-[#1E3A2B] hover:bg-[#15271d] text-white px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
                >
                  <UserPlus size={14} />
                  Nouvel Admin
                </button>
              )}
            </div>

            {isCreating && (
              <div className="p-5 border-b border-[#E3ECE6] bg-[#FAF8F5]">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-[#1E3A2B]">Créer un nouvel accès Back-Office</h3>
                  <button onClick={() => setIsCreating(false)} className="text-muted-foreground hover:text-[#1E3A2B]">
                    <X size={18} />
                  </button>
                </div>
                <form onSubmit={handleCreateAdmin} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1E3A2B] mb-1.5">Nom complet *</label>
                    <input type="text" required value={newName} onChange={e => setNewName(e.target.value)} className="w-full px-3 py-2 text-sm rounded-xl border border-[#E3ECE6] focus:border-[#3B8A49] outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#1E3A2B] mb-1.5">Email de connexion *</label>
                    <input type="email" required value={newEmail} onChange={e => setNewEmail(e.target.value)} className="w-full px-3 py-2 text-sm rounded-xl border border-[#E3ECE6] focus:border-[#3B8A49] outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#1E3A2B] mb-1.5">Mot de passe *</label>
                    <div className="relative">
                      <Lock size={14} className="absolute left-3 top-2.5 text-muted-foreground" />
                      <input type={showNewPassword ? "text" : "password"} required value={newPassword} onChange={e => setNewPassword(e.target.value)} className="w-full pl-9 pr-10 py-2 text-sm rounded-xl border border-[#E3ECE6] focus:border-[#3B8A49] outline-none" />
                      <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute right-3 top-2.5 text-muted-foreground">
                        {showNewPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#1E3A2B] mb-1.5">Rôle</label>
                    <select value={newRole} onChange={e => setNewRole(e.target.value)} className="w-full px-3 py-2 text-sm rounded-xl border border-[#E3ECE6] focus:border-[#3B8A49] outline-none bg-white">
                      <option value="editor">Éditeur (Limité)</option>
                      <option value="super_admin">Super Admin (Accès total)</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2 pt-2">
                    <button type="submit" className="bg-[#3B8A49] hover:bg-[#2F6F3B] text-white px-4 py-2 rounded-xl text-sm font-bold shadow-xs transition w-full sm:w-auto">
                      Créer l'accès
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-[#FAF8F5] text-[#1E3A2B] font-bold border-b border-[#E3ECE6]">
                  <tr>
                    <th className="p-4">Administrateur</th>
                    <th className="p-4">Rôle</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E3ECE6]">
                  {loading ? (
                    <tr><td colSpan={3} className="p-4 text-center text-muted-foreground">Chargement...</td></tr>
                  ) : admins.map((admin) => (
                    <tr key={admin.id} className="hover:bg-gray-50/50 transition">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#EBF4EE] text-[#3B8A49] flex items-center justify-center font-bold text-xs uppercase shrink-0">
                            {admin.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-[#1E3A2B] text-[13px]">{admin.name} {admin.id === currentAdmin?.id && <span className="ml-2 text-[10px] bg-[#EBF4EE] text-[#3B8A49] px-2 py-0.5 rounded-full">Moi</span>}</p>
                            <p className="text-[11px] text-muted-foreground">{admin.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                          admin.role === "super_admin" 
                            ? "bg-[#1E3A2B] text-white" 
                            : "bg-[#EBF4EE] text-[#3B8A49]"
                        }`}>
                          {admin.role === "super_admin" ? "Super Admin" : "Éditeur"}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        {isSuperAdmin && admin.id !== currentAdmin?.id && (
                          <button
                            onClick={() => handleDeleteAdmin(admin.id)}
                            className="p-1.5 text-muted-foreground hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                            title="Révoquer l'accès"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminsList;
