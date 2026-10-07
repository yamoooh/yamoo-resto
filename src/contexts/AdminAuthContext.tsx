import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { AdminUser } from "./DataContext";

interface AdminAuthContextType {
  currentAdmin: AdminUser | null;
  isAuthenticated: boolean;
  needsInitialSetup: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  setupFirstAdmin: (name: string, email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  resetPassword: (email: string, newPass?: string) => Promise<{ success: boolean; error?: string }>;
  hasPermission: (permission: "catalog" | "media" | "content" | "marketing" | "clients" | "admins") => boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | null>(null);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentAdmin, setCurrentAdmin] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Pour la rétrocompatibilité ou une migration future, on considère que la base n'est jamais vide.
  const needsInitialSetup = false; 

  const fetchAdminProfile = async (userId: string, email: string) => {
    // Récupérer le profil depuis la table admins
    const { data, error } = await supabase
      .from("admins")
      .select("*")
      .eq("email", email)
      .single();

    if (data) {
      setCurrentAdmin({
        id: data.id,
        name: data.name,
        email: data.email,
        role: data.role,
        createdAt: data.created_at,
        lastLogin: data.last_login,
        avatar: data.avatar,
      });
      
      // Mettre à jour last_login
      await supabase.from("admins").update({ last_login: new Date().toISOString() }).eq("id", data.id);
    } else {
      // S'il n'y a pas de profil mais que l'auth a réussi, on fallback sur un compte par défaut
      setCurrentAdmin({
        id: userId,
        name: email.split('@')[0],
        email: email,
        role: "admin",
        createdAt: new Date().toISOString(),
      });
    }
  };

  useEffect(() => {
    // Vérifier la session initiale
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchAdminProfile(session.user.id, session.user.email!);
      } else {
        setLoading(false);
      }
    });

    // Écouter les changements d'état
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        await fetchAdminProfile(session.user.id, session.user.email!);
      } else {
        setCurrentAdmin(null);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: pass,
    });

    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  };

  const setupFirstAdmin = async (name: string, email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    return { success: false, error: "Non supporté via Supabase." };
  };

  const resetPassword = async (email: string, newPass?: string): Promise<{ success: boolean; error?: string }> => {
    if (!newPass) {
      // Étape 1 : Demande de réinitialisation par email
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/admin/reset-password`,
      });
      if (error) return { success: false, error: error.message };
      return { success: true };
    } else {
      // Étape 2 : Mise à jour du mot de passe (nécessite d'être connecté via le lien)
      const { error } = await supabase.auth.updateUser({ password: newPass });
      if (error) return { success: false, error: error.message };
      return { success: true };
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setCurrentAdmin(null);
  };

  const hasPermission = (permission: "catalog" | "media" | "content" | "marketing" | "clients" | "admins"): boolean => {
    if (!currentAdmin) return false;
    if (currentAdmin.role === "super_admin") return true;
    if (currentAdmin.role === "admin") return permission !== "admins";
    if (currentAdmin.role === "editor") return permission === "catalog" || permission === "media" || permission === "content";
    if (currentAdmin.role === "marketing") return permission === "marketing" || permission === "content" || permission === "media";
    return false;
  };

  return (
    <AdminAuthContext.Provider
      value={{
        currentAdmin,
        isAuthenticated: !!currentAdmin,
        needsInitialSetup,
        login,
        logout,
        setupFirstAdmin,
        resetPassword,
        hasPermission,
      }}
    >
      {!loading && children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within AdminAuthProvider");
  }
  return context;
};
