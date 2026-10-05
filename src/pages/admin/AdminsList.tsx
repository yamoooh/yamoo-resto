import React, { useState } from "react";
import { Shield, Plus, Trash2, UserPlus, Save, X, CheckCircle2, Lock, Eye, EyeOff, Edit2, Upload } from "lucide-react";
import { useData, AdminUser } from "../../contexts/DataContext";
import { useAdminAuth } from "../../contexts/AdminAuthContext";

export const AdminsList: React.FC = () => {
  const { admins, addAdmin, deleteAdmin, updateAdminProfile } = useData();
  const { currentAdmin } = useAdminAuth();
  
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Champs création
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<AdminUser["role"]>("editor");

  // Champs édition
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [editAvatar, setEditAvatar] = useState("");
  const [showEditPassword, setShowEditPassword] = useState(false);

  const isSuperAdmin = currentAdmin?.role === "super_admin";

  const handleCreateAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    addAdmin({
      name,
      email,
      password: password || undefined,
      role,
    });
    setName("");
    setEmail("");
    setPassword("");
    setIsCreating(false);
  };

  const startEdit = (admin: AdminUser) => {
    setEditingId(admin.id);
    setEditName(admin.name);
    setEditEmail(admin.email);
    setEditAvatar(admin.avatar || "");
    setEditPassword(""); // Par défaut vide
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName("");
    setEditEmail("");
    setEditAvatar("");
    setEditPassword("");
  };

  const handleEditSubmit = (e: React.FormEvent, adminId: string) => {
    e.preventDefault();
    updateAdminProfile(adminId, {
      name: editName,
      email: editEmail,
      avatar: editAvatar || undefined,
      ...(editPassword ? { password: editPassword } : {}),
    });
    cancelEdit();
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

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
            Gérez les accès, rôles et personnalisez votre profil administrateur
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

          <form onSubmit={handleCreateAdmin} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
                Mot de passe *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-3 pr-9 py-2.5 bg-[#FAF8F5] border border-[#E3ECE6] rounded-xl text-xs font-medium outline-hidden"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-[#1E3A2B] cursor-pointer"
                >
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
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

            <div className="sm:col-span-2 lg:col-span-4 flex justify-end pt-2 border-t border-[#E3ECE6]">
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
              <th className="py-3.5 px-4 w-[300px]">Administrateur</th>
              <th className="py-3.5 px-4">Coordonnées & Connexion</th>
              <th className="py-3.5 px-4">Rôle</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E3ECE6] text-xs">
            {admins.map((admin) => {
              const isEditing = editingId === admin.id;
              // On permet l'édition de son PROPRE compte ou de n'importe quel compte si super_admin
              const canEdit = isSuperAdmin || currentAdmin?.id === admin.id;

              return (
                <tr key={admin.id} className={`transition ${isEditing ? 'bg-[#F2F9F4]' : 'hover:bg-[#FAF8F5]/50'}`}>
                  <td className="py-4 px-4 align-top">
                    {isEditing ? (
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <label className="relative flex-shrink-0 cursor-pointer group">
                            <div className="w-12 h-12 rounded-full overflow-hidden bg-[#3B8A49] text-white flex items-center justify-center font-bold text-lg border-2 border-transparent group-hover:border-[#3B8A49] transition">
                              {editAvatar ? (
                                <img src={editAvatar} alt="Avatar" className="w-full h-full object-cover" />
                              ) : (
                                editName.charAt(0) || admin.name.charAt(0)
                              )}
                            </div>
                            <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                              <Upload size={14} className="text-white" />
                            </div>
                            <input type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
                          </label>
                          <div className="flex-1">
                            <label className="text-[10px] uppercase font-bold text-muted-foreground mb-1 block">Nom complet</label>
                            <input
                              type="text"
                              value={editName}
                              onChange={(e) => setEditName(e.target.value)}
                              className="w-full px-2 py-1 bg-white border border-[#3B8A49] rounded-md text-xs font-bold text-[#1E3A2B] outline-hidden"
                              required
                              form={`edit-form-${admin.id}`}
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 flex-shrink-0 rounded-full overflow-hidden bg-[#3B8A49] text-white flex items-center justify-center font-bold text-base shadow-sm">
                          {admin.avatar ? (
                            <img src={admin.avatar} alt={admin.name} className="w-full h-full object-cover" />
                          ) : (
                            admin.name.charAt(0)
                          )}
                        </div>
                        <div>
                          <div className="font-bold text-[#1E3A2B] text-sm">{admin.name}</div>
                          {currentAdmin?.id === admin.id && (
                            <span className="text-[9px] uppercase font-bold text-[#3B8A49] bg-[#EBF4EE] px-1.5 py-0.5 rounded-full mt-0.5 inline-block">
                              C'est vous
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </td>

                  <td className="py-4 px-4 align-top">
                    {isEditing ? (
                      <form id={`edit-form-${admin.id}`} onSubmit={(e) => handleEditSubmit(e, admin.id)} className="space-y-2">
                        <div>
                          <label className="text-[10px] uppercase font-bold text-muted-foreground mb-1 block">Email</label>
                          <input
                            type="email"
                            value={editEmail}
                            onChange={(e) => setEditEmail(e.target.value)}
                            className="w-full max-w-[220px] px-2 py-1 bg-white border border-[#3B8A49] rounded-md text-xs font-mono outline-hidden block"
                            required
                          />
                        </div>
                        <div>
                          <label className="text-[10px] uppercase font-bold text-muted-foreground mb-1 block">Nouveau mot de passe</label>
                          <div className="relative max-w-[220px]">
                            <input
                              type={showEditPassword ? "text" : "password"}
                              value={editPassword}
                              onChange={(e) => setEditPassword(e.target.value)}
                              placeholder="(Laisser vide pour ne pas changer)"
                              className="w-full px-2 py-1 pr-8 bg-white border border-[#3B8A49] rounded-md text-xs font-mono outline-hidden"
                            />
                            <button
                              type="button"
                              onClick={() => setShowEditPassword(!showEditPassword)}
                              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-[#1E3A2B] cursor-pointer"
                            >
                              {showEditPassword ? <EyeOff size={12} /> : <Eye size={12} />}
                            </button>
                          </div>
                        </div>
                      </form>
                    ) : (
                      <div className="space-y-1 mt-1">
                        <div className="font-mono text-muted-foreground flex items-center gap-1.5">
                          <Mail size={12} />
                          <span>{admin.email}</span>
                        </div>
                        <div className="text-[10px] text-muted-foreground/70 flex items-center gap-1.5">
                          <Lock size={12} />
                          <span>Dernière connexion: {admin.lastLogin || "Récemment"}</span>
                        </div>
                      </div>
                    )}
                  </td>
                  
                  <td className="py-4 px-4 align-top">
                    <span
                      className={`inline-block mt-2 px-2.5 py-1 rounded-full font-mono text-[10px] font-bold uppercase ${
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
                  
                  <td className="py-4 px-4 text-right align-top">
                    <div className="flex items-center justify-end gap-1 mt-1">
                      {isEditing ? (
                        <>
                          <button
                            type="submit"
                            form={`edit-form-${admin.id}`}
                            className="p-1.5 rounded-lg text-white bg-[#3B8A49] hover:bg-[#2F6F3B] transition shadow-xs cursor-pointer flex items-center gap-1 px-3"
                            title="Sauvegarder"
                          >
                            <Save size={14} />
                            <span className="font-bold">Sauvegarder</span>
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="p-1.5 rounded-lg text-muted-foreground hover:bg-gray-100 transition cursor-pointer"
                            title="Annuler"
                          >
                            <X size={16} />
                          </button>
                        </>
                      ) : (
                        <>
                          {canEdit && (
                            <button
                              onClick={() => startEdit(admin)}
                              className="p-2 rounded-lg text-muted-foreground hover:text-[#3B8A49] hover:bg-green-50 transition cursor-pointer flex items-center gap-1.5 border border-transparent hover:border-green-200"
                              title="Modifier mon profil"
                            >
                              <Edit2 size={14} />
                              <span className="font-bold text-[10px] uppercase">Modifier</span>
                            </button>
                          )}
                          {isSuperAdmin && admin.role !== "super_admin" && (
                            <button
                              onClick={() => {
                                if (window.confirm(`Supprimer l'accès de l'administrateur « ${admin.name} » ?`)) {
                                  deleteAdmin(admin.id);
                                }
                              }}
                              className="p-2 rounded-lg text-muted-foreground hover:text-red-600 hover:bg-red-50 transition cursor-pointer"
                              title="Supprimer l'administrateur"
                            >
                              <Trash2 size={14} />
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminsList;
