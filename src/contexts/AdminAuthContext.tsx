import React, { createContext, useContext, useState, useEffect } from "react";
import { AdminUser, useData } from "./DataContext";

interface AdminAuthContextType {
  currentAdmin: AdminUser | null;
  isAuthenticated: boolean;
  needsInitialSetup: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  setupFirstAdmin: (name: string, email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  hasPermission: (permission: "catalog" | "media" | "content" | "marketing" | "clients" | "admins") => boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | null>(null);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { admins, addAdmin, logActivity } = useData();
  const [currentAdmin, setCurrentAdmin] = useState<AdminUser | null>(() => {
    try {
      const saved = localStorage.getItem("yamooh_current_admin_user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const needsInitialSetup = admins.length === 0;

  useEffect(() => {
    if (currentAdmin) {
      localStorage.setItem("yamooh_current_admin_user", JSON.stringify(currentAdmin));
      localStorage.setItem("yamooh_current_admin_name", currentAdmin.name);
    } else {
      localStorage.removeItem("yamooh_current_admin_user");
      localStorage.removeItem("yamooh_current_admin_name");
    }
  }, [currentAdmin]);

  const login = async (email: string, _pass: string): Promise<{ success: boolean; error?: string }> => {
    const found = admins.find((a) => a.email.toLowerCase() === email.toLowerCase());
    if (!found) {
      return { success: false, error: "Identifiants administrateur incorrects." };
    }
    const updated = { ...found, lastLogin: new Date().toLocaleString("fr-FR") };
    setCurrentAdmin(updated);
    logActivity("login", "Session Admin", `Connexion de ${found.name} (${found.role})`);
    return { success: true };
  };

  const setupFirstAdmin = async (name: string, email: string, _pass: string): Promise<{ success: boolean; error?: string }> => {
    if (!name || !email) {
      return { success: false, error: "Veuillez renseigner tous les champs obligatoires." };
    }
    const newAdmin: AdminUser = {
      id: "adm-root",
      name,
      email,
      role: "super_admin",
      createdAt: new Date().toISOString().split("T")[0],
      lastLogin: new Date().toLocaleString("fr-FR"),
    };
    addAdmin(newAdmin);
    setCurrentAdmin(newAdmin);
    logActivity("create", "Super Administrateur", `Initialisation du premier compte Super Admin (${name})`);
    return { success: true };
  };

  const logout = () => {
    if (currentAdmin) {
      logActivity("login", "Session Admin", `Déconnexion de ${currentAdmin.name}`);
    }
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
        hasPermission,
      }}
    >
      {children}
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
